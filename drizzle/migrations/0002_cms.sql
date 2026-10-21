do $$ begin
  if not exists (select 1 from pg_type where typname='app_role' and typnamespace='public'::regnamespace) then
    create type public.app_role as enum ('admin');
  end if;
end $$;
alter type public.app_role add value if not exists 'admin';