"use client"

import { useState } from "react"
import { ChevronRight, Sparkles } from "lucide-react"

const educationLevels = [
  { id: "12", label: "12th Pass", icon: "📚" },
  { id: "diploma", label: "Diploma", icon: "📜" },
  { id: "ug", label: "Undergraduate (1st/2nd Year)", icon: "🎓" },
  { id: "ug-final", label: "Undergraduate (Final Year)", icon: "🎯" },
  { id: "pg", label: "Postgraduate", icon: "📖" },
]

const sectors = [
  { id: "tech", label: "Technology & IT", icon: "💻" },
  { id: "finance", label: "Finance & Banking", icon: "💰" },
  { id: "media", label: "Media & Entertainment", icon: "🎬" },
  { id: "consulting", label: "Consulting", icon: "📊" },
  { id: "marketing", label: "Marketing & Sales", icon: "📢" },
  { id: "healthcare", label: "Healthcare", icon: "⚕️" },
  { id: "edtech", label: "Education & EdTech", icon: "📱" },
  { id: "logistics", label: "Logistics & Supply Chain", icon: "🚚" },
]

const locations = [
  { id: "remote", label: "Remote", icon: "🌐" },
  { id: "metro", label: "Metro Cities", icon: "🏙️" },
  { id: "tier2", label: "Tier 2 Cities", icon: "🏢" },
  { id: "hometown", label: "My Hometown", icon: "🏡" },
]

const skills = [
  "Communication",
  "Leadership",
  "Problem Solving",
  "Data Analysis",
  "Python",
  "JavaScript",
  "Content Writing",
  "Design",
  "Excel",
  "Social Media",
  "Project Management",
  "Public Speaking",
]

export default function ProfileForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    sectors: [],
    locations: [],
    skills: [],
    mobility: "",
  })

  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { title: "What's your name?", field: "name", type: "text" },
    { title: "Education Level?", field: "education", type: "select", options: educationLevels },
    { title: "Interested Sectors? (Select at least 1)", field: "sectors", type: "multi-select", options: sectors },
    { title: "Preferred Locations?", field: "locations", type: "multi-select", options: locations },
    { title: "Your Skills? (Select up to 3)", field: "skills", type: "skills", options: skills },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const currentStepData = steps[currentStep]
  const isComplete = formData.name && formData.education && formData.sectors.length > 0 && formData.locations.length > 0
  const isCurrentStepValid = () => {
    if (currentStep === 0) return formData.name.trim().length > 0
    if (currentStep === 1) return formData.education !== ""
    if (currentStep === 2) return formData.sectors.length > 0
    if (currentStep === 3) return formData.locations.length > 0
    return true
  }

  const handleSelectOption = (field, value) => {
    if (Array.isArray(formData[field])) {
      const updated = formData[field].includes(value)
        ? formData[field].filter((item) => item !== value)
        : [...formData[field], value]
      setFormData({ ...formData, [field]: updated })
    } else {
      setFormData({ ...formData, [field]: value })
    }
  }

  const handleSkillToggle = (skill) => {
    const updated = formData.skills.includes(skill)
      ? formData.skills.filter((s) => s !== skill)
      : formData.skills.length < 3
        ? [...formData.skills, skill]
        : formData.skills
    setFormData({ ...formData, skills: updated })
  }

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value })
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-slate-600">
            Step {currentStep + 1} of {steps.length}
          </span>
          <div className="text-sm text-slate-500">{Math.round(((currentStep + 1) / steps.length) * 100)}%</div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-tight">{currentStepData.title}</h2>

        {/* Input Type: Text */}
        {currentStepData.type === "text" && (
          <input
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="w-full px-6 py-4 text-lg border-2 border-slate-300 rounded-2xl focus:outline-none focus:border-purple-600 transition"
            autoFocus
          />
        )}

        {/* Input Type: Select */}
        {currentStepData.type === "select" && (
          <div className="grid grid-cols-1 gap-3">
            {currentStepData.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(currentStepData.field, option.id)}
                className={`p-4 rounded-xl text-left font-medium transition flex items-center gap-3 ${
                  formData[currentStepData.field] === option.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                <span className="text-2xl">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* Input Type: Multi-Select */}
        {currentStepData.type === "multi-select" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {currentStepData.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(currentStepData.field, option.id)}
                className={`p-3 rounded-xl text-center font-medium transition flex flex-col items-center gap-2 ${
                  formData[currentStepData.field].includes(option.id)
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Input Type: Skills */}
        {currentStepData.type === "skills" && (
          <div className="space-y-4">
            <p className="text-slate-600">Select up to 3 skills</p>
            <div className="flex flex-wrap gap-2">
              {currentStepData.options.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    formData.skills.includes(skill)
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
            <p className="text-sm text-slate-500 mt-4">Selected: {formData.skills.length}/3</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 border-2 border-slate-300 hover:bg-slate-100 transition"
        >
          ← Previous
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!isComplete}
            className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Get Recommendations
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!isCurrentStepValid()}
            className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition flex items-center gap-2"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
