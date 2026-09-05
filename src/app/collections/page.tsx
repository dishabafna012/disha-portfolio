"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { collections } from "../../data/collections";
import { cn } from "../../lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CollectionsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // 1. The Master Timeline (Forcing 3000px of scroll space to unlock Lenis)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // Smooth scrub
          end: "+=3000", // HARDCODED HEIGHT: Forces Lenis to allow scrolling
        }
      });

      // 2. Slide the entire track to the left
      tl.to(trackRef.current, {
        xPercent: -66.6666, // 3 panels total. Moves 2 panels left.
        ease: "none"
      });

      // 3. Animate text upwards as each panel slides into the center
      const panels = gsap.utils.toArray(".collection-panel");
      panels.forEach((panel: any) => {
        gsap.fromTo(
          panel.querySelectorAll(".animate-up"),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl, // Ties the trigger to the horizontal movement
              start: "left 60%", // Triggers when the panel's left edge hits 60% of the screen
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 4. CRITICAL: Force GSAP to recalculate heights so Lenis unlocks
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-luxury-charcoal overflow-hidden">
      
      {/* The Horizontal Track */}
      <div ref={trackRef} className="flex h-screen w-[300vw] flex-nowrap">
        
        {collections.map((collection, index) => (
          <div 
            key={collection.id} 
            className="collection-panel relative h-screen w-screen shrink-0 flex flex-col justify-center items-center"
          >
            
            {/* Background Layer */}
            <div className={cn(
              "absolute inset-0 z-0",
              index === 0 ? "bg-luxury-emerald/10" : 
              index === 1 ? "bg-luxury-charcoal" : 
              "bg-luxury-burgundy/10"
            )} />

            {/* Faint Background Number */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-serif font-bold text-luxury-paper/5 z-0 select-none pointer-events-none">
              {collection.number}
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6">
              <h2 className="animate-up font-sans text-sm tracking-[0.4em] text-luxury-gold uppercase mb-6">
                Collection {collection.number}
              </h2>
              
              <h1 className="animate-up font-serif text-5xl md:text-7xl lg:text-8xl text-luxury-paper uppercase tracking-wider mb-12 leading-tight">
                {collection.title}
              </h1>
              
              <p className="animate-up font-sans text-sm md:text-base text-luxury-sand/80 max-w-2xl mx-auto leading-relaxed mb-16 font-light">
                {collection.brief}
              </p>

              <Link 
                href={`/collections/${collection.id}`}
                data-cursor="ENTER"
                className="animate-up group relative inline-flex items-center justify-center px-12 py-4 overflow-hidden border border-luxury-gold/50 text-luxury-gold font-sans text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:text-luxury-charcoal"
              >
                <span className="absolute inset-0 w-full h-full -translate-x-full bg-luxury-gold group-hover:translate-x-0 transition-transform duration-500 ease-lux-ease" />
                <span className="relative z-10">Explore Collection</span>
              </Link>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}