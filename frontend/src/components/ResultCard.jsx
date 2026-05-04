import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../utils/translations';
import DiseaseInfo from './DiseaseInfo';
import TreatmentSteps from './TreatmentSteps';
import MedicineCard from './MedicineCard';
import VoiceOutput from './VoiceOutput';
import KrishiLocator from './KrishiLocator';

const ResultCard = ({ lang, data, onReset }) => {
  const t = translations[lang];
  const [showLocator, setShowLocator] = useState(false);

  const handleShare = () => {
    const text = `${t.results}: ${lang === 'en' ? data.diseaseName : data.diseaseNameKannada}\n${t.medicine}: ${lang === 'en' ? data.medicineAdvice : data.medicineAdviceKannada}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-10 pb-20"
    >
      <AnimatePresence>
        {showLocator && (
          <KrishiLocator lang={lang} onClose={() => setShowLocator(false)} />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="card-premium overflow-hidden p-0 relative group">
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="relative h-72 sm:h-96 w-full">
          <img 
            src={data.imageUrl} 
            alt="Scanned Leaf" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Intelligence Report Complete</p>
              </motion.div>
              
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-black text-white leading-tight tracking-tight sm:text-5xl"
              >
                {lang === 'en' ? data.diseaseName : data.diseaseNameKannada}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-base font-bold text-muted uppercase tracking-[0.1em]"
              >
                Target Host: {lang === 'en' ? data.cropName : data.cropNameKannada}
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full sm:w-64"
            >
              <VoiceOutput lang={lang} data={data} />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
          {/* Analysis Metrics */}
          <DiseaseInfo lang={lang} data={data} />

          {/* Clinical Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="card-premium space-y-6"
          >
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3">Pathogen Source</h3>
              <p className="text-[14px] text-text/80 leading-relaxed font-medium">
                {lang === 'en' ? data.causes : data.causesKannada}
              </p>
            </div>
            <div className="pt-6 border-t border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 mb-3">Detailed Assessment</h4>
              <p className="text-[14px] text-muted leading-relaxed italic">
                {lang === 'en' ? data.description : data.descriptionKannada}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          {/* Treatment Protocol */}
          <TreatmentSteps lang={lang} steps={lang === 'en' ? data.treatment : data.treatmentKannada} />

          {/* Chemical/Biological Solution */}
          <MedicineCard lang={lang} advice={lang === 'en' ? data.medicineAdvice : data.medicineAdviceKannada} />
        </div>
      </div>

      {/* Action Suite */}
      <div className="grid sm:grid-cols-4 gap-4 pt-6 no-print">
        <motion.button 
          whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.08)' }}
          onClick={() => setShowLocator(true)}
          className="flex-1 py-4 bg-primary/10 border border-primary/20 text-primary rounded-2xl flex items-center justify-center gap-3 transition-all"
        >
          <span className="text-xl">📍</span>
          <span className="text-[10px] font-black uppercase tracking-widest">{lang === 'en' ? 'Find Help' : 'ಸಹಾಯ ಪಡೆಯಿರಿ'}</span>
        </motion.button>

        <motion.button 
          whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.08)' }}
          onClick={handleShare}
          className="flex-1 py-4 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center gap-3 transition-all"
        >
          <span className="text-xl">💬</span>
          <span className="text-[10px] font-black uppercase tracking-widest">{lang === 'en' ? 'Export' : 'ಹಂಚಿಕೊಳ್ಳಿ'}</span>
        </motion.button>
        
        <motion.button 
          whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.08)' }}
          onClick={handleDownload}
          className="flex-1 py-4 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center gap-3 transition-all"
        >
          <span className="text-xl">📄</span>
          <span className="text-[10px] font-black uppercase tracking-widest">{lang === 'en' ? 'Report' : 'ವರದಿ'}</span>
        </motion.button>
        
        <motion.button 
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="flex-1 py-4 bg-primary text-background font-black rounded-2xl shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 transition-all"
        >
          <span className="text-xl">🔄</span>
          <span className="text-[10px] font-black uppercase tracking-widest">{t.retakeBtn}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ResultCard;
