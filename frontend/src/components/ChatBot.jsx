import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithAssistant } from '../utils/api';

const ChatBot = ({ lang, context }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Initialize Messages with Context if available
  useEffect(() => {
    if (messages.length === 0) {
      let initialMsg = lang === 'en' 
        ? "Hello! I am your Krishi AI Assistant. How can I help with your crops today?" 
        : "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕೃಷಿ AI ಸಹಾಯಕ. ಇಂದು ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?";

      if (context) {
        initialMsg = lang === 'en'
          ? `I see we've identified ${context.diseaseName} on your ${context.cropName}. How can I help you manage this?`
          : `${context.cropNameKannada} ಬೆಳೆಯಲ್ಲಿ ${context.diseaseNameKannada} ಪತ್ತೆಯಾಗಿದೆ. ಇದರ ನಿರ್ವಹಣೆಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`;
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

  // Initialize Speech Recognition
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

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
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
      // Add an empty assistant message to fill with stream
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
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: lang === 'en' 
          ? "Sorry, I'm having trouble connecting to my brain right now. Please try again." 
          : "ಕ್ಷಮಿಸಿ, ನನ್ನ ಮೆದುಳಿನೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ." 
      }]);
    } finally {
      setIsTyping(false);
      if (accumulatedResponse) {
        speak(accumulatedResponse);
      }
    }
  };

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    
    // Stop any existing speech
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

      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = startSpeech;
    } else {
      startSpeech();
    }
  };


  return (
    <div className="card-premium h-[600px] flex flex-col p-0 overflow-hidden relative border-white/5 bg-black/20">
      {/* Chat Header */}
      <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl shadow-inner">
            🤖
          </div>
          <div>
            <h3 className="text-white font-black tracking-tight text-lg">Krishi <span className="text-primary italic">Expert</span></h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">Active Neural Link</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => window.speechSynthesis.cancel()}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl hover:bg-white/10 transition-all"
          title="Stop Speaking"
        >
          🔇
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`relative group max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-primary text-background rounded-tr-none shadow-xl shadow-primary/10' 
                  : 'bg-white/5 text-text/90 border border-white/5 rounded-tl-none'
              }`}>
                {m.content}
                {m.role === 'assistant' && (
                  <button 
                    onClick={() => speak(m.content)}
                    className="absolute -right-10 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-background"
                    title="Speak message"
                  >
                    🔊
                  </button>
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white/[0.02] border-t border-white/5">
        <div className="relative flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleListening}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-lg transition-all ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse shadow-red-500/20' 
                : 'bg-white/5 text-text/50 hover:bg-white/10'
            }`}
          >
            {isListening ? '🛑' : '🎤'}
          </motion.button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isListening 
              ? (lang === 'en' ? "Listening..." : "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...") 
              : (lang === 'en' ? "Ask Krishi Expert..." : "ಕೃಷಿ ತಜ್ಞರನ್ನು ಕೇಳಿ...")
            }
            className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted/50"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={isTyping}
            className="w-14 h-14 bg-primary text-background rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all disabled:opacity-50"
          >
            🚀
          </motion.button>
        </div>
        <p className="text-[10px] text-muted text-center mt-4 uppercase tracking-[0.2em] font-bold opacity-30">
          Powered by NVIDIA AI (Llama 3.2 & Whisper v3)
        </p>
      </div>
    </div>
  );
};

export default ChatBot;
