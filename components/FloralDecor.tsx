import React from 'react';
import { motion } from 'framer-motion';

const FloralDecor: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
            {/* Top Left Corner Ornament */}
            <motion.div 
                className="absolute top-0 left-0 w-48 md:w-64 lg:w-80 opacity-20 filter invert"
                initial={{ opacity: 0, scale: 0.8, x: -50, rotate: -20 }}
                whileInView={{ opacity: 0.25, scale: 1, x: 0, rotate: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <img src="/flower.png" alt="Decoration" className="w-full h-auto" />
            </motion.div>

            {/* Bottom Right Corner Ornament */}
            <motion.div 
                className="absolute bottom-0 right-0 w-48 md:w-64 lg:w-80 opacity-20 filter invert rotate-180"
                initial={{ opacity: 0, scale: 0.8, x: 50, rotate: 200 }}
                whileInView={{ opacity: 0.25, scale: 1, x: 0, rotate: 180 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true }}
            >
                <img src="/flower.png" alt="Decoration" className="w-full h-auto" />
            </motion.div>

            {/* Subtle floating petals / small branches in other parts */}
             <motion.div 
                className="absolute top-1/2 right-[5%] w-32 md:w-48 lg:w-56 opacity-10 filter invert -translate-y-1/2 -rotate-90"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 0.15, y: 0 }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
                viewport={{ once: true }}
            >
                <img src="/flower.png" alt="Decoration" className="w-full h-auto" />
            </motion.div>
        </div>
    );
};

export default FloralDecor;
