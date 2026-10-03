import { SITE_URL } from "../lib/config";

export default function robots() {
  const base = SITE_URL || "https://example.com"; // replace once SITE_URL is set in lib/config.js

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/wishlist"]
      }
    ],
    sitemap: `${base}/sitemap.xml`
  };
}
