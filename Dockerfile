# Use Node.js 22 Alpine as base image
FROM node:22-alpine3.22 AS builder

# Accept build arguments for environment variables
ARG VITE_APP_URL
ARG VITE_API
ARG VITE_STORAGE_API
ARG VITE_STORAGE_VIDEO_API
ARG VITE_PORTAL_URL

# Set environment variables from build args
ENV VITE_APP_URL=${VITE_APP_URL}
ENV VITE_API=${VITE_API}
ENV VITE_STORAGE_API=${VITE_STORAGE_API}
ENV VITE_STORAGE_VIDEO_API=${VITE_STORAGE_VIDEO_API}
ENV VITE_PORTAL_URL=${VITE_PORTAL_URL}

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]