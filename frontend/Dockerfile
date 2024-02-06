# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run npm start when the container launches
CMD ["npm", "start"]
