import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SectionWrapper from './SectionWrapper';

const images = [
  "/1.jpeg",
  "/2.jpeg",
  "/3.jpeg",
  "/4.jpeg",
  "/6.jpeg"
];

// Refined Sprocket Hole Pattern (Rounded Rects for 35mm look)
// Using color #F9F9F7 to match the page background, creating the illusion of holes
const sprocketPattern = "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='shadow'%3E%3CfeDropShadow dx='0' dy='1' stdDeviation='1' flood-opacity='0.3'/%3E%3C/filter%3E%3C/defs%3E%3Crect x='10' y='8' width='20' height='24' rx='4' fill='%23FFF9F2'/%3E%3C/svg%3E";

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

      // Create the animation
      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.5, 
          end: () => `+=${track.scrollWidth - window.innerWidth + 500}`, 
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-fuji-ink py-20 overflow-hidden h-screen flex items-center relative perspective-1000">
        
        {/* SVG Filters for Film Effects */}
        <svg className="absolute w-0 h-0 pointer-events-none">
          <defs>
            <filter id="rough-edge">
               <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" result="noise" />
               <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

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
            <div className="absolute inset-0 bg-[#181818]"></div>
            
            {/* Film Noise Texture */}
            <div className="absolute inset-0 bg-subtle-grain opacity-20 pointer-events-none mix-blend-overlay"></div>
            
            {/* Subtle Acetate Reflection Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40 pointer-events-none"></div>

            {/* Sprocket Holes Top */}
            <div 
                className="absolute top-2 left-0 right-0 h-10 z-10 opacity-90"
                style={{ backgroundImage: `url('${sprocketPattern}')`, backgroundRepeat: 'repeat-x' }}
            ></div>
            
            {/* Sprocket Holes Bottom */}
            <div 
                className="absolute bottom-2 left-0 right-0 h-10 z-10 opacity-90"
                style={{ backgroundImage: `url('${sprocketPattern}')`, backgroundRepeat: 'repeat-x' }}
            ></div>

            {/* Edge Markings (Safety Film / Kodak / Fuji) */}
            <div className="absolute top-5 left-0 w-full flex justify-between pointer-events-none z-20 overflow-hidden">
                <div className="flex gap-[600px] whitespace-nowrap pl-[5vw]">
                    {Array.from({length: 15}).map((_, i) => (
                        <div key={i} className="flex gap-4 items-center opacity-40">
                            <span className="font-sans text-[8px] font-bold text-[#cfd9ce] tracking-widest">FUJIFILM</span>
                            <span className="font-sans text-[8px] font-bold text-[#cfd9ce] tracking-widest">PRO 400H</span>
                            <span className="font-sans text-[8px] font-bold text-[#cfd9ce] tracking-widest">➜</span>
                            <span className="font-sans text-[8px] font-bold text-[#cfd9ce] tracking-widest ml-12">200</span>
                        </div>
                    ))}
                </div>
            </div>

             <div className="absolute bottom-5 left-0 w-full flex justify-between pointer-events-none z-20 overflow-hidden">
                <div className="flex gap-[600px] whitespace-nowrap pl-[20vw]">
                    {Array.from({length: 15}).map((_, i) => (
                         <div key={i} className="flex gap-8 items-center">
                            <span className="font-sans text-[7px] text-[#cfd9ce] opacity-30 tracking-[0.2em]">SAFETY FILM</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* LIGHT LEAKS & BURNS */}
            <div className="absolute inset-0 pointer-events-none z-30 mix-blend-screen overflow-hidden">
                 {/* Start of Roll Orange Burn */}
                 <div className="absolute -left-20 top-0 bottom-0 w-[40vw] bg-gradient-to-r from-orange-600/60 via-red-500/30 to-transparent blur-3xl"></div>
                 
                 {/* Occasional Light Streaks */}
                 <div className="absolute left-[35%] top-[-20%] bottom-[-20%] w-32 bg-gradient-to-r from-blue-200/10 to-transparent skew-x-12 blur-2xl"></div>
                 <div className="absolute left-[75%] top-[-10%] bottom-[-10%] w-64 bg-gradient-to-l from-orange-200/10 to-transparent -skew-x-12 blur-3xl"></div>
                 
                 {/* End of roll burn */}
                 <div className="absolute right-0 top-0 bottom-0 w-[30vw] bg-gradient-to-l from-white/20 via-orange-100/10 to-transparent blur-3xl"></div>
            </div>


            {/* Content Container (Images) */}
            <div className="flex gap-16 md:gap-24 px-16 py-16 relative z-10 items-center">
                
                {/* Film Leader (Start) */}
                <div className="w-48 h-full flex flex-col justify-center opacity-60 ml-20">
                     <div className="w-full h-[2px] bg-white/20 mb-2"></div>
                     <span className="font-sans text-[9px] text-white/50 tracking-widest uppercase">Mulai</span>
                     <div className="w-full h-[2px] bg-white/20 mt-2"></div>
                </div>

                {images.map((src, index) => (
                    <div key={index} className="relative group flex flex-col items-center">
                         {/* Photo Frame (Negative Style) */}
                         <div className="relative p-1 bg-black shadow-lg">
                             <div className="relative w-[300px] md:w-[380px] aspect-[2/3] overflow-hidden bg-[#0a0a0a]">
                                
                                {/* Image with Pro 400H Filter Simulation 
                                    - Slightly brighter (overexposed look)
                                    - Lower contrast for creamy roll-off
                                    - Desaturated with slight cool sepia
                                */}
                                <img 
                                    src={src} 
                                    alt={`Bingkai ${index}`} 
                                    className="w-full h-full object-cover opacity-95"
                                    style={{
                                        filter: 'brightness(1.1) contrast(0.9) saturate(0.8) sepia(0.05)'
                                    }}
                                />

                                {/* 1. Highlight Bloom: Radial gradient for soft center glow */}
                                <div 
                                    className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30"
                                    style={{
                                        background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.2) 0%, transparent 60%)'
                                    }}
                                ></div>

                                {/* 2. Vignette: Smooth falloff to dark blue-grey corners */}
                                <div 
                                    className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-70"
                                    style={{
                                        background: 'radial-gradient(circle at 50% 50%, transparent 45%, rgba(10,15,20,0.8) 100%)'
                                    }}
                                ></div>

                                {/* 3. Color Grading: Cyan/Green tint for shadows (Pro 400H signature) */}
                                <div className="absolute inset-0 bg-[#003344] opacity-20 mix-blend-lighten pointer-events-none"></div>

                                {/* 4. Warmth in highlights (Subtle cream overlay) */}
                                <div className="absolute inset-0 bg-[#FFF9F2] opacity-10 mix-blend-soft-light pointer-events-none"></div>

                                {/* 5. Film Grain Texture */}
                                <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay bg-subtle-grain"></div>

                                {/* 6. Dust and Scratches (Subtle) */}
                                <div className="absolute top-[10%] left-[20%] w-[1px] h-4 bg-white/20 rotate-12 pointer-events-none"></div>
                                <div className="absolute bottom-[30%] right-[10%] w-[1px] h-8 bg-white/10 -rotate-6 pointer-events-none"></div>
                                
                                {/* 7. Irregular Film Edge Overlay (The "Sloppy Border" Effect) */}
                                <div className={`absolute inset-0 pointer-events-none z-40 ${index % 2 === 0 ? '' : 'scale-x-[-1]'}`}>
                                    <svg width="100%" height="100%" preserveAspectRatio="none">
                                        <rect 
                                            x="0" y="0" 
                                            width="100%" height="100%" 
                                            fill="none" 
                                            stroke="black" // Encroaches from the edge
                                            strokeWidth="12" 
                                            filter="url(#rough-edge)" 
                                            opacity="0.9"
                                        />
                                    </svg>
                                </div>

                             </div>
                         </div>
                         
                         {/* Frame Number Details */}
                         <div className="absolute -bottom-12 left-0 right-0 flex justify-between px-4">
                             <span className="font-sans text-[12px] font-bold text-[#e8c65c] tracking-tighter opacity-80">{12 + index}</span>
                             <span className="font-sans text-[12px] font-bold text-[#e8c65c] tracking-tighter opacity-80">{12 + index}A</span>
                         </div>
                    </div>
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