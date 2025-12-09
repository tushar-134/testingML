import React, { useState, useEffect } from "react";
import axios from "axios";

// Combined Login + Dashboard component
// - Login with mobile + password (real backend auth)
// - After login, fetches real user profile from youth form data
// - Displays user's actual information in dashboard

export default function LoginAndDashboard() {
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // Restore session if token/user present
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("cs_user");

        if (token && savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                setUser(parsed);
                setIsLoggedIn(true);
                // Don't auto-fetch profile on mount - only after successful login
                // This prevents 401 errors from expired/invalid tokens
            } catch (e) {
                console.warn("Failed to parse saved user:", e);
                localStorage.removeItem("token");
                localStorage.removeItem("cs_user");
            }
        }
    }, []);

    async function fetchUserProfile(token) {
        try {
            const response = await axios.get("/api/youth/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data) {
                const profileData = response.data;
                const userData = {
                    id: profileData._id,
                    name: profileData.fullname || "User",
                    email: profileData.email || "",
                    mobile: profileData.mobile || "",
                    avatar: (profileData.fullname || "U").substring(0, 2).toUpperCase(),
                    // Add all profile data for display
                    profile: profileData
                };
                setUser(userData);
                localStorage.setItem("cs_user", JSON.stringify(userData));
                return true; // Success
            }
        } catch (err) {
            console.error("Error fetching profile:", err);

            // If 401, token is invalid - clear it and log out
            if (err.response?.status === 401) {
                console.warn("Token expired or invalid. Clearing session.");
                localStorage.removeItem("token");
                localStorage.removeItem("cs_user");
                setIsLoggedIn(false);
                setUser(null);
            }
        }
        return false; // Failed
    }

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // MODIFIED: Call real backend login endpoint
            const response = await axios.post("/api/auth/youth/login", {
                mobile: number.trim(),
                password: password
            });

            if (response.data.token) {
                const token = response.data.token;
                localStorage.setItem("token", token);

                // Fetch user's real profile data wait for success
                const success = await fetchUserProfile(token);

                if (success) {
                    setIsLoggedIn(true);
                } else {
                    setError("Failed to load profile data. Please try again.");
                }
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error("Login error:", err);
            const errorMessage = err.response?.data?.message ||
                err.message ||
                "Failed to login. Please check your credentials.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("cs_user");
    }

    // If not logged in show the login form
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-2">Career Setu — Login</h2>
                    <p className="text-sm text-gray-500 mb-6">Sign in with your mobile number and password/OTP.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                            <input
                                type="tel"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 p-2"
                                placeholder="e.g. 9876543210"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password / OTP</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 p-2"
                                placeholder="Enter password or OTP"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold disabled:opacity-60"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --- UserDashboard component inlined ---
    function UserDashboardInner({ user, onLogout }) {
        const [activeSection, setActiveSection] = useState("dashboard");

        // ML Recommendations state
        const [recommendations, setRecommendations] = useState([]);
        const [loadingRecommendations, setLoadingRecommendations] = useState(true);
        const [recommendationsError, setRecommendationsError] = useState(null);

        // Stats - Only showing real data from ML recommendations
        // TODO: Fetch applied, saved, interviews, offers from backend when features are implemented
        const stats = {
            appliedInternships: 0, // TODO: Fetch from database
            savedInternships: 0,   // TODO: Fetch from database
            interviewsScheduled: 0, // TODO: Fetch from database
            offersReceived: 0       // TODO: Fetch from database
        };

        // Helper: Transform ML API response to UI format
        const transformJobToUI = (mlJob, index) => {
            const jobDetails = mlJob.job_details || {};
            const companyName = jobDetails.company || jobDetails.Company || "Unknown Company";

            // Extract skills from job description if available
            const extractSkills = (description) => {
                if (!description) return [];
                const skillKeywords = ["Python", "JavaScript", "React", "Node.js", "Java", "SQL", "MongoDB", "AWS", "Docker", "Machine Learning"];
                return skillKeywords.filter(skill => description.toLowerCase().includes(skill.toLowerCase())).slice(0, 5);
            };

            return {
                id: index + 1,
                company: companyName,
                role: jobDetails["job title"] || jobDetails["Job Title"] || "Position",
                location: jobDetails.location || jobDetails.Location || "Remote",
                duration: jobDetails.duration || "3-6 months",
                stipend: jobDetails.stipend || jobDetails.Stipend || "Unpaid",
                skills: extractSkills(jobDetails["job description"] || jobDetails.Description),
                matchScore: Math.round((mlJob.match_score || 0) * 100),
                deadline: jobDetails.deadline || "2025-12-31",
                logo: companyName.substring(0, 2).toUpperCase(),
                description: jobDetails["job description"] || jobDetails.Description || "",
                link: jobDetails["job link"] || jobDetails.Link || "#"
            };
        };

        // Fetch ML recommendations from backend
        useEffect(() => {
            const fetchRecommendations = async () => {
                setLoadingRecommendations(true);
                setRecommendationsError(null);

                try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                        throw new Error("No authentication token found");
                    }

                    const response = await axios.get("/api/ai/recommend", {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    if (response.data.success && response.data.recommendations) {
                        const transformedJobs = response.data.recommendations
                            .slice(0, 20) // Limit to top 20
                            .map((job, idx) => transformJobToUI(job, idx));

                        setRecommendations(transformedJobs);
                    } else {
                        throw new Error("Invalid response format");
                    }
                } catch (err) {
                    console.error("Error fetching recommendations:", err);
                    setRecommendationsError(err.response?.data?.message || err.message || "Failed to load recommendations");

                    // Fallback to sample data on error
                    setRecommendations([
                        {
                            id: 1,
                            company: "Sample Company",
                            role: "Sample Position",
                            location: "Location",
                            duration: "3-6 months",
                            stipend: "₹15,000/month",
                            skills: ["Skill1", "Skill2"],
                            matchScore: 75,
                            deadline: "2025-12-31",
                            logo: "SC"
                        }
                    ]);
                } finally {
                    setLoadingRecommendations(false);
                }
            };

            fetchRecommendations();
        }, []); // Run once on mount

        const appliedInternships = [
            { id: 1, company: "Tech Innovations", role: "Full Stack Developer", appliedDate: "2025-11-20", status: "Under Review", logo: "TI" },
            { id: 2, company: "StartUp Hub", role: "Frontend Developer", appliedDate: "2025-11-18", status: "Shortlisted", logo: "SH" }
        ];

        const savedInternships = [
            { id: 1, company: "Digital Marketing Solutions", role: "Digital Marketing Intern", savedDate: "2025-11-25", logo: "DM" }
        ];

        const interviews = [
            { id: 1, company: "DataScience Corp", role: "Data Analyst Intern", date: "2025-12-12", time: "10:00 AM", type: "Video Call", logo: "DS" }
        ];

        const offers = [
            { id: 1, company: "Tech Solutions", role: "Backend Developer Intern", offerDate: "2025-11-28", deadline: "2025-12-05", logo: "TS" }
        ];

        const renderMainContent = () => {
            if (activeSection === "applied") {
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Applied Internships</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {appliedInternships.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                                            {item.logo}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{item.role}</h3>
                                            <p className="text-sm text-gray-600">{item.company}</p>
                                            <p className="text-xs text-gray-500 mt-1">Applied: {item.appliedDate}</p>
                                            <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${item.status === "Shortlisted" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                                                }`}>{item.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }

            if (activeSection === "saved") {
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Saved Internships</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedInternships.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                                            {item.logo}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{item.role}</h3>
                                            <p className="text-sm text-gray-600">{item.company}</p>
                                            <p className="text-xs text-gray-500 mt-1">Saved: {item.savedDate}</p>
                                        </div>
                                    </div>
                                    <button className="w-full py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700">Apply Now</button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }

            if (activeSection === "interviews") {
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Scheduled Interviews</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {interviews.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold">
                                            {item.logo}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{item.role}</h3>
                                            <p className="text-sm text-gray-600">{item.company}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1 mb-4 text-sm">
                                        <p><span className="font-semibold">Date:</span> {item.date}</p>
                                        <p><span className="font-semibold">Time:</span> {item.time}</p>
                                        <p><span className="font-semibold">Type:</span> {item.type}</p>
                                    </div>
                                    <button className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">Join Interview</button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }

            if (activeSection === "offers") {
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Offer Letters</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {offers.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-300">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                                            {item.logo}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{item.role}</h3>
                                            <p className="text-sm text-gray-600">{item.company}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1 mb-4 text-sm">
                                        <p><span className="font-semibold">Offer Date:</span> {item.offerDate}</p>
                                        <p className="text-red-600 font-semibold">Accept by: {item.deadline}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">Accept</button>
                                        <button className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">Decline</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }

            if (activeSection === "profile") {
                const profile = user.profile || {};

                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
                        <div className="bg-white rounded-xl p-6 shadow-lg max-w-4xl">
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                                    {user.avatar}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{user.name}</h3>
                                    <p className="text-gray-600">{user.email}</p>
                                    <p className="text-gray-600">{user.mobile}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Personal Information */}
                                <div className="col-span-2">
                                    <h4 className="font-semibold text-lg mb-3">Personal Information</h4>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Full Name</label>
                                    <input type="text" value={profile.fullname || ""} className="w-full px-4 py-2 border-2 rounded-lg" readOnly />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Father's Name</label>
                                    <input type="text" value={profile.fathername || ""} className="w-full px-4 py-2 border-2 rounded-lg" readOnly />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Email</label>
                                    <input type="email" value={profile.email || ""} className="w-full px-4 py-2 border-2 rounded-lg" readOnly />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Mobile</label>
                                    <input type="text" value={profile.mobile || ""} className="w-full px-4 py-2 border-2 rounded-lg" readOnly />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Date of Birth</label>
                                    <input type="text" value={profile.dob || ""} className="w-full px-4 py-2 border-2 rounded-lg" readOnly />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Gender</label>
                                    <input type="text" value={profile.gender || ""} className="w-full px-4 py-2 border-2 rounded-lg" readOnly />
                                </div>

                                {/* Education */}
                                <div className="col-span-2 mt-4">
                                    <h4 className="font-semibold text-lg mb-3">Education</h4>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Qualification</label>
                                    <input type="text" value={profile.qualification || ""} className="w-full px-4 py-2 border-2 rounded-lg" readOnly />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">University</label>
                                    <input type="text" value={profile.university || ""} className="w-full px-4 py-2 border-2 rounded-lg" readOnly />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Passing Year</label>
                                    <input type="text" value={profile.passingYear || ""} className="w-full px-4 py-2 border-2 rounded-lg" readOnly />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Grade/CGPA</label>
                                    <input type="text" value={profile.grade || ""} className="w-full px-4 py-2 border-2 rounded-lg" readOnly />
                                </div>

                                {/* Skills */}
                                {profile.skills && profile.skills.length > 0 && (
                                    <>
                                        <div className="col-span-2 mt-4">
                                            <h4 className="font-semibold text-lg mb-3">Skills</h4>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="flex flex-wrap gap-2">
                                                {profile.skills.map((skill, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Experience */}
                                {profile.experienceList && profile.experienceList.length > 0 && (
                                    <>
                                        <div className="col-span-2 mt-4">
                                            <h4 className="font-semibold text-lg mb-3">Experience</h4>
                                        </div>
                                        <div className="col-span-2 space-y-4">
                                            {profile.experienceList.map((exp, idx) => (
                                                <div key={idx} className="p-4 border-2 rounded-lg">
                                                    <h5 className="font-semibold">{exp.role}</h5>
                                                    <p className="text-gray-600">{exp.company} • {exp.duration}</p>
                                                    <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* Address */}
                                <div className="col-span-2 mt-4">
                                    <h4 className="font-semibold text-lg mb-3">Address</h4>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-semibold mb-2">Permanent Address</label>
                                    <input type="text" value={`${profile.permAddress || ""}, ${profile.permDistrict || ""}, ${profile.permState || ""} - ${profile.permPincode || ""}`} className="w-full px-4 py-2 border-2 rounded-lg" readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            if (activeSection === "settings") {
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
                        <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center justify-between p-3 border rounded-lg">
                                        <span>Email Notifications</span>
                                        <input type="checkbox" className="w-5 h-5" defaultChecked />
                                    </label>
                                    <label className="flex items-center justify-between p-3 border rounded-lg">
                                        <span>SMS Notifications</span>
                                        <input type="checkbox" className="w-5 h-5" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            // Dashboard (default)
            return (
                <div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">AI Recommended for You</h2>
                        <p className="text-gray-600 text-sm mt-1">Based on your skills, interests, and profile</p>
                        {recommendationsError && (
                            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <span className="text-sm text-yellow-800">Using sample data. {recommendationsError}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {loadingRecommendations ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-600 font-medium">Loading AI-powered recommendations...</p>
                                <p className="text-sm text-gray-500 mt-1">Analyzing your profile</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {recommendations.length > 0 ? recommendations.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-white text-sm font-semibold">
                                        {item.matchScore}% Match
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
                                                {item.logo}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-800">{item.role}</h3>
                                                <p className="text-sm text-gray-600">{item.company}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                                            <p>📍 {item.location}</p>
                                            <p>⏱️ {item.duration}</p>
                                            <p className="text-green-600 font-semibold">💰 {item.stipend}</p>
                                        </div>
                                        {item.skills && item.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {item.skills.map((skill, i) => (
                                                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">{skill}</span>
                                                ))}
                                            </div>
                                        )}
                                        <button
                                            onClick={() => item.link !== "#" && window.open(item.link, "_blank")}
                                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500">No recommendations available at the moment.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        };

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-orange-50 flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-xl flex flex-col fixed h-full">
                    <div className="p-6 border-b">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                                {user.avatar}
                            </div>
                            <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-xs text-gray-500">Student</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-blue-50 rounded-lg p-2 text-center">
                                <p className="text-xl font-bold text-blue-600">{stats.appliedInternships}</p>
                                <p className="text-xs text-gray-600">Applied</p>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-2 text-center">
                                <p className="text-xl font-bold text-orange-600">{stats.savedInternships}</p>
                                <p className="text-xs text-gray-600">Saved</p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-2 text-center">
                                <p className="text-xl font-bold text-green-600">{stats.interviewsScheduled}</p>
                                <p className="text-xs text-gray-600">Interviews</p>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-2 text-center">
                                <p className="text-xl font-bold text-purple-600">{stats.offersReceived}</p>
                                <p className="text-xs text-gray-600">Offers</p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 p-4 overflow-y-auto">
                        <ul className="space-y-2">
                            {[
                                { id: "dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                                { id: "applied", label: "Applied", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                                { id: "saved", label: "Saved", icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" },
                                { id: "interviews", label: "Interviews", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                                { id: "offers", label: "Offers", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
                                { id: "profile", label: "Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                                { id: "settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }
                            ].map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => setActiveSection(item.id)}
                                        className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${activeSection === item.id ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                        </svg>
                                        <span>{item.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="p-4 border-t">
                        <button onClick={onLogout} className="w-full py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="ml-64 flex-1 p-8">
                    {/* Improved Header: sticky, search, notifications, profile menu */}
                    <div className="fixed top-0 left-64 right-0 bg-white/90 backdrop-blur-sm z-20 px-8 py-3 border-b shadow-sm">
                        <div className="max-w-full mx-auto flex items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-800">{activeSection === 'dashboard' ? 'Recommended Internships' : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
                                <div className="text-sm text-gray-600">Welcome back, <span className="font-medium">{user.name}</span></div>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Search with clear and accessible label */}


                                {/* Notifications dropdown (simple) */}
                                <div className="relative">
                                    <button aria-haspopup="true" aria-expanded="false" className="p-2 rounded-full hover:bg-gray-100 relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.6 14.6V11a6 6 0 10-12 0v3.6c0 .538-.214 1.055-.595 1.445L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-1 ring-white"></span>
                                    </button>
                                    {/* popup (placeholder) */}
                                    <div className="hidden absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-3">
                                        <p className="text-sm font-medium">Notifications</p>
                                        <ul className="mt-2 text-sm text-gray-600 space-y-2">
                                            <li>Interview scheduled with DataScience Corp — Dec 12</li>
                                            <li>Your application at Tech Innovations moved to <span className="font-semibold">Under Review</span></li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Profile menu */}
                                <div className="relative">
                                    <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">{user.avatar}</div>
                                        <div className="hidden sm:block text-left">
                                            <div className="text-sm font-medium text-gray-800">{user.name}</div>
                                            <div className="text-xs text-gray-500">{user.email}</div>
                                        </div>
                                    </button>
                                    {/* profile dropdown placeholder */}
                                    <div className="hidden absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg">
                                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Profile</button>
                                        <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-24">{renderMainContent()}</div>
                </main>
            </div>
        );
    }

    // Render the dashboard - SAFEGUARD against null user
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your profile...</p>
                </div>
            </div>
        );
    }

    return <UserDashboardInner user={user} onLogout={handleLogout} />;
}
