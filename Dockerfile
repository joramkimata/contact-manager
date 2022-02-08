FROM node

WORKDIR /app

COPY . .

RUN npm install

RUN npm run start:dev

# Build as 
# docker build -t contact-manager .