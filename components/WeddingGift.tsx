import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { Copy, Check } from 'lucide-react';

const WeddingGift = () => {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const handleCopy = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bank);
    setTimeout(() => {
      setCopiedBank(null);
    }, 2000);
  };

  const banks = [
    {
      id: 'bca',
      name: 'BCA',
      accountNumber: '3372145134',
      accountName: 'Ulul Azmi Alqudus',
    },
    {
      id: 'seabank',
      name: 'Seabank',
      accountNumber: '901743616943',
      accountName: 'Hesti Rahayu Oktaviani',
    }
  ];

  return (
    <SectionWrapper id="gift" className="bg-fuji-cream py-24 text-center">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl text-fuji-charcoal mb-6 italic">Wedding Gift</h2>
        <p className="font-sans font-light text-fuji-charcoal/80 max-w-lg mx-auto mb-12 text-sm tracking-wide">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
          Dan jika memberi adalah ungkapan tanda kasihmu untuk kami, kami sangat berterimakasih.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {banks.map((bank) => (
            <div key={bank.id} className="bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-fuji-sage/20 relative flex flex-col items-center">
              <h3 className="font-serif italic text-2xl text-fuji-charcoal mb-4">{bank.name}</h3>
              <p className="font-sans text-lg tracking-wider text-fuji-sage font-medium mb-2">{bank.accountNumber}</p>
              <p className="font-sans text-xs uppercase tracking-widest text-fuji-charcoal/60 mb-6">a.n {bank.accountName}</p>
              
              <button 
                onClick={() => handleCopy(bank.accountNumber, bank.id)}
                className="flex items-center gap-2 border border-fuji-sage text-fuji-sage hover:bg-fuji-sage hover:text-white transition-colors duration-300 py-2 px-6 rounded-sm text-[10px] uppercase tracking-[0.2em]"
              >
                {copiedBank === bank.id ? (
                   <>
                     <Check size={14} />
                     Disalin
                   </>
                ) : (
                   <>
                     <Copy size={14} />
                     Salin Rekening
                   </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default WeddingGift;
