import React, { useState, useEffect } from 'react';
import { Cloud, Sun, Droplets, Wind, Thermometer, Zap } from 'lucide-react';

export default function TacticalWeather() {
  const [weather, setWeather] = useState({
    temp: 28,
    humidity: 64,
    wind: 12,
    condition: 'Optimal',
    risk: 'Low'
  });

  // Mock real-time changes
  useEffect(() => {
    const interval = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        temp: prev.temp + (Math.random() > 0.5 ? 0.1 : -0.1),
        humidity: prev.humidity + (Math.random() > 0.5 ? 1 : -1)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-6 border border-white/5 relative overflow-hidden group">
      {/* HUD Background */}
      <div className="absolute inset-0 pixel-grid opacity-5" />
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Cloud className="size-16" />
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-[var(--primary)] animate-pulse" />
            <span className="text-tactical !text-white opacity-80">Local_Environment</span>
          </div>
          <span className="text-tactical !text-[0.5rem] opacity-40 italic">STATION_NX_4</span>
        </div>

        <div className="flex items-end gap-4">
          <span className="text-5xl font-display font-black text-white italic tracking-tighter leading-none">
            {weather.temp.toFixed(1)}°
          </span>
          <div className="pb-1">
            <span className="block text-[var(--primary)] font-mono text-[0.6rem] font-bold uppercase tracking-widest">
              {weather.condition}
            </span>
            <span className="block text-white/20 font-mono text-[0.5rem] uppercase">
              Growth_Index: High
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl flex items-center gap-3">
            <Droplets className="size-4 text-blue-400" />
            <div>
              <span className="block text-[0.5rem] text-white/30 uppercase font-bold tracking-widest">Humidity</span>
              <span className="block text-xs font-black text-white">{weather.humidity}%</span>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl flex items-center gap-3">
            <Wind className="size-4 text-[var(--primary)]" />
            <div>
              <span className="block text-[0.5rem] text-white/30 uppercase font-bold tracking-widest">Wind</span>
              <span className="block text-xs font-black text-white">{weather.wind} km/h</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-tactical !text-[0.5rem]">Infection_Risk_Vector</span>
            <span className="text-tactical !text-[0.5rem] !text-orange-400">{weather.risk}</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-[35%] bg-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.3)]" />
          </div>
        </div>
      </div>

      {/* Aesthetic Scan Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-scan" />
    </div>
  );
}
