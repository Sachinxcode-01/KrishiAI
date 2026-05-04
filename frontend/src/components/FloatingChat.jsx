import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBot from './ChatBot';

const FloatingChat = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50, x: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, x: 50 }}
            className="absolute bottom-24 right-6 w-[90vw] max-w-[400px] pointer-events-auto shadow-2xl"
          >
            <div className="relative">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-surface border border-white/10 rounded-full flex items-center justify-center text-xs text-white z-10 hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
              <ChatBot lang={lang} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Bubble */}
      <motion.button
        drag
        dragConstraints={{ left: -window.innerWidth + 80, right: 0, top: -window.innerHeight + 80, bottom: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: [0, -10, 0],
          transition: { 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-24 right-6 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-3xl shadow-2xl shadow-primary/40 pointer-events-auto cursor-grab active:cursor-grabbing z-[110] border-4 border-background/20"
      >
        <span className="relative z-10">🤖</span>
        {/* Glow effect */}
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-white rounded-full blur-xl"
        />
      </motion.button>
    </div>
  );
};

export default FloatingChat;
