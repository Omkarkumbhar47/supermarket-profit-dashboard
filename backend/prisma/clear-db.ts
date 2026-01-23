import { prisma } from "../src/prisma/client";

async function clearDb() {
  console.log("🧹 Clearing database...");

  // Order matters because of foreign keys
  await prisma.inventoryLot.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.purchase.deleteMany();
  await prisma.product.deleteMany();
  await prisma.import.deleteMany();

  console.log("✅ Database cleared successfully");
}

clearDb()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
