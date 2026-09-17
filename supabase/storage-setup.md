# Setting up photo storage in Supabase

1. In your Supabase project, go to **Storage** in the left sidebar.
2. Click **New bucket**.
3. Name it exactly: `product-photos`
4. Toggle **Public bucket** to ON (so customers can see product photos without logging in).
5. Click **Create bucket**.

That's it — no extra policy setup needed, since the app uploads photos using your logged-in admin session, and public buckets allow anyone to *view* files (but only logged-in users can upload/delete, which the app handles).
