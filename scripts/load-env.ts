import fs from "node:fs";
import path from "node:path";

/**
 * Minimal .env loader for CLI tooling (drizzle-kit, seed script) — Next.js
 * loads these files itself, but plain Node processes don't. Never overrides
 * variables already present in the environment.
 */
for (const file of [".env.production", ".env.local", ".env"]) {
  const p = path.join(process.cwd(), file);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) continue;
    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}
