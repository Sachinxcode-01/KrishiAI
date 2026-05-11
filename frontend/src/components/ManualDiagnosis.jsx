import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../utils/translations';
import api from '../utils/api';
import ResultCard from './ResultCard';
import { Terminal, Zap, Activity, Cpu } from 'lucide-react';

const ManualDiagnosis = ({ lang }) => {
  const t = translations[lang];
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleDiagnose = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/analyze/text', { symptoms });
      if (response.data.success) {
        setResult(response.data.data);
      }
    } catch (err) {
      setError(lang === 'en' ? 'CRITICAL_FAIL: Neural identification interrupted.' : 'ದೋಷ: ವಿಶ್ಲೇಷಣೆ ವಿಫಲವಾಗಿದೆ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div 
            key="input"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="card-premium p-6 md:p-10 lg:p-16 space-y-8 md:space-y-12 bg-surface/20 border-white/10 scanner-glow max-w-4xl mx-auto"
          >
            <div className="text-center space-y-3 md:space-y-4">
              <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="size-1 md:size-1.5 rounded-full bg-primary animate-pulse" />
                <h3 className="text-xl md:text-3xl font-display font-black text-white italic tracking-tighter uppercase">{t.manualTitle}</h3>
                <div className="size-1 md:size-1.5 rounded-full bg-primary animate-pulse" />
              </div>
              <p className="text-[10px] md:text-[11px] font-black text-white/30 uppercase tracking-[0.4em] max-w-xl mx-auto italic px-2 md:px-0">{t.manualDesc}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2 md:px-4">
                <div className="flex items-center gap-3">
                  <Terminal className="size-3.5 md:size-4 text-primary" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Symptom_Log_Stream</span>
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="size-1 bg-primary/20 rounded-full" />)}
                </div>
              </div>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder={t.manualPlaceholder}
                className="w-full bg-black/40 border border-white/10 rounded-2xl md:rounded-[2rem] p-6 md:p-10 text-sm md:text-[15px] text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 transition-all h-40 md:h-64 resize-none font-mono tracking-wide"
              />
            </div>

            <button
              onClick={handleDiagnose}
              disabled={loading || !symptoms.trim()}
              className={`group relative w-full py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-xs transition-all overflow-hidden border
                ${loading 
                  ? 'bg-primary/20 border-primary/20 cursor-not-allowed text-primary/40' 
                  : 'bg-primary text-black border-primary shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_50px_rgba(16,185,129,0.4)]'
                }`}
            >
              {loading && (
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              )}
              <div className="relative z-10 flex items-center justify-center gap-4 italic">
                {loading ? (
                  <>
                    <Cpu className="size-5 animate-spin" />
                    <span>Processing_Neural_Array...</span>
                  </>
                ) : (
                  <>
                    <Zap className="size-5" />
                    <span>{t.manualBtn}</span>
                  </>
                )}
              </div>
            </button>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4"
              >
                <div className="size-2 rounded-full bg-red-500 animate-ping" />
                <p className="text-[10px] text-red-500 font-black uppercase tracking-widest">{error}</p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-12 max-w-6xl mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-2 md:px-4">
              <div className="flex items-center gap-4">
                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Activity className="size-4 text-primary" />
                </div>
                <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-primary">Neural_Diagnosis_Complete</h3>
              </div>
              <button 
                onClick={() => { setResult(null); setSymptoms(''); }}
                className="w-full md:w-auto px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black text-white/40 uppercase tracking-[0.4em] hover:bg-white/10 hover:text-white transition-all italic"
              >
                RESET_PROTOCOL
              </button>
            </div>
            
            <ResultCard 
              lang={lang} 
              data={{ ...result, imageUrl: 'https://images.unsplash.com/photo-1592919016382-354bce365312?auto=format&fit=crop&q=80&w=400' }} 
              onReset={() => { setResult(null); setSymptoms(''); }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManualDiagnosis;
