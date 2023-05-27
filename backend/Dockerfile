# Choose a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Install app dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your backend server will run
EXPOSE 5000

# Start the backend server
CMD ["node", "Server.js"]
