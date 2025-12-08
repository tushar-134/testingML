"use client"

import { Bookmark } from "lucide-react"
import { useState } from "react"

export default function InternshipCard({ internship }) {
  const [bookmarked, setBookmarked] = useState(internship.bookmarked)

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex gap-3">
          <img
            src={internship.image || "/placeholder.svg"}
            alt={internship.company}
            className="h-16 w-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">{internship.title}</h3>
            <p className="text-sm text-gray-600">{internship.company}</p>
          </div>
        </div>
        <button onClick={() => setBookmarked(!bookmarked)} className="text-gray-400 hover:text-gray-600">
          <Bookmark className="h-6 w-6" fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Location and Work Mode */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
          📍 {internship.location}
        </span>
        <span className="inline-flex items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-700">
          {internship.workMode}
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 text-sm text-gray-600 line-clamp-2">{internship.description}</p>

      {/* Duration and Stipend */}
      <div className="mb-4 flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">⏱️</span>
          <span className="text-gray-700">{internship.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">💰</span>
          <span className="text-gray-700">{internship.stipend}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4 flex flex-wrap gap-2">
        {internship.skills.map((skill, idx) => (
          <span key={idx} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
            {skill}
          </span>
        ))}
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">+2 more</span>
      </div>

      {/* Apply By */}
      <div className="mb-4 text-xs text-gray-500">Apply by: {internship.applyBy}</div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 rounded-lg border border-gray-300 bg-white py-2 text-sm font-medium text-gray-900 hover:bg-gray-50">
          View Details
        </button>
        <button className="flex-1 rounded-lg bg-purple-600 py-2 text-sm font-medium text-white hover:bg-purple-700">
          Apply Now →
        </button>
      </div>
    </div>
  )
}
