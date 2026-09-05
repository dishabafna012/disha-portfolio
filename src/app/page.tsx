"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profileData } from "../data/profile";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textNameRef = useRef<HTMLHeadingElement>(null);
  const textTitleRef = useRef<HTMLHeadingElement>(null);
  const textQuoteRef = useRef<HTMLParagraphElement>(null);
  const exploreRef = useRef<HTMLAnchorElement>(null);
  
  // Refs for the animative floating background orbs
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Page Load Animation
      const tl = gsap.timeline();
      tl.to(textNameRef.current, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 })
        .to(textTitleRef.current, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, "-=1")
        .to(textQuoteRef.current, { opacity: 1, duration: 2, ease: "power2.inOut" }, "-=1")
        .to(exploreRef.current, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, "-=1.5");

      // 2. Fluid Ambient Animation for the Background Orbs
      gsap.to(orb1Ref.current, {
        x: "10vw",
        y: "10vh",
        rotation: 45,
        scale: 1.2,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(orb2Ref.current, {
        x: "-10vw",
        y: "-15vh",
        rotation: -45,
        scale: 1.5,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2
      });

      // 3. Subtle Parallax on Mouse Move
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const xPos = (e.clientX / window.innerWidth - 0.5) * 40;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 40;

        gsap.to(textNameRef.current, { x: xPos, y: yPos, duration: 2, ease: "power2.out" });
        gsap.to(orb1Ref.current, { x: `+=${xPos * 0.5}`, y: `+=${yPos * 0.5}`, duration: 3, ease: "power2.out" });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-luxury-paper overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Creative Animative Background - Fluid Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          ref={orb1Ref}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-luxury-burgundy opacity-10 rounded-full blur-[120px]"
        />
        <div 
          ref={orb2Ref}
          className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-luxury-gold opacity-15 rounded-full blur-[140px]"
        />
      </div>

      {/* Main Typography Layer */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        <h1 
          ref={textNameRef} 
          className="font-serif text-5xl md:text-8xl lg:text-9xl tracking-[0.1em] text-luxury-burgundy uppercase opacity-0 translate-y-12 drop-shadow-sm"
        >
          {profileData.name}
        </h1>
        
        <h2 
          ref={textTitleRef} 
          className="font-sans text-xs md:text-sm tracking-[0.5em] text-luxury-charcoal/60 uppercase opacity-0 translate-y-6"
        >
          {profileData.role}
        </h2>
        
        <p 
          ref={textQuoteRef} 
          className="font-serif text-xl md:text-2xl italic text-luxury-burgundy/70 mt-16 opacity-0"
        >
          "{profileData.philosophy}"
        </p>
        
        <Link 
          ref={exploreRef}
          href="/collections" 
          data-cursor="ENTER"
          className="pointer-events-auto mt-24 opacity-0 translate-y-4 px-10 py-4 border border-luxury-burgundy/30 text-luxury-burgundy font-sans text-xs tracking-widest uppercase hover:bg-luxury-burgundy hover:text-luxury-paper transition-colors duration-500"
        >
          Enter the Exhibition
        </Link>
      </div>
    </div>
  );
}