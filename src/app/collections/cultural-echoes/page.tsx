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
// EXACT CONTENT LOCK (From PDF 3)
// ------------------------------------------------------------------------
const collectionData = {
  title: "Cultural Echoes of Tomorrow",
  concept: "My inspiration comes from how traditional cultures live and evolve in the future—especially Indian heritage blended with modern life. I looked at folk patterns, temple motifs, traditional jewelry forms, and everyday symbols from my own background, and imagined how they could be reinterpreted in a future-facing, contemporary style.",
  philosophy: "I also took cues from architecture, textiles, and street life, thinking about how culture 'echoes' across time, even as fashion and technology change.",
  mission: "This collection transforms metro structures and urban patterns into minimal jewellery forms. Inspired by the rhythm, symmetry, and movement of city life, the designs are created for individuals who appreciate modern aesthetics and subtle artistic details in everyday wear.", // Exact text copied from PDF 3 page 2
  target: {
    description: "A modern urban individual who connects with the rhythm and structure of city life through minimal jewellery. Drawn to geometric forms and abstract metro-inspired details, they seek pieces that feel contemporary, expressive, and effortlessly wearable—subtle in appearance yet bold in identity.",
    demographic: "Age Group: 18-30 years | Gender: All genders",
    lifestyle: "Fast paced, Modern, Minimal, City-Oriented, Creative",
    occupation: "Students, Freshers, Young Professionals, Creatives"
  },
  pieces: [
    {
      id: "legacy-bloom",
      name: "Legacy Bloom",
      description: "This design was created by combining traditional floral motifs with modern design, showing how the beauty of our heritage can be transformed into elegant jewellery.",
      type: "Brooch",
      materials: "Gold • Red Cabochon • Jade • Diamond",
      image: "/theme3/legacy-bloom.png"
    },
    {
      id: "vibrant-harvest",
      name: "Vibrant Harvest",
      description: "This design was created by turning traditional fruit-inspired motifs into a modern pattern, showing how the colorful traditions of the past can inspire the future.",
      type: "Brooch",
      materials: "Ruby Cabochon • Pink Tourmaline • Carnelian • Gold",
      image: "/theme3/vibrant-harvest.png"
    },
    {
      id: "timeless-bloom",
      name: "Timeless Bloom",
      description: "This design was created by combining traditional floral patterns with a watch strap design, showing how our cultural heritage can grow and evolve with time.",
      type: "Watch",
      materials: "Gold • Diamond",
      image: "/theme3/timeless-bloom.png"
    },
    {
      id: "heritage-link",
      name: "Heritage Link",
      description: "This design was created by transforming traditional geometric patterns into a modern link design, showing the continuous journey of culture from the past to the future.",
      type: "Bracelet",
      materials: "Pink Diamond • Gold",
      image: "/theme3/heritage-link.png"
    },
    {
      id: "regal-unfolding",
      name: "Regal Unfolding",
      description: "This design was created by transforming the traditional peacock motif into a modern jewelry form, showing how cultural beauty and pride can be carried into the future",
      type: "Pendant",
      materials: "Enamelling • Diamond • Peridot",
      image: "/theme3/regal-unfolding.png"
    },
    {
      id: "majestic-guardian",
      name: "Majestic Guardian",
      description: "This design was created by using the elephant as inspiration, showing how its wisdom and strength can be preserved through modern jewelry design.",
      type: "Pendant",
      materials: "Gold • Diamond",
      image: "/theme3/majestic-guardian.png"
    },
    {
      id: "mosaic-heritage",
      name: "Mosaic Heritage",
      description: "This design was created by combining traditional floral patterns into a modern design, showing how our cultural heritage can be transformed into a bold and stylish expression.",
      type: "Earrings",
      materials: "Watermelon Tourmaline • Diamond • Enamelling",
      image: "/theme3/mosaic-heritage.png"
    },
    {
      id: "vibrant-legacy-cuff",
      name: "Vibrant Legacy Cuff",
      description: "This design was created by turning the traditional peacock motif into a modern ear cuff, showing how cultural symbols can become fashionable and wearable today.",
      type: "Ear Cuff",
      materials: "Blue Sapphire • Ruby • Emerald • Diamond",
      image: "/theme3/vibrant-legacy-cuff.png"
    },
    {
      id: "ethereal-petal",
      name: "Ethereal Petal",
      description: "This design was created by transforming natural shapes into a modern gold and diamond pattern, showing how the beauty of nature can be reimagined in a stylish and elegant way.",
      type: "Set (Necklace, Bracelet, Earrings)",
      materials: "Gold • Pink & White Dia",
      image: "/theme3/ethereal-petal.png"
    },
    {
      id: "radiant-spire",
      name: "Radiant Spire",
      description: "This design was created by combining traditional floral forms with a modern structure, showing how the beauty of our heritage can be refined to suit today's world.",
      type: "Set (Necklace, Bracelet, Earrings)",
      materials: "Gold • Diamond",
      image: "/theme3/radiant-spire.png"
    }
  ]
};

// ------------------------------------------------------------------------
// GEOMETRIC MANDALA SVG (Fusing Tradition with Futurism)
// ------------------------------------------------------------------------
const HeritageMandala = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-30 text-[#D4AF37]" preserveAspectRatio="xMidYMid meet">
    <g className="origin-center animate-[spin_120s_linear_infinite]">
      {/* Outer Modern Ring */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 4" />
      <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="0.5" />
      
      {/* Lotus / Temple Motif evolving into geometric sharp lines */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = +(100 + Math.cos(angle) * 20).toFixed(2);
        const y1 = +(100 + Math.sin(angle) * 20).toFixed(2);
        const x2 = +(100 + Math.cos(angle) * 85).toFixed(2);
        const y2 = +(100 + Math.sin(angle) * 85).toFixed(2);
        
        // Petal curves
        const ctrlX1 = +(100 + Math.cos(angle - 0.2) * 50).toFixed(2);
        const ctrlY1 = +(100 + Math.sin(angle - 0.2) * 50).toFixed(2);
        
        return (
          <g key={`mandala-petal-${i}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.3" opacity="0.6" />
            <path d={`M100,100 Q${ctrlX1},${ctrlY1} ${x2},${y2}`} fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.4" />
          </g>
        )
      })}
      
      {/* Inner geometric core */}
      <polygon points="100,20 169,60 169,140 100,180 31,140 31,60" fill="none" stroke="#5A1217" strokeWidth="0.5" className="animate-[spin_40s_linear_infinite_reverse] origin-center" />
      <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="5" fill="#5A1217" />
    </g>
  </svg>
);

export default function CulturalEchoesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      
      // 1. Cinematic Hero Entrance (Warm, Temple-like reveal)
      const tlHero = gsap.timeline();
      
      tlHero.fromTo(".hero-curtain", 
        { scaleY: 1 }, 
        { scaleY: 0, transformOrigin: "top", duration: 1.5, ease: "power4.inOut" }, 
        0.2
      )
      .fromTo(".hero-text", 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: "power3.out" }, 
        1
      )
      .fromTo(".hero-graphic", 
        { opacity: 0, scale: 0.8, rotationZ: -45 }, 
        { opacity: 1, scale: 1, rotationZ: 0, duration: 2.5, ease: "power2.out" }, 
        1.2
      );

      // 2. The Morphing "Cultural Echoes" Title (Tradition -> Tomorrow)
      const morphTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cultural-morph-section",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      });
      
      morphTl.to(".morph-1", { opacity: 0, y: -30, duration: 1 })
             .to(".morph-2", { opacity: 1, y: 0, duration: 1 }, "<")
             .to(".morph-2", { opacity: 0, y: -30, duration: 1 }, "+=0.5")
             .to(".morph-3", { opacity: 1, y: 0, duration: 1 }, "<");

      // 3. Image Mask Reveals (Asymmetrical frames)
      gsap.utils.toArray(".image-mask").forEach((elem: any) => {
        gsap.fromTo(elem, 
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 40 }, 
          { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", y: 0, duration: 1.5, ease: "power3.inOut", 
            scrollTrigger: { trigger: elem, start: "top 85%" }
          }
        );
      });

      // 4. Staggered Text Reveals
      gsap.utils.toArray(".scroll-reveal").forEach((elem: any) => {
        gsap.fromTo(elem, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", 
            scrollTrigger: { trigger: elem, start: "top 85%" }
          }
        );
      });

      // 5. Parallax Imagery inside frames
      gsap.utils.toArray(".parallax-img").forEach((img: any) => {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#2A090D] text-[#F5F3EC] overflow-x-hidden pt-24 selection:bg-[#D4AF37] selection:text-[#2A090D] font-sans">
      
      {/* Premium Cursor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] mix-blend-difference hidden md:block">
        <style dangerouslySetInnerHTML={{__html: `
          body { cursor: none; }
          .cursor-box { width: 6px; height: 6px; background: #D4AF37; border-radius: 50%; position: fixed; transform: translate(-50%, -50%); pointer-events: none; z-index: 9999; transition: width 0.3s ease, height 0.3s ease, background 0.3s ease, border 0.3s ease, border-radius 0.3s ease; }
          .cursor-variant-explore { width: 60px; height: 60px; background: transparent; border: 1px solid #D4AF37; }
          .cursor-variant-explore::after { content: "${cursorText}"; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 6px; letter-spacing: 2px; color: #D4AF37; text-transform: uppercase; white-space: nowrap;}
        `}} />
        <div className={cn(
          "cursor-box",
          cursorVariant === "explore" && "cursor-variant-explore"
        )} />
      </div>

      {/* ------------------------------------------------------------------------ */}
      {/* 1. HERO: CULTURAL ECHOES */}
      {/* ------------------------------------------------------------------------ */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-6 border-b border-[#D4AF37]/20">
        <div className="hero-curtain absolute inset-0 bg-[#1A0507] z-50" />
        
        {/* Massive Background Mandala */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden hero-graphic">
          <div className="w-[150vw] h-[150vw] max-w-[1000px] max-h-[1000px]">
            <HeritageMandala />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <span className="hero-text font-sans text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#D4AF37] mb-8 border-b border-[#D4AF37]/50 pb-4">
            Collection 03
          </span>
          
          <h1 className="hero-text font-serif text-[4rem] md:text-[6.5rem] lg:text-[8rem] leading-[0.9] text-[#F5F3EC] uppercase tracking-tighter mb-8 drop-shadow-2xl">
            Cultural Echoes<br />
            <span className="text-[#D4AF37] italic font-light tracking-normal lowercase text-[3rem] md:text-[5rem] lg:text-[6rem]">of</span><br />
            Tomorrow
          </h1>

          <p className="hero-text font-sans text-xs md:text-sm tracking-[0.3em] leading-loose uppercase text-[#F5F3EC]/70 max-w-3xl">
            A fusion of traditional Indian heritage and future-facing contemporary style.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 2. THE PHILOSOPHY (The Morphing Brief) */}
      {/* ------------------------------------------------------------------------ */}
      <section className="w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#1A0507]">
        <div className="max-w-7xl mx-auto">
          
          <div className="cultural-morph-section flex flex-col items-center text-center mb-32 relative h-[150px]">
             <div className="absolute inset-0 flex items-center justify-center font-serif text-[4rem] md:text-[6rem] lg:text-[8rem] uppercase tracking-widest text-[#D4AF37]">
                <span className="morph-1 absolute opacity-100">Tradition</span>
                <span className="morph-2 absolute opacity-0 translate-y-10 text-[#5A1217] drop-shadow-lg">Modern</span>
                <span className="morph-3 absolute opacity-0 translate-y-10 text-[#F5F3EC]">Tomorrow</span>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="scroll-reveal">
              <span className="font-sans text-[9px] tracking-[0.5em] uppercase text-[#D4AF37] mb-6 block">The Inspiration</span>
              <p className="font-serif text-3xl md:text-4xl leading-relaxed text-[#F5F3EC] mb-12 italic border-l-2 border-[#D4AF37] pl-8">
                "{collectionData.concept}"
              </p>
              <p className="font-sans text-xs tracking-widest leading-loose uppercase text-[#F5F3EC]/60">
                {collectionData.philosophy}
              </p>
            </div>

            <div className="scroll-reveal bg-[#2A090D] border border-[#D4AF37]/30 p-10 md:p-16 relative overflow-hidden shadow-2xl">
              {/* Subtle background motif */}
              <div className="absolute -top-12 -right-12 w-48 h-48 opacity-5">
                 <HeritageMandala />
              </div>

              <h3 className="font-serif text-3xl md:text-4xl text-[#D4AF37] mb-8 uppercase tracking-widest">The Wearer</h3>
              <p className="font-sans text-xs tracking-widest leading-[2.5em] text-[#F5F3EC]/80 mb-10 uppercase">
                {collectionData.target.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-[#D4AF37]/20">
                <div>
                  <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#D4AF37] block mb-2">Demographic</span>
                  <span className="font-sans text-[9px] tracking-widest uppercase text-[#F5F3EC]/60">{collectionData.target.demographic}</span>
                </div>
                <div>
                  <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#D4AF37] block mb-2">Lifestyle</span>
                  <span className="font-sans text-[9px] tracking-widest uppercase text-[#F5F3EC]/60">{collectionData.target.lifestyle}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 3. THE SHOWCASE */}
      {/* ------------------------------------------------------------------------ */}
      <section className="w-full bg-[#F5F3EC] text-[#1A0507] py-40 border-t border-[#D4AF37]/20">
        
        <div className="text-center mb-40">
          <span className="font-sans text-[10px] tracking-[0.6em] text-[#5A1217] uppercase mb-6 block">The Final Designs</span>
          <h2 className="font-serif text-6xl md:text-8xl text-[#1A0507] uppercase tracking-tighter drop-shadow-sm">The Collection</h2>
        </div>

        {/* SET 1: Heritage Florals (Vibrant Colors) */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-40">
          <div className="scroll-reveal text-center mb-24">
            <h3 className="font-serif text-5xl md:text-7xl text-[#5A1217] uppercase tracking-widest mb-6">Heritage Florals</h3>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#1A0507]/60 max-w-lg mx-auto">Vibrant cabochons breathing modern life into traditional motifs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {/* Legacy Bloom */}
            <div className="flex flex-col items-center text-center scroll-reveal group">
              <div 
                className="image-mask w-full max-w-md aspect-square bg-[#FFFFFF] border border-[#D4AF37]/50 shadow-2xl relative overflow-hidden mb-10 p-4"
                onMouseEnter={() => { setCursorVariant("explore"); setCursorText("VIEW"); }}
                onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
              >
                {/* Simulated Emerald/Ruby Enamel Lighting */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#9B1B30]/10 to-[#004B49]/10 opacity-50 mix-blend-multiply" />
                <div className="w-full h-full bg-[#1A0507]/5 flex items-center justify-center relative overflow-hidden">
                  <div className="parallax-img absolute inset-[-10%] w-[120%] h-[120%] bg-[#F5F3EC]/50" />
                  <img src={collectionData.pieces[0].image} alt="Legacy Bloom" className="absolute inset-0 w-full h-full object-contain p-8 drop-shadow-2xl transition-transform duration-1000 group-hover:scale-110 z-10" />
                </div>
              </div>
              <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#5A1217] mb-3">{collectionData.pieces[0].type}</span>
              <h4 className="font-serif text-4xl text-[#1A0507] uppercase tracking-widest mb-4">{collectionData.pieces[0].name}</h4>
              <p className="font-sans text-[10px] tracking-widest leading-[2em] uppercase text-[#1A0507]/70 mb-4 max-w-sm">
                {collectionData.pieces[0].description}
              </p>
              <span className="font-sans text-[8px] tracking-widest uppercase text-[#D4AF37] font-bold bg-[#1A0507] px-4 py-2 text-[#F5F3EC]">{collectionData.pieces[0].materials}</span>
            </div>

            {/* Vibrant Harvest */}
            <div className="flex flex-col items-center text-center scroll-reveal md:mt-32 group">
              <div 
                className="image-mask w-full max-w-md aspect-square bg-[#FFFFFF] border border-[#D4AF37]/50 shadow-2xl relative overflow-hidden mb-10 p-4"
                onMouseEnter={() => { setCursorVariant("explore"); setCursorText("VIEW"); }}
                onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
              >
                {/* Simulated Tourmaline/Carnelian Lighting */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#E66A7A]/10 to-[#D96B27]/10 opacity-50 mix-blend-multiply" />
                <div className="w-full h-full bg-[#1A0507]/5 flex items-center justify-center relative overflow-hidden">
                  <div className="parallax-img absolute inset-[-10%] w-[120%] h-[120%] bg-[#F5F3EC]/50" />
                  <img src={collectionData.pieces[1].image} alt="Vibrant Harvest" className="absolute inset-0 w-full h-full object-contain p-8 drop-shadow-2xl transition-transform duration-1000 group-hover:scale-110 z-10" />
                </div>
              </div>
              <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#5A1217] mb-3">{collectionData.pieces[1].type}</span>
              <h4 className="font-serif text-4xl text-[#1A0507] uppercase tracking-widest mb-4">{collectionData.pieces[1].name}</h4>
              <p className="font-sans text-[10px] tracking-widest leading-[2em] uppercase text-[#1A0507]/70 mb-4 max-w-sm">
                {collectionData.pieces[1].description}
              </p>
              <span className="font-sans text-[8px] tracking-widest uppercase text-[#D4AF37] font-bold bg-[#1A0507] px-4 py-2 text-[#F5F3EC]">{collectionData.pieces[1].materials}</span>
            </div>
          </div>
        </div>

        {/* SET 2: Royal Guardians & Geometric Continuity (Full Width Dark Editorial) */}
        <div className="w-full bg-[#1A0507] text-[#F5F3EC] py-32 border-y border-[#D4AF37]/30 mb-40">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            
            <div className="scroll-reveal flex flex-col md:flex-row justify-between items-end mb-24 border-b border-[#D4AF37]/20 pb-8">
              <h3 className="font-serif text-5xl md:text-7xl text-[#D4AF37] uppercase tracking-widest">Royal Guardians</h3>
              <span className="font-sans text-xs tracking-[0.4em] uppercase text-[#F5F3EC]/50 mt-6 md:mt-0">Peacock & Elephant Motifs</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-40">
              {/* Regal Unfolding (Peacock) */}
              <div className="lg:col-span-7 flex flex-col scroll-reveal">
                <div 
                  className="image-mask w-full aspect-[16/9] bg-[#2A090D] border border-[#0F4C81]/30 flex items-center justify-center relative overflow-hidden shadow-2xl cursor-pointer group"
                  onMouseEnter={() => { setCursorVariant("explore"); setCursorText("VIEW"); }}
                  onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0F4C81]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <img src={collectionData.pieces[4].image} alt="Regal Unfolding" className="absolute inset-0 w-full h-full object-contain p-12 drop-shadow-2xl transition-transform duration-1000 group-hover:scale-105 z-10" />

                </div>
                <div className="flex flex-col md:flex-row justify-between mt-8 gap-8">
                  <div className="max-w-md">
                    <h4 className="font-serif text-3xl text-[#D4AF37] uppercase tracking-widest mb-4">{collectionData.pieces[4].name}</h4>
                    <p className="font-sans text-[10px] tracking-widest leading-loose uppercase text-[#F5F3EC]/70">
                      {collectionData.pieces[4].description}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#F5F3EC]/40 block mb-2">{collectionData.pieces[4].type}</span>
                    <span className="font-sans text-[8px] tracking-widest uppercase text-[#0F4C81] bg-[#F5F3EC]/10 px-3 py-1 inline-block">{collectionData.pieces[4].materials}</span>
                  </div>
                </div>
              </div>

              {/* Majestic Guardian (Elephant) */}
              <div className="lg:col-span-5 flex flex-col scroll-reveal">
                <div 
                  className="image-mask w-full aspect-square bg-[#2A090D] border border-[#D4AF37]/30 flex items-center justify-center relative overflow-hidden shadow-2xl cursor-pointer group"
                  onMouseEnter={() => { setCursorVariant("explore"); setCursorText("VIEW"); }}
                  onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#D4AF37]/10 to-transparent translate-y-full group-hover:-translate-y-full transition-transform duration-1000" />
                  <img src={collectionData.pieces[5].image} alt="Majestic Guardian" className="absolute inset-0 w-full h-full object-contain p-12 drop-shadow-2xl transition-transform duration-1000 group-hover:scale-105 z-10" />
                </div>
                <div className="mt-8">
                  <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#F5F3EC]/40 block mb-2">{collectionData.pieces[5].type}</span>
                  <h4 className="font-serif text-3xl text-[#D4AF37] uppercase tracking-widest mb-4">{collectionData.pieces[5].name}</h4>
                  <p className="font-sans text-[10px] tracking-widest leading-loose uppercase text-[#F5F3EC]/70 mb-4">
                    {collectionData.pieces[5].description}
                  </p>
                  <span className="font-sans text-[8px] tracking-widest uppercase text-[#D4AF37] bg-[#F5F3EC]/10 px-3 py-1 inline-block">{collectionData.pieces[5].materials}</span>
                </div>
              </div>
            </div>

            {/* Watches & Bracelets Inline row with Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#D4AF37]/20 pt-16">
              {[collectionData.pieces[2], collectionData.pieces[3]].map((piece, i) => (
                <div key={piece.id} className={cn("scroll-reveal p-8 flex flex-col group", i === 0 ? "md:border-r border-[#D4AF37]/20" : "")}>
                  <div className="w-full aspect-video bg-[#2A090D] border border-[#D4AF37]/20 flex items-center justify-center mb-8 relative overflow-hidden shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
                    <img src={piece.image} alt={piece.name} className="absolute inset-0 w-full h-full object-contain p-6 drop-shadow-2xl transition-transform duration-1000 group-hover:scale-105 z-10" />
                  </div>
                  <div className="flex justify-between items-start mb-8">
                    <h4 className="font-serif text-4xl text-[#F5F3EC] uppercase tracking-widest">{piece.name}</h4>
                    <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1">{piece.type}</span>
                  </div>
                  <p className="font-sans text-xs tracking-widest leading-loose uppercase text-[#F5F3EC]/60 mb-8 max-w-sm flex-grow">
                    {piece.description}
                  </p>
                  <span className="font-sans text-[8px] tracking-widest uppercase text-[#D4AF37]">{piece.materials}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* SET 3: Vibrant Mosaics & Ethereal Sets */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="scroll-reveal text-center mb-24">
            <h3 className="font-serif text-5xl md:text-7xl text-[#5A1217] uppercase tracking-widest mb-6">Mosaics & Spires</h3>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#1A0507]/60 max-w-lg mx-auto">Elaborate ear cuffs and ethereal sets reflecting future heritage.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 mb-32">
             {[collectionData.pieces[6], collectionData.pieces[7]].map((piece, i) => (
              <div key={piece.id} className="scroll-reveal group cursor-pointer" onMouseEnter={() => { setCursorVariant("explore"); setCursorText("VIEW"); }} onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}>
                <div className="image-mask w-full aspect-[4/3] bg-[#FFFFFF] border border-[#D4AF37]/30 shadow-xl relative overflow-hidden mb-8 p-4">
                  <div className="w-full h-full bg-[#1A0507]/5 flex items-center justify-center relative overflow-hidden">
                    <img src={piece.image} alt={piece.name} className="absolute inset-0 w-full h-full object-contain p-8 drop-shadow-xl group-hover:scale-110 transition-transform duration-700 z-10" />
                  </div>
                </div>
                <div className="flex justify-between items-end border-b-2 border-[#1A0507] pb-4 mb-4">
                  <h4 className="font-serif text-3xl text-[#1A0507] uppercase tracking-widest">{piece.name}</h4>
                  <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#5A1217] font-bold">{piece.type}</span>
                </div>
                <p className="font-sans text-[10px] tracking-widest leading-loose uppercase text-[#1A0507]/70 mb-4">
                  {piece.description}
                </p>
                <span className="font-sans text-[8px] tracking-widest uppercase text-[#1A0507]">{piece.materials}</span>
              </div>
            ))}
          </div>

          {/* Final Sets */}
          <div className="w-full bg-[#FAF8F5] border border-[#D4AF37]/30 p-12 lg:p-24 scroll-reveal">
            <h3 className="font-serif text-4xl md:text-5xl text-[#5A1217] uppercase tracking-widest text-center mb-16">The Ethereal Sets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {[collectionData.pieces[8], collectionData.pieces[9]].map((piece) => (
                <div key={piece.id} className="flex flex-col text-center items-center">
                  <div className="w-full max-w-[300px] aspect-square rounded-full border border-[#D4AF37]/50 flex items-center justify-center mb-8 bg-white shadow-lg overflow-hidden group relative">
                   <img src={piece.image} alt={piece.name} className="absolute inset-0 w-full h-full object-contain p-8 drop-shadow-md group-hover:scale-110 transition-transform duration-700 z-10" />
                </div>
                  <h4 className="font-serif text-3xl text-[#1A0507] uppercase tracking-widest mb-4">{piece.name}</h4>
                  <p className="font-sans text-[10px] tracking-widest leading-loose uppercase text-[#1A0507]/60 mb-6 max-w-sm">
                    {piece.description}
                  </p>
                  <span className="font-sans text-[8px] tracking-widest uppercase text-[#D4AF37] font-bold">{piece.materials}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------------ */}
      {/* 4. NEXT DESTINATION (CTA) */}
      {/* ------------------------------------------------------------------------ */}
      <section className="w-full h-[70vh] flex flex-col items-center justify-center text-center px-6 relative bg-[#1A0507] text-[#F5F3EC] border-t border-[#D4AF37]/30 overflow-hidden">
        
        {/* Abstract Temple Geometric Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <HeritageMandala />
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