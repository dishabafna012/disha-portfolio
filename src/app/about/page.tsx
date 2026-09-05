"use client";

import Footer from "../../components/layout/Footer"; 
// (Adjust the `../../` path depending on the folder depth)
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeInText from "../../components/animations/FadeInText";
import { profileData } from "../../data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const timelineLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Timeline Line Animation
    if (timelineLineRef.current) {
      gsap.fromTo(
        timelineLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineLineRef.current.parentElement,
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        }
      );
    }

    // 2. Timeline Items Animation
    const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="w-full bg-luxury-paper pt-32 pb-24 min-h-screen">
      
      {/* ABOUT INTRO */}
      <section className="w-full py-20 px-6 md:px-24 flex items-center justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-luxury-burgundy">
              I translate quiet stories, emotions and inspirations into wearable forms.
            </h1>
            <div className="w-24 h-[1px] bg-luxury-gold/50" />
            <FadeInText text={profileData.bio} className="font-sans text-lg md:text-xl text-luxury-charcoal/80 max-w-md font-light" />
          </div>
          <div className="relative h-[70vh] w-full" data-cursor="VIEW">
            <div className="absolute inset-0 bg-luxury-burgundy/10 rounded-t-full border border-luxury-gold/20 overflow-hidden flex items-center justify-center">
              <span className="font-serif text-luxury-burgundy/30 text-9xl italic">DB</span>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="w-full py-32 px-6 relative mt-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-6xl text-luxury-burgundy mb-24 uppercase tracking-widest text-center">
            Design Journey
          </h2>
          <div className="relative w-full">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-luxury-gold/20 -translate-x-1/2 origin-top" />
            <div ref={timelineLineRef} className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-luxury-gold -translate-x-1/2 origin-top" />

            {profileData.education.map((item, index) => (
              <div key={`edu-${index}`} className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-5/12" />
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-luxury-paper border-2 border-luxury-gold -translate-x-1/2 mt-2 md:mt-0 z-10" />
                <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <span className="font-sans text-sm tracking-widest text-luxury-gold">{item.years}</span>
                  <h3 className="font-serif text-2xl text-luxury-burgundy mt-2">{item.degree}</h3>
                  <p className="font-sans text-sm text-luxury-charcoal/70 mt-2 uppercase tracking-wide">{item.institution}</p>
                </div>
              </div>
            ))}

            <div className="py-12 flex justify-center timeline-item">
              <span className="font-serif italic text-2xl text-luxury-sand">Experience</span>
            </div>

            {profileData.experience.map((item, index) => (
              <div key={`exp-${index}`} className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-5/12" />
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-luxury-burgundy border-2 border-luxury-paper -translate-x-1/2 mt-2 md:mt-0 z-10" />
                <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${index % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <span className="font-sans text-sm tracking-widest text-luxury-gold">{item.duration}</span>
                  <h3 className="font-serif text-2xl text-luxury-charcoal mt-2">{item.role}</h3>
                  <p className="font-sans text-sm text-luxury-burgundy/80 mt-2 uppercase tracking-wide">{item.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    {/* Existing page content above... */}
      <Footer />
    </div>
  );
}