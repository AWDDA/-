/* ============================================================
   מאזן — יומן קלוריות (PWA)
   הנתונים נשמרים מקומית במכשיר. אין שרת ואין חשבון.
   ============================================================ */

/* ---------- storage: window.storage → localStorage → memory ---------- */
const Store = (() => {
  const mem = {};
  const host = (typeof window !== 'undefined' && window.storage && typeof window.storage.get === 'function') ? window.storage : null;
  let ls = null;
  if (!host) {
    try { window.localStorage.setItem('__t', '1'); window.localStorage.removeItem('__t'); ls = window.localStorage; }
    catch (e) { ls = null; }
  }
  return {
    async get(k) {
      if (host) { try { const r = await host.get(k); return r ? r.value : null; } catch (e) { return null; } }
      if (ls) { try { return ls.getItem(k); } catch (e) { return null; } }
      return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null;
    },
    async set(k, v) {
      mem[k] = v;
      if (host) { try { await host.set(k, v); } catch (e) {} return; }
      if (ls) { try { ls.setItem(k, v); } catch (e) {} }
    }
  };
})();

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

/* ---------- state ---------- */
const state = {
  profile:{sex:'male', age:28, height:178, weight:80, activity:1.55, goal:-0.5},
  date: todayKey(),
  log: emptyLog(),
  custom: [],
  recent: [],
  weights: {},                 // {'2026-09-01': 80.4}
  targets:{kcal:0,p:0,c:0,f:0},
  screen:'today',
  meal:'breakfast',
  pick:null
};

function emptyLog(){ return {breakfast:[],lunch:[],dinner:[],snacks:[]}; }
function todayKey(d){ const x=d||new Date(); return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0'); }
function $(id){ return document.getElementById(id); }
function round(n,d){ const m=Math.pow(10,d||0); return Math.round(n*m)/m; }
function esc(s){ return String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
function allFoods(){ return state.custom.concat(FOODS); }
function nf(n){ return Math.round(n).toLocaleString('he-IL'); }

/* ---------- calculations ---------- */
function compute(){
  const P = state.profile;
  const w = +P.weight||0, h = +P.height||0, a = +P.age||0;
  const bmr = P.sex === 'male' ? 10*w + 6.25*h - 5*a + 5 : 10*w + 6.25*h - 5*a - 161;
  const tdee = bmr * (+P.activity);
  const delta = (+P.goal) * 7700 / 7;                 // ‏7,700 קק״ל ≈ ק״ג שומן
  const floor = P.sex === 'male' ? 1500 : 1200;
  let target = tdee + delta, clipped = false;
  if (target < floor) { target = floor; clipped = true; }

  const cutting = (+P.goal) < 0;
  const protein = Math.round(w * (cutting ? 2.0 : 1.8));
  let fat = Math.round(target * 0.25 / 9);
  const fatMin = Math.round(w * 0.8);
  if (fat < fatMin) fat = fatMin;
  let carbs = Math.round((target - protein*4 - fat*9) / 4);
  if (carbs < 0) carbs = 0;

  const bmi = h > 0 ? w / Math.pow(h/100, 2) : 0;
  return {bmr:Math.round(bmr), tdee:Math.round(tdee), target:Math.round(target), clipped, floor,
          protein, carbs, fat, bmi, water:round(w*0.035,1)};
}
function bmiCat(b){ return b<18.5 ? 'תת־משקל' : b<25 ? 'תקין' : b<30 ? 'עודף משקל' : 'השמנה'; }
function totals(){
  const t = {k:0,p:0,c:0,f:0};
  MEALS.forEach(m => state.log[m.id].forEach(i => { t.k+=i.k; t.p+=i.p; t.c+=i.c; t.f+=i.f; }));
  return t;
}
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
    const log = JSON.parse(raw);
    let k = 0, any = false;
    MEALS.forEach(m => (log[m.id]||[]).forEach(i => { k += i.k; any = true; }));
    return any ? k : null;
  } catch(e){ return null; }
}

/* ---------- render: today ---------- */
function renderProfile(){
  const r = compute();
  state.targets = {kcal:r.target, p:r.protein, c:r.carbs, f:r.fat};
  $('sBmr').innerHTML    = nf(r.bmr)   + '<small>קק״ל</small>';
  $('sTdee').innerHTML   = nf(r.tdee)  + '<small>קק״ל</small>';
  $('sTarget').innerHTML = nf(r.target)+ '<small>קק״ל</small>';
  $('sBmi').innerHTML    = round(r.bmi,1) + '<small>' + bmiCat(r.bmi) + '</small>';
  $('sWater').innerHTML  = r.water + '<small>ליטר</small>';
  const note = $('floorNote');
  if (r.clipped){
    note.hidden = false;
    note.textContent = 'היעד שחושב היה נמוך מדי, ולכן הועלה לרף המינימלי של ' + nf(r.floor) + ' קק״ל ליום. קצב ירידה איטי יותר יתאים לך יותר.';
  } else note.hidden = true;
  $('burnMini').textContent = nf(r.tdee);
}

function renderDiary(){
  const box = $('meals');
  box.innerHTML = MEALS.map(m => {
    const items = state.log[m.id];
    const rows = items.map((it,i) =>
      '<li><div class="nm"><b>'+esc(it.n)+'</b><span>'+esc(it.q)+'</span></div>'+
      '<div class="num">'+Math.round(it.k)+'<i>קק״ל</i></div>'+
      '<button class="del" data-meal="'+m.id+'" data-i="'+i+'" aria-label="מחיקה">✕</button></li>').join('');
    return '<div class="meal"><div class="mhead"><h3>'+m.name+'</h3><div class="k">'+Math.round(mealTotal(m.id))+' קק״ל</div></div>'+
      (items.length ? '<ul class="items">'+rows+'</ul>' : '') +
      '<button class="addrow" data-add="'+m.id+'">＋ הוספה ל'+m.name+'</button></div>';
  }).join('');
  const count = MEALS.reduce((s,m) => s + state.log[m.id].length, 0);
  $('diarySub').textContent = count ? count + ' רישומים' : 'עוד לא נרשם כלום';
}

function renderRecents(){
  const wrap = $('recentWrap');
  if (!state.recent.length){ wrap.hidden = true; return; }
  wrap.hidden = false;
  $('recents').innerHTML = state.recent.slice(0,10)
    .map(n => '<button data-quick="'+esc(n)+'">'+esc(n)+'</button>').join('');
}

function renderSummary(){
  const t = totals(), T = state.targets;
  const remain = Math.round(T.kcal - t.k);
  $('eaten').textContent = nf(t.k);
  $('targetMini').textContent = nf(T.kcal);
  $('remain').textContent = Math.abs(remain).toLocaleString('he-IL');
  $('remain').classList.toggle('over', remain < 0);
  $('remainCap').textContent = remain < 0 ? 'קלוריות מעל היעד' : 'קלוריות נותרו';
  const C = 2 * Math.PI * 84;
  $('ringFg').style.strokeDashoffset = String(C * (1 - (T.kcal ? Math.min(t.k/T.kcal,1) : 0)));
  setBar('p', t.p, T.p); setBar('c', t.c, T.c); setBar('f', t.f, T.f);
}
function setBar(key, val, target){
  $(key+'Txt').textContent = Math.round(val) + ' / ' + target + ' ג׳';
  $(key+'Bar').style.width = (target ? Math.min(val/target,1)*100 : 0) + '%';
  $(key+'Txt').style.color = (target && val > target*1.05) ? 'var(--rose)' : '';
}
function renderDate(){
  const isToday = state.date === todayKey();
  const d = new Date(state.date + 'T12:00:00');
  $('dateLabel').textContent = isToday ? 'היום'
    : d.toLocaleDateString('he-IL', {weekday:'short', day:'numeric', month:'short'});
  $('nextDay').disabled = isToday;
}

/* ---------- render: week ---------- */
async function renderWeek(){
  const days = [];
  const base = new Date(todayKey() + 'T12:00:00');
  for (let i = 6; i >= 0; i--){
    const d = new Date(base); d.setDate(d.getDate() - i);
    const key = todayKey(d);
    days.push({key, dow:DAYS[d.getDay()], kcal: await loadDayTotal(key)});
  }
  const T = state.targets.kcal || 1;
  const max = Math.max(T * 1.25, ...days.map(d => d.kcal || 0));
  $('chart').innerHTML = days.map(d => {
    const h = d.kcal ? Math.max((d.kcal / max) * 100, 2) : 0;
    const over = d.kcal && d.kcal > T * 1.02;
    return '<button class="col'+(d.key===todayKey()?' today':'')+'" data-day="'+d.key+'">'+
      '<div class="stack"><div class="fill'+(over?' overq':'')+'" style="height:'+h+'%"></div></div>'+
      '<div class="d">'+d.dow+'</div></button>';
  }).join('') + '<div class="goalline" style="bottom:'+(28 + (T/max)*(170-28-22))+'px"><span>יעד '+nf(T)+'</span></div>';

  const logged = days.filter(d => d.kcal);
  const avg = logged.length ? logged.reduce((s,d) => s + d.kcal, 0) / logged.length : 0;
  const inRange = logged.filter(d => d.kcal >= T*0.85 && d.kcal <= T*1.05).length;
  $('kAvg').textContent = nf(avg);
  $('kIn').textContent = inRange;
  $('kLogged').textContent = logged.length + '/7';

  renderWeight();
}

function renderWeight(){
  const keys = Object.keys(state.weights).sort();
  const svg = $('spark');
  if (keys.length < 2){
    svg.innerHTML = '<text x="150" y="44" text-anchor="middle" fill="#8EA0C4" font-size="12" font-family="Heebo,sans-serif">רשום משקל בשני ימים כדי לראות מגמה</text>';
    $('wFirst').textContent = ''; $('wLast').textContent = ''; $('wDelta').textContent = '';
    return;
  }
  const vals = keys.map(k => state.weights[k]);
  const min = Math.min(...vals), max = Math.max(...vals), span = (max - min) || 1;
  const pts = vals.map((v,i) => [ (i/(vals.length-1))*300, 70 - ((v-min)/span)*56 ]);
  const line = pts.map((p,i) => (i ? 'L' : 'M') + round(p[0],1) + ' ' + round(p[1],1)).join(' ');
  const area = line + ' L300 80 L0 80 Z';
  svg.innerHTML =
    '<defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0%" stop-color="#38E8FF" stop-opacity=".35"/><stop offset="100%" stop-color="#38E8FF" stop-opacity="0"/></linearGradient></defs>'+
    '<path d="'+area+'" fill="url(#wg)"/>'+
    '<path d="'+line+'" fill="none" stroke="#38E8FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>'+
    '<circle cx="'+round(pts[pts.length-1][0],1)+'" cy="'+round(pts[pts.length-1][1],1)+'" r="3.5" fill="#EAF1FF"/>';
  const fmt = k => new Date(k+'T12:00:00').toLocaleDateString('he-IL',{day:'numeric',month:'short'});
  $('wFirst').textContent = vals[0] + ' ק״ג · ' + fmt(keys[0]);
  $('wLast').textContent  = vals[vals.length-1] + ' ק״ג · ' + fmt(keys[keys.length-1]);
  const diff = round(vals[vals.length-1] - vals[0], 1);
  $('wDelta').textContent = (diff > 0 ? '+' : '') + diff + ' ק״ג מאז ההתחלה';
}

function renderAll(){ renderProfile(); renderDiary(); renderRecents(); renderSummary(); renderDate(); }

/* ---------- navigation ---------- */
function goto(scr){
  state.screen = scr;
  ['today','week','me'].forEach(s => { $('scr-'+s).hidden = (s !== scr); });
  document.querySelectorAll('.tab').forEach(b =>
    b.setAttribute('aria-current', b.dataset.scr === scr ? 'page' : 'false'));
  $('datePill').style.visibility = (scr === 'today') ? '' : 'hidden';
  $('barSub').textContent = scr === 'today' ? 'יומן קלוריות' : scr === 'week' ? 'המגמה השבועית' : 'היעד האישי שלך';
  if (scr === 'week') renderWeek();
  window.scrollTo({top:0});
}
document.querySelector('.tabbar').addEventListener('click', e => {
  const b = e.target.closest('.tab'); if (b) goto(b.dataset.scr);
});
$('chart').addEventListener('click', e => {
  const c = e.target.closest('[data-day]'); if (!c) return;
  state.date = c.dataset.day;
  loadLog().then(() => { renderAll(); goto('today'); });
});

/* ---------- date nav ---------- */
function shiftDate(days){
  const d = new Date(state.date + 'T12:00:00');
  d.setDate(d.getDate() + days);
  if (todayKey(d) > todayKey()) return;
  state.date = todayKey(d);
  loadLog().then(renderAll);
}
$('prevDay').addEventListener('click', () => shiftDate(-1));
$('nextDay').addEventListener('click', () => shiftDate(1));

/* ---------- profile inputs ---------- */
$('sexSeg').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  [...e.currentTarget.children].forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  state.profile.sex = b.dataset.v;
  renderProfile(); renderSummary(); saveProfile();
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
  saveWeights(); renderWeight();
  toast('המשקל נרשם ליום הזה');
});

/* ---------- diary actions ---------- */
$('meals').addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  if (add) { openSheet(add.dataset.add); return; }
  const del = e.target.closest('.del');
  if (del) {
    state.log[del.dataset.meal].splice(+del.dataset.i, 1);
    saveLog(); renderDiary(); renderSummary(); toast('הרישום נמחק');
  }
});
$('recents').addEventListener('click', e => {
  const b = e.target.closest('[data-quick]'); if (!b) return;
  openSheet(guessMeal());
  pickFood(b.dataset.quick);
});
$('fab').addEventListener('click', () => openSheet(guessMeal()));

function guessMeal(){
  const h = new Date().getHours();
  if (h < 11) return 'breakfast';
  if (h < 16) return 'lunch';
  if (h < 21) return 'dinner';
  return 'snacks';
}

/* ---------- sheet ---------- */
let lastFocus = null;
function openSheet(mealId){
  state.meal = mealId || guessMeal();
  state.pick = null;
  lastFocus = document.activeElement;
  $('mealSel').innerHTML = MEALS.map(m =>
    '<option value="'+m.id+'"'+(m.id===state.meal?' selected':'')+'>'+m.name+'</option>').join('');
  $('scrim').hidden = false;
  document.body.style.overflow = 'hidden';
  showTab('search');
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
  const s = which === 'search';
  $('tabSearch').setAttribute('aria-selected', String(s));
  $('tabNew').setAttribute('aria-selected', String(!s));
  $('paneSearch').hidden = !s;
  $('paneNew').hidden = s;
}
$('tabSearch').addEventListener('click', () => showTab('search'));
$('tabNew').addEventListener('click', () => showTab('new'));

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
  $('pvP').textContent = round(v.p,1);
  $('pvC').textContent = round(v.c,1);
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
  const n = $('nName').value.trim();
  const k = parseFloat($('nKcal').value);
  if (!n) { toast('צריך לתת שם למאכל'); return; }
  if (!(k >= 0)) { toast('צריך להזין קלוריות ל‑100 גרם'); return; }
  state.custom.unshift({n, g:'מאכל שלי', k,
    p:parseFloat($('nP').value)||0, c:parseFloat($('nC').value)||0, f:parseFloat($('nF').value)||0});
  saveCustom();
  ['nName','nKcal','nP','nC','nF'].forEach(id => { $(id).value = ''; });
  showTab('search'); $('q').value = n; renderResults(n); pickFood(n);
  toast('המאכל נשמר למאגר');
});

/* ---------- toast ---------- */
let toastT;
function toast(msg){
  const el = $('toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove('show'), 2100);
}

/* ---------- install prompt ---------- */
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); deferredPrompt = e; $('installBtn').hidden = false;
});
$('installBtn').addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
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
  } catch(e) {}

  const P = state.profile;
  [...$('sexSeg').children].forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === P.sex)));
  $('age').value = P.age; $('height').value = P.height; $('weight').value = P.weight;
  $('activity').value = P.activity; $('goal').value = P.goal;

  await loadLog();
  renderAll();
  goto('today');

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
})();
