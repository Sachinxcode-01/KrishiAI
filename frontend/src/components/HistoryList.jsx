import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../utils/translations';

const HistoryList = ({ lang, history, onDelete, onViewItem }) => {
  const t = translations[lang];

  if (!history || history.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center p-20 text-center space-y-6 bg-white/[0.02] border border-dashed border-white/10 rounded-[2rem]"
      >
        <div className="text-6xl opacity-10 filter grayscale">📜</div>
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted/40">Archive Empty</p>
          <p className="text-xs text-muted/20">{t.noHistory}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 pb-32">
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {history.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
              layout
              className="card-premium group relative overflow-hidden cursor-pointer"
              onClick={() => onViewItem(item)}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-5 flex items-center gap-5">
                {/* Image Preview */}
                <div className="relative h-16 w-16 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src={item.imageUrl} 
                    alt={item.cropName} 
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest rounded-md border border-primary/20">
                      {lang === 'en' ? item.cropName : item.cropNameKannada}
                    </span>
                    <span className="text-[9px] text-muted/40 font-medium">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-sm font-bold text-white truncate group-hover:text-primary transition-colors">
                    {lang === 'en' ? item.diseaseName : item.diseaseNameKannada}
                  </h3>
                  
                  <div className="mt-2 flex items-center gap-3">
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider
                      ${item.severity === 'High' ? 'text-red-400 bg-red-400/10' : 
                        item.severity === 'Medium' ? 'text-orange-400 bg-orange-400/10' : 
                        'text-emerald-400 bg-emerald-400/10'}
                    `}>
                      <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
                      {lang === 'en' ? item.severity : 
                        item.severity === 'High' ? t.high : 
                        item.severity === 'Medium' ? t.medium : t.low}
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item._id);
                  }}
                  className="p-3 bg-white/[0.03] hover:bg-red-500/10 text-muted/30 hover:text-red-400 rounded-xl border border-white/5 hover:border-red-500/20 transition-all active:scale-90"
                >
                  <span className="text-sm">🗑️</span>
                </button>
              </div>

              {/* Progress Line */}
              <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-primary/50 to-transparent w-0 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HistoryList;
