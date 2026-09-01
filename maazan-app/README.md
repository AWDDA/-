# מאזן — יומן קלוריות (PWA)

אפליקציית ווב מתקינה. אותו קוד רץ על אנדרואיד, אייפון ודסקטופ,
עובד אופליין, ושומר את כל הנתונים מקומית במכשיר — אין שרת ואין חשבון.

## קבצים

| קובץ | תפקיד |
|---|---|
| `index.html` | מעטפת האפליקציה (מסכים, טאבים, sheet) |
| `app.js` | מאגר המאכלים, החישובים, השמירה המקומית |
| `manifest.webmanifest` | מה שהופך את זה לאפליקציה מתקינה |
| `sw.js` | Service worker — הפעלה אופליין |
| `icons/` | אייקונים 192/512 + maskable |
| `maazan-standalone.html` | קובץ אחד עצמאי לתצוגה מהירה (בלי PWA) |

## הרצה מקומית

Service worker דורש `http`, לא `file://`:

```bash
cd maazan-app
python3 -m http.server 8080
# ואז http://localhost:8080
```

## העלאה לאוויר

כל אחסון סטטי מתאים — GitHub Pages, Netlify, Cloudflare Pages, Vercel.
צריך **HTTPS** כדי ש‑PWA יעבוד.

```bash
git init && git add . && git commit -m "maazan"
git branch -M main && git remote add origin <repo> && git push -u origin main
# Settings → Pages → Deploy from branch → main / root
```

## התקנה על הטלפון

* **אנדרואיד (Chrome)** — נפתח באנר "התקנה", או כפתור ההתקנה שבראש המסך.
* **אייפון (Safari)** — שיתוף → הוספה למסך הבית. אייפון לא תומך בבאנר אוטומטי.
* **דסקטופ (Chrome/Edge)** — אייקון ההתקנה בשורת הכתובת.

אחרי ההתקנה: אין שורת כתובת, יש אייקון משלה, ועובדת בלי אינטרנט.

## אפליקציה נייטיב (APK / IPA)

אם צריך חנות אפליקציות או גישה לחומרה, עוטפים ב‑Capacitor:

```bash
npm init -y
npm i @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
npx cap init "מאזן" com.eli.maazan --web-dir=.
npx cap add android
npx cap sync
npx cap open android      # Android Studio → Build APK
```

## שינויים נפוצים

* **מאגר מאכלים** — מערך `FOODS` ב‑`app.js`. אפשר להחליף בקריאה ל‑Open Food Facts.
* **אחסון** — כל הקריאות עוברות דרך `Store` בראש `app.js`. להחלפה בשרת, שנה רק אותו.
* **צבעים** — משתני ה‑CSS ב‑`:root` בתוך `index.html`.
* **גרסת cache** — אחרי כל עדכון, העלה את `CACHE` ב‑`sw.js` (`maazan-v1` → `v2`), אחרת המשתמשים יקבלו גרסה ישנה.

## נוסחאות

* BMR — Mifflin‑St Jeor
* TDEE — BMR × מקדם פעילות (1.2–1.9)
* גירעון/עודף — 7,700 קק״ל ≈ ק״ג שומן, מחולק ל‑7 ימים
* רף מינימום — 1,500 קק״ל לגבר, 1,200 לאישה
* חלבון — 2 ג׳/ק״ג בגירעון, 1.8 בשמירה · שומן — 25% מהקלוריות (מינימום 0.8 ג׳/ק״ג) · פחמימות — היתרה

המספרים הם הערכה סטטיסטית ואינם ייעוץ תזונתי.
