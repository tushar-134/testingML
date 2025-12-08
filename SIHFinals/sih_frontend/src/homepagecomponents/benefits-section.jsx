import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

export default function BenefitsSection() {
  const { language } = useLanguage();
  const t = translations[language].benefits;

  const benefits = [
    { icon: "💼", title: t.benefit1Title, desc: t.benefit1Desc },
    { icon: "💵", title: t.benefit2Title, desc: t.benefit2Desc },
    { icon: "💰", title: t.benefit3Title, desc: t.benefit3Desc },
    { icon: "🎯", title: t.benefit4Title, desc: t.benefit4Desc },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          {t.heading} <span className="text-orange-500">{t.headingHighlight}</span>
        </h2>

        <div className="grid grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}