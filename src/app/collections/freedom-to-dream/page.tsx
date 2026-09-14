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
  title: "Freedom to Dream",
  concept: "This collection draws from the idea that imagination is a form of freedom—how dreams and inner visions can feel like a quiet escape from reality.",
  philosophy: "I'm inspired by those quiet, soft moments when imagination feels like a safe place to escape, explore and believe in something beautiful. As a fresher designer, I feel this freedom to dream within myself: a mix of hope, fear, excitement, and curiosity about the future.",
  mission: "I want my jewelry to be a small, wearable reminder that it's okay to dream, no matter how small or new you are.",
  target: {
    description: "A dream-driven individual who expresses emotions and aspirations through delicate jewellery. Drawn to soft, floating forms and symbolic details, they seek pieces that feel personal, meaningful, and quietly empowering—subtle yet emotionally expressive.",
    demographic: "Age Group: 18-30 years | Gender: Primarily Women",
    lifestyle: "Artistic, Expressive, Modern, Emotional, Imaginative"
  },
  pieces: [
    {
      id: "wings",
      name: "Wings of Dreams",
      description: "This design was created to represent a bird in flight, symbolizing freedom, confidence, and the pursuit of dreams.",
      type: "Brooch",
      image: "/theme1/wings.png" // ADDED IMAGE PATH
    },
    {
      id: "elans",
      name: "Elans of Dreams",
      description: "This design was inspired by a ballerina in motion, symbolizing courage, creativity, and the beauty of following your dreams.",
      type: "Brooch",
      image: "/theme1/elans.png" // ADDED IMAGE PATH
    },
    {
      id: "ethereal",
      name: "Ethereal Ascent",
      description: "This design was created by showing a snowflake emerging from a golden form, symbolizing imagination, creativity, and endless possibilities.",
      type: "Cuff Bracelet",
      image: "/theme1/ethereal.png" // ADDED IMAGE PATH
    },
    {
      id: "phoenix",
      name: "The Awakened Phoenix",
      description: "This design was created using a flying phoenix as inspiration, symbolizing freedom, transformation, and the power to rise beyond limitations.",
      type: "Cuff Bracelet",
      image: "/theme1/phoenix.png" // ADDED IMAGE PATH
    },
    {
      id: "whispering",
      name: "Whispering Vines",
      description: "This design was created by imagining nature growing freely on the ear, with gold and pearls symbolizing dreams that bloom without limits.",
      type: "Ear Cuff",
      image: "/theme1/vines.png" // ADDED IMAGE PATH
    },
    {
      id: "prismatic",
      name: "Prismatic Bloom",
      description: "This design was created by using coral-like branches as inspiration, symbolizing the free and endless growth of imagination.",
      type: "Ear Cuff",
      image: "/theme1/prismatic.png" // ADDED IMAGE PATH
    },
    {
      id: "flight",
      name: "Whispers of Flight",
      description: "This design was created by showing dragonflies in a circular frame, symbolizing freedom, creativity, and the courage to explore new possibilities.",
      type: "Pendant",
      image: "/theme1/flight.png" // ADDED IMAGE PATH
    },
    {
      id: "flow",
      name: "Infinite Flow",
      description: "This design was created by imagining flowing water, symbolizing the endless flow of ideas, inspiration, and imagination.",
      type: "Pendant",
      image: "/theme1/flow.png" // ADDED IMAGE PATH
    },
    {
      id: "ambition",
      name: "Golden Ambition",
      description: "This design was created by combining golden links with hanging emeralds, showing the balance between achieving goals and following our dreams.",
      type: "Necklace",
      image: "/theme1/ambition.png" // ADDED IMAGE PATH
    },
    {
      id: "seashell",
      name: "Seashell of Dreams",
      description: "This design was created by transforming a protective shell into a symbol of inspiration, with an emerald representing the creative ideas hidden within us.",
      type: "Ring/Pendant",
      image: "/theme1/seashell.png" // ADDED IMAGE PATH
    }
  ]
};

// ------------------------------------------------------------------------
// SVG ANIMATIONS (To replace static images where applicable)
// ------------------------------------------------------------------------
const MotifSketchGraphic = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-30 text-[#5A1217]">
    {/* Abstract Ballerina / Bird Sketch Lines */}
    <g className="animate-pulse" style={{ animationDuration: '4s' }}>
      <path d="M100,20 C120,40 140,80 100,150" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
      <path d="M50,80 C80,60 120,60 150,80" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <path d="M80,100 C70,120 60,150 40,180" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 2" />
      <path d="M120,100 C130,120 140,150 160,180" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 2" />
      {/* Subtle geometric guides */}
      <circle cx="100" cy="80" r="40" fill="none" stroke="#D4AF37" strokeWidth="0.2" opacity="0.5" />
      <line x1="100" y1="0" x2="100" y2="200" stroke="#D4AF37" strokeWidth="0.1" opacity="0.5" />
      <line x1="0" y1="80" x2="200" y2="80" stroke="#D4AF37" strokeWidth="0.1" opacity="0.5" />
    </g>
  </svg>
);

export default function FreedomToDreamPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom Cursor State for the Showcase Gallery
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      
      // 1. Cinematic Hero Entrance
      const tlHero = gsap.timeline();
      
      tlHero.fromTo(".hero-line", 
        { scaleY: 0 }, 
        { scaleY: 1, duration: 1.5, ease: "power3.inOut" }, 
        0.5
      )
      .fromTo(".hero-text", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power3.out" }, 
        1
      )
      .fromTo(".hero-abstract", 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 3, ease: "power2.out" }, 
        1.5
      );

      // 2. Parallax Image Masks (The "Polaroid" style from your PDF)
      gsap.utils.toArray(".image-mask-reveal").forEach((elem: any) => {
        gsap.fromTo(elem, 
          { clipPath: "inset(20% 20% 20% 20%)", scale: 1.1 }, 
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.5, ease: "power3.inOut", 
            scrollTrigger: {
              trigger: elem,
              start: "top 80%",
            }
          }
        );
      });

      // 3. Text Reveals on Scroll
      gsap.utils.toArray(".scroll-reveal").forEach((elem: any) => {
        gsap.fromTo(elem, 
          { opacity: 0, y: 40 }, 
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", 
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
            }
          }
        );
      });

      // 4. The Process Timeline (Brief -> Inspiration -> Motifs -> Ideation -> Final)
      const processNodes = gsap.utils.toArray(".process-node");
      const processLine = document.querySelector(".process-line-fill") as HTMLDivElement;
      
      if (processLine) {
        gsap.to(processLine, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        });

        processNodes.forEach((node: any, i) => {
          gsap.fromTo(node, 
            { opacity: 0.3, scale: 0.8 }, 
            { opacity: 1, scale: 1, duration: 0.5, 
              scrollTrigger: {
                trigger: ".process-section",
                start: `top+=${i * 15}% center`,
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#F5F3EC] text-[#2A090D] overflow-x-hidden pt-24 selection:bg-[#5A1217] selection:text-[#F5F3EC] font-sans">
      
      {/* Premium Minimal Cursor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] mix-blend-difference hidden md:block">
        <style dangerouslySetInnerHTML={{__html: `
          body { cursor: none; }
          .cursor-dot { width: 4px; height: 4px; background: #D4AF37; border-radius: 50%; position: fixed; transform: translate(-50%, -50%); pointer-events: none; z-index: 9999; transition: width 0.3s ease, height 0.3s ease, background 0.3s ease, border 0.3s ease; }
          .cursor-variant-explore { width: 60px; height: 60px; background: transparent; border: 1px solid #D4AF37; }
          .cursor-variant-explore::after { content: "${cursorText}"; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 6px; letter-spacing: 2px; color: #D4AF37; text-transform: uppercase; white-space: nowrap;}
        `}} />
        <div className={cn(
          "cursor-dot",
          cursorVariant === "explore" && "cursor-variant-explore"
        )} />
      </div>

      {/* ------------------------------------------------------------------------ */}
      {/* 1. HERO: FREEDOM TO DREAM */}
      {/* ------------------------------------------------------------------------ */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 border-b border-[#D4AF37]/20">
        
        {/* Subtle Background Geometry */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden hero-abstract">
          <svg viewBox="0 0 100 100" className="w-[150vw] h-[150vw] max-w-[1200px] max-h-[1200px] animate-spin" style={{ animationDuration: '180s' }}>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#D4AF37" strokeWidth="0.05" strokeDasharray="0.5 2" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#5A1217" strokeWidth="0.05" />
          </svg>
        </div>

        <div className="text-center relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <span className="hero-text font-sans text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#D4AF37] mb-8">
            Collection 01
          </span>
          
          <h1 className="hero-text font-serif text-[4.5rem] md:text-[8rem] lg:text-[10rem] leading-[0.85] text-[#5A1217] uppercase tracking-tighter mb-12">
            Freedom<br />
            <span className="text-[#D4AF37] italic font-light tracking-normal lowercase text-[5rem] md:text-[9rem] lg:text-[11rem] ml-12">to</span><br />
            Dream
          </h1>

          <div className="hero-line w-[1px] h-24 bg-[#D4AF37]/50 mb-12 origin-top" />

          <p className="hero-text font-sans text-sm md:text-base tracking-[0.2em] leading-loose uppercase text-[#2A090D]/70 max-w-2xl">
            {collectionData.concept}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 2. THE PHILOSOPHY (The Brief) */}
      {/* ------------------------------------------------------------------------ */}
      <section className="w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="order-2 lg:order-1 relative aspect-[4/5] w-full max-w-md mx-auto">
            {/* Editorial Image Placement */}
            <div className="image-mask-reveal w-full h-full bg-[#F5F3EC] border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden flex items-center justify-center p-8">
              <img src="/theme1/sketch.png" alt="Ideation Sketch" className="w-full h-full object-cover opacity-80" />
            </div>
            {/* Decorative Tape/Pin effect from PDF style */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/80 shadow-sm rotate-2 border border-[#D4AF37]/10" />
          </div>

          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <span className="scroll-reveal font-sans text-[9px] tracking-[0.5em] uppercase text-[#D4AF37] mb-8 border-b border-[#D4AF37]/30 pb-4 inline-block w-max">
              The Brief
            </span>
            <p className="scroll-reveal font-serif text-3xl md:text-5xl leading-tight text-[#5A1217] mb-12 tracking-tight italic border-l-[1.5px] border-[#D4AF37] pl-8">
              "{collectionData.philosophy}"
            </p>
            <p className="scroll-reveal font-sans text-sm tracking-widest leading-loose uppercase text-[#2A090D]/60 mb-16">
              {collectionData.mission}
            </p>

            <div className="scroll-reveal bg-[#FAF8F5] border border-[#D4AF37]/20 p-8">
              <h3 className="font-serif text-2xl text-[#5A1217] mb-4">The Wearer</h3>
              <p className="font-sans text-xs tracking-wider leading-relaxed text-[#2A090D]/70 mb-6">
                {collectionData.target.description}
              </p>
              <div className="pt-6 border-t border-[#D4AF37]/20 flex flex-col gap-2">
                <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#D4AF37]">{collectionData.target.demographic}</span>
                <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#5A1217]">{collectionData.target.lifestyle}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 3. THE PROCESS NAVIGATOR (Sticky Track) */}
      {/* ------------------------------------------------------------------------ */}
      <section className="process-section relative w-full bg-[#1A0507] text-[#F5F3EC] py-32 border-y border-[#D4AF37]/20 overflow-hidden">
        
        {/* Background Sketch Overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
           <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="none">
             <path d="M0,100 Q50,0 100,100 T200,100" fill="none" stroke="#D4AF37" strokeWidth="0.1" strokeDasharray="1 2" />
             <path d="M0,150 Q50,50 100,150 T200,150" fill="none" stroke="#D4AF37" strokeWidth="0.05" />
           </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
          <h2 className="scroll-reveal font-serif text-4xl md:text-6xl text-[#D4AF37] uppercase tracking-widest mb-24 text-center">
            The Evolution of Form
          </h2>

          <div className="relative w-full max-w-4xl h-1 bg-[#F5F3EC]/10 mb-16 rounded-full overflow-hidden hidden md:block">
            <div className="process-line-fill absolute top-0 left-0 h-full w-full bg-[#D4AF37] origin-left scale-x-0" />
          </div>

          <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl gap-8 md:gap-0">
            {["Brief", "Inspiration", "Motifs", "Ideation", "Final", "Technical"].map((step, i) => (
              <div key={step} className="process-node flex flex-col items-center text-center">
                <div className="w-3 h-3 rounded-full border border-[#D4AF37] bg-[#1A0507] mb-4 flex items-center justify-center">
                  <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                </div>
                <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#F5F3EC]/80">{step}</span>
                <span className="font-serif text-[#D4AF37]/40 text-lg italic mt-2">0{i+1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 4. THE SHOWCASE (High-End Editorial Spread) */}
      {/* ------------------------------------------------------------------------ */}
      <section className="w-full bg-[#F5F3EC] py-32">
        <div className="text-center mb-32">
          <span className="font-sans text-[10px] tracking-[0.6em] text-[#D4AF37] uppercase mb-6 block">The Final Designs</span>
          <h2 className="font-serif text-6xl md:text-8xl text-[#5A1217] uppercase tracking-tighter">The Collection</h2>
        </div>

        {/* SET 1: Avian & Ballet (Brooches) */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-40">
          <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-center">
            
            {/* Left Piece (Wings) */}
            <div className="w-full md:w-1/2 flex flex-col items-start scroll-reveal group">
              <div 
                className="w-full aspect-[4/5] bg-white border border-[#D4AF37]/20 p-8 shadow-xl relative overflow-hidden mb-8"
                onMouseEnter={() => { setCursorVariant("explore"); setCursorText("VIEW"); }}
                onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
              >
                {/* Polaroid styling */}
                <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-[#5A1217] opacity-20" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-[#5A1217] opacity-20" />
                
                <div className="w-full h-full bg-[#FAF8F5] flex items-center justify-center group-hover:bg-[#1A0507] transition-colors duration-700 relative overflow-hidden">
                  <img src={collectionData.pieces[0].image} alt="Wings of Dreams" className="absolute inset-0 w-full h-full object-contain p-8 drop-shadow-2xl transition-transform duration-1000 group-hover:scale-105" />
                </div>
              </div>
              <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-4">Brooch</span>
              <h3 className="font-serif text-4xl text-[#5A1217] uppercase tracking-widest mb-6">Wings of Dreams</h3>
              <p className="font-sans text-xs tracking-widest leading-[2em] uppercase text-[#2A090D]/70 max-w-md">
                {collectionData.pieces[0].description}
              </p>
            </div>

            {/* Right Piece (Elans) - Offset Layout */}
            <div className="w-full md:w-1/2 flex flex-col items-end text-right md:mt-40 scroll-reveal group">
              <div 
                className="w-full max-w-md aspect-square bg-white border border-[#D4AF37]/20 p-6 shadow-xl relative overflow-hidden mb-8"
                onMouseEnter={() => { setCursorVariant("explore"); setCursorText("VIEW"); }}
                onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
              >
                <div className="w-full h-full bg-[#FAF8F5] flex items-center justify-center group-hover:bg-[#1A0507] transition-colors duration-700 relative overflow-hidden">
                  <img src={collectionData.pieces[1].image} alt="Elans of Dreams" className="absolute inset-0 w-full h-full object-contain p-6 drop-shadow-xl transition-transform duration-1000 group-hover:scale-105" />
                </div>
              </div>
              <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-4">Brooch</span>
              <h3 className="font-serif text-4xl text-[#5A1217] uppercase tracking-widest mb-6">Elans of Dreams</h3>
              <p className="font-sans text-xs tracking-widest leading-[2em] uppercase text-[#2A090D]/70 max-w-sm">
                {collectionData.pieces[1].description}
              </p>
            </div>

          </div>
        </div>

        {/* SET 2: Celestial & Mythical (Cuffs) - Full width asymmetrical break */}
        <div className="w-full bg-[#FFFFFF] border-y border-[#D4AF37]/10 py-32 px-6 md:px-12 mb-40">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Typography Break */}
            <div className="lg:col-span-4 scroll-reveal">
              <span className="font-serif text-8xl text-[#D4AF37]/20 absolute -translate-y-12 -translate-x-8 select-none pointer-events-none">02</span>
              <h2 className="font-serif text-5xl md:text-6xl text-[#5A1217] leading-none tracking-tighter mb-8 relative z-10">
                Ascension &<br/>Awakening
              </h2>
              <div className="w-16 h-[1px] bg-[#D4AF37] mb-8" />
              <p className="font-sans text-xs tracking-[0.2em] leading-loose uppercase text-[#2A090D]/60">
                Transformative motifs rendered in bold cuff silhouettes. Symbolizing the power to rise beyond limitations.
              </p>
            </div>

            {/* Images */}
            <div className="lg:col-span-8 flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-5/12 scroll-reveal group">
                <div className="w-full aspect-[3/4] bg-[#F5F3EC] border border-[#D4AF37]/30 flex flex-col justify-between p-6">
                  <div className="w-full h-[70%] bg-[#1A0507]/5 flex items-center justify-center overflow-hidden relative">
                     <img src={collectionData.pieces[2].image} alt="Ethereal Ascent" className="absolute w-[150%] h-[150%] object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="pt-6 border-t border-[#D4AF37]/20 mt-auto">
                    <h4 className="font-serif text-2xl text-[#5A1217] mb-2">{collectionData.pieces[2].name}</h4>
                    <p className="font-sans text-[8px] tracking-widest uppercase text-[#2A090D]/60 leading-relaxed">
                      {collectionData.pieces[2].description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-7/12 md:mt-24 scroll-reveal group">
                <div className="w-full aspect-square bg-[#F5F3EC] border border-[#D4AF37]/30 flex flex-col justify-between p-8 shadow-2xl">
                  <div className="w-full h-[75%] bg-[#1A0507]/5 flex items-center justify-center overflow-hidden relative">
                     <img src={collectionData.pieces[3].image} alt="Awakened Phoenix" className="absolute w-[120%] h-[120%] object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="pt-6 border-t border-[#D4AF37]/20 mt-auto text-right">
                    <h4 className="font-serif text-3xl text-[#5A1217] mb-2">{collectionData.pieces[3].name}</h4>
                    <p className="font-sans text-[8px] tracking-widest uppercase text-[#2A090D]/60 leading-relaxed ml-auto max-w-[80%]">
                      {collectionData.pieces[3].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SET 3: Delicate Nature (Ear Cuffs) */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-40 text-center">
          <div className="w-[1px] h-24 bg-[#D4AF37]/50 mx-auto mb-16" />
          <h2 className="scroll-reveal font-serif text-5xl md:text-7xl text-[#5A1217] uppercase tracking-tighter mb-24">Nature's Limits</h2>
          
          <div className="flex flex-col md:flex-row gap-16 justify-center items-center">
            {/* Whispering Vines */}
            <div className="w-full max-w-lg flex flex-col items-center scroll-reveal">
              <div className="w-full aspect-square rounded-full border border-[#D4AF37]/40 p-4 mb-10 overflow-hidden relative">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-1000 overflow-hidden relative">
                  <img src={collectionData.pieces[4].image} alt="Whispering Vines" className="absolute w-[120%] h-[120%] object-contain drop-shadow-lg" />
                </div>
              </div>
              <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-3">Ear Cuff</span>
              <h3 className="font-serif text-3xl text-[#2A090D] uppercase tracking-widest mb-6">{collectionData.pieces[4].name}</h3>
              <p className="font-sans text-[10px] tracking-widest leading-[2em] uppercase text-[#2A090D]/60">
                {collectionData.pieces[4].description}
              </p>
            </div>

            {/* Prismatic Bloom */}
            <div className="w-full max-w-lg flex flex-col items-center scroll-reveal">
              <div className="w-full aspect-square rounded-full border border-[#D4AF37]/40 p-4 mb-10 overflow-hidden relative">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-1000 overflow-hidden relative">
                  <img src={collectionData.pieces[5].image} alt="Prismatic Bloom" className="absolute w-[120%] h-[120%] object-contain drop-shadow-lg" />
                </div>
              </div>
              <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-3">Ear Cuff</span>
              <h3 className="font-serif text-3xl text-[#2A090D] uppercase tracking-widest mb-6">{collectionData.pieces[5].name}</h3>
              <p className="font-sans text-[10px] tracking-widest leading-[2em] uppercase text-[#2A090D]/60">
                {collectionData.pieces[5].description}
              </p>
            </div>
          </div>
        </div>

        {/* SET 4 & 5: Framed Motion & Ambition (Pendants/Necklaces) - Stacked Editorial List */}
        <div className="w-full bg-[#1A0507] text-[#F5F3EC] py-32 px-6 md:px-12 border-t border-[#D4AF37]/20">
          <div className="max-w-[1200px] mx-auto">
            
            <h2 className="scroll-reveal font-serif text-4xl md:text-5xl text-[#D4AF37] mb-24 text-center italic">Pendants & Neckpieces</h2>

            {[
              collectionData.pieces[6],
              collectionData.pieces[7],
              collectionData.pieces[8],
              collectionData.pieces[9]
            ].map((piece, index) => (
              <div key={piece.id} className="scroll-reveal flex flex-col md:flex-row border-b border-[#D4AF37]/20 py-16 group hover:bg-[#2A090D]/50 transition-colors duration-500">
                
                {/* Number */}
                <div className="w-full md:w-1/12 font-serif text-3xl text-[#D4AF37]/40 mb-6 md:mb-0 pt-2">
                  0{index + 1}
                </div>

                {/* Details */}
                <div className="w-full md:w-5/12 pr-8 mb-8 md:mb-0 z-10 relative">
                  <h3 className="font-serif text-4xl md:text-5xl text-[#F5F3EC] uppercase tracking-widest mb-4 group-hover:text-[#D4AF37] transition-colors">
                    {piece.name}
                  </h3>
                  <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#D4AF37]/70 block mb-8">
                    {piece.type}
                  </span>
                  <p className="font-sans text-xs tracking-widest leading-[2em] uppercase text-[#F5F3EC]/50 max-w-sm">
                    {piece.description}
                  </p>
                </div>

                {/* Actual Image */}
                <div className="w-full md:w-6/12 flex justify-end">
                  <div className="w-full md:w-[80%] aspect-[16/9] bg-[#2A090D] border border-[#D4AF37]/10 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-10" />
                    <img src={piece.image} alt={piece.name} className="absolute inset-0 w-full h-full object-contain p-8 drop-shadow-2xl group-hover:scale-110 transition-transform duration-1000 z-0" />
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>

      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 5. NEXT DESTINATION (CTA) */}
      {/* ------------------------------------------------------------------------ */}
      <section className="w-full h-[60vh] flex flex-col items-center justify-center text-center px-6 relative bg-[#FAF8F5] border-t border-[#D4AF37]/20 overflow-hidden">
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] opacity-10 pointer-events-none" viewBox="0 0 100 100">
           <line x1="50" y1="0" x2="50" y2="100" stroke="#D4AF37" strokeWidth="0.1" />
           <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="0.1" strokeDasharray="1 3"/>
        </svg>

        <span className="scroll-reveal font-sans text-[9px] tracking-[0.6em] uppercase text-[#D4AF37] mb-8">End of Exhibition</span>
        <h2 className="scroll-reveal font-serif text-4xl md:text-6xl text-[#5A1217] mb-16 relative z-10 tracking-tight">
          Continue Exploring
        </h2>
        
        <a href="/collections" className="scroll-reveal custom-hover group relative inline-flex items-center justify-center px-12 py-5 bg-transparent border border-[#5A1217] text-[#5A1217] font-sans text-[10px] tracking-[0.5em] uppercase transition-all duration-700 hover:text-[#F5F3EC] overflow-hidden">
          <span className="absolute inset-0 w-full h-full -translate-x-full bg-[#5A1217] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
          <span className="relative z-10 flex items-center">
            All Collections 
            <span className="ml-6 text-xl leading-none transition-transform duration-500 group-hover:translate-x-4">→</span>
          </span>
        </a>
      </section>

      <Footer />
    </div>
  );
}