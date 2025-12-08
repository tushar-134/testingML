
import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

export default function Step4Skills({ data, update, next, back }) {
  const { language } = useLanguage();
  const t = translations[language].step4Skills;
  const tCommon = translations[language].youthForm;
  const [skill, setSkill] = useState("");

  const addSkill = () => {
    if (!skill.trim()) return;
    const updated = [...(data.skills || []), skill.trim()];
    update({ skills: updated });
    setSkill("");
  };

  const removeSkill = (index) => {
    const updated = data.skills.filter((_, i) => i !== index);
    update({ skills: updated });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-6">{t.title}</h3>

      {/* Input Section */}
      <div className="flex gap-3">
        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder={t.skillPlaceholder}
          className="w-full p-3 border rounded-lg outline-none"
        />

        <button
          onClick={addSkill}
          className="bg-blue-600 text-white px-4 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          {t.addButton}
        </button>
      </div>

      {/* Skill Tags */}
      <div className="mt-6 flex flex-wrap gap-3">
        {data.skills?.length > 0 ? (
          data.skills.map((sk, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full flex items-center gap-2 border border-blue-300"
            >
              {sk}
              <button
                onClick={() => removeSkill(index)}
                className="text-blue-700 hover:text-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">{t.noSkills}</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={back}
          className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300"
        >
          ← {tCommon.back}
        </button>

        <button
          onClick={next}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          {tCommon.save} & {tCommon.next} →
        </button>
      </div>
    </div>
  );
}
