import React from 'react';
import { useVoice } from '../hooks/useVoice';
import { translations } from '../utils/translations';

const VoiceOutput = ({ lang, data }) => {
  const { speak, stop, isSpeaking } = useVoice();
  const t = translations[lang];

  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
      return;
    }

    const crop = lang === 'en' ? data.cropName : data.cropNameKannada;
    const disease = lang === 'en' ? data.diseaseName : data.diseaseNameKannada;
    const description = lang === 'en' ? data.description : data.descriptionKannada;
    const medicine = lang === 'en' ? data.medicineAdvice : data.medicineAdviceKannada;

    const fullText = `${crop}. ${disease}. ${description}. ${t.medicine}: ${medicine}.`;
    speak(fullText, lang === 'en' ? 'en-IN' : 'kn-IN');
  };

  return (
    <button
      onClick={handleSpeak}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 w-full shadow-lg
        ${isSpeaking ? 'bg-error text-white animate-pulse' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}
      `}
    >
      <span>{isSpeaking ? '⏹️' : '🔊'}</span>
      <span>{isSpeaking ? (lang === 'en' ? 'Stop' : 'ನಿಲ್ಲಿಸಿ') : t.listenBtn}</span>
    </button>
  );
};

export default VoiceOutput;
