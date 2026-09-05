"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "../../lib/utils";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;

    // The inner dot moves instantly
    const xMoveDot = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power3" });
    const yMoveDot = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power3" });
    
    // The outer ring has a slight lag for that heavy, luxury feel
    const xMoveRing = gsap.quickTo(ringRef.current, "x", { duration: 0.5, ease: "power3" });
    const yMoveRing = gsap.quickTo(ringRef.current, "y", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xMoveDot(e.clientX);
      yMoveDot(e.clientY);
      xMoveRing(e.clientX);
      yMoveRing(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactable = target.closest('[data-cursor]');
      
      if (interactable) {
        const text = interactable.getAttribute('data-cursor');
        setHoverText(text || "VIEW");
        gsap.to(ringRef.current, { scale: 2.5, backgroundColor: '#F5F3EC', mixBlendMode: 'normal', duration: 0.3 });
        gsap.to(dotRef.current, { opacity: 0, duration: 0.2 });
        gsap.to(textRef.current, { opacity: 1, duration: 0.2 });
      } else {
        setHoverText("");
        gsap.to(ringRef.current, { scale: 1, backgroundColor: 'transparent', mixBlendMode: 'difference', duration: 0.3 });
        gsap.to(dotRef.current, { opacity: 1, duration: 0.2 });
        gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  return (
    <>
      {/* Outer Trailing Ring */}
      <div
        ref={ringRef}
        className={cn(
          "fixed top-0 left-0 w-10 h-10 border border-luxury-paper rounded-full pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 mix-blend-difference",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <span 
          ref={textRef} 
          className="text-[5px] font-sans tracking-widest text-luxury-charcoal uppercase whitespace-nowrap opacity-0 font-bold"
        >
          {hoverText}
        </span>
      </div>
      
      {/* Inner Fast Dot */}
      <div
        ref={dotRef}
        className={cn(
          "fixed top-0 left-0 w-2 h-2 bg-luxury-paper rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 mix-blend-difference",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      />
    </>
  );
}