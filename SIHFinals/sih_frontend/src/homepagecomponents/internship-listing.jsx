"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import FilterSidebar from "./filter-sidebar"
import InternshipCard from "./internship-card"

const internships = [
  {
    id: 1,
    title: "Line Technician Apprentice",
    company: "BSNL",
    image: "https://via.placeholder.com/60?text=BSNL",
    location: "Lucknow, Uttar Pradesh",
    workMode: "On-site",
    description:
      "Training in telephone line installation, cable joining, fault detection, and maintenance of telecom infrastructure.",
    duration: "1 year",
    stipend: "₹6,500/month",
    skills: ["Cable Installation", "Line Testing", "Fault Detection"],
    applyBy: "Apr 20, 2025",
    bookmarked: false,
  },
  {
    id: 2,
    title: "Carpentry Trainee",
    company: "UrbanClap (Urban Company)",
    image: "https://via.placeholder.com/60?text=Urban",
    location: "Delhi NCR",
    workMode: "On-site",
    description:
      "Learn professional carpentry skills including furniture making, repairs, and custom woodwork. Get hands-on training from...",
    duration: "6 months",
    stipend: "₹18,000/month",
    skills: ["Woodwork", "Furniture Assembly", "Tool Handling"],
    applyBy: "Mar 30, 2025",
    bookmarked: false,
  },
]

export default function InternshipListing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    workMode: [],
    duration: [],
  })

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-purple-600">Product Manager Internships</h1>
        <p className="mt-2 text-gray-600">
          Discover and apply to curated PM internship opportunities from top companies
        </p>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-6">
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by role, company, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 px-6 pb-12">
        {/* Sidebar */}
        <FilterSidebar filters={filters} setFilters={setFilters} />

        {/* Listings */}
        <div className="flex-1">
          <div className="mb-6 text-sm text-gray-600">Showing 33 internships</div>

          <div className="grid gap-6 md:grid-cols-2">
            {internships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
