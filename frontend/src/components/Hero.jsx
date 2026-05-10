import { useEffect, useRef } from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const { gsap } = window;
    if (!gsap) return;

    const tl = gsap.timeline();

    // Reset visibility to avoid flash
    gsap.set('.hero-reveal', { y: 120, opacity: 0 });
    gsap.set('.hero-fade', { opacity: 0 });

    tl.to('.hero-reveal', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'expo.out',
      delay: 0.5
    })
    .to('.hero-fade', {
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    }, '-=0.8');

    // Float animation for the sparkles
    gsap.to('.sparkle-icon', {
      y: -10,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: 'sine.inOut'
    });
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center pt-40 px-6 overflow-hidden bg-[#020B06]">
      {/* Absolute Perfection: Tactical Background */}
      <div className="absolute inset-0 pixel-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />
      
      {/* Floating HUD Elements */}
      <div className="absolute top-20 left-20 hidden lg:block animate-float-tactical">
        <div className="flex flex-col gap-2 p-4 border-l border-t border-[var(--primary)]/30 rounded-tl-xl bg-[var(--primary)]/5 backdrop-blur-sm">
          <span className="text-tactical">[SURVEILLANCE: ACTIVE]</span>
          <span className="text-tactical">REF_ID: KRISHI_NX_001</span>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="size-1 bg-[var(--primary)] animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />)}
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 right-20 hidden lg:block animate-float-tactical" style={{ animationDelay: '-4s' }}>
        <div className="flex flex-col gap-2 p-4 border-r border-b border-[var(--primary)]/30 rounded-br-xl bg-[var(--primary)]/5 backdrop-blur-sm text-right">
          <span className="text-tactical">COORD: 12.9716° N, 77.5946° E</span>
          <span className="text-tactical">SYSTEM_HEALTH: 100%</span>
          <div className="flex gap-1 justify-end mt-2">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="size-1 bg-white/20" />)}
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Brand Logo in Hero */}
        <div className="hero-fade mt-12 mb-8 size-24 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.3)] border border-white/10 group relative cursor-pointer">
          <div className="absolute inset-0 bg-[var(--primary)]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="size-8 text-white animate-spin-slow" />
          </div>
          <img src="/krishiAI.png" alt="Krishi AI Logo" className="w-full h-full object-contain p-2" />
        </div>
        {/* Cinematic Heading */}
        <h1 className="hero-heading font-black mb-10 pt-10">
          <span className="block overflow-hidden h-fit">
            <span className="hero-reveal block text-white">Protecting</span>
          </span>
          <span className="block overflow-hidden h-fit scale-90">
            <span className="hero-reveal block text-[var(--primary)]">Your</span>
          </span>
          <span className="block overflow-hidden h-fit">
            <span className="hero-reveal block text-gradient">Harvest</span>
          </span>
        </h1>

        {/* Description */}
        <p className="hero-fade max-w-2xl font-sans text-lg md:text-xl text-[var(--text-secondary)] mb-12 leading-relaxed">
          The most advanced AI diagnostic suite for modern farming. Detect diseases in seconds, 
          optimize yields, and secure your livelihood with precision intelligence.
          <span className="block font-kannada font-bold text-[var(--primary)] mt-4">
            ರೈತರ ಏಳಿಗೆಗಾಗಿ ಅತ್ಯಾಧುನಿಕ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ತಂತ್ರಜ್ಞಾನ.
          </span>
        </p>

        {/* CTA Group */}
        <div className="hero-fade flex flex-wrap justify-center gap-6 mb-24">
          <button 
            onClick={() => document.getElementById('detect')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-premium btn-premium-primary group"
          >
            Analyze My Crop
            <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button 
            onClick={() => window.location.href = '/library'}
            className="btn-premium btn-premium-secondary group"
          >
            <Play className="mr-2 size-5 fill-current" />
            Explore Library
          </button>
        </div>

        {/* Stats Row */}
        <div className="hero-fade grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-t border-white/10 pt-16 mt-auto">
          {[
            { value: '97.4%', label: 'Model Accuracy', detail: 'Precision Diagnosis' },
            { value: '38+', label: 'Crop Species', detail: 'Vast Database' },
            { value: '0.8s', label: 'Inference', detail: 'Real-time Speed' },
            { value: '24/7', label: 'AI Support', detail: 'Expert Guidance' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="font-display font-black text-3xl text-white mb-1">{stat.value}</span>
              <span className="font-sans text-[0.6rem] font-bold tracking-[0.2em] text-[var(--primary)] uppercase mb-1">
                {stat.label}
              </span>
              <span className="font-mono text-[0.55rem] text-[var(--muted)] uppercase">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Aesthetic Leaves */}
      <div className="absolute top-1/4 -left-20 leaf-float opacity-20 hidden lg:block">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="var(--primary)" xmlns="http://www.w3.org/2000/svg">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.17,20C14.33,20 19,15.33 19,9.17C19,8.77 19,8.39 18.93,8H17M17,8C17,8 18,3 22,2C21,6 17,8 17,8Z" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 -right-20 leaf-float opacity-10 hidden lg:block" style={{ animationDelay: '-3s' }}>
        <svg width="300" height="300" viewBox="0 0 24 24" fill="var(--secondary)" xmlns="http://www.w3.org/2000/svg">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.17,20C14.33,20 19,15.33 19,9.17C19,8.77 19,8.39 18.93,8H17M17,8C17,8 18,3 22,2C21,6 17,8 17,8Z" />
        </svg>
      </div>
    </section>
  );
}
