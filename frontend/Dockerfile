FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY . .

# Ensure Rollup doesn’t attempt to use missing native binaries
ENV ROLLUP_SKIP_NODEJS_NATIVE=1

EXPOSE 3000
CMD ["npm", "run", "dev"]