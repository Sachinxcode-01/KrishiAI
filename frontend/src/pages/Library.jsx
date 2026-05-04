import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    <div className="pt-24 px-6 pb-32 max-w-4xl mx-auto min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-black text-white mb-2">{t.libraryTitle}</h1>
        <p className="text-text/40 text-sm">{t.libraryDesc}</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex bg-white/[0.03] border border-white/5 p-1 rounded-2xl mb-12">
        <button 
          onClick={() => setMode('browse')}
          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'browse' ? 'bg-primary text-white' : 'text-text/40 hover:text-text/60'}`}
        >
          {lang === 'en' ? 'Browse Library' : 'ಗ್ರಂಥಾಲಯ'}
        </button>
        <button 
          onClick={() => setMode('manual')}
          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'manual' ? 'bg-primary text-white' : 'text-text/40 hover:text-text/60'}`}
        >
          {lang === 'en' ? 'Identify by Text' : 'ಪಠ್ಯದ ಮೂಲಕ ಪತ್ತೆಹಚ್ಚಿ'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'browse' ? (
          <motion.div 
            key="browse"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            {/* Search Bar */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
              <input 
                type="text"
                placeholder={lang === 'en' ? "Search crop or disease..." : "ಬೆಳೆ ಅಥವಾ ರೋಗವನ್ನು ಹುಡುಕಿ..."}
                className="w-full bg-surface/40 backdrop-blur-md border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-text/20 focus:outline-none focus:border-primary/30 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Disease List */}
            <div className="grid gap-6">
              {filteredDiseases.length > 0 ? (
                filteredDiseases.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card overflow-hidden group"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                            {item.crop[lang]}
                          </span>
                          <h3 className="text-xl font-bold text-white">{item.disease[lang]}</h3>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          item.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 
                          item.severity === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {item.severity}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Symptoms</h4>
                          <p className="text-sm text-text/80 leading-relaxed">{item.symptoms[lang]}</p>
                        </div>
                        <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Recommended Treatment</h4>
                          <p className="text-sm text-text/90 font-medium">{item.treatment[lang]}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
                  <p className="text-text/20 font-bold uppercase tracking-widest">No matching results found</p>
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
      <div className="mt-20 pt-12 border-t border-white/5">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 text-center">Scientific Resources & Datasets</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {dataset.resources.map((res, i) => (
            <a 
              key={i} 
              href={res.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl hover:bg-white/[0.05] transition-all group"
            >
              <h4 className="text-[10px] font-bold text-white mb-1 group-hover:text-primary transition-colors">{res.name}</h4>
              <p className="text-[9px] text-text/30 leading-relaxed">{res.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
