# ML Job Matching API

AI-powered resume-to-job matching system using vector embeddings and semantic similarity search.

## 🎯 Features

- **Smart Job Matching**: Uses Ollama embeddings (all-minilm-l6-v2) for semantic understanding
- **Weighted Scoring**: Considers position (45%), skills (25%), qualifications (20%), and experience (10%)
- **REST API**: Easy-to-integrate Flask API with CORS support
- **Fast Vector Search**: Optimized NumPy matrix operations for instant results

## 📁 Project Structure

```
SIHProject/
├── app.py                              # Flask API server
├── generate_embeddings.py              # Pre-process job database
├── search_jobs_weighted_optimized.py   # Batch matching script
├── requirements.txt                    # Python dependencies
├── Data.csv                            # Job listings database
├── job_embeddings.json                 # Pre-computed embeddings
└── .env                                # Environment configuration
```

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Ollama installed and running locally
- Model: `tazarov/all-minilm-l6-v2-f32:latest`

### Installation

```bash
# Install dependencies
pip install -r requirements.txt

# Pull the Ollama model
ollama pull tazarov/all-minilm-l6-v2-f32:latest

# Generate embeddings (one-time setup)
python generate_embeddings.py

# Start the API server
python app.py
```

The API will be available at `http://localhost:5000`

## 📡 API Endpoints

### Health Check
```bash
GET /health
```

Response:
```json
{
  "status": "healthy",
  "jobs_loaded": 1500,
  "model": "tazarov/all-minilm-l6-v2-f32:latest"
}
```

### Match Jobs
```bash
POST /match-jobs
Content-Type: application/json
```

Request Body:
```json
{
  "position": "Software Engineer",
  "skills": "Python, JavaScript, React, MongoDB",
  "summary": "Full-stack developer with 3 years experience...",
  "qualification": "B.Tech Computer Science",
  "experience": "3 years",
  "work_experience": "Worked at ABC Corp as Backend Developer..."
}
```

Response:
```json
{
  "success": true,
  "matches": [
    {
      "match_score": 0.8754,
      "breakdown": {
        "position_score": 0.92,
        "skills_score": 0.85,
        "qualification_score": 0.78,
        "experience_score": 0.81
      },
      "job_details": {
        "job title": "Senior Software Engineer",
        "company": "Tech Corp",
        "location": "Remote",
        "job description": "...",
        "required qualification": "..."
      }
    }
  ],
  "total_jobs_searched": 1500
}
```

### Search Jobs
```bash
GET /search-jobs?q=python developer
```

Response:
```json
{
  "success": true,
  "query": "python developer",
  "results": [...],
  "total_found": 45
}
```

## 🔧 Configuration

Edit `.env` file to configure:

```env
PORT=5000
OLLAMA_HOST=http://localhost:11434
```

## 🏗️ Deployment

### Render Deployment

1. The `render.yaml` is already configured
2. Push to GitHub
3. Connect Render to your repository
4. Set Root Directory to `SIHProject`
5. **Important**: You need an Ollama server accessible from Render
   - Option 1: Deploy Ollama separately and set `OLLAMA_HOST` env var
   - Option 2: Use a different embedding API (modify `app.py`)

### Ollama Hosting Options

Since Render free tier doesn't support Ollama directly:

1. **Self-hosted**: Run Ollama on your own server and expose it
2. **Alternative**: Switch to OpenAI embeddings or HuggingFace API
3. **Hybrid**: Pre-compute all embeddings locally, deploy API read-only

## 🛠️ Scripts

### Generate Embeddings
Pre-processes the job database and creates vector embeddings:
```bash
python generate_embeddings.py
```

### Batch Job Matching
Process multiple resumes from the `json_output/` folder:
```bash
python search_jobs_weighted_optimized.py
```

## 📊 Performance

- **Jobs processed**: 1500+ job listings
- **Embedding dimension**: 384
- **Matching speed**: ~50ms for 1500 jobs
- **API response time**: < 200ms

## ⚠️ Important Notes

1. **Ollama Dependency**: The current implementation requires a running Ollama instance
2. **Large Files**: `job_embeddings.json` is ~6.6MB, ensure it's included in deployment
3. **Memory Usage**: All embeddings are loaded into memory (~50MB RAM)

## 🔐 Environment Variables

Required for deployment:
- `PORT`: Server port (default: 5000)
- `OLLAMA_HOST`: Ollama server URL (required for cloud deployment)

## 📝 License

MIT License - See LICENSE file for details
