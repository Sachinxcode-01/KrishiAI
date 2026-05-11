import React from 'react';
import { translations } from '../utils/translations';
import { Pill, ShieldAlert, FlaskConical, Atom } from 'lucide-react';
import { motion } from 'framer-motion';

const MedicineCard = ({ lang, advice }) => {
  const t = translations[lang];

  return (
    <div className="relative overflow-hidden group">
      {/* Dynamic Background Element */}
      <div className="absolute -right-32 -top-32 w-80 h-80 bg-primary/10 blur-[120px] rounded-full group-hover:bg-primary/20 transition-all duration-1000" />
      
      <div className="card-premium relative bg-surface/10 border-white/5 space-y-8 md:space-y-10 p-6 md:p-10 overflow-hidden">
        {/* Technical Grid Accent */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="size-12 md:size-14 rounded-2xl md:rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <FlaskConical className="size-6 md:size-7" />
            </div>
            <div>
              <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">Pharmacology Advisory</h3>
              <p className="text-white font-display font-black text-xl md:text-2xl tracking-tighter italic">{t.medicine}</p>
            </div>
          </div>
          <div className="size-10 md:size-12 rounded-full border border-white/10 flex items-center justify-center hidden sm:flex">
            <Atom className="size-4 md:size-5 text-primary/40 animate-spin-slow" />
          </div>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-primary/5 border border-primary/10 relative backdrop-blur-md overflow-hidden group-hover:border-primary/30 transition-colors"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <p className="text-base md:text-lg font-bold text-white leading-relaxed relative z-10 italic">
            "{advice}"
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted relative z-10">
          <div className="flex items-center gap-2">
            <div className="size-1.5 md:size-2 rounded-full bg-primary" />
            <span>Bio-Validation Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-1.5 md:size-2 rounded-full bg-primary" />
            <span>Field Analysis 01</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-2.5 md:size-3 text-primary/60" />
            <span>Regulated Protocol</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;


