# Use an office Nodejs runtime as a parent image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and the package-lock.json files to the container
COPY package*.json .

# Install all the dependencies
RUN npm Install

# Copy the rest of the application codes
COPY . .

# Expose the port that the app runs on
EXPOSE 8383

# Define the command to run the application
CMD [ "node", "./src/server.js" ]