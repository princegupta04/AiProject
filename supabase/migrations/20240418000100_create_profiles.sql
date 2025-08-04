create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Allow users to select their own profile
create policy "Allow select own profile" on public.profiles
  for select to authenticated
  using (auth.uid() = id);

-- Allow admin to select all
create policy "Allow admin select all" on public.profiles
  for select to authenticated
  using (role = 'admin');

-- Allow users to update their own profile
create policy "Allow update own profile" on public.profiles
  for update to authenticated
  using (auth.uid() = id); 