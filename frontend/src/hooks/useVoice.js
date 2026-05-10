import { useState, useCallback } from 'react';

export const useVoice = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback((text, lang = 'en-IN') => {
    if (!window.speechSynthesis) return;

    // Stop any existing speech
    stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.88;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [stop]);

  return {
    speak,
    stop,
    isSpeaking
  };
};
