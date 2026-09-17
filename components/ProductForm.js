"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { CATEGORIES } from "../lib/categories";

export default function ProductForm({ existing }) {
  const router = useRouter();
  const [name, setName] = useState(existing?.name || "");
  const [price, setPrice] = useState(existing?.price ? existing.price.replace(/^[^\d]*/, "") : "");
  const [category, setCategory] = useState(existing?.category || CATEGORIES[0].value);
  const [color, setColor] = useState(existing?.color || CATEGORIES[0].color);
  const [description, setDescription] = useState(existing?.description || "");
  const [tendoUrl, setTendoUrl] = useState(existing?.tendo_url || "");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(existing?.image_url || null);
  const [saving, setSaving] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push("/admin/login");
      else setChecking(false);
    });
  }, []);

  function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function compressImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("read failed"));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error("image failed"));
        img.onload = () => {
          const maxDim = 800;
          let { width, height } = img;
          if (width > height && width > maxDim) { height = Math.round(height * maxDim / width); width = maxDim; }
          else if (height > maxDim) { width = Math.round(width * maxDim / height); height = maxDim; }
          const canvas = document.createElement("canvas");
          canvas.width = width; canvas.height = height;
          canvas.getContext("2d").drawImage(img, 0, 0, width, height);
          canvas.toBlob(blob => resolve(blob), "image/jpeg", 0.8);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    let image_url = existing?.image_url || null;

    if (file) {
      const compressed = await compressImage(file);
      const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from("product-photos")
        .upload(filePath, compressed, { contentType: "image/jpeg" });
      if (uploadError) {
        alert("Photo upload failed: " + uploadError.message);
        setSaving(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("product-photos").getPublicUrl(filePath);
      image_url = urlData.publicUrl;
    }

    const payload = { name, price, category, color, description, image_url, tendo_url: tendoUrl };

    let saveError = null;
    if (existing) {
      const { error } = await supabase.from("products").update(payload).eq("id", existing.id);
      saveError = error;
    } else {
      const { error } = await supabase.from("products").insert(payload);
      saveError = error;
    }

    if (saveError) {
      alert("Could not save product: " + saveError.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    router.push("/admin");
  }

  if (checking) return <p>Checking login…</p>;

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div>
        <label>Product name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Price</label>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontWeight: 600, color: "var(--ink-soft)" }}>GH₵</span>
          <input type="text" placeholder="100" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>
      </div>
      <div>
        <label>Category</label>
        <select value={category} onChange={e => {
          setCategory(e.target.value);
          const found = CATEGORIES.find(c => c.value === e.target.value);
          if (found) setColor(found.color);
        }}>
          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>
      <div>
        <label>Accent color</label>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ height: 40, padding: 4 }} />
      </div>
      <div className="full">
        <label>Description (shown on the product's own page)</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Copy this from the Tendo listing, then reword it a little in your own voice." />
      </div>
      <div className="full">
        <label>Tendo product link (for the "Buy on Tendo" button)</label>
        <input type="url" placeholder="https://tendo.app/product/..." value={tendoUrl} onChange={e => setTendoUrl(e.target.value)} />
      </div>
      <div className="full">
        <label>Photo</label>
        <input type="file" accept="image/*" onChange={handleFile} />
        {preview && (
          <div style={{ marginTop: 10 }}>
            <img src={preview} style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 4, border: "1px solid var(--line)" }} />
          </div>
        )}
      </div>
      <div className="admin-form-actions">
        <button type="submit" className="btn btn-primary" style={{ border: "none" }} disabled={saving}>
          {saving ? "Saving…" : "Save product"}
        </button>
      </div>
    </form>
  );
}
