# Stage 1: Build the Angular Application
FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . .
RUN ng build --configuration production

# Stage 2: Serve the Angular Application with Nginx
FROM nginx:1.19.0-alpine
COPY --from=build /app/dist/front-end /usr/share/nginx/html

# Copy the script from the host to the container
COPY docker-entrypoint.sh /usr/local/bin/

# Make the script executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Specify the command to run
CMD ["/usr/local/bin/docker-entrypoint.sh"]

# Expose the ports the app runs on
EXPOSE 80
