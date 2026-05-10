import React, { useEffect, useState, useRef } from 'react';
import { Leaf, Sparkles } from 'lucide-react';

const Loader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const screenRef = useRef(null);
  const progressRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) {
      onComplete?.();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      }
    });

    // Reset visibility
    gsap.set('.loader-char', { y: 100, opacity: 0 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });

    // Counter animation
    const counterObj = { value: 0 };
    gsap.to(counterObj, {
      value: 100,
      duration: 2.2,
      ease: "expo.inOut",
      onUpdate: () => {
        setCount(Math.floor(counterObj.value));
      }
    });

    // Progress bar animation
    gsap.to(progressRef.current, {
      width: "100%",
      duration: 2.2,
      ease: "expo.inOut"
    });

    // Title reveal
    tl.to('.loader-char', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.04,
      ease: "expo.out",
      delay: 0.2
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(screenRef.current, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 1.2,
      ease: "expo.inOut",
      delay: 0.4
    });

  }, [onComplete]);

  const title = "KRISHI AI";

  return (
    <div ref={screenRef} className="fixed inset-0 z-[99999] bg-[var(--background)] flex flex-col items-center justify-center overflow-hidden">
      {/* Aesthetic Layers */}
      <div className="grain-overlay" />
      <div className="premium-grid opacity-30" />
      <div className="mesh-glow opacity-40" />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Brand Icon */}
        <div className="mb-12 size-16 rounded-2xl overflow-hidden shadow-[0_0_30px_var(--primary-glow)] animate-pulse">
          <img src="/krishiAI.png" alt="Krishi AI Logo" className="w-full h-full object-contain" />
        </div>

        {/* Cinematic Title */}
        <h1 ref={titleRef} className="flex overflow-hidden mb-4">
          {title.split('').map((char, i) => (
            <span key={i} className="loader-char block font-display font-black text-6xl md:text-8xl text-white tracking-tighter">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <div ref={subtitleRef} className="flex flex-col items-center gap-2">
          <p className="font-kannada text-2xl text-[var(--primary)] font-bold">
            ಬೆಳೆ ರೋಗ ತಕ್ಷಣ ಪತ್ತೆ ಮಾಡಿ
          </p>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mt-4">
            <Sparkles className="size-3 text-[var(--primary)]" />
            <span className="font-mono text-[0.6rem] font-bold tracking-[0.3em] text-[var(--muted)] uppercase">
              Initializing Intelligence
            </span>
          </div>
        </div>

        {/* Counter */}
        <div className="mt-16 font-mono text-5xl font-black text-white/5 tracking-widest">
          {count.toString().padStart(3, '0')}
        </div>
      </div>

      {/* Progress system */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
        <div ref={progressRef} className="h-full bg-[var(--primary)] shadow-[0_0_15px_var(--primary)] w-0" />
      </div>
    </div>
  );
};

export default Loader;
