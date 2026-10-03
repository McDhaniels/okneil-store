import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { Analytics } from "@vercel/analytics/react";
import { SITE_URL } from "../lib/config";

export const metadata = {
  ...(SITE_URL ? { metadataBase: new URL(SITE_URL) } : {}),
  title: {
    default: "O'Kneil Store",
    template: "%s | O'Kneil Store"
  },
  description: "Fashion, beauty, electronics, and everyday essentials. Message us on WhatsApp or buy directly through Tendo.",
  openGraph: {
    siteName: "O'Kneil Store",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  );
}
