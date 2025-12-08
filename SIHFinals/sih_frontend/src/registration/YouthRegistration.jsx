import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MobileVerification from "./MobileVerification";

export default function YouthRegistration() {
  const navigate = useNavigate();  // for redirect

  return (
    <div
      className="min-h-screen flex justify-center items-center 
      bg-gradient-to-br from-orange-100 via-white to-blue-100 
      backdrop-blur-sm p-4"
    >
      <div className="bg-white/40 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
        
        <MobileVerification
          onVerified={(mobile) => {
            // store mobile temporarily
            localStorage.setItem("otp_mobile", mobile);

            // redirect to set password page
            navigate("/set-password");
          }}
        />
        
      </div>
    </div>
  );
}
