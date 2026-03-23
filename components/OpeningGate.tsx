import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface OpeningGateProps {
    onOpenComplete: () => void;
}

const OpeningGate: React.FC<OpeningGateProps> = ({ onOpenComplete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [guestName, setGuestName] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        // Try to get specific "to" param, otherwise take the first key in the URL
        let name = params.get('to') || params.get('nama');
        
        if (!name) {
            // Support for ?Name without key
            const keys = Array.from(params.keys());
            if (keys.length > 0 && keys[0] !== "") {
                name = keys[0];
            }
        }

        if (name) {
            // Capitalize first letter
            setGuestName(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
        }
    }, []);

    const handleOpen = () => {
        setIsOpen(true);
        // Delay callback until animation is nearing completion
        setTimeout(onOpenComplete, 800);
    };

    return (
        <AnimatePresence>
            {!isOpen && (
                <motion.div 
                    initial={{ y: 0 }}
                    exit={{ y: '-100%', transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] } }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-fuji-ink overflow-hidden"
                >
                    {/* Noise texture overlay */}
                    <div className="absolute inset-0 film-grain opacity-20 pointer-events-none"></div>

                    <div className="relative z-10 text-center px-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="mb-12"
                        >
                            {guestName && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mb-8"
                                >
                                    <span className="font-serif italic text-2xl text-fuji-sage block mb-1">Kepada Yth.</span>
                                    <h2 className="font-serif text-4xl md:text-5xl text-fuji-cream tracking-tight">{guestName}</h2>
                                    <div className="w-12 h-[1px] bg-white/10 mx-auto mt-6"></div>
                                </motion.div>
                            )}
                            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-fuji-mist block mb-6">Kami mengundang Anda ke acara pernikahan</span>
                            <div className="flex flex-col gap-2">
                                <h1 className="font-serif text-5xl md:text-7xl text-fuji-cream italic font-light tracking-tight">Hesti</h1>
                                <span className="font-serif italic text-3xl text-fuji-mist opacity-50">&</span>
                                <h1 className="font-serif text-5xl md:text-7xl text-fuji-cream italic font-light tracking-tight">Ulul</h1>
                            </div>
                        </motion.div>

                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleOpen}
                            className="group relative inline-flex items-center gap-4 bg-transparent border border-white/20 px-10 py-5 rounded-full overflow-hidden transition-all duration-500 hover:border-fuji-sage"
                        >
                            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            <Heart className="w-4 h-4 text-fuji-sageDark group-hover:scale-125 transition-transform duration-500" />
                            <span className="relative font-sans text-[11px] uppercase tracking-[0.3em] text-fuji-cream">Buka Undangan</span>
                        </motion.button>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ duration: 1, delay: 1.2 }}
                            className="mt-12 font-sans text-[9px] uppercase tracking-widest text-fuji-mist"
                        >
                            Bandung • 19 April • 2026
                        </motion.p>
                    </div>

                    {/* Subtle decorative ornaments */}
                    <div className="absolute top-10 left-10 opacity-10 filter invert grayscale scale-50">
                        <img src="/flower.png" alt="" className="w-64" />
                    </div>
                    <div className="absolute bottom-10 right-10 opacity-10 filter invert grayscale scale-50 rotate-180">
                         <img src="/flower.png" alt="" className="w-64" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OpeningGate;

