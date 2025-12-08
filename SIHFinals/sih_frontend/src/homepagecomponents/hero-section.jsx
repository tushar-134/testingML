import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

export default function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 flex gap-12 items-center">
        <div className="flex-1">
          <h2 className="text-5xl font-bold mb-4">{t.title1}</h2>
          <h3 className="text-4xl font-bold mb-6">{t.title2}</h3>
          <div className="bg-orange-500 inline-block px-6 py-2 rounded font-italic mb-6">
            {t.subtitle}
          </div>
          <p className="text-lg mb-8">
            {t.description}
          </p>
          <button className="bg-orange-500 text-white px-8 py-4 rounded font-bold text-lg hover:bg-orange-600 transition">
            {t.cta}
          </button>
        </div>
        <div className="flex-1">
          <div className="w-full h-80 bg-purple-700 rounded-lg flex items-center justify-center">
            <span className="text-6xl">👔</span>
          </div>
        </div>
      </div>
    </section>
  )
}
