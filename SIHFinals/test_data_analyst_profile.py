# API Test with Different User Profile

import requests
import json

BASE_URL = "http://localhost:5000"
ML_API_URL = "http://localhost:5001"

# Test User #2: Data Analyst Profile
test_user = {
    "mobile": "9111111111",
    "fullname": "Priya Sharma",
    "fathername": "Raj Sharma",
    "dob": "1998-05-20",
    "gender": "Female",
    "email": "priya.sharma@email.com",
    "qualification": "M.Sc. in Data Science",
    "university": "Indian Institute of Science",
    "passingYear": "2021",
    "grade": "9.2",
    "skills": ["Python", "R Programming", "SQL", "Machine Learning", "Data Visualization", "Tableau", "Power BI", "Statistics"],
    "experienceList": [
        {
            "role": "Data Analyst",
            "company": "Analytics Solutions Pvt Ltd",
            "duration": "2 years",
            "description": "Analyzed large datasets using Python and SQL. Created dashboards using Tableau and Power BI. Implemented predictive models for business forecasting."
        },
        {
            "role": "Data Science Intern",
            "company": "Tech Startup Hub",
            "duration": "6 months",
            "description": "Worked on ML projects, data cleaning, and statistical analysis using Python and R."
        }
    ],
    "permAddress": "45 MG Road",
    "permState": "Karnataka",
    "permDistrict": "Bangalore",
    "permPincode": "560025",
    "corrAddress": "45 MG Road",
    "corrState": "Karnataka",
    "corrDistrict": "Bangalore",
    "corrPincode": "560025"
}

print("="*70)
print("Testing with Profile #2: Data Analyst")
print("="*70)
print()

print("👤 User Profile:")
print(f"   Name: {test_user['fullname']}")
print(f"   Role: {test_user['experienceList'][0]['role']}")
print(f"   Skills: {', '.join(test_user['skills'][:4])}...")
print(f"   Qualification: {test_user['qualification']}")
print()

print("📝 Submitting form...")
response = requests.post(f"{BASE_URL}/api/youth/submit", json=test_user)
print(f"Status: {response.status_code}")

if response.status_code == 200:
    print("✅ Form submitted successfully!")
    print()
    
    # Prepare ML payload
    ml_payload = {
        "position": "Data Analyst",
        "skills": ", ".join(test_user['skills']),
        "summary": " ".join([exp['description'] for exp in test_user['experienceList']]),
        "qualification": test_user['qualification'],
        "experience": f"{len(test_user['experienceList'])} positions",
        "work_experience": ". ".join([
            f"{exp['role']} at {exp['company']} for {exp['duration']}"
            for exp in test_user['experienceList']
        ])
    }
    
    print("🤖 Getting ML recommendations...")
    ml_response = requests.post(f"{ML_API_URL}/match-jobs", json=ml_payload)
    
    if ml_response.status_code == 200:
        result = ml_response.json()
        print(f"✅ Got {len(result.get('matches', []))} job matches!")
        print()
        print("🎯 Top 5 Matches for Data Analyst Profile:")
        print("="*70)
        
        for i, job in enumerate(result.get('matches', [])[:5], 1):
            print(f"\n{i}. {job.get('title')}")
            print(f"   Company: {job.get('company')}")
            print(f"   Location: {job.get('location')}")
            print(f"   Match Score: {job.get('match_score', 0)*100:.1f}%")
        
        print()
        print("="*70)
        print("✅ Test Complete - Data Analyst profile successfully tested!")
        print("="*70)
    else:
        print(f"❌ ML API failed: {ml_response.status_code}")
else:
    print(f"❌ Form submission failed: {response.status_code}")
    print(response.json())
