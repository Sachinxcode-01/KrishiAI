import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Detection', path: '/#detect' },
    { name: 'Library', path: '/library' },
    { name: 'History', path: '/history' },
    { name: 'Map', path: '/map' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 px-4 md:px-[6%] flex items-center justify-between ${
        scrolled ? 'h-[60px] md:h-[70px] bg-background/80 backdrop-blur-2xl border-b border-white/5' : 'h-[80px] md:h-[100px] bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-4 group">
        <div className="size-12 rounded-xl flex items-center justify-center transition-all duration-500 overflow-hidden">
          <img src="/krishiAI.png" alt="Krishi AI Logo" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="font-display font-black text-xl tracking-tighter text-white leading-none">
            KRISHI <span className="text-[var(--primary)]">AI</span>
          </span>
          <span className="font-mono text-[0.5rem] font-bold tracking-[0.3em] text-[var(--muted)] uppercase mt-1">Precision Agri-Tech</span>
        </div>
      </Link>

      {/* Desktop Navigation - Centered Stack */}
      <div className="hidden md:flex flex-col items-center gap-2 absolute left-1/2 -translate-x-1/2">
        {/* Navigation Links Pill */}
        <div className="flex items-center gap-8 px-8 py-2.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = link.path === '/' 
              ? location.pathname === '/' && !location.hash
              : link.path.includes('#')
                ? location.pathname === '/' && location.hash === link.path.split('/')[1]
                : location.pathname.startsWith(link.path);

            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`relative font-sans text-[0.8rem] font-bold uppercase tracking-widest transition-all duration-300 hover:text-[var(--primary)] ${
                  isActive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--primary)] rounded-full shadow-[0_0_5px_var(--primary)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Slogan Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--primary)]/10 bg-[var(--primary)]/5 backdrop-blur-md">
          <div className="size-3 rounded-[2px] overflow-hidden">
            <img src="/krishiAI.png" alt="Krishi AI" className="w-full h-full object-contain" />
          </div>
          <span className="font-mono text-[0.55rem] font-bold tracking-[0.2em] text-[var(--primary)] uppercase">
            Revolutionizing Agriculture with Generative AI
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-xl">
          <button 
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 rounded-lg font-mono text-[0.65rem] font-bold tracking-widest transition-all ${lang === 'en' ? 'bg-[var(--primary)] text-black' : 'text-white/40 hover:text-white'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLang('kn')}
            className={`px-3 py-1.5 rounded-lg font-mono text-[0.65rem] font-bold tracking-widest transition-all ${lang === 'kn' ? 'bg-[var(--primary)] text-black' : 'text-white/40 hover:text-white'}`}
          >
            KN
          </button>
        </div>
        <Link to="/map">
          <button className="btn-premium btn-premium-primary !py-3 !px-8 text-[0.8rem] flex items-center gap-2 group">
            Secure Portal <ShieldCheck className="size-4 transition-transform group-hover:scale-110" />
          </button>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden size-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="size-6" />
      </button>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-background/95 backdrop-blur-2xl z-[1100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="premium-grid opacity-20" />
        
        {/* Decorative Glow */}
        <div className="absolute top-1/4 -right-20 size-[400px] bg-[var(--primary)]/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="p-8 md:p-12 flex flex-col h-full relative z-10">
          <div className="flex justify-between items-center mb-16">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4">
              <div className="size-10 rounded-xl overflow-hidden border border-white/10">
                <img src="/krishiAI.png" alt="Krishi AI Logo" className="w-full h-full object-contain p-1" />
              </div>
              <span className="font-display font-black text-xl text-white uppercase tracking-tighter">
                KRISHI <span className="text-[var(--primary)]">AI</span>
              </span>
            </Link>
            <button 
              className="size-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-90 transition-transform"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="size-6 text-white" />
            </button>
          </div>
          
          <div className="flex flex-col gap-6">
            {navLinks.map((link, i) => {
              const isActive = link.path === '/' 
                ? location.pathname === '/' && !location.hash
                : link.path.includes('#')
                  ? location.pathname === '/' && location.hash === link.path.split('/')[1]
                  : location.pathname.startsWith(link.path);

              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between py-2 transition-all duration-300 ${
                    isActive ? 'translate-x-2' : ''
                  }`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <span className={`font-display font-black text-4xl uppercase tracking-tighter transition-colors ${
                    isActive ? 'text-[var(--primary)]' : 'text-white/60 group-hover:text-white'
                  }`}>
                    {link.name}
                  </span>
                  <div className={`h-px flex-grow mx-4 transition-all duration-500 ${
                    isActive ? 'bg-[var(--primary)] opacity-40' : 'bg-white/5 group-hover:bg-white/10'
                  }`} />
                  <ArrowRight className={`size-6 transition-all duration-300 ${
                    isActive ? 'text-[var(--primary)] opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                  }`} />
                </Link>
              );
            })}
          </div>
          
          <div className="mt-auto pt-10">
            <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-2xl mb-4">
              <button 
                onClick={() => setLang('en')}
                className={`flex-1 py-3 rounded-xl font-mono text-[0.7rem] font-bold tracking-widest transition-all ${lang === 'en' ? 'bg-[var(--primary)] text-black' : 'text-white/40'}`}
              >
                ENGLISH
              </button>
              <button 
                onClick={() => setLang('kn')}
                className={`flex-1 py-3 rounded-xl font-mono text-[0.7rem] font-bold tracking-widest transition-all ${lang === 'kn' ? 'bg-[var(--primary)] text-black' : 'text-white/40'}`}
              >
                KANNADA
              </button>
            </div>
            
            <Link to="/map" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full btn-premium !py-5 text-base flex items-center justify-center gap-3 bg-[var(--primary)] text-black border-[var(--primary)] font-black uppercase tracking-tighter">
                Secure Command Center <ShieldCheck className="size-5" />
              </button>
            </Link>
            
            <div className="mt-8 flex justify-center gap-8">
               <span className="text-[0.6rem] font-bold tracking-widest text-white/20 uppercase">v5.0.2 PRODUCTION</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
