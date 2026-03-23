import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ isVisible, message, type, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          className="fixed left-4 right-4 bottom-8 md:left-1/2 md:right-auto md:bottom-12 md:-translate-x-1/2 z-[999] md:w-full md:max-w-md"
        >
          <div className="relative overflow-hidden bg-fuji-charcoal/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 md:p-5 flex items-center gap-4">
            {/* Fuji-style Accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${type === 'success' ? 'bg-fuji-sage' : 'bg-red-400'}`} />
            
            <div className="flex-shrink-0">
              {type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-fuji-sage" strokeWidth={2.5} />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400" strokeWidth={2.5} />
              )}
            </div>
            
            <div className="flex-grow">
              <p className="font-sans text-fuji-cream text-xs md:text-sm tracking-widest font-medium uppercase leading-relaxed">
                {message}
              </p>
            </div>

            <button 
              onClick={onClose}
              className="flex-shrink-0 text-fuji-cream/40 hover:text-fuji-cream transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* Animated Progress Bar */}
            <motion.div 
               initial={{ scaleX: 1 }}
               animate={{ scaleX: 0 }}
               transition={{ duration: 5, ease: "linear" }}
               style={{ originX: 0 }}
               className={`absolute bottom-0 left-0 right-0 h-[1px] ${type === 'success' ? 'bg-fuji-sage/50' : 'bg-red-400/50'}`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
