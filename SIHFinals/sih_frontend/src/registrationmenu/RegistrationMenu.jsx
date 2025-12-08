
import React, { useState } from "react";

export default function RegistrationMenu() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleContinue = () => {
    if (selectedOption === "resume") {
      window.location.href = "/resume-upload";
    } else if (selectedOption === "form") {
      window.location.href = "/youth-form";
    }
  };

  return (
    <div className="flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-lg space-y-6">
        <div
          onClick={() => setSelectedOption("resume")}
          className={`cursor-pointer bg-white rounded-3xl p-8 transition-all duration-300 ${
            selectedOption === "resume"
              ? "shadow-2xl ring-4 ring-blue-500 ring-opacity-50 scale-105"
              : "shadow-lg hover:shadow-xl hover:scale-102"
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              selectedOption === "resume" ? "bg-blue-500" : "bg-blue-100"
            }`}>
              <svg className={`w-8 h-8 ${selectedOption === "resume" ? "text-white" : "text-blue-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Submit Resume
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Quick registration by uploading your existing resume. We'll extract your information automatically.
            </p>
          </div>
        </div>

        <div
          onClick={() => setSelectedOption("form")}
          className={`cursor-pointer bg-white rounded-3xl p-8 transition-all duration-300 ${
            selectedOption === "form"
              ? "shadow-2xl ring-4 ring-orange-500 ring-opacity-50 scale-105"
              : "shadow-lg hover:shadow-xl hover:scale-102"
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              selectedOption === "form" ? "bg-orange-500" : "bg-orange-100"
            }`}>
              <svg className={`w-8 h-8 ${selectedOption === "form" ? "text-white" : "text-orange-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Fill Registration Form
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Manual registration by completing a detailed form. Perfect if you don't have a resume ready.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleContinue}
            disabled={!selectedOption}
            className={`block w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              selectedOption
                ? selectedOption === "resume"
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                  : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {selectedOption ? "Continue" : "Select an option to continue"}
          </button>
        </div>
      </div>
    </div>
  );
}