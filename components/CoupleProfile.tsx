import React from 'react';
import SectionWrapper from './SectionWrapper';
import FloralDecor from './FloralDecor';

const CoupleProfile: React.FC = () => {
  return (
    <SectionWrapper id="couple" className="bg-fuji-ink py-24 relative overflow-hidden text-fuji-cream">
        <FloralDecor />
        {/* Subtle decorative background text or lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none flex items-center justify-center">
            <span className="font-serif text-[20vw] italic whitespace-nowrap">Pernikahan</span>
        </div>

        <div className="container mx-auto px-6 relative z-20">
            <div className="text-center mb-16 md:mb-24">
                 <span className="font-sans tracking-[0.4em] text-fuji-sageDark uppercase text-[10px] block mb-4 font-bold">Anda dengan hormat diundang ke acara</span>
                 <h2 className="font-serif text-5xl md:text-7xl text-fuji-cream italic font-light">Pernikahan Kami</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center max-w-6xl mx-auto">
                {/* Groom Section */}
                <div className="flex flex-col items-center group">
                    <div className="relative mb-10 group">
                        {/* Analog Film Frame Aesthetic */}
                        <div className="relative p-4 md:p-6 bg-fuji-charcoal shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-1000 group-hover:shadow-[0_45px_80px_-20px_rgba(0,0,0,0.7)] group-hover:-translate-y-2 border border-white/5">
                            <div className="aspect-[3/4] w-64 md:w-80 overflow-hidden bg-fuji-mist/20">
                                <img 
                                    src="./8.jpeg" 
                                    alt="Ulul Azmi Alqudus, S.Sos - Mempelai Pria" 
                                    className="w-full h-full object-cover analog-photo hover:scale-105 transition-transform duration-[2000ms] ease-out" 
                                />
                            </div>
                            
                            {/* Film Footer details */}
                            <div className="mt-4 flex justify-between items-end border-t border-white/10 pt-3 text-white/40">
                                <div className="flex flex-col">
                                    <span className="font-sans text-[8px] tracking-[0.2em] uppercase">Fujifilm Pro 400H</span>
                                    <span className="font-sans text-[8px] tracking-[0.2em] uppercase">Roll #02 / Frame 08</span>
                                </div>
                                <span className="font-serif italic text-lg opacity-80">Mempelai Pria</span>
                            </div>
                        </div>
                        {/* Shadow Decor */}
                        <div className="absolute -bottom-4 -right-4 w-full h-full bg-fuji-sage/5 -z-10 rounded-sm"></div>
                    </div>

                    <div className="text-center space-y-4">
                        <div>
                            <h3 className="font-serif text-3xl md:text-4xl text-fuji-cream">Ulul Azmi Alqudus, S.Sos</h3>
                            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-fuji-sageDark font-bold">Mempelai Pria</p>
                        </div>
                        <div className="space-y-1 text-fuji-mist">
                            <p className="font-sans text-[10px] uppercase tracking-widest italic">Putra dari</p>
                            <p className="font-serif text-lg leading-snug">Bapak Alm. Aceng Kadarusman, M.Pd</p>
                            <p className="font-serif text-lg leading-snug">Ibu Neni Maryani, S.si</p>
                        </div>
                    </div>
                </div>

                {/* Bride Section */}
                <div className="flex flex-col items-center group">
                    <div className="relative mb-10 group">
                        {/* Analog Film Frame Aesthetic */}
                        <div className="relative p-4 md:p-6 bg-fuji-charcoal shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-1000 group-hover:shadow-[0_45px_80px_-20px_rgba(0,0,0,0.7)] group-hover:-translate-y-2 border border-white/5">
                            <div className="aspect-[3/4] w-64 md:w-80 overflow-hidden bg-fuji-mist/20">
                                <img 
                                    src="./7.jpeg" 
                                    alt="Hesti Rahayu Oktaviani - Mempelai Wanita" 
                                    className="w-full h-full object-cover analog-photo hover:scale-105 transition-transform duration-[2000ms] ease-out" 
                                />
                            </div>
                            
                            {/* Film Footer details */}
                            <div className="mt-4 flex justify-between items-end border-t border-white/10 pt-3 text-white/40">
                                <div className="flex flex-col">
                                    <span className="font-sans text-[8px] tracking-[0.2em] uppercase">Fujifilm Pro 400H</span>
                                    <span className="font-sans text-[8px] tracking-[0.2em] uppercase">Roll #02 / Frame 07</span>
                                </div>
                                <span className="font-serif italic text-lg opacity-80">Mempelai Wanita</span>
                            </div>
                        </div>
                        {/* Shadow Decor */}
                        <div className="absolute -bottom-4 -right-4 w-full h-full bg-fuji-sage/5 -z-10 rounded-sm"></div>
                    </div>

                    <div className="text-center space-y-4">
                        <div>
                            <h3 className="font-serif text-3xl md:text-4xl text-fuji-cream">Hesti Rahayu Oktaviani</h3>
                            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-fuji-sageDark font-bold">Mempelai Wanita</p>
                        </div>
                        <div className="space-y-1 text-fuji-mist">
                            <p className="font-sans text-[10px] uppercase tracking-widest italic">Putri dari</p>
                            <p className="font-serif text-lg leading-snug">Bapak Alm. Dede Wahyu</p>
                            <p className="font-serif text-lg leading-snug">Ibu Nurlela</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-24">
                <div className="inline-block p-4 border-l border-r border-white/10 px-12">
                     <p className="font-serif italic text-2xl text-fuji-mist">est. 2026</p>
                </div>
            </div>
        </div>
    </SectionWrapper>
  );
};

export default CoupleProfile;