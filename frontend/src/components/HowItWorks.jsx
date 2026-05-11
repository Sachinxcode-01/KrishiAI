import { useEffect } from 'react';
import { Camera, BrainCircuit, Cross, ChevronRight } from 'lucide-react';

export default function HowItWorks() {
  useEffect(() => {
    const { gsap } = window;
    if (!gsap) return;

    // Reveal steps on scroll
    gsap.fromTo('.process-card', 
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.process-grid',
          start: 'top 80%'
        }
      }
    );
  }, []);

  const steps = [
    {
      id: '01',
      icon: Camera,
      title: 'Capture Leaf',
      desc: 'Take a clear photo of the diseased leaf using your mobile camera or upload from gallery.',
      kannada: 'ಎಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ'
    },
    {
      id: '02',
      icon: BrainCircuit,
      title: 'AI Analysis',
      desc: 'Claude Vision AI scans every detail of the leaf and identifies the exact disease in seconds.',
      kannada: 'ಕ್ಲೋಡ್ AI ರೋಗ ಪತ್ತೆ ಮಾಡುತ್ತದೆ'
    },
    {
      id: '03',
      icon: Cross,
      title: 'Get Cure',
      desc: 'Receive complete treatment steps and medicine names in both Kannada and English.',
      kannada: 'ಚಿಕಿತ್ಸೆ ಮತ್ತು ಔಷಧ ಮಾಹಿತಿ ಪಡೆಯಿರಿ'
    }
  ];

  return (
    <section id="process" className="py-32 px-[6%] relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <span className="font-display font-bold text-[0.75rem] tracking-[0.3em] text-[var(--primary)] uppercase mb-4">
            Process
          </span>
          <h2 className="section-title text-3xl md:text-5xl text-white mb-6 uppercase">How It Works</h2>
          <p className="font-sans text-[var(--muted)] text-base md:text-lg max-w-2xl">
            Three simple steps to protect your crops and ensure a healthy harvest.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="process-grid grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="process-card glass-card relative p-12 overflow-hidden flex flex-col items-start group"
            >
              {/* Watermark */}
              <span className="absolute -top-4 -right-4 font-display font-black text-9xl text-white/[0.03] pointer-events-none transition-transform group-hover:scale-110 duration-700">
                {step.id}
              </span>

              {/* Icon */}
              <div className="size-16 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {(() => {
                  const StepIcon = step.icon;
                  return <StepIcon className="size-8 text-[var(--primary)]" />;
                })()}
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-2xl text-white mb-6 uppercase tracking-tight">
                {step.title}
              </h3>
              
              <div className="space-y-4">
                <p className="font-sans text-[var(--muted)] leading-relaxed">
                  {step.desc}
                </p>
                <div className="pl-4 border-l border-[var(--primary)]/30 py-1">
                  <p className="font-kannada font-bold text-[var(--primary)]">
                    {step.kannada}
                  </p>
                </div>
              </div>

              {/* Shiny effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          ))}

          {/* Connection Lines (Desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full -translate-y-1/2 -z-10 px-24">
            <svg width="100%" height="2" viewBox="0 0 1000 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 1H1000" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="10 10" className="animate-dash" />
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="1" x2="1000" y2="1" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--primary)" stopOpacity="0" />
                  <stop offset="0.5" stopColor="var(--primary)" />
                  <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
