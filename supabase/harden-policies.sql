-- Run this once in Supabase's SQL Editor to replace the old "any authenticated user"
-- policies with ones scoped to your specific admin account only.

-- Step 1: find your UID first — Supabase dashboard → Authentication → Users →
-- click your user → copy the UID. Paste it in place of YOUR-ADMIN-UID below (keep the quotes).

drop policy if exists "Authenticated users can insert products" on products;
drop policy if exists "Authenticated users can update products" on products;
drop policy if exists "Authenticated users can delete products" on products;

create policy "Only the admin can insert products" on products for insert to authenticated with check (auth.uid() = 'YOUR-ADMIN-UID');
create policy "Only the admin can update products" on products for update to authenticated using (auth.uid() = 'YOUR-ADMIN-UID');
create policy "Only the admin can delete products" on products for delete to authenticated using (auth.uid() = 'YOUR-ADMIN-UID');

-- Same tightening for photo storage.
drop policy if exists "Authenticated can upload product photos" on storage.objects;
drop policy if exists "Authenticated can update product photos" on storage.objects;
drop policy if exists "Authenticated can delete product photos" on storage.objects;

create policy "Only the admin can upload product photos" on storage.objects for insert to authenticated with check (bucket_id = 'product-photos' and auth.uid() = 'YOUR-ADMIN-UID');
create policy "Only the admin can update product photos" on storage.objects for update to authenticated using (bucket_id = 'product-photos' and auth.uid() = 'YOUR-ADMIN-UID');
create policy "Only the admin can delete product photos" on storage.objects for delete to authenticated using (bucket_id = 'product-photos' and auth.uid() = 'YOUR-ADMIN-UID');
