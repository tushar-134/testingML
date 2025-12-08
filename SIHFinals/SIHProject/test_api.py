"""
Test script for Flask API endpoints
"""
import requests
import json
import time

BASE_URL = "http://localhost:5000"

def test_health():
    """Test health endpoint"""
    print("=" * 60)
    print("Testing /health endpoint")
    print("=" * 60)
    
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status Code: {response.status_code}")
        
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if data.get("status") == "healthy":
            print("[PASS] Health check passed!")
            return True
        else:
            print("[FAIL] Health check failed")
            return False
    except Exception as e:
        print(f"[ERROR] {e}")
        return False

def test_match_jobs():
    """Test match-jobs endpoint with test data"""
    print("\n" + "=" * 60)
    print("Testing /match-jobs endpoint")
    print("=" * 60)
    
    # Load test data
    with open('test_data.json', 'r') as f:
        test_data = json.load(f)
    
    print(f"Input: {json.dumps(test_data, indent=2)}")
    
    try:
        start_time = time.time()
        response = requests.post(
            f"{BASE_URL}/match-jobs",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        elapsed_time = time.time() - start_time
        
        print(f"\nStatus Code: {response.status_code}")
        print(f"Response Time: {elapsed_time*1000:.2f}ms")
        
        data = response.json()
        
        if data.get("success"):
            print(f"[PASS] Successfully matched jobs!")
            print(f"Total jobs searched: {data.get('total_jobs_searched')}")
            print(f"Matches returned: {len(data.get('matches', []))}")
            
            # Show top 5 matches
            print("\nTop 5 Matches:")
            for i, match in enumerate(data.get('matches', [])[:5], 1):
                job = match['job_details']
                score = match['match_score']
                print(f"\n{i}. {job.get('job title', 'N/A')} at {job.get('company', 'N/A')}")
                print(f"   Match Score: {score:.4f}")
                print(f"   Location: {job.get('location', 'N/A')}")
                print(f"   Breakdown:")
                print(f"     - Position: {match['breakdown']['position_score']:.4f}")
                print(f"     - Skills: {match['breakdown']['skills_score']:.4f}")
                print(f"     - Qualification: {match['breakdown']['qualification_score']:.4f}")
                print(f"     - Experience: {match['breakdown']['experience_score']:.4f}")
            
            return True
        else:
            print(f"[FAIL] Match failed: {data.get('error')}")
            return False
            
    except Exception as e:
        print(f"[ERROR] {e}")
        import traceback
        traceback.print_exc()
        return False

def test_search_jobs():
    """Test search-jobs endpoint"""
    print("\n" + "=" * 60)
    print("Testing /search-jobs endpoint")
    print("=" * 60)
    
    queries = ["python", "engineer", "developer", ""]
    
    for query in queries:
        try:
            if query:
                print(f"\nSearching for: '{query}'")
                response = requests.get(f"{BASE_URL}/search-jobs?q={query}")
            else:
                print(f"\nGetting all jobs (no query)")
                response = requests.get(f"{BASE_URL}/search-jobs")
            
            data = response.json()
            
            if data.get("success"):
                total = data.get('total_found', len(data.get('results', [])))
                print(f"[PASS] Found {total} results")
                
                # Show first 3 results
                if data.get('results'):
                    print(f"  Showing first 3:")
                    for i, job in enumerate(data['results'][:3], 1):
                        print(f"  {i}. {job.get('job title', 'N/A')} - {job.get('company', 'N/A')}")
            else:
                print(f"[FAIL] Search failed")
                
        except Exception as e:
            print(f"[ERROR] {e}")
    
    return True

if __name__ == "__main__":
    print("Starting API Tests...\n")
    
    # Give server time to fully start
    time.sleep(2)
    
    success = True
    
    if not test_health():
        success = False
    
    if not test_match_jobs():
        success = False
    
    if not test_search_jobs():
        success = False
    
    print("\n" + "=" * 60)
    if success:
        print("[PASS] All API tests completed successfully!")
    else:
        print("[FAIL] Some tests failed")
    print("=" * 60)
