"use client";
import { track } from "@vercel/analytics";

// A plain <a> that fires a Vercel Analytics event on click, before navigating away.
// Used for every WhatsApp / Tendo button so we can actually see what people want.
export default function TrackedLink({ href, eventName, eventData, children, className, target, rel }) {
  function handleClick() {
    track(eventName, eventData || {});
  }
  return (
    <a href={href} className={className} target={target} rel={rel} onClick={handleClick}>
      {children}
    </a>
  );
}
