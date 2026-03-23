import React from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Hero from './components/Hero';
import ArRum from './components/ArRum';
import CoupleProfile from './components/CoupleProfile';
import About from './components/About';
import Countdown from './components/Countdown';
import Events from './components/Events';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import SectionWrapper from './components/SectionWrapper';
import Particles from './components/Particles';
import OpeningGate from './components/OpeningGate';
import Toast from './components/Toast';
import { useState, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [notes, setNotes] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastConfig, setToastConfig] = useState<{ isVisible: boolean; message: string; type: 'success' | 'error' }>({
    isVisible: false,
    message: '',
    type: 'success'
  });

  const timeoutRef = useRef<any>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setToastConfig({ isVisible: true, message, type });
    
    timeoutRef.current = setTimeout(() => {
      setToastConfig(prev => ({ ...prev, isVisible: false }));
    }, 5000);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useSmoothScroll();

  // Fetch notes from the backend
  // Uses VITE_API_URL if set, otherwise relative path (works on Vercel)
  const API_URL = import.meta.env.VITE_API_URL || '';
  
  const fetchNotes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/notes`);
      if (!response.ok) return;
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      // API not available (e.g. static GitHub Pages without backend)
    }
  };

  useEffect(() => {
    fetchNotes();
    
    // Extract guest name from URL
    const params = new URLSearchParams(window.location.search);
    let name = params.get('to') || params.get('nama');
    
    if (!name) {
      // Support for ?Name without key
      const keys = Array.from(params.keys());
      if (keys.length > 0 && keys[0] !== "") {
        name = keys[0];
      }
    }

    if (name) {
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      setFormData(prev => ({ ...prev, name: formattedName }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', message: '' });
        fetchNotes();
        showToast('Terima kasih atas ucapan hangatnya!', 'success');
      } else {
        showToast('Maaf, terjadi kesalahan. Silakan coba lagi nanti.', 'error');
      }
    } catch (error) {
      console.error('Error submitting note:', error);
      showToast('Maaf, fitur ucapan belum tersedia saat ini.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpened) {
      // Small timeout to allow transition to finish
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpened]);

  return (
    <main className={`relative w-full min-h-screen ${!isOpened ? 'h-screen overflow-hidden' : ''}`}>
      {/* Cinematic Opening Gate */}
      <OpeningGate onOpenComplete={() => setIsOpened(true)} />

      {/* Noise Overlay for Vintage Texture */}
      <div className="film-grain"></div>

      {/* Subtle Moving Particles */}
      {isOpened && <Particles />}

      <div className={`${!isOpened ? 'opacity-0' : 'opacity-100'} transition-opacity duration-[1500ms] ease-out`}>
        <Hero />
        
        <ArRum />
        
        <CoupleProfile />

        <About />
        
        <Countdown />
        
        <Events />
        
        <Gallery />
        
        {/* Prayers / Wishes Section */}
        <SectionWrapper className="bg-fuji-ink py-24 text-center">
           <div className="container mx-auto px-6">
              <h2 className="font-serif text-4xl text-fuji-cream mb-6 italic">Titip Ucapan</h2>
              <p className="font-sans font-light text-fuji-cream/80 max-w-lg mx-auto mb-10 text-sm tracking-wide">
                Tinggalkan ucapan hangat Anda untuk kedua mempelai.
              </p>
              <form className="max-w-md mx-auto bg-fuji-charcoal p-8 shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-white/10 mb-20" onSubmit={handleSubmit}>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-fuji-ink/50 border border-white/10 rounded-sm p-4 font-sans font-light text-sm focus:outline-none focus:border-fuji-sage transition-colors mb-4 text-fuji-cream"
                    placeholder="Nama Anda"
                  />
                  <textarea 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-fuji-ink/50 border border-white/10 rounded-sm p-4 font-sans font-light text-sm focus:outline-none focus:border-fuji-sage transition-colors mb-6 text-fuji-cream resize-none"
                    rows={4}
                    placeholder="Pesan Anda..."
                  ></textarea>
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-fuji-sage text-white text-[10px] uppercase tracking-[0.2em] py-4 rounded-sm hover:bg-fuji-sageDark transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
                  </button>
              </form>

              {/* Display Notes / Wishes */}
              <div className="max-w-2xl mx-auto mt-20 text-left">
                  <h3 className="font-serif text-2xl text-fuji-cream mb-10 italic text-center">Ucapan dari Teman & Keluarga</h3>
                  <div className="grid gap-6">
                      {notes.map((note) => (
                          <div key={note.id} className="bg-fuji-charcoal/50 p-6 border-l-2 border-fuji-sage">
                              <p className="font-serif italic text-lg text-fuji-cream mb-2">"{note.message}"</p>
                              <div className="flex justify-between items-center opacity-60">
                                  <span className="font-sans text-[10px] uppercase tracking-widest text-fuji-sage font-bold">— {note.name}</span>
                                  <span className="font-sans text-[8px] uppercase tracking-widest">
                                      {new Date(note.created_at).toLocaleDateString()}
                                  </span>
                              </div>
                          </div>
                      ))}
                      {notes.length === 0 && (
                          <p className="text-center font-sans text-xs tracking-widest opacity-40 uppercase">Belum ada ucapan. Jadilah yang pertama!</p>
                      )}
                  </div>
              </div>
           </div>
        </SectionWrapper>

        <RSVP />

        <footer className="bg-fuji-ink text-fuji-cream py-16 text-center border-t border-white/5">
           <p className="font-serif italic text-2xl mb-4">Hesti & Ulul</p>
           <p className="font-sans text-[10px] uppercase tracking-widest opacity-70">&copy; 2026. Terinspirasi oleh Modern Analog.</p>
        </footer>

        {/* Custom Toast Notification */}
        <Toast 
          isVisible={toastConfig.isVisible} 
          message={toastConfig.message} 
          type={toastConfig.type} 
          onClose={() => setToastConfig(prev => ({ ...prev, isVisible: false }))} 
        />
      </div>
    </main>
  );
}

export default App;