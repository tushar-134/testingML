// src/homepagecomponents/registration/steps/Step1Personal.jsx
import React from "react";

import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

export default function Step1Personal({ data, update, next }) {
  const { language } = useLanguage();
  const t = translations[language].step1Personal;
  const tCommon = translations[language].youthForm;
  const onChange = (e) => update({ [e.target.name]: e.target.value });

  // basic completion check for enabling Next
  const required = ["fullname", "fatherName", "dob", "gender", "mobile"];
  const isComplete = required.every((k) => data[k] && String(data[k]).trim().length > 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4">{t.title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.fullName} *</label>
          <input
            name="fullname"
            value={data.fullname}
            onChange={onChange}
            className="mt-1 block w-full p-3 border rounded-lg"
            placeholder={t.fullNamePlaceholder}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t.fatherName} *</label>
          <input
            name="fatherName"
            value={data.fatherName}
            onChange={onChange}
            className="mt-1 block w-full p-3 border rounded-lg"
            placeholder={t.fatherNamePlaceholder}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t.dob} *</label>
          <input
            name="dob"
            type="date"
            value={data.dob}
            onChange={onChange}
            className="mt-1 block w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t.gender} *</label>
          <select
            name="gender"
            value={data.gender}
            onChange={onChange}
            className="mt-1 block w-full p-3 border rounded-lg"
          >
            <option value="">{t.gender}</option>
            <option>{t.male}</option>
            <option>{t.female}</option>
            <option>{t.other}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t.category}</label>
          <select
            name="category"
            value={data.category}
            onChange={onChange}
            className="mt-1 block w-full p-3 border rounded-lg"
          >
            <option value="">{t.category}</option>
            <option>{t.categoryGeneral}</option>
            <option>{t.categoryOBC}</option>
            <option>{t.categorySC}</option>
            <option>{t.categoryST}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t.differentlyAbled}</label>
          <select
            name="differentlyAbled"
            value={data.differentlyAbled}
            onChange={onChange}
            className="mt-1 block w-full p-3 border rounded-lg"
          >
            <option>{t.no}</option>
            <option>{t.yes}</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">{t.email}</label>
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={onChange}
            className="mt-1 block w-full p-3 border rounded-lg"
            placeholder={t.emailPlaceholder}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">{t.mobile} *</label>
          <div className="flex gap-2 items-center">
            <input
              name="mobile"
              value={data.mobile}
              onChange={(e) => update({ mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
              className="mt-1 block w-full p-3 border rounded-lg"
              placeholder={t.mobilePlaceholder}
            />
            <input
              name="alternativeMobile"
              value={data.alternativeMobile}
              onChange={(e) => update({ alternativeMobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
              className="mt-1 block w-44 p-3 border rounded-lg"
              placeholder={t.altMobilePlaceholder}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={next}
          disabled={!isComplete}
          className={`px-6 py-3 rounded-lg font-semibold transition ${isComplete ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          {tCommon.save} & {tCommon.next} →
        </button>
      </div>
    </div>
  );
}
