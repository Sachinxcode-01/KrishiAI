import React from 'react';
import { translations } from '../utils/translations';

const TreatmentSteps = ({ lang, steps }) => {
  const t = translations[lang];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
        <span>📋</span> {t.treatment}
      </h3>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center border border-primary/20">
              {i + 1}
            </span>
            <p className="text-sm text-text/80 leading-relaxed">
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentSteps;
