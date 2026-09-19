# ── Python Chatbot (Flask + scikit-learn) ─────────────────────────────────────
FROM python:3.11-slim

WORKDIR /app

# Install OS-level deps needed by numpy/scikit-learn
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies first (layer cache)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Train the model from tracked source data so deployments do not depend on
# ignored local pickle files.
COPY data ./data
COPY train.py .
RUN python train.py

# Copy application source and generated model artefacts
COPY app.py .

# Create a non-root user
RUN useradd -m apnastay && chown -R apnastay /app
USER apnastay

EXPOSE 5001

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

CMD ["python", "app.py"]
