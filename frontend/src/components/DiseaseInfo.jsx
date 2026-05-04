import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../utils/translations';

const DiseaseInfo = ({ lang, data }) => {
  const t = translations[lang];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'text-error bg-error/10 border-error/20';
      case 'Medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'Low': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Not Diseased': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-text/60 bg-white/5 border-white/10';
    }
  };

  const severityText = lang === 'en' ? data.severity : 
    data.severity === 'High' ? t.high :
    data.severity === 'Medium' ? t.medium :
    data.severity === 'Low' ? t.low :
    data.severity === 'Not Diseased' ? t.healthy : t.uncertain;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {lang === 'en' ? data.cropName : data.cropNameKannada}
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#2ecc71]" />
            <p className="text-text/60 font-medium text-sm">
              {lang === 'en' ? data.diseaseName : data.diseaseNameKannada}
            </p>
          </div>
        </div>
        <div className={`badge ${getSeverityColor(data.severity)}`}>
          {severityText}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-text/40">
          <span>{t.confidence}</span>
          <span>{data.confidence}%</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${data.confidence}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full ${data.confidence > 80 ? 'bg-primary' : data.confidence > 50 ? 'bg-warning' : 'bg-error'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default DiseaseInfo;
