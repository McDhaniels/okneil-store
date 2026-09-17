-- Run this once in your Supabase project's SQL Editor (Supabase Dashboard > SQL Editor > New query)

create extension if not exists "pgcrypto";

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price text not null,
  category text not null,
  color text not null default '#E85D04',
  description text default '',
  image_url text,
  created_at timestamptz default now()
);

alter table products enable row level security;

-- Anyone (including customers who aren't logged in) can view products
create policy "Public can view products"
  on products for select
  using (true);

-- Only logged-in users (you) can add, edit, or delete products
create policy "Authenticated users can insert products"
  on products for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update products"
  on products for update
  to authenticated
  using (true);

create policy "Authenticated users can delete products"
  on products for delete
  to authenticated
  using (true);

-- Added later: a real Tendo product link per product
alter table products add column if not exists tendo_url text;
