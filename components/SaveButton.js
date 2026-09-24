"use client";
import { useEffect, useState } from "react";
import { isSaved, toggleSaved } from "../lib/wishlist";

export default function SaveButton({ productId, variant = "overlay" }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isSaved(productId));
  }, [productId]);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const next = toggleSaved(productId);
    setSaved(next.includes(productId));
  }

  const heart = (
    <svg width={variant === "overlay" ? 18 : 20} height={variant === "overlay" ? 18 : 20} viewBox="0 0 24 24" fill={saved ? "#E85D04" : "none"}>
      <path d="M12 21s-7-4.35-9.5-8.5C.7 9 2.4 5.5 6 5.5c2 0 3.4 1.1 6 3.7 2.6-2.6 4-3.7 6-3.7 3.6 0 5.3 3.5 3.5 7C19 16.65 12 21 12 21Z"
        stroke={saved ? "#E85D04" : "currentColor"} strokeWidth="1.6" />
    </svg>
  );

  if (variant === "overlay") {
    return (
      <button
        onClick={handleClick}
        aria-label={saved ? "Remove from saved" : "Save for later"}
        style={{
          position: "absolute", top: 8, right: 8, zIndex: 2,
          background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%",
          width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer"
        }}
      >
        {heart}
      </button>
    );
  }

  return (
    <button onClick={handleClick} className="btn btn-outline" style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
      {heart} {saved ? "Saved" : "Save for later"}
    </button>
  );
}
