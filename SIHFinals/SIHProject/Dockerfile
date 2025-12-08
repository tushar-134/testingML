FROM python:3.11-slim

# Install system dependencies for Ollama
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

# Set working directory
WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Expose port
EXPOSE 5000

# Start script that launches Ollama and the Flask app
COPY docker-start.sh /app/docker-start.sh
RUN chmod +x /app/docker-start.sh

CMD ["/app/docker-start.sh"]
