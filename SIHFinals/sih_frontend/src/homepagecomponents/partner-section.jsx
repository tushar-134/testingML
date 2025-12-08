import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

export default function PartnersSection() {
  const { language } = useLanguage();
  const t = translations[language].partnerSection;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="text-orange-500">—</span> {t.title} <span className="text-orange-500">—</span>
        </h2>

        <div className="flex justify-center items-center gap-12">
          <div className="text-center">
            <div className="w-40 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4 border-2 border-gray-800">
              <span className="font-bold text-2xl text-gray-800">CII</span>
            </div>
          </div>
          <div className="text-center">
            <div className="w-40 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <span className="font-bold text-2xl text-orange-500">FICCI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
