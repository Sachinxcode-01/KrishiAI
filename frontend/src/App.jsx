import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import History from './pages/History';
import About from './pages/About';
import OutbreakMap from './pages/OutbreakMap';
import Header from './components/Header';
import LiveBackground from './components/LiveBackground';
import Library from './pages/Library';
import Chat from './pages/Chat';
import FloatingChat from './components/FloatingChat';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [lang, setLang] = useState('kn');
  const location = useLocation();

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'kn' : 'en');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/30 relative overflow-x-hidden pb-24">
      {/* Background stays full screen */}
      <LiveBackground />
      
      <Header lang={lang} onToggleLang={toggleLang} />

      {/* Main Container - Responsive width */}
      <main className="relative z-10 mx-auto w-full lg:max-w-[1200px] px-4">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/chat" element={<Chat lang={lang} />} />
            <Route path="/history" element={<History lang={lang} />} />
            <Route path="/library" element={<Library lang={lang} />} />
            <Route path="/map" element={<OutbreakMap lang={lang} />} />
            <Route path="/about" element={<About lang={lang} />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Navigation - Centered bottom bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[540px]">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="bg-surface/80 backdrop-blur-3xl border border-white/10 p-2 rounded-[2.5rem] flex items-center justify-between shadow-2xl"
        >
          <Link 
            to="/" 
            className={`flex-1 flex flex-col items-center py-3 transition-all relative rounded-[2rem] ${isActive('/') ? 'text-primary' : 'text-muted hover:text-text/60'}`}
          >
            {isActive('/') && (
              <motion.div layoutId="nav-bg" className="absolute inset-0 bg-primary/10 rounded-[2rem]" />
            )}
            <span className="text-xl relative z-10">🌿</span>
            <span className="text-[10px] font-bold mt-1 uppercase tracking-wider relative z-10">{lang === 'en' ? 'Scan' : 'ಪರೀಕ್ಷೆ'}</span>
          </Link>
          <Link 
            to="/chat" 
            className={`flex-1 flex flex-col items-center py-3 transition-all relative rounded-[2rem] ${isActive('/chat') ? 'text-primary' : 'text-muted hover:text-text/60'}`}
          >
            {isActive('/chat') && (
              <motion.div layoutId="nav-bg" className="absolute inset-0 bg-primary/10 rounded-[2rem]" />
            )}
            <span className="text-xl relative z-10">💬</span>
            <span className="text-[10px] font-bold mt-1 uppercase tracking-wider relative z-10">{lang === 'en' ? 'Chat' : 'ಚಾಟ್'}</span>
          </Link>
          <Link 
            to="/history" 
            className={`flex-1 flex flex-col items-center py-3 transition-all relative rounded-[2rem] ${isActive('/history') ? 'text-primary' : 'text-muted hover:text-text/60'}`}
          >
            {isActive('/history') && (
              <motion.div layoutId="nav-bg" className="absolute inset-0 bg-primary/10 rounded-[2rem]" />
            )}
            <span className="text-xl relative z-10">📜</span>
            <span className="text-[10px] font-bold mt-1 uppercase tracking-wider relative z-10">{lang === 'en' ? 'History' : 'ಇತಿಹಾಸ'}</span>
          </Link>
          <Link 
            to="/map" 
            className={`flex-1 flex flex-col items-center py-3 transition-all relative rounded-[2rem] ${isActive('/map') ? 'text-primary' : 'text-muted hover:text-text/60'}`}
          >
            {isActive('/map') && (
              <motion.div layoutId="nav-bg" className="absolute inset-0 bg-primary/10 rounded-[2rem]" />
            )}
            <span className="text-xl relative z-10">🗺️</span>
            <span className="text-[10px] font-bold mt-1 uppercase tracking-wider relative z-10">{lang === 'en' ? 'Alerts' : 'ಎಚ್ಚರಿಕೆ'}</span>
          </Link>
          <Link 
            to="/library" 
            className={`flex-1 flex flex-col items-center py-3 transition-all relative rounded-[2rem] ${isActive('/library') ? 'text-primary' : 'text-muted hover:text-text/60'}`}
          >
            {isActive('/library') && (
              <motion.div layoutId="nav-bg" className="absolute inset-0 bg-primary/10 rounded-[2rem]" />
            )}
            <span className="text-xl relative z-10">📚</span>
            <span className="text-[10px] font-bold mt-1 uppercase tracking-wider relative z-10">{lang === 'en' ? 'Library' : 'ಮಾಹಿತಿ'}</span>
          </Link>
          <Link 
            to="/about" 
            className={`flex-1 flex flex-col items-center py-3 transition-all relative rounded-[2rem] ${isActive('/about') ? 'text-primary' : 'text-muted hover:text-text/60'}`}
          >
            {isActive('/about') && (
              <motion.div layoutId="nav-bg" className="absolute inset-0 bg-primary/10 rounded-[2rem]" />
            )}
            <span className="text-xl relative z-10">ℹ️</span>
            <span className="text-[10px] font-bold mt-1 uppercase tracking-wider relative z-10">{lang === 'en' ? 'About' : 'ಬಗ್ಗೆ'}</span>
          </Link>
        </motion.div>
      </nav>

      
      {/* Decorative side elements for desktop */}
      <div className="hidden xl:block fixed top-1/2 left-8 -translate-y-1/2 space-y-12 opacity-10 pointer-events-none">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="text-6xl">🌾</motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="text-6xl">🚜</motion.div>
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity }} className="text-6xl">🌧️</motion.div>
      </div>
      <div className="hidden xl:block fixed top-1/2 right-8 -translate-y-1/2 space-y-12 opacity-10 pointer-events-none text-right">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4.5, repeat: Infinity }} className="text-6xl">🍅</motion.div>
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 5.5, repeat: Infinity }} className="text-6xl">🍚</motion.div>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6.5, repeat: Infinity }} className="text-6xl">🌻</motion.div>
      </div>
      <FloatingChat lang={lang} />
      <Analytics />
    </div>
  );
}

export default App;
