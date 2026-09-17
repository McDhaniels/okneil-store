import { WHATSAPP_NUMBER } from "../../lib/config";

export default function ContactPage() {
  return (
    <div className="contact">
      <h1>Contact</h1>
      <p>WhatsApp is the fastest way to reach us. Send a message with the product name or a screenshot of what you want.</p>
      <div className="hero-actions" style={{ marginTop: 16 }}>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="btn btn-primary">Message on WhatsApp</a>
        <a href="#" className="btn btn-outline">Instagram</a>
      </div>
    </div>
  );
}
