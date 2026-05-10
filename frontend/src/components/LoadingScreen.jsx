import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldAlert, FileSearch, Sparkles, Leaf } from 'lucide-react';

const LoadingScreen = ({ lang, step }) => {
  const steps = [
    { en: 'Scanning Specimen', kn: 'ಚಿತ್ರ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ', icon: Search },
    { en: 'Analyzing Pathogens', kn: 'ರೋಗದ ಲಕ್ಷಣ ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ', icon: ShieldAlert },
    { en: 'Compiling Protocol', kn: 'ಪರಿಹಾರ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ', icon: FileSearch }
  ];

  const currentStep = steps[step] || steps[0];

  return (
    <div className="fixed inset-0 z-[1000] bg-[var(--background)] flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="grain-overlay" />
      <div className="premium-grid opacity-20" />
      <div className="mesh-glow opacity-30" />
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Core Animation */}
        <div className="relative size-40 mb-16 flex items-center justify-center">
          <motion.div 
            className="absolute inset-0 border border-[var(--primary)]/20 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute inset-4 border border-[var(--primary)]/40 rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative size-20 bg-[var(--primary)]/10 rounded-3xl backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_0_40px_var(--primary-glow)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ scale: 0, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ type: 'spring', damping: 12 }}
              >
                <currentStep.icon className="size-10 text-[var(--primary)]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Textual Feedback */}
        <div className="text-center mb-12">
          <motion.div 
            key={`title-${step}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <span className="font-display font-black text-3xl text-white uppercase tracking-tighter">
              {currentStep.en}
            </span>
            <span className="font-kannada font-bold text-[var(--primary)] text-lg">
              {currentStep.kn}
            </span>
          </motion.div>
        </div>

        {/* Progress System */}
        <div className="w-full space-y-6">
          <div className="loader-bar w-full h-[2px] rounded-full">
            <motion.div 
              className="loader-progress h-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(step + 1) * 33.33}%` }}
              transition={{ duration: 0.8, ease: "circOut" }}
            />
          </div>
          
          <div className="flex justify-between items-center px-2">
            <span className="font-mono text-[0.6rem] font-bold text-[var(--muted)] uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="size-3 text-[var(--primary)]" />
              Neural Link Active
            </span>
            <span className="font-mono text-[0.6rem] font-bold text-[var(--primary)]">
              {(step + 1) * 33}%
            </span>
          </div>
        </div>
      </div>

      {/* Decorative logo */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 flex items-center gap-3">
        <div className="size-5 rounded-md overflow-hidden">
          <img src="/krishiAI.png" alt="Krishi AI Logo" className="w-full h-full object-contain" />
        </div>
        <span className="font-display font-bold text-[0.6rem] uppercase tracking-[0.4em] text-white">Krishi AI Core</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
