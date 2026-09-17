import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import { categoryMeta } from "../../../lib/categories";
import { WHATSAPP_NUMBER } from "../../../lib/config";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function ProductPage({ params }) {
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!product) {
    return (
      <div className="wrap product-page">
        <Link href="/shop" className="back-link">&larr; Back to shop</Link>
        <p>That product is no longer available.</p>
      </div>
    );
  }

  const cat = categoryMeta(product.category);
  const waText = encodeURIComponent(`Hi, I want to order: ${product.name}`);

  return (
    <div className="wrap product-page">
      <Link href="/shop" className="back-link">&larr; Back to shop</Link>
      <div className="product-layout">
        <div className="product-media" style={{ background: cat.tile }}>
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <svg width="90" height="90" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="2" stroke={cat.color} strokeWidth="1.4" />
              <path d="M8 14l2.5-3 2 2.2L15 10l3 5H6l2-1Z" fill={cat.color} opacity="0.85" />
            </svg>
          )}
        </div>
        <div>
          <div className="product-cat" style={{ color: cat.color }}>{cat.label}</div>
          <h1 className="product-name">{product.name}</h1>
          <div className="product-price">{product.price}</div>
          <p className="product-desc">
            {product.description || "Message us on WhatsApp for full details on this one — sizing, delivery time, or anything else you need to know before ordering."}
          </p>
          <div className="product-actions">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`} className="btn btn-wa">Message on WhatsApp</a>
            <a href="#" className="btn btn-tendo">Buy on Tendo</a>
          </div>
        </div>
      </div>
    </div>
  );
}
