import { WHATSAPP_NUMBER } from "../lib/config";

export default function FloatingWhatsApp() {
  return (
    <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="float-wa">
      Message on WhatsApp
    </a>
  );
}
