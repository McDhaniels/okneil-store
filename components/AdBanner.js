"use client";
import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { AD_BANNER } from "../lib/config";

export default function AdBanner() {
  const seenRef = useRef(false);
  const bannerRef = useRef(null);
  const isRealAd = !!AD_BANNER.imageUrl;

  useEffect(() => {
    if (!AD_BANNER.enabled || !bannerRef.current) return;
    const el = bannerRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !seenRef.current) {
        seenRef.current = true;
        track("ad_banner_view", { type: isRealAd ? "sponsored" : "placeholder" });
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isRealAd]);

  if (!AD_BANNER.enabled) return null;

  function handleClick() {
    track("ad_banner_click", { type: isRealAd ? "sponsored" : "placeholder" });
  }

  const content = isRealAd ? (
    <div style={{ position: "relative" }}>
      <span style={{
        position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.55)", color: "#fff",
        fontSize: "0.7rem", fontWeight: 700, padding: "3px 8px", borderRadius: 3, letterSpacing: "0.03em"
      }}>
        SPONSORED
      </span>
      <img src={AD_BANNER.imageUrl} alt={AD_BANNER.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
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
    <div className="wrap" style={{ padding: "0 24px 44px" }} ref={bannerRef}>
      {AD_BANNER.link ? (
        <a href={AD_BANNER.link} target="_blank" rel="noopener noreferrer" style={{ display: "block" }} onClick={handleClick}>
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
