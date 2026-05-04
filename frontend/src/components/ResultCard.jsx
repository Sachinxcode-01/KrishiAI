import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../utils/translations';
import DiseaseInfo from './DiseaseInfo';
import TreatmentSteps from './TreatmentSteps';
import MedicineCard from './MedicineCard';
import VoiceOutput from './VoiceOutput';

const ResultCard = ({ lang, data, onReset }) => {
  const t = translations[lang];

  const handleShare = () => {
    const text = `${t.results}: ${lang === 'en' ? data.diseaseName : data.diseaseNameKannada}\n${t.medicine}: ${lang === 'en' ? data.medicineAdvice : data.medicineAdviceKannada}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 animate-fade-in"
    >
      {/* Hero Header */}
      <div className="glass-card overflow-hidden p-0">
        <div className="relative h-64 sm:h-80 lg:h-96 w-full">
          <img 
            src={data.imageUrl} 
            alt="Scanned Leaf" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Analysis Complete</p>
              <h2 className="text-3xl font-black text-white leading-none">
                {lang === 'en' ? data.diseaseName : data.diseaseNameKannada}
              </h2>
              <p className="text-sm font-medium text-text/60 mt-2">
                {lang === 'en' ? data.cropName : data.cropNameKannada}
              </p>
            </div>
            <VoiceOutput lang={lang} data={data} />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Disease Info & Stats */}
          <DiseaseInfo lang={lang} data={data} />

          {/* Description & Causes */}
          <div className="glass-card space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-2">{t.cause}</h3>
              <p className="text-sm text-text/80 leading-relaxed font-medium">
                {lang === 'en' ? data.causes : data.causesKannada}
              </p>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-sm text-text/60 leading-relaxed italic">
                {lang === 'en' ? data.description : data.descriptionKannada}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Treatment Steps */}
          <TreatmentSteps lang={lang} steps={lang === 'en' ? data.treatment : data.treatmentKannada} />

          {/* Medicine Card */}
          <MedicineCard lang={lang} advice={lang === 'en' ? data.medicineAdvice : data.medicineAdviceKannada} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 no-print">
        <button 
          onClick={handleShare}
          className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          <span className="text-xl">💬</span>
          <span className="text-xs font-bold uppercase tracking-widest">{lang === 'en' ? 'Share' : 'ಹಂಚಿಕೊಳ್ಳಿ'}</span>
        </button>
        <button 
          onClick={handleDownload}
          className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          <span className="text-xl">📄</span>
          <span className="text-xs font-bold uppercase tracking-widest">{lang === 'en' ? 'Report' : 'ವರದಿ'}</span>
        </button>
        <button 
          onClick={onReset}
          className="w-full sm:col-span-2 lg:col-span-1 py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          <span className="text-lg">🔄</span>
          <span className="text-xs uppercase tracking-widest">{t.retakeBtn}</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ResultCard;
