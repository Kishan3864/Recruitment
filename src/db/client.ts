import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

/**
 * Lazy Postgres client. When DATABASE_URL is absent (local dev without a DB),
 * `getDb()` returns null and the content layer falls back to seed data — the
 * site keeps working everywhere. Pool is a global singleton (hot-reload safe).
 */
type Db = NodePgDatabase<typeof schema>;

const globalForDb = globalThis as unknown as { __recruitmentPool?: Pool };

export function getDb(): Db | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!globalForDb.__recruitmentPool) {
    globalForDb.__recruitmentPool = new Pool({ connectionString: url, max: 5 });
  }
  return drizzle(globalForDb.__recruitmentPool, { schema });
}

/**
 * Run a query if a DB is configured; return null (→ seed fallback) when the
 * DB is absent or unreachable. Content getters never throw because of the DB.
 */
export async function safeQuery<T>(fn: (db: Db) => Promise<T>): Promise<T | null> {
  const db = getDb();
  if (!db) return null;
  try {
    return await fn(db);
  } catch (err) {
    console.error("[db] query failed, using seed fallback:", err);
    return null;
  }
}

export { schema };
