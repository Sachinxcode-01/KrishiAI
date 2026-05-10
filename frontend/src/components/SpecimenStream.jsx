import React from 'react';
import { useHistory } from '../hooks/useHistory';
import { ShieldCheck, ArrowRight, Activity, Cpu } from 'lucide-react';

export default function SpecimenStream() {
  const { history, loading } = useHistory();
  
  // Last 6 items for a fuller feed
  const streamItems = history?.slice(0, 6) || [];

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-24 rounded-3xl bg-white/[0.02] border border-white/5" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 relative">
      {/* Absolute Perfection: Vertical Flow Line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)]/20 via-[var(--primary)]/5 to-transparent" />

      {streamItems.map((item, i) => (
        <div 
          key={i} 
          className="glass-panel p-5 flex items-start gap-6 group hover:bg-[var(--primary)]/[0.02] transition-all duration-500 border border-white/5 relative overflow-hidden"
        >
          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--primary)]/20 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none" />
          
          {/* Miniature Specimen with HUD Corners */}
          <div className="relative size-16 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-[var(--primary)]/30 transition-colors">
            <img 
              src={item.imageUrl || '/specimen.png'} 
              className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 grayscale-[0.3] group-hover:grayscale-0" 
              alt="Log" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* Corners */}
            <div className="absolute top-1 left-1 size-2 border-t border-l border-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-1 right-1 size-2 border-b border-r border-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="flex-1 min-w-0 py-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[0.5rem] font-black text-[var(--primary)] uppercase tracking-[0.2em] bg-[var(--primary)]/10 px-2 py-0.5 rounded">
                  ID: {item.id?.substring(0, 8) || 'UNK_SPEC'}
                </span>
                <div className="size-1 rounded-full bg-[var(--primary)] animate-pulse" />
              </div>
              <span className="font-mono text-[0.5rem] text-white/20 uppercase font-bold">
                {new Date(item.created_at || item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>

            <h4 className="font-display font-black text-xs text-white uppercase truncate tracking-tight mb-2 group-hover:text-[var(--primary)] transition-colors">
              {item.diseaseName}
            </h4>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Activity className="size-3 text-white/20" />
                <span className="font-mono text-[0.55rem] text-[var(--muted)] uppercase tracking-widest font-bold">
                  {item.cropName}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="size-3 text-white/20" />
                <span className="font-mono text-[0.55rem] text-white/20 uppercase font-bold">
                  97.4% ACC
                </span>
              </div>
            </div>
          </div>

          <div className="self-center flex items-center justify-center size-8 rounded-full bg-white/5 group-hover:bg-[var(--primary)]/20 transition-all">
            <ArrowRight className="size-3 text-white/20 group-hover:text-[var(--primary)] transition-colors" />
          </div>
        </div>
      ))}

      {streamItems.length === 0 && (
        <div className="p-12 text-center border border-dashed border-white/10 rounded-[2rem] bg-white/[0.01]">
          <div className="size-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Activity className="size-5 text-white/10" />
          </div>
          <p className="font-mono text-[0.6rem] text-white/20 uppercase tracking-[0.3em] font-bold">Awaiting_Neural_Input...</p>
        </div>
      )}
      
      <button 
        onClick={() => window.location.href = '/history'}
        className="w-full py-6 text-[0.65rem] font-mono font-black text-white/20 uppercase tracking-[0.5em] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all rounded-2xl mt-4 group"
      >
        <span className="group-hover:translate-x-2 transition-transform inline-block">Execute_Full_Archive_Query_</span>
      </button>
    </div>
  );
}
