
import React from "react";
import { User, MapPin, GraduationCap, FileText, Zap, CheckCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

export default function ProgressBar({ step = 1 }) {
  const { language } = useLanguage();
  const t = translations[language].progressBar;

  const steps = [
    { id: 1, label: t.personal, icon: User },
    { id: 2, label: t.address, icon: MapPin },
    { id: 3, label: t.education, icon: GraduationCap },
    { id: 4, label: t.skills, icon: Zap },
    { id: 5, label: t.documents, icon: FileText },
    { id: 6, label: t.review, icon: CheckCircle }
  ];

  const percent = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Progress Line with Dots */}
      <div className="relative mb-8">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 rounded-full" />

        {/* Active Progress Line */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 -translate-y-1/2 rounded-full transition-all duration-500 ease-out shadow-lg shadow-orange-300/50"
          style={{ width: `${percent}%` }}
        />

        {/* Step Indicators */}
        <div className="relative flex justify-between">
          {steps.map((s) => {
            const Icon = s.icon;
            const isCompleted = step > s.id;
            const isCurrent = step === s.id;
            const isUpcoming = step < s.id;

            return (
              <div key={s.id} className="flex flex-col items-center">
                {/* Circle with Icon */}
                <div
                  className={`
                    relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                    transition-all duration-300 transform
                    ${isCompleted
                      ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white scale-100 shadow-lg shadow-orange-300/50"
                      : isCurrent
                        ? "bg-white border-4 border-orange-500 text-orange-600 scale-110 shadow-xl animate-pulse"
                        : "bg-white border-2 border-gray-300 text-gray-400 scale-90"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Label */}
                <span
                  className={`
                    mt-3 text-xs sm:text-sm font-medium transition-all duration-300
                    ${isCompleted || isCurrent
                      ? "text-gray-800 font-semibold"
                      : "text-gray-500"
                    }
                  `}
                >
                  {s.label}
                </span>

                {/* Step Number Badge (for completed steps) */}
                {isCompleted && (
                  <div className="mt-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Percentage */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-orange-100 rounded-full">
          <span className="text-sm font-semibold text-orange-700">
            {Math.round(percent)}% Complete
          </span>
          <div className="w-16 h-2 bg-white rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
