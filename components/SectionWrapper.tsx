import React, { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className = "", id, delay = 0 }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    // Reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse", // Enter, Leave, Enter Back, Leave Back
      }
    });

    tl.fromTo(content, 
      { 
        y: 100, 
        opacity: 0,
        scale: 0.95,
        rotationX: 10 
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        rotationX: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: delay
      }
    );

    return () => {
      tl.kill();
    };
  }, [delay]);

  return (
    <section 
      ref={sectionRef} 
      id={id} 
      className={`relative w-full py-16 md:py-24 overflow-hidden ${className}`}
    >
      <div ref={contentRef} className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;