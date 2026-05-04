import React from 'react';
import { motion } from 'framer-motion';
import ChatBot from '../components/ChatBot';
import { translations } from '../utils/translations';

const Chat = ({ lang }) => {
  const t = translations[lang];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 px-4 pb-32 max-w-4xl mx-auto"
    >
      <div className="mb-8 px-2">
        <h2 className="text-3xl font-black text-white mb-2">
          {lang === 'en' ? 'Krishi ' : 'ಕೃಷಿ '}<span className="text-primary italic">{lang === 'en' ? 'Assistant' : 'ಸಹಾಯಕ'}</span>
        </h2>
        <p className="text-muted text-sm font-medium">
          {lang === 'en' 
            ? 'Professional agricultural advice powered by advanced AI.' 
            : 'ಸುಧಾರಿತ AI ಮೂಲಕ ವೃತ್ತಿಪರ ಕೃಷಿ ಸಲಹೆಗಳು.'}
        </p>
      </div>

      <div className="grid gap-8">
        <ChatBot lang={lang} />
        
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
