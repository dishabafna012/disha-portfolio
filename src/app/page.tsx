"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hero Animation Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const tinyLogoRef = useRef<HTMLDivElement>(null);
  const geoRingRef = useRef<SVGSVGElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const jewelleryRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  
  // Custom Cursor Refs
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  // Transition Overlay
  const transitionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      
      // 1. PAGE LOAD TRANSITION REVEAL
      gsap.to(transitionRef.current, {
        clipPath: "circle(0% at 50% 50%)",
        duration: 1.5,
        ease: "power4.inOut",
        delay: 0.2
      });

      // 2. CINEMATIC HERO SEQUENCE (0-5 seconds)
      const tl = gsap.timeline({ delay: 0.5 });
      
      // 0-1s: Tiny DB appears
      tl.to(tinyLogoRef.current, { opacity: 1, duration: 1, ease: "power2.inOut" })
      // 1-2s: Thin circular line draws
        .to(geoRingRef.current, { opacity: 0.15, scale: 1, rotation: 180, duration: 1.5, ease: "power2.out" }, "-=0.5")
      // 2-3s: Soft light appears
        .to(lightRef.current, { opacity: 0.5, duration: 1.5, ease: "power2.inOut" }, "-=1")
      // 3-4s: Jewellery gradually emerges
        .to(jewelleryRef.current, { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }, "-=1")
      // 4-5s: Typography appears
        .to([nameRef.current, titleRef.current], { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }, "-=0.8")
        .to(quoteRef.current, { opacity: 1, duration: 1.5, ease: "power2.inOut" }, "-=0.5")
        .to(ctaRef.current, { opacity: 1, duration: 1 }, "-=1");

      // 3. STORY -> FORM HORIZONTAL SEQUENCE
      const storyNodes = gsap.utils.toArray(".story-node");
      gsap.fromTo(storyNodes, 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".story-sequence-container",
            start: "top 70%",
            end: "center center",
            scrub: 1
          }
        }
      );

      gsap.to(".story-line-fill", {
        scaleX: 1,
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: ".story-sequence-container",
          start: "top 70%",
          end: "center center",
          scrub: 1
        }
      });

      // 4. COLLECTION 02 GEOMETRY ANIMATION
      gsap.to(".abstract-geo-line", {
        scaleY: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".collection-abstract",
          start: "top 60%",
          end: "bottom bottom",
          scrub: 1
        }
      });

      // 5. CULTURAL ECHOES TRANSITION TEXT
      const cultTl = gsap.timeline({
        scrollTrigger: { trigger: ".cultural-text-sequence", start: "top 70%", end: "bottom 40%", scrub: 1 }
      });
      cultTl.to(".cult-trad", { opacity: 0, y: -20 })
            .to(".cult-mod", { opacity: 1, y: 0 }, "<")
            .to(".cult-mod", { opacity: 0, y: -20 })
            .to(".cult-fut", { opacity: 1, y: 0 }, "<");

      // 6. DIRECTION COMPASS PATH (WHERE DOES DESIGN TAKE YOU?)
      gsap.to(".direction-path", {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: ".direction-transition-section",
          start: "top 50%",
          end: "bottom 20%",
          scrub: 1
        }
      });

      // 7. FINAL STATEMENT REVEAL
      gsap.fromTo(".final-statement-line", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.3, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: ".final-section", start: "top 60%" } }
      );

    }, containerRef);

    // 8. INTERACTIVE LIGHT & CUSTOM CURSOR LOGIC
    const xLight = gsap.quickTo(lightRef.current, "x", { duration: 0.8, ease: "power3" });
    const yLight = gsap.quickTo(lightRef.current, "y", { duration: 0.8, ease: "power3" });
    const xCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
    const yCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      // Move cinematic light over jewellery
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const relX = e.clientX - rect.left - (rect.width / 2);
        const relY = e.clientY - rect.top - (rect.height / 2);
        xLight(relX * 0.5);
        yLight(relY * 0.5);
      }
      // Move custom cursor
      xCursor(e.clientX);
      yCursor(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorType = target.getAttribute('data-cursor');
      
      if (cursorType) {
        if (cursorTextRef.current) cursorTextRef.current.innerText = cursorType;
        gsap.to(cursorRef.current, { scale: 3, backgroundColor: 'rgba(212,175,55,0.9)', mixBlendMode: 'normal', duration: 0.3 });
      } else {
        if (cursorTextRef.current) cursorTextRef.current.innerText = "";
        gsap.to(cursorRef.current, { scale: 1, backgroundColor: '#F5F3EC', mixBlendMode: 'difference', duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Handle Page Exit Transition
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    gsap.to(transitionRef.current, {
      clipPath: "circle(150% at 50% 50%)",
      duration: 1.2,
      ease: "power4.inOut",
      onComplete: () => { window.location.href = path; }
    });
  };

  return (
    <div ref={containerRef} className="w-full bg-[#2A090D] text-[#F5F3EC] overflow-hidden selection:bg-[#D4AF37] selection:text-[#2A090D] cursor-none">
      
      {/* PAGE TRANSITION OVERLAY */}
      <div ref={transitionRef} className="fixed inset-0 z-[9999] bg-[#2A090D] pointer-events-none" style={{ clipPath: "circle(150% at 50% 50%)" }} />

      {/* CUSTOM CURSOR */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-[#F5F3EC] rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity">
        <span ref={cursorTextRef} className="text-[3px] font-sans text-[#2A090D] uppercase tracking-widest font-bold absolute" />
      </div>

      {/* 02 - HERO SECTION */}
      <section ref={heroRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#2A090D]">
        
        {/* Sequence: Tiny DB */}
        <div ref={tinyLogoRef} className="absolute top-1/4 opacity-0 font-serif text-[#D4AF37]/40 text-sm italic tracking-widest">
          DB.
        </div>

        {/* Sequence: Subtle Direction System */}
        <svg ref={geoRingRef} className="absolute inset-0 w-full h-full opacity-0 scale-90 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <circle cx="50" cy="50" r="35" fill="none" stroke="#D4AF37" strokeWidth="0.05" strokeDasharray="0.5 1.5" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="0.02" />
          <text x="50" y="14" fill="#D4AF37" fontSize="1" textAnchor="middle" opacity="0.4">N</text>
          <text x="50" y="87" fill="#D4AF37" fontSize="1" textAnchor="middle" opacity="0.4">S</text>
          <text x="86" y="50.3" fill="#D4AF37" fontSize="1" textAnchor="middle" opacity="0.4">E</text>
          <text x="14" y="50.3" fill="#D4AF37" fontSize="1" textAnchor="middle" opacity="0.4">W</text>
        </svg>

        {/* Sequence: Cinematic Lighting & Jewellery */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div ref={lightRef} className="absolute w-[60vw] h-[60vw] bg-radial-gradient from-[#D4AF37]/15 via-transparent to-transparent opacity-0 mix-blend-screen blur-3xl rounded-full" />
          
          <div 
            ref={jewelleryRef} 
            className="relative w-[50vw] md:w-[35vw] max-w-[500px] aspect-square opacity-0 scale-95 pointer-events-auto" 
            data-cursor="EXPLORE ↗"
          >
            {/* Using a placeholder styled as an immersive float piece. Replace src with her actual macro jewellery shot */}
            <img src="/api/placeholder/800/800" alt="Disha Bafna Fine Jewellery" className="w-full h-full object-contain drop-shadow-2xl brightness-90 contrast-125" />
          </div>
        </div>

        {/* Sequence: Typography */}
        <div className="relative z-20 flex flex-col items-center text-center mt-[40vh] md:mt-[50vh]">
          <h1 ref={nameRef} className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#F5F3EC] uppercase tracking-widest opacity-0 translate-y-10 leading-none">
            Disha<br/>Bafna
          </h1>
          <p ref={titleRef} className="font-sans text-[10px] md:text-xs tracking-[0.6em] text-[#D4AF37] uppercase mt-8 opacity-0 translate-y-4">
            Jewellery Designer
          </p>
          <p ref={quoteRef} className="font-serif italic text-lg md:text-2xl text-[#F5F3EC]/70 mt-12 opacity-0 max-w-lg px-6">
            "Every piece begins as a story — quietly told, carefully cut."
          </p>
          
          {/* Hero CTA */}
          <a 
            ref={ctaRef}
            href="/collections"
            onClick={(e) => handleNavigation(e, '/collections')}
            data-cursor="ENTER →"
            className="group relative mt-16 w-40 h-40 rounded-full border border-[#D4AF37]/30 flex items-center justify-center opacity-0 hover:border-[#D4AF37] transition-colors duration-700 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#1A0507] scale-0 group-hover:scale-100 rounded-full transition-transform duration-700 ease-out" />
            <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="49" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 8" />
            </svg>
            <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] uppercase text-[#D4AF37] text-center w-24">
              Enter The<br/>Exhibition
            </span>
          </a>
        </div>

        {/* Scroll Invitation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-pulse">
          <span className="font-sans text-[8px] tracking-[0.4em] uppercase mb-4 text-[#D4AF37]">Scroll to discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </div>
      </section>

      {/* 11 & 12 - BEHIND EVERY PIECE (Warm Ivory Shift) */}
      <section className="w-full py-40 px-6 bg-[#F5F3EC] text-[#2A090D] relative overflow-hidden rounded-t-[3rem] -mt-12 z-30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="w-full lg:w-1/2">
            <h2 className="font-serif text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] mb-8">
              Behind<br/>Every Piece<br/><span className="text-[#D4AF37]">Is A Story.</span>
            </h2>
            <p className="font-sans text-sm tracking-widest uppercase text-[#2A090D]/60 mb-12 border-l border-[#D4AF37] pl-6 max-w-sm">
              "I believe jewellery is more than an object. It is a story translated into form."
            </p>
          </div>

          <div className="w-full lg:w-1/2 story-sequence-container relative h-[400px] flex items-center">
            {/* Connecting Line */}
            <div className="absolute left-0 right-0 h-[1px] bg-[#2A090D]/10 top-1/2 -translate-y-1/2" />
            <div className="story-line-fill absolute left-0 right-0 h-[1px] bg-[#D4AF37] top-1/2 -translate-y-1/2 scale-x-0" />
            
            {/* Sequence Nodes */}
            <div className="relative z-10 w-full flex justify-between items-center text-center font-sans text-[9px] md:text-xs tracking-[0.3em] uppercase font-bold text-[#2A090D]">
              {["Story", "Idea", "Sketch", "CAD", "Form", "Jewellery"].map((node, i) => (
                <div key={node} className="story-node flex flex-col items-center bg-[#F5F3EC] px-2 md:px-4">
                  <div className="w-2 h-2 rounded-full bg-[#2A090D] mb-4 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                  {node}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 13 - FEATURED COLLECTIONS (Immersive Panels) */}
      <section className="w-full bg-[#1A0507]">
        
        {/* COLLECTION 01: FREEDOM TO DREAM */}
        <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden group border-b border-[#D4AF37]/10" data-cursor="EXPLORE ↗">
          <img src="/api/placeholder/1920/1080" alt="Freedom to Dream" className="absolute inset-0 w-full h-full object-cover opacity-30 transition-transform duration-[2s] group-hover:scale-105 group-hover:opacity-50 blur-sm group-hover:blur-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0507] via-transparent to-transparent" />
          
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="font-sans text-xs tracking-[0.5em] text-[#D4AF37] uppercase mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-4 group-hover:translate-y-0">
              01 — Freedom To Dream
            </span>
            <h2 className="font-serif text-6xl md:text-8xl text-[#F5F3EC] uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity duration-700">
              Imagination<br/>As Freedom
            </h2>
            <a href="/collections" onClick={(e) => handleNavigation(e, '/collections')} className="mt-12 font-sans text-[10px] tracking-[0.4em] uppercase text-[#F5F3EC]/50 hover:text-[#D4AF37] transition-colors pb-1 border-b border-[#D4AF37]/30">
              Explore Collection
            </a>
          </div>
        </div>

        {/* COLLECTION 02: ABSTRACT DESIGN */}
        <div className="collection-abstract relative w-full h-[80vh] flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/10">
          <div className="absolute inset-0 flex space-x-12 opacity-10 justify-center">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="abstract-geo-line w-[1px] h-full bg-[#D4AF37] origin-top scale-y-0" />
            ))}
          </div>
          <div className="relative z-10 max-w-4xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-sans text-xs tracking-[0.5em] text-[#D4AF37] uppercase mb-4 block">02 — Abstract & Retro</span>
              <h2 className="font-serif text-5xl md:text-7xl text-[#F5F3EC] uppercase tracking-widest mb-8 leading-none">
                Geometry<br/>In Motion
              </h2>
              <p className="font-sans text-[10px] tracking-widest uppercase text-[#F5F3EC]/50 mb-12">Metro • City Lines • Ticket Booths</p>
              <a href="/collections" onClick={(e) => handleNavigation(e, '/collections')} className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#F5F3EC]/50 hover:text-[#D4AF37] transition-colors pb-1 border-b border-[#D4AF37]/30">
                Explore Collection
              </a>
            </div>
            <div className="h-[40vh] bg-[#2A090D] border border-[#D4AF37]/20 p-4 relative">
               <img src="/api/placeholder/600/800" alt="Abstract Jewellery" className="w-full h-full object-cover opacity-70 sepia-[0.3]" />
            </div>
          </div>
        </div>

        {/* COLLECTION 03: CULTURAL ECHOES */}
        <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="relative z-10 text-center">
             <span className="font-sans text-xs tracking-[0.5em] text-[#D4AF37] uppercase mb-12 block">03 — Cultural Echoes</span>
             
             <div className="cultural-text-sequence h-24 relative overflow-hidden mb-8">
               <h2 className="cult-trad absolute w-full font-serif text-6xl md:text-8xl text-[#D4AF37]/30 uppercase tracking-widest">Tradition</h2>
               <h2 className="cult-mod absolute w-full font-serif text-6xl md:text-8xl text-[#D4AF37]/70 uppercase tracking-widest opacity-0 translate-y-10">Modern</h2>
               <h2 className="cult-fut absolute w-full font-serif text-6xl md:text-8xl text-[#F5F3EC] uppercase tracking-widest opacity-0 translate-y-10">Future</h2>
             </div>
             
             <a href="/collections" onClick={(e) => handleNavigation(e, '/collections')} className="mt-12 font-sans text-[10px] tracking-[0.4em] uppercase text-[#F5F3EC]/50 hover:text-[#D4AF37] transition-colors pb-1 border-b border-[#D4AF37]/30 inline-block">
               Explore Collection
             </a>
          </div>
        </div>

      </section>

      {/* 14 & 15 - ONE DESIGNER, THREE WORLDS */}
      <section className="w-full py-40 px-6 bg-[#F5F3EC] text-[#2A090D] text-center flex flex-col items-center">
        <h2 className="font-serif text-5xl md:text-8xl uppercase tracking-tighter leading-[0.9] mb-6">
          Three Worlds.<br/><span className="text-[#D4AF37]">One Designer.</span>
        </h2>
        <p className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-[#2A090D]/50 mb-32">
          Dream • Movement • Heritage
        </p>

        <div className="max-w-2xl text-center flex flex-col items-center">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-4 font-bold block">Meet Disha</span>
          <p className="font-serif italic text-2xl md:text-4xl text-[#2A090D]/80 mb-12">
            Jewellery designer. Storyteller. Observer.
          </p>
          <a href="/about" onClick={(e) => handleNavigation(e, '/about')} className="group flex items-center space-x-4 font-sans text-[10px] tracking-[0.3em] uppercase text-[#2A090D] hover:text-[#D4AF37] transition-colors">
            <span>Discover My Direction</span>
            <span className="w-12 h-[1px] bg-[#2A090D] group-hover:bg-[#D4AF37] group-hover:w-16 transition-all" />
          </a>
        </div>
      </section>

      {/* 16 - THE DIRECTION TRANSITION */}
      <section className="direction-transition-section relative w-full h-[120vh] bg-[#2A090D] flex flex-col items-center justify-center">
        <div className="sticky top-1/3 text-center z-20 mix-blend-difference">
          <h2 className="font-serif text-6xl md:text-9xl text-[#F5F3EC] uppercase tracking-tighter leading-[0.8]">
            Where<br/>Does Design<br/><span className="text-[#D4AF37]">Take You?</span>
          </h2>
        </div>
        
        {/* Drawing Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path className="direction-path" d="M 50,0 Q 20,25 50,50 T 50,100" fill="none" stroke="#D4AF37" strokeWidth="0.2" strokeDasharray="150" strokeDashoffset="150" />
        </svg>

        <div className="absolute bottom-32 text-center z-20 bg-[#2A090D]/80 backdrop-blur-md py-6 px-12 rounded-full border border-[#D4AF37]/20">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-4 block">This Way ↓</span>
          <a href="/process" onClick={(e) => handleNavigation(e, '/process')} className="font-sans text-xs tracking-widest uppercase text-[#F5F3EC] hover:text-[#D4AF37] transition-colors">
            Explore The Process
          </a>
        </div>
      </section>

      {/* 17 - PROCESS PREVIEW */}
      <section className="w-full py-32 px-6 bg-[#1A0507]">
        <h2 className="text-center font-sans text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase mb-24">From Thought To Form</h2>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { num: "01", title: "Ideation", img: "/api/placeholder/600/800" },
            { num: "02", title: "Development", img: "/api/placeholder/600/800" },
            { num: "03", title: "Final Form", img: "/api/placeholder/600/800" }
          ].map((step, i) => (
            <div key={i} className="flex flex-col border border-[#D4AF37]/10 p-6 hover:bg-[#2A090D] transition-colors duration-500">
               <span className="font-serif text-4xl text-[#D4AF37]/30 mb-6">{step.num}</span>
               <div className="h-[40vh] w-full bg-[#2A090D] mb-6 overflow-hidden">
                 <img src={step.img} alt={step.title} className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal hover:scale-105 transition-all duration-700" />
               </div>
               <h3 className="font-sans text-sm tracking-[0.3em] uppercase text-[#F5F3EC]">{step.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 18 & 19 - FULL-SCREEN BRAND STATEMENT & FINAL CTA */}
      <section className="final-section relative w-full min-h-screen bg-[#2A090D] flex flex-col items-center justify-center text-center px-6 border-t border-[#D4AF37]/10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-10 pointer-events-none mix-blend-overlay" />
        
        <div className="mb-32">
          <h2 className="final-statement-line font-serif text-5xl md:text-8xl lg:text-9xl text-[#F5F3EC] uppercase tracking-tighter mb-8">
            Every Piece<br/>Begins As A Story.
          </h2>
          <p className="final-statement-line font-serif text-2xl md:text-5xl text-[#D4AF37] italic opacity-80 mb-4">Quietly told.</p>
          <p className="final-statement-line font-serif text-2xl md:text-5xl text-[#D4AF37] italic opacity-50 mb-16">Carefully cut.</p>
          <p className="final-statement-line font-sans text-[10px] tracking-[0.5em] uppercase text-[#F5F3EC]/40">— Disha Bafna</p>
        </div>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-16 font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase">
          <a href="/collections" onClick={(e) => handleNavigation(e, '/collections')} className="text-[#F5F3EC]/70 hover:text-[#D4AF37] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">Enter The Collections →</a>
          <a href="/process" onClick={(e) => handleNavigation(e, '/process')} className="text-[#F5F3EC]/70 hover:text-[#D4AF37] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">Discover The Process →</a>
          <a href="/about" onClick={(e) => handleNavigation(e, '/about')} className="text-[#F5F3EC]/70 hover:text-[#D4AF37] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">Find My Direction →</a>
        </div>
      </section>

      {/* 20 - MINIMAL FOOTER */}
      <footer className="w-full bg-[#1A0507] py-12 px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left border-t border-[#D4AF37]/5 relative z-20">
        <div className="mb-8 md:mb-0">
          <div className="font-serif text-3xl italic text-[#D4AF37] mb-2">DB.</div>
          <div className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#F5F3EC]/70">Disha Bafna</div>
          <div className="font-sans text-[8px] tracking-[0.3em] uppercase text-[#F5F3EC]/30">Jewellery Designer</div>
        </div>

        <div className="flex space-x-8 font-sans text-[9px] tracking-[0.3em] uppercase text-[#F5F3EC]/50 mb-8 md:mb-0">
          <a href="/about" onClick={(e) => handleNavigation(e, '/about')} className="hover:text-[#D4AF37] transition-colors">About</a>
          <a href="/collections" onClick={(e) => handleNavigation(e, '/collections')} className="hover:text-[#D4AF37] transition-colors">Collections</a>
          <a href="/process" onClick={(e) => handleNavigation(e, '/process')} className="hover:text-[#D4AF37] transition-colors">Process</a>
        </div>

        <div className="flex flex-col items-center md:items-end font-sans text-[9px] tracking-[0.3em] uppercase text-[#F5F3EC]/40 space-y-2">
          <a href="mailto:hello@dishabafna.com" className="hover:text-[#D4AF37] transition-colors">Inquiries</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">LinkedIn</a>
          <span className="text-[7px] text-[#F5F3EC]/20 mt-4 block">© 2026 Disha Bafna</span>
        </div>
      </footer>

    </div>
  );
}