import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import HistoryPage from './pages/History';
import LibraryPage from './pages/Library';
import OutbreakMap from './pages/OutbreakMap';
import AboutPage from './pages/About';
import ChatPage from './pages/Chat';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import FloatingChatbot from './components/FloatingChatbot';
import { initAnimations } from './utils/animations';
import heroBg from './assets/hero-bg.png';
import { DiagnosisProvider } from './context/DiagnosisContext';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      initAnimations();
    }
  }, [loading]);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <DiagnosisProvider>
      <div className="relative min-h-screen bg-black text-white selection:bg-[var(--primary)] selection:text-black overflow-x-hidden">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {/* Global Cinematic Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <img 
          src={heroBg} 
          alt="Global Background" 
          className="w-full h-full object-cover grayscale-[0.5] contrast-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <Navbar />
      
      <main className="relative z-10">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/map" element={<OutbreakMap />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </main>

      {/* Global Status HUD: Absolute Perfection */}
      <div className="fixed bottom-0 left-0 w-full z-[9999] pointer-events-none px-10 pb-10 flex justify-between items-end">
        <div className="flex flex-col gap-1 backdrop-blur-xl bg-black/40 p-5 rounded-2xl border border-white/5 shadow-2xl hero-fade animate-float-tactical">
          <div className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-[var(--primary)] animate-pulse shadow-[0_0_15px_var(--primary-glow)]" />
            <span className="font-mono text-[0.75rem] uppercase tracking-[0.3em] text-[var(--primary)] font-black">
              Neural_Link: Active
            </span>
          </div>
          <div className="flex flex-col gap-1 ml-5">
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/40 font-bold">
              Inference_Nodes: Cluster_08
            </span>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/40 font-bold">
              Geo_Sync: Secure_Channel_7
            </span>
          </div>
          {/* Micro Progress Bars */}
          <div className="flex gap-1 mt-3 ml-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className={`h-1 w-3 rounded-full ${i < 6 ? 'bg-[var(--primary)]/40' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-1 items-end backdrop-blur-xl bg-black/40 p-5 rounded-2xl border border-white/5 shadow-2xl hero-fade animate-float-tactical" style={{ animationDelay: '-2s' }}>
           <span className="font-mono text-[0.75rem] uppercase tracking-[0.3em] text-white/60 font-black">
              System_Telemetry
            </span>
            <div className="flex gap-6 mt-2">
              <div className="text-right">
                <span className="block text-[0.5rem] font-bold text-white/30 uppercase tracking-widest">Latency</span>
                <span className="block text-xs font-black text-[var(--primary)]">14ms</span>
              </div>
              <div className="text-right">
                <span className="block text-[0.5rem] font-bold text-white/30 uppercase tracking-widest">Efficiency</span>
                <span className="block text-xs font-black text-[var(--primary)]">98.2%</span>
              </div>
            </div>
        </div>
      </div>

      <FloatingChatbot />

      <Footer />
      </div>
    </DiagnosisProvider>
  );
}

export default App;
