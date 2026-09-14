-- Run this migration in the Supabase SQL editor (or through the Supabase CLI).
-- It creates the race-safe view counter displayed in Admin > Products.

alter table public.products
  add column if not exists views bigint not null default 0;

create or replace function public.increment_views(row_id uuid)
returns void
language sql
security invoker
set search_path = public
as $$
  update public.products
  set views = coalesce(views, 0) + 1
  where id = row_id;
$$;

grant execute on function public.increment_views(uuid) to anon, authenticated;
