"use client";

import Footer from "../../components/layout/Footer"; 
// (Adjust the `../../` path depending on the folder depth)
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  {
    id: "01",
    title: "The Sketch",
    subtitle: "Capturing the Concept",
    description: "Every piece begins as a quiet story. Raw emotions and inspirations are first translated onto paper through fluid, unrestricted sketching. This is where the soul of the jewellery is born.",
    align: "left"
  },
  {
    id: "02",
    title: "CAD Modeling",
    subtitle: "Precision & Structure",
    description: "The organic lines of the sketch are meticulously translated into 3D space. Computer-Aided Design ensures structural integrity, perfect gemstone setting calculations, and flawless proportions.",
    align: "right"
  },
  {
    id: "03",
    title: "The Final Form",
    subtitle: "Wearable Art",
    description: "From digital exactness to physical reality. The piece is cast, polished, and set. What started as an abstract thought is now a tangible, wearable form ready to be experienced.",
    align: "left"
  }
];

export default function ProcessPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal
      gsap.fromTo(
        ".process-hero",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out" }
      );

      // 2. Scroll-triggered Step Animations
      const steps = gsap.utils.toArray(".process-step");
      steps.forEach((step: any) => {
        const textContent = step.querySelector(".step-text");
        const imageContent = step.querySelector(".step-image");
        const numberContent = step.querySelector(".step-number");

        // Animate the massive background number
        gsap.fromTo(
          numberContent,
          { x: step.dataset.align === "left" ? -100 : 100, opacity: 0 },
          {
            x: 0,
            opacity: 0.05,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Animate the text block sliding up
        gsap.fromTo(
          textContent.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Animate the image block revealing with a clipping mask
        gsap.fromTo(
          imageContent,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: step,
              start: "top 60%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-luxury-paper text-luxury-charcoal pt-32 pb-32 overflow-hidden">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-24 mb-32 flex flex-col items-center text-center">
        <span className="process-hero font-sans text-sm tracking-[0.4em] text-luxury-gold uppercase mb-8 block">
          Methodology
        </span>
        <h1 className="process-hero font-serif text-5xl md:text-7xl lg:text-9xl text-luxury-burgundy uppercase tracking-wide mb-12">
          The Process
        </h1>
        <div className="process-hero w-[1px] h-32 bg-luxury-gold/50" />
      </div>

      {/* STEPS CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col space-y-32 md:space-y-48">
        {processSteps.map((step, index) => (
          <div 
            key={step.id} 
            className="process-step relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            data-align={step.align}
          >
            
            {/* Background Number */}
            <div 
              className={cn(
                "step-number absolute top-1/2 -translate-y-1/2 text-[30vw] font-serif font-bold text-luxury-burgundy z-0 pointer-events-none select-none",
                step.align === "left" ? "-right-10 md:-right-20" : "-left-10 md:-left-20"
              )}
            >
              {step.id}
            </div>

            {/* Text Block */}
            <div className={cn(
              "step-text relative z-10 flex flex-col justify-center",
              step.align === "right" ? "lg:order-2 lg:pl-16" : "lg:pr-16"
            )}>
              <span className="font-sans text-xs tracking-[0.3em] text-luxury-gold uppercase mb-4">
                Phase {step.id}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-luxury-burgundy mb-6 leading-tight">
                {step.title}
              </h2>
              <h3 className="font-sans text-sm tracking-widest text-luxury-charcoal/50 uppercase mb-8">
                {step.subtitle}
              </h3>
              <p className="font-sans text-lg text-luxury-charcoal/80 font-light leading-relaxed max-w-md">
                {step.description}
              </p>
            </div>

            {/* Image/Visual Block */}
            <div className={cn(
              "step-image relative z-10 w-full h-[60vh] bg-luxury-burgundy/5 border border-luxury-gold/20 flex items-center justify-center overflow-hidden",
              step.align === "right" ? "lg:order-1" : ""
            )} data-cursor="VIEW">
              <div className="absolute inset-0 bg-luxury-sand/10 mix-blend-multiply" />
              <span className="font-serif text-luxury-burgundy/20 text-4xl md:text-5xl italic px-8 text-center pointer-events-none">
                {step.title} Visual Placeholder
              </span>
            </div>

          </div>
        ))}
      </div>

    {/* Existing page content above... */}
      <Footer />
    </div>
  );
}