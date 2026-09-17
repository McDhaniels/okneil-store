import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";
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
            {[0,1,2,3,4,5].map(i => <div className="hero-tile" key={i} />)}
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
    </>
  );
}
