import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Cpu, 
  Globe, 
  Users, 
  Zap, 
  Leaf, 
  Database, 
  Network,
  ArrowRight,
  ExternalLink
} from "lucide-react";

const About = ({ lang }) => {
  const stats = [
    { label: lang === 'en' ? 'Processing Core' : 'ಸಂಸ್ಕರಣಾ ಕೋರ್', value: 'Neural_v5', icon: Cpu },
    { label: lang === 'en' ? 'Network Nodes' : 'ನೆಟ್‌ವರ್ಕ್ ನೋಡ್‌ಗಳು', value: '128+ KVKs', icon: Network },
    { label: lang === 'en' ? 'Latency' : 'ವಿಳಂಬ', value: '< 2.4s', icon: Zap },
    { label: lang === 'en' ? 'Data Precision' : 'ಡೇಟಾ ನಿಖರತೆ', value: '99.2%', icon: Database },
  ];

  const mission = lang === 'en' 
    ? 'Krishi AI is an advanced agricultural intelligence matrix designed to empower the heart of India: its farmers. By fusing neural disease detection with real-time geospatial surveillance, we provide a tactical shield against crop failure.'
    : 'ಕೃಷಿ AI ಎನ್ನುವುದು ಸುಧಾರಿತ ಕೃಷಿ ಬುದ್ಧಿವಂತಿಕೆಯ ಮ್ಯಾಟ್ರಿಕ್ಸ್ ಆಗಿದ್ದು, ಭಾರತದ ಹೃದಯಭಾಗವಾದ ರೈತರನ್ನು ಸಬಲಗೊಳಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ನರಮಂಡಲದ ಕಾಯಿಲೆ ಪತ್ತೆಹಚ್ಚುವಿಕೆಯನ್ನು ನೈಜ-ಸಮಯದ ಭೌಗೋಳಿಕ ಕಣ್ಗಾವಲಿನೊಂದಿಗೆ ಬೆಸೆಯುವ ಮೂಲಕ, ನಾವು ಬೆಳೆ ವೈಫಲ್ಯದ ವಿರುದ್ಧ ರಕ್ಷಣಾತ್ಮಕ ಗುರಾಣಿಯನ್ನು ಒದಗಿಸುತ್ತೇವೆ.';

  const techItems = [
    { title: lang === 'en' ? 'Computer Vision' : 'ಕಂಪ್ಯೂಟರ್ ವಿಷನ್', desc: lang === 'en' ? 'Custom EfficientNet models optimized for crop leaf morphology.' : 'ಬೆಳೆ ಎಲೆಯ ರೂಪವಿಜ್ಞಾನಕ್ಕಾಗಿ ಆಪ್ಟಿಮೈಸ್ ಮಾಡಲಾದ ಕಸ್ಟಮ್ EfficientNet ಮಾದರಿಗಳು.', icon: Leaf },
    { title: lang === 'en' ? 'Neural Engine' : 'ನ್ಯೂರಲ್ ಇಂಜಿನ್', desc: lang === 'en' ? 'Distributed inference nodes running on Gemini 1.5 Pro architecture.' : 'ಜೆಮಿನಿ 1.5 ಪ್ರೊ ಆರ್ಕಿಟೆಕ್ಚರ್‌ನಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ವಿತರಿಸಿದ ಇನ್ಫರೆನ್ಸ್ ನೋಡ್‌ಗಳು.', icon: Zap },
    { title: lang === 'en' ? 'Geospatial Grid' : 'ಭೌಗೋಳಿಕ ಗ್ರಿಡ್', desc: lang === 'en' ? 'Real-time outbreak mapping via satellite coordinate projection.' : 'ಉಪಗ್ರಹ ನಿರ್ದೇಶಾಂಕ ಪ್ರಕ್ಷೇಪಣದ ಮೂಲಕ ನೈಜ-ಸಮಯದ ರೋಗ ಹರಡುವಿಕೆಯ ನಕ್ಷೆ.', icon: Globe },
    { title: lang === 'en' ? 'Secure Vault' : 'ಸುರಕ್ಷಿತ ವಾಲ್ಟ್', desc: lang === 'en' ? 'Military-grade encryption for all regional diagnostic records.' : 'ಎಲ್ಲಾ ಪ್ರಾದೇಶಿಕ ರೋಗನಿರ್ಣಯ ದಾಖಲೆಗಳಿಗಾಗಿ ಮಿಲಿಟರಿ ದರ್ಜೆಯ ಎನ್‌ಕ್ರಿಪ್ಶನ್.', icon: Shield }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 md:pt-32 lg:pt-48 px-4 md:px-6 pb-20 md:pb-40 max-w-7xl mx-auto min-h-screen relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 size-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Header Section */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16 md:mb-32 items-center">
        <div className="space-y-6 md:space-y-8">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4"
          >
            <div className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_15px_#10b981]" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em] text-primary/80 italic">
              System_Manifesto_v1.0
            </span>
          </motion.div>
          
          <h1 className={`text-4xl md:text-6xl lg:text-8xl font-display font-black tracking-tighter italic leading-[0.8] uppercase ${lang === 'kn' ? 'font-kannada' : ''}`}>
            {lang === 'en' ? (
              <>
                <span className="text-white block">Digital</span>
                <span className="text-primary block">Agronomy</span>
              </>
            ) : (
              <>
                <span className="text-white block">ಡಿಜಿಟಲ್</span>
                <span className="text-primary block">ಕೃಷಿಶಾಸ್ತ್ರ</span>
              </>
            )}
          </h1>
          
          <p className={`text-white/60 text-base md:text-lg lg:text-xl font-medium text-neat full-text italic ${lang === 'kn' ? 'font-kannada' : ''}`}>
            {mission}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-6 md:pt-8">
            <button className="btn-premium btn-premium-primary group w-full sm:w-auto">
              <Shield className="mr-3 size-5 text-black" />
              <span className="text-black font-bold uppercase tracking-widest text-[10px]">{lang === 'en' ? 'Read Protocol' : 'ಪ್ರೋಟೋಕಾಲ್ ಓದಿ'}</span>
              <ArrowRight className="ml-3 size-4 text-black group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
              <Globe className="size-4 text-primary" />
              {lang === 'en' ? 'Regional Impact' : 'ಪ್ರಾದೇಶಿಕ ಪರಿಣಾಮ'}
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-20" />
          <div className="grid grid-cols-2 gap-4 relative">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="card-premium p-8 bg-surface/20 border-white/5 space-y-4 hover:border-primary/30 transition-all group"
              >
                <stat.icon className="size-6 text-primary/40 group-hover:text-primary transition-colors" />
                <div>
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">{stat.label}</p>
                  <p className="text-2xl font-display font-black text-white italic tracking-tighter mt-1">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Tech Stack Section */}
      <div className="mt-20 md:mt-40 pt-16 md:pt-24 border-t border-white/5">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 md:gap-12 mb-12 md:mb-20">
          <div>
            <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.8em] text-primary italic mb-3">Technology_Stack</h2>
            <p className={`text-2xl md:text-4xl lg:text-5xl font-display font-black text-white italic tracking-tighter uppercase leading-tight ${lang === 'kn' ? 'font-kannada' : ''}`}>
              {lang === 'en' ? 'Fusing Neural Intelligence with Earth Science' : 'ನರಮಂಡಲದ ಬುದ್ಧಿವಂತಿಕೆಯನ್ನು ಭೂ ವಿಜ್ಞಾನದೊಂದಿಗೆ ಬೆಸೆಯುವುದು'}
            </p>
          </div>
          <p className={`text-white/40 text-xs md:text-sm font-medium max-w-md text-neat full-text italic ${lang === 'kn' ? 'font-kannada' : ''}`}>
            {lang === 'en' 
              ? 'Our infrastructure leverages the latest advancements in distributed computing and deep learning to deliver millisecond-accurate diagnoses in the most remote agricultural sectors.'
              : 'ನಮ್ಮ ಮೂಲಸೌಕರ್ಯವು ಅತ್ಯಂತ ದೂರದ ಕೃಷಿ ವಲಯಗಳಲ್ಲಿ ಮಿಲಿಸೆಕೆಂಡ್-ನಿಖರವಾದ ರೋಗನಿರ್ಣಯಗಳನ್ನು ನೀಡಲು ವಿತರಿಸಿದ ಕಂಪ್ಯೂಟಿಂಗ್ ಮತ್ತು ಆಳವಾದ ಕಲಿಕೆಯ ಇತ್ತೀಚಿನ ಪ್ರಗತಿಯನ್ನು ಬಳಸಿಕೊಳ್ಳುತ್ತದೆ.'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {techItems.map((tech, i) => (
            <div key={i} className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-black/40 border border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
              <tech.icon className="size-6 md:size-8 text-primary/40 mb-6 md:mb-8 group-hover:scale-110 transition-transform" />
              <h3 className={`text-base md:text-lg font-display font-black text-white uppercase italic tracking-tighter mb-3 md:mb-4 group-hover:text-primary transition-colors ${lang === 'kn' ? 'font-kannada' : ''}`}>{tech.title}</h3>
              <p className={`text-[11px] md:text-[12px] text-white/40 font-medium tracking-wider text-neat full-text ${lang === 'kn' ? 'font-kannada' : ''}`}>{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Social Impact / Karnataka Focus */}
      <div className="mt-40 p-12 lg:p-24 rounded-[4rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 specimen-grid opacity-10" />
        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="size-16 rounded-3xl bg-primary flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
              <Users className="size-8 text-black" />
            </div>
            <h2 className={`text-4xl lg:text-6xl font-display font-black text-white italic tracking-tighter uppercase leading-none ${lang === 'kn' ? 'font-kannada' : ''}`}>
              {lang === 'en' ? (
                <>Built for the <br /><span className="text-primary">Karnataka</span> Spirit</>
              ) : (
                <><span className="text-primary">ಕರ್ನಾಟಕದ</span> <br />ರೈತರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ</>
              )}
            </h2>
            <p className={`text-white/60 text-lg font-medium text-neat full-text italic ${lang === 'kn' ? 'font-kannada' : ''}`}>
              {lang === 'en'
                ? 'Developed specifically for the unique agricultural landscape of Karnataka, Krishi AI supports local dialects and is optimized for low-bandwidth environments, ensuring no farmer is left behind.'
                : 'ಕರ್ನಾಟಕದ ವಿಶಿಷ್ಟ ಕೃಷಿ ಭೂದೃಶ್ಯಕ್ಕಾಗಿ ವಿಶೇಷವಾಗಿ ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾಗಿದೆ, ಕೃಷಿ AI ಸ್ಥಳೀಯ ಉಪಭಾಷೆಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ ಮತ್ತು ಕಡಿಮೆ-ಬ್ಯಾಂಡ್‌ವಿಡ್ತ್ ಪರಿಸರಕ್ಕಾಗಿ ಆಪ್ಟಿಮೈಸ್ ಮಾಡಲಾಗಿದೆ, ಯಾವುದೇ ರೈತರು ಹಿಂದೆ ಉಳಿಯದಂತೆ ಖಚಿತಪಡಿಸುತ್ತದೆ.'}
            </p>
          </div>
          <div className="card-premium p-8 bg-black/40 backdrop-blur-3xl border-white/10 space-y-8">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Global_Research_Pedigree</span>
              <ExternalLink className="size-4 text-white/20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['PlantVillage', 'EfficientNet', 'TensorFlow', 'Gemini AI'].map((item, i) => (
                <div key={i} className="px-6 py-4 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest text-center">
                  {item}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em] leading-relaxed italic text-center pt-8 border-t border-white/5">
              Refined by local KVK expertise and historical state data.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
