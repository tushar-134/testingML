# Test ML API Standalone

import requests
import json

# ML API URL
ML_API_URL = "http://localhost:5001"

# Test 1: Health Check
print("="*50)
print("TEST 1: Health Check")
print("="*50)
try:
    response = requests.get(f"{ML_API_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")

print("\n")

# Test 2: Job Matching
print("="*50)
print("TEST 2: Job Matching")
print("="*50)

test_resume = {
    "position": "Software Engineer",
    "skills": "Python, JavaScript, React, Node.js, Machine Learning, Data Analysis",
    "summary": "Experienced full-stack developer with 2 years of experience in web development and ML",
    "qualification": "B.Tech in Computer Science",
    "experience": "2 years",
    "work_experience": "Built web applications and ML models at tech startups"
}

try:
    response = requests.post(
        f"{ML_API_URL}/match-jobs",
        json=test_resume,
        headers={"Content-Type": "application/json"}
    )
    print(f"Status: {response.status_code}")
    result = response.json()
    
    print(f"\nTotal jobs searched: {result.get('total_jobs_searched', 0)}")
    print(f"Matches found: {len(result.get('matches', []))}")
    
    print("\nTop 5 Matches:")
    for i, match in enumerate(result.get('matches', [])[:5], 1):
        print(f"\n{i}. {match.get('title', 'N/A')}")
        print(f"   Company: {match.get('company', 'N/A')}")
        print(f"   Match Score: {match.get('match_score', 0):.2f}")
        print(f"   Location: {match.get('location', 'N/A')}")
        
except Exception as e:
    print(f"Error: {e}")

print("\n")

# Test 3: Search Jobs
print("="*50)
print("TEST 3: Search Jobs by Keyword")
print("="*50)

try:
    response = requests.get(
        f"{ML_API_URL}/search-jobs",
        params={"q": "python developer"}
    )
    print(f"Status: {response.status_code}")
    result = response.json()
    
    print(f"Results found: {result.get('count', 0)}")
    print("\nFirst 3 Results:")
    for i, job in enumerate(result.get('results', [])[:3], 1):
        print(f"\n{i}. {job.get('title', 'N/A')}")
        print(f"   Company: {job.get('company', 'N/A')}")
        
except Exception as e:
    print(f"Error: {e}")

print("\n" + "="*50)
print("All tests completed!")
print("="*50)
