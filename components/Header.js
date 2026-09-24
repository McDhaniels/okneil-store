"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { getWishlistIds } from "../lib/wishlist";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(prev => {
        if (window.scrollY > 40) return true;
        if (window.scrollY < 10) return false;
        return prev; // stay in current state inside the buffer zone, avoids flicker
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setIsLoggedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const updateCount = () => setWishlistCount(getWishlistIds().length);
    updateCount();
    window.addEventListener("wishlist-updated", updateCount);
    return () => window.removeEventListener("wishlist-updated", updateCount);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="header-inner">
        <Link className="logo" href="/">O'Kneil <span>Store</span></Link>
        <button className="nav-toggle" aria-label="Menu" onClick={() => setNavOpen(!navOpen)}>&#9776;</button>
        <nav className={navOpen ? "open" : ""}>
          {links.map(l => (
            <Link key={l.href} href={l.href} className={pathname === l.href ? "active" : ""} onClick={() => setNavOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/wishlist" onClick={() => setNavOpen(false)} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            Saved
            {wishlistCount > 0 && (
              <span style={{
                background: "var(--accent)", color: "#fff", borderRadius: "50%",
                width: 18, height: 18, fontSize: "0.72rem", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href={isLoggedIn ? "/admin" : "/admin/login"} className="admin-btn" onClick={() => setNavOpen(false)}>
            {isLoggedIn ? "Manage products" : "Admin"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
