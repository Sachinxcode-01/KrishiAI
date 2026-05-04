import React from 'react';
import { translations } from '../utils/translations';

const MedicineCard = ({ lang, advice }) => {
  const t = translations[lang];

  return (
    <div className="bg-gradient-to-br from-primary/20 to-surface border border-primary/20 p-4 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-xl">
          💊
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary leading-none">
            {t.medicine}
          </h3>
          <p className="text-sm font-bold text-white mt-1">
            {advice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
