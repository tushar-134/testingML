import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    getAuthToken,
    setAuthToken,
    getUserData,
    setUserData,
    logout as authLogout,
    isAuthenticated
} from "../utils/authUtils";

// MODIFIED: Changed to relative URL to use proxy and avoid CORS issues
const API_URL = "/api";

// Single-file React component that contains:
// - Login form (mobile number + password)
// - Sidebar dashboard with navigation
// - Recommendations view that shows internships after login

export default function LoginAndDashboard() {
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [activeView, setActiveView] = useState("recommendations");
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Demo/mock data — replace with fetch('/api/recommendations') in real app
    const mockRecommendations = [
        {
            id: 1,
            title: "Frontend Intern",
            company: "BrightTech",
            location: "Remote",
            duration: "3 months",
            skills: ["React", "CSS", "HTML"],
            description: "Work on UI components and landing pages.",
        },
        {
            id: 2,
            title: "Backend Intern",
            company: "DataHive",
            location: "Bengaluru, India",
            duration: "6 months",
            skills: ["Node.js", "MongoDB", "APIs"],
            description: "Build and optimize REST APIs for our product.",
        },
        {
            id: 3,
            title: "ML Research Intern",
            company: "AICore Labs",
            location: "Pune, India",
            duration: "4 months",
            skills: ["Python", "PyTorch", "NLP"],
            description: "Work on prototype models for text classification.",
        },
    ];

    useEffect(() => {
        // On mount, check if user is already logged in
        if (isAuthenticated()) {
            const savedUser = getUserData();
            if (savedUser) {
                setUser(savedUser);
                setIsLoggedIn(true);
                loadRecommendations(savedUser);
            }
        }
    }, []);

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Call real backend API
            const response = await axios.post(`${API_URL}/auth/youth/login`, {
                mobile: number.trim(),
                password: password
            });

            // Backend returns { message, token, youthId }
            const { token, youthId } = response.data;

            if (token && youthId) {
                // Create user object from response
                const userData = {
                    id: youthId,
                    mobile: number.trim(),
                    name: `User ${number.slice(-4)}`
                };

                // Store token and user data
                setAuthToken(token);
                setUserData(userData);

                setUser(userData);
                setIsLoggedIn(true);

                // Load recommendations after login
                loadRecommendations(userData);
            } else {
                setError(response.data.message || "Login failed");
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
        authLogout(); // Clear all auth data
        setIsLoggedIn(false);
        setUser(null);
        setRecommendations([]);
        setNumber("");
        setPassword("");
    }

    function loadRecommendations(user) {
        setLoading(true);
        // In real app, call your API with user info:
        // fetch(`/api/recommendations?userId=${user.id}`)...
        setTimeout(() => {
            // For demo, return mockRecommendations
            setRecommendations(mockRecommendations);
            setLoading(false);
        }, 500);
    }

    function RecommendationCard({ r }) {
        return (
            <div className="border rounded-lg p-4 shadow-sm bg-white">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold">{r.title}</h3>
                        <p className="text-sm text-gray-600">{r.company} • {r.location}</p>
                    </div>
                    <div className="text-sm text-gray-500">{r.duration}</div>
                </div>
                <p className="mt-3 text-sm text-gray-700">{r.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                    {r.skills.map((s) => (
                        <span key={s} className="text-xs px-2 py-1 border rounded-full">{s}</span>
                    ))}
                </div>
                <div className="mt-4 flex gap-2">
                    <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Apply</button>
                    <button className="px-3 py-1 rounded border text-sm">Save</button>
                </div>
            </div>
        );
    }

    // Single return: conditionally render login or dashboard
    return (
        <div className="min-h-screen">
            {!isLoggedIn ? (
                <div className="flex items-center justify-center bg-gray-50 p-6 min-h-screen">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-2">Career Setu — Login</h2>
                        <p className="text-sm text-gray-500 mb-6">Sign in with your mobile number and password.</p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                <input
                                    type="tel"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 p-2 border"
                                    placeholder="e.g. 9876543210"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 p-2 border"
                                    placeholder="Enter password"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="remember" className="h-4 w-4" />
                                    <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
                                </div>
                                <a className="text-sm text-blue-600 hover:underline" href="#">Forgot?</a>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold disabled:opacity-60"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </button>

                            <div className="text-sm text-gray-600 text-center">Or continue with</div>
                            <div className="flex gap-3 mt-2">
                                <button type="button" className="flex-1 py-2 rounded-lg border">Google</button>
                                <button type="button" className="flex-1 py-2 rounded-lg border">GitHub</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="flex bg-gray-100 min-h-screen">
                    <aside className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-200 bg-white border-r p-4 flex flex-col`}>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">{user?.name?.[0]?.toUpperCase()}</div>
                                {sidebarOpen && (
                                    <div>
                                        <div className="font-semibold">{user?.name}</div>
                                        <div className="text-xs text-gray-500">{user?.mobile}</div>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </button>
                        </div>

                        <nav className="flex-1">
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        onClick={() => setActiveView("recommendations")}
                                        className={`flex items-center gap-3 w-full p-2 rounded ${activeView === "recommendations" ? "bg-blue-50" : "hover:bg-gray-50"}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 11a1 1 0 011-1h14a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1v-6z" />
                                            <path d="M7 7a3 3 0 116 0v1H7V7z" />
                                        </svg>
                                        {sidebarOpen && <span>Recommendations</span>}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveView("profile")}
                                        className={`flex items-center gap-3 w-full p-2 rounded ${activeView === "profile" ? "bg-blue-50" : "hover:bg-gray-50"}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
                                            <path fillRule="evenodd" d="M4.5 20a7.5 7.5 0 0115 0v.5H4.5V20z" clipRule="evenodd" />
                                        </svg>
                                        {sidebarOpen && <span>Profile</span>}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveView("settings")}
                                        className={`flex items-center gap-3 w-full p-2 rounded ${activeView === "settings" ? "bg-blue-50" : "hover:bg-gray-50"}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M11.3 1.046a1 1 0 00-2.6 0l-.2.674a7.002 7.002 0 00-1.47.85l-.64-.37a1 1 0 00-1.366.366l-.4.693a1 1 0 00.366 1.366l.64.37c-.04.16-.07.32-.09.49l-.7.15a1 1 0 00-.737 1.17l.12.7c-.18.13-.35.27-.51.43l-.6-.12a1 1 0 00-1.17.737l-.15.7a1 1 0 00.737 1.17l.7.12c.11.18.23.35.36.51l-.12.7a1 1 0 00.737 1.17l.7.15c.12.47.3.92.53 1.34l-.4.69a1 1 0 00.366 1.366l.693.4a1 1 0 001.366-.366l.37-.64c.42.23.87.41 1.34.53l.15.7a1 1 0 001.17.737l.7-.12a1 1 0 00.737-1.17l-.12-.7c.18-.11.35-.23.51-.36l.7.12a1 1 0 001.17-.737l.15-.7a1 1 0 00-.737-1.17l-.7-.12a7.003 7.003 0 00-.43-.51l.12-.7a1 1 0 00-.737-1.17l-.7-.15a7.06 7.06 0 00-.49-.09l-.37.64a1 1 0 00-1.366.366l-.4-.693a1 1 0 00-.366-1.366l.64-.37c-.23-.42-.41-.87-.53-1.34l-.7-.15z" />
                                        </svg>
                                        {sidebarOpen && <span>Settings</span>}
                                    </button>
                                </li>
                            </ul>
                        </nav>

                        <div className="mt-auto">
                            <button onClick={handleLogout} className="w-full py-2 rounded bg-red-50 text-red-600">Logout</button>
                        </div>
                    </aside>

                    <main className="flex-1 p-6">
                        <header className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-semibold">{activeView === "recommendations" ? "Recommended Internships" : activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h1>
                            <div className="text-sm text-gray-600">Welcome back, <span className="font-medium">{user?.name}</span></div>
                        </header>

                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div>
                                {activeView === "recommendations" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {recommendations.length === 0 ? (
                                            <div className="text-gray-500">No recommendations yet — complete your profile to get better matches.</div>
                                        ) : (
                                            recommendations.map((r) => <RecommendationCard key={r.id} r={r} />)
                                        )}
                                    </div>
                                )}

                                {activeView === "profile" && (
                                    <div className="bg-white p-6 rounded-lg shadow-sm">
                                        <h2 className="text-lg font-semibold mb-2">Profile</h2>
                                        <p className="text-sm text-gray-600">Name: {user?.name}</p>
                                        <p className="text-sm text-gray-600">Mobile: {user?.mobile}</p>
                                        <div className="mt-4">
                                            <button className="px-3 py-2 rounded bg-blue-600 text-white">Edit profile</button>
                                        </div>
                                    </div>
                                )}

                                {activeView === "settings" && (
                                    <div className="bg-white p-6 rounded-lg shadow-sm">
                                        <h2 className="text-lg font-semibold mb-2">Settings</h2>
                                        <p className="text-sm text-gray-600">Notification preferences, account settings and more.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            )}
        </div>
    );
}
