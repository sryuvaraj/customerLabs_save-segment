# Use the official Node.js 14 image
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /app

# Install dependencies
RUN npm install

# Copy the remaining app files
COPY . .

# Build the React app
RUN npm run build

# Start nginx
CMD ["npm", "start"]
