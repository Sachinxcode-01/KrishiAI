import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../utils/translations';
import { dataset } from '../data/dataset';

const CropQuiz = ({ lang }) => {
  const t = translations[lang];
  const [isActive, setIsActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = dataset.quizQuestions;

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setShowScore(true);
    }
  };

  const reset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setIsActive(false);
  };

  return (
    <div className="card-premium mt-10 overflow-hidden">
      <AnimatePresence mode="wait">
        {!isActive ? (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center space-y-6 py-6"
          >
            <div className="relative inline-block">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl shadow-inner mx-auto">
                🎓
              </div>
              <div className="absolute inset-0 bg-primary/20 blur-2xl -z-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">{t.quizTitle}</h3>
              <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">{t.quizDesc}</p>
            </div>
            <motion.button 
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsActive(true)}
              className="w-full py-4 bg-primary text-background rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-primary/20"
            >
              {t.quizStart}
            </motion.button>
          </motion.div>
        ) : showScore ? (
          <motion.div 
            key="score"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center space-y-8 py-8"
          >
            <div className="text-6xl drop-shadow-2xl">🏆</div>
            <div className="space-y-2">
              <p className="text-[10px] uppercase font-black tracking-[0.4em] text-primary">{t.quizScore}</p>
              <h3 className="text-5xl font-black text-white tracking-tighter">{score} <span className="text-muted/20 text-3xl">/ {questions.length}</span></h3>
            </div>
            <motion.button 
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset} 
              className="w-full py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-muted hover:text-white transition-colors"
            >
              {lang === 'en' ? 'Back to Library' : 'ಹಿಂದೆ'}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 py-4"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Agricultural Intel</span>
                <div className="h-1 w-12 bg-primary rounded-full" />
              </div>
              <span className="text-[10px] font-black text-muted uppercase tracking-widest">{currentQuestion + 1} of {questions.length}</span>
            </div>
            
            <h3 className="text-lg font-black text-white leading-tight min-h-[60px]">
              {lang === 'en' ? questions[currentQuestion].en : questions[currentQuestion].kn}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.06)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(opt.correct)}
                  className="w-full text-left px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[13px] font-medium text-text/80 transition-all group flex items-center justify-between"
                >
                  <span>{lang === 'en' ? opt.en : opt.kn}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">➔</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CropQuiz;
