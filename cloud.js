/* ============================================================
   מאזן — שכבת חשבונות וסנכרון (Supabase)

   עובד ישירות מול ה-REST של Supabase, בלי ספריות ובלי CDN,
   כדי שהאפליקציה תמשיך לעבוד אופליין.

   מודל הנתונים: טבלה אחת, שורה לכל (משתמש, מפתח).
   זה מתמפה אחד-לאחד על מפתחות האחסון המקומי, כך שהסנכרון
   לא דורש שינוי בשאר הקוד.
   ============================================================ */

/* ------------------------------------------------------------
   הגדרת החיבור — ממלאים כאן פעם אחת, ואף משתמש לא רואה את זה.

   Supabase → Project Settings → API:
     SUPABASE_URL      = Project URL
     SUPABASE_ANON_KEY = anon public key

   ה-anon key נועד לחשיפה פומבית. מה שמגן על הנתונים היא מדיניות
   ה-RLS ב-schema.sql, שאוכפת במסד עצמו שכל משתמש נוגע רק בשורות
   שלו. אל תשים כאן לעולם את ה-service_role key.
   ------------------------------------------------------------ */
const SUPABASE_URL      = 'https://awkmwxthzypjelbceoex.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3a213eHRoenlwamVsYmNlb2V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MzEyNjAsImV4cCI6MjEwNDAwNzI2MH0.uO2C5VTKaEat1Dp-plR68qrNMtRuUZwRAYag2mOccTw';


const Cloud = (() => {
  const LS = {
    get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
    set(k,v){ try { localStorage.setItem(k,v); } catch(e){} },
    del(k){ try { localStorage.removeItem(k); } catch(e){} }
  };

  const cfg = {
    url: (SUPABASE_URL || '').trim().replace(/\/+$/,''),
    key: (SUPABASE_ANON_KEY || '').trim()
  };
  let session = null;
  try { session = JSON.parse(LS.get('maazan:sb:session') || 'null'); } catch(e){ session = null; }

  let queue = {};
  try { queue = JSON.parse(LS.get('maazan:sb:queue') || '{}'); } catch(e){ queue = {}; }
  const saveQueue = () => LS.set('maazan:sb:queue', JSON.stringify(queue));

  const listeners = [];
  const emit = () => listeners.forEach(fn => { try { fn(); } catch(e){} });

  function ready(){ return !!(cfg.url && cfg.key); }
  function signedIn(){ return !!(session && session.access_token); }
  function user(){ return session && session.user ? session.user : null; }

  function setSession(s){
    session = s;
    if (s) LS.set('maazan:sb:session', JSON.stringify(s));
    else   LS.del('maazan:sb:session');
    emit();
  }

  async function authCall(path, body){
    const r = await fetch(cfg.url + '/auth/v1/' + path, {
      method:'POST',
      headers:{'Content-Type':'application/json', apikey: cfg.key},
      body: JSON.stringify(body)
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error_description || j.msg || j.message || ('שגיאה ' + r.status));
    return j;
  }

  function store(j){
    if (!j.access_token) return null;
    const s = {
      access_token: j.access_token,
      refresh_token: j.refresh_token,
      expires_at: Date.now() + ((j.expires_in || 3600) - 60) * 1000,
      user: j.user ? {id: j.user.id, email: j.user.email} : (session && session.user)
    };
    setSession(s);
    return s;
  }

  async function signUp(email, password){
    const j = await authCall('signup', {email, password});
    if (!j.access_token) return {needsConfirm:true};   // אישור מייל מופעל בפרויקט
    store(j);
    return {needsConfirm:false};
  }
  async function signIn(email, password){
    store(await authCall('token?grant_type=password', {email, password}));
  }
  async function signOut(){
    setSession(null);
    queue = {}; saveQueue();
  }
  async function refresh(){
    if (!session || !session.refresh_token) throw new Error('אין סשן');
    return store(await authCall('token?grant_type=refresh_token', {refresh_token: session.refresh_token}));
  }

  async function rest(path, opts, retry){
    if (!signedIn()) throw new Error('לא מחובר');
    if (session.expires_at && Date.now() > session.expires_at) await refresh();
    const o = opts || {};
    const r = await fetch(cfg.url + '/rest/v1/' + path, {
      method: o.method || 'GET',
      headers: Object.assign({
        apikey: cfg.key,
        Authorization: 'Bearer ' + session.access_token,
        'Content-Type': 'application/json'
      }, o.headers || {}),
      body: o.body
    });
    if (r.status === 401 && !retry){ await refresh(); return rest(path, opts, true); }
    if (!r.ok) throw new Error('שגיאת שרת ' + r.status);
    return r.status === 204 ? null : r.json();
  }

  /* ---------- נתונים ---------- */
  async function pull(){
    const rows = await rest('app_data?select=key,value,updated_at');
    return rows || [];
  }

  function enqueue(key, value){
    if (!signedIn()) return;
    queue[key] = {value, ts: new Date().toISOString()};
    saveQueue();
    flush();
  }

  let flushing = false;
  async function flush(){
    if (flushing || !signedIn() || !navigator.onLine) return;
    const keys = Object.keys(queue);
    if (!keys.length) return;
    flushing = true;
    const uid = user().id;
    const batch = keys.map(k => ({user_id: uid, key: k, value: queue[k].value, updated_at: queue[k].ts}));
    try {
      await rest('app_data', {
        method:'POST',
        headers:{Prefer:'resolution=merge-duplicates'},
        body: JSON.stringify(batch)
      });
      keys.forEach(k => { delete queue[k]; });
      saveQueue();
      LS.set('maazan:sb:lastsync', new Date().toISOString());
      emit();
    } catch(e){
      /* נשאר בתור, ננסה שוב בחיבור הבא */
    } finally {
      flushing = false;
    }
  }

  window.addEventListener('online', flush);

  /* ---------- פרופיל ציבורי: שם משתמש ותפקיד ---------- */
  async function myProfile(){
    if (!signedIn()) return null;
    const r = await rest('profiles?user_id=eq.' + user().id +
                         '&select=user_id,username,display_name,role');
    return (r && r[0]) || null;
  }

  async function usernameTaken(username){
    const u = encodeURIComponent(String(username).toLowerCase());
    const r = await rest('profiles?username=ilike.' + u + '&select=user_id&limit=1');
    return !!(r && r.length);
  }

  async function saveProfile(p){
    const row = {
      user_id: user().id,
      username: String(p.username).trim(),
      display_name: (p.display_name || '').trim() || null,
      role: p.role === 'coach' ? 'coach' : 'trainee'
    };
    await rest('profiles', {
      method: 'POST',
      headers: {Prefer: 'resolution=merge-duplicates,return=minimal'},
      body: JSON.stringify(row)
    });
    return row;
  }

  /* ---------- חיפוש וקישור ---------- */
  async function searchUsers(term){
    const t = encodeURIComponent('*' + String(term).trim() + '*');
    const r = await rest('profiles?or=(username.ilike.' + t + ',display_name.ilike.' + t + ')' +
                         '&role=eq.trainee&select=user_id,username,display_name&limit=15');
    return (r || []).filter(x => x.user_id !== user().id);
  }

  /* בקשות שהמאמן שלח */
  async function coachLinks(){
    return (await rest('coach_links?coach_id=eq.' + user().id +
                       '&select=id,trainee_id,status,requested_at&order=requested_at.desc')) || [];
  }

  /* בקשות שהגיעו למתאמן */
  async function traineeLinks(){
    return (await rest('coach_links?trainee_id=eq.' + user().id +
                       '&select=id,coach_id,status,requested_at&order=requested_at.desc')) || [];
  }

  async function requestLink(traineeId){
    await rest('coach_links', {
      method: 'POST',
      headers: {Prefer: 'resolution=merge-duplicates,return=minimal'},
      body: JSON.stringify({coach_id: user().id, trainee_id: traineeId, status: 'pending'})
    });
  }

  async function setLinkStatus(id, status){
    await rest('coach_links?id=eq.' + id, {
      method: 'PATCH',
      headers: {Prefer: 'return=minimal'},
      body: JSON.stringify({status, decided_at: new Date().toISOString()})
    });
  }

  /* שמות של קבוצת מזהים, לתצוגה ברשימות */
  async function profilesByIds(ids){
    const list = [...new Set(ids)].filter(Boolean);
    if (!list.length) return {};
    const r = await rest('profiles?user_id=in.(' + list.join(',') + ')' +
                         '&select=user_id,username,display_name,role');
    const map = {};
    (r || []).forEach(p => { map[p.user_id] = p; });
    return map;
  }

  /* קריאת הנתונים של מתאמן. מותרת רק כשקיים קישור מאושר —
     ה-RLS הוא שמחליט, לא הקוד הזה. */
  async function pullFor(userId){
    return (await rest('app_data?user_id=eq.' + userId +
                       '&select=key,value,updated_at')) || [];
  }

  return {
    ready, signedIn, user, cfg: () => cfg,
    signUp, signIn, signOut, pull, enqueue, flush,
    myProfile, saveProfile, usernameTaken, searchUsers,
    coachLinks, traineeLinks, requestLink, setLinkStatus,
    profilesByIds, pullFor,
    pending: () => Object.keys(queue).length,
    lastSync: () => LS.get('maazan:sb:lastsync'),
    onChange: fn => listeners.push(fn)
  };
})();
