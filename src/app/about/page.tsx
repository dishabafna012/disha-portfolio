"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";
import Footer from "../../components/layout/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Compass Refs
  const compassNeedleRef = useRef<HTMLDivElement>(null);
  const compassRingRef = useRef<HTMLDivElement>(null);
  
  // SVG Route Refs
  const routePathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal
      gsap.fromTo(
        ".hero-reveal",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out" }
      );

      // 2. Idle Compass Breathing & Ring Rotation
      gsap.to(compassRingRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none"
      });

      // 3. Scroll Journey (My Direction) Route Drawing
      if (routePathRef.current) {
        const length = routePathRef.current.getTotalLength();
        gsap.set(routePathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(routePathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".journey-section",
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        });
      }

      // 4. Staggered Text Animations on Scroll
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

      // 5. Parallax Image Reveals
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

    // 6. Interactive Magnetic Compass Needle (Mouse Tracking)
    const rotateNeedle = gsap.quickTo(compassNeedleRef.current, "rotation", { duration: 0.5, ease: "power3.out" });
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!compassNeedleRef.current) return;
      const rect = compassNeedleRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate angle in degrees
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI) + 90;
      rotateNeedle(angle);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-luxury-paper text-luxury-charcoal overflow-hidden pt-24 selection:bg-luxury-burgundy selection:text-luxury-paper">
      
      {/* 1. HERO SECTION: DISHA = DIRECTION */}
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
                {/* Degree Markings */}
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
                  {/* Top Half (Burgundy) */}
                  <polygon points="50,0 60,100 50,110 40,100" fill="#5A1217" />
                  {/* Bottom Half (Gold) */}
                  <polygon points="50,200 60,100 50,110 40,100" fill="#D4AF37" />
                  {/* Center Gem Pivot */}
                  <circle cx="50" cy="105" r="8" fill="#F5F3EC" stroke="#5A1217" strokeWidth="2" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MY DIRECTION (Scrolling Conceptual Route) */}
      <section className="journey-section relative w-full py-32 px-6 flex flex-col items-center">
        <h2 className="scroll-text-reveal font-serif text-4xl md:text-5xl text-luxury-charcoal uppercase tracking-widest mb-6">
          My Direction
        </h2>
        <p className="scroll-text-reveal font-sans text-sm md:text-base tracking-widest text-luxury-burgundy/80 uppercase text-center max-w-2xl mb-24">
          I believe jewellery is more than an object. It is a story translated into form.
        </p>

        {/* Visual Route */}
        <div className="relative w-full max-w-sm h-[600px] flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 500" preserveAspectRatio="xMidYMid meet">
            <path 
              ref={routePathRef}
              d="M50,0 C80,100 20,200 50,300 C80,400 20,450 50,500" 
              fill="none" 
              stroke="#D4AF37" 
              strokeWidth="1.5" 
              className="opacity-40"
            />
          </svg>
          
          <div className="absolute h-full w-full flex flex-col justify-between items-center py-8 font-serif text-2xl text-luxury-burgundy italic">
            <span className="scroll-text-reveal bg-luxury-paper px-4">Story</span>
            <span className="scroll-text-reveal bg-luxury-paper px-4 translate-x-12">Idea</span>
            <span className="scroll-text-reveal bg-luxury-paper px-4 -translate-x-12">Sketch</span>
            <span className="scroll-text-reveal bg-luxury-paper px-4 translate-x-8">Form</span>
            <span className="scroll-text-reveal bg-luxury-paper px-4 text-3xl font-normal uppercase text-luxury-charcoal mt-10">Jewellery</span>
          </div>
        </div>
      </section>

      {/* 3. PERSONAL INTRO (Circular Editorial Layout) */}
      <section className="w-full py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="compass-image-mask relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border border-luxury-gold/30 p-4" data-cursor="VIEW">
              <div className="w-full h-full rounded-full bg-luxury-burgundy/10 flex items-center justify-center relative overflow-hidden">
                {/* Replace this div with Disha's actual <img> tag later */}
                <div className="absolute inset-0 bg-luxury-charcoal/5" />
                <span className="font-serif text-luxury-burgundy/30 text-2xl italic">Portrait</span>
              </div>
              {/* Decorative Ring */}
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

      {/* 4. THE FOUR DIRECTIONS OF ME */}
      <section className="w-full py-32 bg-luxury-burgundy/5 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="scroll-text-reveal font-serif text-4xl md:text-5xl text-luxury-charcoal uppercase tracking-widest">
              The Four Directions
            </h2>
            <div className="w-[1px] h-16 bg-luxury-gold/50 mx-auto mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
            {/* North */}
            <div className="scroll-text-reveal flex flex-col items-center md:items-start text-center md:text-left">
              <span className="font-serif text-6xl text-luxury-gold/30 mb-4">N</span>
              <h3 className="font-sans text-sm tracking-[0.4em] text-luxury-burgundy uppercase mb-4">Vision</h3>
              <p className="font-sans text-base text-luxury-charcoal/80 font-light">Where ideas begin. Creative imagination and abstract forms taking root before touching paper.</p>
            </div>
            
            {/* East */}
            <div className="scroll-text-reveal flex flex-col items-center md:items-end text-center md:text-right">
              <span className="font-serif text-6xl text-luxury-gold/30 mb-4">E</span>
              <h3 className="font-sans text-sm tracking-[0.4em] text-luxury-burgundy uppercase mb-4">Curiosity</h3>
              <p className="font-sans text-base text-luxury-charcoal/80 font-light">Looking beyond the obvious. Exploring cultures, nature, architecture, and geometric boundaries.</p>
            </div>

            {/* South (Craft / Tools) */}
            <div className="scroll-text-reveal flex flex-col items-center md:items-start text-center md:text-left">
              <span className="font-serif text-6xl text-luxury-gold/30 mb-4">S</span>
              <h3 className="font-sans text-sm tracking-[0.4em] text-luxury-burgundy uppercase mb-4">Craft</h3>
              <p className="font-sans text-base text-luxury-charcoal/80 font-light mb-6">Turning ideas into form. The technical understanding required to translate art into reality.</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {['Rhino', 'MatrixGold', '3Design', 'Blender', 'V-Ray'].map(tool => (
                  <span key={tool} className="border border-luxury-gold/30 px-4 py-2 text-xs font-sans tracking-widest uppercase text-luxury-charcoal/60 rounded-full">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* West */}
            <div className="scroll-text-reveal flex flex-col items-center md:items-end text-center md:text-right">
              <span className="font-serif text-6xl text-luxury-gold/30 mb-4">W</span>
              <h3 className="font-sans text-sm tracking-[0.4em] text-luxury-burgundy uppercase mb-4">Story</h3>
              <p className="font-sans text-base text-luxury-charcoal/80 font-light">Giving every piece a reason to exist. Infusing emotional meaning into metal and stone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CREATIVE JOURNEY TIMELINE (Plotted Route) */}
      <section className="w-full py-40 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="scroll-text-reveal font-serif text-4xl text-center text-luxury-burgundy mb-32">The Plotted Route</h2>
          
          <div className="relative border-l border-luxury-gold/30 ml-4 md:mx-auto md:w-px">
            
            {/* Timeline Items */}
            {[
              { year: "2023–2026", title: "Bachelor's in Accounting and Finance (BAF)", org: "KC College, Mumbai" },
              { year: "2024", title: "Certificate in CAD Jewellery Design", org: "JK Diamonds Institute" },
              { year: "2024", title: "Professional Jewellery Designing (Manual)", org: "Gautam Banerjee's Academy" },
              { year: "JAN 2025 — MAR 2025", title: "Jewellery Designer Internship", org: "The House of Silver Emporium" },
              { year: "SEP 2025 — NOV 2025", title: "Jewellery Designer & Stylist Internship", org: "Zahairaa" },
            ].map((item, index) => (
              <div key={index} className="scroll-text-reveal relative pl-12 md:pl-0 mb-20 md:w-1/2 md:even:ml-auto md:odd:pr-16 md:even:pl-16 md:odd:text-right flex flex-col md:even:items-start md:odd:items-end">
                {/* Compass Node Marker */}
                <div className="absolute left-[-5px] md:left-auto md:odd:-right-[6px] md:even:-left-[6px] top-2 w-3 h-3 rounded-full bg-luxury-burgundy ring-4 ring-luxury-paper" />
                
                <span className="font-sans text-xs tracking-[0.3em] text-luxury-gold uppercase mb-2">{item.year}</span>
                <h3 className="font-serif text-2xl text-luxury-charcoal mb-2">{item.title}</h3>
                <p className="font-sans text-sm uppercase tracking-wider text-luxury-charcoal/50">{item.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CINEMATIC CHAPTER BREAK */}
      <section className="w-full h-[70vh] bg-luxury-charcoal text-luxury-paper flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
        <h2 className="scroll-text-reveal font-serif text-4xl md:text-7xl uppercase tracking-widest text-luxury-paper mb-6">
          Every Direction<br/><span className="text-luxury-gold">Leads to Design.</span>
        </h2>
        <p className="scroll-text-reveal font-sans text-sm md:text-base tracking-[0.3em] uppercase text-luxury-sand/70">
          But every design begins with a question.
        </p>
      </section>

      {/* 7. JEWELLERY AS A COMPASS */}
      <section className="w-full py-40 px-6 flex flex-col items-center justify-center relative overflow-hidden">
        <h2 className="scroll-text-reveal font-serif text-3xl md:text-4xl text-luxury-burgundy mb-24 uppercase tracking-widest">
          Some Pieces Guide Us
        </h2>

        <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center" data-cursor="VIEW">
          
          {/* Outer Rotating Compass UI */}
          <div className="absolute inset-0 animate-[spin_40s_linear_infinite] border border-luxury-gold/20 rounded-full">
            <span className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-luxury-paper px-2 font-sans text-xs tracking-widest uppercase text-luxury-charcoal/60">Form</span>
            <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 bg-luxury-paper px-2 font-sans text-xs tracking-widest uppercase text-luxury-charcoal/60">Story</span>
            <span className="absolute right-[-24px] top-1/2 -translate-y-1/2 rotate-90 bg-luxury-paper px-2 font-sans text-xs tracking-widest uppercase text-luxury-charcoal/60">Material</span>
            <span className="absolute left-[-16px] top-1/2 -translate-y-1/2 -rotate-90 bg-luxury-paper px-2 font-sans text-xs tracking-widest uppercase text-luxury-charcoal/60">Motif</span>
          </div>

          {/* Central Jewellery Piece (Placeholder) */}
          <div className="compass-image-mask relative w-[70%] h-[70%] rounded-full bg-luxury-burgundy/5 flex items-center justify-center overflow-hidden shadow-2xl border border-luxury-gold/40">
            {/* Insert actual jewellery image here */}
            <div className="font-serif text-luxury-burgundy/20 italic text-2xl">Jewellery Image</div>
          </div>
        </div>
      </section>

      {/* 8. PHILOSOPHY SCROLL (Massive Typography) */}
      <section className="w-full py-32 px-6 overflow-hidden bg-luxury-burgundy text-luxury-paper">
        <div className="max-w-[1400px] mx-auto flex flex-col space-y-8">
          <h2 className="scroll-text-reveal font-serif text-5xl md:text-8xl lg:text-9xl uppercase tracking-tighter opacity-90 mix-blend-overlay">
            Every piece
          </h2>
          <h2 className="scroll-text-reveal font-serif text-5xl md:text-8xl lg:text-9xl uppercase tracking-tighter text-right text-luxury-gold">
            Begins as a story.
          </h2>
          <h2 className="scroll-text-reveal font-serif text-5xl md:text-8xl lg:text-9xl uppercase tracking-tighter opacity-90 mix-blend-overlay">
            Quietly told.
          </h2>
          <h2 className="scroll-text-reveal font-serif text-5xl md:text-8xl lg:text-9xl uppercase tracking-tighter text-right opacity-50 mix-blend-overlay">
            Carefully cut.
          </h2>
        </div>
      </section>

      {/* 9. DESTINATION (CTA) */}
      <section className="w-full h-[60vh] flex flex-col items-center justify-center text-center px-6 relative">
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

      {/* Global Footer */}
      <Footer />
    </div>
  );
}