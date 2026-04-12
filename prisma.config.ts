import * as dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config();

// Use the key that actually exists in your .env
const url = process.env.DATABASE_URL_UNPOOLED;

if (!url) {
  console.error("❌ Error: DATABASE_URL_UNPOOLED is missing");
  process.exit(1);
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: url || process.env.DIRECT_URL,
  },
});
