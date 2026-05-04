import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../utils/translations';

const AnalyzeButton = ({ lang, onClick, disabled, loading }) => {
  const t = translations[lang];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-500 shadow-xl overflow-hidden relative
        ${disabled ? 'bg-white/5 text-text/20 border border-white/5 cursor-not-allowed' : 'bg-primary text-background shadow-primary/20'}
      `}
    >
      {loading && (
        <motion.div
          className="absolute inset-0 bg-accent/20"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {loading ? '🔬' : '🔍'} {t.analyzeBtn}
      </span>
    </motion.button>
  );
};

export default AnalyzeButton;
