# Use the official Node.js 14 image
FROM node:alpine3.18

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
