import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// สร้าง Connection Pool จาก PostgreSQL URL ใน .env
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// ส่ง adapter เข้าไปใน constructor ของ PrismaClient
export const prisma = new PrismaClient({ adapter });
