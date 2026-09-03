-- מאזן — סכימת מסד הנתונים
-- הרץ את זה פעם אחת ב-Supabase: SQL Editor → New query → Run

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
