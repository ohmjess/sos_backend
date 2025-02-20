import { PrismaClient } from "@prisma/client";

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
