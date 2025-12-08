from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import numpy as np
import ollama
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# --- CONFIGURATION ---
JOB_EMBEDDINGS_PATH = "job_embeddings.json"
MODEL_NAME = "tazarov/all-minilm-l6-v2-f32:latest"

# Weights for matching
WEIGHTS = {
    "position": 0.45,
    "skills": 0.25,
    "qualification": 0.20,
    "experience": 0.10
}

# Global variable to store job database and matrix
job_database = None
job_matrix = None

def load_job_database():
    """Load job embeddings database on startup"""
    global job_database, job_matrix
    
    if not os.path.exists(JOB_EMBEDDINGS_PATH):
        print("X Job database not found. Please run generate_embeddings.py first.")
        return False
    
    with open(JOB_EMBEDDINGS_PATH, 'r', encoding='utf-8') as f:
        job_database = json.load(f)
    
    # Prepare job matrix
    embeddings = [job['embedding'] for job in job_database]
    matrix = np.array(embeddings)
    
    # Normalize
    norms = np.linalg.norm(matrix, axis=1, keepdims=True)
    norms[norms == 0] = 1
    job_matrix = matrix / norms
    
    print(f"v Loaded {len(job_database)} jobs into memory")
    return True

def get_embedding(text):
    """Generate and normalize embedding for given text"""
    if not text or not text.strip():
        return np.zeros(384)
    
    try:
        response = ollama.embeddings(model=MODEL_NAME, prompt=text)
        vec = np.array(response["embedding"])
        
        # Normalize
        norm = np.linalg.norm(vec)
        if norm > 0:
            return vec / norm
        return vec
    except Exception as e:
        print(f"X Error generating embedding: {e}")
        return np.zeros(384)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "jobs_loaded": len(job_database) if job_database else 0,
        "model": MODEL_NAME
    })

@app.route('/match-jobs', methods=['POST'])
def match_jobs():
    """
    Match jobs based on resume data
    
    Expected JSON payload:
    {
        "position": "Software Engineer",
        "skills": "Python, JavaScript, React",
        "summary": "Experienced developer...",
        "qualification": "B.Tech Computer Science",
        "experience": "3 years",
        "work_experience": "Worked at XYZ..."
    }
    """
    if not job_database or job_matrix is None:
        return jsonify({"error": "Job database not loaded"}), 500
    
    try:
        data = request.get_json()
        
        # Generate embeddings for resume data
        vec_pos = get_embedding(f"Job Role: {data.get('position', '')}")
        
        skills_text = f"Skills: {data.get('skills', '')} \n Summary: {data.get('summary', '')}"
        vec_skills = get_embedding(skills_text)
        
        vec_qual = get_embedding(f"Qualification: {data.get('qualification', '')}")
        vec_exp = get_embedding(f"Experience: {data.get('experience', '')} {data.get('work_experience', '')}")
        
        # Calculate similarity scores
        scores_pos = np.dot(job_matrix, vec_pos)
        scores_skills = np.dot(job_matrix, vec_skills)
        scores_qual = np.dot(job_matrix, vec_qual)
        scores_exp = np.dot(job_matrix, vec_exp)
        
        # Apply weights
        final_scores = (scores_pos * WEIGHTS['position']) + \
                       (scores_skills * WEIGHTS['skills']) + \
                       (scores_qual * WEIGHTS['qualification']) + \
                       (scores_exp * WEIGHTS['experience'])
        
        # Get top 20 matches
        top_indices = np.argsort(final_scores)[-20:][::-1]
        
        top_jobs = []
        for i in top_indices:
            top_jobs.append({
                "match_score": float(final_scores[i]),
                "breakdown": {
                    "position_score": float(scores_pos[i]),
                    "skills_score": float(scores_skills[i]),
                    "qualification_score": float(scores_qual[i]),
                    "experience_score": float(scores_exp[i])
                },
                "job_details": job_database[i]['metadata']
            })
        
        return jsonify({
            "success": True,
            "matches": top_jobs,
            "total_jobs_searched": len(job_database)
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/search-jobs', methods=['GET'])
def search_jobs():
    """
    Search jobs by keyword
    Query parameter: q (search query)
    """
    if not job_database:
        return jsonify({"error": "Job database not loaded"}), 500
    
    query = request.args.get('q', '')
    
    if not query:
        return jsonify({
            "success": True,
            "jobs": [job['metadata'] for job in job_database[:50]]
        })
    
    # Simple text-based search
    results = []
    query_lower = query.lower()
    
    for job in job_database:
        metadata = job['metadata']
        # Search in job title, company, description, location
        searchable = f"{metadata.get('job title', '')} {metadata.get('company', '')} {metadata.get('job description', '')} {metadata.get('location', '')}".lower()
        
        if query_lower in searchable:
            results.append(metadata)
    
    return jsonify({
        "success": True,
        "query": query,
        "results": results[:50],
        "total_found": len(results)
    })

# Load job database on startup (module level for Gunicorn)
print("Initializing application and loading database...")
load_job_database()

if __name__ == '__main__':
    print("Starting ML Job Matching API...")
    
    # Database is already loaded above
    if job_database:
        print("Server ready!")
        # MODIFIED: Changed default port from 5000 to 5001 to avoid conflict with backend
        port = int(os.environ.get('PORT', 5001))
        app.run(host='0.0.0.0', port=port, debug=False)
    else:
        print("X Failed to start server - job database not found")
