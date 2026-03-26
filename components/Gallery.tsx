import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';

const images = [
  "./1.jpeg",
  "./2.jpeg",
  "./3.jpeg",
  "./4.jpeg",
  "./6.jpeg"
];

// Refined Sprocket Hole Pattern (Rounded Rects for 35mm look)
const sprocketPattern = "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='10' y='8' width='20' height='24' rx='4' fill='%23FFF9F2'/%3E%3C/svg%3E";

// Simple Image Component optimized for mobile scrolling
const GalleryImage: React.FC<{ src: string; alt: string; index: number }> = React.memo(({ src, alt, index }) => {
  return (
    <div className="relative group flex flex-col items-center">
      {/* Photo Frame (Negative Style) */}
      <div className="relative p-1 bg-black shadow-lg">
        <div className="relative w-[300px] md:w-[380px] aspect-[2/3] overflow-hidden bg-[#0a0a0a]">
          
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover opacity-95"
            // No strict lazy loading or intersection observers here 
            // because they conflict with GSAP horizontal scrub on mobile Chrome
          />

          {/* Combined film overlay — single div with CSS */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 50% 40%, rgba(255,255,255,0.15) 0%, transparent 60%),
                radial-gradient(circle at 50% 50%, transparent 45%, rgba(10,15,20,0.6) 100%)
              `,
            }}
          />
          
          {/* Single color tint overlay instead of heavy CSS filter */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,249,242,0.06) 0%, rgba(0,51,68,0.12) 100%)',
              mixBlendMode: 'soft-light',
            }}
          />

          {/* Film grain — simplified, uses CSS only */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Film border effect — simplified CSS box-shadow */}
          <div 
            className="absolute inset-0 pointer-events-none z-40"
            style={{
              boxShadow: `
                inset 3px 3px 0 rgba(0,0,0,0.8),
                inset -3px -3px 0 rgba(0,0,0,0.8),
                inset 5px 5px 4px rgba(0,0,0,0.4),
                inset -5px -5px 4px rgba(0,0,0,0.4)
              `,
            }}
          />

        </div>
      </div>
      
      {/* Frame Number Details */}
      <div className="absolute -bottom-12 left-0 right-0 flex justify-between px-4">
        <span className="font-sans text-[12px] font-bold text-[#e8c65c] tracking-tighter opacity-80">{12 + index}</span>
        <span className="font-sans text-[12px] font-bold text-[#e8c65c] tracking-tighter opacity-80">{12 + index}A</span>
      </div>
    </div>
  );
});

GalleryImage.displayName = 'GalleryImage';

// Edge markings rendered once (reduced count: 8 instead of 15)
const EdgeMarkings = React.memo(() => (
  <>
    <div className="absolute top-5 left-0 w-full flex pointer-events-none z-20 overflow-hidden">
      <div className="flex gap-[600px] whitespace-nowrap pl-[5vw]">
        {Array.from({length: 8}).map((_, i) => (
          <div key={i} className="flex gap-4 items-center opacity-40">
            <span className="font-sans text-[8px] font-bold text-[#cfd9ce] tracking-widest">FUJIFILM</span>
            <span className="font-sans text-[8px] font-bold text-[#cfd9ce] tracking-widest">PRO 400H</span>
            <span className="font-sans text-[8px] font-bold text-[#cfd9ce] tracking-widest">➜</span>
            <span className="font-sans text-[8px] font-bold text-[#cfd9ce] tracking-widest ml-12">200</span>
          </div>
        ))}
      </div>
    </div>
    <div className="absolute bottom-5 left-0 w-full flex pointer-events-none z-20 overflow-hidden">
      <div className="flex gap-[600px] whitespace-nowrap pl-[20vw]">
        {Array.from({length: 8}).map((_, i) => (
          <div key={i} className="flex gap-8 items-center">
            <span className="font-sans text-[7px] text-[#cfd9ce] opacity-30 tracking-[0.2em]">SAFETY FILM</span>
          </div>
        ))}
      </div>
    </div>
  </>
));

EdgeMarkings.displayName = 'EdgeMarkings';

// Light leaks - simplified with reduced blur for mobile
const LightLeaks = React.memo(() => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // On mobile, use simpler gradients without blur for better perf
  const blurClass = isMobile ? 'blur-xl' : 'blur-3xl';
  const blurClassMd = isMobile ? 'blur-lg' : 'blur-2xl';

  return (
    <div className="absolute inset-0 pointer-events-none z-30 mix-blend-screen overflow-hidden">
      {/* Start of Roll Orange Burn */}
      <div className={`absolute -left-20 top-0 bottom-0 w-[40vw] bg-gradient-to-r from-orange-600/60 via-red-500/30 to-transparent ${blurClass}`} />
      
      {/* Occasional Light Streaks — only show on desktop */}
      {!isMobile && (
        <>
          <div className={`absolute left-[35%] top-[-20%] bottom-[-20%] w-32 bg-gradient-to-r from-blue-200/10 to-transparent skew-x-12 ${blurClassMd}`} />
          <div className={`absolute left-[75%] top-[-10%] bottom-[-10%] w-64 bg-gradient-to-l from-orange-200/10 to-transparent -skew-x-12 ${blurClass}`} />
        </>
      )}
      
      {/* End of roll burn */}
      <div className={`absolute right-0 top-0 bottom-0 w-[30vw] bg-gradient-to-l from-white/20 via-orange-100/10 to-transparent ${blurClass}`} />
    </div>
  );
});

LightLeaks.displayName = 'LightLeaks';

const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
      };

      // Detect mobile for optimized scrub value
      const isMobile = window.innerWidth < 768;

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          // Lower scrub value on mobile = less interpolation = smoother feel
          scrub: isMobile ? 0.8 : 1.5,
          end: () => `+=${track.scrollWidth - window.innerWidth + 500}`, 
          invalidateOnRefresh: true,
          anticipatePin: 1,
          // Reduce marker updates on mobile
          fastScrollEnd: isMobile ? 3000 : true,
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="bg-fuji-ink py-20 overflow-hidden h-screen flex items-center relative"
      style={{ contain: 'layout style paint' }}
    >
        
        {/* Floating Title */}
        <div className="absolute top-8 left-6 md:left-20 z-20 pointer-events-none mix-blend-screen opacity-90">
            <h2 className="font-serif text-5xl md:text-7xl text-fuji-cream italic font-light">
              Galeri Foto
            </h2>
            <p className="font-sans text-[10px] tracking-widest uppercase mt-2 text-fuji-mist">Roll No. 001 — April 2026</p>
        </div>

        {/* Scroll Track (The Film Strip) */}
        <div 
          ref={trackRef} 
          className="flex items-center w-max relative shadow-2xl my-auto will-change-transform transform-gpu pl-[10vw]"
        >
            
            {/* Film Base - Dark Acetate with Texture */}
            <div className="absolute inset-0 bg-[#181818]" />
            
            {/* Film Noise Texture - simplified */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ 
                mixBlendMode: 'overlay',
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
              }}
            />
            
            {/* Subtle Acetate Reflection Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40 pointer-events-none" />

            {/* Sprocket Holes Top */}
            <div 
                className="absolute top-2 left-0 right-0 h-10 z-10 opacity-90"
                style={{ backgroundImage: `url('${sprocketPattern}')`, backgroundRepeat: 'repeat-x' }}
            />
            
            {/* Sprocket Holes Bottom */}
            <div 
                className="absolute bottom-2 left-0 right-0 h-10 z-10 opacity-90"
                style={{ backgroundImage: `url('${sprocketPattern}')`, backgroundRepeat: 'repeat-x' }}
            />

            {/* Edge Markings */}
            <EdgeMarkings />

            {/* LIGHT LEAKS & BURNS */}
            <LightLeaks />

            {/* Content Container (Images) */}
            <div className="flex gap-16 md:gap-24 px-16 py-16 relative z-10 items-center">
                
                {/* Film Leader (Start) */}
                <div className="w-48 h-full flex flex-col justify-center opacity-60 ml-20">
                     <div className="w-full h-[2px] bg-white/20 mb-2" />
                     <span className="font-sans text-[9px] text-white/50 tracking-widest uppercase">Mulai</span>
                     <div className="w-full h-[2px] bg-white/20 mt-2" />
                </div>

                {images.map((src, index) => (
                    <GalleryImage key={index} src={src} alt={`Bingkai ${index}`} index={index} />
                ))}
            
                {/* End of Roll */}
                <div className="w-64 flex flex-col items-center justify-center ml-12 opacity-50 pr-20">
                     <span className="font-sans text-[40px] leading-none text-white/20 font-bold uppercase rotate-90 tracking-widest">Bersambung</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Gallery;