import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../utils/translations';

const HistoryList = ({ lang, history, onDelete, onClear, onViewItem }) => {
  const t = translations[lang];

  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
        <div className="text-6xl opacity-20">📜</div>
        <p className="text-text/40 font-medium">{t.noHistory}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-lg font-bold text-white">{t.historyBtn}</h2>
        <button
          onClick={onClear}
          className="text-xs font-bold text-error hover:opacity-80 transition-all uppercase tracking-widest"
        >
          {t.clearHistory}
        </button>
      </div>

      <div className="space-y-3 pb-24">
        <AnimatePresence>
          {history.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass-card flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-all relative overflow-hidden"
              onClick={() => onViewItem(item)}
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                <img src={item.imageUrl} alt={item.cropName} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white truncate">
                  {lang === 'en' ? item.cropName : item.cropNameKannada}
                </h3>
                <p className="text-xs text-text/60 truncate">
                  {lang === 'en' ? item.diseaseName : item.diseaseNameKannada}
                </p>
                <p className="text-[10px] text-text/40 mt-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item._id);
                  }}
                  className="p-2 text-text/20 hover:text-error transition-all"
                >
                  🗑️
                </button>
                <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase border
                  ${item.severity === 'High' ? 'text-error border-error/20 bg-error/5' : 
                    item.severity === 'Medium' ? 'text-warning border-warning/20 bg-warning/5' : 
                    'text-primary border-primary/20 bg-primary/5'}
                `}>
                  {lang === 'en' ? item.severity : 
                    item.severity === 'High' ? t.high : 
                    item.severity === 'Medium' ? t.medium : t.low}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HistoryList;
