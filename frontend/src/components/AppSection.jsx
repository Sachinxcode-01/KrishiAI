import { useAnalyze } from '../hooks/useAnalyze';
import UploadPanel from './UploadPanel';
import AnalysisProgress from './AnalysisProgress';
import SpecimenStream from './SpecimenStream';
import { Sparkles, ShieldCheck, Activity } from 'lucide-react';

export default function AppSection() {
  const { analyzeCrop, analyzing, result, error, currentImage, resetAnalysis } = useAnalyze();

  return (
    <section id="detect" className="py-40 px-[6%] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[600px] bg-[var(--primary)]/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-28">
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 mb-6 md:mb-8 animate-fade-in">
            <div className="size-4 rounded-sm overflow-hidden">
              <img src="/krishiAI.png" alt="Krishi AI" className="w-full h-full object-contain" />
            </div>
            <span className="font-mono text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.4em] text-[var(--primary)] uppercase">
              Vision_Neural_Network_v5.0
            </span>
          </div>
          
          <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter italic mb-6 md:mb-8 leading-[0.9] px-4">
            EXPERT <span className="text-[var(--primary)] text-stroke">DIAGNOSIS</span>
          </h2>
          
          <p className="font-sans text-[var(--muted)] text-base md:text-xl max-w-2xl leading-relaxed">
            Upload a high-resolution specimen for real-time autonomous analysis and precision treatment protocols.
          </p>
        </div>

        {/* Core Interaction Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 min-h-[600px]">
          {/* Left: Tactical Stream (Sidebar) */}
          <div className="lg:col-span-3 space-y-6 hidden lg:block">
            <div className="flex items-center gap-3 mb-8">
              <Activity className="size-4 text-[var(--primary)] animate-pulse" />
              <span className="font-mono text-[0.65rem] font-bold tracking-[0.4em] text-white/40 uppercase">Neural_Specimen_Stream</span>
            </div>
            
            <SpecimenStream />
          </div>

          {/* Right: Primary Interaction Area */}
          <div className="lg:col-span-9 relative">
            {!result && !analyzing && !error ? (
              <UploadPanel onAnalyze={analyzeCrop} analyzing={analyzing} />
            ) : (
              <AnalysisProgress 
                analyzing={analyzing} 
                result={result} 
                error={error} 
                image={currentImage}
                onReset={resetAnalysis} 
              />
            )}
          </div>
        </div>

        {/* Enterprise Security Registry */}
        <div className="mt-32 pt-20 border-t border-white/5 flex flex-col items-center gap-10">
          <div className="flex items-center gap-4 text-white/30">
            <ShieldCheck className="size-5" />
            <span className="font-mono text-[0.7rem] font-bold tracking-[0.5em] uppercase">Enterprise-Grade Security Protocol</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 items-center opacity-30 group-hover:opacity-100 transition-opacity px-6">
            <span className="text-white font-black text-xl md:text-2xl italic tracking-tighter hover:text-[var(--primary)] transition-colors cursor-default">GEMINI-1.5</span>
            <span className="text-white font-black text-xl md:text-2xl italic tracking-tighter hover:text-[var(--primary)] transition-colors cursor-default">FIREBASE-CLOUD</span>
            <span className="text-white font-black text-xl md:text-2xl italic tracking-tighter hover:text-[var(--primary)] transition-colors cursor-default">NVIDIA-NIM</span>
            <span className="text-white font-black text-xl md:text-2xl italic tracking-tighter hover:text-[var(--primary)] transition-colors cursor-default">VITE-ENGINE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
