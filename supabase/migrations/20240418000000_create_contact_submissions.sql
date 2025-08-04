create table if not exists public.contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.contact_submissions enable row level security;

-- Create policy to allow insert for authenticated users
create policy "Allow insert for authenticated users"
  on public.contact_submissions
  for insert
  to authenticated
  with check (true);

-- Create policy to allow select for authenticated users
create policy "Allow select for authenticated users"
  on public.contact_submissions
  for select
  to authenticated
  using (true); 