
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 🗑️ Clear existing data (optional)
  await prisma.sos_users.deleteMany();
  console.log("✅ Cleared existing users");

  // 🚀 Insert sample users
  const users = await prisma.sos_users.createMany({
    data: [
      { usr_username: "Alice Johnson", usr_email: "alice@example.com", usr_password: "password123", usr_role: "user" },
      { usr_username: "Bob Smith", usr_email: "bob@example.com", usr_password: "password123", usr_role: "user" },
      { usr_username: "Charlie Brown", usr_email: "charlie@example.com", usr_password: "password123", usr_role: "user" },
    ],
    skipDuplicates: true, // Avoids errors if data already exists
  });

  console.log(`✅ Seeded ${users.count} users successfully`);
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
