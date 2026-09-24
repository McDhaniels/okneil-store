"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { getWishlistIds } from "../../lib/wishlist";
import { categoryMeta } from "../../lib/categories";
import { WHATSAPP_NUMBER } from "../../lib/config";
import SaveButton from "../../components/SaveButton";

export default function WishlistPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const ids = getWishlistIds();
    if (ids.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase.from("products").select("*").in("id", ids);
    setProducts(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    window.addEventListener("wishlist-updated", load);
    return () => window.removeEventListener("wishlist-updated", load);
  }, []);

  const waText = encodeURIComponent(
    products.length > 0
      ? `Hi, I'd like to order:\n${products.map(p => `- ${p.name} (GH₵ ${p.price})`).join("\n")}`
      : ""
  );

  return (
    <div className="wrap" style={{ padding: "44px 24px 68px" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: 10 }}>Saved items</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 28 }}>
        Things you've saved to think over. Nothing here is reserved for you — message us when you're ready.
      </p>

      {loading ? (
        <p style={{ color: "var(--ink-soft)" }}>Loading…</p>
      ) : products.length === 0 ? (
        <p style={{ color: "var(--ink-soft)" }}>
          Nothing saved yet. <Link href="/shop" style={{ color: "var(--accent)", fontWeight: 600 }}>Browse the shop</Link> and tap the heart on anything you like.
        </p>
      ) : (
        <>
          <div style={{ marginBottom: 28 }}>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`} className="btn btn-wa">
              Message us about all {products.length} item{products.length > 1 ? "s" : ""}
            </a>
          </div>
          <div className="admin-list" style={{ maxWidth: 640 }}>
            {products.map(p => {
              const cat = categoryMeta(p.category);
              return (
                <div className="admin-row" key={p.id}>
                  {p.image_url ? (
                    <img src={p.image_url} style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />
                  ) : (
                    <span style={{ width: 12, height: 12, borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
                  )}
                  <span className="info">
                    <Link href={`/product/${p.id}`}><b>{p.name}</b></Link>
                    <span>{cat.label} · GH₵ {p.price}</span>
                  </span>
                  <SaveButton productId={p.id} variant="button" />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
