import React from 'react';
import SectionWrapper from './SectionWrapper';
import FloralDecor from './FloralDecor';

const ArRum: React.FC = () => {
  return (
    <SectionWrapper className="bg-fuji-ink py-10 md:py-16 overflow-hidden bg-subtle-grain text-fuji-cream relative">
      <FloralDecor />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative element: small icon or line */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-[1px] bg-fuji-sage dark:bg-fuji-sage/50 opacity-40"></div>
          </div>

          {/* Arabic Text */}
          <p dir="rtl" className="font-arabic text-2xl md:text-3xl lg:text-4xl text-fuji-cream leading-relaxed mb-10 tracking-wide opacity-90">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
          </p>

          <div className="space-y-4">
            <p className="font-serif italic text-lg md:text-xl text-fuji-mist max-w-2xl mx-auto leading-relaxed">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
            </p>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-fuji-sageDark font-semibold">
              QS. Ar-Rum: 21
            </p>
          </div>

          {/* Decorative element: small icon or line */}
          <div className="flex justify-center mt-12">
            <div className="w-24 h-[1px] bg-fuji-border opacity-60"></div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ArRum;
