-- מאזן — סכימת מסד הנתונים
-- הרץ את זה פעם אחת ב-Supabase: SQL Editor → New query → Run
-- אפשר להריץ שוב בבטחה, הכל idempotent.

-- ============================================================
-- 1. נתוני האפליקציה
-- ============================================================
create table if not exists public.app_data (
  user_id    uuid        not null references auth.users on delete cascade,
  key        text        not null,
  value      text        not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

alter table public.app_data enable row level security;

-- הלב של האבטחה: כל משתמש רואה ומשנה אך ורק את השורות של עצמו.
-- זה נאכף במסד הנתונים, לא בקוד הלקוח, ולכן חשיפת ה-anon key אינה בעיה.
drop policy if exists "own rows only" on public.app_data;
create policy "own rows only" on public.app_data
  for all
  using      (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists app_data_user_idx on public.app_data (user_id);

-- ============================================================
-- 2. פרופילים ציבוריים — שם משתמש ותפקיד
-- ============================================================
create table if not exists public.profiles (
  user_id      uuid primary key references auth.users on delete cascade,
  username     text not null,
  display_name text,
  role         text not null default 'trainee' check (role in ('trainee','coach')),
  created_at   timestamptz not null default now()
);

-- שם משתמש ייחודי בלי תלות ברישיות
create unique index if not exists profiles_username_key
  on public.profiles (lower(username));

alter table public.profiles enable row level security;

-- כל משתמש מחובר יכול לחפש שמות משתמש. זו ספריית משתמשים, כמו
-- בכל אפליקציה שבה מוסיפים מישהו לפי שם. היא חושפת שם משתמש,
-- שם תצוגה ותפקיד — ולא שום נתון תזונתי.
drop policy if exists "directory is readable" on public.profiles;
-- auth.role() מיושנת ועלולה לא להתקיים בפרויקטים חדשים.
-- auth.uid() קיימת תמיד ומחזירה null למשתמש אנונימי.
create policy "directory is readable" on public.profiles
  for select using (auth.uid() is not null);

drop policy if exists "write own profile" on public.profiles;
create policy "write own profile" on public.profiles
  for insert with check (auth.uid() = user_id);

drop policy if exists "update own profile" on public.profiles;
create policy "update own profile" on public.profiles
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
-- 3. קישור מאמן ↔ מתאמן
-- ============================================================
create table if not exists public.coach_links (
  id           uuid primary key default gen_random_uuid(),
  coach_id     uuid not null references auth.users on delete cascade,
  trainee_id   uuid not null references auth.users on delete cascade,
  status       text not null default 'pending'
               check (status in ('pending','approved','declined','revoked')),
  requested_at timestamptz not null default now(),
  decided_at   timestamptz,
  unique (coach_id, trainee_id),
  check (coach_id <> trainee_id)
);

alter table public.coach_links enable row level security;

create index if not exists coach_links_coach_idx   on public.coach_links (coach_id);
create index if not exists coach_links_trainee_idx on public.coach_links (trainee_id);

-- שני הצדדים רואים את הקישור
drop policy if exists "both sides read link" on public.coach_links;
create policy "both sides read link" on public.coach_links
  for select using (auth.uid() = coach_id or auth.uid() = trainee_id);

-- רק מאמן יוזם בקשה, ורק בשמו, ורק במצב ממתין
drop policy if exists "coach requests link" on public.coach_links;
create policy "coach requests link" on public.coach_links
  for insert with check (
    auth.uid() = coach_id
    and status = 'pending'
    and exists (select 1 from public.profiles p
                where p.user_id = auth.uid() and p.role = 'coach')
  );

-- המתאמן מאשר, דוחה או מבטל; המאמן יכול לבטל בקשה שלו
drop policy if exists "either side updates link" on public.coach_links;
create policy "either side updates link" on public.coach_links
  for update using (auth.uid() = trainee_id or auth.uid() = coach_id)
             with check (auth.uid() = trainee_id or auth.uid() = coach_id);

drop policy if exists "either side deletes link" on public.coach_links;
create policy "either side deletes link" on public.coach_links
  for delete using (auth.uid() = trainee_id or auth.uid() = coach_id);

-- ============================================================
-- 4. גישת מאמן לנתוני המתאמן — רק אחרי אישור מפורש
-- ============================================================
-- מדיניות קריאה נוספת על app_data. מדיניות RLS מצטברות ב-OR,
-- אז זה מוסיף הרשאת קריאה בלבד: המאמן לעולם לא כותב אצל המתאמן.
-- ברגע שהמתאמן משנה את הסטטוס ל-revoked, הגישה נסגרת מיידית.
drop policy if exists "approved coach reads trainee" on public.app_data;
create policy "approved coach reads trainee" on public.app_data
  for select using (
    exists (select 1 from public.coach_links l
            where l.trainee_id = public.app_data.user_id
              and l.coach_id   = auth.uid()
              and l.status     = 'approved')
  );

-- ============================================================
-- 5. הודעות בין מאמן למתאמן
-- ============================================================
create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  link_id    uuid not null references public.coach_links(id) on delete cascade,
  sender_id  uuid not null references auth.users on delete cascade,
  body       text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

create index if not exists messages_link_idx on public.messages (link_id, created_at);

alter table public.messages enable row level security;

-- קריאה: רק שני הצדדים של אותו קישור. נשמרת גם אחרי ביטול גישה,
-- כדי שהיסטוריית שיחה לא תיעלם בלי שאיש ביקש.
drop policy if exists "link members read messages" on public.messages;
create policy "link members read messages" on public.messages
  for select using (
    exists (select 1 from public.coach_links l
            where l.id = public.messages.link_id
              and (l.coach_id = auth.uid() or l.trainee_id = auth.uid()))
  );

-- כתיבה: רק בשמך, ורק כל עוד הקישור מאושר.
drop policy if exists "link members send messages" on public.messages;
create policy "link members send messages" on public.messages
  for insert with check (
    sender_id = auth.uid()
    and exists (select 1 from public.coach_links l
                where l.id = public.messages.link_id
                  and l.status = 'approved'
                  and (l.coach_id = auth.uid() or l.trainee_id = auth.uid()))
  );
