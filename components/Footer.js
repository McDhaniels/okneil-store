import { WHATSAPP_NUMBER, SOCIALS } from "../lib/config";

const LABELS = {
  instagram: "Instagram",
  tiktok: "TikTok",
  twitter: "Twitter/X",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  snapchat: "Snapchat"
};

export default function Footer() {
  const activeSocials = Object.entries(SOCIALS).filter(([, url]) => url);

  return (
    <footer>
      <div className="wrap footer-inner">
        <span>O'Kneil Store — products fulfilled through Tendo</span>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>WhatsApp</a>
          {activeSocials.map(([key, url]) => (
            <a href={url} key={key} target="_blank" rel="noopener noreferrer">{LABELS[key]}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
