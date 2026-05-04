import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import About from './pages/About';
import Header from './components/Header';
import LiveBackground from './components/LiveBackground';
import Library from './pages/Library';

function App() {
  const [lang, setLang] = useState('kn');
  const location = useLocation();

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'kn' : 'en');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-black text-text selection:bg-primary/30 relative overflow-x-hidden">
      {/* Background stays full screen */}
      <LiveBackground />
      
      <Header lang={lang} onToggleLang={toggleLang} />

      {/* Main Container - Responsive width */}
      <main className="relative z-10 mx-auto transition-all duration-500 w-full lg:max-w-[1200px]">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/history" element={<History lang={lang} />} />
          <Route path="/library" element={<Library lang={lang} />} />
          <Route path="/about" element={<About lang={lang} />} />
        </Routes>
      </main>

      {/* Navigation - Centered bottom bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[400px]">
        <div className="bg-surface/60 backdrop-blur-2xl border border-white/10 p-2 rounded-3xl flex items-center justify-between shadow-2xl">
          <Link 
            to="/" 
            className={`flex-1 flex flex-col items-center py-2 transition-all rounded-2xl ${isActive('/') ? 'bg-primary/20 text-primary' : 'text-text/40 hover:text-text/60'}`}
          >
            <span className="text-xl">🌿</span>
            <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{lang === 'en' ? 'Scan' : 'ಪರೀಕ್ಷೆ'}</span>
          </Link>
          <Link 
            to="/history" 
            className={`flex-1 flex flex-col items-center py-2 transition-all rounded-2xl ${isActive('/history') ? 'bg-primary/20 text-primary' : 'text-text/40 hover:text-text/60'}`}
          >
            <span className="text-xl">📜</span>
            <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{lang === 'en' ? 'History' : 'ಇತಿಹಾಸ'}</span>
          </Link>
          <Link 
            to="/library" 
            className={`flex-1 flex flex-col items-center py-2 transition-all rounded-2xl ${isActive('/library') ? 'bg-primary/20 text-primary' : 'text-text/40 hover:text-text/60'}`}
          >
            <span className="text-xl">📚</span>
            <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{lang === 'en' ? 'Library' : 'ಮಾಹಿತಿ'}</span>
          </Link>
          <Link 
            to="/about" 
            className={`flex-1 flex flex-col items-center py-2 transition-all rounded-2xl ${isActive('/about') ? 'bg-primary/20 text-primary' : 'text-text/40 hover:text-text/60'}`}
          >
            <span className="text-xl">ℹ️</span>
            <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{lang === 'en' ? 'About' : 'ಬಗ್ಗೆ'}</span>
          </Link>
        </div>
      </nav>
      
      {/* Decorative side elements for desktop */}
      <div className="hidden xl:block fixed top-1/2 left-10 -translate-y-1/2 space-y-8 opacity-20 pointer-events-none">
        <div className="text-6xl grayscale">🌾</div>
        <div className="text-6xl grayscale">🚜</div>
        <div className="text-6xl grayscale">🌧️</div>
      </div>
      <div className="hidden xl:block fixed top-1/2 right-10 -translate-y-1/2 space-y-8 opacity-20 pointer-events-none text-right">
        <div className="text-6xl grayscale">🍅</div>
        <div className="text-6xl grayscale">🍚</div>
        <div className="text-6xl grayscale">🌻</div>
      </div>
    </div>
  );
}

export default App;
