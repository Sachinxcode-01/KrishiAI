import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithAssistant } from '../utils/api';
import { 
  MessageSquare, 
  X, 
  Send, 
  Cpu, 
  Activity,
  Zap,
  Volume2,
  Terminal
} from 'lucide-react';
import { useDiagnosis } from '../context/DiagnosisContext';

const FloatingChatbot = ({ lang = 'en' }) => {
  const { latestDiagnosis } = useDiagnosis();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Initialize Messages
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMsg = lang === 'en' 
        ? "Neural link active. I am your Krishi AI Assistant. How can I assist you with your farming today?" 
        : "ನರ ಸಂಪರ್ಕ ಸಕ್ರಿಯವಾಗಿದೆ. ನಾನು ನಿಮ್ಮ ಕೃಷಿ AI ಸಹಾಯಕ. ಇಂದು ನಿಮ್ಮ ಕೃಷಿಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ?";
      
      setMessages([{ role: 'assistant', content: initialMsg }]);
    }
  }, [isOpen, lang, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    let accumulatedResponse = '';
    
    try {
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      
      // Inject context if available
      const contextString = latestDiagnosis 
        ? `LATEST DIAGNOSIS SCANNED: ${JSON.stringify(latestDiagnosis)}` 
        : null;

      await chatWithAssistant(input, contextString, lang, (chunk) => {
        accumulatedResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = accumulatedResponse;
          return newMessages;
        });
      });

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: lang === 'en' 
          ? "CRITICAL_ERROR: AI Neural link interrupted. Ensure your backend server (localhost:5000) is running." 
          : "ಗಂಭೀರ_ದೋಷ: ಸಂಪರ್ಕ ಕಡಿತಗೊಂಡಿದೆ. ದಯವಿಟ್ಟು ಸರ್ವರ್ ಚಾಲನೆಯಲ್ಲಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    if (lang === 'kn') {
      const knVoice = voices.find(v => v.lang.startsWith('kn') || v.name.toLowerCase().includes('kannada'));
      if (knVoice) utterance.voice = knVoice;
    } else {
      const enInVoice = voices.find(v => v.lang === 'en-IN') || voices.find(v => v.lang.startsWith('en'));
      if (enInVoice) utterance.voice = enInVoice;
    }
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] h-[75vh] max-h-[600px] z-[9999] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/10 bg-black/80 backdrop-blur-3xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 bg-black/60 flex items-center justify-between relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl overflow-hidden border border-primary/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <img src="/krishiAI.png" alt="Krishi AI" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-white font-black tracking-tighter text-sm uppercase italic">
                    Gemini <span className="text-primary">AI Core</span>
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[7px] text-primary font-black uppercase tracking-[0.3em]">Online</span>
                    <div className="h-2 w-px bg-white/10 mx-1" />
                    <Activity className="size-3 text-white/40" />
                    <span className="text-[7px] text-white/40 font-black uppercase tracking-[0.3em]">1.5_Flash</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar bg-gradient-to-b from-white/[0.02] to-transparent"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <span className={`text-[7px] font-black uppercase tracking-[0.4em] ${m.role === 'user' ? 'text-primary' : 'text-white/40'}`}>
                      {m.role === 'user' ? 'USER' : 'AI_AGENT'}
                    </span>
                  </div>
                  
                  <div className={`relative group max-w-[85%] p-4 rounded-2xl text-[12px] font-medium leading-relaxed tracking-wide ${
                    m.role === 'user' 
                      ? 'bg-primary text-black rounded-tr-none shadow-[0_5px_20px_rgba(16,185,129,0.15)]' 
                      : 'bg-white/5 text-white/90 border border-white/10 backdrop-blur-xl rounded-tl-none'
                  }`}>
                    {m.content}
                    {m.role === 'assistant' && (
                      <button 
                        onClick={() => speak(m.content)}
                        className="absolute -right-10 top-1/2 -translate-y-1/2 size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:border-primary/50"
                      >
                        <Volume2 className="size-4 text-primary" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-start"
                >
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <span className="text-[7px] font-black text-primary uppercase tracking-[0.4em]">Processing</span>
                    <span className="size-1 bg-primary rounded-full animate-ping" />
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="size-1.5 bg-primary rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/60 border-t border-white/10 relative">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative group">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask Krishi AI..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[12px] text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20 font-mono"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={isTyping}
                  className="size-10 bg-primary text-black rounded-xl flex items-center justify-center transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50"
                >
                  <Send className="size-5" />
                </motion.button>
              </div>
              
              <div className="mt-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Zap className="size-3 text-primary animate-pulse" />
                  <span className="text-[6px] text-primary/40 font-black uppercase tracking-[0.4em]">
                    Powered by Google Gemini
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 z-[9999] size-14 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)] border-2 border-black/20"
      >
        {isOpen ? (
          <X className="size-6 text-black" />
        ) : (
          <MessageSquare className="size-6 text-black" />
        )}
        
        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute top-0 right-0 size-3 bg-red-500 rounded-full border-2 border-black animate-pulse" />
        )}
      </motion.button>
    </>
  );
};

export default FloatingChatbot;
