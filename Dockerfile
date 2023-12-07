# Use the official Node.js image as a base image
FROM node:latest

# Set the working directory in the container
WORKDIR /developer-efficiency-service

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["node", "src/app.js"]