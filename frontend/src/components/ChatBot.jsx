import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithAssistant } from '../utils/api';
import { useVoice } from '../hooks/useVoice';

const ChatBot = ({ lang, context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { speak } = useVoice();
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithAssistant(input, context, lang);
      const assistantMsg = { role: 'assistant', text: response.data.answer };
      setMessages(prev => [...prev, assistantMsg]);
      
      // Auto-speak the response
      speak(response.data.answer, lang);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: lang === 'en' ? 'Sorry, I am having trouble connecting.' : 'ಕ್ಷಮಿಸಿ, ಸಂಪರ್ಕದಲ್ಲಿ ಸಮಸ್ಯೆಯಿದೆ.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-[320px] max-h-[450px] bg-surface/90 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-primary/10 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-lg">🤖</div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-widest">Krishi AI Assistant</h4>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] text-primary font-bold uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-text/40 hover:text-white text-lg">✕</button>
            </div>

            {/* Chat Area */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[250px] scroll-smooth">
              {messages.length === 0 && (
                <div className="text-center py-10 opacity-30">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]">{lang === 'en' ? 'Ask me anything about this diagnosis!' : 'ಈ ರೋಗದ ಬಗ್ಗೆ ಏನು ಬೇಕಾದರೂ ಕೇಳಿ!'}</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${
                    msg.role === 'user' ? 'bg-primary text-background' : 'bg-white/5 text-text/90'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl flex gap-1">
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white/5 border-t border-white/5 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'en' ? "Type a question..." : "ಪ್ರಶ್ನೆ ಕೇಳಿ..."}
                className="flex-1 bg-black/20 border border-white/5 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary/30"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-background text-sm font-bold disabled:opacity-50"
              >
                ➔
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-background rounded-full shadow-2xl flex items-center justify-center text-2xl relative"
      >
        {isOpen ? '✕' : '💬'}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full border-2 border-background flex items-center justify-center text-[8px] font-black text-white">1</span>
        )}
      </motion.button>
    </div>
  );
};

export default ChatBot;
