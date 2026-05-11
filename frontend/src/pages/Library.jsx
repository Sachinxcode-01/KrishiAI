import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dataset } from '../data/dataset';
import { translations } from '../utils/translations';
import ManualDiagnosis from '../components/ManualDiagnosis';
import { Search, BookOpen, Database, Shield, Activity, ChevronRight, Sparkles, Binary } from 'lucide-react';

const Library = ({ lang }) => {
  const currentLang = lang || 'en';
  const t = translations[currentLang];
  const [searchTerm, setSearchTerm] = useState('');
  const [mode, setMode] = useState('browse'); // 'browse' or 'manual'

  const filteredDiseases = dataset.diseaseEncyclopedia.filter(item => 
    item.crop?.[currentLang]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.disease?.[currentLang]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 md:pt-40 lg:pt-56 px-[5%] md:px-[6%] pb-20 md:pb-40 max-w-[1600px] mx-auto min-h-screen relative"
    >
      {/* Background Aesthetic */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-64 bg-gradient-to-b from-[var(--primary)]/50 to-transparent opacity-20" />
      
      <div className="mb-16 md:mb-32 text-center space-y-4 md:space-y-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-3 px-4 md:px-5 py-2 rounded-full bg-[var(--primary)]/5 border border-[var(--primary)]/20 mb-2 md:mb-4 backdrop-blur-xl"
        >
          <Binary className="size-3.5 md:size-4 text-[var(--primary)] animate-pulse" />
          <span className="font-mono text-[0.6rem] md:text-[0.65rem] font-bold uppercase tracking-[0.5em] text-[var(--primary)]">Intelligence_Archive_v4.2</span>
        </motion.div>
        
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-7xl lg:text-9xl font-display font-black text-white italic tracking-tighter uppercase leading-[0.8]"
        >
          {t.libraryTitle.split(' ')[0]} <span className="text-[var(--primary)] text-stroke">{t.libraryTitle.split(' ')[1] || 'ARCHIVE'}</span>
        </motion.h1>
        
        <p className="text-[var(--muted)] text-[9px] md:text-[11px] font-bold uppercase tracking-[0.5em] max-w-2xl mx-auto leading-relaxed italic opacity-60 px-4 md:px-0">
          {t.libraryDesc}
        </p>
      </div>

      {/* HUD Mode Switcher */}
      <div className="flex bg-white/[0.02] border border-white/5 p-1.5 md:p-2 rounded-[1.5rem] md:rounded-[2rem] mb-12 md:mb-24 max-w-xl mx-auto backdrop-blur-3xl relative shadow-2xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)]/10 via-transparent to-[var(--primary)]/10 blur-2xl opacity-20" />
        <button 
          onClick={() => setMode('browse')}
          className={`relative flex-1 py-4 md:py-5 rounded-xl md:rounded-[1.5rem] text-[0.6rem] md:text-[0.65rem] font-black uppercase tracking-[0.3em] transition-all duration-500 z-10 flex items-center justify-center gap-2 md:gap-3 ${mode === 'browse' ? 'text-black' : 'text-white/30 hover:text-white/60'}`}
        >
          {mode === 'browse' && (
            <motion.div 
              layoutId="mode-pill" 
              className="absolute inset-0 bg-[var(--primary)] rounded-xl md:rounded-[1.5rem] -z-10 shadow-[0_0_30px_rgba(0,255,135,0.3)]" 
            />
          )}
          <BookOpen className="size-3.5 md:size-4" />
          <span className="whitespace-nowrap">{currentLang === 'en' ? 'Encyclopedia' : 'ಗ್ರಂಥಾಲಯ'}</span>
        </button>
        <button 
          onClick={() => setMode('manual')}
          className={`relative flex-1 py-4 md:py-5 rounded-xl md:rounded-[1.5rem] text-[0.6rem] md:text-[0.65rem] font-black uppercase tracking-[0.3em] transition-all duration-500 z-10 flex items-center justify-center gap-2 md:gap-3 ${mode === 'manual' ? 'text-black' : 'text-white/30 hover:text-white/60'}`}
        >
          {mode === 'manual' && (
            <motion.div 
              layoutId="mode-pill" 
              className="absolute inset-0 bg-[var(--primary)] rounded-xl md:rounded-[1.5rem] -z-10 shadow-[0_0_30px_rgba(0,255,135,0.3)]" 
            />
          )}
          <Activity className="size-3.5 md:size-4" />
          <span className="whitespace-nowrap">{currentLang === 'en' ? 'Smart Search' : 'ಬುದ್ಧಿವಂತ ಹುಡುಕಾಟ'}</span>
        </button>
      </div>
��ುಕಾಟ'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'browse' ? (
          <motion.div 
            key="browse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-24"
          >
            {/* Search Matrix */}
            <div className="relative max-w-4xl mx-auto group mb-12 md:mb-24">
              <div className="absolute inset-0 bg-[var(--primary)]/5 blur-[40px] md:blur-[80px] rounded-full opacity-0 group-focus-within:opacity-100 transition-all duration-1000" />
              <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 flex items-center gap-3 md:gap-5 text-white/20 group-focus-within:text-[var(--primary)] transition-colors">
                <Search className="size-5 md:size-7" />
                <div className="h-6 md:h-8 w-px bg-white/10 group-focus-within:bg-[var(--primary)]/40 transition-colors" />
              </div>
              <input 
                type="text"
                placeholder={currentLang === 'en' ? "IDENTIFY_SPECIMEN..." : "ಹುಡುಕಿ..."}
                className="w-full bg-white/[0.02] border border-white/5 rounded-[2rem] md:rounded-[3rem] py-6 md:py-10 pl-16 md:pl-28 pr-6 md:pr-12 text-white 
                           placeholder:text-white/10 focus:outline-none focus:border-[var(--primary)]/30 
                           transition-all shadow-2xl text-[0.7rem] md:text-sm font-mono tracking-[0.2em] uppercase italic backdrop-blur-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Specimen Matrix */}
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
              {filteredDiseases.length > 0 ? (
                filteredDiseases.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-panel group relative overflow-hidden p-6 md:p-12 hover:border-[var(--primary)]/30 transition-all duration-700"
                  >
                    <div className="absolute inset-0 specimen-grid opacity-5 group-hover:opacity-10 transition-opacity" />
                    <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                      <Binary className="size-16 md:size-24" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 md:mb-10">
                        <div className="space-y-3 md:space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="inline-block px-3 md:px-4 py-1 bg-[var(--primary)]/5 text-[var(--primary)] text-[0.55rem] md:text-[0.6rem] font-black uppercase tracking-[0.4em] rounded-full border border-[var(--primary)]/20 italic">
                              SPECIMEN::{item.crop[currentLang] || item.crop.en}
                            </span>
                            <div className="size-1.5 md:size-2 rounded-full bg-[var(--primary)] animate-pulse" />
                          </div>
                          <h3 className="text-2xl md:text-5xl font-display font-black text-white italic group-hover:text-[var(--primary)] transition-colors uppercase tracking-tighter leading-none">
                            {item.disease[currentLang] || item.disease.en}
                          </h3>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-3">
                          <div className={`px-3 md:px-4 py-1 rounded-full border text-[0.55rem] md:text-[0.6rem] font-black uppercase tracking-widest
                            ${item.severity === 'Critical' ? 'text-red-400 border-red-400/20 bg-red-400/5 shadow-[0_0_20px_rgba(248,113,113,0.1)]' : 
                              item.severity === 'High' ? 'text-amber-400 border-amber-400/20 bg-amber-400/5' : 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5'}
                          `}>
                            {item.severity}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-8 md:space-y-10">
                        <div className="space-y-3 md:space-y-4">
                          <div className="flex items-center gap-3 text-[var(--primary)]/50">
                            <Activity className="size-3.5 md:size-4" />
                            <h4 className="text-[0.6rem] md:text-[0.65rem] font-black uppercase tracking-[0.4em]">Clinical_Anomalies</h4>
                          </div>
                          <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed font-sans line-clamp-3 md:line-clamp-none transition-all duration-500">{item.symptoms[currentLang] || item.symptoms.en}</p>
                        </div>
                        
                        <div className="bg-white/[0.03] border border-white/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] group-hover:bg-[var(--primary)]/[0.03] group-hover:border-[var(--primary)]/20 transition-all duration-500 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-0 bg-[var(--primary)] group-hover:h-full transition-all duration-700" />
                          <div className="flex items-center gap-3 mb-4">
                            <Shield className="size-3.5 md:size-4 text-[var(--primary)]" />
                            <h4 className="text-[0.6rem] md:text-[0.65rem] font-black uppercase tracking-[0.4em] text-[var(--primary)]">Protocol_Alpha_Verified</h4>
                          </div>
                          <p className="text-base md:text-lg text-white/90 font-medium leading-relaxed italic">{item.treatment[currentLang] || item.treatment.en}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-56 glass-panel border-dashed border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 specimen-grid opacity-5" />
                  <Database className="size-20 mx-auto mb-10 text-white/5" />
                  <p className="text-sm font-black uppercase tracking-[0.8em] text-white/20 italic">No_Specimen_Found_In_Archive</p>
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
            <ManualDiagnosis lang={currentLang} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Source Registry */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-56 pt-32 border-t border-white/5"
      >
        <div className="text-center mb-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 size-64 bg-[var(--primary)]/5 blur-[100px] pointer-events-none" />
          <h3 className="text-sm font-black uppercase tracking-[0.8em] text-[var(--primary)] italic mb-3">Scientific_Pedigree</h3>
          <p className="text-[0.65rem] text-white/20 font-black uppercase tracking-[0.5em]">Validated_Intelligence_Infrastructure</p>
        </div>
        
        <div className="grid sm:grid-cols-3 gap-10">
          {dataset.resources.map((res, i) => (
            <motion.a 
              key={i} 
              href={res.url} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -10 }}
              className="bg-white/[0.02] border border-white/5 p-12 rounded-[3rem] hover:bg-white/[0.04] hover:border-[var(--primary)]/20 transition-all duration-500 group block relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-0 bg-[var(--primary)] group-hover:h-full transition-all duration-700" />
              <div className="flex items-center gap-4 mb-4">
                <Sparkles className="size-5 text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-[var(--primary)] transition-colors">{res.name}</h4>
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed font-medium font-sans opacity-60 group-hover:opacity-100 transition-opacity">{res.desc}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Library;
