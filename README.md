# O'Kneil Store — real backend version

A proper web app: Next.js (React) + Supabase (database, photo storage, and login), deployable to Vercel. This replaces the earlier Claude-hosted version — no dependency on claude.ai at all.

Do these steps in order. All of it is free to start.

---

## 1. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up (free).
2. Click **New project**. Pick a name (e.g. "okneil-store"), set a database password (save it somewhere), pick the region closest to you, and create it. Takes about a minute to spin up.

## 2. Set up the database table

1. In your new Supabase project, click **SQL Editor** in the left sidebar → **New query**.
2. Open `supabase/schema.sql` from this folder, copy all of it, paste it into the SQL editor, and click **Run**.
3. This creates a `products` table with the right security rules: anyone can view products, but only a logged-in user (you) can add/edit/delete them.

## 3. Set up photo storage

Follow the steps in `supabase/storage-setup.md` in this folder — it's five clicks in the Supabase dashboard to create the `product-photos` bucket.

## 4. Create your admin login

1. In Supabase, go to **Authentication → Users**.
2. Click **Add user → Create new user**.
3. Enter the email and password you want to log in with. Confirm the email automatically (toggle "Auto Confirm User" if shown).
4. That's your one and only admin account — there's no public sign-up page in this app, on purpose, so no one else can create themselves an admin login.

## 5. Get your API keys

1. In Supabase, go to **Project Settings → API**.
2. Copy the **Project URL** and the **anon public** key (not the service_role one).

## 6. Set your WhatsApp number

Open `lib/config.js` and replace the placeholder with your real WhatsApp number (digits only, country code first, no `+` or spaces — e.g. `233241234567`).

## 7. Run it locally (optional, to test before deploying)

```bash
npm install
cp .env.local.example .env.local
```

Open `.env.local` and paste in your real Supabase URL and anon key from step 5. Then:

```bash
npm run dev
```

Visit `http://localhost:3000`. Try logging in at `/admin/login` with the account you made in step 4.

## 8. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/okneil-store.git
git push -u origin main
```

## 9. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com), sign in, click **Add New → Project**.
2. Import the GitHub repo you just pushed.
3. Before deploying, open **Environment Variables** and add:
   - `NEXT_PUBLIC_SUPABASE_URL` → your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → your Supabase anon key
4. Click **Deploy**.

You'll get a live `https://your-project.vercel.app` address within a minute or two — a real website, working backend, findable by anyone with the link, no claude.ai involved at all.

## 10. Later: connecting your own domain

When you're ready to buy a domain, go to your Vercel project → **Settings → Domains**, add the domain, and Vercel will show you exactly which DNS records to add at wherever you bought it. Takes effect within a few hours usually. We can do this together when you're ready — no rebuild needed, just a DNS change.

## 11. Getting found on Google

Buying a domain and deploying doesn't automatically make you show up in Google search — that takes a bit of time and a couple of extra steps once you're live (submitting your site to Google Search Console, having real content indexed). Worth doing once you're confident in the site and ready to publish — ask and we'll go through it.

---

## What's different from the claude.ai version

- Products live in a real Postgres database (Supabase), not embedded in the page's code
- Photos are uploaded to real cloud storage, not baked into the HTML
- Admin login is real email + password (Supabase Auth), not tied to being logged into claude.ai
- This runs anywhere — Vercel, or any other Next.js-compatible host — with zero dependency on Claude's hosting

## Project structure

```
app/                  Pages (Home, Shop, Product, About, Contact, Admin)
components/           Shared UI (Header, Footer, ProductCard, ProductForm)
lib/                  Supabase client, WhatsApp number config, category list
supabase/             Database schema + storage setup instructions
```
