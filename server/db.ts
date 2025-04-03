import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@shared/schema";
import { log } from "./vite";

// Get the database URL from environment variables
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Create a connection pool
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // This is needed for Replit to work with Postgres
  },
});

// Create the drizzle instance with the schema
export const db = drizzle(pool, { schema });

// Function to close the database connection
export const closeDbConnection = async () => {
  await pool.end();
};

// Test database connection
export const testDbConnection = async () => {
  try {
    const client = await pool.connect();
    log("Successfully connected to PostgreSQL database", "db");
    client.release();
    return true;
  } catch (error) {
    console.error("Error connecting to PostgreSQL database:", error);
    return false;
  }
};