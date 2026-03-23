import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Aperture } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax for background image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Subtle Fade In for Text
      gsap.from(".hero-text-element", {
        y: 30,
        opacity: 0,
        duration: 2,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.5
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-fuji-ink text-fuji-cream">
      
      {/* Background Layer with Film aesthetic */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={imageRef}
          src="/6.jpeg" 
          alt="Atmospheric Background" 
          className="w-full h-[120%] object-cover -mt-[5%] opacity-90 analog-photo"
        />
        {/* Soft bloom overlay */}
        <div className="absolute inset-0 bg-black/40 mix-blend-soft-light"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-fuji-ink/60 via-transparent to-fuji-ink"></div>
      </div>

      {/* Film Specs / Metadata */}
      <div className="absolute top-10 left-10 md:left-10 z-20 text-[10px] md:text-xs font-sans tracking-[0.2em] text-fuji-charcoal/80 uppercase hidden md:block">
        <p>Pro 400H / EXP. 36</p>
        <p>ISO 400 / 35mm</p>
      </div>

      <div className="absolute top-10 right-10 z-20 text-[10px] md:text-xs font-sans tracking-[0.2em] text-fuji-charcoal/80 uppercase hidden md:block">
        <p>F/2.8 1/125s</p>
        <p>Bandung, Indonesia</p>
      </div>

      {/* Main Content */}
      <div ref={textRef} className="relative z-20 text-center px-4 flex flex-col items-center max-w-4xl">
        
        <div className="hero-text-element mb-6 md:mb-8">
            <span className="inline-block py-1 px-3 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.3em] bg-black/40 backdrop-blur-sm text-fuji-cream">
                Simpan Tanggalnya
            </span>
        </div>
        
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-fuji-cream mb-4 tracking-tight leading-none mix-blend-screen">
          <span className="hero-text-element inline-block">Hesti</span>
          <span className="hero-text-element inline-block font-thin italic mx-4 text-fuji-sageDark">&</span>
          <span className="hero-text-element inline-block">Ulul</span>
        </h1>
        
        <p className="hero-text-element font-sans font-light text-sm md:text-lg text-fuji-mist mt-6 mb-8 tracking-[0.2em] uppercase">
          Akan Segera Menikah
        </p>

        <div className="hero-text-element bg-black/40 backdrop-blur-md px-8 py-6 rounded-sm shadow-sm border border-white/10">
           <p className="font-serif italic text-3xl md:text-4xl text-fuji-cream font-light">19 April 2026</p>
           <div className="w-8 h-[1px] bg-white/20 mx-auto my-3"></div>
           <p className="font-sans text-xs tracking-widest text-fuji-mist uppercase">Bandung</p>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-fuji-cream/50">
        <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest">Gulir</span>
            <div className="w-[1px] h-12 bg-white/20"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;