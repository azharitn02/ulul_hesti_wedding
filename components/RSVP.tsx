import React from 'react';
import SectionWrapper from './SectionWrapper';
import { MessageCircle } from 'lucide-react';

const RSVP: React.FC = () => {
  return (
    <>
        <SectionWrapper id="location" className="bg-fuji-ink pb-32 border-t border-white/5">
            <div className="container mx-auto px-6 text-center">
                 <h2 className="font-serif text-5xl text-fuji-cream mb-16">Lokasi</h2>
                 <div className="w-full max-w-4xl mx-auto bg-fuji-charcoal p-2 shadow-2xl border border-white/10">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1980.0226234440865!2d107.62177273875223!3d-7.003954936053739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9823e178261%3A0x48784b9db493220e!2sJl.%20Adipati%20Agung%20No.38%2C%20Baleendah%2C%20Kec.%20Baleendah%2C%20Kabupaten%20Bandung%2C%20Jawa%20Barat%2040375%2C%20Indonesia!5e0!3m2!1sen!2sus!4v1774247372190!5m2!1sen!2sus" 
                        width="100%" 
                        height="450" 
                        style={{border:0}} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale invert opacity-60 hover:opacity-100 transition-all duration-500"
                    ></iframe>
                 </div>
            </div>
        </SectionWrapper>

        {/* Sticky CTA */}
        {/* <div className="fixed bottom-8 right-8 z-50">
            <a 
                href="https://wa.me/6281322411197" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-center gap-3 bg-fuji-charcoal text-white px-6 py-4 rounded-full shadow-lg hover:bg-fuji-charcoal/90 transition-all duration-300 hover:scale-105"
            >
                <span className="font-sans text-xs uppercase tracking-widest">RSVP</span>
                <MessageCircle className="w-4 h-4" />
            </a>
        </div> */}
    </>
  );
};

export default RSVP;