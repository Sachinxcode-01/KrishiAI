import React from 'react';
import { translations } from '../utils/translations';

const ErrorScreen = ({ lang, message, onRetry }) => {
  const t = translations[lang];

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-6">
      <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center text-4xl">
        ⚠️
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-white">{t.error}</h2>
        <p className="text-text/60 text-sm">{message || 'An unexpected error occurred'}</p>
      </div>
      <button
        onClick={onRetry}
        className="btn-primary bg-error/20 hover:bg-error/30 text-error border border-error/20"
      >
        🔄 {t.retry}
      </button>
    </div>
  );
};

export default ErrorScreen;
