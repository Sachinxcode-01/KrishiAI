import React from 'react';
import { motion } from 'framer-motion';
import { dataset } from '../data/dataset';

const AgriStats = ({ lang }) => {
  const prices = dataset.marketPrices;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Weather Intelligence Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="card-premium p-6 flex items-center justify-between group overflow-hidden relative"
      >
        <div className="absolute -right-8 -top-8 text-8xl opacity-5 group-hover:scale-125 transition-transform duration-1000 ease-out select-none">☀️</div>
        
        <div className="relative z-10 space-y-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Atmospheric Intelligence</p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-white tracking-tighter">28°C</span>
              <span className="text-xs font-bold text-muted mb-1.5 uppercase tracking-widest">Optimal Conditions</span>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <span className="text-primary text-xs">💧</span>
              <span className="text-[10px] font-black text-muted uppercase tracking-widest">45% Humidity</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary text-xs">🌬️</span>
              <span className="text-[10px] font-black text-muted uppercase tracking-widest">12 km/h NW</span>
            </div>
          </div>
        </div>
        
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-5xl drop-shadow-2xl relative z-10"
        >
          🌤️
        </motion.div>
      </motion.div>

      {/* Mandi Intelligence Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="card-premium p-6 flex flex-col group relative overflow-hidden"
      >
        <div className="flex justify-between items-center mb-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Mandi Intelligence (KA)</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] font-black text-muted uppercase tracking-widest">Real-time</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {prices.slice(0, 3).map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex justify-between items-center group/item"
            >
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-white/10 group-hover/item:bg-primary transition-colors" />
                <span className="text-[11px] font-black text-white/80 uppercase tracking-wider">{item.crop[lang]}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-black text-white font-mono tracking-tighter">₹{item.price.split(' - ')[0]}</span>
                <span className={`text-[10px] font-black ${item.trend === 'up' ? 'text-emerald-500' : item.trend === 'down' ? 'text-red-500' : 'text-muted/20'}`}>
                  {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '•'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </div>
  );
};

export default AgriStats;
