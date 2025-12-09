import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function YouthRegistration() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation
    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Register user directly (no OTP)
      const response = await axios.post("/api/auth/youth/signup", {
        mobile,
        password
      });

      if (response.data.token) {
        // Save token
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("youthId", response.data.youthId);

        alert("✅ Registration successful!");

        // Redirect to form or dashboard
        navigate("/youth-form");
      }

    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg = error.response?.data?.message || "Registration failed";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-100 via-white to-blue-100 p-4">
      <div className="bg-white/40 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          Youth Registration
        </h1>

        <form onSubmit={handleRegister} className="space-y-6">

          {/* Mobile Number */}
          <div>
            <label className="font-semibold text-lg text-gray-800 block mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="10"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-2xl text-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
              placeholder="Enter 10-digit mobile"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold text-lg text-gray-800 block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-2xl text-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
              placeholder="Enter password (min 6 characters)"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl text-xl font-bold shadow-lg transition-all ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-xl active:scale-[0.98]"
              }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-700 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold underline"
            >
              Login here
            </button>
          </p>

        </form>

      </div>
    </div>
  );
}
