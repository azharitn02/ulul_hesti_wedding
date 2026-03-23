import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { CountdownTime } from '../types';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-04-19T08:00:00+07:00");

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center mx-6 md:mx-12">
      <div className="relative mb-2">
        <span className="font-serif text-5xl md:text-7xl text-fuji-cream font-light tracking-tighter">
            {value < 10 ? `0${value}` : value}
        </span>
      </div>
      <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-fuji-mist border-t border-white/10 pt-2 w-full text-center">
        {label}
      </span>
    </div>
  );

  return (
    <SectionWrapper className="bg-fuji-charcoal py-24 border-y border-white/5">
       <div className="container mx-auto px-4 relative z-10 text-center text-fuji-cream">
         <h2 className="font-serif text-4xl text-fuji-sage mb-16 italic font-light">Menuju Hari Bahagia</h2>
         
         <div className="flex flex-wrap justify-center items-center">
            <TimeUnit value={timeLeft.days} label="Hari" />
            <div className="h-12 w-[1px] bg-fuji-border hidden md:block"></div>
            <TimeUnit value={timeLeft.hours} label="Jam" />
            <div className="h-12 w-[1px] bg-white/10 hidden md:block"></div>
            <TimeUnit value={timeLeft.minutes} label="Menit" />
            <div className="h-12 w-[1px] bg-white/10 hidden md:block"></div>
            <TimeUnit value={timeLeft.seconds} label="Detik" />
         </div>
       </div>
    </SectionWrapper>
  );
};

export default Countdown;