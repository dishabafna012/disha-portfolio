"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../../lib/utils";
import Footer from "../../../components/layout/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ------------------------------------------------------------------------
// EXACT CONTENT LOCK (From PDF)
// ------------------------------------------------------------------------
const collectionData = {
  title: "Abstract Design & Retro",
  concept: "My inspiration comes from the energy of the city and the metro—the fast movement of people, geometrical shapes of train windows, ticket booths, and platform lines.",
  philosophy: "I also looked at how abstract art uses simple shapes, lines, and patterns to create strong visual impact. I imagined how those urban, geometric forms can be turned into wearable jewelry shapes that feel modern and bold.",
  mission: "This collection transforms metro structures and urban patterns into minimal jewellery forms. Inspired by the rhythm, symmetry, and movement of city life, the designs are created for individuals who appreciate modern aesthetics and subtle artistic details in everyday wear.",
  target: {
    description: "A modern urban individual who connects with the rhythm and structure of city life through minimal jewellery. Drawn to geometric forms and abstract metro inspired details, they seek pieces that feel contemporary, expressive, and effortlessly wearable—subtle in appearance yet bold in identity.",
    demographic: "Age Group: 18-30 years | Gender: All genders",
    lifestyle: "Fast paced. Modern. Minimal. City Oriented. Creative.",
    personality: "Observant. Experimental. Independent. Detail-Oriented. Aesthetic-Driven."
  },
  pieces: [
    {
      id: "toi-et-moi",
      name: "Toi Et Moi / You & Me",
      description: "This design captures the beauty of a dancing couple, where two figures are joined in a graceful and loving embrace.",
      type: "Brooch",
      materials: "Gold • Diamond • Pearl"
    },
    {
      id: "currents",
      name: "Currents of Connection",
      description: "This design was created by imagining two fish swimming together, symbolizing the strong bond of \"you and me\" as they move through life side by side.",
      type: "Brooch",
      materials: "Enamelling • Pearl • Blue Cabochon • Jade"
    },
    {
      id: "twin-blooms",
      name: "Twin Blooms in Harmony",
      description: "This design features two golden flowers joined together, symbolizing the beautiful connection between two individuals.",
      type: "Watch / Bracelet",
      materials: "Silver • Yellow Dia • Emerald • Blue Dia"
    },
    {
      id: "temporal",
      name: "Temporal Flow",
      description: "This design was created by showing time as a smooth and flowing movement, with a bold emerald stone adding elegance and beauty to the watch design.",
      type: "Watch",
      materials: "Gold • Diamond • Emerald"
    },
    {
      id: "prismatic",
      name: "Prismatic Halo",
      description: "This design was created by transforming a classic circular motif into a colorful sunburst pattern, showing the warmth, joy, and energy of the past.",
      type: "Pendant",
      materials: "Multicolor Stones • Gold"
    },
    {
      id: "vintage",
      name: "Vintage Elegance",
      description: "This design was created by transforming a vintage floral form into a modern statement, with a bold red diamond rose resting elegantly on a diamond-studded brim.",
      type: "Pendant",
      materials: "Red Dia • Diamond • Gold"
    },
    {
      id: "golden-echoes",
      name: "Golden Echoes",
      description: "This design was created by capturing the beauty of flowing movement in gold, inspired by the graceful shapes found in classic art.",
      type: "Earrings",
      materials: "Gold • Diamond • Pearl"
    },
    {
      id: "labyrinth",
      name: "Labyrinth of Love",
      description: "This design was created as a delicate gold pattern around a central stone, representing the special energy and beauty of a cherished memory.",
      type: "Earrings",
      materials: "Gold • Diamond"
    },
    {
      id: "serpentine",
      name: "Serpentine Leaf",
      description: "Was created by envisioning an elegant, winding path where golden vines gracefully entwine around a vibrant emerald leaf.",
      type: "Necklace & Earrings",
      materials: "Emerald • Diamond • Gold"
    },
    {
      id: "plume",
      name: "Golden Plume",
      description: "Was inspired by the simple elegance of a feather caught in mid-air, capturing the effortless grace of nature in brushed gold.",
      type: "Pendant & Earrings",
      materials: "Gold • Diamond"
    }
  ]
};

// ------------------------------------------------------------------------
// GEOMETRIC / METRO SVG ANIMATION
// ------------------------------------------------------------------------
const MetroGridGraphic = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-40 text-[#D4AF37]" preserveAspectRatio="xMidYMid slice">
    {/* Base Grid */}
    <g stroke="currentColor" strokeWidth="0.2" opacity="0.3">
      {[10, 30, 50, 70, 90, 110, 130, 150, 170, 190].map(pos => (
        <g key={`grid-${pos}`}>
          <line x1={pos} y1="0" x2={pos} y2="200" />
          <line x1="0" y1={pos} x2="200" y2={pos} />
        </g>
      ))}
    </g>
    
    {/* Animated "Metro" Lines */}
    <path d="M-20,40 L60,40 L100,80 L180,80 L220,120" fill="none" stroke="#5A1217" strokeWidth="1.5" className="animate-[dash_4s_linear_infinite]" strokeDasharray="100" strokeDashoffset="100" />
    <path d="M40,-20 L40,60 L80,100 L80,220" fill="none" stroke="currentColor" strokeWidth="1" className="animate-[dash_6s_linear_infinite_reverse]" strokeDasharray="150" strokeDashoffset="150" />
    <path d="M220,20 L160,20 L120,60 L120,140 L80,180 L-20,180" fill="none" stroke="#D4AF37" strokeWidth="0.8" className="animate-[dash_8s_linear_infinite]" strokeDasharray="200" strokeDashoffset="200" />
    
    {/* Intersection Nodes (Ticket Booths / Stations) */}
    <g fill="#1A0507" stroke="currentColor" strokeWidth="0.5">
      <rect x="58" y="38" width="4" height="4" className="animate-[pulse_2s_infinite]" />
      <rect x="98" y="78" width="4" height="4" className="animate-[pulse_2s_infinite]" style={{ animationDelay: '0.5s' }} />
      <circle cx="120" cy="60" r="2.5" className="animate-[pulse_2s_infinite]" style={{ animationDelay: '1s' }} />
      <circle cx="120" cy="140" r="2.5" className="animate-[pulse_2s_infinite]" style={{ animationDelay: '1.5s' }} />
      <polygon points="80,178 82,182 78,182" className="animate-[pulse_2s_infinite]" style={{ animationDelay: '0.8s' }} />
    </g>
  </svg>
);

const TickerTape = () => (
  <div className="w-full overflow-hidden bg-[#5A1217] text-[#F5F3EC] py-3 border-y border-[#D4AF37]/30 flex whitespace-nowrap">
    <div className="animate-[marquee_20s_linear_infinite] flex items-center">
      {[...Array(6)].map((_, i) => (
        <span key={i} className="flex items-center font-sans text-xs md:text-sm tracking-[0.4em] uppercase mx-8">
          BOLD <span className="mx-8 text-[#D4AF37]">•</span> NOSTALGIA <span className="mx-8 text-[#D4AF37]">•</span> RETRO FUTURISM <span className="mx-8 text-[#D4AF37]">•</span>
        </span>
      ))}
    </div>
  </div>
);

// CSS Keyframes
const Styles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes dash {
      to { stroke-dashoffset: 0; }
    }
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
  `}} />
);

export default function AbstractRetroPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      
      // 1. Cinematic Hero Entrance (Sharp, Geometric)
      const tlHero = gsap.timeline();
      
      tlHero.fromTo(".hero-box", 
        { scaleY: 0 }, 
        { scaleY: 1, transformOrigin: "bottom", duration: 1.5, ease: "power4.inOut" }, 
        0.2
      )
      .fromTo(".hero-text", 
        { y: 50, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }, 
        { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, stagger: 0.15, ease: "power3.out" }, 
        1
      )
      .fromTo(".hero-graphic", 
        { opacity: 0, x: 50 }, 
        { opacity: 1, x: 0, duration: 2, ease: "power2.out" }, 
        1.2
      );

      // 2. Parallax Image Masks (Sharp square reveals instead of circles)
      gsap.utils.toArray(".image-mask-square").forEach((elem: any) => {
        gsap.fromTo(elem, 
          { clipPath: "inset(10% 10% 10% 10%)", scale: 1.05 }, 
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.5, ease: "power3.inOut", 
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
            }
          }
        );
      });

      // 3. Text Reveals on Scroll
      gsap.utils.toArray(".scroll-reveal").forEach((elem: any) => {
        gsap.fromTo(elem, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", 
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
            }
          }
        );
      });

      // 4. Grid Drawing Animations for Showcases
      gsap.utils.toArray(".draw-line").forEach((line: any) => {
        const isVertical = line.classList.contains("line-v");
        gsap.fromTo(line, 
          { scaleY: isVertical ? 0 : 1, scaleX: isVertical ? 1 : 0 },
          { scaleY: 1, scaleX: 1, duration: 1.5, ease: "power3.inOut", scrollTrigger: { trigger: line, start: "top 80%" } }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#F5F3EC] text-[#1A0507] overflow-x-hidden pt-24 selection:bg-[#D4AF37] selection:text-[#1A0507] font-sans">
      <Styles />
      
      {/* Premium Geometric Cursor (Square for Retro theme) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] mix-blend-difference hidden md:block">
        <style dangerouslySetInnerHTML={{__html: `
          body { cursor: none; }
          .cursor-box { width: 6px; height: 6px; background: #D4AF37; position: fixed; transform: translate(-50%, -50%); pointer-events: none; z-index: 9999; transition: width 0.3s ease, height 0.3s ease, background 0.3s ease, border 0.3s ease; }
          .cursor-variant-explore { width: 60px; height: 60px; background: transparent; border: 1px solid #D4AF37; }
          .cursor-variant-explore::after { content: "${cursorText}"; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 6px; letter-spacing: 2px; color: #D4AF37; text-transform: uppercase; white-space: nowrap;}
        `}} />
        <div className={cn(
          "cursor-box",
          cursorVariant === "explore" && "cursor-variant-explore"
        )} />
      </div>

      {/* ------------------------------------------------------------------------ */}
      {/* 1. HERO: ABSTRACT DESIGN & RETRO */}
      {/* ------------------------------------------------------------------------ */}
      <section className="relative w-full min-h-[90vh] flex flex-col lg:flex-row border-b border-[#D4AF37]/30">
        
        {/* Left Side: Typography */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 lg:py-0 bg-[#F5F3EC] relative z-10">
          <div className="hero-box absolute top-0 left-0 w-4 h-full bg-[#5A1217]" />
          
          <span className="hero-text font-sans text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#D4AF37] mb-8">
            Collection 02
          </span>
          
          <h1 className="hero-text font-serif text-[4rem] md:text-[6.5rem] lg:text-[8rem] leading-[0.9] text-[#1A0507] uppercase tracking-tighter mb-12">
            Abstract<br />
            <span className="text-[#5A1217]">Design</span><br />
            & Retro
          </h1>

          <div className="hero-text w-24 h-[2px] bg-[#D4AF37] mb-12" />

          <p className="hero-text font-sans text-sm md:text-base tracking-[0.2em] leading-loose uppercase text-[#1A0507]/70 max-w-2xl">
            {collectionData.concept}
          </p>
        </div>

        {/* Right Side: Geometric Graphic */}
        <div className="w-full lg:w-[40%] min-h-[40vh] lg:min-h-full bg-[#1A0507] relative overflow-hidden flex items-center justify-center border-l border-[#D4AF37]/30">
          <div className="hero-graphic w-full h-full absolute inset-0">
            <MetroGridGraphic />
          </div>
          <div className="hero-graphic absolute bottom-12 right-12 text-right">
            <span className="block font-sans text-[8px] tracking-[0.5em] text-[#D4AF37] uppercase">Visual Focus</span>
            <span className="block font-serif text-2xl text-[#F5F3EC] italic">City Movement</span>
          </div>
        </div>
      </section>

      <TickerTape />

      {/* ------------------------------------------------------------------------ */}
      {/* 2. THE PHILOSOPHY (The Brief) - Strict Grid Layout */}
      {/* ------------------------------------------------------------------------ */}
      <section className="w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Text Block */}
          <div className="lg:col-span-5 flex flex-col justify-start pt-8">
            <span className="scroll-reveal font-sans text-[9px] tracking-[0.5em] uppercase text-[#D4AF37] mb-8 border-b border-[#D4AF37]/30 pb-4 w-max">
              The Architecture
            </span>
            <p className="scroll-reveal font-serif text-3xl md:text-4xl leading-tight text-[#1A0507] mb-12 tracking-tight">
              "{collectionData.philosophy}"
            </p>
            <div className="scroll-reveal w-full h-[1px] bg-[#D4AF37]/20 mb-12" />
            <p className="scroll-reveal font-sans text-xs tracking-widest leading-loose uppercase text-[#1A0507]/60">
              {collectionData.mission}
            </p>
          </div>

          {/* Right Wearer Profile (Boxy, Retro Form) */}
          <div className="lg:col-span-7 lg:pl-16">
            <div className="scroll-reveal w-full bg-[#1A0507] text-[#F5F3EC] p-10 md:p-16 border border-[#D4AF37]/30 relative shadow-[20px_20px_0px_0px_rgba(212,175,55,0.2)]">
              {/* Decorative Corner Brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />

              <h3 className="font-serif text-3xl md:text-4xl text-[#D4AF37] mb-8 uppercase tracking-widest">The Wearer</h3>
              <p className="font-sans text-xs md:text-sm tracking-widest leading-[2.5em] text-[#F5F3EC]/80 mb-12 uppercase">
                {collectionData.target.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#D4AF37]/20">
                <div>
                  <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#D4AF37] block mb-2">Demographic</span>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-[#F5F3EC]/60">{collectionData.target.demographic}</span>
                </div>
                <div>
                  <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#D4AF37] block mb-2">Lifestyle</span>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-[#F5F3EC]/60">{collectionData.target.lifestyle}</span>
                </div>
                <div className="md:col-span-2 pt-4">
                  <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#D4AF37] block mb-2">Traits</span>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-[#F5F3EC]/60">{collectionData.target.personality}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 3. THE SHOWCASE (High-End Geometric Editorial Layouts) */}
      {/* ------------------------------------------------------------------------ */}
      <section className="w-full bg-[#F5F3EC] py-32 border-t border-[#D4AF37]/20">
        <div className="text-center mb-40">
          <span className="font-sans text-[10px] tracking-[0.6em] text-[#D4AF37] uppercase mb-6 block">The Final Designs</span>
          <h2 className="font-serif text-6xl md:text-8xl text-[#1A0507] uppercase tracking-tighter">The Collection</h2>
        </div>

        {/* SET 1: Flow & Connection (Brooches) - Asymmetrical Intersecting Grid */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-48 relative">
          {/* Background Grid Lines */}
          <div className="draw-line line-v absolute top-0 left-1/2 w-[1px] h-full bg-[#D4AF37]/20 -translate-x-1/2 hidden lg:block origin-top" />
          <div className="draw-line line-h absolute top-1/2 left-0 w-full h-[1px] bg-[#D4AF37]/20 -translate-y-1/2 hidden lg:block origin-left" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0">
            {/* Left: Toi Et Moi */}
            <div className="scroll-reveal flex flex-col items-start lg:pr-24 lg:pb-24 group">
              <div 
                className="image-mask-square w-full aspect-square bg-[#FFFFFF] border border-[#1A0507] p-8 shadow-xl relative overflow-hidden mb-10"
                onMouseEnter={() => { setCursorVariant("explore"); setCursorText("VIEW"); }}
                onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
              >
                <div className="w-full h-full bg-[#1A0507]/5 flex items-center justify-center group-hover:bg-[#5A1217]/10 transition-colors duration-700">
                  <span className="font-serif text-2xl text-[#1A0507]/20 italic">Toi Et Moi Image</span>
                </div>
              </div>
              <div className="flex flex-col border-l-2 border-[#D4AF37] pl-6">
                <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-2">{collectionData.pieces[0].type}</span>
                <h3 className="font-serif text-3xl text-[#1A0507] uppercase tracking-widest mb-4">{collectionData.pieces[0].name}</h3>
                <p className="font-sans text-[10px] tracking-widest leading-loose uppercase text-[#1A0507]/60 max-w-sm mb-4">
                  {collectionData.pieces[0].description}
                </p>
                <span className="font-sans text-[8px] tracking-widest uppercase text-[#5A1217] font-bold">{collectionData.pieces[0].materials}</span>
              </div>
            </div>

            {/* Right: Currents of Connection (Offset Down) */}
            <div className="scroll-reveal flex flex-col items-start lg:items-end lg:pl-24 lg:pt-24 lg:mt-32 group">
              <div 
                className="image-mask-square w-full aspect-square bg-[#FFFFFF] border border-[#1A0507] p-8 shadow-xl relative overflow-hidden mb-10"
                onMouseEnter={() => { setCursorVariant("explore"); setCursorText("VIEW"); }}
                onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
              >
                <div className="w-full h-full bg-[#1A0507]/5 flex items-center justify-center group-hover:bg-[#004B49]/10 transition-colors duration-700">
                  <span className="font-serif text-2xl text-[#1A0507]/20 italic">Currents Image</span>
                </div>
              </div>
              <div className="flex flex-col border-l-2 lg:border-l-0 lg:border-r-2 border-[#D4AF37] pl-6 lg:pl-0 lg:pr-6 text-left lg:text-right">
                <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-2">{collectionData.pieces[1].type}</span>
                <h3 className="font-serif text-3xl text-[#1A0507] uppercase tracking-widest mb-4">{collectionData.pieces[1].name}</h3>
                <p className="font-sans text-[10px] tracking-widest leading-loose uppercase text-[#1A0507]/60 max-w-sm mb-4 lg:ml-auto">
                  {collectionData.pieces[1].description}
                </p>
                <span className="font-sans text-[8px] tracking-widest uppercase text-[#5A1217] font-bold">{collectionData.pieces[1].materials}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SET 2: Time & Harmony (Watches) - High Contrast Retro Mode */}
        <div className="w-full bg-[#1A0507] text-[#F5F3EC] py-32 px-6 md:px-12 mb-48 border-y border-[#D4AF37]/30">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="text-center mb-24 scroll-reveal">
              <h2 className="font-serif text-5xl md:text-7xl text-[#F5F3EC] uppercase tracking-widest mb-6">Structural Time</h2>
              <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              
              {/* Twin Blooms */}
              <div className="md:col-span-7 flex flex-col scroll-reveal">
                <div className="w-full aspect-[16/9] bg-[#2A090D] border border-[#D4AF37]/20 flex items-center justify-center mb-8 relative group overflow-hidden cursor-pointer"
                  onMouseEnter={() => { setCursorVariant("explore"); setCursorText("VIEW"); }}
                  onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="font-serif text-2xl text-[#F5F3EC]/30 italic">Twin Blooms Image</span>
                </div>
                <div className="flex justify-between items-start">
                  <div className="max-w-md">
                    <h3 className="font-serif text-3xl text-[#D4AF37] uppercase tracking-widest mb-4">{collectionData.pieces[2].name}</h3>
                    <p className="font-sans text-[10px] tracking-widest leading-loose uppercase text-[#F5F3EC]/70">
                      {collectionData.pieces[2].description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#F5F3EC]/40 block mb-2">{collectionData.pieces[2].type}</span>
                    <span className="font-sans text-[8px] tracking-widest uppercase text-[#D4AF37] block max-w-[100px]">{collectionData.pieces[2].materials}</span>
                  </div>
                </div>
              </div>

              {/* Temporal Flow */}
              <div className="md:col-span-5 flex flex-col scroll-reveal md:mt-32">
                <div className="w-full aspect-square bg-[#2A090D] border border-[#004B49]/40 flex items-center justify-center mb-8 relative group overflow-hidden cursor-pointer"
                  onMouseEnter={() => { setCursorVariant("explore"); setCursorText("VIEW"); }}
                  onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#004B49]/10 to-transparent translate-y-full group-hover:-translate-y-full transition-transform duration-1000" />
                  <span className="font-serif text-2xl text-[#F5F3EC]/30 italic">Temporal Flow Image</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#F5F3EC]/40 block mb-2">{collectionData.pieces[3].type}</span>
                  <h3 className="font-serif text-3xl text-[#D4AF37] uppercase tracking-widest mb-4">{collectionData.pieces[3].name}</h3>
                  <p className="font-sans text-[10px] tracking-widest leading-loose uppercase text-[#F5F3EC]/70 mb-4">
                    {collectionData.pieces[3].description}
                  </p>
                  <span className="font-sans text-[8px] tracking-widest uppercase text-[#004B49] font-bold">{collectionData.pieces[3].materials}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SET 3 & 4: Pendants & Earrings (Strict Grid Table Layout) */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-40">
          <div className="text-center mb-24 scroll-reveal">
            <h2 className="font-serif text-5xl md:text-7xl text-[#1A0507] uppercase tracking-widest mb-6">Pendants & Earrings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t-2 border-[#1A0507]">
            
            {[collectionData.pieces[4], collectionData.pieces[5], collectionData.pieces[6], collectionData.pieces[7]].map((piece, i) => (
              <div key={piece.id} className={cn(
                "flex flex-col border-b-2 border-[#1A0507] p-8 md:p-12 scroll-reveal group",
                i % 2 === 0 ? "md:border-r-2 border-[#1A0507]" : ""
              )}>
                <div className="flex justify-between items-start mb-12">
                  <span className="font-serif text-5xl text-[#D4AF37]/30">0{i+5}</span>
                  <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#1A0507] border border-[#1A0507] px-3 py-1">
                    {piece.type}
                  </span>
                </div>
                
                <div 
                  className="w-full aspect-[4/3] bg-[#FFFFFF] border border-[#D4AF37]/30 flex items-center justify-center mb-10 overflow-hidden cursor-pointer shadow-sm group-hover:shadow-xl transition-shadow duration-500"
                  onMouseEnter={() => { setCursorVariant("explore"); setCursorText("VIEW"); }}
                  onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
                >
                  <span className="font-serif text-[#1A0507]/20 italic group-hover:scale-110 transition-transform duration-700">{piece.name} Image</span>
                </div>

                <h3 className="font-serif text-3xl text-[#1A0507] uppercase tracking-widest mb-4">{piece.name}</h3>
                <p className="font-sans text-[10px] tracking-widest leading-loose uppercase text-[#1A0507]/70 mb-6 flex-grow">
                  {piece.description}
                </p>
                <div className="w-full h-[1px] bg-[#D4AF37]/30 mb-4" />
                <span className="font-sans text-[8px] tracking-widest uppercase text-[#5A1217] font-bold">{piece.materials}</span>
              </div>
            ))}

          </div>
        </div>

        {/* SET 5: Nature Structured (Large Bottom Stack) */}
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 text-center border-t border-[#D4AF37]/20 pt-32">
          <span className="font-sans text-[10px] tracking-[0.6em] text-[#D4AF37] uppercase mb-6 block">Structured Nature</span>
          
          <div className="flex flex-col gap-32 mt-24">
            
            {/* Serpentine Leaf */}
            <div className="scroll-reveal flex flex-col md:flex-row items-center gap-12 group">
              <div 
                className="w-full md:w-1/2 aspect-square bg-[#FFFFFF] border border-[#004B49]/30 flex items-center justify-center shadow-lg relative overflow-hidden"
                onMouseEnter={() => { setCursorVariant("explore"); setCursorText("VIEW"); }}
                onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
              >
                <div className="absolute inset-0 bg-[#004B49]/5 transition-transform duration-1000 group-hover:scale-105" />
                <span className="font-serif text-2xl text-[#1A0507]/30 italic relative z-10">Serpentine Leaf Image</span>
              </div>
              <div className="w-full md:w-1/2 text-left md:pl-12 border-l border-[#D4AF37]/30">
                <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-4 block">{collectionData.pieces[8].type}</span>
                <h3 className="font-serif text-4xl md:text-5xl text-[#1A0507] uppercase tracking-widest mb-6 leading-tight">{collectionData.pieces[8].name}</h3>
                <p className="font-sans text-xs tracking-widest leading-loose uppercase text-[#1A0507]/70 mb-8 max-w-md">
                  {collectionData.pieces[8].description}
                </p>
                <span className="font-sans text-[9px] tracking-widest uppercase text-[#004B49] font-bold bg-[#004B49]/5 px-4 py-2 border border-[#004B49]/20 inline-block">{collectionData.pieces[8].materials}</span>
              </div>
            </div>

            {/* Golden Plume */}
            <div className="scroll-reveal flex flex-col md:flex-row-reverse items-center gap-12 group">
              <div 
                className="w-full md:w-1/2 aspect-square bg-[#FFFFFF] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg relative overflow-hidden"
                onMouseEnter={() => { setCursorVariant("explore"); setCursorText("VIEW"); }}
                onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
              >
                <div className="absolute inset-0 bg-[#D4AF37]/10 transition-transform duration-1000 group-hover:scale-105" />
                <span className="font-serif text-2xl text-[#1A0507]/30 italic relative z-10">Golden Plume Image</span>
              </div>
              <div className="w-full md:w-1/2 text-right md:pr-12 border-r border-[#D4AF37]/30">
                <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-4 block">{collectionData.pieces[9].type}</span>
                <h3 className="font-serif text-4xl md:text-5xl text-[#1A0507] uppercase tracking-widest mb-6 leading-tight">{collectionData.pieces[9].name}</h3>
                <p className="font-sans text-xs tracking-widest leading-loose uppercase text-[#1A0507]/70 mb-8 max-w-md ml-auto">
                  {collectionData.pieces[9].description}
                </p>
                <span className="font-sans text-[9px] tracking-widest uppercase text-[#D4AF37] font-bold bg-[#D4AF37]/5 px-4 py-2 border border-[#D4AF37]/50 inline-block">{collectionData.pieces[9].materials}</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 4. NEXT DESTINATION (CTA) */}
      {/* ------------------------------------------------------------------------ */}
      <section className="w-full h-[60vh] flex flex-col items-center justify-center text-center px-6 relative bg-[#1A0507] text-[#F5F3EC] border-t border-[#D4AF37]/30 overflow-hidden">
        
        {/* Abstract Background for CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw]">
             <rect x="20" y="20" width="60" height="60" fill="none" stroke="#D4AF37" strokeWidth="0.1" className="animate-[spin_40s_linear_infinite]" />
             <rect x="30" y="30" width="40" height="40" fill="none" stroke="#D4AF37" strokeWidth="0.2" className="animate-[spin_30s_linear_infinite_reverse]" />
          </svg>
        </div>

        <span className="scroll-reveal font-sans text-[9px] tracking-[0.6em] uppercase text-[#D4AF37] mb-8">End of Exhibition</span>
        <h2 className="scroll-reveal font-serif text-4xl md:text-6xl text-[#F5F3EC] mb-16 relative z-10 tracking-tight">
          Continue Exploring
        </h2>
        
        <a href="/collections" className="scroll-reveal group relative inline-flex items-center justify-center px-12 py-5 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-sans text-[10px] tracking-[0.5em] uppercase transition-all duration-700 hover:text-[#1A0507] overflow-hidden">
          <span className="absolute inset-0 w-full h-full -translate-x-full bg-[#D4AF37] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
          <span className="relative z-10 flex items-center font-bold">
            All Collections 
            <span className="ml-6 text-xl leading-none transition-transform duration-500 group-hover:translate-x-4">→</span>
          </span>
        </a>
      </section>

      <Footer />
    </div>
  );
}