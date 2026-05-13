import { useState, useEffect } from 'react';
import { Brain, Cpu, Database, CheckCircle, Zap, ShieldCheck, Activity } from 'lucide-react';
import ResultCard from './ResultCard';

export default function AnalysisProgress({ analyzing, result, error, image, onReset, lang }) {
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    { 
      icon: Cpu, 
      text: lang === 'en' ? 'Neural Pattern Scan' : 'ನರಗಳ ವಿನ್ಯಾಸ ಸ್ಕ್ಯಾನ್', 
      sub: lang === 'en' ? 'Initializing bio-signature verification...' : 'ಜೈವಿಕ ಸಹಿ ಪರಿಶೀಲನೆ ಪ್ರಾರಂಭಿಸಲಾಗುತ್ತಿದೆ...' 
    },
    { 
      icon: Brain, 
      text: lang === 'en' ? 'Claude Vision v3.5' : 'ಕ್ಲೌಡ್ ವಿಷನ್ v3.5', 
      sub: lang === 'en' ? 'Cross-referencing disease markers...' : 'ರೋಗದ ಗುರುತುಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...' 
    },
    { 
      icon: Database, 
      text: lang === 'en' ? 'Advisor Engine' : 'ಸಲಹೆಗಾರ ಎಂಜಿನ್', 
      sub: lang === 'en' ? 'Synthesizing agricultural protocol...' : 'ಕೃಷಿ ಪ್ರೋಟೋಕಾಲ್ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...' 
    },
  ];

  useEffect(() => {
    if (analyzing) {
      setLoadingStep(0);
      const interval = setInterval(() => {
        setLoadingStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [analyzing]);

  if (error) {
    return (
      <div className="glass-panel p-8 md:p-20 flex flex-col items-center text-center max-w-2xl mx-auto border-red-500/20 bg-red-500/5 backdrop-blur-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1),transparent)]" />
        <div className="size-16 md:size-24 bg-red-500/10 rounded-3xl flex items-center justify-center mb-6 md:mb-8 border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
          <Zap className="size-8 md:size-10 text-red-500" />
        </div>
        <h3 className="font-display font-black text-2xl md:text-4xl text-white uppercase tracking-tighter mb-4 italic">
          {lang === 'en' ? 'Analysis Interrupted' : 'ವಿಶ್ಲೇಷಣೆ ಅಡಚಣೆಗೊಂಡಿದೆ'}
        </h3>
        <p className="font-sans text-[var(--muted)] text-base md:text-xl mb-8 md:12 max-w-md">{error}</p>
        <button onClick={onReset} className="btn-premium flex items-center gap-3 !px-8 md:!px-12 text-xs md:text-sm">
          <Activity className="size-4" /> {lang === 'en' ? 'Restart Protocol' : 'ಪ್ರೋಟೋಕಾಲ್ ಮರುಪ್ರಾರಂಭಿಸಿ'}
        </button>
      </div>
    );
  }

  if (analyzing) {
    return (
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in relative">
        {/* Left: Holographic Specimen Scan */}
        <div className="glass-panel p-4 aspect-square relative overflow-hidden group">
          <div className="absolute inset-0 z-10 specimen-grid opacity-20 pointer-events-none" />
          
          {/* Animated Scan Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_20px_#10b981] z-20 animate-scan" />
          
          {/* Tactical Corners */}
          <div className="absolute top-4 left-4 size-8 border-t-2 border-l-2 border-primary/40 z-20" />
          <div className="absolute top-4 right-4 size-8 border-t-2 border-r-2 border-primary/40 z-20" />
          <div className="absolute bottom-4 left-4 size-8 border-b-2 border-l-2 border-primary/40 z-20" />
          <div className="absolute bottom-4 right-4 size-8 border-b-2 border-r-2 border-primary/40 z-20" />

          {/* Coordinate HUD */}
          <div className="absolute top-8 left-8 z-30 space-y-1">
            <p className="text-[7px] font-black text-primary/60 uppercase tracking-[0.3em]">SEC_COORD_X: 44.129</p>
            <p className="text-[7px] font-black text-primary/60 uppercase tracking-[0.3em]">SEC_COORD_Y: 12.091</p>
          </div>

          <img 
            src={image} 
            alt="Specimen" 
            className="w-full h-full object-cover grayscale opacity-50 contrast-125"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        </div>

        {/* Right: Neural Processing HUD */}
        <div className="glass-panel p-6 md:p-16 flex flex-col justify-center relative overflow-hidden min-h-[400px]">
          <div className="absolute inset-0 scanner-glow pointer-events-none opacity-20" />
          
          <div className="relative size-24 md:size-32 mb-8 md:12 mx-auto">
            <div className="absolute inset-0 border-2 border-[var(--primary)]/20 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-12 md:size-16 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center border border-[var(--primary)]/30">
                {(() => {
                  const StepIcon = steps[loadingStep].icon;
                  return <StepIcon className="size-6 md:size-8 text-[var(--primary)] animate-pulse" />;
                })()}
              </div>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="size-1.5 md:size-2 rounded-full bg-[var(--primary)] animate-ping" />
              <h3 className="font-display font-black text-xl md:text-3xl text-white uppercase tracking-tighter italic">
                {steps[loadingStep].text}
              </h3>
            </div>
            <p className="font-mono text-[var(--muted)] font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-[0.5rem] md:text-[0.6rem]">
              {steps[loadingStep].sub}
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 mt-16 w-full">
            <div className="flex gap-4 w-full">
              {steps.map((_, i) => (
                <div key={i} className="flex-1 space-y-3">
                  <div 
                    className={`h-1 rounded-full transition-all duration-1000 ${
                      i <= loadingStep ? 'bg-[var(--primary)] shadow-[0_0_15px_var(--primary)]' : 'bg-white/5'
                    }`} 
                  />
                  <div className={`text-[0.55rem] font-mono font-bold tracking-widest uppercase text-center ${i <= loadingStep ? 'text-[var(--primary)]' : 'text-white/10'}`}>
                    L_0{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-4 text-white/20">
            <ShieldCheck className="size-4" />
            <span className="text-[0.6rem] font-mono font-bold uppercase tracking-[0.4em]">Specimen_Validated // Secure_Link</span>
          </div>
        </div>
      </div>
    );
  }

  if (result) {
    return <ResultCard result={result} onReset={onReset} lang={lang} />;
  }

  return null;
}
