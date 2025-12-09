# Test: MongoDB → ML API Integration (Python Version)
# Fetches real user data from MongoDB and sends to ML model

from pymongo import MongoClient
import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

def test_mongo_to_ml():
    print("="*60)
    print("MongoDB → ML API Integration Test")
    print("="*60)
    print()
    
    # Connect to MongoDB
    print("🔗 Connecting to MongoDB...")
    MONGO_URI = os.getenv('MONGO_URI') or "mongodb+srv://sih_user:K6dJmnBUcBs8_Y_@cluster0.yb1popv.mongodb.net/sih_database?retryWrites=true&w=majority"
    
    try:
        client = MongoClient(MONGO_URI)
        db = client['sih_database']
        youths_collection = db['youths']
        
        print("✅ MongoDB Connected")
        print()
        
        # Fetch users
        print("📊 Fetching users from database...")
        users = list(youths_collection.find().limit(5))
        
        if not users:
            print("❌ No users found in database!")
            print("💡 Create a user first by:")
            print("   1. Go to http://localhost:3001")
            print("   2. Complete registration (mobile → OTP → password)")
            print("   3. Fill and submit youth form")
            print("   4. Then run this test again")
            return
        
        print(f"✅ Found {len(users)} user(s) in database")
        print()
        
        # Test with first user
        user = users[0]
        print("👤 Testing with user:")
        print(f"   Name: {user.get('fullname', 'Not set')}")
        print(f"   Mobile: {user.get('mobile', 'N/A')}")
        print(f"   Email: {user.get('email', 'Not set')}")
        print(f"   Qualification: {user.get('qualification', 'Not set')}")
        
        skills = user.get('skills', [])
        print(f"   Skills: {', '.join(skills) if skills else 'Not set'}")
        
        exp_list = user.get('experienceList', [])
        print(f"   Experience: {len(exp_list)} position(s)")
        print()
        
        # Transform to ML format
        ml_payload = {
            "position": exp_list[0].get('role', 'Entry Level') if exp_list else "Entry Level",
            "skills": ", ".join(skills) if skills else "General skills",
            "summary": " ".join([exp.get('description', '') for exp in exp_list]) if exp_list else "Seeking opportunities",
            "qualification": user.get('qualification', "Bachelor's Degree"),
            "experience": f"{len(exp_list)} positions" if exp_list else "Fresher",
            "work_experience": ". ".join([
                f"{exp.get('role', 'N/A')} at {exp.get('company', 'N/A')} for {exp.get('duration', 'N/A')}"
                for exp in exp_list
            ]) if exp_list else "No prior experience"
        }
        
        print("🔄 Transformed data for ML API:")
        print(json.dumps(ml_payload, indent=2))
        print()
        
        # Send to ML API
        print("🤖 Sending to ML API...")
        ML_API_URL = os.getenv('ML_API_URL') or 'http://localhost:5001'
        
        response = requests.post(
            f"{ML_API_URL}/match-jobs",
            json=ml_payload,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code != 200:
            print(f"❌ ML API returned status {response.status_code}")
            print(response.text)
            return
        
        result = response.json()
        
        print("✅ ML API Response Received!")
        print()
        print("📊 Results:")
        print(f"   Total jobs searched: {result.get('total_jobs_searched', 0)}")
        print(f"   Matches found: {len(result.get('matches', []))}")
        print()
        
        matches = result.get('matches', [])
        if matches:
            print("🎯 Top 5 Job Matches:")
            print()
            for i, job in enumerate(matches[:5], 1):
                print(f"{i}. {job.get('title', 'N/A')}")
                print(f"   Company: {job.get('company', 'N/A')}")
                print(f"   Location: {job.get('location', 'N/A')}")
                print(f"   Match Score: {job.get('match_score', 0)*100:.1f}%")
                
                breakdown = job.get('breakdown', {})
                print(f"   Skills Match: {breakdown.get('skills_match', 0)*100:.1f}%")
                print(f"   Experience Match: {breakdown.get('experience_match', 0)*100:.1f}%")
                print()
            
            print("="*60)
            print("✅ SUCCESS! MongoDB → ML API integration is working!")
            print("="*60)
        else:
            print("⚠️  No job matches found.")
            print("   ML API is working but no matches for this profile.")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
    
    finally:
        client.close()
        print()
        print("🔌 MongoDB connection closed")

if __name__ == "__main__":
    test_mongo_to_ml()
