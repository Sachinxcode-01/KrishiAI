import { motion } from 'framer-motion';
import { Camera, Cpu, Sparkles, PlusCircle } from 'lucide-react';

export default function Features() {
  const steps = [
    {
      icon: Camera,
      title: 'Capture Leaf',
      desc: 'Take a clear photo of the diseased leaf using your mobile camera or upload from gallery.',
      kannada: 'ಎಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ',
      step: '01'
    },
    {
      icon: Cpu,
      title: 'AI Analysis',
      desc: 'Claude Vision AI scans every detail of the leaf and identifies the exact disease in seconds.',
      kannada: 'ಕ್ಲೌಡ್ AI ರೋಗ ಪತ್ತೆ ಮಾಡುತ್ತದೆ',
      step: '02'
    },
    {
      icon: PlusCircle,
      title: 'Get Cure',
      desc: 'Receive complete treatment steps and medicine names in both Kannada and English.',
      kannada: 'ಚಿಕಿತ್ಸೆ ಮತ್ತು ಔಷಧ ಮಾಹಿತಿ ಪಡೆಯಿರಿ',
      step: '03'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="features" className="py-32 px-[6%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center text-center mb-24"
        >
          <div className="flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5">
            <Sparkles className="size-3 text-[var(--primary)]" />
            <span className="font-mono text-[0.6rem] font-bold tracking-[0.3em] text-[var(--primary)] uppercase">
              How It Works
            </span>
          </div>
          <h2 className="font-display font-black text-5xl md:text-6xl text-white uppercase mb-6 tracking-tighter">
            Seamless <span className="text-gradient">Workflow</span>
          </h2>
          <p className="font-sans text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed">
            Enterprise-grade intelligence simplified into three intuitive steps.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((item, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative group"
            >
              {/* Background Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-glow)] rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              
              <div className="relative glass-panel p-10 h-full flex flex-col border border-white/5 group-hover:border-[var(--primary)]/30 transition-colors duration-500 overflow-hidden">
                {/* Step Number Background */}
                <div className="absolute top-0 right-0 font-display font-black text-9xl text-white/[0.03] -translate-y-4 translate-x-4 pointer-events-none group-hover:text-[var(--primary)]/[0.05] transition-colors duration-500">
                  {item.step}
                </div>

                <div className="size-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[var(--primary)] group-hover:scale-110 transition-all duration-500 shadow-2xl relative z-10">
                  <item.icon className="size-8 text-[var(--primary)] group-hover:text-black transition-colors duration-500" />
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-4 uppercase tracking-tight relative z-10 group-hover:text-[var(--primary)] transition-colors duration-500">
                  {item.title}
                </h3>
                
                <p className="font-sans text-[var(--muted)] text-base leading-relaxed mb-10 relative z-10">
                  {item.desc}
                </p>

                <div className="pt-8 border-t border-white/5 flex flex-col gap-2 mt-auto relative z-10">
                  <span className="font-mono text-[0.6rem] font-bold text-[var(--primary)] uppercase tracking-[0.3em]">Action</span>
                  <span className="font-kannada font-bold text-xl text-white/90">{item.kannada}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
