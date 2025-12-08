"use client"

import { Zap, MapPin, Clock, DollarSign } from "lucide-react"

export default function InternshipRecommendationCard({ internship, isApplied, onApply }) {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:shadow-lg transition hover:border-purple-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-grow">
          <div className="text-4xl">{internship.logo}</div>
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-slate-900">{internship.title}</h3>
            <p className="text-slate-600 font-medium">{internship.company}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <Zap className="w-4 h-4" />
            {internship.matchScore}%
          </div>
          <p className="text-xs text-slate-500">Match</p>
        </div>
      </div>

      <p className="text-slate-600 text-sm mb-4">{internship.description}</p>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600">{internship.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600">{internship.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600">{internship.stipend}</span>
        </div>
        <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold text-center">
          {internship.workMode}
        </div>
      </div>

      {/* Skills Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {internship.skills.map((skill) => (
          <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
            {skill}
          </span>
        ))}
      </div>

      {/* Apply Button */}
      <button
        onClick={onApply}
        disabled={isApplied}
        className={`w-full py-2 rounded-lg font-semibold transition ${
          isApplied
            ? "bg-slate-200 text-slate-600 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg"
        }`}
      >
        {isApplied ? "✓ Applied" : "Apply Now"}
      </button>
    </div>
  )
}
