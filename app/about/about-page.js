export const metadata = {
  title: "About",
  description: "O'Kneil Store sources products through Tendo and sells them online — real stock, fair pricing, no inventory markup games."
};

export default function AboutPage() {
  return (
    <div className="about">
      <h1>About</h1>
      <p>We're O'Kneil Store. We source products through Tendo and sell them here and on social media. Everything is real stock from Tendo's catalog — we're not manufacturing or holding inventory ourselves, which is why the pricing stays fair.</p>
      <p>If something looks good, message us before you buy — we can tell you sizing, delivery time, or anything else Tendo's listing doesn't cover.</p>
      <p>Here's exactly how ordering works: you browse products here, then either message us on WhatsApp to place an order, or go straight to a product's Tendo link to order it yourself. Either way, your order, payment, and delivery are all handled directly by Tendo — not by us. We're simply showing you what's available and helping you find it.</p>
      <p>Delivery time depends on the product and your location — Tendo will confirm an estimate once your order is placed.</p>
      <p>If anything goes wrong with an order — a delay, a damaged item, a delivery issue — that's handled directly through Tendo, since they're the ones processing the payment and delivery. Message us if you're ever unsure who to contact, and we'll point you the right way.</p>
    </div>
  );
}
