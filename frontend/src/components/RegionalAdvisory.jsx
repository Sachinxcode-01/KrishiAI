import React from 'react';
import { useHistory } from '../hooks/useHistory';
import { AlertCircle, TrendingUp, MapPin, Zap } from 'lucide-react';

export default function RegionalAdvisory({ lang }) {
  const { history, loading } = useHistory();
  
  // Get unique latest threats (last 3)
  const latestThreats = history?.slice(0, 3) || [];

  return (
    <section className="py-32 px-[6%] relative bg-[#020B06]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.05),transparent)]" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Intelligence Header */}
          <div className="lg:w-1/3">
            <div className="flex items-center gap-3 text-[var(--primary)] mb-6">
              <Zap className="size-4 md:size-5 animate-pulse" />
              <span className="font-mono text-[0.6rem] md:text-xs font-bold tracking-[0.4em] uppercase">
                {lang === 'en' ? 'Live_Threat_Intelligence' : 'ಲೈವ್_ಥ್ರೆಟ್_ಇಂಟೆಲಿಜೆನ್ಸ್'}
              </span>
            </div>
            
            <h2 className={`text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter italic mb-6 md:mb-8 leading-tight ${lang === 'kn' ? 'font-kannada' : ''}`}>
              {lang === 'en' ? (
                <>REGIONAL <span className="text-[var(--primary)]">ADVISORY</span></>
              ) : (
                <><span className="text-[var(--primary)]">ಪ್ರಾದೇಶಿಕ</span> ಸಲಹೆಗಳು</>
              )}
            </h2>
            
            <p className={`text-[var(--muted)] text-base md:text-lg mb-8 md:mb-10 leading-relaxed text-neat full-text ${lang === 'kn' ? 'font-kannada' : 'font-sans'}`}>
              {lang === 'en' 
                ? 'Real-time synchronization with historical diagnostic data across Karnataka. Stay informed about emerging localized outbreaks.'
                : 'ಕರ್ನಾಟಕದಾದ್ಯಂತ ಐತಿಹಾಸಿಕ ರೋಗನಿರ್ಣಯ ಡೇಟಾದೊಂದಿಗೆ ನೈಜ-ಸಮಯದ ಸಿಂಕ್ರೊನೈಸೇಶನ್. ಉದಯೋನ್ಮುಖ ಸ್ಥಳೀಯ ಏಕಾಏಕಿ ರೋಗಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.'
              }
            </p>

            <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl mb-10 lg:mb-0">
              <div className="flex items-center gap-4 mb-4">
                <div className="size-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <TrendingUp className="size-5 text-orange-500" />
                </div>
                <div>
                  <h4 className={`text-white font-bold uppercase text-xs tracking-widest ${lang === 'kn' ? 'font-kannada' : ''}`}>
                    {lang === 'en' ? 'Infection Trend' : 'ಸೋಂಕಿನ ಪ್ರವೃತ್ತಿ'}
                  </h4>
                  <p className="text-[var(--muted)] text-[0.65rem] font-mono">
                    {lang === 'en' ? 'Moderate Activity Detected' : 'ಮಧ್ಯಮ ಮಟ್ಟದ ಚಟುವಟಿಕೆ ಪತ್ತೆಯಾಗಿದೆ'}
                  </p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-orange-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Threat Matrix */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-48 rounded-3xl bg-white/5 animate-pulse" />
              ))
            ) : latestThreats.length > 0 ? (
              latestThreats.map((threat, index) => (
                <div 
                  key={index} 
                  className="glass-panel p-8 group hover:border-[var(--primary)]/50 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <AlertCircle className="size-20" />
                  </div>
                  
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="size-2 rounded-full bg-red-500 animate-ping" />
                      <span className="font-mono text-[0.6rem] font-bold text-red-500 uppercase tracking-widest">
                        {lang === 'en' ? 'Alert_Level_High' : 'ಹೆಚ್ಚಿನ_ಎಚ್ಚರಿಕೆ_ಮಟ್ಟ'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white/30 text-[0.6rem] font-mono">
                      <MapPin className="size-3" />
                      <span>{lang === 'en' ? 'KARNATAKA_REGION' : 'ಕರ್ನಾಟಕ_ಪ್ರದೇಶ'}</span>
                    </div>
                  </div>

                  <h3 className={`text-2xl font-display font-bold text-white uppercase tracking-tight mb-2 ${lang === 'kn' ? 'font-kannada text-xl' : ''}`}>
                    {lang === 'en' ? threat.diseaseName : (threat.diseaseNameKannada || threat.diseaseName)}
                  </h3>
                  <p className={`text-[var(--muted)] text-sm mb-6 text-neat full-text ${lang === 'kn' ? 'font-kannada text-xs' : ''}`}>
                    {lang === 'en' ? threat.description : (threat.descriptionKannada || threat.description)}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <span className="text-[var(--primary)] font-mono text-[0.6rem] font-bold uppercase tracking-widest">
                      {lang === 'en' ? `${threat.cropName} Specimen` : `${threat.cropNameKannada || threat.cropName} ಮಾದರಿ`}
                    </span>
                    <button className="text-white/40 group-hover:text-[var(--primary)] transition-colors">
                      <AlertCircle className="size-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 glass-panel p-12 text-center border-dashed border-white/10">
                <p className={`text-[var(--muted)] font-mono text-xs uppercase tracking-widest ${lang === 'kn' ? 'font-kannada' : ''}`}>
                  {lang === 'en' ? 'No critical outbreaks detected in recent surveillance cycles.' : 'ಇತ್ತೀಚಿನ ಕಣ್ಗಾವಲು ಚಕ್ರಗಳಲ್ಲಿ ಯಾವುದೇ ಗಂಭೀರ ಕಾಯಿಲೆಗಳು ಪತ್ತೆಯಾಗಿಲ್ಲ.'}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
