# Comprehensive Multi-Profile Test Suite

import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:5000"
ML_API_URL = "http://localhost:5001"

# Define 3 different test profiles
test_profiles = [
    {
        "name": "Profile 1: Data Scientist",
        "mobile": "9000000001",
        "data": {
            "fullname": "Ananya Iyer",
            "email": "ananya.iyer@email.com",
            "qualification": "Ph.D. in Computer Science",
            "university": "IIT Bombay",
            "passingYear": "2020",
            "grade": "9.5",
            "skills": ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "Big Data"],
            "experienceList": [
                {
                    "role": "Senior Data Scientist",
                    "company": "AI Research Lab",
                    "duration": "3 years",
                    "description": "Led ML projects in NLP and computer vision. Built production ML models using TensorFlow and PyTorch."
                },
                {
                    "role": "Research Scientist",
                    "company": "Tech Giants Inc",
                    "duration": "2 years",
                    "description": "Published research papers on deep learning algorithms. Developed neural network architectures."
                }
            ]
        }
    },
    {
        "name": "Profile 2: Full Stack Developer",
        "mobile": "9000000002",
        "data": {
            "fullname": "Rohan Kapoor",
            "email": "rohan.k@email.com",
            "qualification": "B.Tech in Information Technology",
            "university": "BITS Pilani",
            "passingYear": "2019",
            "grade": "8.7",
            "skills": ["JavaScript", "React", "Node.js", "MongoDB", "Express", "Docker", "AWS", "TypeScript", "GraphQL"],
            "experienceList": [
                {
                    "role": "Full Stack Developer",
                    "company": "WebTech Solutions",
                    "duration": "3 years",
                    "description": "Built scalable web applications using MERN stack. Deployed microservices on AWS with Docker."
                },
                {
                    "role": "Frontend Developer",
                    "company": "StartUp Hub",
                    "duration": "1 year",
                    "description": "Developed responsive UIs with React and TypeScript. Implemented GraphQL APIs."
                }
            ]
        }
    },
    {
        "name": "Profile 3: DevOps Engineer",
        "mobile": "9000000003",
        "data": {
            "fullname": "Vikram Singh",
            "email": "vikram.singh@email.com",
            "qualification": "M.Tech in Software Engineering",
            "university": "NIT Trichy",
            "passingYear": "2018",
            "grade": "8.9",
            "skills": ["Kubernetes", "Docker", "Jenkins", "AWS", "Terraform", "Ansible", "Python", "Linux", "CI/CD"],
            "experienceList": [
                {
                    "role": "DevOps Engineer",
                    "company": "Cloud Infrastructure Co",
                    "duration": "4 years",
                    "description": "Managed Kubernetes clusters and CI/CD pipelines. Automated infrastructure using Terraform and Ansible."
                },
                {
                    "role": "System Administrator",
                    "company": "Enterprise Solutions Ltd",
                    "duration": "2 years",
                    "description": "Maintained Linux servers and deployment pipelines. Implemented monitoring solutions."
                }
            ]
        }
    }
]

def test_profile(profile_info):
    print("\n" + "="*80)
    print(f"Testing: {profile_info['name']}")
    print("="*80)
    
    mobile = profile_info['mobile']
    data = profile_info['data']
    
    # Add required fields
    full_data = {
        **data,
        "mobile": mobile,
        "fathername": "Not specified",
        "dob": "1995-01-01",
        "gender": "Male",
        "permAddress": "Test Address",
        "permState": "Karnataka",
        "permDistrict": "Bangalore",
        "permPincode": "560001",
        "corrAddress": "Test Address",
        "corrState": "Karnataka",
        "corrDistrict": "Bangalore",
        "corrPincode": "560001"
    }
    
    print(f"\n👤 Profile Details:")
    print(f"   Name: {data['fullname']}")
    print(f"   Primary Role: {data['experienceList'][0]['role']}")
    print(f"   Qualification: {data['qualification']}")
    print(f"   Top Skills: {', '.join(data['skills'][:5])}...")
    print(f"   Experience: {len(data['experienceList'])} positions")
    
    # Submit form
    print(f"\n📝 Step 1: Submitting form...")
    response = requests.post(f"{BASE_URL}/api/youth/submit", json=full_data)
    
    if response.status_code != 200:
        print(f"❌ Form submission failed: {response.status_code}")
        print(response.json())
        return False
    
    print("✅ Form submitted successfully!")
    
    # Prepare ML payload
    ml_payload = {
        "position": data['experienceList'][0]['role'],
        "skills": ", ".join(data['skills']),
        "summary": " ".join([exp['description'] for exp in data['experienceList']]),
        "qualification": data['qualification'],
        "experience": f"{len(data['experienceList'])} positions",
        "work_experience": ". ".join([
            f"{exp['role']} at {exp['company']} for {exp['duration']}"
            for exp in data['experienceList']
        ])
    }
    
    # Get ML recommendations
    print(f"\n🤖 Step 2: Getting ML recommendations...")
    ml_response = requests.post(f"{ML_API_URL}/match-jobs", json=ml_payload)
    
    if ml_response.status_code != 200:
        print(f"❌ ML API failed: {ml_response.status_code}")
        return False
    
    result = ml_response.json()
    matches = result.get('matches', [])
    
    print(f"✅ Received {len(matches)} job matches!")
    print(f"\n📊 Statistics:")
    print(f"   Total jobs searched: {result.get('total_jobs_searched', 0)}")
    print(f"   Matches returned: {len(matches)}")
    
    if matches:
        # Calculate average match score
        avg_score = sum(job.get('match_score', 0) for job in matches) / len(matches)
        print(f"   Average match score: {avg_score*100:.1f}%")
        
        print(f"\n🎯 Top 5 Job Recommendations:")
        print("-" * 80)
        for i, job in enumerate(matches[:5], 1):
            breakdown = job.get('breakdown', {})
            print(f"\n{i}. {job.get('title', 'N/A')}")
            print(f"   Company: {job.get('company', 'N/A')}")
            print(f"   Location: {job.get('location', 'N/A')}")
            print(f"   Overall Match: {job.get('match_score', 0)*100:.1f}%")
            print(f"   Breakdown: Skills={breakdown.get('skills_match', 0)*100:.0f}% | "
                  f"Experience={breakdown.get('experience_match', 0)*100:.0f}% | "
                  f"Position={breakdown.get('position_match', 0)*100:.0f}%")
    
    print(f"\n✅ {profile_info['name']} - Test Complete!")
    return True

# Run all tests
print("="*80)
print("COMPREHENSIVE MULTI-PROFILE TEST SUITE")
print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print("="*80)

results = []
for profile in test_profiles:
    success = test_profile(profile)
    results.append({
        "profile": profile['name'],
        "success": success
    })

# Final summary
print("\n" + "="*80)
print("FINAL SUMMARY")
print("="*80)
for result in results:
    status = "✅ PASSED" if result['success'] else "❌ FAILED"
    print(f"{status} - {result['profile']}")

all_passed = all(r['success'] for r in results)
print("\n" + "="*80)
if all_passed:
    print("🎉 ALL TESTS PASSED!")
    print("✅ System is working perfectly for all user profiles!")
else:
    print("⚠️  Some tests failed - check details above")
print("="*80)
print(f"Completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
