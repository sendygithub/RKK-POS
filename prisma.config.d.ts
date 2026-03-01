// prisma.config.ts
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Ini akan mengambil DATABASE_URL dari file .env kamu secara otomatis
    url: process.env.DATABASE_URL,
  },
});
