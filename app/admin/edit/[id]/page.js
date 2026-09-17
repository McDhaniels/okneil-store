import { supabase } from "../../../../lib/supabaseClient";
import ProductForm from "../../../../components/ProductForm";

export const revalidate = 0;

export default async function EditProductPage({ params }) {
  const { data: product } = await supabase.from("products").select("*").eq("id", params.id).single();

  return (
    <div className="admin-page">
      <h1>Edit product</h1>
      {product ? <ProductForm existing={product} /> : <p>Product not found.</p>}
    </div>
  );
}
