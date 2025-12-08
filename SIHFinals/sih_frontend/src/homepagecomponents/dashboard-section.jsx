import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

export default function DashboardSection() {
  const { language } = useLanguage();
  const t = translations[language].dashboardSection;
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="text-orange-500">—</span> {t.title} <span className="text-orange-500">—</span>
        </h2>

        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="w-40 h-40 bg-blue-100 rounded mx-auto mb-4 flex items-center justify-center">
              <span className="text-6xl">🗺️</span>
            </div>
            <p className="text-center text-gray-600 text-sm">{t.mapDescription}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-pink-100 p-8 rounded-lg">
            <div className="text-5xl font-bold text-blue-900 mb-2">118K+</div>
            <p className="text-xl font-semibold text-gray-800">{t.internshipOpportunities}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-900">25</div>
              <p className="text-sm text-gray-700">{t.states}</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-900">36</div>
              <p className="text-sm text-gray-700">{t.sectors}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
