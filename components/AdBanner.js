import { AD_BANNER } from "../lib/config";

export default function AdBanner() {
  if (!AD_BANNER.enabled) return null;

  const content = AD_BANNER.imageUrl ? (
    <img src={AD_BANNER.imageUrl} alt={AD_BANNER.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  ) : (
    <div style={{
      width: "100%", padding: "22px 20px", textAlign: "center",
      border: "1.5px dashed var(--line)", borderRadius: 6, color: "var(--ink-soft)"
    }}>
      <div style={{ fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>Advertise here</div>
      <div style={{ fontSize: "0.9rem" }}>Get your shop, product, or service in front of our customers. Message us to book this space.</div>
    </div>
  );

  return (
    <div className="wrap" style={{ padding: "0 24px 44px" }}>
      {AD_BANNER.link ? (
        <a href={AD_BANNER.link} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
