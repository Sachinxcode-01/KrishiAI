import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('app_lang') || 'kn');

  const toggleLanguage = () => {
    setLang((prev) => {
      const next = prev === 'en' ? 'kn' : 'en';
      localStorage.setItem('app_lang', next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
