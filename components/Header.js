"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
          <Link href={isLoggedIn ? "/admin" : "/admin/login"} className="admin-btn" onClick={() => setNavOpen(false)}>
            {isLoggedIn ? "Manage products" : "Admin"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
