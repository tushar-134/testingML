// src/services/mlJobMatchingService.js
import axios from 'axios';

// IMPORTANT: Replace with your actual Render URL after deployment
const ML_API_URL = process.env.REACT_APP_ML_API_URL || 'https://your-render-url.onrender.com';

/**
 * Transform youth form data to ML API format
 */
const transformFormToMLFormat = (formData) => {
    // Get the highest qualification from educationList
    const highestEd = formData.educationList?.[formData.educationList.length - 1] || {};

    // Combine skills array into comma-separated string
    const skillsString = Array.isArray(formData.skills)
        ? formData.skills.join(', ')
        : formData.skills || '';

    // Build experience string from experience list
    const experienceString = formData.experienceList?.map(exp =>
        `${exp.role} at ${exp.company} (${exp.duration})`
    ).join('; ') || '';

    // Calculate approximate years of experience
    const experienceYears = formData.experienceList?.length
        ? `${formData.experienceList.reduce((total, exp) => {
            // Try to extract years from duration (e.g., "2 years", "6 months")
            const match = exp.duration?.match(/(\d+)\s*(year|yr)/i);
            return total + (match ? parseInt(match[1]) : 0.5);
        }, 0)} years`
        : '0 years';

    return {
        position: highestEd.course || formData.educationList?.[0]?.course || '',
        skills: skillsString,
        qualification: highestEd.qualification || '',
        experience: experienceYears,
        summary: `${formData.fullname}, ${formData.gender}, from ${formData.corrDistrict || formData.permDistrict}`,
        work_experience: experienceString,
        location: `${formData.corrDistrict || formData.permDistrict}, ${formData.corrState || formData.permState}`
    };
};

/**
 * Match jobs based on youth registration form data
 * @param {Object} formData - Complete youth form data
 * @returns {Promise<Array>} - Array of matched jobs
 */
export const matchJobsForYouth = async (formData) => {
    try {
        const mlPayload = transformFormToMLFormat(formData);

        console.log('Sending to ML API:', mlPayload);

        const response = await axios.post(`${ML_API_URL}/api/match-jobs-with-location`, mlPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 60000 // 60 seconds timeout (first request takes longer)
        });

        if (response.data.success) {
            return {
                matches: response.data.matches,
                locationSorted: response.data.location_sorted,
                totalMatches: response.data.total_matches
            };
        } else {
            throw new Error(response.data.error || 'Job matching failed');
        }
    } catch (error) {
        console.error('ML API Error:', error);

        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timed out. The ML model is loading (may take 30-60 seconds on first use). Please try again.');
        }

        if (error.response) {
            throw new Error(error.response.data.error || 'Server error');
        }

        throw new Error(error.message || 'Failed to connect to job matching service');
    }
};

/**
 * Health check for ML API
 * @returns {Promise<Object>} - API health status
 */
export const checkMLAPIHealth = async () => {
    try {
        const response = await axios.get(`${ML_API_URL}/api/health`, {
            timeout: 5000
        });
        return response.data;
    } catch (error) {
        console.error('ML API health check failed:', error);
        return {
            status: 'offline',
            error: error.message
        };
    }
};

export default {
    matchJobsForYouth,
    checkMLAPIHealth,
    ML_API_URL
};
