# --- Stage 1: Build & Test ---
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency files first for better caching
COPY package*.json ./

# Install ALL dependencies (including devDependencies for tests)
RUN npm install

# Copy source code
COPY . .

# Run tests as part of the build (Ensures CI/CD safety)
RUN npm test

# --- Stage 2: Production ---
FROM node:18-alpine

# Set production environment
ENV NODE_ENV=production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy application source
COPY . .

# Security: Give ownership to the 'node' user and switch to it
RUN chown -R node:node /app
USER node

# Expose the application port
EXPOSE 3000

# Start the application using 'node' directly (faster and better signal handling than 'npm start')
CMD ["node", "app.js"]