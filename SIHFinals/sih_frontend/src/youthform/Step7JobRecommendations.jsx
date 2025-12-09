// src/homepagecomponents/registration/steps/Step7JobRecommendations.jsx
import React from "react";
import { Briefcase, MapPin, TrendingUp, Award, X } from "lucide-react";

export default function Step7JobRecommendations({ matches, onClose }) {
    if (!matches || matches.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <h3 className="text-2xl font-bold mb-4">No Job Matches Found</h3>
                <p className="text-gray-600 mb-6">
                    We couldn't find any matching jobs at this time. Please check back later!
                </p>
                <button
                    onClick={onClose}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Close
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Briefcase className="text-blue-600" size={28} />
                    Your Job Recommendations ({matches.length})
                </h3>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="space-y-6">
                {matches.map((job, index) => {
                    const matchPercentage = (job.match_score * 100).toFixed(1);
                    const jobDetails = job.job_details;

                    return (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                                        {jobDetails['job title'] || 'Job Title Not Available'}
                                    </h4>
                                    <p className="text-lg text-gray-600 mb-1">
                                        {jobDetails.company || 'Company Not Listed'}
                                    </p>
                                    {jobDetails.location && (
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <MapPin size={14} />
                                            {jobDetails.location}
                                            {job.distance_km && job.distance_km !== Infinity && (
                                                <span className="ml-2 text-blue-600 font-semibold">
                                                    • {job.distance_km} km away
                                                </span>
                                            )}
                                            {job.location_rank && (
                                                <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                                                    #{job.location_rank} Nearest
                                                </span>
                                            )}
                                        </p>
                                    )}
                                </div>

                                {/* Match Score Badge */}
                                <div className="flex flex-col items-center">
                                    <div className="relative w-20 h-20">
                                        <svg className="transform -rotate-90 w-20 h-20">
                                            <circle
                                                cx="40"
                                                cy="40"
                                                r="32"
                                                stroke="#e5e7eb"
                                                strokeWidth="6"
                                                fill="none"
                                            />
                                            <circle
                                                cx="40"
                                                cy="40"
                                                r="32"
                                                stroke={matchPercentage > 75 ? '#10b981' : matchPercentage > 50 ? '#3b82f6' : '#f59e0b'}
                                                strokeWidth="6"
                                                fill="none"
                                                strokeDasharray={`${2 * Math.PI * 32}`}
                                                strokeDashoffset={`${2 * Math.PI * 32 * (1 - job.match_score)}`}
                                                className="transition-all duration-1000"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-lg font-bold text-gray-800">
                                                {matchPercentage}%
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Match</p>
                                </div>
                            </div>

                            {/* Job Description */}
                            {jobDetails['job description'] && (
                                <div className="mb-4">
                                    <p className="text-sm text-gray-700 line-clamp-3">
                                        {jobDetails['job description']}
                                    </p>
                                </div>
                            )}

                            {/* Required Qualification */}
                            {jobDetails['required qualification'] && (
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Required: </span>
                                        {jobDetails['required qualification']}
                                    </p>
                                </div>
                            )}

                            {/* Match Breakdown */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-xs font-semibold text-gray-600 mb-3 flex items-center gap-1">
                                    <TrendingUp size={14} />
                                    Match Breakdown
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-blue-600">
                                            {(job.breakdown.pos_score * 100).toFixed(0)}%
                                        </div>
                                        <div className="text-xs text-gray-500">Position</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-green-600">
                                            {(job.breakdown.skill_score * 100).toFixed(0)}%
                                        </div>
                                        <div className="text-xs text-gray-500">Skills</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-purple-600">
                                            {(job.breakdown.qual_score * 100).toFixed(0)}%
                                        </div>
                                        <div className="text-xs text-gray-500">Education</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-orange-600">
                                            {(job.breakdown.exp_score * 100).toFixed(0)}%
                                        </div>
                                        <div className="text-xs text-gray-500">Experience</div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="mt-4 flex gap-3">
                                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                                    <Award size={16} />
                                    Apply Now
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                    Save
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t text-center">
                <button
                    onClick={onClose}
                    className="bg-gray-200 hover:bg-gray-300 px-8 py-3 rounded-lg font-semibold transition"
                >
                    Close Recommendations
                </button>
            </div>
        </div>
    );
}
