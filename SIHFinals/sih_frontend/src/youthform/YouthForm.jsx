// src/homepagecomponents/registration/RegistrationForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProgressBar from "./progressBar";
import Step1Personal from "./Step1Personal";
import Step2Address from "./Step2Address";
import Step3Education from "./Step3Education"
import Step4Skills from "./step4skills"
import Step5docu from "./Step5docu"
import Step6Review from "./Step6review";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

const STORAGE_KEY = "youth_reg_v3";

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].youthForm;

  const [form, setForm] = useState({
    // Personal
    fullname: "",
    fatherName: "",
    dob: "",
    gender: "",
    category: "",
    email: "",
    mobile: "",
    alternativeMobile: "",
    differentlyAbled: "No",
    // Permanent address
    permHouse: "",
    permLine1: "",
    permLine2: "",
    permState: "",
    permDistrict: "",
    permBlock: "",
    permVillage: "",
    permPincode: "",
    // Correspondence (current)
    corrSame: true,
    corrHouse: "",
    corrLine1: "",
    corrLine2: "",
    corrState: "",
    corrDistrict: "",
    corrBlock: "",
    corrVillage: "",
    corrPincode: ""
  });

  // load saved
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.form) setForm(parsed.form);
        if (parsed.step) setStep(parsed.step);
      }
    } catch (e) {
      console.warn("Failed to load saved form:", e);
    }
  }, []);

  // autosave
  useEffect(() => {
    setSaving(true);
    const t = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, form }));
      setSaving(false);
    }, 450);
    return () => clearTimeout(t);
  }, [form, step]);

  // when corrSame toggles ON, copy perm -> corr
  useEffect(() => {
    if (form.corrSame) {
      setForm((prev) => ({
        ...prev,
        corrHouse: prev.permHouse,
        corrLine1: prev.permLine1,
        corrLine2: prev.permLine2,
        corrState: prev.permState,
        corrDistrict: prev.permDistrict,
        corrBlock: prev.permBlock,
        corrVillage: prev.permVillage,
        corrPincode: prev.permPincode
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form.corrSame,
    form.permHouse,
    form.permLine1,
    form.permLine2,
    form.permState,
    form.permDistrict,
    form.permBlock,
    form.permVillage,
    form.permPincode
  ]);

  const update = (patch) => setForm((p) => ({ ...p, ...patch }));

  const next = () => setStep((s) => Math.min(6, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));
  const goTo = (stepNumber) => setStep(Math.max(1, Math.min(6, stepNumber)));

  // final submit - REQUIRES LOGIN FIRST!
  const handleSubmit = async () => {
    // Basic validation
    if (!form.fullname || !form.mobile) {
      alert("Please fill required personal fields before submitting.");
      return;
    }

    try {
      // MODIFIED: Removed login check - users can submit during registration flow
      // Token is automatically saved after password creation
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/youth/submit",
        form,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Submit Response:", response.data);

      if (response.data.success) {
        alert("✅ Profile submitted successfully! Redirecting to job recommendations...");
        localStorage.removeItem(STORAGE_KEY);

        // ADDED: Navigate to recommendations page to show ML-matched jobs
        setTimeout(() => {
          window.location.href = "/recommendations"; // Or use navigate if imported
        }, 1500);
      } else {
        alert("Submit failed: " + (response.data.error || "Unknown error"));
      }

    } catch (error) {
      console.error("Submit Error:", error);

      if (error.response) {
        alert("Submit failed: " + (error.response.data.error || "Server error"));
      } else {
        alert("Network error: " + error.message);
      }
    }
  };

  const bgStyle = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  return (
    <div className="min-h-screen p-6" style={bgStyle}>
      <div className="max-w-6xl mx-auto bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{t.title}</h2>
            <div className="text-sm text-gray-600">
              <span className="mr-3">{t.step} {step} {t.of} 6</span>
              <span>{saving ? t.saving : t.saved}</span>
            </div>
          </div>

          <div className="mt-4">
            <ProgressBar step={step} total={6} />
          </div>

          <div className="mt-6">
            {step === 1 && (
              <Step1Personal data={form} update={update} next={next} />
            )}
            {step === 2 && (
              <Step2Address
                data={form}
                update={update}
                back={back}
                next={next}
              />
            )}
            {step === 3 && (
              <Step3Education
                data={form}
                update={update}
                back={back}
                next={next}
              />
            )}
            {step === 4 && (
              <Step4Skills
                data={form}
                update={update}
                back={back}
                next={next}
              />
            )}
            {step === 5 && (
              <Step5docu
                data={form}
                update={update}
                back={back}
                next={next}
              />
            )}
            {step === 6 && (
              <Step6Review
                data={form}
                update={update}
                back={back}
                onSubmit={handleSubmit}
                goTo={goTo}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
