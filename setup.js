const fs = require("fs");
const { exec } = require("child_process");

console.log("🚀 Setting up the project...");

// Define folders and files
const folders = [
  "src",
  "src/controllers",
  "src/routes",
  "src/models",
  "src/repositories",
  "src/services",
  "src/middlewares",
  "src/config",
  "src/utils",
  "src/__tests__",
];

const files = {
  "src/controllers/user.controller.ts": `import { Request, Response } from "express";
import { findUserById, registerUser } from "../services/user.service";

export const getUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await findUserById(id);
  if (!user) return res.status(404).send("User not found");
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await registerUser({ name, email });
  res.status(201).json(user);
};`,

  "src/repositories/user.repository.ts": `
import { PrismaClient } from '@prisma/client';
import { User } from "../models/user.model";

const prisma = new PrismaClient();


export const getUserById = async (id: number): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  return await prisma.user.create({ data: userData });
};`,

  "src/services/user.service.ts": `import { getUserById, createUser } from "../repositories/user.repository";

export const findUserById = async (id: number) => {
  return await getUserById(id);
};

export const registerUser = async (userData: { name: string; email: string }) => {
  return await createUser(userData);
};`,

  "src/routes/user.routes.ts" : `import express from "express";
import { getUser, createUser } from "../controllers/user.controller";

const router = express.Router();

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Public
 */
router.get("/:id", getUser);

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Public
 */
router.post("/", createUser);

export const userRouter = router;

`,

  "src/app.ts": `import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { envConfig } from "./config/config";
import prisma, { connectPrisma, disconnectPrisma } from "./prisma"; // ใช้ Prisma จาก prisma.ts

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Length", "X-Response-Time"],
  credentials: true,
  optionsSuccessStatus: 204,
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Vote API!",
  });
});

// Global error handler
app.use((err: any, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message || err,
  });
});

// Graceful shutdown
const gracefulShutdown = () => {
  console.log("Shutting down gracefully...");
  disconnectPrisma().then(() => {
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

// Start server
connectPrisma().then(() => {
  app.listen(envConfig.appPort || 3000, () => {
    console.log(\`[INFO] Server running on port http://localhost:\${envConfig.appPort}\`);
  });
});

export default app;
`,
"src/config/config.ts": `import dotenv from 'dotenv';
dotenv.config();

/**
 * Ensures that the specified environment variable is present.
 * @param key - The name of the environment variable.
 * @returns The value of the environment variable.
 * @throws Error if the environment variable is not set.
 */
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(\`Environment variable "\${key}\" is required but was not found.\`);
  }
  return value;
}

// Example usage with your configuration
export const envConfig = {
  appPort: parseInt(requireEnv('APP_PORT')),
  nodeEnv: requireEnv('NODE_ENV'),
  seScret: requireEnv('SECRET'),
  database: {
    url: requireEnv('DATABASE_URL'),
    user: requireEnv('POSTGRES_USER'),
    password: requireEnv('POSTGRES_PASSWORD'),
    dbName: requireEnv('POSTGRES_DB'),
    port: parseInt(requireEnv('POSTGRES_PORT')),
  },
  redis: {
    port: parseInt(requireEnv('REDIS_PORT')),
    password: requireEnv('REDIS_PASSWORD'),
  },
  pgAdmin: {
    email: requireEnv('PGADMIN_DEFAULT_EMAIL'),
    password: requireEnv('PGADMIN_DEFAULT_PASSWORD'),
    port: parseInt(requireEnv('PGADMIN_PORT')),
  },
};`,

  "src/server.ts": `import app from "./app";
import { userRouter } from "./routes/user.routes" 

app.use("/api/users", userRouter);`,

  "package.json": JSON.stringify({
    "name": "express-ts-app",
    "version": "1.0.0",
    "main": "src/server.ts",
    "scripts": {
      "start": "node dist/server.js",
      "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
      "test": "jest --coverage",
      "prisma:generate": "npx prisma generate",
      "prisma:migrate": "npx prisma migrate dev",
      "prisma:seed": "ts-node prisma/seed.ts"
    },
    "dependencies": {
      "express": "^4.18.2",
      "cors": "^2.8.5",
      "helmet": "^7.0.0",
      "morgan": "^1.10.0",
      "@prisma/client": "^4.10.0",
      "dotenv": "^16.0.3"
    },
    "devDependencies": {
      "typescript": "^5.3.0",
      "ts-node-dev": "^2.0.0",
      "@types/node": "^20.6.1",
      "@types/express": "^4.17.21",
      "jest": "^29.0.0",
      "ts-jest": "^29.0.0",
      "@types/jest": "^29.0.0"
    }
  }, null, 2),

  "jest.config.js": `module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/__tests__"],
};`,

  "tsconfig.json": JSON.stringify({
    compilerOptions: {
      target: "ES6",
      module: "CommonJS",
      rootDir: "./src",
      outDir: "./dist",
      strict: true,
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      skipLibCheck: true
    }
  }, null, 2),

  "src/__tests__/user.service.test.ts": `import { findUserById, registerUser } from "../services/user.service";

// Mock repository
jest.mock("../repositories/user.repository", () => ({
  getUserById: jest.fn((id) => (id === 1 ? { id, name: "John Doe", email: "john@example.com" } : null)),
  createUser: jest.fn((userData) => ({ id: 2, ...userData })),
}));

test("findUserById should return correct user data", async () => {
  const user = await findUserById(1);
  expect(user).toEqual({ id: 1, name: "John Doe", email: "john@example.com" });
});

test("findUserById should return null for unknown ID", async () => {
  const user = await findUserById(999);
  expect(user).toBeNull();
});

test("registerUser should return newly created user", async () => {
  const user = await registerUser({ name: "Jane Doe", email: "jane@example.com" });
  expect(user).toEqual({ id: 2, name: "Jane Doe", email: "jane@example.com" });
});`,
  "src/prisma.ts": `import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connectPrisma = async () => {
  try {
    await prisma.$connect();
    console.log("[INFO] Prisma connected successfully");
  } catch (error) {
    console.error("[ERROR] Error connecting to Prisma:", error);
    process.exit(1);
  }
};

export const disconnectPrisma = async () => {
  try {
    await prisma.$disconnect();
    console.log("[INFO] Prisma disconnected.");
  } catch (error) {
    console.error("[ERROR] Error disconnecting Prisma:", error);
  }
};

export default prisma;
`,

  ".gitignore": `node_modules
.env
dist
coverage`,
  "docker-compose.yml": `

  version: "3.8"

  services:
  #   app:
  #     build:
  #       context: .
  #     container_name: vote-backend
  #     ports:
  #       - "&{APP_PORT}:&{APP_PORT}"
  #     env_file:
  #       - .env
  #     depends_on:
  #       db:
  #         condition: service_healthy
  #       redis:
  #         condition: service_healthy
  #     healthcheck:
  #       test: ["CMD", "curl", "-f", "http:#localhost:&{APP_PORT}/health"]
  #       interval: 30s
  #       timeout: 10s
  #       retries: 3
  
    db:
      image: postgres:15
      container_name: \${APP_NAME}-db
      restart: always
      env_file:
        - .env
      volumes:
        - pg_data:/var/lib/postgresql/data
      ports:
        - "&{POSTGRES_PORT}:5432"
  
    pgadmin:
      image: dpage/pgadmin4
      container_name: \${APP_NAME}-pgadmin
      restart: always
      environment:
        PGADMIN_DEFAULT_EMAIL: \${PGADMIN_DEFAULT_EMAIL}
        PGADMIN_DEFAULT_PASSWORD: \${PGADMIN_DEFAULT_PASSWORD}
      ports:
        - "&{PGADMIN_PORT}:80"
      depends_on:
        - db
        
    redis:
      image: redis:7
      container_name: \${APP_NAME}-redis
      restart: always
      environment:
        - REDIS_PASSWORD=\${REDIS_PASSWORD}
      ports:
        - "&{REDIS_PORT}:6379"
      command: ["redis-server", "--requirepass", "&{REDIS_PASSWORD}"]
      volumes:
        - redis_data:/data
      healthcheck:
        test: ["CMD", "redis-cli", "-a", "$REDIS_PASSWORD", "ping"]
        interval: 10s
        timeout: 5s
        retries: 3
  
  volumes:
    pg_data:
    redis_data:
    
  `,
};

// Create folders and files
folders.forEach(folder => fs.mkdirSync(folder, { recursive: true }));
Object.entries(files).forEach(([file, content]) => fs.writeFileSync(file, content));

console.log("✅ Project structure created successfully!");

// 🔄 Replace '&' with '$' in docker-compose.yml
const dockerComposePath = "docker-compose.yml";
const appPath = "app.js"
if (fs.existsSync(dockerComposePath)) {
  let content = fs.readFileSync(dockerComposePath, "utf8");
  content = content.replace(/&/g, "$"); // แทนที่ '&' ด้วย '$'
  fs.writeFileSync(dockerComposePath, content);
  console.log("✅ docker-compose.yml updated: '&' replaced with '$'");
}

// 🔄 Replace "http://localhost:{envConfig.appPort}" with "http://localhost:${envConfig.appPort}" in app.js
if (fs.existsSync(appPath)) {
  let content = fs.readFileSync(appPath, "utf8"); // ✅ อ่าน app.js
  content = content.replace(/"http:\/\/localhost:\{envConfig\.appPort\}"/g, `"http://localhost:\${envConfig.appPort}"`);
  fs.writeFileSync(appPath, content); // ✅ เขียนกลับไปที่ app.js
  console.log("✅ app.js updated: replaced placeholder with template literal");
}

// Copy env.text to .env if env.text exists
if (fs.existsSync("env.text")) {
  fs.copyFileSync("env.text", ".env");
  console.log("✅ .env file created from env.text");
} else {
  console.warn("⚠️ Warning: env.text not found. Please create a .env file manually.");
}

// Initialize Git and Install Dependencies
exec("git init && npm install", (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return;
    }
    console.log("✅ Git repository initialized and dependencies installed!");
  
    // Start Docker Compose
    console.log("🚀 Starting Docker containers...");
    exec("docker-compose up -d", (dockerError, dockerStdout, dockerStderr) => {
      if (dockerError) {
        console.error(`❌ Docker error: ${dockerError.message}`);
        return;
      }
      console.log("✅ Docker containers started successfully!");
  
      // Initialize Prisma
      exec("npx prisma init", (prismaInitError, prismaInitStdout, prismaInitStderr) => {
        if (prismaInitError) {
          console.error(`❌ Prisma init error: ${prismaInitError.message}`);
          return;
        }
        console.log("✅ Prisma initialized successfully!\n");
  
        // Define default Prisma schema
        const prismaSchema = `
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
}

model User {
    id        Int     @id @default(autoincrement())
    name      String
    email     String  @unique
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
        `;

        const prismaSeed = `
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 🗑️ Clear existing data (optional)
  await prisma.user.deleteMany();
  console.log("✅ Cleared existing users");

  // 🚀 Insert sample users
  const users = await prisma.user.createMany({
    data: [
      { name: "Alice Johnson", email: "alice@example.com" },
      { name: "Bob Smith", email: "bob@example.com" },
      { name: "Charlie Brown", email: "charlie@example.com" },
    ],
    skipDuplicates: true, // Avoids errors if data already exists
  });

  console.log(\`✅ Seeded $\{users.count}\ users successfully\`);
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Disconnected Prisma");
  });
`;
  
        // Write schema.prisma file
        fs.writeFileSync("prisma/schema.prisma", prismaSchema);
        console.log("✅ Default Prisma schema added!");
        fs.writeFileSync("prisma/seed.ts", prismaSeed);
        console.log("✅ Default Prisma seeded!");
        // Run Jest Tests
        exec("npm run test", (testError, testStdout, testStderr) => {
          if (testError) {
            console.error(`❌ Jest test error: ${testError.message}`);
            return;
          }
          console.log("✅ Jest tests ran successfully!\n", testStdout);
          console.log("🚀 Setup complete! Run 'npm run prisma:migrate -> npm run prisma:generate -> npm run prisma:seed -> npm run dev' to start the server.");
        });
      });
    });
  });