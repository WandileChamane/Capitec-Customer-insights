# FROM node:20-alpine AS deps
# WORKDIR /app
# COPY package.json package-lock.json* yarn.lock* ./
# RUN npm i --omit=dev
# #removing ci because it requires a package-lock.json to be present

# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY . .
# RUN npm run build

# FROM node:20-alpine AS runtime
# WORKDIR /app
# ENV NODE_ENV=production
# COPY --from=deps /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist
# COPY seed-data.json ./seed-data.json
# EXPOSE 4000
# CMD ["node", "dist/index.js"]


# ---- Base Build Stage ----
    FROM --platform=linux/amd64 node:20-alpine AS builder
    WORKDIR /app
    
    # Copy package files
    COPY package*.json ./
    RUN npm install
    
    # Copy source files
    COPY . .
    
    # Seed Data
    RUN npm run seed
    # Compile TypeScript -> JS
    RUN npm run build
    
    # ---- Production Stage ----
    FROM node:20-alpine
    WORKDIR /app
    
    # Copy only compiled JS + production deps
    COPY package*.json ./
    RUN npm install 
    
    # Copy compiled output
    COPY --from=builder /app/dist ./dist
    
    # Expose port
    EXPOSE 4000
    
    CMD ["npm","run", "start"]