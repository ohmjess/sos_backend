# Stage 1: Build the application
FROM node:22 AS build

# Set the working directory
WORKDIR /app

# Copy only necessary files for dependency installation
COPY package*.json ./

# Install dependencies (including devDependencies)
RUN npm ci

# Copy the rest of the application files (including prisma schema)
COPY . .

RUN npm run prisma:generate

RUN mv ./prisma ./src

# Stage 2: Production image
FROM node:22 AS production

# Set the working directory
WORKDIR /app

# Copy only the built application and runtime dependencies
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src/prisma ./prisma
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.env ./.env

# # Use a non-root user for security
# RUN addgroup --system app && adduser --system --ingroup app app
# USER app

# Expose the port
EXPOSE 3000

# # Run the application
CMD ["node", "dist/server.js"]
