"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { CATEGORIES } from "../../lib/categories";
import ProductCard from "../../components/ProductCard";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        setProducts(data || []);
        setLoadFailed(!!error);
        setLoading(false);
      });
  }, []);

  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

  return (
    <>
      <div className="shop-hero">
        <h1>Shop</h1>
        <p>Everything currently available. Filter by category, then message us on WhatsApp or buy directly through Tendo.</p>
      </div>
      <div className="wrap shop-body">
        <div className="pills">
          <button className={filter === "all" ? "pill active" : "pill"} onClick={() => setFilter("all")}>All</button>
          {CATEGORIES.map(c => (
            <button key={c.value} className={filter === c.value ? "pill active" : "pill"} onClick={() => setFilter(c.value)}>
              {c.label}
            </button>
          ))}
        </div>
        {loading ? (
          <p style={{ color: "var(--ink-soft)" }}>Loading products…</p>
        ) : loadFailed ? (
          <p style={{ color: "var(--ink-soft)" }}>Couldn't load products right now — try refreshing the page.</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: "var(--ink-soft)" }}>No products in this category yet.</p>
        ) : (
          <div className="grid">
            {filtered.map(p => <ProductCard product={p} key={p.id} />)}
          </div>
        )}
      </div>
    </>
  );
}
