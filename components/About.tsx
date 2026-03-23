import React from 'react';
import SectionWrapper from './SectionWrapper';
import { Music, Car, IceCream } from 'lucide-react';
import FloralDecor from './FloralDecor';

const About: React.FC = () => {
  return (
    <SectionWrapper id="about" className="bg-fuji-ink text-fuji-cream relative overflow-hidden">
      <FloralDecor />
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          
          {/* Couple Image - Clean Frame */}
          <div className="w-full md:w-1/2 flex justify-center">
             <div className="relative">
                <div className="absolute inset-0 bg-fuji-sage/20 transform translate-x-4 translate-y-4"></div>
                <div className="relative bg-fuji-charcoal p-2 shadow-xl border border-white/5">
                    <img 
                        src="/3.jpeg" 
                        alt="Mempelai" 
                        className="w-full h-[400px] md:h-[550px] object-cover analog-photo"
                    />
                </div>
             </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="font-serif text-5xl md:text-6xl text-fuji-cream mb-8 leading-tight">
              Kisah <span className="italic text-fuji-sageDark">Cinta</span> Kami
            </h2>
            <p className="font-sans font-light text-fuji-cream/90 leading-relaxed mb-6">
              Kisah kami bermula dari sebuah pertemuan sederhana yang penuh makna. Langkah demi langkah kami lalui bersama, membangun rasa dan harapan yang kini bermuara pada janji suci.
            </p>
            <p className="font-sans font-light text-fuji-cream/90 leading-relaxed mb-10">
              Kami mengundang Anda untuk turut merayakan perjalanan cinta kami yang kini memasuki babak baru yang penuh kebahagiaan.
            </p>
            
            <div className="flex justify-center md:justify-start gap-8 border-t border-white/10 pt-8">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-fuji-cream/60">
                        <IceCream size={16} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-fuji-mist font-medium">Kenangan</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full border border-fuji-charcoal/20 flex items-center justify-center text-fuji-charcoal/60">
                        <Music size={16} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-fuji-charcoal/80 font-medium">Musik</span>
                </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full border border-fuji-charcoal/20 flex items-center justify-center text-fuji-charcoal/60">
                        <Car size={16} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-fuji-charcoal/80 font-medium">Perjalanan</span>
                </div>
            </div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;