import React, { useState } from 'react';
import ImageCapture from '../components/ImageCapture';
import AnalyzeButton from '../components/AnalyzeButton';
import LoadingScreen from '../components/LoadingScreen';
import ResultCard from '../components/ResultCard';
import ErrorScreen from '../components/ErrorScreen';
import CropQuiz from '../components/CropQuiz';
import ChatBot from '../components/ChatBot';
import AgriStats from '../components/AgriStats';
import { useAnalyze } from '../hooks/useAnalyze';
import { translations } from '../utils/translations';

const Home = ({ lang }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('');
  const { analyze, loading, loadingStep, result, error, setResult } = useAnalyze();
  const t = translations[lang];

  const handleCapture = (image) => {
    setSelectedImage(image);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setResult(null);
  };

  const onAnalyze = () => {
    if (selectedImage) {
      analyze(selectedImage, description);
    }
  };

  return (
    <div className="pt-24 px-6 pb-32">
      {/* Dynamic Status Bar */}
      <div className="flex items-center justify-between mb-8 px-1 lg:max-w-4xl lg:mx-auto">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live AI Active</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[10px] font-bold text-text/20 uppercase tracking-widest">Global Agricultural Node • 01</span>
          <span className="text-[10px] font-medium text-text/30">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {loading && <LoadingScreen lang={lang} step={loadingStep} />}

      {!result && !error && (
        <div className="grid lg:grid-cols-12 gap-8 lg:max-w-6xl lg:mx-auto items-start">
          
          {/* Main Action Area (Left/Center) */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in">
            {/* Added AgriStats here */}
            <AgriStats lang={lang} />

            <ImageCapture 
              lang={lang} 
              onCapture={handleCapture} 
              onClear={handleClear} 
            />
            
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text/40 px-1">
                {lang === 'en' ? 'Describe the problem (Optional)' : 'ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ (ಐಚ್ಛಿಕ)'}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={lang === 'en' ? "e.g. Yellow spots on rice leaf..." : "ಉದಾ: ಭತ್ತದ ಎಲೆಯ ಮೇಲೆ ಹಳದಿ ಚುಕ್ಕೆಗಳು..."}
                className="w-full bg-surface/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-text/20 focus:outline-none focus:border-primary/30 transition-all resize-none h-24 lg:h-32"
              />
            </div>

            <AnalyzeButton 
              lang={lang} 
              onClick={onAnalyze} 
              disabled={!selectedImage} 
              loading={loading}
            />

            {/* Mobile-only spacing */}
            <div className="lg:hidden h-4"></div>
          </div>

          {/* Info & Engagement Area (Right Side on Desktop) */}
          <div className="lg:col-span-5 space-y-8 animate-fade-in-up">
            
            {/* Process Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary px-1">{t.howItWorks}</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { icon: '📸', text: t.step1, title: lang === 'en' ? 'Capture' : 'ಫೋಟೋ' },
                  { icon: '🔬', text: t.step2, title: lang === 'en' ? 'Analysis' : 'ವಿಶ್ಲೇಷಣೆ' },
                  { icon: '💊', text: t.step3, title: lang === 'en' ? 'Remedy' : 'ಪರಿಹಾರ' }
                ].map((step, i) => (
                  <div key={i} className="glass-card p-4 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                    <span className="text-2xl w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">{step.icon}</span>
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase text-text/30 tracking-widest mb-1">{step.title}</p>
                      <p className="text-xs text-text/80 font-medium leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary px-1">{t.whyUse}</h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: '⚡', title: t.benefit1, desc: lang === 'en' ? 'Real-time diagnosis via advanced Vision AI' : 'ಸುಧಾರಿತ AI ಮೂಲಕ ರೋಗ ಪತ್ತೆ' },
                  { icon: '💬', title: t.benefit2, desc: lang === 'en' ? 'Native support for rural connectivity' : 'ಗ್ರಾಮೀಣ ಭಾಗದವರಿಗೆ ಸುಲಭ ಬಳಕೆ' },
                  { icon: '🌿', title: t.benefit3, desc: lang === 'en' ? 'Verified treatments from agricultural experts' : 'ತಜ್ಞರಿಂದ ಧೃಢೀಕರಿಸಲ್ಪಟ್ಟ ಚಿಕಿತ್ಸೆಗಳು' }
                ].map((b, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white/[0.03] border border-white/5 p-5 rounded-3xl hover:border-primary/20 transition-all group">
                    <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{b.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-text/90 mb-1">{b.title}</h4>
                      <p className="text-[10px] text-text/40 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <CropQuiz lang={lang} />
          </div>
        </div>
      )}

      {error && (
        <ErrorScreen 
          lang={lang} 
          message={error} 
          onRetry={() => analyze(selectedImage, description)} 
        />
      )}

      {result && (
        <div className="lg:max-w-4xl lg:mx-auto">
          <ResultCard 
            lang={lang} 
            data={result} 
            onReset={handleClear} 
          />
          {/* Chatbot appears when a result is available */}
          <ChatBot lang={lang} context={result} />
        </div>
      )}

      <div className="pt-20 pb-12 text-center border-t border-white/5 mt-12">
        <p className="text-[9px] text-text/10 uppercase tracking-[0.5em] font-black">Krishi AI Global Node • Secure Processing Active</p>
      </div>
    </div>
  );
};

export default Home;
