import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

export default function EligibilitySection() {
  const { language } = useLanguage();
  const t = translations[language].eligibility;

  const criteria = [
    { icon: "👤", title: t.ageTitle, desc: t.ageDesc },
    { icon: "💼", title: t.jobTitle, desc: t.jobDesc },
    { icon: "🎓", title: t.educationTitle, desc: t.educationDesc },
    { icon: "👨‍👩‍👧", title: t.incomeTitle, desc: t.incomeDesc },
  ]

  return (
    <section id="eligibility" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          {t.heading} <span className="text-orange-500">{t.headingHighlight}</span>
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {criteria.map((item, idx) => (
            <div key={idx} className="bg-gray-100 p-8 rounded-lg text-center">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold text-orange-500 mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}