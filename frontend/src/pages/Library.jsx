import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Database, Activity, Shield, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { dataset } from '../data/dataset';
import ManualDiagnosis from '../components/ManualDiagnosis';

const Library = () => {
  const [mode, setMode] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLang, setCurrentLang] = useState('en');

  const filteredDiseases = dataset.diseaseEncyclopedia.filter(item => 
    item.crop.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.crop.kn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.disease.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.disease.kn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-40 pb-32 px-[6%] relative"
    >
      <div className="fixed inset-0 bg-[#020504] -z-20" />
      <div className="fixed top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-[length:40px_40px] opacity-[0.03] -z-10" />

      <div className="max-w-7xl mx-auto mb-20 md:mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[var(--primary)]/30" />
              <span className="font-mono text-[0.65rem] font-black uppercase tracking-[0.5em] text-[var(--primary)]">Scientific_Archive_v4.0</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-display font-black text-white leading-[0.85] uppercase tracking-tighter italic">
              Knowledge <br /><span className="text-stroke text-[var(--primary)]">Repository</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-2xl border border-white/10">
            <button 
              onClick={() => setCurrentLang('en')}
              className={`px-6 py-2.5 rounded-xl font-mono text-[0.65rem] font-bold tracking-widest transition-all ${currentLang === 'en' ? 'bg-[var(--primary)] text-black' : 'text-white/40 hover:text-white'}`}
            >
              ENGLISH
            </button>
            <button 
              onClick={() => setCurrentLang('kn')}
              className={`px-6 py-2.5 rounded-xl font-mono text-[0.65rem] font-bold tracking-widest transition-all ${currentLang === 'kn' ? 'bg-[var(--primary)] text-black' : 'text-white/40 hover:text-white'}`}
            >
              KANNADA
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mb-20 p-2 bg-white/5 rounded-2xl md:rounded-[2rem] border border-white/10 flex relative">
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
          <span>{currentLang === 'en' ? 'Browse Library' : 'ಗ್ರಂಥಾಲಯ'}</span>
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
          <span>{currentLang === 'en' ? 'Manual Diagnosis' : 'ಕೈಯಿಂದ ತಪಾಸಣೆ'}</span>
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
            <div className="relative max-w-4xl mx-auto group">
              <div className="absolute inset-0 bg-[var(--primary)]/5 blur-[80px] rounded-full opacity-0 group-focus-within:opacity-100 transition-all duration-1000" />
              <div className="absolute left-10 top-1/2 -translate-y-1/2 flex items-center gap-5 text-white/20 group-focus-within:text-[var(--primary)] transition-colors">
                <Search className="size-7" />
                <div className="h-8 w-px bg-white/10 group-focus-within:bg-[var(--primary)]/40 transition-colors" />
              </div>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentLang === 'en' ? "Search by crop or disease..." : "ಹುಡುಕಾಟ..."}
                className="w-full h-24 md:h-28 bg-white/[0.03] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] pl-28 md:pl-32 pr-10 text-xl md:text-2xl text-white placeholder:text-white/10 outline-none focus:border-[var(--primary)]/40 focus:bg-white/[0.05] transition-all font-display italic tracking-tight"
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 max-w-[1600px] mx-auto">
              {filteredDiseases.length > 0 ? (
                filteredDiseases.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative bg-white/[0.02] border border-white/5 rounded-[3rem] md:rounded-[4rem] p-8 md:p-14 hover:bg-white/[0.04] hover:border-[var(--primary)]/20 transition-all duration-700 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <ChevronRight className="size-10 text-[var(--primary)] -rotate-45" />
                    </div>

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 md:gap-16 items-start">
                      <div className="space-y-10">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Sparkles className="size-4 text-[var(--primary)]" />
                            <span className="font-mono text-[0.6rem] font-black uppercase tracking-[0.4em] text-[var(--primary)]">Biological_Threat_Logged</span>
                          </div>
                          <h3 className="text-4xl md:text-5xl font-display font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-[var(--primary)] transition-colors duration-500">
                            {item.disease[currentLang]}
                          </h3>
                          <p className="font-mono text-[0.7rem] text-white/20 uppercase tracking-[0.2em]">Target: {item.crop[currentLang]}</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                          <span className="text-[0.6rem] font-black uppercase tracking-widest text-white/30">Threat_Severity</span>
                          <div className={`text-xl font-display font-black uppercase italic tracking-tighter
                            ${item.severity === 'Critical' || item.severity === 'High' ? 'text-red-500' : 'text-[var(--primary)]'}
                          `}>
                            {item.severity}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-10">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-[var(--primary)]/50">
                            <Activity className="size-4" />
                            <h4 className="text-[0.65rem] font-black uppercase tracking-[0.4em]">Symptom_Matrix</h4>
                          </div>
                          <p className="text-lg text-[var(--muted)] leading-relaxed font-sans">{item.symptoms[currentLang]}</p>
                        </div>
                        
                        <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[2rem] group-hover:bg-[var(--primary)]/[0.03] group-hover:border-[var(--primary)]/20 transition-all duration-500 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-0 bg-[var(--primary)] group-hover:h-full transition-all duration-700" />
                          <div className="flex items-center gap-3 mb-4">
                            <Shield className="size-4 text-[var(--primary)]" />
                            <h4 className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-[var(--primary)]">Counter_Measure_Protocol</h4>
                          </div>
                          <p className="text-lg text-white/90 font-medium leading-relaxed italic">{item.treatment[currentLang]}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-56 glass-panel border-dashed border-white/10">
                  <Database className="size-20 mx-auto mb-10 text-white/5" />
                  <p className="text-sm font-black uppercase tracking-[0.8em] text-white/20 italic">No_Biological_Records_Matched</p>
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

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-56 pt-32 border-t border-white/5"
      >
        <div className="text-center mb-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 size-64 bg-[var(--primary)]/5 blur-[100px] pointer-events-none" />
          <h3 className="text-sm font-black uppercase tracking-[0.8em] text-[var(--primary)] italic mb-3">Scientific_Registry</h3>
          <p className="text-[0.65rem] text-white/20 font-black uppercase tracking-[0.5em]">Verified_Intelligence_Infrastructure</p>
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
