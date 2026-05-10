import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithAssistant } from '../utils/api';
import { 
  Cpu, 
  Activity, 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Zap,
  Terminal
} from 'lucide-react';

const ChatBot = ({ lang, context }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Initialize Messages with Context if available
  useEffect(() => {
    if (messages.length === 0) {
      let initialMsg = lang === 'en' 
        ? "Neural link active. I am your Krishi AI Assistant. Provide parameters for analysis." 
        : "ನರ ಸಂಪರ್ಕ ಸಕ್ರಿಯವಾಗಿದೆ. ನಾನು ನಿಮ್ಮ ಕೃಷಿ AI ಸಹಾಯಕ. ವಿಶ್ಲೇಷಣೆಗಾಗಿ ನಿಯತಾಂಕಗಳನ್ನು ಒದಗಿಸಿ.";

      if (context) {
        initialMsg = lang === 'en'
          ? `Specimen scan detected: ${context.diseaseName} on ${context.cropName}. Initializing management protocols.`
          : `${context.cropNameKannada} ಬೆಳೆಯಲ್ಲಿ ${context.diseaseNameKannada} ಪತ್ತೆಯಾಗಿದೆ. ನಿರ್ವಹಣಾ ಪ್ರೋಟೋಕಾಲ್‌ಗಳನ್ನು ಪ್ರಾರಂಭಿಸಲಾಗುತ್ತಿದೆ.`;
      }

      setMessages([{ role: 'assistant', content: initialMsg }]);
    }
  }, [context, lang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = lang === 'kn' ? 'kn-IN' : 'en-IN';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setInput(transcript);
      };

      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onerror = () => setIsListening(false);
    }
  }, [lang]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    let accumulatedResponse = '';
    
    try {
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      await chatWithAssistant(input, context, lang, (chunk) => {
        accumulatedResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = accumulatedResponse;
          return newMessages;
        });
      });
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: lang === 'en' 
          ? "CRITICAL_ERROR: Neural link interrupted. Re-establishing link..." 
          : "ಗಂಭೀರ_ದೋಷ: ಸಂಪರ್ಕ ಕಡಿತಗೊಂಡಿದೆ. ಮರುಸ್ಥಾಪಿಸಲಾಗುತ್ತಿದೆ..." 
      }]);
    } finally {
      setIsTyping(false);
      if (accumulatedResponse) speak(accumulatedResponse);
    }
  };

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const startSpeech = () => {
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
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = startSpeech;
    } else {
      startSpeech();
    }
  };

  return (
    <div className="card-premium h-[700px] flex flex-col p-0 overflow-hidden relative border-white/5 bg-surface/40 scanner-glow">
      {/* Console Header */}
      <div className="p-8 border-b border-white/10 bg-black/40 flex items-center justify-between relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="flex items-center gap-6">
          <div className="size-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Cpu className="size-8 text-primary animate-pulse" />
          </div>
          <div>
            <h3 className="text-white font-black tracking-tighter text-2xl uppercase italic">
              Neural <span className="text-primary">Core</span>
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1.5">
                <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] text-primary font-black uppercase tracking-[0.3em]">Synapse_Active</span>
              </div>
              <div className="h-2 w-px bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Activity className="size-3 text-white/40" />
                <span className="text-[9px] text-white/40 font-black uppercase tracking-[0.3em]">Llama_3.2_Engaged</span>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => window.speechSynthesis.cancel()}
          className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group"
        >
          <VolumeX className="size-5 text-white/40 group-hover:text-primary transition-colors" />
        </button>
      </div>

      {/* Neural Stream Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar specimen-grid"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-3 px-2">
                <span className={`text-[8px] font-black uppercase tracking-[0.4em] ${m.role === 'user' ? 'text-primary' : 'text-white/40'}`}>
                  {m.role === 'user' ? 'AUTH_USER' : 'INTELLIGENCE_AGENT'}
                </span>
                <div className={`h-px w-8 ${m.role === 'user' ? 'bg-primary/40' : 'bg-white/10'}`} />
              </div>
              
              <div className={`relative group max-w-[90%] p-6 rounded-3xl text-[13px] font-medium leading-relaxed tracking-wide ${
                m.role === 'user' 
                  ? 'bg-primary text-black rounded-tr-none shadow-[0_10px_40px_rgba(16,185,129,0.2)]' 
                  : 'bg-white/5 text-text/90 border border-white/10 backdrop-blur-xl rounded-tl-none'
              }`}>
                {m.content}
                {m.role === 'assistant' && (
                  <button 
                    onClick={() => speak(m.content)}
                    className="absolute -right-14 top-1/2 -translate-y-1/2 size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:border-primary/50"
                  >
                    <Volume2 className="size-5 text-primary" />
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
              <div className="flex items-center gap-2 mb-3 px-2">
                <span className="text-[8px] font-black text-primary uppercase tracking-[0.4em]">Processing</span>
                <span className="size-1 bg-primary rounded-full animate-ping" />
              </div>
              <div className="bg-white/5 p-6 rounded-3xl rounded-tl-none border border-white/10 flex gap-2">
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
        </AnimatePresence>
      </div>

      {/* Input Matrix */}
      <div className="p-8 bg-black/40 border-t border-white/10 relative">
        <div className="flex items-center gap-4 relative">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleListening}
            className={`size-16 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
              isListening 
                ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-pulse' 
                : 'bg-white/5 border-white/10 text-white/40 hover:border-primary/50 hover:text-primary'
            }`}
          >
            {isListening ? <MicOff className="size-7" /> : <Mic className="size-7" />}
          </motion.button>
          
          <div className="flex-1 relative group">
            <div className="absolute inset-0 bg-primary/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening 
                ? "AWAITING_INPUT..." 
                : "SPECIFY_QUERY..."
              }
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-[13px] text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20 font-mono tracking-wider"
            />
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={isTyping}
            className="size-16 bg-primary text-black rounded-2xl flex items-center justify-center transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] disabled:opacity-20"
          >
            <Send className="size-7" />
          </motion.button>
        </div>
        
        <div className="mt-6 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <Zap className="size-3 text-primary animate-pulse" />
            <span className="text-[8px] text-primary/40 font-black uppercase tracking-[0.4em]">
              Llama_3.2_Vision_Sync
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Terminal className="size-3 text-white/20" />
            <span className="text-[8px] text-white/20 font-black uppercase tracking-[0.4em]">
              Node: Global-Alpha-01
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

