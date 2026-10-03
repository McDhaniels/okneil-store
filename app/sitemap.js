import { supabase } from "../lib/supabaseClient";
import { SITE_URL } from "../lib/config";

export default async function sitemap() {
  const base = SITE_URL || "https://example.com"; // replace once SITE_URL is set in lib/config.js

  const staticPages = ["", "/shop", "/about", "/contact"].map(path => ({
    url: `${base}${path}`,
    lastModified: new Date()
  }));

  const { data: products } = await supabase.from("products").select("id, created_at");

  const productPages = (products || []).map(p => ({
    url: `${base}/product/${p.id}`,
    lastModified: p.created_at ? new Date(p.created_at) : new Date()
  }));

  return [...staticPages, ...productPages];
}
