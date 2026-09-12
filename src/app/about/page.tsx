"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";
import Footer from "../../components/layout/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ------------------------------------------------------------------------
// THE 8 DIRECTIONS DATA
// ------------------------------------------------------------------------
const eightDirections = [
  {
    id: 1,
    title: "Dance",
    emoji: "💃",
    angle: -45, // Top Right
    primaryText: "Dance makes me feel free, energetic and completely myself; I love expressing my emotions through movement.",
    secondaryText: "As a jewellery designer, I see the same movement and rhythm in flowing forms, curves and designs that feel alive.",
    visualConcept: "flowing curved lines, soft trails, movement paths"
  },
  {
    id: 2,
    title: "Talking to People",
    emoji: "🗣️",
    angle: 0, // Right
    primaryText: "I love talking to people because every person has a different personality, story and way of seeing the world, and I enjoy understanding that.",
    secondaryText: "As a jewellery designer, these different personalities inspire me to create designs that connect with different people and their individual identities.",
    visualConcept: "tiny words, subtle lines, fragments of thoughts"
  },
  {
    id: 3,
    title: "Travel",
    emoji: "✈️",
    angle: 45, // Bottom Right
    primaryText: "Travelling makes me feel curious, excited and free; I love discovering new places, cultures, colours and ways of life.",
    secondaryText: "As a jewellery designer, I take inspiration from these experiences and translate cultures, architecture, nature and traditions into my designs.",
    visualConcept: "abstract landscape, architecture, patterns"
  },
  {
    id: 4,
    title: "Finance",
    emoji: "💰",
    angle: 90, // Bottom
    primaryText: "I find finance interesting because I enjoy understanding how money, value and decisions work, and it makes me feel independent and practical.",
    secondaryText: "As a jewellery designer, it helps me look beyond creativity and understand the value, costing, materials, pricing and business side of jewellery.",
    visualConcept: "balance, proportion, subtle geometric elements"
  },
  {
    id: 5,
    title: "Cooking",
    emoji: "🍳",
    angle: 135, // Bottom Left
    primaryText: "I enjoy cooking because I love experimenting, mixing different things and creating something of my own.",
    secondaryText: "As a jewellery designer, I relate this to combining different metals, stones, forms and details to create one balanced design.",
    visualConcept: "ingredients floating, mixing, combining"
  },
  {
    id: 6,
    title: "Styling Myself",
    emoji: "👗",
    angle: 180, // Left
    primaryText: "Styling myself is something I genuinely enjoy because it lets me play with my personality, experiment with looks and feel confident.",
    secondaryText: "As a jewellery designer, I see jewellery as an extension of personal style—something that adds identity and tells a story about the person wearing it.",
    visualConcept: "silhouette-like shapes, fabric movement, layers"
  },
  {
    id: 7,
    title: "Art",
    emoji: "🎨",
    angle: 225, // Top Left
    primaryText: "Art makes me happy because I love creating something from my imagination and seeing my ideas take shape.",
    secondaryText: "As a jewellery designer, I express that creativity through shapes, colours, textures and unique jewellery concepts.",
    visualConcept: "sketch fragments, abstract shapes, line drawings"
  },
  {
    id: 8,
    title: "North Star",
    emoji: "⭐",
    angle: -90, // Top
    primaryText: "Whenever I think of the North Star, I think of having something that guides me and reminds me where I want to go.",
    secondaryText: "As a jewellery designer, it represents having my own creative direction and vision, instead of simply following trends.",
    visualConcept: "one small star, subtle movement, finding my own direction"
  }
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hero Compass Refs
  const compassNeedleRef = useRef<HTMLDivElement>(null);
  const compassRingRef = useRef<HTMLDivElement>(null);

  // EIGHT DIRECTIONS INTERACTIVE COMPASS REFS & STATE
  const eightCompassNeedleRef = useRef<HTMLDivElement>(null);
  const eightCompassContainerRef = useRef<HTMLDivElement>(null);
  const [activeDirection, setActiveDirection] = useState<number | null>(null);
  const [isExplored, setIsExplored] = useState(false);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal
      gsap.fromTo(
        ".hero-reveal",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out" }
      );

      // 2. Idle Compass Breathing & Ring Rotation (Hero)
      gsap.to(compassRingRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none"
      });

      // 3. THE EIGHT DIRECTIONS INTRO (Cinematic Reveal)
      gsap.fromTo(".eight-intro-text", 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.2, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".eight-intro-section",
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 4. Staggered Text Animations on Scroll (General)
      const scrollTexts = gsap.utils.toArray(".scroll-text-reveal");
      scrollTexts.forEach((text: any) => {
        gsap.fromTo(
          text,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 5. Parallax Image Reveals (General)
      const images = gsap.utils.toArray(".compass-image-mask");
      images.forEach((img: any) => {
        gsap.fromTo(
          img,
          { clipPath: "circle(0% at 50% 50%)" },
          {
            clipPath: "circle(50% at 50% 50%)",
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: img,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);

    // Interactive Magnetic Compass Needle (Mouse Tracking on Hero)
    const rotateNeedle = gsap.quickTo(compassNeedleRef.current, "rotation", { duration: 0.5, ease: "power3.out" });
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!compassNeedleRef.current) return;
      const rect = compassNeedleRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI) + 90;
      rotateNeedle(angle);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // ------------------------------------------------------------------------
  // EIGHT DIRECTIONS INTERACTION LOGIC (Hover & Click ONLY)
  // ------------------------------------------------------------------------
  const handleDirectionHover = (id: number, angle: number) => {
    if (isExplored) return; // Freeze compass needle if a card is open
    setActiveDirection(id);
    gsap.to(eightCompassNeedleRef.current, { rotation: angle + 90, duration: 0.6, ease: "back.out(1.5)" });
  };

  const handleDirectionLeave = () => {
    if (isExplored) return;
    setActiveDirection(null);
  };

  const handleDirectionClick = (id: number) => {
    setIsExplored(true);
    setActiveDirection(id);
    // Expand the world: Fade back the compass ring slightly and open the specific detail card
    gsap.to(eightCompassContainerRef.current, { scale: 1.05, opacity: 0.2, duration: 1, ease: "power3.inOut" });
    gsap.to(`.dir-detail-${id}`, { opacity: 1, scale: 1, pointerEvents: "auto", duration: 0.8, delay: 0.2, ease: "power3.out" });
  };

  const closeExploration = (id: number) => {
    setIsExplored(false);
    // Close the card and bring the compass back to full visibility
    gsap.to(`.dir-detail-${id}`, { opacity: 0, scale: 0.95, pointerEvents: "none", duration: 0.5 });
    gsap.to(eightCompassContainerRef.current, { scale: 1, opacity: 1, duration: 1, ease: "power3.inOut" });
    setActiveDirection(null);
  };

  return (
    <div ref={containerRef} className="w-full bg-luxury-paper text-luxury-charcoal overflow-hidden pt-24 selection:bg-luxury-burgundy selection:text-luxury-paper">
      
      {/* ------------------------------------------------------------------------ */}
      {/* 1. HERO SECTION: DISHA = DIRECTION */}
      {/* ------------------------------------------------------------------------ */}
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24">
        
        {/* Left: Typography */}
        <div className="relative z-10 w-full lg:w-1/2 pt-20 lg:pt-0 flex flex-col justify-center">
          <h1 className="hero-reveal font-serif text-7xl md:text-[9rem] lg:text-[11rem] leading-none text-luxury-burgundy uppercase tracking-tight mb-6">
            Disha
          </h1>
          <p className="hero-reveal font-sans text-lg md:text-xl tracking-[0.3em] uppercase text-luxury-gold mb-12">
            Finding direction through design.
          </p>
          <p className="hero-reveal font-serif text-2xl md:text-3xl italic text-luxury-charcoal/70 max-w-lg border-l border-luxury-gold/50 pl-6">
            "Every piece begins as a story — quietly told, carefully cut."
          </p>
        </div>

        {/* Right: The Interactive Luxury Compass */}
        <div className="relative w-full lg:w-1/2 h-[60vh] lg:h-screen flex items-center justify-center pointer-events-none mt-12 lg:mt-0">
          <div className="relative w-[80vw] h-[80vw] max-w-[500px] max-h-[500px]">
            
            {/* Compass Rings */}
            <div ref={compassRingRef} className="absolute inset-0 rounded-full border-[1px] border-luxury-gold/30 flex items-center justify-center shadow-[inset_0_0_60px_rgba(90,18,23,0.05)]">
              <div className="w-[90%] h-[90%] rounded-full border-[1px] border-luxury-charcoal/10 border-dashed" />
              <div className="absolute w-[80%] h-[80%] rounded-full border-[0.5px] border-luxury-burgundy/20 flex items-center justify-center">
                <svg className="w-full h-full opacity-30" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 3" />
                </svg>
              </div>
            </div>

            {/* Cardinal Directions */}
            <div className="absolute inset-0 flex items-center justify-center font-serif text-luxury-burgundy text-xl">
              <span className="absolute top-2 left-1/2 -translate-x-1/2">N</span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2">S</span>
              <span className="absolute right-4 top-1/2 -translate-y-1/2">E</span>
              <span className="absolute left-4 top-1/2 -translate-y-1/2">W</span>
            </div>
            
            {/* Hover Direction Labels */}
            <div className="absolute inset-0 font-sans text-[0.6rem] tracking-[0.4em] text-luxury-gold uppercase opacity-60">
              <span className="absolute top-10 left-1/2 -translate-x-1/2">Vision</span>
              <span className="absolute bottom-10 left-1/2 -translate-x-1/2">Craft</span>
              <span className="absolute right-12 top-1/2 -translate-y-1/2 origin-left -rotate-90">Curiosity</span>
              <span className="absolute left-10 top-1/2 -translate-y-1/2 origin-right rotate-90">Story</span>
            </div>

            {/* The Needle */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div ref={compassNeedleRef} className="relative w-8 h-[70%]">
                <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-xl overflow-visible">
                  <polygon points="50,0 60,100 50,110 40,100" fill="#5A1217" />
                  <polygon points="50,200 60,100 50,110 40,100" fill="#D4AF37" />
                  <circle cx="50" cy="105" r="8" fill="#F5F3EC" stroke="#5A1217" strokeWidth="2" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 2. THE EIGHT DIRECTIONS INTRO */}
      {/* ------------------------------------------------------------------------ */}
      <section className="eight-intro-section w-full min-h-[50vh] bg-[#FAF8F5] flex flex-col items-center justify-center text-center px-6 transition-colors duration-1000 relative overflow-hidden border-t border-luxury-gold/20">
        <div className="w-[1px] h-24 bg-luxury-burgundy mb-12 origin-top scale-y-0 animate-[scaleY_1s_ease-out_forwards]" />
        
        <h2 className="font-serif text-5xl md:text-8xl lg:text-9xl text-luxury-burgundy uppercase tracking-tighter leading-[0.85] flex flex-col">
          <span className="eight-intro-text">The</span>
          <span className="eight-intro-text ml-8 md:ml-16">Eight</span>
          <span className="eight-intro-text ml-16 md:ml-32">Directions</span>
          <span className="eight-intro-text text-luxury-gold italic">Of Me</span>
        </h2>

        <p className="eight-intro-text font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-luxury-charcoal/60 mt-16 max-w-lg border-l border-luxury-gold/50 pl-6">
          Every direction I follow leaves something behind in the way I create.
        </p>
      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 3. THE INTERACTIVE EIGHT COMPASS (HOVER & CLICK ONLY) */}
      {/* ------------------------------------------------------------------------ */}
      <section className="relative w-full h-screen min-h-[800px] bg-[#FAF8F5] flex items-center justify-center overflow-hidden border-b border-luxury-gold/20">
        
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none opacity-50">
           <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-luxury-burgundy block mb-2">Interactive Journey</span>
           <span className="font-serif italic text-luxury-charcoal/60">Hover and click to explore</span>
        </div>

        {/* The Main Compass Ring & Nodes */}
        <div ref={eightCompassContainerRef} className="relative w-[90vw] h-[90vw] md:w-[70vh] md:h-[70vh] max-w-[700px] max-h-[700px]">
          
          {/* Connecting lines drawing from center */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#5A1217" strokeWidth="0.1" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="#5A1217" strokeWidth="0.1" />
            <line x1="50" y1="5" x2="50" y2="95" stroke="#5A1217" strokeWidth="0.1" />
            <line x1="18" y1="18" x2="82" y2="82" stroke="#5A1217" strokeWidth="0.1" />
            <line x1="18" y1="82" x2="82" y2="18" stroke="#5A1217" strokeWidth="0.1" />
          </svg>

          {/* Center Title (Disha) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-20 pointer-events-none">
            <span className="font-serif text-3xl md:text-4xl text-luxury-burgundy uppercase tracking-widest bg-[#FAF8F5] px-6 py-3 border border-luxury-gold/30 rounded-full shadow-sm">
              Disha
            </span>
          </div>

          {/* Dynamic Needle pointing to hovered item */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none opacity-40">
            <div ref={eightCompassNeedleRef} className="relative w-1 h-[90%] transition-transform">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1/2 bg-luxury-burgundy" />
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1/2 bg-luxury-gold" />
            </div>
          </div>

          {/* Placed Nodes (Hover/Click triggers) */}
          {eightDirections.map((dir) => {
            const radians = (dir.angle - 90) * (Math.PI / 180);
            const radius = 46; // Distance from center
            const x = 50 + radius * Math.cos(radians);
            const y = 50 + radius * Math.sin(radians);
            const isActive = activeDirection === dir.id;

            return (
              <div 
                key={dir.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                style={{ left: `${x}%`, top: `${y}%` }}
                onMouseEnter={() => handleDirectionHover(dir.id, dir.angle)}
                onMouseLeave={handleDirectionLeave}
                onClick={() => handleDirectionClick(dir.id)}
                data-cursor="EXPLORE"
              >
                <div className={cn(
                  "flex flex-col items-center justify-center transition-all duration-500",
                  isActive ? "scale-125 opacity-100" : "opacity-60 hover:opacity-100 scale-100",
                  isExplored && !isActive && "opacity-0 pointer-events-none" // Hide others when one is open
                )}>
                  <span className="text-3xl mb-2 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110 drop-shadow-md">
                    {dir.emoji}
                  </span>
                  <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-luxury-charcoal bg-[#FAF8F5]/90 px-3 py-1.5 border border-luxury-gold/20 rounded shadow-sm whitespace-nowrap">
                    0{dir.id} — {dir.title}
                  </span>
                  {/* Glowing dot linking to center */}
                  <div className={cn(
                    "mt-3 w-1.5 h-1.5 rounded-full transition-all duration-300",
                    isActive ? "bg-luxury-burgundy shadow-[0_0_12px_rgba(90,18,23,0.6)] scale-150" : "bg-luxury-gold/50"
                  )} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------------------------------------ */}
        {/* CLICKED DETAIL OVERLAYS (Shown only when a node is clicked) */}
        {/* ------------------------------------------------------------------------ */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-40">
          {eightDirections.map((dir) => (
            <div 
              key={`detail-${dir.id}`} 
              className={`dir-detail-${dir.id} absolute w-[90%] max-w-2xl bg-white/95 backdrop-blur-xl shadow-2xl p-8 md:p-16 rounded-[2rem] border border-luxury-gold/30 opacity-0 scale-95 pointer-events-none transition-all flex flex-col items-center text-center`}
            >
              <button 
                onClick={() => closeExploration(dir.id)}
                className="absolute top-6 right-8 font-sans text-xs tracking-[0.3em] uppercase text-luxury-charcoal/40 hover:text-luxury-burgundy transition-colors"
                data-cursor="CLICK"
              >
                Close ×
              </button>
              
              <span className="text-5xl mb-6">{dir.emoji}</span>
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-luxury-gold mb-4">Direction 0{dir.id}</span>
              <h3 className="font-serif text-4xl md:text-5xl text-luxury-burgundy uppercase tracking-widest mb-10">
                {dir.title}
              </h3>
              
              <p className="font-serif text-xl md:text-2xl leading-relaxed text-luxury-charcoal mb-10 italic">
                "{dir.primaryText}"
              </p>
              
              <div className="w-full bg-luxury-burgundy/5 rounded-xl p-6 md:p-8 border border-luxury-gold/20 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 font-sans text-[8px] tracking-[0.4em] uppercase text-luxury-burgundy border border-luxury-gold/20 rounded-full py-1">
                  The Jewellery Connection
                </span>
                <p className="font-sans text-xs md:text-sm tracking-widest leading-loose uppercase text-luxury-charcoal/80 mt-4">
                  {dir.secondaryText}
                </p>
              </div>

              <div className="mt-8 opacity-40 font-sans text-[8px] tracking-[0.5em] uppercase text-luxury-gold">
                Conceptual Lens: {dir.visualConcept}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 4. FINAL SUMMARY */}
      {/* ------------------------------------------------------------------------ */}
      <section className="w-full h-screen bg-luxury-burgundy text-luxury-paper flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        {/* Faint connecting lines drawing to center */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="0.1" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line 
              key={angle}
              x1="50" y1="50" 
              x2={50 + 45 * Math.cos(angle * Math.PI / 180)} 
              y2={50 + 45 * Math.sin(angle * Math.PI / 180)} 
              stroke="#D4AF37" strokeWidth="0.1" strokeDasharray="1 1" 
            />
          ))}
        </svg>

        <h2 className="scroll-text-reveal font-serif text-7xl md:text-9xl tracking-tighter uppercase mb-8 relative z-10">
          Disha
        </h2>
        <div className="scroll-text-reveal flex flex-col items-center space-y-4 relative z-10">
          <span className="font-sans text-xs tracking-[0.5em] uppercase text-luxury-paper/50">Eight Directions.</span>
          <div className="w-[1px] h-12 bg-luxury-gold/50" />
          <span className="font-sans text-sm tracking-[0.4em] uppercase text-luxury-gold">One Creative Direction.</span>
        </div>
      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 5. PERSONAL INTRO (Circular Editorial Layout) */}
      {/* ------------------------------------------------------------------------ */}
      <section className="w-full py-32 px-6 md:px-12 lg:px-24 bg-luxury-paper border-t border-luxury-gold/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="compass-image-mask relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border border-luxury-gold/30 p-4" data-cursor="VIEW">
              <div className="w-full h-full rounded-full bg-luxury-burgundy/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-luxury-charcoal/5" />
                <span className="font-serif text-luxury-burgundy/30 text-2xl italic">Portrait</span>
              </div>
              <svg className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite] opacity-30" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="49" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="scroll-text-reveal font-sans text-sm tracking-[0.5em] text-luxury-gold uppercase mb-8">
              Hi, I'm Disha.
            </h2>
            <p className="scroll-text-reveal font-serif text-3xl md:text-5xl leading-tight text-luxury-burgundy mb-8">
              A jewellery designer who believes every piece tells a story.
            </p>
            <p className="scroll-text-reveal font-sans text-lg text-luxury-charcoal/70 leading-relaxed font-light max-w-xl">
              I focus on turning those stories into beautiful, wearable jewellery through precise CAD and manual design, grounded in thoughtful craftsmanship.
            </p>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 6. CREATIVE JOURNEY TIMELINE (Plotted Route) */}
      {/* ------------------------------------------------------------------------ */}
      <section className="w-full py-40 px-6 relative overflow-hidden bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto">
          <h2 className="scroll-text-reveal font-serif text-4xl text-center text-luxury-burgundy mb-32 uppercase tracking-widest">The Plotted Route</h2>
          
          <div className="relative border-l border-luxury-gold/30 ml-4 md:mx-auto md:w-px">
            
            {[
              { year: "2023–2026", title: "Bachelor's in Accounting and Finance (BAF)", org: "KC College, Mumbai" },
              { year: "2024", title: "Certificate in CAD Jewellery Design", org: "JK Diamonds Institute" },
              { year: "2024", title: "Professional Jewellery Designing (Manual)", org: "Gautam Banerjee's Academy" },
              { year: "JAN 2025 — MAR 2025", title: "Jewellery Designer Internship", org: "The House of Silver Emporium" },
              { year: "SEP 2025 — NOV 2025", title: "Jewellery Designer & Stylist Internship", org: "Zahairaa" },
            ].map((item, index) => (
              <div key={index} className="scroll-text-reveal relative pl-12 md:pl-0 mb-20 md:w-1/2 md:even:ml-auto md:odd:pr-16 md:even:pl-16 md:odd:text-right flex flex-col md:even:items-start md:odd:items-end">
                <div className="absolute left-[-5px] md:left-auto md:odd:-right-[6px] md:even:-left-[6px] top-2 w-3 h-3 rounded-full bg-luxury-burgundy ring-4 ring-luxury-paper" />
                
                <span className="font-sans text-xs tracking-[0.3em] text-luxury-gold uppercase mb-2">{item.year}</span>
                <h3 className="font-serif text-2xl text-luxury-charcoal mb-2">{item.title}</h3>
                <p className="font-sans text-sm uppercase tracking-wider text-luxury-charcoal/50">{item.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 7. DESTINATION (CTA) */}
      {/* ------------------------------------------------------------------------ */}
      <section className="w-full h-[60vh] flex flex-col items-center justify-center text-center px-6 relative bg-luxury-paper border-t border-luxury-gold/10">
        <div className="w-[1px] h-32 bg-luxury-gold/50 mb-12" />
        <h2 className="scroll-text-reveal font-serif text-3xl md:text-5xl text-luxury-charcoal mb-12">
          You've found the direction.
        </h2>
        <a 
          href="/collections" 
          data-cursor="CLICK"
          className="scroll-text-reveal group relative inline-flex items-center justify-center px-12 py-4 border border-luxury-burgundy text-luxury-burgundy font-sans text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:text-luxury-paper overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full -translate-x-full bg-luxury-burgundy group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 flex items-center">
            Explore the Collections <span className="ml-4 text-lg leading-none transition-transform group-hover:translate-x-2">→</span>
          </span>
        </a>
      </section>

      <Footer />
    </div>
  );
}