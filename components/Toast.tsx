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
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md"
        >
          <div className="relative overflow-hidden bg-fuji-charcoal/90 backdrop-blur-md border border-white/10 shadow-2xl p-4 flex items-center gap-4">
            {/* Fuji-style Accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${type === 'success' ? 'bg-fuji-sage' : 'bg-red-400'}`} />
            
            <div className="flex-shrink-0">
              {type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-fuji-sage" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400" />
              )}
            </div>
            
            <div className="flex-grow">
              <p className="font-sans text-fuji-cream text-xs tracking-wider font-light uppercase">
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
