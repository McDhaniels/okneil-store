"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { supabase } from "../../lib/supabaseClient";
import { getWishlistIds, toggleSaved } from "../../lib/wishlist";
import { categoryMeta } from "../../lib/categories";
import { WHATSAPP_NUMBER } from "../../lib/config";
import SaveButton from "../../components/SaveButton";

const WA_ITEM_CAP = 15; // keep the prefilled WhatsApp message (and its URL) from growing unbounded

export default function WishlistPage() {
  const [products, setProducts] = useState([]);
  const [missingCount, setMissingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  async function load() {
    const ids = getWishlistIds();
    if (ids.length === 0) {
      setProducts([]);
      setMissingCount(0);
      setLoadFailed(false);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.from("products").select("*").in("id", ids);
    if (error) {
      setLoadFailed(true);
      setLoading(false);
      return;
    }
    const found = data || [];
    const foundIds = new Set(found.map(p => p.id));
    const missing = ids.filter(id => !foundIds.has(id));

    // Quietly clean up saved IDs that no longer exist (deleted products), so we don't
    // keep asking about them forever.
    missing.forEach(id => toggleSaved(id));

    setProducts(found);
    setMissingCount(missing.length);
    setLoading(false);
  }

  useEffect(() => {
    load();
    window.addEventListener("wishlist-updated", load);
    return () => window.removeEventListener("wishlist-updated", load);
  }, []);

  const cappedProducts = products.slice(0, WA_ITEM_CAP);
  const overflowCount = products.length - cappedProducts.length;

  const waText = encodeURIComponent(
    products.length > 0
      ? `Hi, I'd like to order:\n${cappedProducts.map(p => `- ${p.name} (GH₵ ${p.price})`).join("\n")}` +
        (overflowCount > 0 ? `\n...and ${overflowCount} more item${overflowCount > 1 ? "s" : ""} from my saved list` : "")
      : ""
  );

  return (
    <div className="wrap" style={{ padding: "44px 24px 68px" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: 10 }}>Saved items</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 10 }}>
        Things you've saved to think over. Nothing here is reserved for you — message us when you're ready.
      </p>
      {missingCount > 0 && (
        <p style={{ color: "var(--ink-soft)", fontSize: "0.88rem", marginBottom: 18 }}>
          {missingCount} saved item{missingCount > 1 ? "s are" : " is"} no longer available and {missingCount > 1 ? "were" : "was"} removed from this list.
        </p>
      )}

      {loading ? (
        <p style={{ color: "var(--ink-soft)" }}>Loading…</p>
      ) : loadFailed ? (
        <p style={{ color: "var(--ink-soft)" }}>Couldn't load your saved items right now — try refreshing the page.</p>
      ) : products.length === 0 ? (
        <p style={{ color: "var(--ink-soft)" }}>
          Nothing saved yet. <Link href="/shop" style={{ color: "var(--accent)", fontWeight: 600 }}>Browse the shop</Link> and tap the heart on anything you like.
        </p>
      ) : (
        <>
          <div style={{ marginBottom: 28 }}>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
              className="btn btn-wa"
              onClick={() => track("whatsapp_click", { source: "wishlist_bulk", itemCount: products.length })}
            >
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
