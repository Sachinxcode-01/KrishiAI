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
    <div className="glass-card mt-8">
      {!isActive ? (
        <div className="text-center space-y-4 py-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-2xl">
            🎓
          </div>
          <div>
            <h3 className="font-bold text-white">{t.quizTitle}</h3>
            <p className="text-xs text-text/40">{t.quizDesc}</p>
          </div>
          <button 
            onClick={() => setIsActive(true)}
            className="w-full py-2.5 bg-primary/20 text-primary border border-primary/20 rounded-xl font-bold text-xs"
          >
            {t.quizStart}
          </button>
        </div>
      ) : showScore ? (
        <div className="text-center space-y-6 py-4 animate-fade-in">
          <div className="text-4xl">🏆</div>
          <div>
            <p className="text-[10px] uppercase font-black tracking-widest text-text/40">{t.quizScore}</p>
            <h3 className="text-3xl font-black text-white">{score} / {questions.length}</h3>
          </div>
          <button onClick={reset} className="btn-primary w-full text-xs">
            {lang === 'en' ? 'Back' : 'ಹಿಂದೆ'}
          </button>
        </div>
      ) : (
        <div className="space-y-6 py-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Question {currentQuestion + 1}</span>
            <span className="text-[10px] font-medium text-text/20">{currentQuestion + 1}/{questions.length}</span>
          </div>
          
          <h3 className="font-bold text-sm text-white min-h-[40px]">
            {lang === 'en' ? questions[currentQuestion].en : questions[currentQuestion].kn}
          </h3>

          <div className="space-y-2">
            {questions[currentQuestion].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.correct)}
                className="w-full text-left px-4 py-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-xl text-xs transition-all active:scale-[0.98]"
              >
                {lang === 'en' ? opt.en : opt.kn}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropQuiz;
