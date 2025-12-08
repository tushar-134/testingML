// src/homepagecomponents/registration/steps/Step5Review.jsx
import React from "react";
import { ArrowLeft, CheckCircle, Pencil } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

export default function Step5Review({ data, back, onSubmit, goTo }) {
  const { language } = useLanguage();
  const t = translations[language].step6Review;
  const tCommon = translations[language].youthForm;
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">

      <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <CheckCircle className="text-green-600" /> {t.title}
      </h3>

      <div className="space-y-8">

        {/* ---------------------- PERSONAL DETAILS ---------------------- */}
        <div className="p-5 bg-gray-50 rounded-xl shadow-inner">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold text-gray-700">{t.personalDetails}</h4>
            <button className="text-blue-600 hover:underline" onClick={() => goTo(1)}>
              <Pencil size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <p><b>{t.name}:</b> {data.fullname}</p>
            <p><b>{t.fatherName}:</b> {data.fathername}</p>
            <p><b>{t.dob}:</b> {data.dob}</p>
            <p><b>{t.gender}:</b> {data.gender}</p>
            <p><b>{t.email}:</b> {data.email}</p>
            <p><b>{t.mobile}:</b> {data.mobile}</p>
            {data.alternativeMobile && (
              <p><b>{t.altMobile}:</b> {data.alternativeMobile}</p>
            )}
          </div>
        </div>

        {/* ---------------------- ADDRESS ---------------------- */}
        <div className="p-5 bg-gray-50 rounded-xl shadow-inner">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold text-gray-700">{t.addressDetails}</h4>
            <button className="text-blue-600 hover:underline" onClick={() => goTo(2)}>
              <Pencil size={18} />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            <p>
              <b>{t.permanentAddress}:</b>
              {data.permAddress}, {data.permDistrict}, {data.permState} - {data.permPincode}
            </p>

            <p>
              <b>{t.correspondenceAddress}:</b>
              {data.corrAddress}, {data.corrDistrict}, {data.corrState} - {data.corrPincode}
            </p>
          </div>
        </div>

        {/* ---------------------- EDUCATION ---------------------- */}
        <div className="p-5 bg-gray-50 rounded-xl shadow-inner">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold text-gray-700">{t.educationDetails}</h4>
            <button className="text-blue-600 hover:underline" onClick={() => goTo(3)}>
              <Pencil size={18} />
            </button>
          </div>

          <div className="mt-3 space-y-4">
            {data.educationList?.length > 0 ? (
              data.educationList.map((edu, index) => (
                <div key={index} className="p-4 border rounded-lg bg-white">
                  <h5 className="font-semibold mb-2">{t.qualification} {index + 1}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p><b>{t.qualification}:</b> {edu.qualification}</p>
                    <p><b>{t.course}:</b> {edu.course}</p>
                    <p><b>{t.stream}:</b> {edu.stream || "NA"}</p>
                    <p><b>{t.board}:</b> {edu.board}</p>
                    <p><b>{t.institute}:</b> {edu.institute}</p>
                    <p><b>{t.passingYear}:</b> {edu.passingYear}</p>
                    <p><b>{t.marksType}:</b> {edu.marksType}</p>
                    <p><b>{t.score}:</b> {edu.score}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">{t.noEducation}</p>
            )}
          </div>
        </div>

        {/* ---------------------- SKILLS ---------------------- */}
        <div className="p-5 bg-gray-50 rounded-xl shadow-inner">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold text-gray-700">{t.skills}</h4>
            <button className="text-blue-600 hover:underline" onClick={() => goTo(4)}>
              <Pencil size={18} />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {data.skills?.length > 0 ? (
              data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-300"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500 italic">{t.noSkills}</p>
            )}
          </div>
        </div>

        {/* ---------------------- DOCUMENTS ---------------------- */}
        <div className="p-5 bg-gray-50 rounded-xl shadow-inner">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold text-gray-700">{t.documents}</h4>
            <button className="text-blue-600 hover:underline" onClick={() => goTo(4)}>
              <Pencil size={18} />
            </button>
          </div>

          <ul className="mt-3 space-y-2 text-gray-700">
            <li><b>{t.aadhar}:</b> {data.documents?.aadhar?.name || t.notUploaded}</li>
            <li><b>{t.photo}:</b> {data.documents?.photo?.name || t.notUploaded}</li>
          </ul>

          {/* EXPERIENCE LIST */}
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-2">{t.workExperience}</h4>

            {data.experienceList?.length > 0 ? (
              data.experienceList.map((exp, i) => (
                <div key={i} className="border p-4 rounded-xl bg-white shadow-sm mb-3">
                  <p><b>{t.company}:</b> {exp.company}</p>
                  <p><b>{t.role}:</b> {exp.role}</p>
                  <p><b>{t.duration}:</b> {exp.duration}</p>
                  <p><b>{t.description}:</b> {exp.description || "—"}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">{t.noExperience}</p>
            )}
          </div>
        </div>
      </div>

      {/* ---------------------- ACTION BUTTONS ---------------------- */}
      <div className="flex justify-between mt-8">
        <button
          onClick={back}
          className="bg-gray-300 px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <ArrowLeft size={18} /> {tCommon.back}
        </button>

        <button
          onClick={onSubmit}
          className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700"
        >
          {t.submitButton}
        </button>
      </div>

    </div>
  );
}
