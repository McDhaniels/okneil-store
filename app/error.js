"use client";

export default function Error({ error, reset }) {
  return (
    <div className="wrap" style={{ padding: "80px 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: "1.6rem", marginBottom: 12 }}>Something went wrong</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 24 }}>
        Sorry about that — it's not you, something broke on our end. Try again, or message us on WhatsApp if it keeps happening.
      </p>
      <button onClick={() => reset()} className="btn btn-primary" style={{ border: "none" }}>
        Try again
      </button>
    </div>
  );
}
