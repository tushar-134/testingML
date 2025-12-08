// src/homepagecomponents/registration/steps/Step2Address.jsx
import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

export default function Step2Address({ data, update, next, back }) {
  const { language } = useLanguage();
  const t = translations[language].step2Address;
  const tCommon = translations[language].youthForm;
  const [sameAsPermanent, setSameAsPermanent] = useState(false);

  const onChange = (e) => update({ [e.target.name]: e.target.value });

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setSameAsPermanent(isChecked);

    if (isChecked) {
      // Copy permanent address to correspondence address
      update({
        corrAddress: data.permAddress,
        corrDistrict: data.permDistrict,
        corrState: data.permState,
        corrPincode: data.permPincode,
      });
    } else {
      // Clear correspondence address when unchecked
      update({
        corrAddress: "",
        corrDistrict: "",
        corrState: "",
        corrPincode: "",
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4">{t.title}</h3>

      <h4 className="font-semibold text-gray-700 mb-2">{t.permanentAddress}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          name="permAddress"
          value={data.permAddress}
          onChange={onChange}
          placeholder={t.addressPlaceholder}
          className="p-3 border rounded-lg md:col-span-2"
        />
        <input
          name="permDistrict"
          value={data.permDistrict}
          onChange={onChange}
          placeholder={t.districtPlaceholder}
          className="p-3 border rounded-lg"
        />
        <input
          name="permState"
          value={data.permState}
          onChange={onChange}
          placeholder={t.statePlaceholder}
          className="p-3 border rounded-lg"
        />
        <input
          name="permPincode"
          value={data.permPincode}
          onChange={onChange}
          placeholder={t.pincodePlaceholder}
          className="p-3 border rounded-lg"
        />
      </div>

      {/* Checkbox to copy permanent address */}
      <div className="mt-6 mb-4 flex items-center">
        <input
          type="checkbox"
          id="sameAsPermanent"
          checked={sameAsPermanent}
          onChange={handleCheckboxChange}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        />
        <label
          htmlFor="sameAsPermanent"
          className="ml-3 text-gray-700 font-medium cursor-pointer select-none"
        >
          {t.sameAsPermanent}
        </label>
      </div>

      <h4 className="font-semibold text-gray-700 mb-2">{t.correspondenceAddress}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          name="corrAddress"
          value={data.corrAddress}
          onChange={onChange}
          placeholder={t.addressPlaceholder}
          className="p-3 border rounded-lg md:col-span-2"
          disabled={sameAsPermanent}
        />
        <input
          name="corrDistrict"
          value={data.corrDistrict}
          onChange={onChange}
          placeholder={t.districtPlaceholder}
          className="p-3 border rounded-lg"
          disabled={sameAsPermanent}
        />
        <input
          name="corrState"
          value={data.corrState}
          onChange={onChange}
          placeholder={t.statePlaceholder}
          className="p-3 border rounded-lg"
          disabled={sameAsPermanent}
        />
        <input
          name="corrPincode"
          value={data.corrPincode}
          onChange={onChange}
          placeholder={t.pincodePlaceholder}
          className="p-3 border rounded-lg"
          disabled={sameAsPermanent}
        />
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={back} className="bg-gray-300 px-6 py-2 rounded-lg">← {tCommon.back}</button>
        <button onClick={next} className="bg-blue-600 text-white px-6 py-2 rounded-lg">{tCommon.next} →</button>
      </div>
    </div>
  );
}
