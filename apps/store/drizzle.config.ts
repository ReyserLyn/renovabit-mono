import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

const isDev = process.env.NODE_ENV === "development";
config({ path: isDev ? ".env.local" : ".env" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
