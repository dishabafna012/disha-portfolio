"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FadeInTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function FadeInText({ text, className, delay = 0 }: FadeInTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Context is mandatory in React to prevent 'removeChild' errors
    const ctx = gsap.context(() => {
      gsap.to(".word-span", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.02,
        ease: "power4.out",
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", 
          toggleActions: "play none none reverse"
        }
      });
    }, containerRef);

    // Revert completely cleans up the DOM before React unmounts it
    return () => ctx.revert();
  }, [text, delay]);

  return (
    <div ref={containerRef} className={cn("flex flex-wrap leading-relaxed", className)}>
      {words.map((word, index) => (
        <div key={index} className="inline-flex overflow-hidden mr-[0.25em] mb-[0.1em]">
          <span className="word-span inline-block opacity-0 translate-y-full">
            {word}
          </span>
        </div>
      ))}
    </div>
  );
}