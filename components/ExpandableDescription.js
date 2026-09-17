"use client";
import { useState } from "react";

export default function ExpandableDescription({ text }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 220;

  return (
    <div>
      <p
        className="product-desc"
        style={!expanded && isLong ? {
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          marginBottom: 8
        } : { marginBottom: 8 }}
      >
        {text}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "none", border: "none", padding: 0, cursor: "pointer",
            color: "var(--accent)", fontWeight: 600, fontSize: "0.9rem", marginBottom: 20
          }}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
