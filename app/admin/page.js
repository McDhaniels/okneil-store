"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { categoryMeta } from "../../lib/categories";

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/admin/login");
      } else {
        setChecking(false);
        loadProducts();
      }
    });
  }, []);

  async function loadProducts() {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
  }

  async function handleDelete(id, imageUrl) {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    if (imageUrl) {
      const path = imageUrl.split("/product-photos/")[1];
      if (path) await supabase.storage.from("product-photos").remove([path]);
    }
    loadProducts();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (checking) return <div className="admin-page"><p>Checking login…</p></div>;

  return (
    <div className="admin-page">
      <h1>Manage products</h1>
      <p className="note">Add, edit, or remove products — changes are live for every visitor immediately.</p>
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        <Link href="/admin/new" className="btn btn-primary" style={{ border: "none" }}>Add product</Link>
        <button onClick={handleLogout} className="btn btn-outline">Log out</button>
      </div>
      <div className="admin-list">
        {products.length === 0 && <p style={{ color: "var(--ink-soft)" }}>No products yet.</p>}
        {products.map(p => {
          const cat = categoryMeta(p.category);
          return (
            <div className="admin-row" key={p.id}>
              {p.image_url ? (
                <img src={p.image_url} style={{ width: 32, height: 32, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />
              ) : (
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
              )}
              <span className="info"><b>{p.name}</b><span>{cat.label} · {p.price}</span></span>
              <span className="row-actions">
                <Link href={`/admin/edit/${p.id}`}>Edit</Link>
                <button onClick={() => handleDelete(p.id, p.image_url)}>Delete</button>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
