"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// STRICT HIERARCHY ARRAY (Matches both Hero and Interactive Assembly sections)
const explodedParts = [
  // 1. DIAMONDS (Tiny, massive quantity)
  { src: "/part-diamond.png", x: -700, y: -450, rot: 35, scale: 0.04, blur: 4, zIndex: 10, blend: "normal" },
  { src: "/part-diamond.png", x: 600, y: -350, rot: -45, scale: 0.06, blur: 2, zIndex: 15, blend: "normal" },
  { src: "/part-diamond.png", x: -500, y: 400, rot: 110, scale: 0.03, blur: 8, zIndex: 20, blend: "normal" },
  { src: "/part-diamond.png", x: 700, y: 250, rot: -80, scale: 0.05, blur: 1, zIndex: 25, blend: "normal" },
  { src: "/part-diamond.png", x: -300, y: -550, rot: 15, scale: 0.04, blur: 5, zIndex: 30, blend: "normal" },
  { src: "/part-diamond.png", x: 400, y: 500, rot: 65, scale: 0.03, blur: 3, zIndex: 35, blend: "normal" },
  { src: "/part-diamond.png", x: -650, y: 150, rot: -25, scale: 0.06, blur: 6, zIndex: 10, blend: "normal" },
  { src: "/part-diamond.png", x: 250, y: -500, rot: 90, scale: 0.03, blur: 2, zIndex: 15, blend: "normal" },
  { src: "/part-diamond.png", x: -200, y: 600, rot: -15, scale: 0.05, blur: 7, zIndex: 20, blend: "normal" },
  { src: "/part-diamond.png", x: 550, y: 550, rot: 40, scale: 0.04, blur: 1, zIndex: 25, blend: "normal" },
  { src: "/part-diamond.png", x: 0, y: -600, rot: 80, scale: 0.05, blur: 4, zIndex: 10, blend: "normal" },
  { src: "/part-diamond.png", x: 100, y: 650, rot: -10, scale: 0.03, blur: 2, zIndex: 15, blend: "normal" },
  { src: "/part-diamond.png", x: -800, y: -100, rot: 55, scale: 0.06, blur: 8, zIndex: 20, blend: "normal" },
  { src: "/part-diamond.png", x: 800, y: -50, rot: -65, scale: 0.04, blur: 3, zIndex: 25, blend: "normal" },

  // 2. GEMS (Very Small, large quantity)
  { src: "/part-gem.png", x: -550, y: -300, rot: 15, scale: 0.08, blur: 5, zIndex: 40, blend: "normal" },
  { src: "/part-gem.png", x: 450, y: 200, rot: -60, scale: 0.09, blur: 2, zIndex: 45, blend: "normal" },
  { src: "/part-gem.png", x: -350, y: 350, rot: 80, scale: 0.07, blur: 8, zIndex: 50, blend: "normal" },
  { src: "/part-gem.png", x: 350, y: -350, rot: -20, scale: 0.08, blur: 1, zIndex: 55, blend: "normal" },
  { src: "/part-gem.png", x: -600, y: 250, rot: 45, scale: 0.06, blur: 6, zIndex: 60, blend: "normal" },
  { src: "/part-gem.png", x: 500, y: -200, rot: -75, scale: 0.1, blur: 3, zIndex: 40, blend: "normal" },
  { src: "/part-gem.png", x: 200, y: 450, rot: 30, scale: 0.07, blur: 7, zIndex: 45, blend: "normal" },
  { src: "/part-gem.png", x: -250, y: -450, rot: -10, scale: 0.09, blur: 2, zIndex: 50, blend: "normal" },
  { src: "/part-gem.png", x: -750, y: 50, rot: 115, scale: 0.06, blur: 5, zIndex: 60, blend: "normal" },
  { src: "/part-gem.png", x: 750, y: -150, rot: -85, scale: 0.08, blur: 4, zIndex: 45, blend: "normal" },

  // 3. LEAVES (Small, medium quantity)
  { src: "/part-leaf.png", x: 500, y: 350, rot: -30, scale: 0.15, blur: 3, zIndex: 60, blend: "normal" },
  { src: "/part-leaf.png", x: -450, y: -200, rot: 60, scale: 0.18, blur: 6, zIndex: 65, blend: "normal" },
  { src: "/part-leaf.png", x: -300, y: 250, rot: 15, scale: 0.12, blur: 1, zIndex: 70, blend: "normal" },
  { src: "/part-leaf.png", x: 250, y: -300, rot: -75, scale: 0.16, blur: 5, zIndex: 75, blend: "normal" },
  { src: "/part-leaf.png", x: -400, y: 400, rot: 45, scale: 0.14, blur: 4, zIndex: 60, blend: "normal" },

  // 4. FLOWERS (Medium, low quantity)
  { src: "/part-flower.png", x: -350, y: -300, rot: -15, scale: 0.22, blur: 4, zIndex: 80, blend: "normal" },
  { src: "/part-flower.png", x: 350, y: 200, rot: 40, scale: 0.2, blur: 1, zIndex: 85, blend: "normal" },
  { src: "/part-flower.png", x: -250, y: 300, rot: 105, scale: 0.25, blur: 6, zIndex: 80, blend: "normal" },

  // 5. CLUSTERS (Largest, only 2)
  { src: "/part-cluster.png", x: -200, y: 350, rot: -10, scale: 0.4, blur: 5, zIndex: 90, blend: "normal" },
  { src: "/part-cluster.png", x: 300, y: -250, rot: 25, scale: 0.35, blur: 2, zIndex: 95, blend: "normal" }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const tinyLogoRef = useRef<HTMLDivElement>(null);
  const geoRingRef = useRef<SVGSVGElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const jewelleryRef = useRef<HTMLDivElement>(null);
  
  // NEW REFS for Hero Assembly
  const heroPartsRef = useRef<(HTMLImageElement | null)[]>([]);
  const heroFinalPieceRef = useRef<HTMLImageElement>(null);
  
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  
  const assemblyPinRef = useRef<HTMLDivElement>(null);
  const assemblyTrackRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<HTMLImageElement>(null);
  const finalPieceRef = useRef<HTMLImageElement>(null);
  const lightSweepRef = useRef<HTMLDivElement>(null);
  const partsRef = useRef<(HTMLImageElement | null)[]>([]);
  const [isExploded, setIsExploded] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      
      // Setup Initial Scatter BEFORE the timeline starts so it's ready instantly
      heroPartsRef.current.forEach((part, i) => {
        if (!part || !explodedParts[i]) return;
        gsap.set(part, {
          x: explodedParts[i].x * 1.5, 
          y: explodedParts[i].y * 1.5,
          rotation: explodedParts[i].rot,
          scale: explodedParts[i].scale * 1.2,
          filter: `blur(${explodedParts[i].blur + 2}px)`,
          opacity: 0
        });
      });

      // No delay! Start immediately.
      const tl = gsap.timeline(); 
      
      // 1. Reveal the screen quickly
      tl.to(transitionRef.current, {
        clipPath: "circle(0% at 50% 50%)",
        duration: 0.8,
        ease: "power4.inOut"
      })
      // 2. Instantly fade in the scattered parts and background UI
      .to(heroPartsRef.current, { opacity: 1, duration: 0.5, stagger: 0.01 }, "-=0.4")
      .to(tinyLogoRef.current, { opacity: 1, duration: 1, ease: "power2.inOut" }, "-=0.5")
      .to(lightRef.current, { opacity: 0.5, duration: 1.5, ease: "power2.inOut" }, "-=1")
      // 3. Magically snap the pieces together FAST
      .to(heroPartsRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: (i) => explodedParts[i].scale * 0.45,
        filter: "blur(0px)",
        stagger: 0.01,
        duration: 2,
        ease: "power3.inOut"
      }, "-=0.2")
      // 4. Show final piece and bring in the text while the snap happens
      .to(heroFinalPieceRef.current, { opacity: 1, duration: 0.5 }, "-=0.5")
      .to(heroPartsRef.current, { opacity: 0, duration: 0.5 }, "<")
      .to(geoRingRef.current, { opacity: 0.15, scale: 1, rotation: 180, duration: 1.5, ease: "power2.out" }, "-=1.5")
      .to([nameRef.current, titleRef.current], { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }, "-=1.5")
      .to(quoteRef.current, { opacity: 1, duration: 1.5, ease: "power2.inOut" }, "-=0.8")
      .to(ctaRef.current, { opacity: 1, duration: 1 }, "-=1");

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

      // Interactive Assembly Animation (Lower down the page)
      if (assemblyPinRef.current) {
        const assemblyTl = gsap.timeline({
          scrollTrigger: {
            trigger: assemblyPinRef.current,
            start: "top top",
            end: "+=250%",
            scrub: 1.2,
            pin: true
          }
        });

        partsRef.current.forEach((part, i) => {
          if (!part || !explodedParts[i]) return;
          gsap.set(part, {
            x: explodedParts[i].x,
            y: explodedParts[i].y,
            rotation: explodedParts[i].rot,
            scale: explodedParts[i].scale, 
            filter: `blur(${explodedParts[i].blur}px)`,
            opacity: 0
          });
        });

        assemblyTl
          .to(sketchRef.current, { opacity: 0.6, duration: 1 })
          .to(partsRef.current, { opacity: 1, stagger: 0.02, duration: 1 }, "<")
          .to(partsRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            filter: "blur(0px)",
            scale: (i) => explodedParts[i].scale, 
            stagger: 0.05,
            duration: 3,
            ease: "power3.inOut"
          })
          .to(sketchRef.current, { opacity: 0.05, duration: 1 }, "-=1")
          .to(finalPieceRef.current, { opacity: 1, duration: 1 }, "-=0.5")
          .to(partsRef.current, { opacity: 0, duration: 0.5 }, "<")
          .fromTo(lightSweepRef.current, 
            { x: "-150%", opacity: 0 }, 
            { x: "150%", opacity: 0.5, duration: 1.5, ease: "power1.inOut" }, 
            "-=0.5"
          )
          .to(".assembly-annotation", { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 }, "-=0.4");
      }

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

      const cultTl = gsap.timeline({
        scrollTrigger: { trigger: ".cultural-text-sequence", start: "top 70%", end: "bottom 40%", scrub: 1 }
      });
      cultTl.to(".cult-trad", { opacity: 0, y: -20 })
            .to(".cult-mod", { opacity: 1, y: 0 }, "<")
            .to(".cult-mod", { opacity: 0, y: -20 })
            .to(".cult-fut", { opacity: 1, y: 0 }, "<");

      gsap.to(".direction-path", {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: ".direction-transition-section",
          start: "top 50%",
          end: "bottom 20%",
          scrub: 1
        }
      });

      gsap.fromTo(".final-statement-line", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.3, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: ".final-section", start: "top 60%" } }
      );

    }, containerRef);

    const xLight = gsap.quickTo(lightRef.current, "x", { duration: 0.8, ease: "power3" });
    const yLight = gsap.quickTo(lightRef.current, "y", { duration: 0.8, ease: "power3" });
    const xCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
    const yCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const relX = e.clientX - rect.left - (rect.width / 2);
        const relY = e.clientY - rect.top - (rect.height / 2);
        xLight(relX * 0.5);
        yLight(relY * 0.5);
      }
      
      if (isExploded) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        
        partsRef.current.forEach((part, i) => {
          if (!part || !explodedParts[i]) return;
          const depth = explodedParts[i].zIndex / 10;
          gsap.to(part, { x: explodedParts[i].x + (dx * 15 * depth), y: explodedParts[i].y + (dy * 15 * depth), duration: 1 });
        });
      }

      xCursor(e.clientX);
      yCursor(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorType = target.getAttribute("data-cursor");
      
      if (cursorType) {
        if (cursorTextRef.current) cursorTextRef.current.innerText = cursorType;
        gsap.to(cursorRef.current, { scale: 3.2, backgroundColor: "rgba(212,175,55,0.9)", mixBlendMode: "normal", duration: 0.3 });
      } else {
        if (cursorTextRef.current) cursorTextRef.current.innerText = "";
        gsap.to(cursorRef.current, { scale: 1, backgroundColor: "#F5F3EC", mixBlendMode: "difference", duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isExploded]);

  const toggleExplodedView = () => {
    const nextState = !isExploded;
    setIsExploded(nextState);

    if (nextState) {
      gsap.to(finalPieceRef.current, { opacity: 0, duration: 0.4 });
      gsap.to(sketchRef.current, { opacity: 0.6, duration: 0.6 });
      
      partsRef.current.forEach((part, i) => {
        if (!part || !explodedParts[i]) return;
        gsap.to(part, {
          x: explodedParts[i].x,
          y: explodedParts[i].y,
          rotation: explodedParts[i].rot,
          scale: explodedParts[i].scale,
          filter: `blur(${explodedParts[i].blur}px)`,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          delay: i * 0.02
        });
      });
      gsap.to(".assembly-annotation", { opacity: 0, duration: 0.3 });
    } else {
      partsRef.current.forEach((part, i) => {
        if (!part || !explodedParts[i]) return;
        gsap.to(part, { x: 0, y: 0, rotation: 0, scale: explodedParts[i].scale * 0.5, filter: "blur(0px)", duration: 1, ease: "power3.inOut" });
      });
      gsap.to(finalPieceRef.current, { opacity: 1, duration: 0.5, delay: 0.8 });
      gsap.to(partsRef.current, { opacity: 0, duration: 0.5, delay: 0.8 });
      gsap.to(sketchRef.current, { opacity: 0.05, duration: 0.6, delay: 0.5 });
      gsap.to(".assembly-annotation", { opacity: 1, duration: 0.5, delay: 1 });
    }
  };

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
      
      <div ref={transitionRef} className="fixed inset-0 z-[9999] bg-[#2A090D] pointer-events-none" style={{ clipPath: "circle(150% at 50% 50%)" }} />

      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-[#F5F3EC] rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity">
        <span ref={cursorTextRef} className="text-[3px] font-sans text-[#2A090D] uppercase tracking-widest font-bold absolute" />
      </div>

      <section ref={heroRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#2A090D]">
        <div ref={tinyLogoRef} className="absolute top-1/4 opacity-0 font-serif text-[#D4AF37]/40 text-sm italic tracking-widest">
          DB.
        </div>

        <svg ref={geoRingRef} className="absolute inset-0 w-full h-full opacity-0 scale-90 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <circle cx="50" cy="50" r="35" fill="none" stroke="#D4AF37" strokeWidth="0.05" strokeDasharray="0.5 1.5" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="0.02" />
          <text x="50" y="14" fill="#D4AF37" fontSize="1" textAnchor="middle" opacity="0.4">N</text>
          <text x="50" y="87" fill="#D4AF37" fontSize="1" textAnchor="middle" opacity="0.4">S</text>
          <text x="86" y="50.3" fill="#D4AF37" fontSize="1" textAnchor="middle" opacity="0.4">E</text>
          <text x="14" y="50.3" fill="#D4AF37" fontSize="1" textAnchor="middle" opacity="0.4">W</text>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div ref={lightRef} className="absolute w-[60vw] h-[60vw] bg-radial-gradient from-[#D4AF37]/15 via-transparent to-transparent opacity-0 mix-blend-screen blur-3xl rounded-full" />
          
          <div 
            ref={jewelleryRef} 
            className="relative w-[54vw] md:w-[36vw] max-w-[520px] aspect-square pointer-events-auto flex items-center justify-center" 
            data-cursor="EXPLORE"
          >
            {/* HERO SCATTERED COMPONENTS */}
            {explodedParts.map((comp, i) => (
              <img 
                key={`hero-part-${i}`}
                ref={(el) => { heroPartsRef.current[i] = el; }}
                src={comp.src}
                className="absolute w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-2xl"
                style={{ zIndex: comp.zIndex, mixBlendMode: comp.blend as any }}
              />
            ))}

            {/* HERO FINAL NECKLACE */}
            <img 
              ref={heroFinalPieceRef}
              src="/necklace-final.png" 
              alt="High Jewellery Necklace: Floral Symphony" 
              className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl brightness-95 contrast-110 opacity-0" 
            />
          </div>
        </div>

        <div className="relative z-20 flex flex-col items-center text-center mt-[40vh] md:mt-[50vh]">
          <h1 ref={nameRef} className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#F5F3EC] uppercase tracking-widest opacity-0 translate-y-10 leading-none drop-shadow-lg">
            Disha<br/>Bafna
          </h1>
          <p ref={titleRef} className="font-sans text-[10px] md:text-xs tracking-[0.6em] text-[#D4AF37] uppercase mt-8 opacity-0 translate-y-4">
            Jewellery Designer
          </p>
          <p ref={quoteRef} className="font-serif italic text-lg md:text-2xl text-[#F5F3EC]/70 mt-12 opacity-0 max-w-lg px-6">
            "Disha means direction. It also means the vision that guides every piece."
          </p>
          
          <a 
            ref={ctaRef}
            href="/collections"
            onClick={(e) => handleNavigation(e, "/collections")}
            data-cursor="ENTER"
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-pulse">
          <span className="font-sans text-[8px] tracking-[0.4em] uppercase mb-4 text-[#D4AF37]">Scroll to discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </div>
      </section>

      <section className="w-full py-40 px-6 bg-[#F5F3EC] text-[#2A090D] relative overflow-hidden rounded-t-[3rem] -mt-12 z-30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="font-serif text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] mb-8">
              Find<br/>Your<br/><span className="text-[#D4AF37]">North.</span>
            </h2>
            <p className="font-sans text-sm tracking-widest uppercase text-[#2A090D]/60 mb-6 max-w-md">
              I am Disha, a jewellery designer driven by curiosity, craft, and the quiet search for personal narrative.
            </p>
            <p className="font-sans text-sm tracking-widest uppercase text-[#2A090D]/60 mb-12 border-l border-[#D4AF37] pl-6 max-w-sm">
              My name means direction. Every sketch, line, and gemstone placement represents a plotted course from imagination into physical form.
            </p>
          </div>

          <div className="w-full lg:w-1/2 story-sequence-container relative h-[400px] flex items-center">
            <div className="absolute left-0 right-0 h-[1px] bg-[#2A090D]/10 top-1/2 -translate-y-1/2" />
            <div className="story-line-fill absolute left-0 right-0 h-[1px] bg-[#D4AF37] top-1/2 -translate-y-1/2 scale-x-0" />
            
            <div className="relative z-10 w-full flex justify-between items-center text-center font-sans text-[9px] md:text-xs tracking-[0.3em] uppercase font-bold text-[#2A090D]">
              {["Story", "Idea", "Sketch", "CAD", "Form", "Jewellery"].map((node) => (
                <div key={node} className="story-node flex flex-col items-center bg-[#F5F3EC] px-2 md:px-4">
                  <div className="w-2 h-2 rounded-full bg-[#2A090D] mb-4 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                  {node}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ASSEMBLY SECTION */}
      <section ref={assemblyPinRef} className="relative w-full h-screen bg-[#2A090D] overflow-hidden border-t border-[#D4AF37]/10">
        <div ref={assemblyTrackRef} className="relative w-full h-full flex flex-col items-center justify-center px-6">
          
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <svg className="w-[120vw] h-[120vw] max-w-[900px]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#D4AF37" strokeWidth="0.06" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="#D4AF37" strokeWidth="0.04" strokeDasharray="1 2" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="#D4AF37" strokeWidth="0.04" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="#D4AF37" strokeWidth="0.04" />
            </svg>
          </div>

          <div className="relative w-full max-w-4xl h-[62vh] flex items-center justify-center">
            
            <img 
              ref={sketchRef}
              src="/necklace-sketch.png" 
              alt="Design progression"
              className="absolute inset-0 w-full h-full object-contain opacity-0 mix-blend-screen transition-opacity duration-500 pointer-events-none filter contrast-125"
            />

            <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
              {explodedParts.map((comp, i) => (
                <img 
                  key={i}
                  ref={(el) => { partsRef.current[i] = el; }}
                  src={comp.src}
                  alt="Jewellery Component"
                  className="absolute w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-2xl"
                  style={{ zIndex: comp.zIndex, mixBlendMode: comp.blend as any }}
                />
              ))}
            </div>

            <div className="relative w-full h-full max-w-[560px] flex items-center justify-center z-10">
              <img 
                ref={finalPieceRef}
                src="/necklace-final.png" 
                alt="Floral Symphony Necklace"
                className="w-full h-full object-contain opacity-0 drop-shadow-2xl"
              />
              <div className="absolute inset-0 overflow-hidden mix-blend-overlay pointer-events-none rounded-full">
                <div ref={lightSweepRef} className="w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] opacity-0" />
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none">
              <div className="assembly-annotation absolute top-[14%] left-[6%] opacity-0 translate-y-3">
                <span className="block font-sans text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase mb-1">Motif Study</span>
                <span className="block font-serif italic text-sm text-[#F5F3EC]/80">Floral Asymmetry</span>
              </div>
              <div className="assembly-annotation absolute bottom-[18%] right-[6%] opacity-0 translate-y-3 text-right">
                <span className="block font-sans text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase mb-1">Stone Mapping</span>
                <span className="block font-serif italic text-sm text-[#F5F3EC]/80">Graduated Pink Sapphires</span>
                <div className="w-full h-[1px] bg-[#D4AF37]/30 mt-2" />
              </div>
            </div>
          </div>

          <div className="relative z-30 flex flex-col items-center text-center mt-4">
            <button 
              onClick={toggleExplodedView}
              data-cursor="CLICK"
              className="assembly-annotation opacity-0 mb-6 font-sans text-[9px] tracking-[0.3em] uppercase text-[#F5F3EC] border border-[#D4AF37]/40 px-8 py-3 hover:bg-[#D4AF37] hover:text-[#2A090D] transition-colors duration-500"
            >
              {isExploded ? "Assemble Form" : "Explore Construction"}
            </button>
            <div className="assembly-annotation opacity-0">
              <h3 className="font-serif text-2xl md:text-3xl text-[#F5F3EC] tracking-wide mb-2">Floral Symphony</h3>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#D4AF37]/70">
                Manual ideation translated into fine jewellery setting.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="w-full bg-[#1A0507]">
        <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden group border-b border-[#D4AF37]/10" data-cursor="EXPLORE">
          <img src="/api/placeholder/1920/1080" alt="Freedom to Dream" className="absolute inset-0 w-full h-full object-cover opacity-30 transition-transform duration-[2s] group-hover:scale-105 group-hover:opacity-50 blur-sm group-hover:blur-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0507] via-transparent to-transparent" />
          
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="font-sans text-xs tracking-[0.5em] text-[#D4AF37] uppercase mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-4 group-hover:translate-y-0">
              01: Freedom To Dream
            </span>
            <h2 className="font-serif text-6xl md:text-8xl text-[#F5F3EC] uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity duration-700">
              Imagination<br/>As Freedom
            </h2>
            <a href="/collections" onClick={(e) => handleNavigation(e, "/collections")} className="mt-12 font-sans text-[10px] tracking-[0.4em] uppercase text-[#F5F3EC]/50 hover:text-[#D4AF37] transition-colors pb-1 border-b border-[#D4AF37]/30">
              Explore Collection
            </a>
          </div>
        </div>

        <div className="collection-abstract relative w-full h-[80vh] flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/10">
          <div className="absolute inset-0 flex space-x-12 opacity-10 justify-center">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="abstract-geo-line w-[1px] h-full bg-[#D4AF37] origin-top scale-y-0" />
            ))}
          </div>
          <div className="relative z-10 max-w-4xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-sans text-xs tracking-[0.5em] text-[#D4AF37] uppercase mb-4 block">02: Abstract & Retro</span>
              <h2 className="font-serif text-5xl md:text-7xl text-[#F5F3EC] uppercase tracking-widest mb-8 leading-none">
                Geometry<br/>In Motion
              </h2>
              <p className="font-sans text-[10px] tracking-widest uppercase text-[#F5F3EC]/50 mb-12">Metro, City Lines, Ticket Booths</p>
              <a href="/collections" onClick={(e) => handleNavigation(e, "/collections")} className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#F5F3EC]/50 hover:text-[#D4AF37] transition-colors pb-1 border-b border-[#D4AF37]/30">
                Explore Collection
              </a>
            </div>
            <div className="h-[40vh] bg-[#2A090D] border border-[#D4AF37]/20 p-4 relative">
               <img src="/api/placeholder/600/800" alt="Abstract Jewellery" className="w-full h-full object-cover opacity-70 sepia-[0.3]" />
            </div>
          </div>
        </div>

        <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="relative z-10 text-center">
             <span className="font-sans text-xs tracking-[0.5em] text-[#D4AF37] uppercase mb-12 block">03: Cultural Echoes</span>
             
             <div className="cultural-text-sequence h-24 relative overflow-hidden mb-8">
               <h2 className="cult-trad absolute w-full font-serif text-6xl md:text-8xl text-[#D4AF37]/30 uppercase tracking-widest">Tradition</h2>
               <h2 className="cult-mod absolute w-full font-serif text-6xl md:text-8xl text-[#D4AF37]/70 uppercase tracking-widest opacity-0 translate-y-10">Modern</h2>
               <h2 className="cult-fut absolute w-full font-serif text-6xl md:text-8xl text-[#F5F3EC] uppercase tracking-widest opacity-0 translate-y-10">Future</h2>
             </div>
             
             <a href="/collections" onClick={(e) => handleNavigation(e, "/collections")} className="mt-12 font-sans text-[10px] tracking-[0.4em] uppercase text-[#F5F3EC]/50 hover:text-[#D4AF37] transition-colors pb-1 border-b border-[#D4AF37]/30 inline-block">
               Explore Collection
             </a>
          </div>
        </div>

      </section>

      <section className="w-full py-40 px-6 bg-[#F5F3EC] text-[#2A090D] text-center flex flex-col items-center">
        <h2 className="font-serif text-5xl md:text-8xl uppercase tracking-tighter leading-[0.9] mb-6">
          Three Worlds.<br/><span className="text-[#D4AF37]">One Designer.</span>
        </h2>
        <p className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-[#2A090D]/50 mb-32">
          Dream, Movement, Heritage
        </p>

        <div className="max-w-2xl text-center flex flex-col items-center">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-4 font-bold block">Meet Disha</span>
          <p className="font-serif italic text-2xl md:text-4xl text-[#2A090D]/80 mb-12">
            Jewellery designer. Storyteller. Observer.
          </p>
          <a href="/about" onClick={(e) => handleNavigation(e, "/about")} className="group flex items-center space-x-4 font-sans text-[10px] tracking-[0.3em] uppercase text-[#2A090D] hover:text-[#D4AF37] transition-colors">
            <span>Discover My Direction</span>
            <span className="w-12 h-[1px] bg-[#2A090D] group-hover:bg-[#D4AF37] group-hover:w-16 transition-all" />
          </a>
        </div>
      </section>

      <section className="direction-transition-section relative w-full h-[120vh] bg-[#2A090D] flex flex-col items-center justify-center">
        <div className="sticky top-1/3 text-center z-20 mix-blend-difference">
          <h2 className="font-serif text-6xl md:text-9xl text-[#F5F3EC] uppercase tracking-tighter leading-[0.8]">
            Where<br/>Does Design<br/><span className="text-[#D4AF37]">Take You?</span>
          </h2>
        </div>
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path className="direction-path" d="M 50,0 Q 20,25 50,50 T 50,100" fill="none" stroke="#D4AF37" strokeWidth="0.2" strokeDasharray="150" strokeDashoffset="150" />
        </svg>

        <div className="absolute bottom-32 text-center z-20 bg-[#2A090D]/80 backdrop-blur-md py-6 px-12 rounded-full border border-[#D4AF37]/20">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-4 block">This Way ↓</span>
          <a href="/process" onClick={(e) => handleNavigation(e, "/process")} className="font-sans text-xs tracking-widest uppercase text-[#F5F3EC] hover:text-[#D4AF37] transition-colors">
            Explore The Process
          </a>
        </div>
      </section>

      <section className="w-full py-32 px-6 bg-[#1A0507]">
        <h2 className="text-center font-sans text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase mb-24">From Thought To Form</h2>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { num: "01", title: "Ideation", img: "/necklace-sketch.png" },
            { num: "02", title: "Development", img: "/api/placeholder/600/800" },
            { num: "03", title: "Final Form", img: "/necklace-final.png" }
          ].map((step, i) => (
            <div key={i} className="flex flex-col border border-[#D4AF37]/10 p-6 hover:bg-[#2A090D] transition-colors duration-500">
               <span className="font-serif text-4xl text-[#D4AF37]/30 mb-6">{step.num}</span>
               <div className="h-[40vh] w-full bg-[#2A090D] mb-6 overflow-hidden flex items-center justify-center p-4">
                 <img src={step.img} alt={step.title} className="w-full h-full object-contain opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-700" />
               </div>
               <h3 className="font-sans text-sm tracking-[0.3em] uppercase text-[#F5F3EC]">{step.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="final-section relative w-full min-h-screen bg-[#2A090D] flex flex-col items-center justify-center text-center px-6 border-t border-[#D4AF37]/10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-10 pointer-events-none mix-blend-overlay" />
        
        <div className="mb-32">
          <h2 className="final-statement-line font-serif text-5xl md:text-8xl lg:text-9xl text-[#F5F3EC] uppercase tracking-tighter mb-8">
            Every Piece<br/>Begins As A Story.
          </h2>
          <p className="final-statement-line font-serif text-2xl md:text-5xl text-[#D4AF37] italic opacity-80 mb-4">Quietly told.</p>
          <p className="final-statement-line font-serif text-2xl md:text-5xl text-[#D4AF37] italic opacity-50 mb-16">Carefully cut.</p>
          <p className="final-statement-line font-sans text-[10px] tracking-[0.5em] uppercase text-[#F5F3EC]/40">Disha Bafna</p>
        </div>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-16 font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase">
          <a href="/collections" onClick={(e) => handleNavigation(e, "/collections")} className="text-[#F5F3EC]/70 hover:text-[#D4AF37] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">Enter The Collections →</a>
          <a href="/process" onClick={(e) => handleNavigation(e, "/process")} className="text-[#F5F3EC]/70 hover:text-[#D4AF37] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">Discover The Process →</a>
          <a href="/about" onClick={(e) => handleNavigation(e, "/about")} className="text-[#F5F3EC]/70 hover:text-[#D4AF37] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">Find My Direction →</a>
        </div>
      </section>

      <footer className="w-full bg-[#1A0507] py-12 px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left border-t border-[#D4AF37]/5 relative z-20">
        <div className="mb-8 md:mb-0">
          <a href="/" data-cursor="HOME" className="block mb-4">
            <img 
              src="/logo.png" 
              alt="Disha Bafna" 
              className="h-10 md:h-14 w-auto object-contain mx-auto md:mx-0" 
            />
          </a>
          <div className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#F5F3EC]/70">Disha Bafna</div>
          <div className="font-sans text-[8px] tracking-[0.3em] uppercase text-[#F5F3EC]/30">Jewellery Designer</div>
        </div>

        <div className="flex space-x-8 font-sans text-[9px] tracking-[0.3em] uppercase text-[#F5F3EC]/50 mb-8 md:mb-0">
          <a href="/about" onClick={(e) => handleNavigation(e, "/about")} className="hover:text-[#D4AF37] transition-colors">About</a>
          <a href="/collections" onClick={(e) => handleNavigation(e, "/collections")} className="hover:text-[#D4AF37] transition-colors">Collections</a>
          <a href="/process" onClick={(e) => handleNavigation(e, "/process")} className="hover:text-[#D4AF37] transition-colors">Process</a>
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