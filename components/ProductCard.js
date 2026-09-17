import Link from "next/link";
import { categoryMeta } from "../lib/categories";

export default function ProductCard({ product }) {
  const cat = categoryMeta(product.category);
  return (
    <Link href={`/product/${product.id}`} className="card" style={{ "--cat-color": cat.color }}>
      <div className="card-media" style={{ "--tile-bg": cat.tile }}>
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="16" height="16" rx="2" stroke={cat.color} strokeWidth="1.4" />
            <path d="M8 14l2.5-3 2 2.2L15 10l3 5H6l2-1Z" fill={cat.color} opacity="0.85" />
          </svg>
        )}
      </div>
      <div className="card-body">
        <span className="card-cat">{cat.label}</span>
        <span className="card-name">{product.name}</span>
        <span className="card-price">{product.price}</span>
      </div>
    </Link>
  );
}
