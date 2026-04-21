import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { neonConfig } from "@neondatabase/serverless";

// 1. WebSocket setup remains mandatory for local Node.js dev
if (typeof window === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("❌ DATABASE_URL is missing in .env");
}

// 2. NEW API: Pass the connection string DIRECTLY to PrismaNeon
// Do not create a separate 'new Pool()'
const adapter = new PrismaNeon({ connectionString });

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, // The modern adapter handles the pool internally
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
