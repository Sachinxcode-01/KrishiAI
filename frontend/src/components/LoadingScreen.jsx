import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../utils/translations';

const LoadingScreen = ({ lang, step }) => {
  const t = translations[lang];
  const steps = [t.scanning, t.detecting, t.preparing];

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
      <div className="relative w-32 h-32 mb-8">
        <motion.div
          className="absolute inset-0 border-4 border-primary/20 rounded-full"
        />
        <motion.div
          className="absolute inset-0 border-4 border-t-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          {step === 0 ? '📡' : step === 1 ? '🔬' : '🧪'}
        </div>
      </div>

      <motion.h2
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-primary mb-2"
      >
        {steps[step]}
      </motion.h2>
      
      <p className="text-text/60 text-sm max-w-[200px]">
        {lang === 'en' ? 'Our AI is processing your request...' : 'ನಮ್ಮ AI ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತಿದೆ...'}
      </p>

      <div className="mt-8 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${i === step ? 'bg-primary w-6' : 'bg-white/10'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
