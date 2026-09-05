"use client";

import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { useState, useEffect } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "ABOUT", path: "/about" },
    { name: "COLLECTIONS", path: "/collections" },
    { name: "PROCESS", path: "/process" }
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 py-8 flex justify-between items-center",
        scrolled ? "py-4 bg-luxury-paper/80 backdrop-blur-md border-b border-luxury-gold/20" : ""
      )}
    >
      {/* BULLETPROOF: Using <a> instead of <Link> for clean animation memory wiping */}
      <a href="/" data-cursor="HOME" className="font-serif text-3xl tracking-widest text-luxury-burgundy uppercase z-50">
        DB.
      </a>

      <nav className="flex space-x-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.path}
            data-cursor="CLICK"
            className={cn(
              "font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300 text-luxury-charcoal/70 hover:text-luxury-burgundy",
              pathname === link.path && "text-luxury-burgundy font-medium"
            )}
          >
            {link.name}
          </a>
        ))}
      </nav>
    </header>
  );
}