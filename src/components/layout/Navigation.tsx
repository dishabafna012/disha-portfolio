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
    // The header is now pointer-events-none so it doesn't block the screen, 
    // and pushed down slightly from the absolute top.
    <header className="fixed top-6 md:top-8 left-0 right-0 z-[100] px-6 md:px-12 flex justify-between items-start pointer-events-none">
      
      {/* LOGO - Floating on the Left */}
      <a 
        href="/" 
        data-cursor="HOME" 
        className={cn(
          "relative z-50 flex items-center pointer-events-auto transition-all duration-500",
          scrolled ? "opacity-80 scale-95" : "opacity-100 scale-100"
        )}
      >
        <img 
          src="/logo.png" 
          alt="Disha Bafna" 
          className="h-12 md:h-16 w-auto object-contain drop-shadow-lg" 
        />
      </a>

      {/* PILL NAVIGATION - Floating on the Right */}
      <nav 
        className={cn(
          "pointer-events-auto flex items-center space-x-6 md:space-x-8 px-6 md:px-8 rounded-full transition-all duration-500 border",
          // Base styles for the floating pill
          "py-3 md:py-3.5 bg-luxury-paper/80 backdrop-blur-md border-luxury-gold/30 shadow-[0_8px_30px_rgba(0,0,0,0.15)]",
          // When scrolled, make it slightly more compact and opaque
          scrolled && "py-2.5 md:py-3 bg-luxury-paper/95 shadow-[0_8px_30px_rgba(0,0,0,0.3)] border-luxury-gold/40"
        )}
      >
        {/* Home Icon (matching your reference image) */}
        <a 
          href="/" 
          data-cursor="CLICK" 
          className={cn(
            "transition-colors duration-300",
            pathname === "/" ? "text-luxury-burgundy" : "text-luxury-charcoal/50 hover:text-luxury-burgundy"
          )}
        >
          <svg className="w-4 h-4 md:w-[18px] md:h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </a>

        {/* Text Links */}
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.path}
            data-cursor="CLICK"
            className={cn(
              "font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-300 text-luxury-charcoal/70 hover:text-luxury-burgundy",
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