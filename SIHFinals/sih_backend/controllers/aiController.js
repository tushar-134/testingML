import Youth from "../models/Youth.js";

// MODIFIED: Updated to call actual ML API on port 5001 instead of placeholder
export const recommendInternships = async (req, res) => {
  try {
    const youthId = req.user._id;

    // Get youth profile from database
    const youth = await Youth.findById(youthId);

    if (!youth) {
      return res.status(404).json({ message: "Youth profile not found" });
    }

    // MODIFIED: Prepare data for ML API in the format it expects
    // ML API expects: position, skills, summary, qualification, experience, work_experience
    const mlPayload = {
      position: youth.experienceList?.[0]?.role || "Entry Level",  // Use latest role or default
      skills: youth.skills?.join(", ") || "",  // Convert skills array to comma-separated string
      summary: youth.experienceList?.map(exp => exp.description).join(" ") || "Seeking opportunities",
      qualification: youth.qualification || "",
      experience: youth.experienceList?.length > 0 ? `${youth.experienceList.length} positions` : "Fresher",
      work_experience: youth.experienceList?.map(exp =>
        `${exp.role} at ${exp.company} for ${exp.duration}`
      ).join(". ") || "No prior experience"
    };

    // MODIFIED: Call ML API on port 5001 (changed from placeholder YOUR_AI_MODEL_ENDPOINT)
    const ML_API_URL = process.env.ML_API_URL || "http://localhost:5001";
    console.log(`Calling ML API at ${ML_API_URL}/match-jobs`); // ADDED: Logging for debugging

    const response = await fetch(`${ML_API_URL}/match-jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mlPayload),
    });

    if (!response.ok) {
      throw new Error(`ML API returned status ${response.status}`);
    }

    const result = await response.json();

    // MODIFIED: Return recommendations in a format compatible with frontend
    res.json({
      success: true,
      recommendations: result.matches || [],  // ML API returns 'matches' array
      totalSearched: result.total_jobs_searched || 0,
      profile: {  // ADDED: Include profile info for frontend
        name: youth.fullname,
        skills: youth.skills
      }
    });

  } catch (err) {
    console.error("AI recommendation error:", err);  // ADDED: Error logging
    res.status(500).json({
      success: false,
      message: "AI recommendation failed",
      error: err.message  // ADDED: Return error details for debugging
    });
  }
};
