import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../utils/translations';
import { Zap, Activity, Cpu } from 'lucide-react';

const AnalyzeButton = ({ lang, onClick, disabled, loading }) => {
  const t = translations[lang];

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
      className={`group w-full py-6 rounded-2xl font-display font-black text-xs uppercase tracking-[0.4em] flex flex-col items-center justify-center gap-1 transition-all duration-700 overflow-hidden relative border-2
        ${disabled 
          ? 'bg-white/5 text-white/50 border-white/10 cursor-not-allowed' 
          : 'bg-primary text-black border-primary shadow-[0_0_50px_rgba(0,255,136,0.3)] hover:shadow-[0_0_70px_rgba(0,255,136,0.5)]'}
      `}
    >
      {/* Technical Background Scan Line */}
      {!disabled && !loading && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent h-1/2 w-full z-0"
          animate={{ top: ['-50%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      )}

      {loading && (
        <motion.div
          className="absolute inset-0 bg-white/20 z-0"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      )}

      {/* Decorative Corners */}
      <div className="absolute top-2 left-2 size-2 border-t-2 border-l-2 border-black/20" />
      <div className="absolute top-2 right-2 size-2 border-t-2 border-r-2 border-black/20" />
      <div className="absolute bottom-2 left-2 size-2 border-b-2 border-l-2 border-black/20" />
      <div className="absolute bottom-2 right-2 size-2 border-b-2 border-r-2 border-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          {loading ? (
            <Activity className="size-5 animate-pulse" />
          ) : (
            <div className="relative">
              <Cpu className="size-5 transition-transform group-hover:rotate-90 duration-700" />
              <Zap className="size-2 absolute -top-1 -right-1 text-black fill-current animate-bounce" />
            </div>
          )}
          <span className="leading-none">{t.analyzeBtn}</span>
        </div>
        
        {/* Sub-text Node ID */}
        <span className="font-mono text-[0.5rem] opacity-40 tracking-[0.5em] font-bold">
          {loading ? 'PROCESSING_NEURAL_WEIGHTS' : 'SYSTEM_NODE_READY_V2'}
        </span>
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
    </motion.button>
  );
};

export default AnalyzeButton;
