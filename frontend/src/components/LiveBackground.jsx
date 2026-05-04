import React from 'react';
import { motion } from 'framer-motion';

const LiveBackground = () => {
  const particles = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Animated Organic Blobs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-primary/5 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-accent/5 rounded-full blur-[100px]"
      />

      {/* Floating Particles (Seeds/Leaves) */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.3 + 0.1,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: ["-10%", "110%"],
            x: [
              (Math.random() * 10 - 5) + "%",
              (Math.random() * 10 - 5) + "%",
            ],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: -Math.random() * 20,
          }}
          className="absolute text-primary/20 text-xl"
        >
          {['🍃', '🌿', '🌱', '✨'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}

      {/* Overlay Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pollen.png')]" />
    </div>
  );
};

export default LiveBackground;
