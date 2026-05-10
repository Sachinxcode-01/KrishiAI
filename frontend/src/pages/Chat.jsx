import React from 'react';
import { motion } from 'framer-motion';
import ChatBot from '../components/ChatBot';
import { translations } from '../utils/translations';
import { useDiagnosis } from '../context/DiagnosisContext';

const Chat = ({ lang }) => {
  const t = translations[lang];
  const { latestDiagnosis } = useDiagnosis();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 px-4 pb-32 max-w-4xl mx-auto relative"
    >
      {/* Absolute Perfection: Tactical Overlays */}
      <div className="fixed inset-0 pixel-grid opacity-[0.03] pointer-events-none" />
      <div className="fixed inset-0 scanner-overlay opacity-[0.05] pointer-events-none" />
      
      {/* Decorative Corners */}
      <div className="absolute top-20 left-4 size-12 border-t border-l border-white/10 pointer-events-none" />
      <div className="absolute top-20 right-4 size-12 border-t border-r border-white/10 pointer-events-none" />
      <div className="absolute bottom-4 left-4 size-12 border-b border-l border-white/10 pointer-events-none" />
      <div className="absolute bottom-4 right-4 size-12 border-b border-r border-white/10 pointer-events-none" />

      <div className="mb-12 px-2 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter italic">
              {lang === 'en' ? 'Krishi ' : 'ಕೃಷಿ '}<span className="text-[var(--primary)] text-stroke">{lang === 'en' ? 'Assistant' : 'ಸಹಾಯಕ'}</span>
            </h2>
            <p className="text-[var(--muted)] text-sm font-bold uppercase tracking-[0.2em]">
              {lang === 'en' 
                ? 'Professional_Agricultural_Intelligence_v5.0' 
                : 'ಸುಧಾರಿತ_ಕೃಷಿ_ತಂತ್ರಜ್ಞಾನ_ಸಲಹೆಗಾರ'}
            </p>
          </div>

          {latestDiagnosis && (
            <div className="flex items-center gap-4 p-3 pr-6 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 animate-fade-in">
              <div className="size-12 rounded-xl overflow-hidden border border-[var(--primary)]/30">
                <img src={latestDiagnosis.imageUrl} alt="Context" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="block font-mono text-[0.55rem] text-[var(--primary)] font-bold uppercase tracking-widest">Active_Context</span>
                <span className="block text-white font-display font-bold uppercase text-sm truncate max-w-[150px]">{latestDiagnosis.diseaseName}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-8">
        <ChatBot lang={lang} context={latestDiagnosis} />
        
        {/* Quick Tips or Info */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card-premium p-6 border-white/5 bg-white/[0.02]">
            <h4 className="text-primary text-[10px] font-black uppercase tracking-widest mb-3">Expertise</h4>
            <ul className="space-y-2 text-xs text-text/70 font-medium">
              <li>• Disease Identification</li>
              <li>• Organic Treatment Plans</li>
              <li>• Soil & Weather Advice</li>
              <li>• Crop Rotation Cycles</li>
            </ul>
          </div>
          <div className="card-premium p-6 border-white/5 bg-white/[0.02]">
            <h4 className="text-primary text-[10px] font-black uppercase tracking-widest mb-3">Disclaimer</h4>
            <p className="text-[10px] text-muted leading-relaxed uppercase tracking-wider font-bold opacity-50">
              AI advice is for guidance. Please verify with local agricultural officers for critical decisions.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;
