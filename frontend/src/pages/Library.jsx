import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dataset } from '../data/dataset';
import { translations } from '../utils/translations';
import ManualDiagnosis from '../components/ManualDiagnosis';

const Library = ({ lang }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [mode, setMode] = useState('browse'); // 'browse' or 'manual'

  const filteredDiseases = dataset.diseaseEncyclopedia.filter(item => 
    item.crop[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.disease[lang].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 px-4 pb-32 max-w-5xl mx-auto min-h-screen"
    >
      <div className="mb-16 text-center">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-black text-white mb-3 tracking-tight"
        >
          {t.libraryTitle}
        </motion.h1>
        <p className="text-muted text-sm max-w-md mx-auto leading-relaxed">{t.libraryDesc}</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex bg-white/[0.02] border border-white/5 p-1.5 rounded-[1.5rem] mb-12 max-w-md mx-auto shadow-2xl backdrop-blur-xl">
        <button 
          onClick={() => setMode('browse')}
          className={`relative flex-1 py-3 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all z-10 ${mode === 'browse' ? 'text-white' : 'text-muted/40 hover:text-white/60'}`}
        >
          {mode === 'browse' && (
            <motion.div 
              layoutId="toggle" 
              className="absolute inset-0 bg-primary rounded-[1.2rem] -z-10 shadow-lg shadow-primary/20" 
            />
          )}
          {lang === 'en' ? 'Encyclopedia' : 'ಗ್ರಂಥಾಲಯ'}
        </button>
        <button 
          onClick={() => setMode('manual')}
          className={`relative flex-1 py-3 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all z-10 ${mode === 'manual' ? 'text-white' : 'text-muted/40 hover:text-white/60'}`}
        >
          {mode === 'manual' && (
            <motion.div 
              layoutId="toggle" 
              className="absolute inset-0 bg-primary rounded-[1.2rem] -z-10 shadow-lg shadow-primary/20" 
            />
          )}
          {lang === 'en' ? 'Smart Search' : 'ಬುದ್ಧಿವಂತ ಹುಡುಕಾಟ'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'browse' ? (
          <motion.div 
            key="browse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl pointer-events-none group-focus-within:scale-110 transition-transform">🔍</span>
              <input 
                type="text"
                placeholder={lang === 'en' ? "Search for crops or symptoms..." : "ಬೆಳೆ ಅಥವಾ ಲಕ್ಷಣಗಳನ್ನು ಹುಡುಕಿ..."}
                className="w-full bg-surface border border-white/5 rounded-[2rem] py-5 pl-16 pr-6 text-white 
                           placeholder:text-muted/20 focus:outline-none focus:border-primary/50 
                           transition-all shadow-inner text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Disease List */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredDiseases.length > 0 ? (
                filteredDiseases.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="card-premium group"
                  >
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div className="space-y-2">
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-lg border border-primary/20">
                            {item.crop[lang]}
                          </span>
                          <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{item.disease[lang]}</h3>
                        </div>
                        <div className={`w-3 h-3 rounded-full blur-[2px] animate-pulse
                          ${item.severity === 'Critical' ? 'bg-red-500' : 
                            item.severity === 'High' ? 'bg-orange-500' : 'bg-yellow-500'}
                        `} />
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Clinical Symptoms</h4>
                          <p className="text-[13px] text-muted leading-relaxed line-clamp-3">{item.symptoms[lang]}</p>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl group-hover:bg-primary/[0.03] group-hover:border-primary/10 transition-colors">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Protocol</h4>
                          <p className="text-[13px] text-text/90 font-medium leading-relaxed">{item.treatment[lang]}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-32 bg-white/[0.01] rounded-[3rem] border border-dashed border-white/5">
                  <span className="text-6xl block mb-6 opacity-10 grayscale">📭</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted/30">No matches found in database</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="manual"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ManualDiagnosis lang={lang} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scientific Resources Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-32 pt-16 border-t border-white/5"
      >
        <div className="text-center mb-12">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary">Scientific Pedigree</h3>
          <p className="text-[10px] text-muted mt-2 uppercase tracking-widest">Validated Agricultural Intelligence</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {dataset.resources.map((res, i) => (
            <motion.a 
              key={i} 
              href={res.url} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.03] transition-all group block"
            >
              <h4 className="text-xs font-bold text-white mb-2 group-hover:text-primary transition-colors">{res.name}</h4>
              <p className="text-[10px] text-muted/40 leading-relaxed font-medium">{res.desc}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Library;
