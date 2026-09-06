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

-- העדכון מפוצל לשניים בכוונה. מדיניות אחת לשני הצדדים אפשרה למאמן
-- לשלוח PATCH ולהעביר את עצמו ל-approved בלי אישור — כלומר לעקוף את
-- כל מודל ההסכמה. ההחלטה שייכת למתאמן בלבד.
drop policy if exists "either side updates link" on public.coach_links;

drop policy if exists "trainee decides link" on public.coach_links;
create policy "trainee decides link" on public.coach_links
  for update using      (auth.uid() = trainee_id)
             with check (auth.uid() = trainee_id);

-- המאמן יכול רק לבקש מחדש או להסיר את עצמו. approved אינו באפשרויות.
drop policy if exists "coach requests or cancels" on public.coach_links;
create policy "coach requests or cancels" on public.coach_links
  for update using      (auth.uid() = coach_id)
             with check (auth.uid() = coach_id and status in ('pending','revoked'));

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

-- ============================================================
-- 6. תמונות בצ׳אט
-- ============================================================
alter table public.messages add column if not exists image_path text;

-- הודעה חייבת להכיל טקסט או תמונה, ולא בהכרח את שניהם
alter table public.messages drop constraint if exists messages_body_check;
alter table public.messages drop constraint if exists messages_content_check;
alter table public.messages alter column body set default '';
alter table public.messages add constraint messages_content_check check (
  char_length(body) <= 2000
  and (char_length(body) > 0 or image_path is not null)
);

-- דלי פרטי לתמונות. הנתיב הוא <link_id>/<קובץ>, וזה מה שמדיניות
-- האחסון נשענת עליו כדי לדעת מי רשאי לגעת בו.
insert into storage.buckets (id, name, public)
values ('chat', 'chat', false)
on conflict (id) do nothing;

drop policy if exists "link members upload chat images" on storage.objects;
create policy "link members upload chat images" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'chat'
    and exists (select 1 from public.coach_links l
                where l.id::text = (storage.foldername(name))[1]
                  and l.status = 'approved'
                  and (l.coach_id = auth.uid() or l.trainee_id = auth.uid()))
  );

drop policy if exists "link members read chat images" on storage.objects;
create policy "link members read chat images" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'chat'
    and exists (select 1 from public.coach_links l
                where l.id::text = (storage.foldername(name))[1]
                  and (l.coach_id = auth.uid() or l.trainee_id = auth.uid()))
  );

-- ============================================================
-- 7. תוכניות אימון
-- ============================================================
-- תוכנית אחת לכל קישור. plan הוא jsonb במבנה:
--   {"sun":[{"n":"סקוואט","s":4,"r":"8-10","note":"..."}], "mon":[...], ...}
create table if not exists public.workout_plans (
  link_id    uuid primary key references public.coach_links(id) on delete cascade,
  coach_id   uuid not null references auth.users on delete cascade,
  trainee_id uuid not null references auth.users on delete cascade,
  plan       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.workout_plans enable row level security;

drop policy if exists "link members read plan" on public.workout_plans;
create policy "link members read plan" on public.workout_plans
  for select using (auth.uid() = coach_id or auth.uid() = trainee_id);

-- הכתיבה שייכת למאמן בלבד, ורק כל עוד הקישור מאושר.
drop policy if exists "coach writes plan" on public.workout_plans;
create policy "coach writes plan" on public.workout_plans
  for insert with check (
    auth.uid() = coach_id
    and exists (select 1 from public.coach_links l
                where l.id = link_id and l.status = 'approved'
                  and l.coach_id = auth.uid() and l.trainee_id = workout_plans.trainee_id)
  );

drop policy if exists "coach updates plan" on public.workout_plans;
create policy "coach updates plan" on public.workout_plans
  for update using      (auth.uid() = coach_id)
             with check (auth.uid() = coach_id);

-- ============================================================
-- 8. ביצוע אימונים
-- ============================================================
-- שורה ליום. done הוא מערך שמות התרגילים שסומנו.
create table if not exists public.workout_logs (
  id         uuid primary key default gen_random_uuid(),
  link_id    uuid not null references public.coach_links(id) on delete cascade,
  trainee_id uuid not null references auth.users on delete cascade,
  log_date   date not null,
  done       jsonb not null default '[]'::jsonb,
  completed  boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (link_id, log_date)
);

create index if not exists workout_logs_link_idx on public.workout_logs (link_id, log_date desc);

alter table public.workout_logs enable row level security;

-- שני הצדדים קוראים; זו כל מטרת המעקב.
drop policy if exists "link members read logs" on public.workout_logs;
create policy "link members read logs" on public.workout_logs
  for select using (
    exists (select 1 from public.coach_links l
            where l.id = link_id and (l.coach_id = auth.uid() or l.trainee_id = auth.uid()))
  );

-- הסימון שייך למתאמן בלבד. מאמן לא יכול לסמן במקומו שאימון בוצע.
drop policy if exists "trainee writes logs" on public.workout_logs;
create policy "trainee writes logs" on public.workout_logs
  for insert with check (auth.uid() = trainee_id);

drop policy if exists "trainee updates logs" on public.workout_logs;
create policy "trainee updates logs" on public.workout_logs
  for update using (auth.uid() = trainee_id) with check (auth.uid() = trainee_id);
