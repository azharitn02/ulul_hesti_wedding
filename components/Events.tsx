import React from 'react';
import SectionWrapper from './SectionWrapper';
import { MapPin, HeartHandshake } from 'lucide-react';

const Events: React.FC = () => {
  return (
    <SectionWrapper id="events" className="bg-fuji-ink text-fuji-cream">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20">
            <h2 className="font-serif text-5xl md:text-6xl text-fuji-cream">Rangkaian Acara</h2>
            <p className="font-sans text-xs tracking-[0.2em] text-fuji-mist mt-4 uppercase font-medium">Minggu, 19 April 2026</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
            
            {/* Ceremony */}
            <div className="bg-fuji-charcoal p-10 md:p-12 shadow-2xl border border-white/5 hover:border-white/20 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-fuji-sage/50 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                
                <div className="flex flex-col items-center text-center">
                    <div className="mb-6 opacity-60">
                        <HeartHandshake className="w-6 h-6 text-fuji-cream" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-3xl text-fuji-cream mb-1">Akad Nikah</h3>
                    <p className="font-sans text-xs tracking-widest text-fuji-sage mb-6 uppercase font-bold">09.00 WIB</p>
                    <p className="font-sans font-light text-fuji-cream/70 mb-8 leading-relaxed">
                        Gedung Wisma Guna Baleendah<br/>
                        Jl. Adipati agung No.38<br/>
                        Kec. Baleendah, Kabupaten Bandung, Jawa Barat 40375
                    </p>
                    <a href="https://maps.app.goo.gl/oMvYqhr8xHsMdLN57">
                        Lihat Lokasi
                    </a>
                </div>
            </div>

            {/* Reception */}
            <div className="bg-fuji-charcoal p-10 md:p-12 shadow-2xl border border-white/5 hover:border-white/20 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-fuji-dustyPink transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>

                <div className="flex flex-col items-center text-center">
                    <div className="mb-6 opacity-60">
                        <MapPin className="w-6 h-6 text-fuji-cream" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-3xl text-fuji-cream mb-1">Resepsi</h3>
                    <p className="font-sans text-xs tracking-widest text-fuji-sage mb-6 uppercase font-bold">11.00 WIB - Selesai</p>
                    <p className="font-sans font-light text-fuji-cream/70 mb-8 leading-relaxed">
                        Gedung Wisma Guna Baleendah<br/>
                        Jl. Adipati agung No.38<br/>
                        Kec. Baleendah, Kabupaten Bandung, Jawa Barat 40375
                    </p>
                    <a href="https://maps.app.goo.gl/oMvYqhr8xHsMdLN57">
                        Lihat Lokasi
                    </a>
                </div>
            </div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default Events;