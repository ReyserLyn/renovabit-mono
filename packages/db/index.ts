/** biome-ignore-all lint/performance/noNamespaceImport: <Is schema database> */
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

export const db = drizzle({
  connection: {
    connectionString: databaseUrl,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  },
  schema,
});
