create type public.app_role as enum ('admin');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create table public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;
alter table public.site_content enable row level security;
create policy "public read" on public.site_content for select to anon, authenticated using (true);
create policy "admin write" on public.site_content for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  company text check (char_length(company) <= 120),
  phone text not null check (char_length(phone) between 3 and 40),
  email text check (char_length(email) <= 200),
  location text not null check (char_length(location) <= 200),
  service text not null check (char_length(service) <= 120),
  property_type text check (char_length(property_type) <= 80),
  details text not null check (char_length(details) between 1 and 3000),
  status text not null default 'new',
  created_at timestamptz not null default now()
);
grant insert on public.quote_requests to anon, authenticated;
grant select, update, delete on public.quote_requests to authenticated;
grant all on public.quote_requests to service_role;
alter table public.quote_requests enable row level security;
create policy "anyone submit" on public.quote_requests for insert to anon, authenticated with check (status = 'new');
create policy "admin read" on public.quote_requests for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin update" on public.quote_requests for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin delete" on public.quote_requests for delete to authenticated using (public.has_role(auth.uid(),'admin'));