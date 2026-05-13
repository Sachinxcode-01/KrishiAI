import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import MarqueeTicker from '../components/MarqueeTicker';
import HowItWorks from '../components/HowItWorks';
import AppSection from '../components/AppSection';
import Features from '../components/Features';
import RegionalAdvisory from '../components/RegionalAdvisory';

export default function Home({ lang }) {
  useEffect(() => {
    // Page-specific scroll trigger refresh
    if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
    }
    
    // Set page title
    document.title = lang === 'en' ? "Krishi AI | Advanced Crop Disease Detection" : "ಕೃಷಿ AI | ಮುಂದುವರಿದ ಬೆಳೆ ರೋಗ ಪತ್ತೆ ಹಚ್ಚುವಿಕೆ";
  }, [lang]);

  return (
    <div className="home-page">
      {/* Cinematic Hero */}
      <Hero lang={lang} />
      
      {/* Live Data Ticker */}
      <MarqueeTicker lang={lang} />

      {/* Threat Intelligence */}
      <RegionalAdvisory lang={lang} />
      
      {/* Core Logic Section */}
      <AppSection lang={lang} />
      
      {/* Educational Section */}
      <Features lang={lang} />
      
      {/* Subtle Bottom Spacer */}
      <div className="h-32" />
    </div>
  );
}
