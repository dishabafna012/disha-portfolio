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
  { id: "c1-1", col: "01", name: "WINGS OF DREAMS", concept: "Imagination as a space to escape and explore.", motif: "BALLERINA, MOTION, COURAGE, CREATIVITY", size: "large", image: "/theme1/wings.png" },
  { id: "c1-2", col: "01", name: "THE AWAKENED PHOENIX", concept: "Inner visions feeling like a quiet escape from reality.", motif: "REBIRTH, FLAME, ASCENSION", size: "small", image: "/theme1/pheonix.png" },
  { id: "c1-3", col: "01", name: "ETHEREAL ASCENT", concept: "Translating dreams into physical weightlessness.", motif: "GRAVITY, LIGHT, AIR", size: "small", image: "/theme1/ethereal.png" },
  { id: "c1-4", col: "01", name: "INFINITE FLOW", concept: "The unending nature of human imagination.", motif: "WATER, CONTINUITY, GRACE", size: "large", image: "/theme1/infinite.png" },
  
  { id: "c2-1", col: "02", name: "TEMPORAL SHIFT", concept: "City movement and abstract art converging.", motif: "LINES, INTERSECTION, SPEED", size: "large", image: "/theme2/temporal.png" },
  { id: "c2-2", col: "02", name: "URBAN RHYTHM", concept: "The structured chaos of metropolitan life.", motif: "GRID, METRO, MOVEMENT", size: "small", image: "/theme2/urban.png" },
  { id: "c2-3", col: "02", name: "DYNAMIC FRAME", concept: "Window views of a city in motion.", motif: "GEOMETRY, LIGHT, TRANSIT", size: "small", image: "/theme2/dynamic.png" },
  
  { id: "c3-1", col: "03", name: "HERITAGE LINK", concept: "Traditional cultures evolving into the future.", motif: "GEOMETRY, CULTURE, TRANSFORMATION", size: "small", image: "/theme3/heritage-link.png" },
  { id: "c3-2", col: "03", name: "LEGACY BLOOM", concept: "Indian heritage blended with modern life.", motif: "FLORAL, TEMPLE, TOMORROW", size: "large", image: "/theme3/legacy-bloom.png" },
  { id: "c3-3", col: "03", name: "VIBRANT HARVEST", concept: "Folk patterns reinterpreted for a new era.", motif: "NATURE, RITUAL, EVOLUTION", size: "small", image: "/theme3/vibrant-harvest.png" },
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

      // 4. Jewellery Image Parallax in Archive
      gsap.utils.toArray(".jewellery-frame").forEach((frame: any) => {
        const img = frame.querySelector(".jewellery-img");
        if(img) {
          gsap.to(img, {
            yPercent: 10,
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
      
      {/* GLOBAL FIXED NAVIGATION (Dots on left) */}
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

        <span className="hero-text font-sans text-[10px] md:text-xs tracking-[0.6em] text-[#D4AF37] uppercase mb-6">
          The Portfolio
        </span>
        <h1 className="hero-text font-serif text-5xl md:text-7xl lg:text-8xl tracking-widest uppercase mb-8 drop-shadow-2xl">
          Collections
        </h1>
        <div className="hero-text w-16 h-[1px] bg-[#D4AF37]/50 mb-8" />
        <p className="hero-text font-serif text-xl md:text-3xl italic text-[#F5F3EC]/80 mb-6 max-w-2xl leading-relaxed">
          "Three distinct worlds. Three creative directions. One unified design language."
        </p>
        <p className="hero-text font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#D4AF37]/60 max-w-md leading-loose">
          A study of imagination, city movement, and cultural heritage translated into fine jewellery.
        </p>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-pulse">
          <span className="font-sans text-[10px] tracking-widest uppercase mb-4">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-[#D4AF37]" />
        </div>
      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* STANDARDIZED COLLECTION LAYOUTS (Side-by-Side) */}
      {/* ------------------------------------------------------------------------ */}

      {/* COLLECTION 01: FREEDOM TO DREAM */}
      <section className="collection-chapter relative w-full py-32 px-6 lg:px-32 bg-[#1A0507] border-t border-[#D4AF37]/10">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Text */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <span className="font-sans text-xs tracking-[0.4em] text-[#D4AF37] mb-6 block border-b border-[#D4AF37]/30 pb-2">Collection 01</span>
            <h2 className="font-serif text-5xl md:text-6xl text-[#F5F3EC] uppercase tracking-widest leading-[1.1] mb-8">
              Freedom<br />To Dream
            </h2>
            <p className="font-serif text-xl md:text-2xl italic text-[#F5F3EC]/80 mb-8 max-w-md leading-relaxed">
              "Imagination is a form of freedom—how dreams and inner visions can feel like a quiet escape from reality."
            </p>
            <p className="font-sans text-xs tracking-widest leading-loose uppercase text-[#F5F3EC]/50 mb-12 max-w-sm">
              Soft forms, imagination, and a quiet escape from reality translated into wearable art.
            </p>
            
            {/* The Explicit Button */}
            <a 
              href="/collections/freedom-to-dream" 
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-[#F5F3EC] text-[#2A090D] font-sans text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-500 hover:bg-[#D4AF37] hover:text-[#1A0507]"
            >
              View Collection
              <span className="ml-4 transition-transform group-hover:translate-x-2">→</span>
            </a>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2">
            <div className="w-full aspect-[4/5] bg-[#2A090D] border border-[#D4AF37]/20 flex items-center justify-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[#F5F3EC]/5 opacity-50" />
              <img src="/theme1/wings.png" alt="Freedom to Dream" className="absolute w-[80%] h-[80%] object-contain drop-shadow-2xl" />
            </div>
          </div>

        </div>
      </section>

      {/* COLLECTION 02: ABSTRACT & RETRO */}
      <section className="collection-chapter relative w-full py-32 px-6 lg:px-32 bg-[#2A090D] border-t border-[#D4AF37]/10">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
          
          {/* Right Text */}
          <div className="w-full lg:w-1/2 flex flex-col items-start lg:items-end text-left lg:text-right">
            <span className="font-sans text-xs tracking-[0.4em] text-[#D4AF37] mb-6 block border-b border-[#D4AF37]/30 pb-2">Collection 02</span>
            <h2 className="font-serif text-5xl md:text-6xl text-[#F5F3EC] uppercase tracking-widest leading-[1.1] mb-8">
              Abstract<br />& Retro
            </h2>
            <p className="font-serif text-xl md:text-2xl italic text-[#F5F3EC]/80 mb-8 max-w-md leading-relaxed">
              "Metro, city movement, train windows, ticket booths, and the rhythm of platform lines."
            </p>
            <p className="font-sans text-xs tracking-widest leading-loose uppercase text-[#F5F3EC]/50 mb-12 max-w-sm">
              City movement, geometry, and bold architectural lines converging.
            </p>
            
            {/* The Explicit Button */}
            <a 
              href="/collections/abstract-retro" 
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-[#F5F3EC] text-[#2A090D] font-sans text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-500 hover:bg-[#D4AF37] hover:text-[#1A0507]"
            >
              View Collection
              <span className="ml-4 transition-transform group-hover:translate-x-2">→</span>
            </a>
          </div>

          {/* Left Image */}
          <div className="w-full lg:w-1/2">
            <div className="w-full aspect-[4/5] bg-[#1A0507] border border-[#D4AF37]/20 flex items-center justify-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-50" />
              <img src="/theme2/temporal.png" alt="Abstract Retro" className="absolute w-[80%] h-[80%] object-contain drop-shadow-2xl" />
            </div>
          </div>

        </div>
      </section>

      {/* COLLECTION 03: CULTURAL ECHOES */}
      <section className="collection-chapter relative w-full py-32 px-6 lg:px-32 bg-[#1A0507] border-t border-[#D4AF37]/10">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Text */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <span className="font-sans text-xs tracking-[0.4em] text-[#D4AF37] mb-6 block border-b border-[#D4AF37]/30 pb-2">Collection 03</span>
            <h2 className="font-serif text-5xl md:text-6xl text-[#F5F3EC] uppercase tracking-widest leading-[1.1] mb-8">
              Cultural Echoes<br />Of Tomorrow
            </h2>
            <p className="font-serif text-xl md:text-2xl italic text-[#F5F3EC]/80 mb-8 max-w-md leading-relaxed">
              "Traditional cultures evolving into the future—Indian heritage seamlessly blended with modern life."
            </p>
            <p className="font-sans text-xs tracking-widest leading-loose uppercase text-[#F5F3EC]/50 mb-12 max-w-sm">
              Folk patterns and temple architecture reinterpreted for a new era.
            </p>
            
            {/* The Explicit Button */}
            <a 
              href="/collections/cultural-echoes" 
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-[#F5F3EC] text-[#2A090D] font-sans text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-500 hover:bg-[#D4AF37] hover:text-[#1A0507]"
            >
              View Collection
              <span className="ml-4 transition-transform group-hover:translate-x-2">→</span>
            </a>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2">
            <div className="w-full aspect-[4/5] bg-[#2A090D] border border-[#D4AF37]/20 flex items-center justify-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[#0F4C81]/10 opacity-50" />
              <img src="/theme3/regal-unfolding.png" alt="Cultural Echoes" className="absolute w-[80%] h-[80%] object-contain drop-shadow-2xl p-8" />
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 05 - EDITORIAL ARCHIVE GRID (Masonry Layout) */}
      {/* ------------------------------------------------------------------------ */}
      <section className="w-full py-32 px-6 lg:px-12 bg-[#2A090D] border-t border-[#D4AF37]/20">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-24">
             <span className="font-sans text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase mb-4 block">Archive</span>
             <h3 className="font-serif text-4xl md:text-5xl text-[#F5F3EC] uppercase tracking-widest">
               The Design Index
             </h3>
          </div>

          {/* Masonry Grid Setup */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {archivePieces.map((piece, i) => (
              <div 
                key={piece.id}
                onClick={() => setActivePiece(piece)}
                className="relative group cursor-pointer overflow-hidden border border-[#D4AF37]/20 bg-[#1A0507] flex flex-col break-inside-avoid shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className={cn(
                  "jewellery-frame w-full relative overflow-hidden flex items-center justify-center bg-[#F5F3EC]/5 transition-colors duration-500 group-hover:bg-[#F5F3EC]/10 p-8",
                  // Vary the heights for a true masonry look
                  i % 3 === 0 ? "h-[500px]" : i % 2 === 0 ? "h-[350px]" : "h-[450px]"
                )}>
                  {/* Image element with Parallax and Hover Scale */}
                  <img 
                    src={piece.image} 
                    alt={piece.name}
                    className="jewellery-img absolute w-[80%] h-[80%] object-contain drop-shadow-xl transition-transform duration-1000 group-hover:scale-110" 
                  />
                  
                  {/* Subtle lighting overlay on hover */}
                  <div className="absolute inset-0 bg-[#1A0507]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  
                  {/* Center hover text */}
                  <span className="font-serif text-2xl text-[#D4AF37] italic opacity-0 group-hover:opacity-100 transition-opacity duration-500 relative z-20">
                    View Details
                  </span>
                </div>
                
                {/* Static Details Below Image */}
                <div className="p-6 md:p-8 flex flex-col border-t border-[#D4AF37]/10 bg-[#2A090D]">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-sans text-[9px] tracking-[0.4em] text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-1">
                      C—{piece.col}
                    </span>
                  </div>
                  <h4 className="font-serif text-xl md:text-2xl text-[#F5F3EC] uppercase tracking-widest mb-3">{piece.name}</h4>
                  <div className="w-8 h-[1px] bg-[#D4AF37]/30 mb-5" />
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {piece.motif.split(', ').map(m => (
                      <span key={m} className="font-sans text-[8px] tracking-widest uppercase text-[#F5F3EC]/40 bg-[#1A0507] border border-[#D4AF37]/10 px-2 py-1">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
        
        <div className="w-full flex flex-col items-center justify-center pt-32 text-[#D4AF37]/50 font-sans text-xs tracking-[0.4em] uppercase">
          <div className="w-[1px] h-16 bg-[#D4AF37]/30 mb-8" />
          The Archive Is Complete
        </div>
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
          <div className="w-full lg:w-2/3 h-[50vh] lg:h-full bg-[#1A0507] relative flex items-center justify-center p-12">
            <div className="w-full h-full max-w-2xl border border-[#D4AF37]/10 shadow-2xl relative flex items-center justify-center">
               <div className="absolute inset-0 bg-[#F5F3EC]/5 opacity-50" />
               <img src={activePiece.image} alt={activePiece.name} className="w-[80%] h-[80%] object-contain drop-shadow-2xl relative z-10" />
               <div className="absolute bottom-6 right-6 font-serif italic text-[#D4AF37]/20 text-3xl z-10">
                 {activePiece.col}
               </div>
            </div>
          </div>

          {/* Right: Editorial Details */}
          <div className="w-full lg:w-1/3 h-[50vh] lg:h-full flex flex-col justify-center p-12 lg:p-24 border-l border-[#D4AF37]/10 overflow-y-auto">
            <span className="font-sans text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-4 block">
              Collection {activePiece.col}
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-[#F5F3EC] uppercase mb-12 leading-tight">
              {activePiece.name}
            </h2>

            <div className="space-y-12">
              <div>
                <h3 className="font-sans text-[9px] tracking-[0.3em] text-[#F5F3EC]/40 uppercase mb-3">Concept</h3>
                <p className="font-serif text-lg italic text-[#F5F3EC]/90 leading-relaxed">
                  "{activePiece.concept}"
                </p>
              </div>
              
              <div>
                <h3 className="font-sans text-[9px] tracking-[0.3em] text-[#F5F3EC]/40 uppercase mb-3">Design Language & Motifs</h3>
                <div className="flex flex-col space-y-2">
                  {activePiece.motif.split(', ').map((m: string) => (
                    <span key={m} className="font-sans text-[10px] tracking-widest text-[#D4AF37] uppercase">
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