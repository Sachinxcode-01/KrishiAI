import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import MarqueeTicker from '../components/MarqueeTicker';
import HowItWorks from '../components/HowItWorks';
import AppSection from '../components/AppSection';
import Features from '../components/Features';
import RegionalAdvisory from '../components/RegionalAdvisory';

export default function Home() {
  useEffect(() => {
    // Page-specific scroll trigger refresh
    if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
    }
    
    // Set page title
    document.title = "Krishi AI | Advanced Crop Disease Detection";
  }, []);

  return (
    <div className="home-page">
      {/* Cinematic Hero */}
      <Hero />
      
      {/* Live Data Ticker */}
      <MarqueeTicker />

      {/* Threat Intelligence */}
      <RegionalAdvisory />
      
      {/* Core Logic Section */}
      <AppSection />
      
      {/* Educational Section */}
      <Features />
      
      {/* Subtle Bottom Spacer */}
      <div className="h-32" />
    </div>
  );
}
