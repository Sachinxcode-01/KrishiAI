import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex items-center justify-center w-full ${
        scrolled ? 'py-4 bg-background/80 backdrop-blur-3xl border-b border-white/5' : 'py-10 bg-transparent'
      }`}
    >
      <div className="w-[90%] max-w-[1800px] flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-none">
          <div className="size-3 bg-primary rounded-full shadow-[0_0_15px_#00FF87]" />
          <h1 className="font-display text-2xl font-black uppercase tracking-tighter text-white">
            Krishi <span className="text-primary italic">AI</span>
          </h1>
        </div>

        <nav className="hidden lg:flex items-center gap-12">
          {['Process', 'Diagnosis', 'Features', 'Community'].map((item, i) => (
            <a 
              key={i}
              href={`#${item.toLowerCase()}`}
              className="relative text-[11px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
          
          <button className="btn-magnetic btn-primary text-[10px] py-3 px-8 ml-4">
            Get Started
          </button>
        </nav>

        {/* Mobile Menu Icon would go here */}
      </div>
    </header>
  );
};

export default Header;
