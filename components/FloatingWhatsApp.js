import { WHATSAPP_NUMBER, WHATSAPP_NUMBER_IS_PLACEHOLDER } from "../lib/config";

export default function FloatingWhatsApp() {
  if (WHATSAPP_NUMBER_IS_PLACEHOLDER) {
    // Fails loudly in development rather than silently shipping a dead button to customers.
    console.warn("WHATSAPP_NUMBER in lib/config.js is still the placeholder — update it with your real number.");
  }

  return (
    <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="float-wa">
      Message on WhatsApp
    </a>
  );
}
