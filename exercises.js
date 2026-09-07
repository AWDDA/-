/* ============================================================
   מאזן — מאגר תרגילים
   ההמחשה היא מפת שרירים ולא צילום: סטים של איורי אימון הם חומר
   מוגן בזכויות יוצרים. הצללית נוצרת בקוד, אז אין תלות בקבצים
   חיצוניים והמאגר עובד אופליין.
   ============================================================ */

const MUSCLES = {
  chest:'חזה', back:'גב', shoulders:'כתפיים', biceps:'יד קדמית', triceps:'יד אחורית',
  quads:'ארבע ראשי', hams:'ירך אחורית', glutes:'ישבן', calves:'תאומים',
  abs:'בטן', forearms:'אמות', trap:'טרפז', full:'כל הגוף', cardio:'קרדיו'
};

const EQUIP = {
  barbell:'מוט', dumbbell:'משקולות', machine:'מכונה', cable:'כבל',
  body:'משקל גוף', kettlebell:'קטלבל', band:'גומייה', cardio:'קרדיו'
};

/* n=שם, en=חיפוש באנגלית, m=שריר, eq=ציוד, d=דגש טכני */
const EXERCISES = [
  /* ---------- חזה ---------- */
  {n:'לחיצת חזה במוט',en:'bench press',m:'chest',eq:'barbell',d:'שכמות מכווצות, מוט לגובה הפטמות, מרפקים ב-45 מעלות מהגוף.'},
  {n:'לחיצת חזה בשיפוע עולה',en:'incline bench press',m:'chest',eq:'barbell',d:'שיפוע 30 מעלות. מעל זה העומס עובר לכתף הקדמית.'},
  {n:'לחיצת חזה בשיפוע יורד',en:'decline bench press',m:'chest',eq:'barbell',d:'מדגיש את החלק התחתון של החזה.'},
  {n:'לחיצת חזה במשקולות',en:'dumbbell press',m:'chest',eq:'dumbbell',d:'טווח תנועה גדול יותר מהמוט, דורש ייצוב.'},
  {n:'לחיצת חזה בשיפוע במשקולות',en:'incline dumbbell press',m:'chest',eq:'dumbbell',d:'המשקולות נפגשות מעל החזה העליון.'},
  {n:'פרפר במשקולות',en:'dumbbell fly',m:'chest',eq:'dumbbell',d:'מרפק כפוף קלות וקבוע. זו תנועת קשת, לא לחיצה.'},
  {n:'פרפר בכבלים',en:'cable crossover',m:'chest',eq:'cable',d:'מתח קבוע לאורך כל הטווח.'},
  {n:'פרפר במכונה',en:'pec deck',m:'chest',eq:'machine',d:'טוב למתחילים, מסלול קבוע.'},
  {n:'שכיבות סמיכה',en:'push up',m:'chest',eq:'body',d:'גוף בקו ישר, בטן נעולה, מרפקים לא מתפרקים החוצה.'},
  {n:'מקבילים לחזה',en:'chest dips',m:'chest',eq:'body',d:'הטיה קדימה של הגוף מעבירה עומס לחזה.'},
  {n:'לחיצת חזה במכונה',en:'machine chest press',m:'chest',eq:'machine',d:'ידיות בגובה החזה.'},

  /* ---------- גב ---------- */
  {n:'מתח באחיזה רחבה',en:'pull up',m:'back',eq:'body',d:'משיכה עם המרפקים כלפי מטה, לא עם הידיים.'},
  {n:'מתח באחיזה צרה הפוכה',en:'chin up',m:'back',eq:'body',d:'מערב יותר יד קדמית.'},
  {n:'חתירה במוט',en:'barbell row',m:'back',eq:'barbell',d:'גב ישר, טורסו בזווית 45, מוט לכיוון הטבור.'},
  {n:'חתירה במשקולת ביד אחת',en:'one arm dumbbell row',m:'back',eq:'dumbbell',d:'ברך וכף יד על הספסל, משיכה לכיוון הירך.'},
  {n:'חתירה בכבל בישיבה',en:'seated cable row',m:'back',eq:'cable',d:'חזה פתוח, בלי להתנדנד עם הגב התחתון.'},
  {n:'פולי עליון לחזה',en:'lat pulldown',m:'back',eq:'cable',d:'מוט לחזה העליון, שכמות יורדות ומתקרבות.'},
  {n:'פולאובר בכבל',en:'straight arm pulldown',m:'back',eq:'cable',d:'ידיים כמעט ישרות, בידוד של הרחב גבי.'},
  {n:'חתירה במכונה',en:'machine row',m:'back',eq:'machine',d:'חזה נשען, מסלול קבוע.'},
  {n:'דדליפט',en:'deadlift',m:'back',eq:'barbell',d:'מוט צמוד לשוקיים, גב ניטרלי, דחיפה מהרצפה עם הרגליים.'},
  {n:'דדליפט רומני',en:'romanian deadlift',m:'hams',eq:'barbell',d:'ירכיים אחורה, ברכיים כפופות קלות, מתיחה בירך האחורית.'},
  {n:'היפר אקסטנשן',en:'back extension',m:'back',eq:'body',d:'עלייה עד קו ישר בלבד, בלי גב תחתון בקשת.'},

  /* ---------- כתפיים ---------- */
  {n:'לחיצת כתפיים במוט',en:'overhead press',m:'shoulders',eq:'barbell',d:'בטן וישבן נעולים, המוט עובר קרוב לפנים.'},
  {n:'לחיצת כתפיים במשקולות',en:'dumbbell shoulder press',m:'shoulders',eq:'dumbbell',d:'מרפקים מעט קדימה, לא בקו אחד עם הגוף.'},
  {n:'הרחקות צד',en:'lateral raise',m:'shoulders',eq:'dumbbell',d:'משקל קל, עלייה עד גובה הכתף, בלי תנופה.'},
  {n:'הרחקות צד בכבל',en:'cable lateral raise',m:'shoulders',eq:'cable',d:'מתח קבוע גם בתחתית התנועה.'},
  {n:'הרחקות אחוריות בהטיה',en:'rear delt fly',m:'shoulders',eq:'dumbbell',d:'טורסו כמעט מקביל לרצפה, מרפקים מעט כפופים.'},
  {n:'פייס פול',en:'face pull',m:'shoulders',eq:'cable',d:'משיכה לגובה המצח, סיבוב חיצוני בסוף. מצוין לבריאות הכתף.'},
  {n:'הרמות קדמיות',en:'front raise',m:'shoulders',eq:'dumbbell',d:'עד גובה הכתף, בלי להתנדנד.'},
  {n:'לחיצת כתפיים במכונה',en:'machine shoulder press',m:'shoulders',eq:'machine',d:'גב נשען, מסלול מובנה.'},
  {n:'משיכות לסנטר',en:'upright row',m:'trap',eq:'barbell',d:'אחיזה לא צרה מדי, כדי לא ללחוץ את הכתף.'},
  {n:'שראגס',en:'shrugs',m:'trap',eq:'dumbbell',d:'הרמה אנכית של הכתפיים, בלי סיבוב.'},

  /* ---------- יד קדמית ---------- */
  {n:'כפיפת מרפקים במוט',en:'barbell curl',m:'biceps',eq:'barbell',d:'מרפקים צמודים לגוף וקבועים.'},
  {n:'כפיפת מרפקים במשקולות',en:'dumbbell curl',m:'biceps',eq:'dumbbell',d:'סיבוב כף היד כלפי מעלה בעלייה.'},
  {n:'כפיפת פטיש',en:'hammer curl',m:'biceps',eq:'dumbbell',d:'אחיזה ניטרלית, מערב גם את האמה.'},
  {n:'כפיפת מרפקים בכבל',en:'cable curl',m:'biceps',eq:'cable',d:'מתח קבוע לאורך כל התנועה.'},
  {n:'כפיפה על ספסל סקוט',en:'preacher curl',m:'biceps',eq:'barbell',d:'מבודד, מונע תנופה מהגב.'},
  {n:'כפיפת ריכוז',en:'concentration curl',m:'biceps',eq:'dumbbell',d:'מרפק נשען על הירך הפנימית.'},

  /* ---------- יד אחורית ---------- */
  {n:'פשיטת מרפקים בפולי',en:'triceps pushdown',m:'triceps',eq:'cable',d:'מרפקים צמודים, רק האמה זזה.'},
  {n:'פשיטה מעל הראש בכבל',en:'overhead triceps extension',m:'triceps',eq:'cable',d:'מותח את הראש הארוך של היד האחורית.'},
  {n:'לחיצה צרה',en:'close grip bench press',m:'triceps',eq:'barbell',d:'אחיזה ברוחב כתפיים, מרפקים קרובים לגוף.'},
  {n:'מקבילים ליד אחורית',en:'triceps dips',m:'triceps',eq:'body',d:'גוף זקוף ככל האפשר.'},
  {n:'סקאל קראשר',en:'skull crusher',m:'triceps',eq:'barbell',d:'מרפקים קבועים במקום, המוט יורד למצח.'},
  {n:'קיקבק',en:'triceps kickback',m:'triceps',eq:'dumbbell',d:'זרוע מקבילה לרצפה, פשיטה מלאה.'},

  /* ---------- רגליים ---------- */
  {n:'סקוואט',en:'squat',m:'quads',eq:'barbell',d:'ברכיים בכיוון האצבעות, ירידה עד מקביל לפחות.'},
  {n:'סקוואט קדמי',en:'front squat',m:'quads',eq:'barbell',d:'מוט על הכתף הקדמית, טורסו זקוף יותר.'},
  {n:'לחיצת רגליים',en:'leg press',m:'quads',eq:'machine',d:'גב תחתון צמוד למשענת לאורך כל הטווח.'},
  {n:'האק סקוואט',en:'hack squat',m:'quads',eq:'machine',d:'עומס ממוקד בארבע ראשי.'},
  {n:'מכרעים',en:'lunges',m:'quads',eq:'dumbbell',d:'צעד גדול, ברך אחורית קרוב לרצפה.'},
  {n:'מכרעים בולגריים',en:'bulgarian split squat',m:'quads',eq:'dumbbell',d:'רגל אחורית על ספסל. קשה יותר ממה שזה נראה.'},
  {n:'פשיטת ברך במכונה',en:'leg extension',m:'quads',eq:'machine',d:'בידוד, עצירה קצרה בפשיטה מלאה.'},
  {n:'כפיפת ברך במכונה',en:'leg curl',m:'hams',eq:'machine',d:'ישבן צמוד למושב, בלי להרים אגן.'},
  {n:'גוד מורנינג',en:'good morning',m:'hams',eq:'barbell',d:'משקל קל, גב ניטרלי, ציר בירך.'},
  {n:'היפ ת׳ראסט',en:'hip thrust',m:'glutes',eq:'barbell',d:'סנטר לחזה, כיווץ ישבן בקצה, בלי גב תחתון בקשת.'},
  {n:'גשר ישבן',en:'glute bridge',m:'glutes',eq:'body',d:'גרסת משקל גוף, טובה לחימום.'},
  {n:'הרחקת ירך במכונה',en:'hip abduction',m:'glutes',eq:'machine',d:'עובד את הישבן האמצעי.'},
  {n:'עליות עגלים בעמידה',en:'standing calf raise',m:'calves',eq:'machine',d:'טווח מלא, עצירה למעלה ומתיחה למטה.'},
  {n:'עליות עגלים בישיבה',en:'seated calf raise',m:'calves',eq:'machine',d:'מדגיש את הסוליארי, השריר העמוק.'},
  {n:'סטפ אפ',en:'step up',m:'quads',eq:'dumbbell',d:'דחיפה מהעקב של הרגל שעל המדרגה.'},
  {n:'סקוואט גובלט',en:'goblet squat',m:'quads',eq:'dumbbell',d:'משקולת מול החזה, מצוין ללימוד טכניקה.'},

  /* ---------- בטן ---------- */
  {n:'פלאנק',en:'plank',m:'abs',eq:'body',d:'קו ישר מהראש לעקבים, אגן נעול, לא ישבן באוויר.'},
  {n:'פלאנק צד',en:'side plank',m:'abs',eq:'body',d:'עובד את האלכסונים והייצוב הצדדי.'},
  {n:'כפיפות בטן',en:'crunch',m:'abs',eq:'body',d:'גלגול של עמוד השדרה, לא משיכה של הצוואר.'},
  {n:'הרמות רגליים בתלייה',en:'hanging leg raise',m:'abs',eq:'body',d:'בלי תנופה, האגן מתגלגל בסוף התנועה.'},
  {n:'כפיפות בטן בכבל',en:'cable crunch',m:'abs',eq:'cable',d:'מאפשר עומס מתקדם לבטן.'},
  {n:'רוסיאן טוויסט',en:'russian twist',m:'abs',eq:'body',d:'סיבוב מהמותן, לא רק מהידיים.'},
  {n:'אב רולאאוט',en:'ab wheel rollout',m:'abs',eq:'body',d:'תרגיל אנטי-אקסטנשן, קשה. אגן נעול.'},
  {n:'דד באג',en:'dead bug',m:'abs',eq:'body',d:'גב תחתון צמוד לרצפה לאורך כל התנועה.'},
  {n:'הרמות רגליים בשכיבה',en:'lying leg raise',m:'abs',eq:'body',d:'ידיים מתחת לישבן, בלי לקשת את הגב.'},

  /* ---------- כל הגוף וקטלבל ---------- */
  {n:'סווינג קטלבל',en:'kettlebell swing',m:'glutes',eq:'kettlebell',d:'תנועה מהירך, לא מהכתפיים. הקטלבל צף.'},
  {n:'קלין אנד פרס',en:'clean and press',m:'full',eq:'barbell',d:'תרגיל מורכב, דורש לימוד טכניקה.'},
  {n:'ת׳רסטר',en:'thruster',m:'full',eq:'dumbbell',d:'סקוואט ולחיצה ברצף אחד.'},
  {n:'ברפי',en:'burpee',m:'full',eq:'body',d:'קרדיו וכוח יחד, קצב אחיד עדיף על מהיר.'},
  {n:'פארמר ווק',en:'farmers walk',m:'forearms',eq:'dumbbell',d:'הליכה עם משקל כבד, כתפיים אחורה.'},
  {n:'כפיפת פרק כף היד',en:'wrist curl',m:'forearms',eq:'dumbbell',d:'טווח קטן, חזרות גבוהות.'},

  /* ---------- גומייה ---------- */
  {n:'הרחקות צד בגומייה',en:'band lateral raise',m:'shoulders',eq:'band',d:'מתאים לחימום ולאימון בבית.'},
  {n:'חתירה בגומייה',en:'band row',m:'back',eq:'band',d:'גומייה מעוגנת בגובה החזה.'},
  {n:'פול אפארט',en:'band pull apart',m:'shoulders',eq:'band',d:'מצוין לחימום כתפיים ולתנוחה.'},
  {n:'הרחקת ירך בגומייה',en:'band hip abduction',m:'glutes',eq:'band',d:'גומייה מעל הברכיים, חימום לפני סקוואט.'},

  /* ---------- קרדיו ---------- */
  {n:'ריצה על הליכון',en:'treadmill run',m:'cardio',eq:'cardio',d:'קצב שמאפשר לדבר במשפטים קצרים לאימון בסיס.'},
  {n:'הליכה בשיפוע',en:'incline walk',m:'cardio',eq:'cardio',d:'שיפוע 10–12, קצב 5. שורף בלי לעייף את המפרקים.'},
  {n:'אופני כושר',en:'stationary bike',m:'cardio',eq:'cardio',d:'התנגדות בינונית, קצב אחיד.'},
  {n:'חתירה ארגומטר',en:'rowing machine',m:'cardio',eq:'cardio',d:'סדר: רגליים, גב, ידיים. ובחזרה הפוך.'},
  {n:'אליפטיקל',en:'elliptical',m:'cardio',eq:'cardio',d:'עומס נמוך על הברכיים.'},
  {n:'קפיצה בחבל',en:'jump rope',m:'cardio',eq:'cardio',d:'קפיצות קטנות, פרקי כף יד מסובבים.'},
  {n:'אינטרוולים',en:'hiit intervals',m:'cardio',eq:'cardio',d:'30 שניות מאמץ, 90 שניות התאוששות.'},
  {n:'מדרגות',en:'stair climber',m:'cardio',eq:'cardio',d:'בלי להישען על הידיות, זה מוריד חצי מהעומס.'}
];

/* ---------- מפת שרירים ---------- */
const BACK_VIEW = ['back','triceps','hams','glutes','trap'];

function muscleMapSVG(muscle, size){
  const s = size || 44;
  const on = 'var(--state)', off = 'rgba(255,255,255,.13)';
  const hit = k => (k === muscle ? on : off);
  const back = BACK_VIEW.indexOf(muscle) > -1;

  /* צללית פשוטה, לא אנטומיה מדויקת — המטרה היא לזהות אזור במבט */
  const parts = back ? [
    ['<circle cx="50" cy="11" r="8"/>', 'head'],
    ['<rect x="41" y="19" width="18" height="5" rx="2"/>', 'trap'],
    ['<ellipse cx="31" cy="28" rx="7" ry="6"/><ellipse cx="69" cy="28" rx="7" ry="6"/>', 'shoulders'],
    ['<rect x="36" y="24" width="28" height="32" rx="7"/>', 'back'],
    ['<rect x="24" y="30" width="9" height="18" rx="4"/><rect x="67" y="30" width="9" height="18" rx="4"/>', 'triceps'],
    ['<rect x="22" y="47" width="9" height="17" rx="4"/><rect x="69" y="47" width="9" height="17" rx="4"/>', 'forearms'],
    ['<rect x="37" y="56" width="26" height="12" rx="6"/>', 'glutes'],
    ['<rect x="38" y="67" width="11" height="23" rx="5"/><rect x="51" y="67" width="11" height="23" rx="5"/>', 'hams'],
    ['<rect x="39" y="90" width="9" height="16" rx="4"/><rect x="52" y="90" width="9" height="16" rx="4"/>', 'calves']
  ] : [
    ['<circle cx="50" cy="11" r="8"/>', 'head'],
    ['<ellipse cx="31" cy="28" rx="7" ry="6"/><ellipse cx="69" cy="28" rx="7" ry="6"/>', 'shoulders'],
    ['<rect x="37" y="23" width="26" height="15" rx="6"/>', 'chest'],
    ['<rect x="40" y="39" width="20" height="19" rx="5"/>', 'abs'],
    ['<rect x="24" y="30" width="9" height="18" rx="4"/><rect x="67" y="30" width="9" height="18" rx="4"/>', 'biceps'],
    ['<rect x="22" y="47" width="9" height="17" rx="4"/><rect x="69" y="47" width="9" height="17" rx="4"/>', 'forearms'],
    ['<rect x="37" y="58" width="26" height="9" rx="4"/>', 'glutes'],
    ['<rect x="38" y="66" width="11" height="24" rx="5"/><rect x="51" y="66" width="11" height="24" rx="5"/>', 'quads'],
    ['<rect x="39" y="90" width="9" height="16" rx="4"/><rect x="52" y="90" width="9" height="16" rx="4"/>', 'calves']
  ];

  let body = parts.map(p => '<g fill="' + hit(p[1]) + '">' + p[0] + '</g>').join('');

  /* קרדיו וכל-הגוף: מדליקים את כל הצללית */
  if (muscle === 'full' || muscle === 'cardio'){
    body = parts.map(p => '<g fill="' + (p[1] === 'head' ? off : on) + '">' + p[0] + '</g>').join('');
  }

  return '<svg viewBox="0 0 100 112" width="' + s + '" height="' + Math.round(s * 1.12) +
         '" aria-hidden="true">' + body + '</svg>';
}
