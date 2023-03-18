# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY . "package.json"
COPY . "package-lock.json"

# Install the dependencies
RUN "npm install"

# Copy the source code to the container
COPY "app.js" .
COPY "client" .
COPY "server" .

# Start the server when the container starts
ENTRYPOINT ["node", "./app.js"]

# Expose The Server To The Network With Port 80
EXPOSE 80
