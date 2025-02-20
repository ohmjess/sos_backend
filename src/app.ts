import express from "express";
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
    message: `Welcome to the ${envConfig.appName} API!`,
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
    console.log(`[INFO] Server running on port http://localhost:${envConfig.appPort}`);
  });
});

export default app;
