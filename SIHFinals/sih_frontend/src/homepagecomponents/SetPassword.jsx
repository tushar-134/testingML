import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Lock, CheckCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

export default function SetPassword({ mobile: mobileProp, onSuccess }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState(mobileProp);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language].setPassword;

  useEffect(() => {
    // If mobile not passed as prop, get it from localStorage
    if (!mobileProp) {
      const storedMobile = localStorage.getItem("otp_mobile");
      if (storedMobile) {
        setMobile(storedMobile);
        console.log("Retrieved mobile from localStorage:", storedMobile);
      } else {
        alert("No mobile number found. Please start from registration.");
        navigate("/youth-registration");
      }
    }
  }, [mobileProp, navigate]);

  const submit = async () => {
    if (!mobile) {
      alert("Mobile number is missing. Please restart registration.");
      navigate("/youth-registration");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Debug: log payload to verify values being sent
      const payload = { mobile, password };
      console.log("SetPassword sending payload:", payload);

      // MODIFIED: Changed to relative URL to use proxy and avoid CORS issues
      const res = await axios.post("/api/auth/create-password", payload);

      console.log("create-password response:", res.data);

      // Clear the stored mobile number
      localStorage.removeItem("otp_mobile");

      // Store token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // MODIFIED: After password creation, navigate to youth form
      // Token is already saved, no separate login needed
      if (onSuccess) {
        onSuccess(res.data.token);
      } else {
        alert("✅ Password set successfully! Please fill your profile.");
        navigate("/youth-form"); // Navigate to form to continue registration
      }
    } catch (err) {
      console.error("create-password error:", err.response || err);
      alert(err.response?.data?.message || err.message || "Error setting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-100 via-white to-blue-100 p-4">
      <div className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/40 relative overflow-hidden">

        {/* Glow Decoration */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-300/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 -left-10 w-32 h-32 bg-blue-300/20 rounded-full blur-3xl"></div>

        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex justify-center items-center shadow-xl shadow-orange-400/40">
            <Lock className="text-white" size={32} />
          </div>
          <h2 className="text-3xl mt-4 font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-gray-500 text-sm mt-1">{t.subtitle}</p>
        </div>

        {/* Password Inputs */}
        <div className="space-y-5 relative z-10">
          <div>
            <label className="font-semibold text-gray-700 mb-1 block">{t.newPassword}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                value={password}
                placeholder={t.passwordPlaceholder}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-3 border-2 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition placeholder-gray-400 bg-white/70 backdrop-blur-sm"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700 mb-1 block">{t.confirmPassword}</label>
            <div className="relative">
              <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                value={confirm}
                placeholder={t.confirmPlaceholder}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full pl-10 p-3 border-2 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition placeholder-gray-400 bg-white/70 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={submit}
          disabled={loading}
          className={`w-full mt-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all text-lg
            ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105"} 
          `}
        >
          {loading ? t.saving : t.setPassword}
        </button>
      </div>
    </div>
  );
}
