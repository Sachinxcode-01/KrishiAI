import { Leaf, Share2, Zap, Info, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    App: [
      { name: 'Detect', path: '/' },
      { name: 'History', path: '/history' },
      { name: 'About', path: '/about' },
      { name: 'Features', path: '#features' }
    ],
    Technology: [
      { name: 'Claude AI', path: '#' },
      { name: 'MongoDB', path: '#' },
      { name: 'React', path: '#' },
      { name: 'Node.js', path: '#' }
    ],
    Team: [
      { name: 'Xcoderz', path: '#' },
      { name: 'REC Hulkoti', path: '#' },
      { name: 'Contact Us', path: '#' }
    ]
  };

  return (
    <footer className="bg-[#020B06] border-t border-[rgba(0,255,135,0.08)] pt-24 pb-12 px-[6%] relative overflow-hidden">
      {/* Animated Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent animate-shimmer" />

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          {/* Left Column */}
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl overflow-hidden">
                <img src="/krishiAI.png" alt="Krishi AI Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-black text-3xl tracking-tight text-white uppercase italic">
                Krishi <span className="text-[var(--primary)]">AI</span>
              </span>
            </div>
            <p className="font-sans text-[var(--muted)] text-lg max-w-md leading-relaxed">
              Empowering Indian farmers with the world's most advanced AI crop diagnostic system. Built for sustainability, precision, and the future of agriculture.
            </p>
            <div className="flex gap-4">
              {[Share2, Zap, Info, Mail].map((Icon, i) => (
                <button key={i} className="size-12 rounded-full border border-white/5 flex items-center justify-center text-[var(--muted)] hover:bg-[var(--primary)] hover:text-black hover:border-[var(--primary)] transition-all">
                  <Icon className="size-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Link Groups */}
          <div className="grid grid-cols-2 xs:grid-cols-3 gap-8 md:gap-12">
            {Object.entries(links).map(([title, items]) => (
              <div key={title} className="space-y-6 md:space-y-8">
                <h4 className="font-display font-bold text-[0.6rem] md:text-[0.7rem] tracking-[0.3em] text-white uppercase opacity-50">
                  {title}
                </h4>
                <ul className="space-y-3 md:space-y-4">
                  {items.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.path}
                        className="font-sans text-xs md:text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-sans text-[var(--text-dim)] text-sm font-medium uppercase tracking-widest">
            Built with love for Karnataka farmers by <span className="text-white">Team Xcoderz</span> at REC Hulkoti
          </p>
          <p className="font-sans text-[var(--text-dim)] text-xs uppercase tracking-widest">
            © {currentYear} Krishi AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
