import React from 'react';
import { motion } from 'framer-motion';
import { dataset } from '../data/dataset';

const AgriStats = ({ lang }) => {
  const prices = dataset.marketPrices;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
      {/* Weather Widget */}
      <div className="glass-card p-4 flex items-center justify-between group overflow-hidden relative">
        <div className="absolute -right-4 -top-4 text-6xl opacity-10 group-hover:scale-110 transition-transform duration-700">☀️</div>
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Local Weather</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-white">28°C</span>
            <span className="text-xs text-text/60 mb-1">Clear Sky</span>
          </div>
          <div className="flex gap-4 mt-2">
            <div className="text-[9px] font-bold text-text/30 uppercase">💧 45% Hum.</div>
            <div className="text-[9px] font-bold text-text/30 uppercase">🌬️ 12km/h</div>
          </div>
        </div>
        <div className="text-4xl">🌤️</div>
      </div>

      {/* Market Prices Widget */}
      <div className="glass-card p-4 flex flex-col justify-between group">
        <div className="flex justify-between items-center mb-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Mandi Prices (KA)</p>
          <span className="text-[9px] font-bold text-text/20 uppercase tracking-widest">Live Updates</span>
        </div>
        <div className="space-y-2">
          {prices.slice(0, 3).map((item, i) => (
            <div key={i} className="flex justify-between items-center text-[10px] font-bold border-b border-white/5 pb-1 last:border-0">
              <span className="text-white/80">{item.crop[lang]}</span>
              <div className="flex items-center gap-2">
                <span className="text-white">{item.price.split(' - ')[0]}</span>
                <span className={item.trend === 'up' ? 'text-green-400' : item.trend === 'down' ? 'text-red-400' : 'text-text/20'}>
                  {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '•'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgriStats;
