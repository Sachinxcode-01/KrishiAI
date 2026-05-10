import React from 'react';
import { translations } from '../utils/translations';
import { ClipboardCheck, ShieldZap, CheckCircle2, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const TreatmentSteps = ({ lang, steps }) => {
  const t = translations[lang];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-primary">
          <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <Terminal className="size-5" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Sequence List</span>
            <h3 className="text-xl font-display font-black text-white italic tracking-tight">{t.treatment}</h3>
          </div>
        </div>
        <div className="px-5 py-2 rounded-[1rem] bg-surface/20 border border-white/5 text-[9px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
          <div className="size-1.5 rounded-full bg-primary animate-pulse" />
          {steps.length} STAGES LOADED
        </div>
      </div>

      <div className="space-y-6 relative">
        {/* Timeline Infrastructure */}
        <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-primary/60 via-white/5 to-transparent" />

        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            className="flex gap-8 group"
          >
            <div className="relative z-10 size-12 flex-shrink-0 rounded-[1.2rem] bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-primary/60 transition-all duration-500 shadow-xl">
              <span className="text-sm font-display font-black text-white group-hover:text-primary transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>
              
              {/* Outer Ring Animation on Hover */}
              <div className="absolute -inset-2 rounded-[1.5rem] border border-primary/0 group-hover:border-primary/20 group-hover:scale-110 transition-all duration-700" />
            </div>
            
            <div className="flex-1 p-8 rounded-[2rem] bg-surface/5 border border-white/5 hover:bg-surface/10 transition-all duration-500 group-hover:translate-x-3 backdrop-blur-sm relative overflow-hidden">
              {/* Subtle background text */}
              <div className="absolute -top-4 -right-4 text-white/[0.02] font-display font-black text-6xl select-none">
                S{i+1}
              </div>

              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <ShieldZap className="size-3 text-primary" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/60">Execution Stage</span>
                </div>
                <CheckCircle2 className="size-4 text-primary opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
              </div>
              
              <p className="text-lg text-text/80 leading-relaxed font-medium relative z-10">
                {step}
              </p>
              
              {/* Completion Status Bar */}
              <div className="mt-6 h-px w-full bg-white/5 relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 2, delay: i * 0.2 }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/40 to-transparent"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentSteps;


