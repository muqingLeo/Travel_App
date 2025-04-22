import React, { createContext, useState, useContext, useEffect } from 'react';
import i18n from '../utils/i18n';

// Create context
const LocaleContext = createContext();

// Locale Provider component
export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en');

  // Update i18n when locale changes
  useEffect(() => {
    i18n.changeLanguage(locale);
    localStorage.setItem('locale', locale);
  }, [locale]);

  // Change locale function
  const changeLocale = (newLocale) => {
    if (newLocale === locale) return;
    setLocale(newLocale);
  };

  const contextValue = {
    locale,
    changeLocale,
    isRTL: ['ar', 'he'].includes(locale) // For right-to-left languages
  };

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
};

// Custom hook to use the locale context
export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};