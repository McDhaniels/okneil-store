import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";
import AdBanner from "../components/AdBanner";
import { WHATSAPP_NUMBER } from "../lib/config";

export const revalidate = 0;

export default async function HomePage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div>
            <h1>Everything you need.</h1>
            <p>Fashion, beauty, electronics, and everyday essentials. Browse what's here, then message us on WhatsApp to order, or buy straight from Tendo if you'd rather skip the chat.</p>
            <div className="hero-actions">
              <Link href="/shop" className="btn btn-primary">Browse products</Link>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="btn btn-outline-dark">Message on WhatsApp</a>
            </div>
          </div>
          <div className="hero-grid" aria-hidden="true">
            <div className="hero-tile"><svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M6 4h12l1 4H5l1-4Z" stroke="#E85D04" strokeWidth="1.6" strokeLinejoin="round"/><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" stroke="#E85D04" strokeWidth="1.6"/></svg></div>
            <div className="hero-tile"><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="#F2B705" strokeWidth="1.6"/><path d="M12 3v3M12 18v3M21 12h-3M6 12H3" stroke="#F2B705" strokeWidth="1.6"/></svg></div>
            <div className="hero-tile"><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" stroke="#8FA6D9" strokeWidth="1.6"/><path d="M9 6h6" stroke="#8FA6D9" strokeWidth="1.6"/></svg></div>
            <div className="hero-tile"><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="13" rx="1.5" stroke="#137A4C" strokeWidth="1.6"/><path d="M8 21h8" stroke="#137A4C" strokeWidth="1.6"/></svg></div>
            <div className="hero-tile"><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.35-9.5-8.5C.7 9 2.4 5.5 6 5.5c2 0 3.4 1.1 6 3.7 2.6-2.6 4-3.7 6-3.7 3.6 0 5.3 3.5 3.5 7C19 16.65 12 21 12 21Z" stroke="#E88A8A" strokeWidth="1.5"/></svg></div>
            <div className="hero-tile"><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 19V9l8-5 8 5v10" stroke="#B79CE0" strokeWidth="1.6"/><path d="M9 19v-6h6v6" stroke="#B79CE0" strokeWidth="1.6"/></svg></div>
          </div>
        </div>
      </section>

      <section className="how wrap">
        <h2>How buying works</h2>
        <div className="how-steps">
          <div className="how-step"><h3>Find something you like</h3><p>Browse the shop and filter by category if you already know what you want.</p></div>
          <div className="how-step"><h3>Message us or go straight to Tendo</h3><p>Send a WhatsApp message to ask questions or agree a price, or use the Tendo button to order it yourself.</p></div>
          <div className="how-step"><h3>Tendo delivers, you pay Tendo</h3><p>Payment and delivery are handled by Tendo, not us directly. That's who you pay and who brings it to you.</p></div>
        </div>
      </section>

      <section className="home-shop-teaser wrap">
        <div className="section-head">
          <h2>What's in stock</h2>
          <Link href="/shop" className="btn btn-outline">See everything</Link>
        </div>
        <div className="grid">
          {(products || []).map(p => <ProductCard product={p} key={p.id} />)}
        </div>
      </section>

      <AdBanner />
    </>
  );
}
