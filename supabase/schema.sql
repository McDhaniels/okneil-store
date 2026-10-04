-- ============================================================
-- NEW-TABLE CHECKLIST — follow this for every future table:
-- 1. alter table X enable row level security;
-- 2. Write explicit select/insert/update/delete policies — never leave a table with RLS on but no policies (locks everyone out) or RLS off (locks no one out).
-- 3. grant usage/select/insert/update/delete to the right roles — RLS policies alone are not enough; Postgres also needs the base GRANT (a real gotcha we hit once already).
-- 4. Scope write policies to the specific admin user (auth.uid() = 'your-uid'), not just "authenticated" — if public signups are ever accidentally enabled, "authenticated" alone would let any stranger who signs up write to the table.
-- 5. Test it for real (see README "security testing" section) — don't assume the SQL did what you think.
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price text not null,
  category text not null,
  color text not null default '#E85D04',
  description text default '',
  image_url text,
  created_at timestamptz default now(),
  tendo_url text
);

alter table products enable row level security;

-- Anyone can view products — this is a public storefront.
create policy "Public can view products" on products for select using (true);

-- Only the one admin account can write. Replace 'YOUR-ADMIN-UID' with your real UID
-- (Supabase dashboard → Authentication → Users → click your user → copy the UID).
-- This is stricter than checking "authenticated" alone: even if public signups were
-- ever accidentally left on, a random stranger's account still couldn't write.
create policy "Only the admin can insert products" on products for insert to authenticated with check (auth.uid() = 'YOUR-ADMIN-UID');
create policy "Only the admin can update products" on products for update to authenticated using (auth.uid() = 'YOUR-ADMIN-UID');
create policy "Only the admin can delete products" on products for delete to authenticated using (auth.uid() = 'YOUR-ADMIN-UID');

grant usage on schema public to anon, authenticated;
grant select on products to anon, authenticated;
grant insert, update, delete on products to authenticated;
