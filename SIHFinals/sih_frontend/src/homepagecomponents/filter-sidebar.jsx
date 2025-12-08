"use client"

import { X } from "lucide-react"

export default function FilterSidebar({ filters, setFilters }) {
  const handleWorkModeChange = (mode) => {
    setFilters({
      ...filters,
      workMode: filters.workMode.includes(mode)
        ? filters.workMode.filter((m) => m !== mode)
        : [...filters.workMode, mode],
    })
  }

  const handleDurationChange = (duration) => {
    setFilters({
      ...filters,
      duration: filters.duration.includes(duration)
        ? filters.duration.filter((d) => d !== duration)
        : [...filters.duration, duration],
    })
  }

  const clearFilters = () => {
    setFilters({
      workMode: [],
      duration: [],
    })
  }

  return (
    <div className="w-64 flex-shrink-0">
      <div className="sticky top-6 rounded-lg border border-gray-200 bg-white p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4" />
            <span>Clear</span>
          </button>
        </div>

        {/* Work Mode */}
        <div className="mb-8">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Work Mode</h3>
          <div className="space-y-3">
            {["Remote", "On-site", "Hybrid"].map((mode) => (
              <label key={mode} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.workMode.includes(mode)}
                  onChange={() => handleWorkModeChange(mode)}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">{mode}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Duration</h3>
          <div className="space-y-3">
            {["1-2 months", "3 months", "6 months", "6+ months"].map((duration) => (
              <label key={duration} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.duration.includes(duration)}
                  onChange={() => handleDurationChange(duration)}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">{duration}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
