import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const MenuCard = () => {
  const items = [
    { label: "Partner Companies", to: "/partner-companies" },
    { label: "Guidelines", to: "/guidelines" },
    { label: "FAQs", to: "/faqs" },
    { label: "Manuals", to: "/manuals" },
    { label: "Guidance Videos", to: "/videos" },
  ];

  return (
    <div className="absolute left-10 top-12 
w-64
bg-white/30 backdrop-blur-xl 
shadow-[0_8px_30px_rgb(0,0,0,0.12)]
border border-white/40 
rounded-2xl 
p-4
transition-all duration-300 
hover:shadow-[0_12px_40px_rgb(0,0,0,0.18)]
">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.to}
          className={`flex items-center justify-between px-4 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 ${
            index !== items.length - 1 ? "border-b border-gray-200" : ""
          }`}
        >
          <span>{item.label}</span>
          <ChevronRight size={18} className="text-gray-500" />
        </Link>
      ))}
    </div>
  );
};

export default MenuCard;