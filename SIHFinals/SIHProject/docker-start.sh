#!/bin/bash

# Start Ollama server in background
ollama serve &

# Wait for Ollama to be ready
echo "Waiting for Ollama to start..."
sleep 5

# Pull the model if not already available
echo "Pulling model..."
ollama pull tazarov/all-minilm-l6-v2-f32:latest

# Start the Flask application with Gunicorn
echo "Starting Flask API with Gunicorn..."
exec gunicorn --bind 0.0.0.0:5000 --timeout 120 app:app
