FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . .
RUN ng build --prod

FROM nginx:1.19.0-alpine
COPY --from=build /app/dist/front-end /usr/share/nginx/html
EXPOSE 80