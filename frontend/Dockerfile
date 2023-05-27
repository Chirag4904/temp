# Stage 1: Build the React app
FROM node:14 as build

WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Install app dependencies
RUN yarn install --frozen-lockfile

# Copy the app source code to the working directory
COPY . .

# # Build the app for production
CMD ["yarn", "start"]

# # Stage 2: Serve the built app with a lightweight web server
# FROM nginx:alpine

# # Copy the built app from the previous stage to the NGINX web server's default public directory
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start NGINX web server
# CMD ["nginx", "-g", "daemon off;"]
