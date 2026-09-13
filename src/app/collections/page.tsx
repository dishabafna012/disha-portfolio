"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";
import Footer from "../../components/layout/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Data integrated directly from portfolio concepts
const archivePieces = [
  { id: "c1-1", col: "01", name: "WINGS OF DREAMS", concept: "Imagination as a space to escape and explore.", motif: "BALLERINA, MOTION, COURAGE, CREATIVITY", size: "large" },
  { id: "c1-2", col: "01", name: "THE AWAKENED PHOENIX", concept: "Inner visions feeling like a quiet escape from reality.", motif: "REBIRTH, FLAME, ASCENSION", size: "small" },
  { id: "c1-3", col: "01", name: "ETHEREAL ASCENT", concept: "Translating dreams into physical weightlessness.", motif: "GRAVITY, LIGHT, AIR", size: "small" },
  { id: "c1-4", col: "01", name: "INFINITE FLOW", concept: "The unending nature of human imagination.", motif: "WATER, CONTINUITY, GRACE", size: "large" },
  { id: "c2-1", col: "02", name: "METRO GRID", concept: "City movement and abstract art converging.", motif: "LINES, INTERSECTION, SPEED", size: "large" },
  { id: "c3-1", col: "03", name: "HERITAGE LINK", concept: "Traditional cultures evolving into the future.", motif: "GEOMETRY, CULTURE, TRANSFORMATION", size: "small" },
  { id: "c3-2", col: "03", name: "LEGACY BLOOM", concept: "Indian heritage blended with modern life.", motif: "FLORAL, TEMPLE, TOMORROW", size: "large" },
  { id: "c3-3", col: "03", name: "VIBRANT HARVEST", concept: "Folk patterns reinterpreted for a new era.", motif: "NATURE, RITUAL, EVOLUTION", size: "small" },
];

export default function CollectionsArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const [activePiece, setActivePiece] = useState<any | null>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      gsap.fromTo(".hero-text", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out" }
      );

      // 2. Global Scroll Indicator
      gsap.to(scrollLineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });

      // 3. Collection Trackers for Side Nav
      gsap.utils.toArray(".collection-chapter").forEach((chapter: any, i) => {
        ScrollTrigger.create({
          trigger: chapter,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(i + 1);
          }
        });
      });

      // 4. Word Sequence Animations
      gsap.utils.toArray(".word-sequence").forEach((seq: any) => {
        const words = seq.querySelectorAll("span");
        gsap.fromTo(words, 
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 1, stagger: 0.5,
            scrollTrigger: {
              trigger: seq,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1
            }
          }
        );
      });

      // 5. Geometric Grid Drawing (Collection 02)
      gsap.fromTo(".geo-line", 
        { scaleX: 0, opacity: 0 },
        { 
          scaleX: 1, opacity: 1, duration: 1.5, stagger: 0.1, ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".geo-grid-container",
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 6. Cultural Text Morph (Collection 03)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cultural-morph-container",
          start: "top center",
          end: "bottom center",
          scrub: 1,
          pin: true
        }
      });
      tl.to(".morph-tradition", { opacity: 0, y: -20, duration: 1 })
        .to(".morph-modern", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".morph-modern", { opacity: 0, y: -20, duration: 1 }, "+=0.5")
        .to(".morph-tomorrow", { opacity: 1, y: 0, duration: 1 }, "<");

      // 7. Jewellery Image Parallax
      gsap.utils.toArray(".jewellery-frame").forEach((frame: any) => {
        const img = frame.querySelector(".jewellery-img");
        if(img) {
          gsap.to(img, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true }
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Lock body scroll when archive viewer is open
  useEffect(() => {
    if (activePiece) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [activePiece]);

  return (
    <div ref={containerRef} className="w-full bg-[#2A090D] text-[#F5F3EC] selection:bg-[#D4AF37] selection:text-[#2A090D] relative overflow-hidden">
      
      {/* GLOBAL FIXED NAVIGATION */}
      <div className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center space-y-8 pointer-events-none hidden lg:flex">
        <div className="flex flex-col space-y-4 text-xs font-sans tracking-[0.2em] text-[#D4AF37]/50">
          <span className={cn("transition-colors duration-500", activeIndex === 1 && "text-[#D4AF37] scale-110")}>01</span>
          <span className={cn("transition-colors duration-500", activeIndex === 2 && "text-[#D4AF37] scale-110")}>02</span>
          <span className={cn("transition-colors duration-500", activeIndex === 3 && "text-[#D4AF37] scale-110")}>03</span>
        </div>
        <div className="w-[1px] h-32 bg-[#D4AF37]/20 relative origin-top">
          <div ref={scrollLineRef} className="absolute top-0 left-0 w-full h-full bg-[#D4AF37] origin-top scale-y-0" />
        </div>
      </div>

      {/* 01 - HERO SECTION */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6">
        {/* Subtle background geometry */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <svg className="w-[120vw] h-[120vw] max-w-[800px] max-h-[800px] animate-[spin_120s_linear_infinite]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#D4AF37" strokeWidth="0.1" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#D4AF37" strokeWidth="0.1" strokeDasharray="1 2" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#D4AF37" strokeWidth="0.1" />
          </svg>
        </div>

        <span className="hero-text font-sans text-xs tracking-[0.4em] text-[#D4AF37] uppercase mb-8">
          The Collections
        </span>
        <h1 className="hero-text font-serif text-6xl md:text-8xl lg:text-9xl tracking-widest uppercase mb-12 drop-shadow-2xl">
          Collections
        </h1>
        <p className="hero-text font-serif text-2xl md:text-4xl italic text-[#F5F3EC]/80 mb-6">
          Three worlds. Three directions. One design language.
        </p>
        <p className="hero-text font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-[#D4AF37]/60 max-w-lg leading-relaxed">
          A study of imagination, movement and heritage translated into jewellery.
        </p>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-pulse">
          <span className="font-sans text-[10px] tracking-widest uppercase mb-4">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-[#D4AF37]" />
        </div>
      </section>

      {/* 02 - COLLECTION 01: FREEDOM TO DREAM (MATCHING SCREENSHOT LAYOUT) */}
      <section className="collection-chapter relative w-full min-h-screen py-32 px-6 lg:px-32 flex items-center">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* Left Text Block */}
          <div className="w-full lg:w-1/2 z-10 flex flex-col items-start text-left">
            <span className="font-sans text-sm md:text-base text-[#D4AF37] mb-6 block">01</span>
            <h2 className="font-serif text-[4rem] md:text-[6rem] lg:text-[8.5rem] text-[#F5F3EC] uppercase tracking-tighter leading-[0.9] mb-12 drop-shadow-2xl">
              Freedom<br />To<br />Dream
            </h2>
            <div className="w-24 h-[1px] bg-[#D4AF37]/50 mb-12" />
            <p className="font-serif text-2xl md:text-3xl italic text-[#F5F3EC]/80 max-w-lg leading-relaxed">
              "Imagination is a form of freedom—how dreams and inner visions can feel like a quiet escape from reality."
            </p>
          </div>

          {/* Right Clickable Image Block */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end">
            {/* LINK TO FREEDOM TO DREAM PAGE */}
            <a href="/collections/freedom-to-dream" className="w-full max-w-[500px] aspect-square relative group cursor-pointer block mb-8">
              
              {/* Image Container */}
              <div className="absolute inset-0 bg-[#1A0507] border border-[#D4AF37]/20 overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-[#D4AF37]/5 transition-transform duration-1000 group-hover:scale-110 opacity-60" />
              </div>
              
              {/* WHITE CIRCULAR "VIEW" BUTTON */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 bg-[#F5F3EC] rounded-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-20">
                <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#2A090D] font-bold ml-1">View</span>
              </div>

            </a>

            {/* Description Text under Image */}
            <div className="text-center lg:text-center w-full max-w-[500px]">
              <h3 className="font-sans text-sm tracking-[0.4em] uppercase text-[#D4AF37] mb-3">Wings of Dreams</h3>
              <p className="font-sans text-[10px] tracking-widest uppercase text-[#F5F3EC]/50">Ballerina • Motion • Courage</p>
            </div>
          </div>

        </div>
      </section>

      {/* Visual Progression Separator */}
      <div className="word-sequence w-full py-20 flex justify-center space-x-6 md:space-x-12 font-serif text-2xl md:text-4xl text-[#D4AF37]/40 uppercase tracking-widest text-center border-b border-[#D4AF37]/10">
        <span>Dream</span>
        <span className="text-[#F5F3EC]/20">→</span>
        <span>Imagination</span>
        <span className="text-[#F5F3EC]/20">→</span>
        <span>Freedom</span>
        <span className="text-[#F5F3EC]/20">→</span>
        <span className="text-[#F5F3EC]">Form</span>
      </div>

      {/* 03 - COLLECTION 02: ABSTRACT DESIGN AND RETRO */}
      <section className="collection-chapter relative w-full min-h-screen py-32 px-6 lg:px-32 bg-[#1A0507]">
        
        <div className="max-w-[1400px] mx-auto mb-32 flex flex-col lg:flex-row justify-between items-end">
          <div>
            <span className="font-sans text-xl text-[#D4AF37] mb-4 block">02</span>
            <h2 className="font-serif text-[4rem] md:text-[6rem] lg:text-[7rem] uppercase tracking-tighter leading-none mb-6">
              Abstract<br />Design & Retro
            </h2>
          </div>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#F5F3EC]/50 max-w-sm mb-4">
            Metro • City Movement • Train Windows • Ticket Booths • Platform Lines
          </p>
        </div>

        {/* CLICKABLE LINK TO COLLECTION 02 */}
        <a href="/collections/abstract-retro" className="geo-grid-container relative w-full h-[60vh] max-w-5xl mx-auto border border-[#D4AF37]/10 flex items-center justify-center overflow-hidden group block cursor-pointer">
          {/* Animated Lines */}
          <div className="geo-line absolute top-1/3 left-0 w-full h-[1px] bg-[#D4AF37]/20 origin-left" />
          <div className="geo-line absolute top-2/3 left-0 w-full h-[1px] bg-[#D4AF37]/20 origin-right" />
          <div className="geo-line absolute left-1/3 top-0 w-[1px] h-full bg-[#D4AF37]/20 origin-top" />
          <div className="geo-line absolute left-2/3 top-0 w-[1px] h-full bg-[#D4AF37]/20 origin-bottom" />
          
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="w-full max-w-md h-full bg-[#2A090D] border border-[#D4AF37]/30 z-10 p-4 shadow-2xl relative">
              <div className="w-full h-full bg-[#F5F3EC]/5 transition-colors duration-500 group-hover:bg-[#D4AF37]/10" />
            </div>
          </div>

          {/* WHITE CIRCULAR "VIEW" BUTTON */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-[#F5F3EC] rounded-full flex items-center justify-center transition-all duration-700 group-hover:scale-110 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-20 opacity-0 scale-90 group-hover:opacity-100">
            <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#2A090D] font-bold ml-1">View</span>
          </div>
        </a>
      </section>

      {/* 04 - COLLECTION 03: CULTURAL ECHOES */}
      <section className="collection-chapter relative w-full min-h-screen py-32 px-6 lg:px-32">
        <div className="max-w-[1400px] mx-auto flex flex-col items-end text-right mb-24">
          <span className="font-sans text-xl text-[#D4AF37] mb-4 block">03</span>
          <h2 className="font-serif text-[4rem] md:text-[6rem] lg:text-[7rem] uppercase tracking-tighter leading-none mb-12">
            Cultural Echoes<br />Of Tomorrow
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37]/50 mb-12 ml-auto" />
          <p className="font-serif text-2xl md:text-3xl italic text-[#F5F3EC]/80 max-w-lg leading-relaxed">
            "Traditional cultures evolving into the future—Indian heritage seamlessly blended with modern life."
          </p>
        </div>

        {/* CLICKABLE LINK TO COLLECTION 03 */}
        <a href="/collections/cultural-echoes" className="w-full max-w-5xl aspect-[16/9] mx-auto relative group block cursor-pointer border border-[#D4AF37]/20 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[#D4AF37]/5 transition-transform duration-1000 group-hover:scale-105" />
          
          {/* WHITE CIRCULAR "VIEW" BUTTON */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 bg-[#F5F3EC] rounded-full flex items-center justify-center transition-all duration-700 group-hover:scale-110 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-20 opacity-0 scale-90 group-hover:opacity-100">
            <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#2A090D] font-bold ml-1">View</span>
          </div>
        </a>

        {/* Cultural Text Morph */}
        <div className="cultural-morph-container h-[40vh] flex items-center justify-center relative overflow-hidden mt-16 pointer-events-none">
          <div className="relative h-24 w-full flex items-center justify-center text-5xl md:text-7xl font-serif uppercase tracking-widest text-[#D4AF37]">
            <span className="morph-tradition absolute">Tradition</span>
            <span className="morph-modern absolute opacity-0 translate-y-10">Modern</span>
            <span className="morph-tomorrow absolute opacity-0 translate-y-10 text-[#F5F3EC]">Tomorrow</span>
          </div>
        </div>
      </section>

      {/* 05 - EDITORIAL ARCHIVE GRID (Quick View Modals) */}
      <section className="w-full py-32 px-6 lg:px-12 bg-[#1A0507]">
        <div className="max-w-[1600px] mx-auto">
          <h3 className="font-serif text-4xl text-center text-[#F5F3EC] mb-24 uppercase tracking-widest">
            The Design Archive
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 auto-rows-[400px]">
            {archivePieces.slice(0, 6).map((piece, i) => (
              <div 
                key={piece.id}
                onClick={() => setActivePiece(piece)}
                className={cn(
                  "relative group cursor-pointer overflow-hidden border border-[#D4AF37]/10 bg-[#2A090D] flex items-center justify-center",
                  piece.size === 'large' ? "md:col-span-8" : "md:col-span-4"
                )}
              >
                {/* Image Placeholder with subtle material lighting effect */}
                <div className="jewellery-img absolute inset-[-10%] w-[120%] h-[120%] bg-[#F5F3EC]/5 transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:via-white/5 transition-all duration-700 pointer-events-none" />
                
                {/* Hover Annotation Overlay */}
                <div className="absolute inset-0 bg-[#2A090D]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-between backdrop-blur-sm">
                  <span className="font-sans text-[10px] tracking-[0.4em] text-[#D4AF37]">COLLECTION {piece.col}</span>
                  <div>
                    <h4 className="font-serif text-2xl md:text-3xl text-[#F5F3EC] uppercase mb-4">{piece.name}</h4>
                    <div className="flex flex-col space-y-1">
                      {piece.motif.split(', ').map(m => (
                        <span key={m} className="font-sans text-[9px] tracking-widest uppercase text-[#F5F3EC]/50 border-b border-[#F5F3EC]/10 pb-1 w-max">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full flex flex-col items-center justify-center py-32 text-[#D4AF37]/50 font-sans text-xs tracking-[0.4em] uppercase">
          <div className="w-[1px] h-16 bg-[#D4AF37]/30 mb-8" />
          The Archive Is Complete
        </div>
      </section>

      {/* 06 - FINAL TRANSITION SECTION */}
      <section className="w-full h-[80vh] flex flex-col items-center justify-center text-center px-6 relative bg-[#2A090D] border-t border-[#D4AF37]/20">
        <h2 className="font-serif text-5xl md:text-7xl lg:text-9xl uppercase tracking-widest text-[#F5F3EC] mb-6 opacity-90">
          Three Worlds.
        </h2>
        <h2 className="font-serif text-5xl md:text-7xl lg:text-9xl uppercase tracking-widest text-[#D4AF37] mb-12 drop-shadow-lg">
          One Direction.
        </h2>
        <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-[#F5F3EC]/70 mb-16">
          Explore how each idea becomes form.
        </p>
        
        <a 
          href="/process" 
          className="group relative inline-flex items-center justify-center px-12 py-4 border border-[#D4AF37]/50 text-[#D4AF37] font-sans text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2A090D]"
        >
          View The Process →
        </a>
        <span className="absolute bottom-12 font-serif italic text-[#F5F3EC]/40 text-lg">
          Disha Bafna — Jewellery Designer
        </span>
      </section>

      <Footer />

      {/* ------------------------------------------------------------------------ */}
      {/* MAGNIFYING JEWELLERY EXPERIENCE (Fullscreen Modal for Archive) */}
      {/* ------------------------------------------------------------------------ */}
      {activePiece && (
        <div className="fixed inset-0 z-[9999] bg-[#2A090D] flex flex-col lg:flex-row animate-in fade-in duration-500">
          
          {/* Close Button */}
          <button 
            onClick={() => setActivePiece(null)}
            className="absolute top-8 right-8 z-50 text-[#F5F3EC] hover:text-[#D4AF37] transition-colors font-sans text-xs tracking-[0.3em] uppercase flex items-center space-x-2"
          >
            <span>Close</span>
            <span className="text-xl leading-none mb-1">×</span>
          </button>

          {/* Left: Large Image */}
          <div className="w-full lg:w-2/3 h-1/2 lg:h-full bg-[#1A0507] relative flex items-center justify-center p-12">
            <div className="w-full h-full max-w-2xl bg-[#F5F3EC]/5 border border-[#D4AF37]/10 shadow-2xl relative overflow-hidden">
               {/* Lighting effect to simulate tactile material */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50" />
              <div className="absolute bottom-6 right-6 font-serif italic text-[#D4AF37]/20 text-3xl">
                {activePiece.col}
              </div>
            </div>
          </div>

          {/* Right: Editorial Details */}
          <div className="w-full lg:w-1/3 h-1/2 lg:h-full flex flex-col justify-center p-12 lg:p-24 border-l border-[#D4AF37]/10 overflow-y-auto">
            <span className="font-sans text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-4 block">
              Collection {activePiece.col}
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-[#F5F3EC] uppercase mb-16 leading-tight">
              {activePiece.name}
            </h2>

            <div className="space-y-12">
              <div>
                <h3 className="font-sans text-[9px] tracking-[0.3em] text-[#F5F3EC]/40 uppercase mb-3">Concept</h3>
                <p className="font-serif text-xl italic text-[#F5F3EC]/90 leading-relaxed">
                  "{activePiece.concept}"
                </p>
              </div>
              
              <div>
                <h3 className="font-sans text-[9px] tracking-[0.3em] text-[#F5F3EC]/40 uppercase mb-3">Design Language & Motifs</h3>
                <div className="flex flex-col space-y-2">
                  {activePiece.motif.split(', ').map((m: string) => (
                    <span key={m} className="font-sans text-xs tracking-widest text-[#D4AF37] uppercase">
                      — {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}