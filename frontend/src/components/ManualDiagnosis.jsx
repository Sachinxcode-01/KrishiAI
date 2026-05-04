import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../utils/translations';
import api from '../utils/api';
import ResultCard from './ResultCard';

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
      setError(lang === 'en' ? 'Failed to identify disease. Please try again.' : 'ರೋಗ ಪತ್ತೆಹಚ್ಚಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div 
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card p-6 space-y-4"
          >
            <div className="text-center">
              <h3 className="text-lg font-bold text-white">{t.manualTitle}</h3>
              <p className="text-xs text-text/40">{t.manualDesc}</p>
            </div>
            
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder={t.manualPlaceholder}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-text/20 focus:outline-none focus:border-primary/30 transition-all h-32 resize-none"
            />

            <button
              onClick={handleDiagnose}
              disabled={loading || !symptoms.trim()}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${
                loading ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>{lang === 'en' ? 'Analyzing...' : 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...'}</span>
                </div>
              ) : (
                t.manualBtn
              )}
            </button>

            {error && <p className="text-[10px] text-red-400 text-center font-bold">{error}</p>}
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center px-1">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Diagnosis Result</h3>
              <button 
                onClick={() => { setResult(null); setSymptoms(''); }}
                className="text-[10px] font-bold text-text/40 uppercase hover:text-white transition-colors"
              >
                {lang === 'en' ? 'Start Over' : 'ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ'}
              </button>
            </div>
            
            {/* We reuse ResultCard but pass a mock image since there's no photo */}
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
