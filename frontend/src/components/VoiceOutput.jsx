import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoice } from '../hooks/useVoice';
import { translations } from '../utils/translations';

const VoiceOutput = ({ lang, data }) => {
  const { speak, stop, isSpeaking } = useVoice();
  const t = translations[lang];

  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
      return;
    }

    const crop = lang === 'en' ? data.cropName : data.cropNameKannada;
    const disease = lang === 'en' ? data.diseaseName : data.diseaseNameKannada;
    const description = lang === 'en' ? data.description : data.descriptionKannada;
    const medicine = lang === 'en' ? data.medicineAdvice : data.medicineAdviceKannada;

    const fullText = `${crop}. ${disease}. ${description}. ${t.medicine}: ${medicine}.`;
    speak(fullText, lang === 'en' ? 'en-IN' : 'kn-IN');
  };

  return (
    <div className="w-full space-y-4">
      <button
        onClick={handleSpeak}
        className={`relative overflow-hidden flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-500 w-full group
          ${isSpeaking 
            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
            : 'bg-white/[0.03] text-white hover:bg-white/[0.08] border border-white/10'}
        `}
      >
        {/* Progress Background */}
        <AnimatePresence>
          {isSpeaking && (
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 15, ease: "linear" }}
              className="absolute inset-0 bg-emerald-500/10 origin-left"
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex items-center gap-3">
          <span className="text-xl">
            {isSpeaking ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                ⏹️
              </motion.div>
            ) : '🔊'}
          </span>
          <span className="text-sm tracking-wide">
            {isSpeaking ? (lang === 'en' ? 'Stop Listening' : 'ನಿಲ್ಲಿಸಿ') : t.listenBtn}
          </span>
        </div>

        {/* Animated Particles for premium feel */}
        {isSpeaking && (
          <div className="absolute right-4 flex gap-1 items-end h-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 12, 6, 16, 4] }}
                transition={{ 
                  duration: 0.6, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                className="w-1 bg-emerald-400 rounded-full"
              />
            ))}
          </div>
        )}
      </button>

      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/60 animate-pulse">
              AI Synthetic Voice Active
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceOutput;
