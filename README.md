<<<<<<< HEAD
# ci-cd-nodejs-app-docker
=======
<<<<<<< HEAD
# ci-cd-nodejs-app-docker
=======
# 🚀 Node.js CI/CD with Jenkins & Docker

This repository contains a professional-grade CI/CD pipeline for a Node.js web application. It automates the building, testing, containerizing, and deployment processes using Jenkins and Docker Hub.

## 📁 Project Structure

```text
├── .dockerignore       # Excludes unnecessary files from Docker context
├── Dockerfile          # Multi-stage, secure, and optimized build
├── Jenkinsfile         # Complete CI/CD pipeline definition
├── app.js             # Main Express application
├── package.json        # Node.js dependencies and scripts
├── test.js             # Automated smoke tests
└── README.md           # Documentation
```

## 🛠️ Tech Stack

- **Runtime**: Node.js (Alpine-based)
- **Framework**: Express.js
- **CI/CD**: Jenkins Pipeline
- **Containerization**: Docker (Multi-stage builds)
- **Registry**: Docker Hub

## ⚡ Pipeline Stages

1. **Cleanup**: Removes old containers and dangling images to save space.
2. **Setup & Test**: Installs dependencies and runs `npm test` to ensure code quality.
3. **Docker Build**: Creates an optimized production image with a unique build ID.
4. **Docker Push**: Authenticates and pushes the image to Docker Hub (latest and versioned).
5. **Deploy**: Runs the updated container on the target environment.

## 🚀 How to Run

### 1. Local Development
```bash
npm install
npm start
```
The app will be available at `http://localhost:3000`.

### 2. Jenkins Setup
1. Create a **Pipeline** job in Jenkins.
2. Link this repository.
3. Add **Credentials** in Jenkins:
   - ID: `DockerHub`
   - Type: `Username with Password`
   - Content: Your Docker Hub username and password/token.
4. Run the build!

## 🔒 Security Features
- **Non-Root User**: The application runs under a dedicated `node` user inside the container for security.
- **Slim Image**: Uses Alpine Linux as a base to minimize the attack surface.
- **Secret Management**: Does not hardcode passwords; uses Jenkins `withCredentials`.
>>>>>>> bbb10e1 (initial commit)
>>>>>>> 6721287 ( initial commit)
