import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Language Context
const LanguageContext = createContext();

// Export hook for easy access
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Language Provider Component
export const LanguageProvider = ({ children }) => {
    // Initialize language from localStorage or default to 'en'
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('app_language') || 'en';
    });

    // Update localStorage when language changes
    useEffect(() => {
        localStorage.setItem('app_language', language);
    }, [language]);

    // Function to switch language
    const switchLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const value = {
        language,
        switchLanguage,
        isHindi: language === 'hi',
        isEnglish: language === 'en'
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
