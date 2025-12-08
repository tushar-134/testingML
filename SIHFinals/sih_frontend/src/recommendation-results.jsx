"use client"

// MODIFIED: Added useEffect for API calls
import { useState, useEffect } from "react"
import InternshipRecommendationCard from "@/components/internship-recommendation-card"
import { Award, TrendingUp } from "lucide-react"

// REMOVED: Mock recommendation engine - now fetching from backend API

export default function RecommendationResults({ profile }) {
  // MODIFIED: Initialize recommendations as empty array, will be populated from API
  const [recommendations, setRecommendations] = useState([])
  const [appliedInternships, setAppliedInternships] = useState([])
  const [loading, setLoading] = useState(true)  // ADDED: Loading state for API call
  const [error, setError] = useState(null)  // ADDED: Error state for failed API calls

  // ADDED: Fetch recommendations from backend API on component mount
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);

        // MODIFIED: Call actual backend API endpoint
        // Make sure user is authenticated and token is stored in localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Please login to view recommendations');
        }

        // MODIFIED: Changed to relative URL to use proxy and avoid CORS issues
        const response = await fetch('/api/ai/recommend', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Send auth token
            'Content-Type': 'application/json'
          },
          credentials: 'include'  // Include cookies if needed
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch recommendations');
        }

        // MODIFIED: Transform ML API response to frontend format
        // ML API returns matches with job_details and match_score
        const transformedRecs = data.recommendations.map((match, index) => ({
          id: index + 1,
          title: match.job_details['job title'] || 'Position Available',
          company: match.job_details.company || 'Company Name',
          logo: '💼',  // Default icon
          location: match.job_details.location || 'Location',
          workMode: 'Hybrid',  // Default work mode (could extract from description if available)
          duration: '3-6 months',  // Default duration
          stipend: '₹10,000-20,000/month',  // Default stipend range
          description: match.job_details['job description']?.substring(0, 150) || 'Exciting opportunity',
          sectors: ['general'],  // Could be enhanced with sector classification
          skills: match.job_details['required skills']?.split(',').slice(0, 3) || [],
          matchScore: Math.round(match.match_score * 100),  // Convert 0-1 to 0-100 percentage
          breakdown: match.breakdown  // ADDED: Include score breakdown from ML API
        }));

        setRecommendations(transformedRecs);
        setError(null);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError(err.message);
        // ADDED: Fallback to mock data if API fails (for development/testing)
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);  // Empty dependency array = run once on component mount

  const handleApply = (internshipId) => {
    if (!appliedInternships.includes(internshipId)) {
      setAppliedInternships([...appliedInternships, internshipId])
    }
  }

  // ADDED: Show loading state while fetching recommendations
  if (loading) {
    return (
      <div className="space-y-12 text-center py-20">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
        <h2 className="text-2xl font-bold text-slate-900">Finding Your Perfect Matches...</h2>
        <p className="text-slate-600">Our AI is analyzing {profile?.name ? `${profile.name}'s` : 'your'} profile</p>
      </div>
    );
  }

  // ADDED: Show error state if API call failed
  if (error) {
    return (
      <div className="space-y-8 text-center py-20">
        <div className="text-6xl">⚠️</div>
        <h2 className="text-2xl font-bold text-slate-900">Oops! Something went wrong</h2>
        <p className="text-red-600 max-w-md mx-auto">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ADDED: Show message if no recommendations found
  if (recommendations.length === 0) {
    return (
      <div className="space-y-8 text-center py-20">
        <div className="text-6xl">🔍</div>
        <h2 className="text-2xl font-bold text-slate-900">No Matches Found</h2>
        <p className="text-slate-600 max-w-md mx-auto">
          We couldn't find any matching opportunities right now. Try updating your profile with more skills and experience.
        </p>
      </div>
    );
  }

  const topMatch = recommendations[0]

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Your Perfect Matches, <span className="text-gradient">Found!</span>
        </h1>
        <p className="text-lg text-slate-600">
          Hi <span className="font-semibold">{profile.name}</span>! We found{" "}
          <span className="font-bold">{recommendations.length}</span> internships that match your profile
        </p>
      </div>

      {/* Top Match Card */}
      {topMatch && (
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6" />
                <span className="text-sm font-semibold">Top Match for You</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{topMatch.title}</h2>
              <p className="text-lg opacity-90">{topMatch.company}</p>
            </div>
            <div className="text-6xl font-bold opacity-20">{topMatch.logo}</div>
          </div>

          <p className="mb-6 text-white/90">{topMatch.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div>
              <div className="text-sm opacity-75">Location</div>
              <div className="font-semibold">{topMatch.location}</div>
            </div>
            <div>
              <div className="text-sm opacity-75">Duration</div>
              <div className="font-semibold">{topMatch.duration}</div>
            </div>
            <div>
              <div className="text-sm opacity-75">Stipend</div>
              <div className="font-semibold">{topMatch.stipend}</div>
            </div>
            <div>
              <div className="text-sm opacity-75">Mode</div>
              <div className="font-semibold">{topMatch.workMode}</div>
            </div>
          </div>

          <button
            onClick={() => handleApply(topMatch.id)}
            disabled={appliedInternships.includes(topMatch.id)}
            className="w-full bg-white text-purple-600 font-bold py-3 rounded-xl hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {appliedInternships.includes(topMatch.id) ? "✓ Applied" : "Apply Now"}
          </button>
        </div>
      )}

      {/* Other Recommendations */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple-600" />
          Other Great Matches
        </h3>
        <div className="space-y-4">
          {recommendations.slice(1).map((internship) => (
            <InternshipRecommendationCard
              key={internship.id}
              internship={internship}
              isApplied={appliedInternships.includes(internship.id)}
              onApply={() => handleApply(internship.id)}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-100 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Apply?</h3>
        <p className="text-slate-600 mb-6">
          You have {appliedInternships.length} application(s) started. Complete your profile to submit them!
        </p>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition">
          Continue Applications →
        </button>
      </div>
    </div>
  )
}
