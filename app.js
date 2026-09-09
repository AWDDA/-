/* ============================================================
   מאזן — יומן קלוריות (PWA)
   הנתונים נשמרים מקומית במכשיר. אין שרת ואין חשבון.
   ============================================================ */

/* ---------- food database (per 100 g) ---------- */
const FOODS = [
  {n:'חזה עוף צלוי',g:'בשר ודגים',k:165,p:31,c:0,f:3.6},
  {n:'שוק עוף בתנור',g:'בשר ודגים',k:209,p:26,c:0,f:11},
  {n:'שניצל עוף מטוגן',g:'בשר ודגים',k:297,p:20,c:15,f:17},
  {n:'חזה הודו',g:'בשר ודגים',k:135,p:29,c:0,f:1.5},
  {n:'בשר בקר טחון 15%',g:'בשר ודגים',k:250,p:26,c:0,f:15},
  {n:'אנטרקוט',g:'בשר ודגים',k:271,p:25,c:0,f:19},
  {n:'סלמון',g:'בשר ודגים',k:208,p:20,c:0,f:13},
  {n:'טונה במים, מסוננת',g:'בשר ודגים',k:116,p:26,c:0,f:1,u:['קופסה (140 ג׳)',140]},
  {n:'דג דניס',g:'בשר ודגים',k:96,p:20,c:0,f:1.5},
  {n:'ביצה',g:'בשר ודגים',k:155,p:13,c:1.1,f:11,u:['ביצה גדולה (55 ג׳)',55]},
  {n:'חלבון ביצה',g:'בשר ודגים',k:52,p:11,c:0.7,f:0.2,u:['חלבון אחד (33 ג׳)',33]},
  {n:'טופו',g:'בשר ודגים',k:76,p:8,c:1.9,f:4.8},
  {n:'אבקת חלבון (וואי)',g:'בשר ודגים',k:380,p:75,c:8,f:5,u:['מנה (30 ג׳)',30]},

  {n:'קוטג׳ 5%',g:'מוצרי חלב',k:103,p:11,c:3.5,f:5,u:['גביע (250 ג׳)',250]},
  {n:'גבינה לבנה 5%',g:'מוצרי חלב',k:95,p:11,c:4,f:5},
  {n:'יוגורט יווני 0%',g:'מוצרי חלב',k:59,p:10,c:3.6,f:0.4,u:['גביע (150 ג׳)',150]},
  {n:'יוגורט טבעי 3%',g:'מוצרי חלב',k:61,p:3.5,c:4.7,f:3,u:['גביע (150 ג׳)',150]},
  {n:'חלב 3%',g:'מוצרי חלב',k:61,p:3.3,c:4.7,f:3.3,u:['כוס (240 מ״ל)',240]},
  {n:'חלב 1%',g:'מוצרי חלב',k:42,p:3.4,c:5,f:1,u:['כוס (240 מ״ל)',240]},
  {n:'גבינה צהובה 28%',g:'מוצרי חלב',k:350,p:25,c:1.5,f:28,u:['פרוסה (25 ג׳)',25]},
  {n:'לבנה 5%',g:'מוצרי חלב',k:120,p:8,c:4,f:8},
  {n:'קפה הפוך',g:'מוצרי חלב',k:45,p:2.4,c:3.5,f:2.4,u:['כוס גדולה (240 מ״ל)',240]},

  {n:'אורז לבן מבושל',g:'פחמימות',k:130,p:2.7,c:28,f:0.3},
  {n:'אורז מלא מבושל',g:'פחמימות',k:112,p:2.6,c:23,f:0.9},
  {n:'פסטה מבושלת',g:'פחמימות',k:158,p:5.8,c:31,f:0.9},
  {n:'קוסקוס מבושל',g:'פחמימות',k:112,p:3.8,c:23,f:0.2},
  {n:'בורגול מבושל',g:'פחמימות',k:83,p:3,c:19,f:0.2},
  {n:'קינואה מבושלת',g:'פחמימות',k:120,p:4.4,c:21,f:1.9},
  {n:'תפוח אדמה אפוי',g:'פחמימות',k:93,p:2.5,c:21,f:0.1},
  {n:'בטטה אפויה',g:'פחמימות',k:90,p:2,c:21,f:0.1},
  {n:'לחם לבן',g:'פחמימות',k:265,p:9,c:49,f:3.2,u:['פרוסה (30 ג׳)',30]},
  {n:'לחם מלא',g:'פחמימות',k:247,p:13,c:41,f:3.4,u:['פרוסה (30 ג׳)',30]},
  {n:'פיתה',g:'פחמימות',k:275,p:9,c:55,f:1.2,u:['פיתה (60 ג׳)',60]},
  {n:'טורטייה',g:'פחמימות',k:310,p:8,c:50,f:8,u:['טורטייה (50 ג׳)',50]},
  {n:'שיבולת שועל יבשה',g:'פחמימות',k:379,p:13,c:67,f:7,u:['כוס (80 ג׳)',80]},
  {n:'קורנפלקס',g:'פחמימות',k:357,p:7,c:84,f:0.4},

  {n:'חומוס גרגרים מבושל',g:'קטניות',k:164,p:8.9,c:27,f:2.6},
  {n:'עדשים מבושלות',g:'קטניות',k:116,p:9,c:20,f:0.4},
  {n:'שעועית לבנה מבושלת',g:'קטניות',k:127,p:8.7,c:23,f:0.5},
  {n:'אדממה',g:'קטניות',k:121,p:12,c:9,f:5},

  {n:'חומוס ממרח',g:'ממרחים ושומנים',k:177,p:8,c:15,f:9,u:['כף (25 ג׳)',25]},
  {n:'טחינה גולמית',g:'ממרחים ושומנים',k:595,p:17,c:21,f:54,u:['כף (15 ג׳)',15]},
  {n:'טחינה מוכנה',g:'ממרחים ושומנים',k:300,p:9,c:10,f:26,u:['כף (18 ג׳)',18]},
  {n:'שמן זית',g:'ממרחים ושומנים',k:884,p:0,c:0,f:100,u:['כף (13 ג׳)',13]},
  {n:'חמאה',g:'ממרחים ושומנים',k:717,p:0.9,c:0.1,f:81,u:['כף (14 ג׳)',14]},
  {n:'חמאת בוטנים',g:'ממרחים ושומנים',k:588,p:25,c:20,f:50,u:['כף (16 ג׳)',16]},
  {n:'מיונז',g:'ממרחים ושומנים',k:680,p:1,c:1.3,f:75,u:['כף (14 ג׳)',14]},
  {n:'אבוקדו',g:'ממרחים ושומנים',k:160,p:2,c:9,f:15,u:['אבוקדו בינוני (150 ג׳)',150]},

  {n:'שקדים',g:'אגוזים',k:579,p:21,c:22,f:50,u:['חופן (28 ג׳)',28]},
  {n:'אגוזי מלך',g:'אגוזים',k:654,p:15,c:14,f:65,u:['חופן (28 ג׳)',28]},
  {n:'בוטנים',g:'אגוזים',k:567,p:26,c:16,f:49,u:['חופן (28 ג׳)',28]},
  {n:'קשיו',g:'אגוזים',k:553,p:18,c:30,f:44,u:['חופן (28 ג׳)',28]},

  {n:'מלפפון',g:'ירקות',k:15,p:0.7,c:3.6,f:0.1},
  {n:'עגבנייה',g:'ירקות',k:18,p:0.9,c:3.9,f:0.2},
  {n:'חסה',g:'ירקות',k:15,p:1.4,c:2.9,f:0.2},
  {n:'גזר',g:'ירקות',k:41,p:0.9,c:10,f:0.2},
  {n:'פלפל אדום',g:'ירקות',k:31,p:1,c:6,f:0.3},
  {n:'בצל',g:'ירקות',k:40,p:1.1,c:9.3,f:0.1},
  {n:'ברוקולי',g:'ירקות',k:34,p:2.8,c:7,f:0.4},
  {n:'תירס מבושל',g:'ירקות',k:96,p:3.4,c:21,f:1.5},

  {n:'תפוח',g:'פירות',k:52,p:0.3,c:14,f:0.2,u:['תפוח בינוני (180 ג׳)',180]},
  {n:'בננה',g:'פירות',k:89,p:1.1,c:23,f:0.3,u:['בננה בינונית (120 ג׳)',120]},
  {n:'תפוז',g:'פירות',k:47,p:0.9,c:12,f:0.1,u:['תפוז בינוני (150 ג׳)',150]},
  {n:'ענבים',g:'פירות',k:69,p:0.7,c:18,f:0.2},
  {n:'אבטיח',g:'פירות',k:30,p:0.6,c:8,f:0.2},
  {n:'תותים',g:'פירות',k:32,p:0.7,c:7.7,f:0.3},
  {n:'תמר מג׳הול',g:'פירות',k:277,p:1.8,c:75,f:0.2,u:['תמר (24 ג׳)',24]},

  {n:'פלאפל',g:'רחוב וחטיפים',k:333,p:13,c:32,f:18,u:['כדור (17 ג׳)',17]},
  {n:'פיצה',g:'רחוב וחטיפים',k:266,p:11,c:33,f:10,u:['משולש (110 ג׳)',110]},
  {n:'צ׳יפס בתנור',g:'רחוב וחטיפים',k:220,p:3,c:34,f:8},
  {n:'במבה',g:'רחוב וחטיפים',k:542,p:14,c:50,f:32,u:['שקית (25 ג׳)',25]},
  {n:'ביסלי',g:'רחוב וחטיפים',k:480,p:9,c:63,f:21,u:['שקית (35 ג׳)',35]},
  {n:'שוקולד חלב',g:'רחוב וחטיפים',k:546,p:7.7,c:59,f:31,u:['שורה (25 ג׳)',25]},
  {n:'עוגיית שוקולד צ׳יפס',g:'רחוב וחטיפים',k:474,p:5,c:63,f:22,u:['עוגייה (16 ג׳)',16]},

  {n:'קולה',g:'משקאות',k:42,p:0,c:10.6,f:0,u:['פחית (330 מ״ל)',330]},
  {n:'קולה זירו',g:'משקאות',k:0.3,p:0,c:0,f:0,u:['פחית (330 מ״ל)',330]},
  {n:'מיץ תפוזים',g:'משקאות',k:45,p:0.7,c:10.4,f:0.2,u:['כוס (240 מ״ל)',240]},
  {n:'בירה',g:'משקאות',k:43,p:0.5,c:3.6,f:0,u:['בקבוק (330 מ״ל)',330]},
  {n:'משקה איזוטוני',g:'משקאות',k:25,p:0,c:6,f:0,u:['בקבוק (500 מ״ל)',500]}
];

const MEALS = [
  {id:'breakfast', name:'ארוחת בוקר'},
  {id:'lunch',     name:'ארוחת צהריים'},
  {id:'dinner',    name:'ארוחת ערב'},
  {id:'snacks',    name:'נשנושים ומשקאות'}
];

const DAYS = ['א','ב','ג','ד','ה','ו','ש'];
const WATER_CUPS = 8, CUP_ML = 250;

/* ---------- storage ---------- */
const Store = (() => {
  const mem = {};
  const host = (typeof window !== 'undefined' && window.storage && typeof window.storage.get === 'function') ? window.storage : null;
  let ls = null;
  if (!host) {
    try { window.localStorage.setItem('__t','1'); window.localStorage.removeItem('__t'); ls = window.localStorage; }
    catch (e) { ls = null; }
  }
  return {
    async get(k){
      if (host) { try { const r = await host.get(k); return r ? r.value : null; } catch(e){ return null; } }
      if (ls)   { try { return ls.getItem(k); } catch(e){ return null; } }
      return Object.prototype.hasOwnProperty.call(mem,k) ? mem[k] : null;
    },
    async setLocal(k,v){
      mem[k] = v;
      if (host) { try { await host.set(k,v); } catch(e){} return; }
      if (ls)   { try { ls.setItem(k,v); } catch(e){} }
    },
    async set(k,v){
      await this.setLocal(k,v);
      stamp(k);
      if (typeof Cloud !== 'undefined' && Cloud.signedIn() && k.indexOf('maazan:sb:') !== 0) Cloud.enqueue(k,v);
    }
  };
})();

/* חותמות זמן לכל מפתח — משמשות למיזוג מול הענן */
let STAMPS = {};
try { STAMPS = JSON.parse(localStorage.getItem('maazan:stamps') || '{}'); } catch(e){ STAMPS = {}; }
function stamp(k){
  STAMPS[k] = new Date().toISOString();
  try { localStorage.setItem('maazan:stamps', JSON.stringify(STAMPS)); } catch(e){}
}

/* ---------- state ---------- */
const state = {
  profile:{sex:'male', age:28, height:178, weight:80, activity:1.55, goal:-0.5},
  date: todayKey(),
  log: emptyLog(),
  custom: [], recent: [], weights: {},
  targets:{kcal:0,p:0,c:0,f:0},
  apiUrl:'', screen:'home', meal:'breakfast', pick:null,
  me:null, links:[], names:{}, live:null
};

function emptyLog(){ return {breakfast:[],lunch:[],dinner:[],snacks:[],exercise:[],water:0}; }
function todayKey(d){ const x=d||new Date(); return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0'); }
/* getElementById נקרא אלפי פעמים בכל רינדור. מטמון פשוט חוסך
   את החיפוש החוזר, ומתנקה כשאלמנט מוחלף. */
const _el = {};
function $(id){
  let e = _el[id];
  if (e && e.isConnected) return e;
  e = document.getElementById(id);
  if (e) _el[id] = e;
  return e;
}
function round(n,d){ const m=Math.pow(10,d||0); return Math.round(n*m)/m; }
function nf(n){ return Math.round(n).toLocaleString('he-IL'); }
function esc(s){ return String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
function allFoods(){ return state.custom.concat(FOODS); }

/* ---------- calculations ---------- */
function compute(P){
  P = P || state.profile;
  const w = +P.weight||0, h = +P.height||0, a = +P.age||0;
  const bmr = P.sex === 'male' ? 10*w + 6.25*h - 5*a + 5 : 10*w + 6.25*h - 5*a - 161;
  const tdee = bmr * (+P.activity);
  const floor = P.sex === 'male' ? 1500 : 1200;
  let target = tdee + (+P.goal) * 7700 / 7, clipped = false;
  if (target < floor) { target = floor; clipped = true; }
  const cutting = (+P.goal) < 0;
  const protein = Math.round(w * (cutting ? 2.0 : 1.8));
  let fat = Math.round(target * 0.25 / 9);
  const fatMin = Math.round(w * 0.8);
  if (fat < fatMin) fat = fatMin;
  let carbs = Math.round((target - protein*4 - fat*9) / 4);
  if (carbs < 0) carbs = 0;
  const bmi = h > 0 ? w / Math.pow(h/100,2) : 0;
  return {bmr:Math.round(bmr), tdee:Math.round(tdee), target:Math.round(target), clipped, floor,
          protein, carbs, fat, bmi, water:round(w*0.035,1)};
}
function bmiCat(b){ return b<18.5 ? 'תת־משקל' : b<25 ? 'תקין' : b<30 ? 'עודף משקל' : 'השמנה'; }
function totals(){
  const t = {k:0,p:0,c:0,f:0};
  MEALS.forEach(m => state.log[m.id].forEach(i => { t.k+=i.k; t.p+=i.p; t.c+=i.c; t.f+=i.f; }));
  return t;
}
function exTotal(){ return (state.log.exercise||[]).reduce((s,i) => s + i.k, 0); }
function mealTotal(id){ return state.log[id].reduce((s,i) => s + i.k, 0); }

/* ---------- persistence ---------- */
const saveProfile = () => Store.set('maazan:profile', JSON.stringify(state.profile));
const saveCustom  = () => Store.set('maazan:custom',  JSON.stringify(state.custom));
const saveRecent  = () => Store.set('maazan:recent',  JSON.stringify(state.recent));
const saveWeights = () => Store.set('maazan:weights', JSON.stringify(state.weights));
const saveLog     = () => Store.set('maazan:log:' + state.date, JSON.stringify(state.log));

async function loadLog(){
  const raw = await Store.get('maazan:log:' + state.date);
  try { state.log = raw ? Object.assign(emptyLog(), JSON.parse(raw)) : emptyLog(); }
  catch(e){ state.log = emptyLog(); }
}
async function loadDayTotal(key){
  const raw = await Store.get('maazan:log:' + key);
  if (!raw) return null;
  try {
    const log = JSON.parse(raw); let k = 0, any = false;
    MEALS.forEach(m => (log[m.id]||[]).forEach(i => { k += i.k; any = true; }));
    return any ? k : null;
  } catch(e){ return null; }
}

/* ---------- render ---------- */
function renderProfile(){
  const r = compute();
  state.targets = {kcal:r.target, p:r.protein, c:r.carbs, f:r.fat};
  $('sBmr').innerHTML    = nf(r.bmr)    + '<small>קק״ל</small>';
  $('sTdee').innerHTML   = nf(r.tdee)   + '<small>קק״ל</small>';
  $('sTarget').innerHTML = nf(r.target) + '<small>קק״ל</small>';
  $('sBmi').innerHTML    = round(r.bmi,1) + '<small>' + bmiCat(r.bmi) + '</small>';
  $('sWater').innerHTML  = r.water + '<small>ליטר</small>';
  $('sProt').innerHTML   = r.protein + '<small>גרם</small>';
  const note = $('floorNote');
  if (r.clipped){
    note.hidden = false;
    note.textContent = 'היעד שחושב היה נמוך מדי, ולכן הועלה לרף המינימלי של ' + nf(r.floor) + ' קק״ל ליום. קצב ירידה איטי יותר יתאים לך יותר.';
  } else note.hidden = true;
}

function renderSummary(){
  const t = totals(), T = state.targets, ex = exTotal();
  const remain = Math.round(T.kcal - t.k + ex);
  $('remain').textContent = Math.abs(remain).toLocaleString('he-IL');
  $('remain').classList.toggle('over', remain < 0);
  $('remainCap').textContent = remain < 0 ? 'מעל היעד' : 'נותרו';
  $('eqGoal').textContent = nf(T.kcal);
  $('eqFood').textContent = nf(t.k);
  $('eqEx').textContent   = nf(ex);

  const budget = T.kcal + ex;
  const pct = budget ? Math.min(t.k / budget, 1) : 0;
  const pf = $('progFill'); if (pf) pf.style.width = (pct * 100) + '%';
  const rf = $('ringFg');
  if (rf){
    const R = parseFloat(rf.getAttribute('r')) || 80, C = 2 * Math.PI * R;
    rf.setAttribute('stroke-dasharray', C.toFixed(1));
    rf.style.strokeDashoffset = (C * (1 - pct)).toFixed(1);
  }
  /* מצב היום צובע את כל המסך: יש תקציב / מתקרב / עברת */
  document.documentElement.dataset.state = remain < 0 ? 'over' : (pct >= 0.85 ? 'near' : 'ok');

  /* donut: share of calories from each macro actually eaten */
  const kc = t.c*4, kp = t.p*4, kf = t.f*9, sum = kc + kp + kf;
  const R = 2 * Math.PI * 44;
  let off = 0;
  [['dC',kc],['dP',kp],['dF',kf]].forEach(([id,val]) => {
    const len = sum ? (val/sum) * R : 0;
    const el = $(id);
    el.setAttribute('stroke-dasharray', len + ' ' + (R - len + 1));
    el.setAttribute('stroke-dashoffset', String(-off));
    off += len;
  });
  $('dKcal').textContent = nf(t.k);

  setBar('c', t.c, T.c); setBar('p', t.p, T.p); setBar('f', t.f, T.f);

  $('tFood').textContent = nf(t.k);
  $('tGoal').textContent = nf(T.kcal);
  $('tEx').textContent   = nf(ex);
  $('tRem').textContent  = (remain < 0 ? '−' : '') + Math.abs(remain).toLocaleString('he-IL');
  $('tRem').classList.toggle('over', remain < 0);
}
function setBar(key, val, target){
  $(key+'Txt').textContent = Math.round(val) + ' / ' + target + ' ג׳';
  $(key+'Bar').style.width = (target ? Math.min(val/target,1)*100 : 0) + '%';
}

function renderDiary(){
  const rows = m => state.log[m.id].map((it,i) =>
    '<li><div class="nm"><b>'+esc(it.n)+'</b><span>'+esc(it.q)+'</span></div>'+
    '<div class="num">'+Math.round(it.k)+'</div>'+
    '<button class="del" data-meal="'+m.id+'" data-i="'+i+'" aria-label="מחיקה">✕</button></li>').join('');

  let html = MEALS.map(m =>
    '<div class="meal"><div class="mhead"><h3>'+m.name+'</h3><div class="k">'+Math.round(mealTotal(m.id))+' קק״ל</div></div>'+
    (state.log[m.id].length ? '<ul class="items">'+rows(m)+'</ul>' : '') +
    '<button class="addlink" data-add="'+m.id+'">＋ הוספת מאכל</button></div>').join('');

  const ex = state.log.exercise || [];
  html += '<div class="meal"><div class="mhead"><h3>פעילות גופנית</h3><div class="k">'+Math.round(exTotal())+' קק״ל</div></div>'+
    (ex.length ? '<ul class="items">'+ex.map((it,i) =>
      '<li><div class="nm"><b>'+esc(it.n)+'</b><span>'+esc(it.q||'')+'</span></div>'+
      '<div class="num">'+Math.round(it.k)+'</div>'+
      '<button class="del" data-meal="exercise" data-i="'+i+'" aria-label="מחיקה">✕</button></li>').join('')+'</ul>' : '') +
    '<button class="addlink" data-ex="1">＋ הוספת פעילות</button></div>';

  $('meals').innerHTML = html;
}

function renderWater(){
  const n = state.log.water || 0;
  $('water').innerHTML =
    Array.from({length:WATER_CUPS}, (_,i) =>
      '<button class="cup'+(i < n ? ' on' : '')+'" data-cup="'+(i+1)+'" aria-label="כוס '+(i+1)+'"></button>').join('') +
    '<span class="waterlbl">'+round(n*CUP_ML/1000,2)+' ליטר</span>';
}

function renderRecents(){
  $('recents').innerHTML = state.recent.length
    ? state.recent.slice(0,8).map(n =>
        '<button class="btn sec" style="width:auto;padding:8px 15px;font-size:var(--t-small);font-weight:400" data-quick="'+esc(n)+'">'+esc(n)+'</button>').join('')
    : '<span style="color:var(--mut2);font-size:var(--t-small)">מאכלים שתוסיף יופיעו כאן לחזרה בלחיצה אחת</span>';
}

function renderDate(){
  const isToday = state.date === todayKey();
  const d = new Date(state.date + 'T12:00:00');
  $('dateLabel').textContent = isToday ? 'היום'
    : d.toLocaleDateString('he-IL', {weekday:'long', day:'numeric', month:'long'});
  $('nextDay').disabled = isToday;
}

async function renderProgress(){
  const days = [], base = new Date(todayKey() + 'T12:00:00');
  for (let i = 6; i >= 0; i--){
    const d = new Date(base); d.setDate(d.getDate() - i);
    const key = todayKey(d);
    days.push({key, dow:DAYS[d.getDay()], kcal: await loadDayTotal(key)});
  }
  const T = state.targets.kcal || 1;
  const max = Math.max(T * 1.25, ...days.map(d => d.kcal || 0));
  $('chart').innerHTML = days.map(d => {
    const h = d.kcal ? Math.max((d.kcal / max) * 100, 2) : 0;
    return '<button class="col'+(d.key===todayKey()?' today':'')+'" data-day="'+d.key+'">'+
      '<div class="stack"><div class="fill'+(d.kcal && d.kcal > T*1.02 ? ' over':'')+'" style="height:'+h+'%"></div></div>'+
      '<div class="d">'+d.dow+'</div></button>';
  }).join('') + '<div class="goalline" style="bottom:'+(24 + (T/max)*(150-24-20))+'px"><span>יעד '+nf(T)+'</span></div>';

  const logged = days.filter(d => d.kcal);
  const avg = logged.length ? logged.reduce((s,d) => s + d.kcal, 0) / logged.length : 0;
  $('kAvg').textContent = nf(avg);
  $('kIn').textContent = logged.filter(d => d.kcal >= T*0.85 && d.kcal <= T*1.05).length;
  $('kLogged').textContent = logged.length + '/7';
  renderWeight();
}

function renderWeight(){
  const keys = Object.keys(state.weights).sort(), svg = $('spark');
  if (keys.length < 2){
    svg.innerHTML = '<text x="150" y="48" text-anchor="middle" fill="#9BA2B8" font-size="12" font-family="Rubik,sans-serif">רשום משקל בשני ימים כדי לראות מגמה</text>';
    $('wFirst').textContent = ''; $('wLast').textContent = ''; $('wDelta').textContent = '';
    return;
  }
  const vals = keys.map(k => state.weights[k]);
  const min = Math.min(...vals), max = Math.max(...vals), span = (max - min) || 1;
  const pts = vals.map((v,i) => [ 4 + (i/(vals.length-1))*292, 78 - ((v-min)/span)*62 ]);
  const line = pts.map((p,i) => (i ? 'L' : 'M') + round(p[0],1) + ' ' + round(p[1],1)).join(' ');
  svg.innerHTML =
    '<defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0%" stop-color="#5CD2A4" stop-opacity=".22"/><stop offset="100%" stop-color="#5CD2A4" stop-opacity="0"/></linearGradient></defs>'+
    '<path d="'+line+' L296 88 L4 88 Z" fill="url(#wg)"/>'+
    '<path d="'+line+'" fill="none" stroke="#5CD2A4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'+
    '<circle cx="'+round(pts[pts.length-1][0],1)+'" cy="'+round(pts[pts.length-1][1],1)+'" r="4" fill="#E7E9F2"/>';
  const fmt = k => new Date(k+'T12:00:00').toLocaleDateString('he-IL',{day:'numeric',month:'short'});
  $('wFirst').textContent = vals[0] + ' ק״ג · ' + fmt(keys[0]);
  $('wLast').textContent  = vals[vals.length-1] + ' ק״ג · ' + fmt(keys[keys.length-1]);
  const diff = round(vals[vals.length-1] - vals[0], 1);
  $('wDelta').textContent = (diff > 0 ? '+' : '') + diff + ' ק״ג מאז ההתחלה';
}

function renderAll(){ renderProfile(); renderDiary(); renderWater(); renderRecents(); renderSummary(); renderDate(); }

/* ---------- navigation ---------- */
const SUBS = {home:'סקירת היום', diary:'יומן האכילה', prog:'המגמה שלך', me:'היעד האישי'};
function goto(scr){
  state.screen = scr;
  ['home','diary','prog','me'].forEach(s => { $('scr-'+s).hidden = (s !== scr); });
  document.querySelectorAll('.tab').forEach(b => b.setAttribute('aria-current', b.dataset.scr === scr ? 'page' : 'false'));
  $('dateBar').style.display = (scr === 'home' || scr === 'diary') ? '' : 'none';
  $('barSub').textContent = SUBS[scr];
  if (scr === 'prog'){ renderProgress(); if (!$('prog-mine').hidden) loadMyDiet(); }
  if (scr !== 'prog') stopLive();
  window.scrollTo({top:0});
}
document.querySelector('.tabbar').addEventListener('click', e => {
  const b = e.target.closest('.tab'); if (b) goto(b.dataset.scr);
});
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]'); if (!g) return;
  if (g.dataset.go === 'coach'){ goto('prog'); progTab('coaching'); return; }
  goto(g.dataset.go);
});
$('chart').addEventListener('click', e => {
  const c = e.target.closest('[data-day]'); if (!c) return;
  state.date = c.dataset.day;
  loadLog().then(() => { renderAll(); goto('diary'); });
});

/* ---------- date ---------- */
function shiftDate(n){
  const d = new Date(state.date + 'T12:00:00');
  d.setDate(d.getDate() + n);
  if (todayKey(d) > todayKey()) return;
  state.date = todayKey(d);
  loadLog().then(renderAll);
}
$('prevDay').addEventListener('click', () => shiftDate(-1));
$('nextDay').addEventListener('click', () => shiftDate(1));

/* ---------- profile ---------- */
$('sexSeg').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  [...e.currentTarget.children].forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  state.profile.sex = b.dataset.v;
  renderProfile(); renderSummary(); saveProfile();
});
$('apiUrl').addEventListener('input', () => {
  state.apiUrl = $('apiUrl').value.trim();
  Store.set('maazan:apiurl', state.apiUrl);
});
['age','height','weight','activity','goal'].forEach(id => {
  $(id).addEventListener('input', () => {
    state.profile[id] = $(id).value;
    renderProfile(); renderSummary(); saveProfile();
  });
});
$('logWeight').addEventListener('click', () => {
  const w = parseFloat(state.profile.weight);
  if (!(w > 0)) { toast('צריך להזין משקל תקין'); return; }
  state.weights[todayKey()] = round(w,1);
  saveWeights(); renderWeight(); toast('המשקל נרשם');
});

/* ---------- water ---------- */
$('water').addEventListener('click', e => {
  const c = e.target.closest('[data-cup]'); if (!c) return;
  const n = +c.dataset.cup;
  state.log.water = (state.log.water === n) ? n - 1 : n;
  saveLog(); renderWater();
});

/* ---------- diary actions ---------- */
$('meals').addEventListener('click', e => {
  const add = e.target.closest('[data-add]'); if (add) { openSheet('search', add.dataset.add); return; }
  if (e.target.closest('[data-ex]')) { openSheet('ex'); return; }
  const del = e.target.closest('.del');
  if (del) {
    state.log[del.dataset.meal].splice(+del.dataset.i, 1);
    saveLog(); renderDiary(); renderSummary(); toast('נמחק');
  }
});
$('recents').addEventListener('click', e => {
  const b = e.target.closest('[data-quick]'); if (!b) return;
  openSheet('search'); pickFood(b.dataset.quick);
});
$('fab').addEventListener('click', () => openSheet('search'));

function guessMeal(){
  const h = new Date().getHours();
  return h < 11 ? 'breakfast' : h < 16 ? 'lunch' : h < 21 ? 'dinner' : 'snacks';
}

/* ---------- sheet ---------- */
let lastFocus = null;
function openSheet(tab, mealId){
  state.meal = mealId || guessMeal();
  state.pick = null;
  lastFocus = document.activeElement;
  const opts = MEALS.map(m =>
    '<option value="'+m.id+'"'+(m.id===state.meal?' selected':'')+'>'+m.name+'</option>').join('');
  $('mealSel').innerHTML = opts;
  $('mealSel2').innerHTML = opts;
  $('scrim').hidden = false;
  document.body.style.overflow = 'hidden';
  showTab(tab || 'search');
  $('q').value = ''; $('picked').hidden = true;
  renderResults('');
}
function closeSheet(){
  $('scrim').hidden = true;
  document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}
$('closeSheet').addEventListener('click', closeSheet);
$('scrim').addEventListener('mousedown', e => { if (e.target === $('scrim')) closeSheet(); });

$('mealSel').addEventListener('change', e => { state.meal = e.target.value; });

function showTab(which){
  const panes = {search:'paneSearch', new:'paneNew', ex:'paneEx', meal:'paneMeal'};
  const tabs  = {search:'tabSearch',  new:'tabNew',  ex:'tabEx',  meal:'tabMeal'};
  Object.keys(panes).forEach(k => {
    $(panes[k]).hidden = (k !== which);
    $(tabs[k]).setAttribute('aria-selected', String(k === which));
  });
  $('mTitle').textContent = which === 'ex' ? 'הוספת פעילות' : which === 'meal' ? 'צילום מנה' : 'הוספה ליומן';
  if (which === 'meal') $('mealResult').innerHTML = '';
}
$('tabSearch').addEventListener('click', () => showTab('search'));
$('tabNew').addEventListener('click', () => showTab('new'));
$('tabEx').addEventListener('click', () => showTab('ex'));

function renderResults(query){
  const q = query.trim();
  const list = allFoods().filter(f => !q || f.n.includes(q) || (f.g && f.g.includes(q))).slice(0,40);
  $('results').innerHTML = list.length
    ? list.map(f => '<li data-name="'+esc(f.n)+'"><div class="nm"><b>'+esc(f.n)+'</b><span>'+esc(f.g||'מאכל שלי')+'</span></div>'+
        '<div class="kc">'+f.k+' קק״ל / 100 ג׳</div></li>').join('')
    : '<li style="pointer-events:none"><div class="nm"><b>לא נמצא מאכל בשם הזה</b><span>אפשר להוסיף אותו בלשונית «מאכל חדש»</span></div></li>';
}
$('q').addEventListener('input', e => renderResults(e.target.value));
$('results').addEventListener('click', e => {
  const li = e.target.closest('li[data-name]'); if (li) pickFood(li.dataset.name);
});

function pickFood(name){
  const f = allFoods().find(x => x.n === name); if (!f) return;
  state.pick = f;
  $('pickedName').textContent = f.n;
  const opts = ['<option value="1">גרם</option>'];
  if (f.u) opts.push('<option value="'+f.u[1]+'" selected>'+esc(f.u[0])+'</option>');
  $('unit').innerHTML = opts.join('');
  $('amount').value = f.u ? 1 : 100;
  $('picked').hidden = false;
  updatePreview();
  $('picked').scrollIntoView({behavior:'smooth', block:'nearest'});
}
function pickedValues(){
  const f = state.pick; if (!f) return null;
  const amount = parseFloat($('amount').value) || 0;
  const per = parseFloat($('unit').value) || 1;
  const grams = amount * per;
  const label = per === 1 ? Math.round(grams) + ' גרם'
    : amount + ' × ' + $('unit').options[$('unit').selectedIndex].text;
  return {n:f.n, q:label, k:f.k*grams/100, p:f.p*grams/100, c:f.c*grams/100, f:f.f*grams/100, grams};
}
function updatePreview(){
  const v = pickedValues(); if (!v) return;
  $('pvKcal').textContent = Math.round(v.k);
  $('pvC').textContent = round(v.c,1);
  $('pvP').textContent = round(v.p,1);
  $('pvF').textContent = round(v.f,1);
}
$('amount').addEventListener('input', updatePreview);
$('unit').addEventListener('change', () => {
  $('amount').value = (parseFloat($('unit').value) === 1) ? 100 : 1;
  updatePreview();
});
$('addPicked').addEventListener('click', () => {
  const v = pickedValues();
  if (!v || v.grams <= 0) { toast('צריך להזין כמות גדולה מאפס'); return; }
  state.log[state.meal].push({n:v.n, q:v.q, k:v.k, p:v.p, c:v.c, f:v.f});
  state.recent = [v.n].concat(state.recent.filter(x => x !== v.n)).slice(0,12);
  saveLog(); saveRecent();
  renderDiary(); renderRecents(); renderSummary(); closeSheet();
  toast(v.n + ' · ' + Math.round(v.k) + ' קק״ל');
});
$('saveNew').addEventListener('click', () => {
  const n = $('nName').value.trim(), k = parseFloat($('nKcal').value);
  if (!n) { toast('צריך לתת שם למאכל'); return; }
  if (!(k >= 0)) { toast('צריך להזין קלוריות ל‑100 גרם'); return; }
  const nf2 = {n, g: pendingBarcode ? 'ברקוד ' + pendingBarcode : 'מאכל שלי', k,
    p:parseFloat($('nP').value)||0, c:parseFloat($('nC').value)||0, f:parseFloat($('nF').value)||0};
  if (pendingBarcode){ nf2.bc = pendingBarcode; pendingBarcode = null; }
  state.custom.unshift(nf2);
  saveCustom();
  ['nName','nKcal','nP','nC','nF'].forEach(id => { $(id).value = ''; });
  showTab('search'); $('q').value = n; renderResults(n); pickFood(n);
  toast('המאכל נשמר למאגר');
});
$('addEx').addEventListener('click', () => {
  const n = $('exName').value.trim() || 'פעילות';
  const k = parseFloat($('exKcal').value);
  const min = parseFloat($('exMin').value);
  if (!(k > 0)) { toast('צריך להזין כמה קלוריות נשרפו'); return; }
  state.log.exercise.push({n, q: min > 0 ? min + ' דקות' : '', k});
  saveLog();
  ['exName','exMin','exKcal'].forEach(id => { $(id).value = ''; });
  renderDiary(); renderSummary(); closeSheet();
  toast(n + ' · ' + Math.round(k) + ' קק״ל');
});

/* ============================================================
   מצלמה — סריקת ברקוד
   ============================================================ */
let camStream = null, camLoop = null, zxReader = null, camTrack = null, hintTimer = null;

function showCam(title, hint){
  $('camTitle').textContent = title;
  $('camHint').textContent = hint;
  $('camManual').hidden = true;
  $('camManualBtn').hidden = false;
  $('camTorch').hidden = true;
  $('cam').hidden = false;
}
function closeCam(){
  $('cam').hidden = true;
  if (camLoop){ clearInterval(camLoop); camLoop = null; }
  if (hintTimer){ clearTimeout(hintTimer); hintTimer = null; }
  if (zxReader){ try { zxReader.reset(); } catch(e){} zxReader = null; }
  if (camStream){ camStream.getTracks().forEach(t => t.stop()); camStream = null; }
  camTrack = null;
  $('camVideo').srcObject = null;
}
$('camClose').addEventListener('click', closeCam);
$('camManualBtn').addEventListener('click', () => {
  $('camManual').hidden = false;
  $('camManualBtn').hidden = true;
  $('camCode').focus();
});
$('camCodeGo').addEventListener('click', () => {
  const v = $('camCode').value.replace(/\D/g,'');
  if (v.length < 6){ toast('מספר ברקוד לא תקין'); return; }
  $('camCode').value = '';
  onBarcode(v);
});
$('camCode').addEventListener('keydown', e => { if (e.key === 'Enter') $('camCodeGo').click(); });

/* האם BarcodeDetector באמת עובד כאן?
   בכרום בדסקטופ האובייקט קיים אבל רשימת הפורמטים ריקה,
   וה-detect פשוט לא מוצא כלום לנצח. לכן בודקים פורמטים ולא קיום. */
async function nativeDetectorOK(){
  if (!('BarcodeDetector' in window)) return false;
  try {
    const f = await window.BarcodeDetector.getSupportedFormats();
    return !!f && f.indexOf('ean_13') > -1;
  } catch(e){ return false; }
}

function loadScript(src){
  return new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = src; s.onload = res; s.onerror = () => rej(new Error('script'));
    document.head.appendChild(s);
  });
}
async function ensureZXing(){
  if (window.ZXing && window.ZXing.BrowserMultiFormatReader) return true;
  try { await loadScript('./vendor/zxing.min.js'); }
  catch(e){
    try { await loadScript('https://cdn.jsdelivr.net/npm/@zxing/library@0.21.3/umd/index.min.js'); }
    catch(e2){ return false; }
  }
  return !!(window.ZXing && window.ZXing.BrowserMultiFormatReader);
}


/* המסגרת שהמשתמש מיישר אליה חייבת להיות בדיוק האזור שנסרק.
   object-fit: cover מקטין את הווידאו כדי לכסות את המסך וחותך
   את העודף, אז ממירים את מלבן המסגרת חזרה לקואורדינטות המקור. */
function frameSourceRect(video){
  const vw = video.videoWidth, vh = video.videoHeight;
  if (!vw || !vh) return null;
  const vr = video.getBoundingClientRect();
  const fr = $('camFrame').getBoundingClientRect();
  if (!vr.width || !vr.height || !fr.width) return null;

  const s = Math.max(vr.width / vw, vr.height / vh);
  const offX = (vw * s - vr.width) / 2;
  const offY = (vh * s - vr.height) / 2;

  let sx = (fr.left - vr.left + offX) / s;
  let sy = (fr.top  - vr.top  + offY) / s;
  let sw = fr.width  / s;
  let sh = fr.height / s;

  /* קצת שוליים, בעיקר לגובה: ברקוד לא תמיד ממורכז לגמרי במסגרת */
  const px = sw * 0.06, py = sh * 0.18;
  sx -= px; sy -= py; sw += px * 2; sh += py * 2;
  sx = Math.max(0, sx); sy = Math.max(0, sy);
  sw = Math.min(sw, vw - sx); sh = Math.min(sh, vh - sy);
  return (sw > 20 && sh > 20) ? {sx, sy, sw, sh} : null;
}

async function scanBarcode(){
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    toast('הדפדפן הזה לא תומך במצלמה'); return;
  }
  showCam('סריקת ברקוד', 'כוון את הברקוד למסגרת');
  const video = $('camVideo');

  /* רזולוציה נמוכה היא הסיבה הנפוצה ביותר לכך שברקוד לא נקרא:
     הפסים הדקים של EAN-13 פשוט לא נפרדים ב-640x480. */
  const tries = [
    {video:{facingMode:{ideal:'environment'}, width:{ideal:1920}, height:{ideal:1080}}},
    {video:{facingMode:{ideal:'environment'}, width:{ideal:1280}, height:{ideal:720}}},
    {video:{facingMode:'environment'}},
    {video:true}
  ];
  for (const c of tries){
    try { camStream = await navigator.mediaDevices.getUserMedia(c); break; } catch(e){}
  }
  if (!camStream){
    closeCam();
    toast('לא הצלחתי לפתוח את המצלמה — בדוק שההרשאה ניתנה');
    return;
  }

  /* ספארי לא ינגן וידאו בלי שלושת אלה, ובלי ניגון videoWidth נשאר 0 */
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.muted = true;
  video.srcObject = camStream;
  try { await video.play(); } catch(e){}
  await new Promise(res => {
    if (video.readyState >= 2) return res();
    video.onloadeddata = res;
    setTimeout(res, 2500);
  });

  camTrack = camStream.getVideoTracks()[0];
  try {
    const caps = camTrack.getCapabilities ? camTrack.getCapabilities() : {};
    if (caps.focusMode && caps.focusMode.indexOf('continuous') > -1){
      await camTrack.applyConstraints({advanced:[{focusMode:'continuous'}]});
    }
    if (caps.torch){
      $('camTorch').hidden = false;
      $('camTorch').onclick = async () => {
        const on = $('camTorch').dataset.on === '1';
        try {
          await camTrack.applyConstraints({advanced:[{torch:!on}]});
          $('camTorch').dataset.on = on ? '0' : '1';
          $('camTorch').textContent = on ? 'הדלקת פנס' : 'כיבוי פנס';
        } catch(e){}
      };
    }
  } catch(e){}

  if (!video.videoWidth){
    closeCam();
    toast('המצלמה לא החזירה תמונה — נסה לסגור ולפתוח את הלשונית');
    return;
  }
  hintTimer = setTimeout(() => {
    $('camHint').textContent = 'קרב עד שהברקוד ממלא את רוחב המסגרת, והחזק יציב';
    $('camManual').hidden = false;
    $('camManualBtn').hidden = true;
  }, 8000);

  const formats = ['ean_13','ean_8','upc_a','upc_e','code_128','itf'];
  if (await nativeDetectorOK()){
    let det;
    try { det = new window.BarcodeDetector({formats}); } catch(e){ det = new window.BarcodeDetector(); }
    camLoop = setInterval(async () => {
      if (!camStream) return;
      try {
        const codes = await det.detect(video);
        if (codes && codes.length) onBarcode(codes[0].rawValue);
      } catch(e){}
    }, 300);
    return;
  }

  $('camHint').textContent = 'מפעיל סורק…';
  if (!(await ensureZXing())){
    closeCam(); toast('הסורק לא נטען'); return;
  }
  $('camHint').textContent = 'כוון את הברקוד למסגרת';

  const Z = window.ZXing;
  const hints = new Map();
  hints.set(Z.DecodeHintType.POSSIBLE_FORMATS, [
    Z.BarcodeFormat.EAN_13, Z.BarcodeFormat.EAN_8,
    Z.BarcodeFormat.UPC_A,  Z.BarcodeFormat.UPC_E,
    Z.BarcodeFormat.CODE_128, Z.BarcodeFormat.ITF
  ]);
  const reader = new Z.MultiFormatReader();
  reader.setHints(hints);
  zxReader = reader;

  const canvas = document.createElement('canvas');
  let ctx;
  try { ctx = canvas.getContext('2d', {willReadFrequently:true}); }
  catch(e){ ctx = canvas.getContext('2d'); }

  /* מפענחים בעצמנו ולא דרך decodeFromVideoElement: הספרייה מפענחת
     את הפריים המלא, ובאייפון מחזור כזה על 1080p לא מספיק להסתיים
     לפני שהבא מתחיל. כאן חותכים את הרצועה שבמסגרת ומקטינים ל-900px. */
  function tryDecode(alsoInverted){
    const src = new Z.HTMLCanvasElementLuminanceSource(canvas);
    const sources = alsoInverted ? [src, new Z.InvertedLuminanceSource(src)] : [src];
    for (const lum of sources){
      try {
        const res = reader.decode(new Z.BinaryBitmap(new Z.HybridBinarizer(lum)), hints);
        if (res) return res.getText();
      } catch(e){
        if (!(e instanceof Z.NotFoundException) && !/NotFound/.test(String(e && e.name))){
          throw e;                    /* שגיאה אמיתית — לא נבלע אותה */
        }
      } finally {
        try { reader.reset(); } catch(e){}
      }
    }
    return null;
  }

  let tick = 0, reported = false;
  camLoop = setInterval(() => {
    if (!camStream || !zxReader) return;
    const vw = video.videoWidth, vh = video.videoHeight;
    if (!vw || !vh) return;

    /* שלושה פריימים מתוך ארבעה: בדיוק מה שבתוך המסגרת.
       הרביעי: הפריים המלא, למקרה שהברקוד מחוץ לה.
       החיתוך הצמוד הוא העיקר — קורא ה-1D דוגם 15 שורות בלבד
       על פני גובה התמונה, אז רצועה גבוהה מדי גורמת לכך שכמעט
       אף שורה לא חוצה את הברקוד. */
    const tight = (tick++ % 4) !== 0;
    const r = tight ? frameSourceRect(video) : null;
    const sx = r ? r.sx : 0, sy = r ? r.sy : 0;
    const sw = r ? r.sw : vw, sh = r ? r.sh : vh;

    const maxW = r ? 1400 : 1000;
    const scale = Math.min(1, maxW / sw);
    canvas.width  = Math.round(sw * scale);
    canvas.height = Math.round(sh * scale);
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

    try {
      const text = tryDecode(tick % 8 === 0);
      if (text) onBarcode(text);
    } catch(e){
      if (!reported){
        reported = true;
        console.error('barcode decode failed:', e);
        toast('שגיאה בסורק: ' + ((e && e.message) || e));
      }
    }
  }, 200);
}

let lastCode = null;
let pendingBarcode = null;

/* מוצר שנסרק פעם אחת והוזן ידנית נזכר לנצח, לפי הברקוד.
   זה הפתרון האמיתי לכיסוי החלקי של מוצרים ישראליים. */
function localByBarcode(code){
  return state.custom.find(f => f.bc && (f.bc === code ||
    f.bc === '0' + code || '0' + f.bc === code)) || null;
}

async function onBarcode(code){
  code = String(code || '').trim();
  if (!code || code === lastCode) return;
  lastCode = code;
  setTimeout(() => { lastCode = null; }, 2500);
  if (navigator.vibrate) navigator.vibrate(60);
  closeCam();
  pendingBarcode = code;

  /* קודם הזיכרון המקומי — מיידי, ועובד גם בלי אינטרנט */
  const known = localByBarcode(code);
  if (known){ openSheet('search'); pickFood(known.n); return; }

  /* מציגים את המספר שנקרא, כדי שיהיה ברור שהסריקה הצליחה
     גם כשהמוצר לא נמצא */
  toast('ברקוד ' + code + ' — מחפש…');
  const res = await lookupBarcode(code);

  if (res && res.food){
    const food = res.food;
    food.bc = code;
    if (!state.custom.some(f => f.n === food.n)){ state.custom.unshift(food); saveCustom(); }
    openSheet('search');
    pickFood(food.n);
    return;
  }

  /* לא נמצא, או נמצא רק השם: פותחים טופס עם מה שיש */
  openSheet('new');
  $('nName').value = (res && res.name) || '';
  $('nKcal').focus();
  toast(res && res.name
    ? 'זוהה: ' + res.name + '. השלם ערכים והוא ייזכר לפעם הבאה.'
    : 'ברקוד ' + code + ' לא נמצא במאגר. הזן אותו פעם אחת והוא ייזכר.');
  return;
  if (!state.custom.some(f => f.n === food.n)){ state.custom.unshift(food); saveCustom(); }
  openSheet('search');
  pickFood(food.n);
}

/* UPC-A בן 12 ספרות נשמר ב-Open Food Facts עם אפס מוביל,
   וההפך קורה גם הוא. לכן מנסים כמה וריאציות לפני שמוותרים. */
function codeVariants(code){
  const out = [code];
  if (code.length === 12) out.push('0' + code);
  if (code.length === 13 && code[0] === '0') out.push(code.slice(1));
  if (code.length === 8)  out.push(code.padStart(13,'0'));
  return out;
}

async function lookupBarcode(code){
  const off = await lookupOFF(code);
  if (off) return {food: off};

  /* מקור שני: מחזיר שם ומותג בלבד, בלי ערכים תזונתיים.
     עדיין חוסך למשתמש להקליד את השם. */
  try {
    const r = await fetch('https://api.upcitemdb.com/prod/trial/lookup?upc=' +
                          encodeURIComponent(code));
    if (r.ok){
      const j = await r.json();
      const it = j && j.items && j.items[0];
      if (it && it.title) return {name: (it.brand ? it.brand + ' · ' : '') + it.title};
    }
  } catch(e){}

  return null;
}

async function lookupOFF(code){
  for (const c of codeVariants(code)){
    const url = 'https://world.openfoodfacts.org/api/v2/product/' + encodeURIComponent(c) +
                '.json?fields=product_name,product_name_he,brands,nutriments,serving_quantity';
    let j;
    try { j = await (await fetch(url)).json(); }
    catch(e){ toast('אין חיבור לאינטרנט'); return null; }
    if (!j || j.status === 0 || !j.product) continue;

    const p = j.product, N = p.nutriments || {};
    let kcal = N['energy-kcal_100g'];
    if (kcal == null && N['energy_100g'] != null) kcal = N['energy_100g'] / 4.184;
    if (kcal == null) continue;

    const name = (p.product_name_he || p.product_name || 'מוצר ' + c).trim();
    const brand = (p.brands || '').split(',')[0].trim();
    const food = {
      n: brand && name.indexOf(brand) === -1 ? name + ' · ' + brand : name,
      g: 'ברקוד ' + c,
      k: round(kcal, 1),
      p: round(N['proteins_100g'] || 0, 1),
      c: round(N['carbohydrates_100g'] || 0, 1),
      f: round(N['fat_100g'] || 0, 1)
    };
    const sq = parseFloat(p.serving_quantity);
    if (sq > 0 && sq < 1000) food.u = ['מנה (' + Math.round(sq) + ' ג׳)', Math.round(sq)];
    return food;
  }
  return null;
}

/* ---------- meal photo ---------- */
$('shootMeal').addEventListener('click', () => $('mealFile').click());
$('mealFile').addEventListener('change', async e => {
  const file = e.target.files && e.target.files[0];
  e.target.value = '';
  if (file) analyzeMeal(file);
});

function fileToImage(file){
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => rej(new Error('image'));
    img.src = URL.createObjectURL(file);
  });
}
async function downscale(file, max){
  const img = await fileToImage(file);
  const s = Math.min(1, max / Math.max(img.width, img.height));
  const cv = document.createElement('canvas');
  cv.width = Math.round(img.width * s);
  cv.height = Math.round(img.height * s);
  cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
  URL.revokeObjectURL(img.src);
  return cv.toDataURL('image/jpeg', 0.82).split(',')[1];
}

const MEAL_PROMPT =
  'זהה את המאכלים בתמונה והערך את הכמות והערכים התזונתיים של כל אחד. ' +
  'החזר JSON בלבד, בלי טקסט מסביב ובלי גדרות markdown, במבנה: ' +
  '{"items":[{"name":"שם בעברית","grams":150,"kcal":220,"protein":18,"carbs":12,"fat":9}]}. ' +
  'אם התמונה אינה של אוכל, החזר {"items":[]}.';

async function analyzeMeal(file){
  const box = $('mealResult');
  box.innerHTML = '<div style="color:var(--mut);font-size:13.5px"><i class="spin"></i>מנתח את התמונה…</div>';
  let b64;
  try { b64 = await downscale(file, 1024); }
  catch(e){ box.innerHTML = '<div style="color:var(--bad);font-size:13.5px">לא הצלחתי לקרוא את התמונה</div>'; return; }

  const payload = {
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: [
        {type:'image', source:{type:'base64', media_type:'image/jpeg', data:b64}},
        {type:'text', text: MEAL_PROMPT}
      ]
    }]
  };

  const endpoint = state.apiUrl || 'https://api.anthropic.com/v1/messages';
  let data;
  try {
    const r = await fetch(endpoint, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    data = await r.json();
  } catch(e){
    box.innerHTML = '<div style="font-size:13.5px;color:var(--mut);line-height:1.6">' +
      '<b style="color:var(--bad)">זיהוי המנה לא זמין.</b><br>' +
      'צילום מנה דורש שרת קטן שמחזיק את מפתח ה‑API. ' +
      'העלה את <code>worker.js</code> שבחבילה ל‑Cloudflare Workers, ' +
      'והדבק את הכתובת שתקבל בשדה «שרת זיהוי מנות» במסך הפרופיל.</div>';
    return;
  }

  let txt = '';
  try {
    txt = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n');
  } catch(e){}
  let parsed = null;
  try { parsed = JSON.parse(txt.replace(/```json|```/g, '').trim()); } catch(e){}

  if (!parsed || !parsed.items || !parsed.items.length){
    box.innerHTML = '<div style="color:var(--mut);font-size:13.5px">לא זיהיתי אוכל בתמונה. נסה זווית אחרת או תאורה טובה יותר.</div>';
    return;
  }
  renderMealResult(parsed.items);
}

let mealItems = [];
function renderMealResult(items){
  mealItems = items.map(it => ({
    n: String(it.name || 'מאכל'),
    q: (Math.round(it.grams) || 0) + ' גרם (הערכה)',
    k: +it.kcal || 0, p: +it.protein || 0, c: +it.carbs || 0, f: +it.fat || 0
  }));
  const total = mealItems.reduce((s,i) => s + i.k, 0);
  $('mealResult').innerHTML =
    '<div style="font-size:13px;color:var(--mut);margin-bottom:6px">זוהו ' + mealItems.length +
    ' פריטים · ' + nf(total) + ' קק״ל בסך הכל. הערכים הם אומדן, אפשר לתקן אחרי ההוספה.</div>' +
    mealItems.map((it,i) =>
      '<label class="mealitem"><input type="checkbox" data-mi="'+i+'" checked>' +
      '<span class="nm"><b>'+esc(it.n)+'</b><span>'+esc(it.q)+'</span></span>' +
      '<span class="kc">'+Math.round(it.k)+'</span></label>').join('') +
    '<button class="btn" id="addMeal" style="margin-top:12px">הוספה ליומן</button>';

  $('addMeal').addEventListener('click', () => {
    const chosen = [...document.querySelectorAll('[data-mi]')]
      .filter(cb => cb.checked).map(cb => mealItems[+cb.dataset.mi]);
    if (!chosen.length){ toast('לא נבחר כלום'); return; }
    const meal = $('mealSel2').value || state.meal;
    chosen.forEach(it => state.log[meal].push(it));
    saveLog(); renderDiary(); renderSummary(); closeSheet();
    toast(chosen.length + ' פריטים · ' + nf(chosen.reduce((s,i) => s + i.k, 0)) + ' קק״ל');
  });
}

/* ---------- quick actions ---------- */
document.querySelector('.quick').addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const a = b.dataset.act;
  if (a === 'barcode') { scanBarcode(); return; }
  if (a === 'meal')    { openSheet('meal'); return; }
  if (a === 'ex')      { openSheet('ex'); return; }
  openSheet('search');
});


/* ============================================================
   סנכרון עם הענן — מיזוג לפי חותמת זמן, המאוחר מנצח
   ============================================================ */
async function syncFromCloud(){
  if (typeof Cloud === 'undefined' || !Cloud.signedIn()) return false;
  let rows;
  try { rows = await Cloud.pull(); }
  catch(e){ return false; }
  let changed = false;
  for (const row of rows){
    const localTs = STAMPS[row.key];
    if (!localTs || new Date(row.updated_at) > new Date(localTs)){
      await Store.setLocal(row.key, row.value);
      STAMPS[row.key] = row.updated_at;
      changed = true;
    }
  }
  if (changed){ try { localStorage.setItem('maazan:stamps', JSON.stringify(STAMPS)); } catch(e){} }

  /* מפתחות שקיימים מקומית ולא בענן — נדחפים למעלה */
  const remote = new Set(rows.map(r => r.key));
  for (const k of Object.keys(STAMPS)){
    if (!remote.has(k) && k.indexOf('maazan:sb:') !== 0){
      const v = await Store.get(k);
      if (v != null) Cloud.enqueue(k, v);
    }
  }
  await Cloud.flush();
  return changed;
}

async function reloadEverything(){
  try {
    const p = await Store.get('maazan:profile'); if (p) Object.assign(state.profile, JSON.parse(p));
    const c = await Store.get('maazan:custom');  if (c) state.custom  = JSON.parse(c) || [];
    const r = await Store.get('maazan:recent');  if (r) state.recent  = JSON.parse(r) || [];
    const w = await Store.get('maazan:weights'); if (w) state.weights = JSON.parse(w) || {};
  } catch(e){}
  const P = state.profile;
  [...$('sexSeg').children].forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === P.sex)));
  $('age').value = P.age; $('height').value = P.height; $('weight').value = P.weight;
  $('activity').value = P.activity; $('goal').value = P.goal;
  await loadLog();
  renderAll();
}

/* ---------- בדיקות קלט משותפות ---------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function checkUsername(u){
  if (!u) return 'צריך לבחור שם משתמש';
  if (!/^[a-zA-Z0-9._-]{3,20}$/.test(u))
    return 'שם משתמש: 3–20 תווים באנגלית, ספרות, נקודה, מקף או קו תחתון';
  return null;
}

function checkCredentials(mode, email, pass, pass2){
  if (!email)                      return 'צריך להזין אימייל';
  if (!EMAIL_RE.test(email))       return 'האימייל לא נראה תקין';
  if (!pass)                       return 'צריך להזין סיסמה';
  if (mode === 'up' && pass.length < 6)  return 'הסיסמה צריכה להיות באורך 6 תווים לפחות';
  if (mode === 'up' && pass !== pass2)   return 'הסיסמאות אינן זהות';
  return null;
}

/* בדיקה שרצה בדפדפן: id כפול שובר את getElementById בשקט */
function dupIds(){
  const seen = {}, dup = [];
  document.querySelectorAll('[id]').forEach(el => {
    if (seen[el.id]) { if (dup.indexOf(el.id) === -1) dup.push(el.id); }
    else seen[el.id] = 1;
  });
  return dup.length ? dup.join(', ') : 'אין';
}

/* ---------- ממשק החשבון ---------- */
function renderAccount(){
  const cfgd = Cloud.ready(), inn = Cloud.signedIn();
  $('acctOffline').hidden = cfgd;
  $('acctOut').hidden     = !cfgd || inn;
  $('acctIn').hidden      = !inn;
  if (inn){
    const u = Cloud.user();
    $('acctEmail').textContent = u ? u.email : '';
    const last = Cloud.lastSync(), pend = Cloud.pending();
    $('acctSync').textContent = pend
      ? pend + ' שינויים ממתינים לסנכרון'
      : last ? 'סונכרן ' + new Date(last).toLocaleString('he-IL',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})
             : 'מסונכרן';
  }
}
Cloud.onChange(renderAccount);

let acctMode = 'in';
function acctSetMode(m){
  acctMode = m;
  const up = m === 'up';
  $('acctPass2Row').hidden  = !up;
  $('btnAuth').textContent  = up ? 'יצירת חשבון' : 'כניסה';
  $('btnAuthToggle').textContent = up ? 'כבר יש לי חשבון — כניסה' : 'אין לי חשבון — הרשמה';
  $('acctPass').setAttribute('autocomplete', up ? 'new-password' : 'current-password');
  if (!up) $('acctPass2').value = '';
}
acctSetMode('in');
$('btnAuthToggle').addEventListener('click', () => acctSetMode(acctMode === 'up' ? 'in' : 'up'));
$('btnAuth').addEventListener('click', () => doAuth(acctMode));

async function doAuth(mode){
  const email = $('acctMail').value.trim(), pass = $('acctPass').value, pass2 = $('acctPass2').value;
  const err = checkCredentials(mode, email, pass, pass2);
  if (err){ toast(err); return; }
  const btn = $('btnAuth'), label = btn.textContent;
  btn.textContent = 'רגע…'; btn.disabled = true;
  try {
    if (mode === 'up'){
      const r = await Cloud.signUp(email, pass);
      if (r.exists){
        toast('האימייל הזה כבר רשום. עבור לכניסה, או השתמש באימייל אחר.');
        acctSetMode('in'); return;
      }
      if (r.needsConfirm){
        toast('נשלח מייל אישור ל' + email + '. אשר אותו ואז התחבר.');
        acctSetMode('in'); return;
      }
    } else {
      await Cloud.signIn(email, pass);
    }
    $('acctPass').value = ''; $('acctPass2').value = '';
    await syncFromCloud();
    await reloadEverything();
    renderAccount();
    await loadMe();
    if (!state.me){ promptIdentity(); return; }
    toast('מחובר · הנתונים סונכרנו');
  } catch(e){
    toast(authError(e));
  } finally {
    btn.textContent = label; btn.disabled = false;
  }
}

function authError(e){
  const m = String((e && e.message) || e || '');
  if (m.indexOf('Invalid') === 0)      return 'אימייל או סיסמה שגויים';
  if (m.indexOf('already') > -1)       return 'האימייל הזה כבר רשום — נסה כניסה';
  if (m.indexOf('weak') > -1)          return 'הסיסמה חלשה מדי';
  if (/Failed to fetch|NetworkError/.test(m)) return 'אין חיבור לשרת';
  return m || 'הפעולה נכשלה';
}

$('btnSignOut').addEventListener('click', async () => {
  await Cloud.signOut();
  renderAccount();
  toast('התנתקת. הנתונים נשארו על המכשיר.');
});
$('btnSyncNow').addEventListener('click', async () => {
  toast('מסנכרן…');
  await Cloud.flush();
  const changed = await syncFromCloud();
  if (changed) await reloadEverything();
  renderAccount();
  toast('הסנכרון הושלם');
});


/* ============================================================
   מסך פתיחה — חשבון ואז פרטים אישיים, פעם אחת בלבד
   ============================================================ */
const ONB_KEY = 'maazan:onboarded';
function onbDone(){ try { return !!localStorage.getItem(ONB_KEY); } catch(e){ return false; } }
function markOnbDone(){ try { localStorage.setItem(ONB_KEY, '1'); } catch(e){} }

let obMode = 'up';   // up = הרשמה, in = כניסה

function obStep(n){
  $('obAccount').hidden = (n !== 1);
  $('obIdent').hidden   = (n !== 2);
  $('obDetails').hidden = (n !== 3);
  $('stp1').classList.toggle('on', n >= 1);
  $('stp2').classList.toggle('on', n >= 2);
  $('stp3').classList.toggle('on', n >= 3);
}
function obSetMode(m){
  obMode = m;
  const up = m === 'up';
  $('obTitle').textContent  = up ? 'ברוך הבא למאזן' : 'כניסה לחשבון';
  $('obLead').textContent   = up
    ? 'פתח חשבון כדי שהיומן שלך יישמר ויעבור איתך בין הטלפון למחשב.'
    : 'התחבר, והנתונים שלך יימשכו חזרה למכשיר הזה.';
  $('obGo').textContent     = up ? 'יצירת חשבון' : 'כניסה';
  $('obToggle').textContent = up ? 'כבר יש לי חשבון — כניסה' : 'אין לי חשבון — הרשמה';
  $('obPass').setAttribute('autocomplete', up ? 'new-password' : 'current-password');
  $('obPass2Row').hidden = !up;
  if (!up) $('obPass2').value = '';
}
$('obToggle').addEventListener('click', () => obSetMode(obMode === 'up' ? 'in' : 'up'));
['obMail','obPass','obPass2'].forEach(id => {
  $(id).addEventListener('keydown', e => { if (e.key === 'Enter') $('obGo').click(); });
});

$('obSex').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  [...e.currentTarget.children].forEach(x => x.setAttribute('aria-pressed', String(x === b)));
});

$('obGo').addEventListener('click', async () => {
  const email = $('obMail').value.trim(), pass = $('obPass').value, pass2 = $('obPass2').value;
  const err = checkCredentials(obMode, email, pass, pass2);
  if (err){ toast(err); return; }
  const btn = $('obGo'), label = btn.textContent;
  btn.textContent = 'רגע…'; btn.disabled = true;
  try {
    if (obMode === 'up'){
      const r = await Cloud.signUp(email, pass);
      if (r.exists){
        toast('האימייל הזה כבר רשום. עבור לכניסה, או השתמש באימייל אחר.');
        obSetMode('in');
        return;
      }
      /* אישור מייל מופעל: אין עדיין סשן, אז אי אפשר ליצור פרופיל.
         הוא ייווצר בכניסה הראשונה, כשהשלב הזה יופיע שוב. */
      if (r.needsConfirm){
        toast('נשלח מייל אישור ל' + email + '. אשר אותו ואז התחבר.');
        obSetMode('in');
        return;
      }
    } else {
      await Cloud.signIn(email, pass);
    }
    $('obPass').value = ''; $('obPass2').value = '';
    await syncFromCloud();
    await reloadEverything();
    renderAccount();
    await loadMe();

    /* עכשיו יש סשן, ורק עכשיו אפשר לגעת במסד. */
    if (!state.me){ obStep(2); $('obUser').focus(); return; }

    /* משתמש חוזר שכבר יש לו פרופיל בענן — אין טעם לשאול אותו שוב */
    const existing = await Store.get('maazan:profile');
    if (existing){ obFinishNow(); toast('מחובר · הנתונים שוחזרו'); }
    else { obPrefill(); obStep(3); }
  } catch(e){
    toast(authError(e));
  } finally {
    btn.textContent = label; btn.disabled = false;
  }
});

$('obSkip').addEventListener('click', () => { obPrefill(); obStep(3); });

/* בקשת זהות בפני עצמה — למשתמש שיש לו חשבון אבל עוד אין לו שם משתמש */
let obFlow = 'full';   // 'full' = הרשמה מלאה, 'identity' = רק שם משתמש

function promptIdentity(){
  obFlow = 'identity';
  obStep(2);
  $('onb').hidden = false;
  $('obUser').focus();
}

$('obIdentGo').addEventListener('click', async () => {
  const uname = $('obUser').value.trim();
  const err = checkUsername(uname);
  if (err){ toast(err); return; }
  if (!Cloud.ready()){ obPrefill(); obStep(3); return; }
  if (!Cloud.signedIn()){ toast('צריך להתחבר קודם'); obStep(1); return; }

  const btn = $('obIdentGo'), label = btn.textContent;
  btn.textContent = 'רגע…'; btn.disabled = true;
  try {
    if (await Cloud.usernameTaken(uname)){ toast('שם המשתמש כבר תפוס, נסה אחר'); return; }
    await Cloud.saveProfile({
      username: uname,
      display_name: $('obName').value,
      role: segValue('obRole')
    });
    await loadMe();
    /* אם נכנסנו רק בשביל שם משתמש, או שכבר יש פרטים אישיים —
       אין מה להמשיך, סוגרים. */
    const existing = await Store.get('maazan:profile');
    if (obFlow === 'identity' || onbDone() || existing){
      obFinishNow();
      renderAll();
      toast('שם המשתמש נשמר');
      return;
    }
    obPrefill(); obStep(3);
  } catch(e){
    /* המפתח הייחודי במסד הוא ההגנה האמיתית מפני כפילות */
    const m = String((e && e.message) || e);
    console.error('identity save failed:', e);
    toast(/409|duplicate|unique/i.test(m) ? 'שם המשתמש כבר תפוס, נסה אחר' : m);
  } finally {
    btn.textContent = label; btn.disabled = false;
  }
});

function obPrefill(){
  const P = state.profile;
  [...$('obSex').children].forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === P.sex)));
  $('obAge').value = P.age; $('obHeight').value = P.height; $('obWeight').value = P.weight;
  $('obActivity').value = P.activity; $('obGoal').value = P.goal;
}

$('obFinish').addEventListener('click', async () => {
  const sex = [...$('obSex').children].find(b => b.getAttribute('aria-pressed') === 'true');
  const age = parseFloat($('obAge').value), h = parseFloat($('obHeight').value), w = parseFloat($('obWeight').value);
  if (!(age > 0) || !(h > 0) || !(w > 0)){ toast('צריך למלא גיל, גובה ומשקל'); return; }
  state.profile = {
    sex: sex ? sex.dataset.v : 'male',
    age, height: h, weight: w,
    activity: $('obActivity').value,
    goal: $('obGoal').value
  };
  await saveProfile();
  state.weights[todayKey()] = round(w, 1);
  await saveWeights();
  const P = state.profile;
  [...$('sexSeg').children].forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === P.sex)));
  $('age').value = P.age; $('height').value = P.height; $('weight').value = P.weight;
  $('activity').value = P.activity; $('goal').value = P.goal;
  obFinishNow();
  renderAll();
});

function obFinishNow(){
  markOnbDone();
  $('onb').hidden = true;
  document.body.style.overflow = '';
}

function maybeOnboard(){
  obFlow = 'full';
  if (Cloud.signedIn() && Cloud.ready()){
    /* מחובר אבל בלי שם משתמש — למשל אחרי אישור מייל */
    Cloud.myProfile().then(p => { if (!p) promptIdentity(); }).catch(() => {});
  }
  if (onbDone() || Cloud.signedIn()) return;
  obSetMode('up');
  obStep(1);
  if (!Cloud.ready()){
    /* בלי שרת אין חשבון ואין שם משתמש — ישר לפרטים האישיים */
    obPrefill(); obStep(3);
  }
  $('onb').hidden = false;
}


/* ============================================================
   מאמן ומתאמן
   הגישה לנתונים נשענת על מדיניות ה-RLS ב-schema.sql: מאמן קורא
   שורות של מתאמן רק כשקיים קישור מאושר. הקוד כאן הוא הממשק,
   לא ההגנה — ביטול אישור סוגר את הגישה גם אם הקוד לא ידע על כך.
   ============================================================ */
const APP_VERSION = 30;
const USERNAME_RE = /^[a-z0-9._-]{3,20}$/i;
let coachTimer = null;

function isCoach(){ return !!(state.me && state.me.role === 'coach'); }
function personLabel(p){
  if (!p) return 'משתמש';
  return p.display_name ? p.display_name : '@' + p.username;
}

function segValue(id){
  const b = [...$(id).children].find(x => x.getAttribute('aria-pressed') === 'true');
  return b ? b.dataset.v : 'trainee';
}
function bindSeg(id){
  $(id).addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    [...e.currentTarget.children].forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  });
}
bindSeg('obRole');

$('roleSeg').addEventListener('click', async e => {
  const b = e.target.closest('button'); if (!b || !state.me) return;
  const role = b.dataset.v;
  if (role === state.me.role) return;
  try {
    await Cloud.setRole(role);
    await loadMe();
    toast(role === 'coach' ? 'החשבון סומן כמאמן' : 'החשבון סומן כמתאמן');
  } catch(err){
    toast(String((err && err.message) || err));
    renderRoleUI();
  }
});

$('diagBtn').addEventListener('click', async () => {
  const out = $('diagOut');
  out.hidden = false;
  out.textContent = 'בודק…';
  try {
    const d = await Cloud.diagnose();
    out.textContent =
      'שרת מוגדר: ' + (d.configured ? 'כן' : 'לא') + '\n' +
      'מחובר: ' + (d.signedIn ? 'כן' : 'לא') + '\n' +
      'שם משתמש: ' + (d.profile ? '@' + d.profile.username : 'אין פרופיל') + '\n' +
      'תפקיד: ' + (d.profile ? d.profile.role : '—') + '\n' +
      'קישורים: ' + (d.links === null ? '—' : d.links) + '\n' +
      'שדות כפולים: ' + dupIds() + '\n' +
      'מאגר תרגילים: ' + (typeof EXERCISES !== 'undefined' && EXERCISES.length
        ? EXERCISES.length : 'חסר — exercises.js לא נטען') + '\n' +
      'גרסה: ' + APP_VERSION +
      (d.errors.length ? '\n\nשגיאות:\n' + d.errors.join('\n') : '\n\nהכל תקין');
  } catch(e){
    out.textContent = 'הבדיקה נכשלה: ' + ((e && e.message) || e);
  }
});

async function loadMe(){
  state.me = null;
  if (!Cloud.signedIn() || !Cloud.ready()) { renderRoleUI(); return; }
  try { state.me = await Cloud.myProfile(); } catch(e){}
  renderRoleUI();
  refreshRequests();
}

function renderRoleUI(){
  const inn = Cloud.signedIn() && !!state.me;
  $('roleRow').hidden = !inn;
  $('diagRow').hidden = !Cloud.signedIn();
  if (state.me){
    [...$('roleSeg').children].forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.v === state.me.role)));
  }
  $('coachEntry').hidden  = !(inn && isCoach());
  $('reqBlock').hidden    = !(inn && !isCoach());
  $('tabCoaching').hidden = !(inn && isCoach());
  /* אם התפקיד השתנה בזמן שהקטגוריה פתוחה — לא להשאיר מסך יתום */
  if (!isCoach() && !$('prog-coaching').hidden) progTab('mine');
  if (inn && state.me){
    $('coachEntrySub').textContent =
      'מחובר כ־@' + state.me.username + '. חפש מתאמן לפי שם משתמש ובקש גישה ליומן שלו.';
  }
}

/* ---------- צד המתאמן: בקשות נכנסות ---------- */
async function refreshRequests(){
  if (!Cloud.signedIn() || isCoach()) return;
  let links = [];
  try { links = await Cloud.traineeLinks(); } catch(e){ return; }
  const names = await Cloud.profilesByIds(links.map(l => l.coach_id)).catch(() => ({}));
  const pend = links.filter(l => l.status === 'pending');
  const appr = links.filter(l => l.status === 'approved');
  $('reqCount').textContent = pend.length ? pend.length + ' ממתינות' : '';

  if (!links.length){
    $('reqList').innerHTML = '<div class="empty">כשמאמן יבקש לצפות ביומן שלך, הבקשה תופיע כאן לאישור.</div>';
    return;
  }
  $('reqList').innerHTML = links.filter(l => l.status !== 'declined' && l.status !== 'revoked')
    .map(l => {
      const p = names[l.coach_id];
      const act = l.status === 'pending'
        ? '<button class="mini go" data-ok="'+l.id+'">אישור</button>' +
          '<button class="mini no" data-no="'+l.id+'">דחייה</button>'
        : '<button class="mini go" data-chat="'+l.id+'" data-name="'+esc(personLabel(p))+'">צ׳אט</button>' +
          '<button class="mini no" data-no="'+l.id+'">ביטול גישה</button>';
      return '<div class="person"><div class="who"><b>' + esc(personLabel(p)) + '</b>' +
             '<span>' + (l.status === 'pending' ? 'מבקש לצפות ביומן שלך' : 'צופה ביומן שלך') +
             '</span></div><div class="act">' + act + '</div></div>';
    }).join('') ||
    '<div class="empty">אין בקשות פעילות.</div>';
}

$('reqList').addEventListener('click', async e => {
  const ch = e.target.closest('[data-chat]');
  if (ch){ openChat(ch.dataset.chat, ch.dataset.name); return; }
  const ok = e.target.closest('[data-ok]'), no = e.target.closest('[data-no]');
  if (!ok && !no) return;
  try {
    await Cloud.setLinkStatus(ok ? ok.dataset.ok : no.dataset.no, ok ? 'approved' : 'revoked');
    toast(ok ? 'הגישה אושרה' : 'הגישה בוטלה');
    refreshRequests();
  } catch(err){ toast('הפעולה נכשלה'); }
});

/* ---------- צד המאמן ---------- */
let searchT;
$('coachQ').addEventListener('input', e => {
  clearTimeout(searchT);
  const term = e.target.value.trim();
  if (term.length < 2){ $('coachResults').innerHTML = ''; return; }
  searchT = setTimeout(() => runSearch(term), 350);
});

async function runSearch(term){
  let rows = [];
  try { rows = await Cloud.searchUsers(term); }
  catch(e){ $('coachResults').innerHTML = '<li class="empty">החיפוש נכשל</li>'; return; }

  /* מושכים את הקישורים מחדש ולא מסתמכים על state.links.
     רשימה ישנה בזיכרון היא בדיוק מה שגרם ל«כבר ברשימה» מול רשימה ריקה. */
  try { state.links = await Cloud.coachLinks(); } catch(e){}

  /* רק קישור חי חוסם בקשה חדשה. מבוטל או שנדחה — אפשר לבקש שוב. */
  const status = {};
  state.links.forEach(l => { status[l.trainee_id] = l.status; });
  $('coachResults').innerHTML = rows.length
    ? rows.map(p => {
        const st = status[p.user_id];
        let right;
        if (st === 'approved')     right = '<span class="tag ok">ברשימה שלך</span>';
        else if (st === 'pending') right = '<span class="tag wait">ממתין לאישור</span>';
        else right = '<button class="mini go" data-add="' + p.user_id + '">' +
                     (st ? 'בקשה חוזרת' : 'בקשת גישה') + '</button>';
        return '<li><div class="nm"><b>' + esc(personLabel(p)) + '</b><span>@' +
               esc(p.username) + '</span></div>' + right + '</li>';
      }).join('')
    : '<li class="empty">לא נמצא מתאמן בשם הזה</li>';
}

$('coachResults').addEventListener('click', async e => {
  const b = e.target.closest('[data-add]'); if (!b) return;
  b.disabled = true;
  const label = b.textContent;
  b.textContent = 'שולח…';
  try {
    await Cloud.requestLink(b.dataset.add);
    toast('הבקשה נשלחה, ממתינה לאישור המתאמן');
    $('coachQ').value = ''; $('coachResults').innerHTML = '';
    refreshCoach();
  } catch(err){
    const m = String((err && err.message) || err);
    console.error('requestLink failed:', err);
    /* 403 כאן פירושו כמעט תמיד שהחשבון לא מסומן כמאמן במסד */
    if (/403|row-level|policy/i.test(m)){
      toast('הבקשה נדחתה: החשבון שלך לא מסומן כמאמן. שנה את סוג החשבון במסך הפרופיל.');
    } else if (/409|duplicate|unique/i.test(m)){
      toast('כבר קיימת בקשה למתאמן הזה');
    } else {
      toast(m);
    }
    b.disabled = false; b.textContent = label;
  }
});

async function refreshCoach(){
  if (!Cloud.signedIn()){ $('coachList').innerHTML = '<div class="empty">צריך להתחבר.</div>'; return; }
  try { state.links = await Cloud.coachLinks(); }
  catch(e){ $('coachList').innerHTML = '<div class="empty">טעינת הרשימה נכשלה.</div>'; return; }
  state.names = await Cloud.profilesByIds(state.links.map(l => l.trainee_id)).catch(() => ({}));

  const live = state.links.filter(l => l.status !== 'declined' && l.status !== 'revoked');
  $('coachStatus').textContent = live.filter(l => l.status === 'approved').length + ' מאושרים';
  $('coachList').innerHTML = live.length
    ? live.map(l => {
        const p = state.names[l.trainee_id];
        const right = l.status === 'approved'
          ? '<button class="mini go" data-view="' + l.trainee_id + '">צפייה</button>' +
            '<button class="mini" data-chat="' + l.id + '" data-name="' + esc(personLabel(p)) + '">צ׳אט</button>' +
            '<button class="mini" data-plan="' + l.id + '" data-tid="' + l.trainee_id +
            '" data-name="' + esc(personLabel(p)) + '">תוכנית</button>'
          : '<span class="tag wait">ממתין לאישור</span>';
        return '<div class="person"><div class="who"><b>' + esc(personLabel(p)) + '</b>' +
               '<span>@' + esc(p ? p.username : '') + '</span></div>' +
               '<div class="act">' + right + '</div></div>';
      }).join('')
    : '<div class="empty">עוד לא הוספת מתאמנים. חפש למעלה לפי שם משתמש.</div>';
}

$('coachRefresh').addEventListener('click', () => { refreshCoach(); toast('הרשימה רועננה'); });

$('coachList').addEventListener('click', e => {
  const pl = e.target.closest('[data-plan]');
  if (pl){ openPlan(pl.dataset.plan, pl.dataset.tid, pl.dataset.name); return; }
  const ch = e.target.closest('[data-chat]');
  if (ch){ openChat(ch.dataset.chat, ch.dataset.name); return; }
  const b = e.target.closest('[data-view]'); if (b) openLive(b.dataset.view);
});

/* ---------- תצוגה חיה של יום המתאמן ---------- */
function stopLive(){
  if (coachTimer){ clearInterval(coachTimer); coachTimer = null; }
  state.live = null;
  const el = $('liveBlock'); if (el) el.hidden = true;
}
$('liveClose').addEventListener('click', stopLive);

async function openLive(traineeId){
  state.live = traineeId;
  const p = state.names[traineeId];
  $('liveName').textContent = personLabel(p);
  const link = state.links.find(l => l.trainee_id === traineeId && l.status === 'approved');
  $('liveChat').hidden = !link;
  $('liveChat').onclick = () => openChat(link && link.id, personLabel(p));
  $('livePlan').hidden = !link;
  $('livePlan').onclick = () => openPlan(link && link.id, traineeId, personLabel(p));
  $('liveDiet').hidden = !link;
  $('liveDiet').onclick = () => openDiet(link && link.id, traineeId, personLabel(p));
  $('liveBlock').hidden = false;
  $('liveBody').innerHTML = '<div class="empty"><i class="spin"></i>טוען…</div>';
  await drawLive();
  if (coachTimer) clearInterval(coachTimer);
  coachTimer = setInterval(() => { if (state.live) drawLive(); }, 20000);
}

async function drawLive(){
  const id = state.live;
  let rows;
  try { rows = await Cloud.pullFor(id); }
  catch(e){
    $('liveBody').innerHTML = '<div class="empty">אין גישה לנתונים. ייתכן שהמתאמן ביטל את האישור.</div>';
    stopLive(); refreshCoach(); return;
  }
  if (state.live !== id) return;

  const map = {};
  rows.forEach(r => { map[r.key] = r.value; });
  const parse = (k, d) => { try { return JSON.parse(map[k]); } catch(e){ return d; } };

  const prof = parse('maazan:profile', null);
  const log  = Object.assign(emptyLog(), parse('maazan:log:' + todayKey(), {}));
  const t = {k:0,p:0,c:0,f:0};
  MEALS.forEach(m => (log[m.id]||[]).forEach(i => { t.k+=i.k; t.p+=i.p; t.c+=i.c; t.f+=i.f; }));
  const ex = (log.exercise||[]).reduce((s,i) => s + i.k, 0);
  const T = prof ? compute(prof) : null;
  const remain = T ? Math.round(T.target - t.k + ex) : null;

  const rowsHtml = MEALS.map(m => {
    const items = log[m.id] || [];
    if (!items.length) return '';
    return '<div style="margin-top:12px"><div class="mhead"><h3 style="font-size:var(--t-body)">' +
      m.name + '</h3><div class="k">' + Math.round(items.reduce((s,i)=>s+i.k,0)) + ' קק״ל</div></div>' +
      '<ul class="items">' + items.map(it =>
        '<li><div class="nm"><b>' + esc(it.n) + '</b><span>' + esc(it.q||'') + '</span></div>' +
        '<div class="num">' + Math.round(it.k) + '</div></li>').join('') + '</ul></div>';
  }).join('');

  /* סטטוס האימון של היום, אם יש קישור פעיל */
  let wk = '';
  const lk = state.links.find(l => l.trainee_id === id && l.status === 'approved');
  if (lk){
    try {
      /* שתי הקריאות בלתי תלויות — אין סיבה לחכות לאחת בשביל השנייה */
      const [log, planRow] = await Promise.all([
        Cloud.getWorkoutLog(lk.id, todayKey()),
        Cloud.getPlan(lk.id)
      ]);
      const plan = normalizePlan((planRow || {}).plan);
      const todays = plan[DAY_KEYS[new Date().getDay()]] || [];
      if (!todays.length){
        wk = '<div class="empty" style="margin-top:12px">היום יום מנוחה בתוכנית.</div>';
      } else {
        const done = (log && Array.isArray(log.done)) ? log.done.length : 0;
        wk = '<div class="empty" style="margin-top:12px">אימון היום: ' +
             (log && log.completed ? '<b style="color:var(--state)">בוצע</b>'
                                   : done + ' מתוך ' + todays.length + ' תרגילים') + '</div>';
      }
    } catch(e){}
  }

  const updated = rows.reduce((a,r) => r.updated_at > a ? r.updated_at : a, '');
  $('liveBody').innerHTML =
    '<div class="livegrid">' +
      '<div><b>' + nf(t.k) + '</b><span>נאכלו</span></div>' +
      '<div><b>' + (T ? nf(T.target) : '—') + '</b><span>יעד</span></div>' +
      '<div><b style="color:' + (remain !== null && remain < 0 ? 'var(--bad)' : 'var(--state)') + '">' +
        (remain === null ? '—' : nf(Math.abs(remain))) + '</b><span>' +
        (remain !== null && remain < 0 ? 'מעל היעד' : 'נותרו') + '</span></div>' +
    '</div>' +
    '<div class="mrow"><span>חלבון</span><span>' + Math.round(t.p) + (T ? ' / ' + T.protein : '') + ' ג׳</span></div>' +
    '<div class="mrow"><span>פחמימות</span><span>' + Math.round(t.c) + (T ? ' / ' + T.carbs : '') + ' ג׳</span></div>' +
    '<div class="mrow"><span>שומן</span><span>' + Math.round(t.f) + (T ? ' / ' + T.fat : '') + ' ג׳</span></div>' +
    (rowsHtml || '<div class="empty" style="margin-top:12px">עוד לא נרשם אוכל היום.</div>') + wk +
    (updated ? '<div class="empty" style="margin-top:12px">עודכן לאחרונה ' +
      new Date(updated).toLocaleTimeString('he-IL',{hour:'2-digit',minute:'2-digit'}) + '</div>' : '');
}


/* ---------- צ׳אט מאמן ומתאמן ---------- */
let chatTimer = null, chatSince = null, chatLink = null;
let chatSeen = new Set();          /* מזהי הודעות שכבר על המסך */
let chatTmp = 0;                   /* מונה להודעות אופטימיות */
const imgCache = {};               /* נתיב → קישור חתום */

function openChat(linkId, withName){
  if (!linkId){ toast('אין קישור פעיל'); return; }
  chatLink = linkId; chatSince = null; chatSeen = new Set();
  $('chatWith').textContent = withName || 'שיחה';
  $('chatLog').innerHTML = '<div class="chatempty"><i class="spin"></i>טוען…</div>';
  $('chatPanel').hidden = false;
  document.body.style.overflow = 'hidden';
  loadChat(true);
  startChatPolling(2000);
  setTimeout(() => $('chatInput').focus(), 120);
}

/* קצב הרענון מתכוונן: מהר אחרי פעילות, איטי כשהשיחה שקטה.
   כך התגובה מיידית בזמן שיחה בלי להעמיס כשאין מה למשוך. */
function startChatPolling(ms){
  if (chatTimer) clearInterval(chatTimer);
  chatTimer = setInterval(() => { if (chatLink) loadChat(false); }, ms);
  chatTimer.rate = ms;
}
let idleRounds = 0;

function closeChat(){
  chatLink = null;
  if (chatTimer){ clearInterval(chatTimer); chatTimer = null; }
  $('chatPanel').hidden = true;
  document.body.style.overflow = '';
}
$('chatClose').addEventListener('click', closeChat);


function bubbleHtml(m, mine, cls){
  const t = m.created_at
    ? new Date(m.created_at).toLocaleTimeString('he-IL', {hour:'2-digit', minute:'2-digit'})
    : '';
  const img = m.image_path
    ? '<img data-img="' + esc(m.image_path) + '" alt="תמונה">'
    : '';
  const body = m.body ? esc(m.body) : '';
  return '<div class="msg ' + (mine ? 'me' : 'them') + (cls ? ' ' + cls : '') +
         '" data-id="' + esc(m.id) + '">' + img + body +
         '<time>' + t + '</time></div>';
}

function appendBubble(html){
  const log = $('chatLog');
  const empty = log.querySelector('.chatempty');
  if (empty) log.innerHTML = '';
  log.insertAdjacentHTML('beforeend', html);
  log.scrollTop = log.scrollHeight;
  return log.lastElementChild;
}

/* התמונות בדלי פרטי, אז כל אחת נטענת דרך קישור חתום */
async function hydrateImages(root){
  const imgs = [...(root || $('chatLog')).querySelectorAll('img[data-img]:not([src])')];
  /* קישור חתום לכל תמונה הוא בקשה נפרדת. בטור זה נראה כמו תקיעה. */
  await Promise.all(imgs.map(async el => {
    const path = el.dataset.img;
    try {
      if (!imgCache[path]) imgCache[path] = await Cloud.imageUrl(path, 3600);
      el.src = imgCache[path];
      el.loading = 'lazy';
      el.decoding = 'async';
    } catch(e){
      el.replaceWith(Object.assign(document.createElement('div'),
        {className:'chatempty', textContent:'התמונה לא נטענה'}));
    }
  }));
}

$('chatLog').addEventListener('click', e => {
  const img = e.target.closest('img[data-img]');
  if (img && img.src){ $('lightboxImg').src = img.src; $('lightbox').hidden = false; }
});
$('lightbox').addEventListener('click', () => { $('lightbox').hidden = true; });

async function loadChat(full){
  const id = chatLink;
  let rows;
  try { rows = await Cloud.messages(id, full ? null : chatSince); }
  catch(e){
    if (full) $('chatLog').innerHTML = '<div class="chatempty">טעינת השיחה נכשלה.</div>';
    return;
  }
  if (chatLink !== id) return;

  const me = Cloud.user() ? Cloud.user().id : null;
  const log = $('chatLog');

  if (full){
    chatSeen = new Set();
    log.innerHTML = rows.length
      ? rows.map(m => { chatSeen.add(m.id); return bubbleHtml(m, m.sender_id === me); }).join('')
      : '<div class="chatempty">אין עדיין הודעות.<br>כתוב משהו כדי להתחיל.</div>';
    log.scrollTop = log.scrollHeight;
  } else {
    /* ההודעות שלי כבר על המסך מהשליחה האופטימית — לא לשכפל */
    const fresh = rows.filter(m => !chatSeen.has(m.id));
    if (fresh.length){
      fresh.forEach(m => chatSeen.add(m.id));
      appendBubble(fresh.map(m => bubbleHtml(m, m.sender_id === me)).join(''));
    }
    idleRounds = fresh.length ? 0 : idleRounds + 1;
    if (idleRounds === 15 && chatTimer && chatTimer.rate === 2000) startChatPolling(6000);
  }
  if (rows.length) chatSince = rows[rows.length - 1].created_at;
  hydrateImages();
}

/* שליחה אופטימית: הבועה מופיעה מיד, התיבה מתרוקנת מיד,
   והשרת רק מאשר. זה מה שמסיר את התחושה של דיליי. */
async function deliver(body, imagePath, localUrl){
  const tmpId = 'tmp-' + (++chatTmp);
  const el = appendBubble(bubbleHtml(
    {id: tmpId, body: body, image_path: null, created_at: new Date().toISOString()},
    true, 'pending'));
  if (localUrl){
    const img = document.createElement('img');
    img.src = localUrl;
    el.insertBefore(img, el.firstChild);
  }
  try {
    const row = await Cloud.sendMessage(chatLink, body, imagePath);
    el.classList.remove('pending');
    if (row){ el.dataset.id = row.id; chatSeen.add(row.id); chatSince = row.created_at; }
    idleRounds = 0;
    startChatPolling(2000);
  } catch(e){
    const m = String((e && e.message) || e);
    el.classList.remove('pending');
    el.classList.add('failed');
    const btn = document.createElement('button');
    btn.className = 'retry';
    btn.textContent = /403|policy/i.test(m) ? 'אין הרשאה לשלוח — ייתכן שהגישה בוטלה' : 'שליחה נכשלה, נסה שוב';
    btn.onclick = () => { el.remove(); deliver(body, imagePath, localUrl); };
    el.appendChild(btn);
  }
}

async function sendChat(){
  const input = $('chatInput');
  const body = input.value.trim();
  if (!body || !chatLink) return;
  input.value = '';                 /* מתרוקן לפני כל פנייה לרשת */
  input.focus();
  deliver(body, null, null);
}
$('chatSend').addEventListener('click', sendChat);
$('chatInput').addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });

/* ---------- תמונה בצ׳אט ---------- */
$('chatPhoto').addEventListener('click', () => $('chatFile').click());
$('chatFile').addEventListener('change', async e => {
  const file = e.target.files && e.target.files[0];
  e.target.value = '';
  if (!file || !chatLink) return;

  let blob, localUrl;
  try {
    blob = await shrinkToBlob(file, 1200, 0.75);
    localUrl = URL.createObjectURL(blob);
  } catch(err){ toast('לא הצלחתי לקרוא את התמונה'); return; }

  const tmpId = 'tmp-' + (++chatTmp);
  const el = appendBubble(bubbleHtml(
    {id: tmpId, body: '', image_path: null, created_at: new Date().toISOString()},
    true, 'pending'));
  const img = document.createElement('img');
  img.src = localUrl;
  el.insertBefore(img, el.firstChild);

  try {
    const path = await Cloud.uploadImage(chatLink, blob);
    const row = await Cloud.sendMessage(chatLink, '', path);
    el.classList.remove('pending');
    if (row){ el.dataset.id = row.id; chatSeen.add(row.id); chatSince = row.created_at; }
    imgCache[path] = localUrl;
    idleRounds = 0;
    startChatPolling(2000);
  } catch(err){
    el.classList.remove('pending');
    el.classList.add('failed');
    const m = String((err && err.message) || err);
    const b = document.createElement('button');
    b.className = 'retry';
    b.textContent = m;
    el.appendChild(b);
  }
});

/* הקטנה לפני העלאה: תמונת טלפון היא 3–6MB, וזה מיותר לצ׳אט */
function shrinkToBlob(file, max, quality){
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height));
      const cv = document.createElement('canvas');
      cv.width  = Math.round(img.width * s);
      cv.height = Math.round(img.height * s);
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(img.src);
      cv.toBlob(b => b ? res(b) : rej(new Error('canvas')), 'image/jpeg', quality || 0.75);
    };
    img.onerror = () => rej(new Error('image'));
    img.src = URL.createObjectURL(file);
  });
}


/* ============================================================
   תוכניות אימון
   המאמן כותב, המתאמן מסמן ביצוע. ההפרדה הזאת נאכפת ב-RLS:
   workout_plans ניתנת לכתיבה למאמן בלבד, workout_logs למתאמן בלבד.
   ============================================================ */
const DAY_KEYS = ['sun','mon','tue','wed','thu','fri','sat'];
const DAY_HE   = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];
const DAY_SHORT= ['א','ב','ג','ד','ה','ו','ש'];

let planLink = null, planTrainee = null, planDay = 0, planData = {};

function emptyPlan(){
  const p = {};
  DAY_KEYS.forEach(k => { p[k] = []; });
  return p;
}
function normalizePlan(p){
  const out = emptyPlan();
  if (p && typeof p === 'object'){
    DAY_KEYS.forEach(k => { if (Array.isArray(p[k])) out[k] = p[k]; });
  }
  return out;
}
function exLine(x){
  const bits = [];
  if (x.s) bits.push(x.s + ' סטים');
  if (x.r) bits.push(x.r + ' חזרות');
  if (x.rest) bits.push('מנוחה ' + x.rest);
  if (x.note) bits.push(x.note);
  return bits.join(' · ');
}

/* ---------- צד המאמן: עורך התוכנית ---------- */
function renderDayTabs(el, active, counts, onPick){
  el.innerHTML = DAY_KEYS.map((k, i) =>
    '<button data-d="' + i + '" aria-pressed="' + (i === active) + '">' + DAY_SHORT[i] +
    '<span class="n">' + (counts[k] ? counts[k] : '—') + '</span></button>').join('');
  el.onclick = e => {
    const b = e.target.closest('[data-d]');
    if (b) onPick(+b.dataset.d);
  };
}

async function openPlan(linkId, traineeId, name){
  planLink = linkId; planTrainee = traineeId; planDay = new Date().getDay();
  $('planWith').textContent = 'תוכנית · ' + (name || '');
  $('planList').innerHTML = '<div class="empty"><i class="spin"></i>טוען…</div>';
  $('planPanel').hidden = false;
  document.body.style.overflow = 'hidden';
  try {
    const row = await Cloud.getPlan(linkId);
    planData = normalizePlan(row && row.plan);
  } catch(e){ planData = emptyPlan(); }
  drawPlanEditor();
}

function closePlan(){
  planLink = null;
  $('planPanel').hidden = true;
  document.body.style.overflow = '';
}
$('planClose').addEventListener('click', closePlan);

function drawPlanEditor(){
  const counts = {};
  DAY_KEYS.forEach(k => { counts[k] = planData[k].length; });
  renderDayTabs($('planDays'), planDay, counts, d => { planDay = d; drawPlanEditor(); });

  const key = DAY_KEYS[planDay];
  const list = planData[key];
  $('planList').innerHTML =
    '<div class="bhead" style="margin:14px 0 4px"><h2>יום ' + DAY_HE[planDay] + '</h2>' +
    '<span>' + (list.length ? list.length + ' תרגילים' : 'יום מנוחה') + '</span></div>' +
    (list.length
      ? list.map((x, i) => {
          const meta = exMeta(x.n);
          return '<div class="ex">' +
            (meta ? '<div class="map">' + muscleMapSVG(meta.m, 24) + '</div>'
                  : '<div class="num">' + (i + 1) + '</div>') +
            '<div class="info"><b>' + esc(x.n) + '</b><span>' +
            (meta ? MUSCLES[meta.m] + ' · ' + EQUIP[meta.eq] + (exLine(x) ? ' · ' : '') : '') +
            esc(exLine(x)) + '</span></div>' +
            '<button class="del" data-rm="' + i + '" aria-label="מחיקה">✕</button></div>';
        }).join('')
      : '<div class="empty">אין תרגילים ליום הזה. הוסף למטה, או השאר ריק ליום מנוחה.</div>');
}

$('planList').addEventListener('click', e => {
  const b = e.target.closest('[data-rm]'); if (!b) return;
  planData[DAY_KEYS[planDay]].splice(+b.dataset.rm, 1);
  drawPlanEditor();
});

$('exAdd').addEventListener('click', () => {
  const n = $('exChosen').value.trim();
  if (!n){ toast('צריך שם לתרגיל'); return; }
  planData[DAY_KEYS[planDay]].push({
    n,
    s: parseInt($('exSets').value, 10) || null,
    r: $('exReps').value.trim() || null,
    rest: $('exRest').value.trim() || null,
    note: $('exNote').value.trim() || null
  });
  ['exChosen','exSets','exReps','exRest','exNote'].forEach(id => { $(id).value = ''; });
  clearPicked();
  drawPlanEditor();
});

$('planCopy').addEventListener('click', () => {
  const from = DAY_KEYS[planDay];
  if (!planData[from].length){ toast('אין מה להעתיק מהיום הזה'); return; }
  const target = prompt('להעתיק ליום (1=ראשון … 7=שבת):');
  const t = parseInt(target, 10);
  if (!(t >= 1 && t <= 7)) return;
  planData[DAY_KEYS[t - 1]] = planData[from].map(x => Object.assign({}, x));
  planDay = t - 1;
  drawPlanEditor();
  toast('הועתק ליום ' + DAY_HE[t - 1]);
});

$('planSave').addEventListener('click', async () => {
  const btn = $('planSave'), label = btn.textContent;
  btn.textContent = 'שומר…'; btn.disabled = true;
  try {
    await Cloud.savePlan(planLink, planTrainee, planData);
    toast('התוכנית נשמרה');
    closePlan();
  } catch(e){
    toast(String((e && e.message) || e));
  } finally { btn.textContent = label; btn.disabled = false; }
});

/* ---------- צד המתאמן ---------- */
let myLink = null, wkDay = new Date().getDay(), wkPlan = null, wkDone = [];

/* גם התפריט וגם האימונים צריכים את אותה רשימת קישורים.
   מטמון קצר חוסך קריאה כפולה בכל מעבר בין הקטגוריות. */
let linksCache = null, linksAt = 0;
async function approvedLink(){
  if (linksCache && Date.now() - linksAt < 15000) return linksCache;
  const links = await Cloud.traineeLinks();
  linksCache = links.filter(l => l.status === 'approved')[0] || null;
  linksAt = Date.now();
  return linksCache;
}

const PROG_TABS = ['mine','workouts','friends','coaching'];

function progTab(t){
  [...$('progTabs').children].forEach(x =>
    x.setAttribute('aria-pressed', String(x.dataset.t === t)));
  PROG_TABS.forEach(k => { $('prog-' + k).hidden = (k !== t); });
  if (t === 'mine') loadMyDiet();
  if (t === 'mine') loadMyDiet();
  if (t === 'workouts') loadMyWorkouts();
  if (t === 'coaching') refreshCoach(); else stopLive();
  window.scrollTo({top:0});
}

$('progTabs').addEventListener('click', e => {
  const b = e.target.closest('[data-t]'); if (b) progTab(b.dataset.t);
});

async function loadMyWorkouts(){
  refreshRequests();
  $('wkBody').innerHTML = '<div class="empty"><i class="spin"></i>טוען…</div>';
  if (!Cloud.signedIn()){
    $('wkBody').innerHTML = '<div class="empty">צריך להתחבר כדי לראות תוכנית.</div>';
    return;
  }
  try {
    myLink = await approvedLink();
    if (!myLink){
      $('planCoach').textContent = '';
      $('wkBody').innerHTML = '<div class="empty">אין לך עדיין מאמן מקושר. ' +
        'כשמאמן יבקש גישה ותאשר, התוכנית שלו תופיע כאן.</div>';
      $('wkHistory').innerHTML = '';
      return;
    }
    /* שלוש קריאות בלתי תלויות — במקביל */
    const [names, row, log] = await Promise.all([
      Cloud.profilesByIds([myLink.coach_id]).catch(() => ({})),
      Cloud.getPlan(myLink.id),
      Cloud.getWorkoutLog(myLink.id, todayKey())
    ]);
    const c = names[myLink.coach_id];
    $('planCoach').textContent = c ? 'מאת ' + personLabel(c) : '';
    wkPlan = normalizePlan(row && row.plan);
    wkDone = (log && Array.isArray(log.done)) ? log.done : [];
    wkDay = new Date().getDay();
    drawMyWorkouts();
    drawWorkoutHistory();
  } catch(e){
    $('wkBody').innerHTML = '<div class="empty">' + esc(String((e && e.message) || e)) + '</div>';
  }
}

function drawMyWorkouts(){
  const counts = {};
  DAY_KEYS.forEach(k => { counts[k] = wkPlan[k].length; });
  renderDayTabs($('wkDays'), wkDay, counts, d => { wkDay = d; drawMyWorkouts(); });

  const key = DAY_KEYS[wkDay];
  const list = wkPlan[key];
  const isToday = wkDay === new Date().getDay();

  if (!list.length){
    $('wkBody').innerHTML = '<div class="empty">יום מנוחה. אין תרגילים ליום ' +
      DAY_HE[wkDay] + '.</div>';
    return;
  }

  /* סימון אפשרי רק ביום הנוכחי — אחרת זה דיווח למפרע */
  $('wkBody').innerHTML =
    list.map(x => {
      const meta = exMeta(x.n);
      return '<label class="ex">' +
        (isToday ? '<input type="checkbox" data-ex="' + esc(x.n) + '"' +
                   (wkDone.indexOf(x.n) > -1 ? ' checked' : '') + '>' : '') +
        (meta ? '<div class="map">' + muscleMapSVG(meta.m, 24) + '</div>' : '') +
        '<div class="info"><b>' + esc(x.n) + '</b><span>' +
        (meta ? MUSCLES[meta.m] + ' · ' + EQUIP[meta.eq] + (exLine(x) ? ' · ' : '') : '') +
        esc(exLine(x)) + '</span>' +
        (meta && meta.d ? '<span style="color:var(--mut2);margin-top:4px">' + esc(meta.d) + '</span>' : '') +
        '</div></label>';
    }).join('') +
    (isToday
      ? '<div class="donebar"><div class="track"><i id="wkBar" style="background:var(--state);width:' +
        Math.round(list.filter(x => wkDone.indexOf(x.n) > -1).length / list.length * 100) +
        '%"></i></div><span style="font-size:var(--t-micro);color:var(--mut)" id="wkCount">' +
        list.filter(x => wkDone.indexOf(x.n) > -1).length + ' / ' + list.length + '</span></div>'
      : '<div class="empty" style="margin-top:12px">סימון ביצוע אפשרי ביום עצמו.</div>');
}

$('wkBody').addEventListener('change', async e => {
  const cb = e.target.closest('[data-ex]'); if (!cb || !myLink) return;
  const name = cb.dataset.ex;
  if (cb.checked){ if (wkDone.indexOf(name) === -1) wkDone.push(name); }
  else wkDone = wkDone.filter(n => n !== name);

  const list = wkPlan[DAY_KEYS[new Date().getDay()]];
  const all = list.length > 0 && list.every(x => wkDone.indexOf(x.n) > -1);
  const bar = $('wkBar'), cnt = $('wkCount');
  if (bar) bar.style.width = Math.round(wkDone.length / list.length * 100) + '%';
  if (cnt) cnt.textContent = wkDone.length + ' / ' + list.length;

  try {
    await Cloud.setWorkoutLog(myLink.id, todayKey(), wkDone, all);
    if (all) toast('כל הכבוד, סיימת את האימון של היום');
    drawWorkoutHistory();
  } catch(err){
    toast(String((err && err.message) || err));
    cb.checked = !cb.checked;
  }
});

async function drawWorkoutHistory(){
  if (!myLink){ $('wkHistory').innerHTML = ''; return; }
  const from = new Date(); from.setDate(from.getDate() - 6);
  let rows = [];
  try { rows = await Cloud.recentWorkoutLogs(myLink.id, todayKey(from)); } catch(e){}
  const byDate = {};
  rows.forEach(r => { byDate[r.log_date] = r; });

  const cells = [];
  for (let i = 6; i >= 0; i--){
    const d = new Date(); d.setDate(d.getDate() - i);
    const k = todayKey(d), r = byDate[k];
    const planned = wkPlan ? wkPlan[DAY_KEYS[d.getDay()]].length : 0;
    const ok = r && r.completed;
    cells.push('<div><i class="' + (ok ? 'ok' : '') + '" title="' + k + '"></i>' +
               '<span>' + DAY_SHORT[d.getDay()] + '</span></div>');
    void planned;
  }
  $('wkHistory').innerHTML = '<div class="hist">' + cells.join('') + '</div>';
}


/* ---------- בורר תרגילים ---------- */
let pickMuscle = '', pickEquip = '', pickTarget = null;
let customEx = [];        /* תרגילים שהמאמן יצר */

async function loadCustomEx(){
  try { customEx = JSON.parse(await Store.get('maazan:customex')) || []; }
  catch(e){ customEx = []; }
}
function allExercises(){
  const base = (typeof EXERCISES !== 'undefined' && Array.isArray(EXERCISES)) ? EXERCISES : [];
  return customEx.concat(base);
}

/* המאגר יושב בקובץ נפרד. אם הוא לא הועלה או ש-cache ישן הגיש
   index.html בלי תג הסקריפט, EXERCISES לא מוגדר והלחיצה מתה בשקט.
   כאן מנסים לטעון אותו, ואם אין — אומרים את זה במפורש. */
async function ensureExercises(){
  if (typeof EXERCISES !== 'undefined' && Array.isArray(EXERCISES)) return true;
  try { await loadScript('./exercises.js'); } catch(e){}
  if (typeof EXERCISES !== 'undefined' && Array.isArray(EXERCISES)) return true;
  toast('קובץ מאגר התרגילים (exercises.js) חסר באתר. אפשר להקליד שם תרגיל ידנית.');
  return false;
}

async function openPicker(onPick){
  if (!(await ensureExercises())) return;
  await loadCustomEx();
  showPickView('browse');
  pickTarget = onPick;
  pickMuscle = ''; pickEquip = '';
  $('pickQ').value = '';
  /* חגורה ושלייקס: גם אם מישהו יוסיף בעתיד פאנל עם z-index גבוה,
     העברת האלמנט לסוף ה-body מבטיחה שהוא ייצבע אחרון. */
  const panel = $('pickPanel');
  if (panel.parentNode !== document.body || panel.nextElementSibling){
    document.body.appendChild(panel);
  }
  panel.hidden = false;
  document.body.style.overflow = 'hidden';
  drawChips();
  drawPickList();
  /* גלילה לראש הרשימה, אחרת פתיחה שנייה נפתחת באמצע */
  const body = $('pickPanel').querySelector('.planbody');
  if (body) body.scrollTop = 0;
  $('pickMuscles').scrollLeft = 0;
  $('pickEquip').scrollLeft = 0;
}
function closePicker(){
  $('pickPanel').hidden = true;
  /* פאנל התוכנית עשוי להיות עדיין פתוח מתחת — לא לשחרר את הנעילה */
  if ($('planPanel').hidden && $('chatPanel').hidden) document.body.style.overflow = '';
}

function showPickView(v){
  $('pickBrowse').hidden     = (v !== 'browse');
  $('pickCreateForm').hidden = (v !== 'create');
}

/* ---------- יצירת תרגיל אישי ---------- */
$('pickCreate').addEventListener('click', () => {
  $('cxMuscle').innerHTML = Object.keys(MUSCLES).map(k =>
    '<option value="' + k + '">' + MUSCLES[k] + '</option>').join('');
  $('cxEquip').innerHTML = Object.keys(EQUIP).map(k =>
    '<option value="' + k + '">' + EQUIP[k] + '</option>').join('');
  ['cxName','cxNote'].forEach(id => { $(id).value = ''; });
  showPickView('create');
  $('cxName').focus();
});
$('cxCancel').addEventListener('click', () => showPickView('browse'));

$('cxSave').addEventListener('click', async () => {
  const n = $('cxName').value.trim();
  if (!n){ toast('צריך שם לתרגיל'); return; }
  if (allExercises().some(x => x.n === n)){ toast('כבר קיים תרגיל בשם הזה'); return; }
  const x = {n, en:'', m:$('cxMuscle').value, eq:$('cxEquip').value,
             d:$('cxNote').value.trim(), mine:true};
  customEx.unshift(x);
  await Store.set('maazan:customex', JSON.stringify(customEx));
  if (pickTarget) pickTarget(x);
  closePicker();
  toast('התרגיל נוסף למאגר שלך');
});
$('pickClose').addEventListener('click', closePicker);

function drawChips(){
  const mUsed = {}, eUsed = {};
  allExercises().forEach(x => { mUsed[x.m] = 1; eUsed[x.eq] = 1; });
  $('pickMuscles').innerHTML =
    '<button data-m="" aria-pressed="' + (!pickMuscle) + '">כל השרירים</button>' +
    Object.keys(MUSCLES).filter(k => mUsed[k]).map(k =>
      '<button data-m="' + k + '" aria-pressed="' + (pickMuscle === k) + '">' +
      MUSCLES[k] + '</button>').join('');
  $('pickEquip').innerHTML =
    '<button data-e="" aria-pressed="' + (!pickEquip) + '">כל הציוד</button>' +
    Object.keys(EQUIP).filter(k => eUsed[k]).map(k =>
      '<button data-e="' + k + '" aria-pressed="' + (pickEquip === k) + '">' +
      EQUIP[k] + '</button>').join('');
}
$('pickMuscles').addEventListener('click', e => {
  const b = e.target.closest('[data-m]'); if (!b) return;
  pickMuscle = b.dataset.m; drawChips(); drawPickList();
});
$('pickEquip').addEventListener('click', e => {
  const b = e.target.closest('[data-e]'); if (!b) return;
  pickEquip = b.dataset.e; drawChips(); drawPickList();
});
$('pickQ').addEventListener('input', drawPickList);

function drawPickList(){
  const q = $('pickQ').value.trim().toLowerCase();
  const rows = allExercises().filter(x =>
    (!pickMuscle || x.m === pickMuscle) &&
    (!pickEquip  || x.eq === pickEquip) &&
    (!q || x.n.toLowerCase().indexOf(q) > -1 ||
     (x.en && x.en.indexOf(q) > -1) ||
     MUSCLES[x.m].indexOf(q) > -1 || EQUIP[x.eq].indexOf(q) > -1));

  /* התמונה משמאל והטקסט מימין, כמו ברשימות תרגילים מוכרות */
  $('pickList').innerHTML = rows.length
    ? rows.map(x =>
        '<div class="exrow" data-n="' + esc(x.n) + '">' +
        '<div class="txt"><b>' + esc(x.n) + '</b>' +
        '<span>' + MUSCLES[x.m] + ' · ' + EQUIP[x.eq] + '</span>' +
        (x.mine ? '<span class="mine">התרגיל שלי</span>' : '') + '</div>' +
        '<div class="map">' + muscleMapSVG(x.m, 46) + '</div></div>').join('')
    : '<div class="empty">לא נמצא תרגיל בשם הזה. אפשר ליצור אותו עם «יצירה» למעלה.</div>';
}

$('pickList').addEventListener('click', e => {
  const row = e.target.closest('[data-n]'); if (!row) return;
  const x = allExercises().find(v => v.n === row.dataset.n);
  if (x && pickTarget) pickTarget(x);
  closePicker();
});

function applyPicked(x){
  $('exChosen').value = x.n;
  $('exPickLabel').textContent = x.n;
  $('exPickMap').innerHTML = muscleMapSVG(x.m, 20);
  if (!$('exNote').value && x.d) $('exNote').value = x.d;
}

function clearPicked(){
  $('exChosen').value = '';
  $('exPickLabel').textContent = 'בחירת תרגיל מהמאגר';
  $('exPickMap').innerHTML = '';
}

$('exPick').addEventListener('click', () => openPicker(applyPicked));

/* חיפוש שם תרגיל במאגר, לצורך הצגת מפת שרירים ליד תרגיל בתוכנית */
function exMeta(name){
  return allExercises().find(x => x.n === name) || null;
}

/* מאזין Escape אחד לכל השכבות, לפי סדר הערימה מלמעלה למטה */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!$('lightbox').hidden){ $('lightbox').hidden = true; return; }
  if (!$('onb').hidden) return;                 /* מסך פתיחה לא נסגר ב-Esc */
  if (!$('pickPanel').hidden){ closePicker(); return; }
  if (!$('chatPanel').hidden){ closeChat(); return; }
  if (!$('planPanel').hidden){ closePlan(); return; }
  if (!$('cam').hidden){ closeCam(); return; }
  if (!$('scrim').hidden){ closeSheet(); return; }
});

/* טיימרים לא צריכים לרוץ כשהמסך מוסתר. חוסך רשת וסוללה. */
let pausedTimers = null;
document.addEventListener('visibilitychange', () => {
  if (document.hidden){
    pausedTimers = {chat: !!chatTimer, coach: !!coachTimer};
    if (chatTimer){ clearInterval(chatTimer); chatTimer = null; }
    if (coachTimer){ clearInterval(coachTimer); coachTimer = null; }
  } else if (pausedTimers){
    if (pausedTimers.chat && chatLink){ loadChat(false); startChatPolling(2000); }
    if (pausedTimers.coach && state.live){ drawLive(); coachTimer = setInterval(() => {
      if (state.live) drawLive(); }, 20000); }
    pausedTimers = null;
  }
});


/* ============================================================
   תפריט תזונה
   מבנה מקביל לתוכנית האימונים: המאמן בונה, המתאמן מסמן.
   הפריטים נבחרים ממאגר המאכלים הקיים, אז הערכים מחושבים ולא מוקלדים.
   ============================================================ */
/* שמות הארוחות בתפריט ובמחשבון אינם זהים ('ביניים' מול
   'נשנושים ומשקאות'), אז המיפוי מפורש ולא לפי השוואת מחרוזות. */
const DIET_TO_MEAL = {
  'ארוחת בוקר':'breakfast', 'ארוחת צהריים':'lunch',
  'ארוחת ערב':'dinner', 'ביניים':'snacks'
};
const DIET_MEALS = ['ארוחת בוקר','ארוחת צהריים','ארוחת ערב','ביניים'];
let dietLink = null, dietTrainee = null, dietDay = 0, dietData = {}, dtPick = null;

function emptyDiet(){ const p = {}; DAY_KEYS.forEach(k => { p[k] = []; }); return p; }
function normalizeDiet(p){
  const out = emptyDiet();
  if (p && typeof p === 'object'){
    DAY_KEYS.forEach(k => { if (Array.isArray(p[k])) out[k] = p[k]; });
  }
  return out;
}
function dietTotals(list){
  const t = {k:0,p:0,c:0,f:0};
  list.forEach(i => { t.k += i.k||0; t.p += i.p||0; t.c += i.c||0; t.f += i.f||0; });
  return t;
}
function dietKey(i){ return (i.t || '') + '|' + (i.n || '') + '|' + (i.q || ''); }

/* ---------- צד המאמן ---------- */
async function openDiet(linkId, traineeId, name){
  dietLink = linkId; dietTrainee = traineeId; dietDay = new Date().getDay(); dtPick = null;
  $('dietWith').textContent = 'תפריט · ' + (name || '');
  $('dtMeal').innerHTML = DIET_MEALS.map(m => '<option>' + m + '</option>').join('');
  $('dtQ').value = ''; $('dtResults').hidden = true; $('dtPicked').hidden = true;
  $('dietList').innerHTML = '<div class="empty"><i class="spin"></i>טוען…</div>';
  const panel = $('dietPanel');
  if (panel.nextElementSibling) document.body.appendChild(panel);
  panel.hidden = false;
  document.body.style.overflow = 'hidden';
  try {
    const row = await Cloud.getMealPlan(linkId);
    dietData = normalizeDiet(row && row.plan);
  } catch(e){ dietData = emptyDiet(); }
  drawDietEditor();
}
function closeDiet(){
  dietLink = null;
  $('dietPanel').hidden = true;
  if ($('planPanel').hidden && $('chatPanel').hidden) document.body.style.overflow = '';
}
$('dietClose').addEventListener('click', closeDiet);

function drawDietEditor(){
  const counts = {};
  DAY_KEYS.forEach(k => { counts[k] = dietData[k].length; });
  renderDayTabs($('dietDays'), dietDay, counts, d => { dietDay = d; drawDietEditor(); });

  const list = dietData[DAY_KEYS[dietDay]];
  const t = dietTotals(list);
  let html = '<div class="bhead" style="margin:14px 0 4px"><h2>יום ' + DAY_HE[dietDay] + '</h2>' +
             '<span>' + (list.length ? list.length + ' פריטים' : 'ריק') + '</span></div>';

  if (!list.length){
    html += '<div class="empty">אין פריטים ליום הזה. הוסף למטה.</div>';
  } else {
    DIET_MEALS.forEach(meal => {
      const items = list.map((x, i) => ({x, i})).filter(o => o.x.t === meal);
      if (!items.length) return;
      const mt = dietTotals(items.map(o => o.x));
      html += '<div class="mealhead">' + meal + '<span>' + nf(mt.k) + ' קק״ל</span></div>';
      html += items.map(o =>
        '<div class="ex"><div class="info"><b>' + esc(o.x.n) + '</b><span>' + esc(o.x.q) +
        ' · ' + Math.round(o.x.k) + ' קק״ל</span></div>' +
        '<button class="del" data-drm="' + o.i + '" aria-label="מחיקה">✕</button></div>').join('');
    });
    html += '<div class="dtot">' +
      '<div><b>' + nf(t.k) + '</b><span>קק״ל</span></div>' +
      '<div><b>' + Math.round(t.p) + '</b><span>חלבון</span></div>' +
      '<div><b>' + Math.round(t.c) + '</b><span>פחמימות</span></div>' +
      '<div><b>' + Math.round(t.f) + '</b><span>שומן</span></div></div>';
  }
  $('dietList').innerHTML = html;
}

$('dietList').addEventListener('click', e => {
  const b = e.target.closest('[data-drm]'); if (!b) return;
  dietData[DAY_KEYS[dietDay]].splice(+b.dataset.drm, 1);
  drawDietEditor();
});

/* חיפוש במאגר המאכלים הקיים — אותו מקור שמזין את יומן האכילה */
$('dtQ').addEventListener('input', () => {
  const q = $('dtQ').value.trim();
  const box = $('dtResults');
  if (q.length < 2){ box.hidden = true; return; }
  const rows = allFoods().filter(f => f.n.indexOf(q) > -1 || (f.g && f.g.indexOf(q) > -1)).slice(0, 8);
  if (!rows.length){ box.hidden = true; return; }
  box.innerHTML = rows.map(f =>
    '<button type="button" data-fn="' + esc(f.n) + '"><b>' + esc(f.n) + '</b>' +
    '<span>' + f.k + ' קק״ל / 100 ג׳</span></button>').join('');
  box.hidden = false;
});

$('dtResults').addEventListener('click', e => {
  const b = e.target.closest('[data-fn]'); if (!b) return;
  const f = allFoods().find(x => x.n === b.dataset.fn); if (!f) return;
  dtPick = f;
  $('dtQ').value = f.n;
  $('dtResults').hidden = true;
  const opts = ['<option value="1">גרם</option>'];
  if (f.u) opts.push('<option value="' + f.u[1] + '" selected>' + esc(f.u[0]) + '</option>');
  $('dtUnit').innerHTML = opts.join('');
  $('dtAmount').value = f.u ? 1 : 100;
  $('dtPicked').hidden = false;
  dtPreview();
});

function dtValues(){
  if (!dtPick) return null;
  const amount = parseFloat($('dtAmount').value) || 0;
  const per = parseFloat($('dtUnit').value) || 1;
  const grams = amount * per;
  const label = per === 1 ? Math.round(grams) + ' גרם'
    : amount + ' × ' + $('dtUnit').options[$('dtUnit').selectedIndex].text;
  return {t:$('dtMeal').value, n:dtPick.n, q:label,
          k:dtPick.k*grams/100, p:dtPick.p*grams/100,
          c:dtPick.c*grams/100, f:dtPick.f*grams/100};
}
function dtPreview(){
  const v = dtValues(); if (!v) return;
  $('dtPrev').innerHTML =
    '<div>קלוריות<b>' + Math.round(v.k) + '</b></div>' +
    '<div>חלבון<b>' + round(v.p,1) + '</b></div>' +
    '<div>פחמימות<b>' + round(v.c,1) + '</b></div>' +
    '<div>שומן<b>' + round(v.f,1) + '</b></div>';
}
$('dtAmount').addEventListener('input', dtPreview);
$('dtUnit').addEventListener('change', () => {
  $('dtAmount').value = (parseFloat($('dtUnit').value) === 1) ? 100 : 1;
  dtPreview();
});

$('dtAdd').addEventListener('click', () => {
  const v = dtValues();
  if (!v){ toast('בחר מאכל מהחיפוש'); return; }
  dietData[DAY_KEYS[dietDay]].push(v);
  dtPick = null;
  $('dtQ').value = ''; $('dtPicked').hidden = true; $('dtPrev').innerHTML = '';
  drawDietEditor();
});

$('dietCopy').addEventListener('click', () => {
  const from = DAY_KEYS[dietDay];
  if (!dietData[from].length){ toast('אין מה להעתיק מהיום הזה'); return; }
  const t = parseInt(prompt('להעתיק ליום (1=ראשון … 7=שבת):'), 10);
  if (!(t >= 1 && t <= 7)) return;
  dietData[DAY_KEYS[t-1]] = dietData[from].map(x => Object.assign({}, x));
  dietDay = t - 1;
  drawDietEditor();
  toast('הועתק ליום ' + DAY_HE[t-1]);
});

$('dietSave').addEventListener('click', async () => {
  const btn = $('dietSave'), label = btn.textContent;
  btn.textContent = 'שומר…'; btn.disabled = true;
  try {
    await Cloud.saveMealPlan(dietLink, dietTrainee, dietData);
    toast('התפריט נשמר');
    closeDiet();
  } catch(e){ toast(String((e && e.message) || e)); }
  finally { btn.textContent = label; btn.disabled = false; }
});

/* ---------- צד המתאמן ---------- */
let myDietLink = null, myDietDay = new Date().getDay(), myDiet = null, myDietDone = [];

async function loadMyDiet(){
  if (!Cloud.signedIn()){ $('dietBlock').hidden = true; return; }
  try {
    myDietLink = await approvedLink();
    if (!myDietLink){ $('dietBlock').hidden = true; return; }
    const row = await Cloud.getMealPlan(myDietLink.id);
    myDiet = normalizeDiet(row && row.plan);
    const any = DAY_KEYS.some(k => myDiet[k].length);
    if (!any){ $('dietBlock').hidden = true; return; }

    const names = await Cloud.profilesByIds([myDietLink.coach_id]).catch(() => ({}));
    const c = names[myDietLink.coach_id];
    $('dietFrom').textContent = c ? 'מאת ' + personLabel(c) : '';
    const log = await Cloud.getDietLog(myDietLink.id, todayKey());
    myDietDone = (log && Array.isArray(log.done)) ? log.done : [];
    myDietDay = new Date().getDay();
    $('dietBlock').hidden = false;
    drawMyDiet();
  } catch(e){ $('dietBlock').hidden = true; }
}

function drawMyDiet(){
  const counts = {};
  DAY_KEYS.forEach(k => { counts[k] = myDiet[k].length; });
  renderDayTabs($('myDietDays'), myDietDay, counts, d => { myDietDay = d; drawMyDiet(); });

  const list = myDiet[DAY_KEYS[myDietDay]];
  const isToday = myDietDay === new Date().getDay();
  if (!list.length){
    $('myDietBody').innerHTML = '<div class="empty">אין תפריט ליום ' + DAY_HE[myDietDay] + '.</div>';
    return;
  }
  let html = '';
  DIET_MEALS.forEach(meal => {
    const items = list.filter(x => x.t === meal);
    if (!items.length) return;
    const mt = dietTotals(items);
    html += '<div class="mealhead">' + meal + '<span>' + nf(mt.k) + ' קק״ל</span></div>';
    html += items.map(x => {
      const k = dietKey(x);
      const idx = list.indexOf(x);
      /* הכפתור יושב מחוץ ל-label, אחרת לחיצה עליו הייתה מסמנת
         את תיבת הסימון של אותה שורה. */
      return '<div class="ex">' +
        '<label style="display:flex;align-items:center;gap:12px;flex:1;min-width:0;margin:0">' +
        (isToday ? '<input type="checkbox" data-dk="' + esc(k) + '"' +
                   (myDietDone.indexOf(k) > -1 ? ' checked' : '') + '>' : '') +
        '<span class="info"><b>' + esc(x.n) + '</b><span>' + esc(x.q) + ' · ' +
        Math.round(x.k) + ' קק״ל</span></span></label>' +
        '<button class="mini go" data-ai="' + idx + '">הוספה</button></div>';
    }).join('');
  });
  const t = dietTotals(list);
  html += '<div class="dtot">' +
    '<div><b>' + nf(t.k) + '</b><span>קק״ל</span></div>' +
    '<div><b>' + Math.round(t.p) + '</b><span>חלבון</span></div>' +
    '<div><b>' + Math.round(t.c) + '</b><span>פחמימות</span></div>' +
    '<div><b>' + Math.round(t.f) + '</b><span>שומן</span></div></div>';
  if (!isToday) html += '<div class="empty" style="margin-top:12px">סימון אפשרי ביום עצמו.</div>';
  $('myDietBody').innerHTML = html;
}

/* הוספה של פריט אחד מהתפריט אל המחשבון הקלורי */
$('myDietBody').addEventListener('click', async e => {
  const b = e.target.closest('[data-ai]'); if (!b) return;
  e.preventDefault();
  const x = myDiet[DAY_KEYS[myDietDay]][+b.dataset.ai];
  if (!x) return;

  const mealId = DIET_TO_MEAL[x.t] || guessMeal();

  state.log[mealId].push({n:x.n, q:x.q, k:+x.k || 0,
                          p:+x.p || 0, c:+x.c || 0, f:+x.f || 0});
  state.recent = [x.n].concat(state.recent.filter(v => v !== x.n)).slice(0, 12);
  await saveLog(); await saveRecent();
  renderDiary(); renderRecents(); renderSummary();

  b.textContent = 'נוסף ✓';
  b.disabled = true;
  setTimeout(() => { b.textContent = 'הוספה'; b.disabled = false; }, 1600);
  toast(x.n + ' · ' + Math.round(x.k) + ' קק״ל נוסף ליומן');
});

$('myDietBody').addEventListener('change', async e => {
  const cb = e.target.closest('[data-dk]'); if (!cb || !myDietLink) return;
  const k = cb.dataset.dk;
  if (cb.checked){ if (myDietDone.indexOf(k) === -1) myDietDone.push(k); }
  else myDietDone = myDietDone.filter(x => x !== k);
  try { await Cloud.setDietLog(myDietLink.id, todayKey(), myDietDone); }
  catch(err){ toast(String((err && err.message) || err)); cb.checked = !cb.checked; }
});


/* ---------- toast ---------- */
let toastT;
function toast(msg){
  const el = $('toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove('show'), 2100);
}

/* ---------- install ---------- */
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); deferredPrompt = e; $('installBtn').hidden = false;
});
$('installBtn').addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt(); await deferredPrompt.userChoice;
  deferredPrompt = null; $('installBtn').hidden = true;
});
window.addEventListener('appinstalled', () => { $('installBtn').hidden = true; });

/* ---------- boot ---------- */
(async function init(){
  try {
    const p = await Store.get('maazan:profile'); if (p) Object.assign(state.profile, JSON.parse(p));
    const c = await Store.get('maazan:custom');  if (c) state.custom  = JSON.parse(c) || [];
    const r = await Store.get('maazan:recent');  if (r) state.recent  = JSON.parse(r) || [];
    const w = await Store.get('maazan:weights'); if (w) state.weights = JSON.parse(w) || {};
    const u = await Store.get('maazan:apiurl');  if (u) state.apiUrl  = u;
  } catch(e) {}
  const P = state.profile;
  [...$('sexSeg').children].forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === P.sex)));
  $('age').value = P.age; $('height').value = P.height; $('weight').value = P.weight;
  $('activity').value = P.activity; $('goal').value = P.goal;
  $('apiUrl').value = state.apiUrl;
  renderAccount();
  if (Cloud.signedIn()){ await syncFromCloud(); await reloadEverything(); renderAccount(); }
  await loadLog();
  renderAll();
  renderAccount();
  goto('home');
  maybeOnboard();
  loadMe();

  loadCustomEx();
  const ver = $('appVer');
  if (ver) ver.textContent = 'גרסה ' + APP_VERSION;
  console.log('מאזן — גרסה', APP_VERSION);
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
})();
