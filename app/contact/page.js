import { WHATSAPP_NUMBER, SOCIALS } from "../../lib/config";
import TrackedLink from "../../components/TrackedLink";

export const metadata = {
  title: "Contact",
  description: "Message O'Kneil Store on WhatsApp to ask about a product or place an order."
};

export default function ContactPage() {
  return (
    <div className="contact">
      <h1>Contact</h1>
      <p>WhatsApp is the fastest way to reach us. Send a message with the product name or a screenshot of what you want.</p>
      <div className="hero-actions" style={{ marginTop: 16 }}>
        <TrackedLink href={`https://wa.me/${WHATSAPP_NUMBER}`} eventName="whatsapp_click" eventData={{ source: "contact_page" }} className="btn btn-primary">Message on WhatsApp</TrackedLink>
        {SOCIALS.instagram && (
          <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Instagram</a>
        )}
      </div>
    </div>
  );
}
