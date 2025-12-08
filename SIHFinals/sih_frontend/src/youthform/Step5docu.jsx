// src/homepagecomponents/registration/steps/Step4Documents.jsx
import React, { useState } from "react";
import { Plus, Trash2, UploadCloud } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

// Convert file to Base64
function toBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res({ data: reader.result, name: file.name, size: file.size, type: file.type });
    reader.onerror = (err) => rej(err);
  });
}

export default function Step4Documents({ data, update, next, back }) {
  const { language } = useLanguage();
  const t = translations[language].step5Documents;
  const tCommon = translations[language].youthForm;
  const [exp, setExp] = useState({
    company: "",
    role: "",
    duration: "",
    description: "",
  });

  const onChange = (e) => setExp({ ...exp, [e.target.name]: e.target.value });

  const addExperience = () => {
    if (!exp.company || !exp.role || !exp.duration) {
      alert("Please fill Company, Role & Duration.");
      return;
    }

    const updated = [...(data.experienceList || []), exp];
    update({ experienceList: updated });

    setExp({ company: "", role: "", duration: "", description: "" });
  };

  const deleteExp = (index) => {
    const updated = data.experienceList.filter((_, i) => i !== index);
    update({ experienceList: updated });
  };

  const handleFile = async (e, key, allowedTypes) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type!");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File too large (max 5MB)");
      return;
    }

    const base = await toBase64(file);
    update({ documents: { ...data.documents, [key]: base } });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-6">{t.title}</h3>

      {/* ---------- AADHAR CARD UPLOAD ---------- */}
      <div className="mb-6">
        <label className="font-semibold">{t.uploadAadhar} (PDF / JPG / PNG)</label>

        <div className="flex items-center gap-4 mt-2">
          <label className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-200">
            <UploadCloud size={20} />
            <span>{t.uploadAadhar}</span>
            <input
              type="file"
              className="hidden"
              accept="application/pdf,image/*"
              onChange={(e) => handleFile(e, "aadhar", ["application/pdf", "image/jpeg", "image/png"])}
            />
          </label>
        </div>

        {data.documents?.aadhar && (
          <p className="text-sm text-green-700 mt-2">
            Uploaded: {data.documents.aadhar.name}
          </p>
        )}
      </div>

      {/* ---------- PASSPORT PHOTO UPLOAD ---------- */}
      <div className="mb-8">
        <label className="font-semibold">{t.uploadPhoto} (JPG / PNG)</label>

        <div className="flex items-center gap-4 mt-2">
          <label className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-200">
            <UploadCloud size={20} />
            <span>{t.uploadPhoto}</span>
            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/png"
              onChange={(e) => handleFile(e, "photo", ["image/jpeg", "image/png"])}
            />
          </label>
        </div>

        {data.documents?.photo && (
          <p className="text-sm text-green-700 mt-2">
            Uploaded: {data.documents.photo.name}
          </p>
        )}
      </div>

      {/* ---------- EXPERIENCE SECTION ---------- */}
      <h3 className="text-lg font-semibold mb-3">{t.workExperience} (Optional)</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          name="company"
          value={exp.company}
          onChange={onChange}
          placeholder={t.companyPlaceholder}
          className="p-3 border rounded-lg"
        />

        <input
          name="role"
          value={exp.role}
          onChange={onChange}
          placeholder={t.rolePlaceholder}
          className="p-3 border rounded-lg"
        />

        <input
          name="duration"
          value={exp.duration}
          onChange={onChange}
          placeholder={t.durationPlaceholder}
          className="p-3 border rounded-lg"
        />

        <textarea
          name="description"
          value={exp.description}
          onChange={onChange}
          rows="3"
          placeholder={t.descriptionPlaceholder}
          className="p-3 border rounded-lg md:col-span-3"
        ></textarea>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={addExperience}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> {t.addExperience}
        </button>
      </div>

      {/* ---------- EXPERIENCE LIST ---------- */}
      {data.experienceList?.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Saved Experience</h4>

          {data.experienceList.map((exp, index) => (
            <div key={index} className="p-4 border rounded-xl bg-gray-50 mb-3 shadow-sm">
              <div className="flex justify-between">
                <h5 className="font-semibold">Experience {index + 1}</h5>
                <button onClick={() => deleteExp(index)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </div>

              <ul className="mt-2 text-sm grid grid-cols-1 md:grid-cols-3 gap-2">
                <li><strong>{t.company}:</strong> {exp.company}</li>
                <li><strong>{t.role}:</strong> {exp.role}</li>
                <li><strong>{t.duration}:</strong> {exp.duration}</li>
                <li className="md:col-span-3">
                  <strong>{t.description}:</strong> {exp.description || "—"}
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* ---------- NAV BUTTONS ---------- */}
      <div className="flex justify-between mt-10">
        <button onClick={back} className="bg-gray-300 px-6 py-3 rounded-lg">
          ← {tCommon.back}
        </button>

        <button
          onClick={next}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          {tCommon.save} & {tCommon.next} →
        </button>
      </div>
    </div>
  );
}
