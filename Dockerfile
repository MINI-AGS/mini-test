# Use the official Node.js image as the base image
FROM node:22

# Set the working directory
WORKDIR /home/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Tell Expo to use host networking instead of container IPs
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.77

# Start the application
CMD ["npx", "expo", "start", "--host", "lan"]
