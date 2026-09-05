"use client";

import Footer from "../../../components/layout/Footer"; 
// (Adjust the `../../` path depending on the folder depth)
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { collections } from "../../../data/collections";
import FadeInText from "../../../components/animations/FadeInText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CollectionDetail({ params }: { params: { slug: string } }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Find the specific collection based on the URL slug
  const collection = collections.find((c) => c.id === params.slug);

  useLayoutEffect(() => {
    if (!containerRef.current || !collection) return;

    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(
        ".hero-element",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out" }
      );

      // Image Parallax Animation
      const images = gsap.utils.toArray(".editorial-image");
      images.forEach((img: any) => {
        gsap.fromTo(
          img,
          { y: 50, scale: 1.1 },
          {
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [collection]);

  // If someone types a wrong URL, show a clean error state
  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-paper text-luxury-burgundy font-serif text-3xl">
        Collection not found.
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-luxury-paper text-luxury-charcoal pt-32 pb-24">
      
      {/* 1. HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-24 flex flex-col items-center text-center">
        <span className="hero-element font-sans text-sm tracking-[0.4em] text-luxury-gold uppercase mb-8 block">
          Collection {collection.number}
        </span>
        <h1 className="hero-element font-serif text-5xl md:text-7xl lg:text-9xl text-luxury-burgundy uppercase tracking-wide mb-12">
          {collection.title}
        </h1>
        <div className="hero-element w-[1px] h-24 bg-luxury-gold/50 mb-12" />
      </div>

      {/* 2. THE STORY (EDITORIAL LAYOUT) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 mt-16">
        
        {/* Left Text Block */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h3 className="font-serif text-3xl md:text-5xl text-luxury-burgundy mb-8 leading-tight">
            The Concept & Inspiration
          </h3>
          <FadeInText 
            text={collection.brief} 
            className="font-sans text-lg text-luxury-charcoal/80 font-light"
          />
        </div>

        {/* Right Image/Art Block */}
        <div className="lg:col-span-7">
          <div className="w-full h-[60vh] bg-luxury-burgundy/5 border border-luxury-gold/20 overflow-hidden relative flex items-center justify-center" data-cursor="VIEW">
            {/* Placeholder for the actual CAD/Sketch image */}
            <div className="editorial-image w-full h-full bg-luxury-sand/20" />
            <span className="absolute font-serif text-luxury-burgundy/20 text-6xl italic pointer-events-none">
              SKETCH / CAD
            </span>
          </div>
        </div>
      </div>

      {/* 3. GALLERY GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-32">
        <h3 className="font-serif text-4xl text-luxury-burgundy text-center mb-16">Selected Forms</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="w-full h-[70vh] bg-luxury-charcoal/5 border border-luxury-gold/20 overflow-hidden relative flex items-center justify-center" data-cursor="VIEW">
            <div className="editorial-image w-full h-full bg-luxury-emerald/5" />
            <span className="absolute font-sans text-xs tracking-[0.3em] text-luxury-charcoal/40 uppercase">Final Piece 01</span>
          </div>
          
          <div className="w-full h-[50vh] md:mt-32 bg-luxury-charcoal/5 border border-luxury-gold/20 overflow-hidden relative flex items-center justify-center" data-cursor="VIEW">
            <div className="editorial-image w-full h-full bg-luxury-emerald/5" />
            <span className="absolute font-sans text-xs tracking-[0.3em] text-luxury-charcoal/40 uppercase">Final Piece 02</span>
          </div>
        </div>
      </div>

      {/* 4. BACK TO PORTAL */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-32 flex justify-center pb-20">
        <Link 
          href="/collections"
          data-cursor="CLICK"
          className="group relative inline-flex items-center justify-center px-12 py-4 overflow-hidden border border-luxury-burgundy/30 text-luxury-burgundy font-sans text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:text-luxury-paper"
        >
          <span className="absolute inset-0 w-full h-full -translate-x-full bg-luxury-burgundy group-hover:translate-x-0 transition-transform duration-500 ease-lux-ease" />
          <span className="relative z-10">Return to Collections</span>
        </Link>
      </div>

    {/* Existing page content above... */}
      <Footer />
    </div>
  );
}