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
  apiUrl:'', screen:'home', meal:'breakfast', pick:null
};

function emptyLog(){ return {breakfast:[],lunch:[],dinner:[],snacks:[],exercise:[],water:0}; }
function todayKey(d){ const x=d||new Date(); return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0'); }
function $(id){ return document.getElementById(id); }
function round(n,d){ const m=Math.pow(10,d||0); return Math.round(n*m)/m; }
function nf(n){ return Math.round(n).toLocaleString('he-IL'); }
function esc(s){ return String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
function allFoods(){ return state.custom.concat(FOODS); }

/* ---------- calculations ---------- */
function compute(){
  const P = state.profile;
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
  if (scr === 'prog') renderProgress();
  window.scrollTo({top:0});
}
document.querySelector('.tabbar').addEventListener('click', e => {
  const b = e.target.closest('.tab'); if (b) goto(b.dataset.scr);
});
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]'); if (g) goto(g.dataset.go);
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
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('scrim').hidden) closeSheet(); });
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
  state.custom.unshift({n, g:'מאכל שלי', k,
    p:parseFloat($('nP').value)||0, c:parseFloat($('nC').value)||0, f:parseFloat($('nF').value)||0});
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

async function scanBarcode(){
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    toast('הדפדפן הזה לא תומך במצלמה'); return;
  }
  showCam('סריקת ברקוד', 'כוון את הברקוד למסגרת');
  const video = $('camVideo');

  /* רזולוציה נמוכה היא הסיבה הנפוצה ביותר לכך שברקוד לא נקרא:
     הפסים הדקים של EAN-13 פשוט לא נפרדים ב-640x480. */
  const tries = [
    {video:{facingMode:{exact:'environment'}, width:{ideal:1920}, height:{ideal:1080}}},
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

  hintTimer = setTimeout(() => {
    $('camHint').textContent = 'קרב את המצלמה עד שהברקוד ממלא את המסגרת';
  }, 7000);

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
  const hints = new Map();
  try {
    const F = window.ZXing.BarcodeFormat, H = window.ZXing.DecodeHintType;
    hints.set(H.POSSIBLE_FORMATS, [F.EAN_13, F.EAN_8, F.UPC_A, F.UPC_E, F.CODE_128, F.ITF]);
    hints.set(H.TRY_HARDER, true);
  } catch(e){}
  zxReader = new window.ZXing.BrowserMultiFormatReader(hints, 250);
  zxReader.decodeFromVideoElement(video, res => { if (res) onBarcode(res.getText()); });
}

let lastCode = null;
async function onBarcode(code){
  code = String(code || '').trim();
  if (!code || code === lastCode) return;
  lastCode = code;
  setTimeout(() => { lastCode = null; }, 2500);
  if (navigator.vibrate) navigator.vibrate(60);
  closeCam();
  toast('מחפש את המוצר…');
  const food = await lookupBarcode(code);
  if (!food){
    toast('המוצר לא נמצא במאגר — הוסף אותו פעם אחת ידנית');
    openSheet('new');
    return;
  }
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
function checkCredentials(mode, email, pass, pass2){
  if (!email)                      return 'צריך להזין אימייל';
  if (!EMAIL_RE.test(email))       return 'האימייל לא נראה תקין';
  if (!pass)                       return 'צריך להזין סיסמה';
  if (mode === 'up' && pass.length < 6)  return 'הסיסמה צריכה להיות באורך 6 תווים לפחות';
  if (mode === 'up' && pass !== pass2)   return 'הסיסמאות אינן זהות';
  return null;
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
      if (r.needsConfirm){ toast('נשלח אליך מייל אישור — אשר אותו ואז התחבר'); acctSetMode('in'); return; }
    } else {
      await Cloud.signIn(email, pass);
    }
    $('acctPass').value = ''; $('acctPass2').value = '';
    await syncFromCloud();
    await reloadEverything();
    renderAccount();
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
  $('obDetails').hidden = (n !== 2);
  $('stp1').classList.toggle('on', n >= 1);
  $('stp2').classList.toggle('on', n >= 2);
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
      if (r.needsConfirm){ toast('נשלח אליך מייל אישור — אשר אותו וחזור לכאן'); obSetMode('in'); return; }
    } else {
      await Cloud.signIn(email, pass);
    }
    $('obPass').value = ''; $('obPass2').value = '';
    await syncFromCloud();
    await reloadEverything();
    renderAccount();
    /* משתמש חוזר שכבר יש לו פרופיל בענן — אין טעם לשאול אותו שוב */
    const existing = await Store.get('maazan:profile');
    if (existing){ obFinishNow(); toast('מחובר · הנתונים שוחזרו'); }
    else { obPrefill(); obStep(2); }
  } catch(e){
    toast(authError(e));
  } finally {
    btn.textContent = label; btn.disabled = false;
  }
});

$('obSkip').addEventListener('click', () => { obPrefill(); obStep(2); });

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
  if (onbDone() || Cloud.signedIn()) return;
  obSetMode('up');
  obStep(1);
  if (!Cloud.ready()){
    /* בלי הגדרת שרת אין למה להירשם — מדלגים ישר לפרטים */
    $('obAccount').hidden = true;
    obPrefill(); obStep(2);
  }
  $('onb').hidden = false;
}

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
  goto('home');
  maybeOnboard();
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
})();
