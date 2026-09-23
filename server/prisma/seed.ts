import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const titles = ["Buy groceries", "Read a book", "Call mom"];

const descriptions = ["at 5pm", "weekly", "carefully", undefined];

const randomValue = <T>(values: T[]) =>
  values[Math.floor(Math.random() * values.length)];

async function main() {
  await prisma.todos.deleteMany();

  await prisma.todos.createMany({
    data: Array.from({ length: 10 }, () => ({
      title: randomValue(titles),
      description: randomValue(descriptions),
      completed: false,
    })),
  });

  console.log("seeded database successfully");
}

main()
  .catch((err) => {
    console.error(`failed to seed database:\n${err}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
