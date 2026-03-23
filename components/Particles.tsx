import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Particles: React.FC = () => {
    // Generate static particle data for performance
    const particles = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 20 + 20,
            delay: Math.random() * 10,
            opacity: Math.random() * 0.9,
            color: i % 3 === 0 ? '#ff8888ff' : (i % 3 === 1 ? '#EBC9B5' : '#D1CDCA'), // Sage, Peach, Mist
            shape: i % 2 === 0 ? 'circle' : 'square'
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute"
                    initial={{ 
                        x: `${p.x}vw`, 
                        y: '-10vh', 
                        opacity: 0,
                        rotate: 0 
                    }}
                    animate={{
                        y: '110vh',
                        x: [`${p.x}vw`, `${p.x + (Math.random() * 10 - 5)}vw`, `${p.x}vw`],
                        opacity: [0, p.opacity, p.opacity, 0],
                        rotate: 360
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                    style={{
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        borderRadius: p.shape === 'circle' ? '50%' : '1px',
                        filter: 'blur(1px)' // Analog softness
                    }}
                />
            ))}
        </div>
    );
};

export default Particles;
