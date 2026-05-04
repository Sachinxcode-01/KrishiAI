import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from "@google/generative-ai";

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

  // Initialize Gemini
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const isKeyValid = apiKey && apiKey !== 'YOUR_API_KEY' && apiKey.startsWith('AIza');
  
  const genAI = new GoogleGenerativeAI(isKeyValid ? apiKey : '');
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `You are KrishiAI, a professional Indian Agronomist and Crop Doctor. 
    Your goal is to help farmers diagnose crop diseases and provide organic and chemical solutions.
    ${context ? `Context: User just scanned ${context.cropName} and found ${context.diseaseName}.` : ''}
    Keep your answers concise, practical, and empathetic.
    Always prioritize solutions available in rural India.
    Current language: ${lang === 'en' ? 'English' : 'Kannada'}.
    If the user speaks Kannada, respond primarily in Kannada.
    If the user asks about a disease, provide name, cause, and 3 treatment steps.`
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        })),
      });

      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: lang === 'en' 
          ? "Sorry, I'm having trouble connecting to my brain right now. Please try again." 
          : "ಕ್ಷಮಿಸಿ, ನನ್ನ ಮೆದುಳಿನೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ." 
      }]);
    } finally {
      setIsTyping(false);
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
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-primary text-background rounded-tr-none shadow-xl shadow-primary/10' 
                  : 'bg-white/5 text-text/90 border border-white/5 rounded-tl-none'
              }`}>
                {m.content}
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
        {!isKeyValid && (
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-amber-200 text-[11px] font-bold text-center">
            ⚠️ GEMINI_API_KEY is missing or invalid in .env
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white/[0.02] border-t border-white/5">
        <div className="relative flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={lang === 'en' ? "Ask Krishi Expert..." : "ಕೃಷಿ ತಜ್ಞರನ್ನು ಕೇಳಿ..."}
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
          Powered by Gemini 1.5 Flash
        </p>
      </div>
    </div>
  );
};

export default ChatBot;
