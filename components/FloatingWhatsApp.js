import { WHATSAPP_NUMBER, WHATSAPP_NUMBER_IS_PLACEHOLDER } from "../lib/config";
import TrackedLink from "./TrackedLink";

export default function FloatingWhatsApp() {
  if (WHATSAPP_NUMBER_IS_PLACEHOLDER) {
    console.warn("WHATSAPP_NUMBER in lib/config.js is still the placeholder — update it with your real number.");
  }

  return (
    <TrackedLink
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      eventName="whatsapp_click"
      eventData={{ source: "floating_button" }}
      className="float-wa"
    >
      Message on WhatsApp
    </TrackedLink>
  );
}
