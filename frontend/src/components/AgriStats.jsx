import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { dataset } from '../data/dataset';
import { getWeatherForecast } from '../utils/api';
import { Activity, Cloud, TrendingUp, Globe, Zap } from 'lucide-react';

const AgriStats = ({ lang }) => {
  const prices = dataset.marketPrices;
  const [isNvidiaActive, setIsNvidiaActive] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await getWeatherForecast();
        if (res.data.status === 'processing' || res.data.status === 'completed' || res.data.requestId) {
          setIsNvidiaActive(true);
        }
      } catch (err) {
        console.error('Weather fetch error:', err);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="relative group">
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-full group-hover:h-20 transition-all duration-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl lg:text-8xl font-display font-black leading-none text-white mb-4 italic tracking-tighter"
        >
          CORE <span className="text-primary">DATA</span> STREAM
        </motion.h2>
        <div className="flex items-center gap-4 ml-1">
          <Globe className="size-4 text-primary/40 animate-spin-slow" />
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">
            Tactical Intelligence Overlay • Node_Global_01
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Weather Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-8 group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-surface/20"
        >
          <div className="absolute inset-0 specimen-grid opacity-30" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 p-10 lg:p-14 flex flex-col justify-between h-full min-h-[400px]">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-primary animate-pulse" />
                  <p className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Atmospheric Telemetry</p>
                </div>
                <h3 className="text-[10vw] lg:text-9xl font-display font-black text-white leading-none tracking-tighter mt-4">
                  28<span className="text-primary/20 italic">°C</span>
                </h3>
              </div>
              <div className="text-right">
                <Cloud className="size-16 text-white/5" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="space-y-1">
                <p className="text-3xl font-display font-black text-white italic tracking-tighter">PHASE: CLEAR</p>
                <div className="flex items-center gap-2">
                  <Zap className="size-3 text-primary" />
                  <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">FourCastNet_V2_Simulation</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12 border-l border-white/10 pl-12">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-muted uppercase tracking-[0.4em]">Humidity</p>
                  <p className="text-4xl font-display font-black text-white">45<span className="text-lg text-primary/40">%</span></p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-muted uppercase tracking-[0.4em]">Velocity</p>
                  <p className="text-4xl font-display font-black text-white">12<span className="text-lg text-primary/40">km</span></p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mandi Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4"
        >
          <div className="card-premium h-full p-10 flex flex-col bg-surface/40 border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <TrendingUp className="size-5 text-primary" />
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Mkt_Flow</h4>
              </div>
              <div className="flex gap-1">
                <div className="size-1 rounded-full bg-primary/40" />
                <div className="size-1 rounded-full bg-primary" />
              </div>
            </div>

            <div className="space-y-10 flex-1">
              {prices.slice(0, 4).map((item, i) => (
                <div key={i} className="flex justify-between items-center group/item cursor-pointer">
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-muted uppercase tracking-[0.3em] group-hover/item:text-primary transition-colors">{item.crop[lang]}</p>
                    <p className="text-2xl font-display font-bold text-white tracking-tighter">₹{item.price.split(' - ')[0]}</p>
                  </div>
                  <div className={`px-3 py-1.5 rounded-lg text-[9px] font-black tracking-widest border ${
                    item.trend === 'up' 
                      ? 'bg-primary/5 border-primary/20 text-primary' 
                      : 'bg-red-500/5 border-red-500/20 text-red-500'
                  }`}>
                    {item.trend === 'up' ? '+4.2%' : '-1.8%'}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.5em] text-primary hover:text-white transition-all bg-white/5 hover:bg-primary/10 rounded-xl border border-white/5">
                EXCHANGE_CONSOLE
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AgriStats;
