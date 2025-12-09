// Test: MongoDB → ML API Integration
// This script fetches real user data from MongoDB and tests the ML model

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

// Youth Model Schema (simplified)
const youthSchema = new mongoose.Schema({
    mobile: String,
    fullname: String,
    email: String,
    qualification: String,
    skills: [String],
    experienceList: [{
        role: String,
        company: String,
        duration: String,
        description: String
    }]
});

const Youth = mongoose.model('Youth', youthSchema);

async function testMongoToML() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected\n');

        // Fetch a user from database
        console.log('📊 Fetching user from database...');
        const users = await Youth.find().limit(5);

        if (users.length === 0) {
            console.log('❌ No users found in database!');
            console.log('💡 Create a user first by completing registration on frontend');
            process.exit(0);
        }

        console.log(`✅ Found ${users.length} users in database\n`);

        // Test with first user
        const user = users[0];
        console.log('👤 Testing with user:');
        console.log(`   Name: ${user.fullname || 'Not set'}`);
        console.log(`   Mobile: ${user.mobile}`);
        console.log(`   Email: ${user.email || 'Not set'}`);
        console.log(`   Qualification: ${user.qualification || 'Not set'}`);
        console.log(`   Skills: ${user.skills?.join(', ') || 'Not set'}`);
        console.log(`   Experience: ${user.experienceList?.length || 0} positions\n`);

        // Transform to ML format
        const mlPayload = {
            position: user.experienceList?.[0]?.role || "Entry Level",
            skills: user.skills?.join(", ") || "General",
            summary: user.experienceList?.map(exp => exp.description).join(" ") || "Seeking opportunities",
            qualification: user.qualification || "Bachelor's Degree",
            experience: user.experienceList?.length > 0 ? `${user.experienceList.length} positions` : "Fresher",
            work_experience: user.experienceList?.map(exp =>
                `${exp.role} at ${exp.company} for ${exp.duration}`
            ).join(". ") || "No prior experience"
        };

        console.log('🔄 Transformed data for ML API:');
        console.log(JSON.stringify(mlPayload, null, 2));
        console.log('');

        // Send to ML API
        console.log('🤖 Sending to ML API...');
        const ML_API_URL = process.env.ML_API_URL || 'http://localhost:5001';

        const response = await fetch(`${ML_API_URL}/match-jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mlPayload)
        });

        if (!response.ok) {
            throw new Error(`ML API returned status ${response.status}`);
        }

        const result = await response.json();

        console.log('✅ ML API Response Received!\n');
        console.log(`📊 Results:`);
        console.log(`   Total jobs searched: ${result.total_jobs_searched || 0}`);
        console.log(`   Matches found: ${result.matches?.length || 0}\n`);

        if (result.matches && result.matches.length > 0) {
            console.log('🎯 Top 5 Job Matches:\n');
            result.matches.slice(0, 5).forEach((job, index) => {
                console.log(`${index + 1}. ${job.title || 'N/A'}`);
                console.log(`   Company: ${job.company || 'N/A'}`);
                console.log(`   Location: ${job.location || 'N/A'}`);
                console.log(`   Match Score: ${(job.match_score * 100).toFixed(1)}%`);
                console.log(`   Skills Match: ${(job.breakdown?.skills_match * 100).toFixed(1)}%`);
                console.log(`   Experience Match: ${(job.breakdown?.experience_match * 100).toFixed(1)}%`);
                console.log('');
            });

            console.log('✅ SUCCESS! MongoDB → ML API integration is working!\n');
        } else {
            console.log('⚠️  No job matches found. ML API is working but no matches for this profile.\n');
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed');
    }
}

// Run the test
testMongoToML();
