import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageCapture from '../components/ImageCapture';
import AnalyzeButton from '../components/AnalyzeButton';
import LoadingScreen from '../components/LoadingScreen';
import ResultCard from '../components/ResultCard';
import ErrorScreen from '../components/ErrorScreen';
import CropQuiz from '../components/CropQuiz';
import ChatBot from '../components/ChatBot';
import AgriStats from '../components/AgriStats';
import { useInference } from '../hooks/useInference';
import { translations } from '../utils/translations';

const Home = ({ lang }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const { analyze, loading, loadingStep, result, error, setResult } = useInference();
  const t = translations[lang];

  const handleCapture = (image) => {
    setSelectedImage(image);
    // Get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.warn("Location capture failed", err)
      );
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setResult(null);
    setLocation(null);
  };

  const onAnalyze = () => {
    if (selectedImage) {
      analyze(selectedImage, description, location);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="pt-24 px-4 pb-32"
    >
      {/* Dynamic Status Bar */}
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-8 px-2 lg:max-w-4xl lg:mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live AI Active</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline text-[10px] font-bold text-muted uppercase tracking-widest">Global Node • 01</span>
          <span className="text-[10px] font-medium text-muted/60">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </motion.div>

      <AnimatePresence>
        {loading && <LoadingScreen lang={lang} step={loadingStep} />}
      </AnimatePresence>

      {!result && !error && (
        <div className="grid lg:grid-cols-12 gap-8 lg:max-w-6xl lg:mx-auto items-start">
          
          {/* Main Action Area */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-8">
            <AgriStats lang={lang} />

            <div className="card-premium">
              <ImageCapture 
                lang={lang} 
                onCapture={handleCapture} 
                onClear={handleClear} 
              />
              
              <div className="space-y-4 mt-8">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted px-1">
                  {lang === 'en' ? 'Describe the problem (Optional)' : 'ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ (ಐಚ್ಛಿಕ)'}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={lang === 'en' ? "e.g. Yellow spots on rice leaf..." : "ಉದಾ: ಭತ್ತದ ಎಲೆಯ ಮೇಲೆ ಹಳದಿ ಚುಕ್ಕೆಗಳು..."}
                  className="w-full bg-surface border border-white/5 rounded-2xl p-5 text-sm text-white 
                             placeholder:text-muted/30 focus:outline-none focus:border-primary/50 
                             transition-all resize-none h-28 lg:h-36 shadow-inner"
                />
              </div>

              <div className="mt-8">
                <AnalyzeButton 
                  lang={lang} 
                  onClick={onAnalyze} 
                  disabled={!selectedImage} 
                  loading={loading}
                />
              </div>
            </div>
          </motion.div>

          {/* Info & Engagement Area */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-8">
            {/* Process Section */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">{t.howItWorks}</h3>
              <div className="space-y-4">
                {[
                  { icon: '📸', text: t.step1, title: lang === 'en' ? 'Capture' : 'ಫೋಟೋ' },
                  { icon: '🔬', text: t.step2, title: lang === 'en' ? 'Analysis' : 'ವಿಶ್ಲೇಷಣೆ' },
                  { icon: '💊', text: t.step3, title: lang === 'en' ? 'Remedy' : 'ಪರಿಹಾರ' }
                ].map((step, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.02 }}
                    className="card-premium p-4 flex items-center gap-5"
                  >
                    <span className="text-2xl w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                      {step.icon}
                    </span>
                    <div>
                      <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">{step.title}</p>
                      <p className="text-[13px] text-text/80 font-medium leading-relaxed">{step.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">{t.whyUse}</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: '⚡', title: t.benefit1, desc: lang === 'en' ? 'Real-time diagnosis via advanced Vision AI' : 'ಸುಧಾರಿತ AI ಮೂಲಕ ರೋಗ ಪತ್ತೆ' },
                  { icon: '💬', title: t.benefit2, desc: lang === 'en' ? 'Native support for rural connectivity' : 'ಗ್ರಾಮೀಣ ಭಾಗದವರಿಗೆ ಸುಲಭ ಬಳಕೆ' },
                  { icon: '🌿', title: t.benefit3, desc: lang === 'en' ? 'Verified treatments from agricultural experts' : 'ತಜ್ಞರಿಂದ ಧೃಢೀಕರಿಸಲ್ಪಟ್ಟ ಚಿಕಿತ್ಸೆಗಳು' }
                ].map((b, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.02, borderColor: 'rgba(16,185,129,0.3)' }}
                    className="flex items-start gap-5 bg-white/[0.02] border border-white/5 p-6 rounded-3xl transition-colors group"
                  >
                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">{b.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-text/90 mb-1">{b.title}</h4>
                      <p className="text-[11px] text-muted leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <CropQuiz lang={lang} />
          </motion.div>
        </div>
      )}

      {error && (
        <AnimatePresence>
          <ErrorScreen 
            lang={lang} 
            message={error} 
            onRetry={() => analyze(selectedImage, description)} 
          />
        </AnimatePresence>
      )}

      {result && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="lg:max-w-4xl lg:mx-auto"
        >
          <ResultCard 
            lang={lang} 
            data={result} 
            onReset={handleClear} 
          />
          <ChatBot lang={lang} context={result} />
        </motion.div>
      )}

      <motion.div 
        variants={itemVariants}
        className="pt-20 pb-12 text-center border-t border-white/5 mt-20"
      >
        <p className="text-[10px] text-muted/30 uppercase tracking-[0.5em] font-black">
          Krishi AI Global Node • Secure Processing Active
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Home;
