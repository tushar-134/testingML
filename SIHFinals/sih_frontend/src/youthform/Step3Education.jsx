// src/homepagecomponents/registration/steps/Step3Education.jsx
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

export default function Step3Education({ data, update, next, back }) {
  const { language } = useLanguage();
  const t = translations[language].step3Education;
  const tCommon = translations[language].youthForm;
  const [entry, setEntry] = useState({
    qualification: "",
    course: "",
    stream: "",
    board: "",
    institute: "",
    passingYear: "",
    marksType: "",
    score: "",
    certificate: null
  });

  // LOCAL ENTRY CHANGE
  const onLocalChange = (e) => {
    const { name, value, files } = e.target;
    setEntry((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const addEntry = () => {
    if (
      !entry.qualification ||
      !entry.course ||
      !entry.board ||
      !entry.institute ||
      !entry.passingYear ||
      !entry.marksType ||
      !entry.score
    ) {
      alert("Please fill all required fields before saving.");
      return;
    }

    const newList = [...(data.educationList || []), entry];
    update({ educationList: newList });

    // Clear local form
    setEntry({
      qualification: "",
      course: "",
      stream: "",
      board: "",
      institute: "",
      passingYear: "",
      marksType: "",
      score: "",
      certificate: null
    });

    alert("Qualification added ✔");
  };

  const deleteEntry = (idx) => {
    const newList = data.educationList.filter((_, i) => i !== idx);
    update({ educationList: newList });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-6">{t.title}</h3>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Qualification Dropdown */}
        <div>
          <label className="block text-sm font-semibold mb-1">{t.qualification} *</label>
          <select
            name="qualification"
            value={entry.qualification}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
          >
            <option value="">{t.qualificationPlaceholder}</option>
            <option>10th</option>
            <option>12th</option>
            <option>Diploma</option>
            <option>Graduation</option>
            <option>Post Graduation</option>
          </select>
        </div>

        {/* Course */}
        <div>
          <label className="block text-sm font-semibold mb-1">{t.course} *</label>
          <select
            name="course"
            value={entry.course}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
          >
            <option value="">{t.coursePlaceholder}</option>
            <option>All Subjects</option>
            <option>Science</option>
            <option>Commerce</option>
            <option>Arts</option>
            <option>Computer Science</option>
            <option>Engineering</option>
          </select>
        </div>

        {/* Stream */}
        <div>
          <label className="block text-sm font-semibold mb-1">{t.stream}</label>
          <select
            name="stream"
            value={entry.stream}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
          >
            <option value="">{t.streamPlaceholder}</option>
            <option>NA</option>
            <option>PCM</option>
            <option>PCB</option>
            <option>Maths</option>
            <option>Computer Science</option>
          </select>
        </div>

        {/* Board / University */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            {t.board} *
          </label>
          <input
            name="board"
            value={entry.board}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
            placeholder={t.boardPlaceholder}
          />
        </div>

        {/* Institute */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            {t.institute} *
          </label>
          <input
            name="institute"
            value={entry.institute}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
            placeholder={t.institutePlaceholder}
          />
        </div>

        {/* Year of Passing */}
        <div>
          <label className="block text-sm font-semibold mb-1">{t.passingYear} *</label>
          <select
            name="passingYear"
            value={entry.passingYear}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
          >
            <option value="">{t.passingYearPlaceholder}</option>
            {Array.from({ length: 30 }, (_, i) => 2025 - i).map((yr) => (
              <option key={yr}>{yr}</option>
            ))}
          </select>
        </div>

        {/* Marks Obtained */}
        <div>
          <label className="block text-sm font-semibold mb-1">{t.marksObtained} *</label>
          <select
            name="marksType"
            value={entry.marksType}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
          >
            <option value="">{t.marksTypePlaceholder}</option>
            <option>Percentage</option>
            <option>CGPA</option>
            <option>Grade</option>
          </select>
        </div>

        {/* CGPA / Score */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            {t.score} *
          </label>
          <input
            name="score"
            value={entry.score}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
            placeholder={t.scorePlaceholder}
          />
        </div>

        {/* Certificate Upload */}
        <div>
          <label className="block text-sm font-semibold mb-1">{t.certificate} *</label>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            name="certificate"
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
          />
          <p className="text-xs text-gray-500 mt-1">
            {t.certificateNote}
          </p>
        </div>
      </div>

      {/* Save + Add More */}
      <div className="flex justify-end mt-6">
        <button
          onClick={addEntry}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          {t.saveAddMore}
        </button>
      </div>

      {/* LIST OF ADDED QUALIFICATIONS */}
      {data.educationList?.length > 0 && (
        <div className="mt-8">
          {data.educationList.map((q, index) => (
            <div key={index} className="p-4 border rounded-xl mb-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold">{t.qualificationLabel} {index + 1}</h4>
                <button
                  onClick={() => deleteEntry(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <p><strong>{t.qualification}:</strong> {q.qualification}</p>
                <p><strong>{t.course}:</strong> {q.course}</p>
                <p><strong>{t.stream}:</strong> {q.stream || "NA"}</p>
                <p><strong>{t.board}:</strong> {q.board}</p>
                <p><strong>{t.institute}:</strong> {q.institute}</p>
                <p><strong>{t.passingYear}:</strong> {q.passingYear}</p>
                <p><strong>{t.marksType}:</strong> {q.marksType}</p>
                <p><strong>{t.score}:</strong> {q.score}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BACK & NEXT */}
      <div className="flex justify-between mt-6">
        <button onClick={back} className="px-6 py-3 bg-gray-200 rounded-lg">
          ← {tCommon.back}
        </button>

        <button
          onClick={next}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          {tCommon.save} & {tCommon.next} →
        </button>
      </div>
    </div>
  );
}
