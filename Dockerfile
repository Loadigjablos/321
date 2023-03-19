# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the source code to the container
COPY . .

# Install the dependencies
RUN npm install

# Start the server when the container starts
ENTRYPOINT ["node", "./app.js"]

# Expose The Server To The Network With Port 80
EXPOSE 3000