import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../utils/translations';
import { Activity, ShieldAlert, Target, Percent } from 'lucide-react';

const DiseaseInfo = ({ lang, data }) => {
  const t = translations[lang];

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'High': return { color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20', label: t.high };
      case 'Medium': return { color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: t.medium };
      case 'Low': return { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: t.low };
      case 'Not Diseased': return { color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', label: t.healthy };
      default: return { color: 'text-muted', bg: 'bg-white/5', border: 'border-white/10', label: t.uncertain };
    }
  };

  const config = getSeverityConfig(data.severity);

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8">
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center gap-3 text-primary">
            <Target className="size-4 md:size-5" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">Specimen Matrix</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tighter">
            {lang === 'en' ? data.cropName : data.cropNameKannada}
          </h2>
          <div className="flex items-center gap-3">
            <Activity className="size-4 text-primary/50" />
            <p className="text-muted font-black text-[0.7rem] md:text-sm uppercase tracking-[0.2em]">
              {lang === 'en' ? data.diseaseName : data.diseaseNameKannada}
            </p>
          </div>
        </div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`w-full md:w-auto px-6 md:px-8 py-4 rounded-2xl md:rounded-[1.5rem] border ${config.bg} ${config.border} ${config.color} flex items-center gap-4 shadow-2xl backdrop-blur-xl`}
        >
          <ShieldAlert className="size-5 md:size-6" />
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Threat Status</span>
            <span className="text-sm md:text-base font-display font-black uppercase tracking-widest">{config.label}</span>
          </div>
        </motion.div>
      </div>

      <div className="card-premium p-6 md:p-10 bg-surface/5 space-y-6 md:space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <Percent className="size-12 md:size-16 text-white/[0.02]" />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative z-10">
          <div className="space-y-2">
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary">Neural Engine Confidence</p>
            <h3 className="text-5xl md:text-6xl font-display font-black text-white tracking-tighter">
              {data.confidence}<span className="text-xl md:text-2xl text-primary/40">%</span>
            </h3>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-[9px] font-black text-muted uppercase tracking-[0.2em] mb-1">Global Validation</p>
            <p className="text-[0.7rem] font-black text-primary uppercase tracking-widest">Active System</p>
          </div>
        </div>
        
        <div className="h-4 w-full bg-white/5 rounded-full p-1 relative overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${data.confidence}%` }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className={`h-full rounded-full ${data.confidence > 80 ? 'bg-primary' : data.confidence > 50 ? 'bg-amber-500' : 'bg-rose-500'} relative`}
          >
            <div className="absolute inset-0 bg-white/20 mix-blend-overlay animate-pulse" />
          </motion.div>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`h-1 rounded-full ${i < (data.confidence/25) ? 'bg-primary/40' : 'bg-white/5'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiseaseInfo;


