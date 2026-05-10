import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar() {
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

      <div className="hidden md:block">
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
      <div className={`fixed inset-0 bg-background z-[1100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="premium-grid" />
        <div className="p-10 flex flex-col h-full relative z-10">
          <div className="flex justify-between items-center mb-20">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl overflow-hidden">
                <img src="/krishiAI.png" alt="Krishi AI Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-black text-2xl text-white uppercase italic tracking-tighter">
                KRISHI <span className="text-[var(--primary)]">AI</span>
              </span>
            </div>
            <button 
              className="size-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="size-8 text-white" />
            </button>
          </div>
          
          <div className="flex flex-col gap-10">
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
                  className={`font-display font-black text-5xl transition-all duration-300 ${
                    isActive ? 'text-[var(--primary)]' : 'text-white hover:text-[var(--primary)]'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          
          <div className="mt-auto">
            <button className="w-full btn-premium btn-premium-primary !py-6 text-lg">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
