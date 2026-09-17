import { WHATSAPP_NUMBER } from "../lib/config";

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <span>O'Kneil Store — products fulfilled through Tendo</span>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>WhatsApp</a>
      </div>
    </footer>
  );
}
