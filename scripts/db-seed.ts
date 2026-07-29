import "./load-env";

import bcrypt from "bcryptjs";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { posts } from "../src/data/seed/blog";
import { caseStudies } from "../src/data/seed/case-studies";
import { faqs } from "../src/data/seed/faqs";
import { jobs } from "../src/data/seed/jobs";
import { clientLogos } from "../src/data/seed/logos";
import { services } from "../src/data/seed/services";
import { siteSettings } from "../src/data/seed/site";
import { team } from "../src/data/seed/team";
import { testimonials } from "../src/data/seed/testimonials";
import * as schema from "../src/db/schema";

/**
 * One-time import: seed content → Postgres (only into EMPTY tables, so
 * re-running never overwrites admin edits) + admin user from
 * ADMIN_EMAIL / ADMIN_PASSWORD env vars (upserted, so it can rotate the
 * password). Run: npm run db:seed
 */
async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  const pool = new Pool({ connectionString: url });
  const db = drizzle(pool, { schema });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isEmpty = async (table: any): Promise<boolean> => {
    const [row] = await db.select({ n: sql<number>`count(*)::int` }).from(table);
    return row.n === 0;
  };

  if (await isEmpty(schema.jobs)) {
    await db.insert(schema.jobs).values(jobs.map((j) => ({ ...j })));
    console.log(`seeded jobs (${jobs.length})`);
  }
  if (await isEmpty(schema.services)) {
    await db
      .insert(schema.services)
      .values(services.map(({ order, ...s }) => ({ ...s, sort: order })));
    console.log(`seeded services (${services.length})`);
  }
  if (await isEmpty(schema.testimonials)) {
    await db.insert(schema.testimonials).values(testimonials.map((t, i) => ({ ...t, sort: i })));
    console.log(`seeded testimonials (${testimonials.length})`);
  }
  if (await isEmpty(schema.caseStudies)) {
    await db.insert(schema.caseStudies).values(caseStudies.map((c) => ({ ...c })));
    console.log(`seeded case studies (${caseStudies.length})`);
  }
  if (await isEmpty(schema.faqs)) {
    await db.insert(schema.faqs).values(faqs.map((f, i) => ({ ...f, sort: i })));
    console.log(`seeded faqs (${faqs.length})`);
  }
  if (await isEmpty(schema.posts)) {
    await db.insert(schema.posts).values(posts.map((p) => ({ ...p })));
    console.log(`seeded posts (${posts.length})`);
  }
  if (await isEmpty(schema.clientLogos)) {
    await db.insert(schema.clientLogos).values(clientLogos.map((l, i) => ({ ...l, sort: i })));
    console.log(`seeded client logos (${clientLogos.length})`);
  }
  if (await isEmpty(schema.teamMembers)) {
    await db.insert(schema.teamMembers).values(team.map((m, i) => ({ ...m, sort: i })));
    console.log(`seeded team (${team.length})`);
  }
  if (await isEmpty(schema.settings)) {
    await db.insert(schema.settings).values({ key: "site", value: siteSettings });
    console.log("seeded site settings");
  }

  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const passwordHash = await bcrypt.hash(password, 12);
    await db
      .insert(schema.adminUsers)
      .values({ email, passwordHash, name: "Admin" })
      .onConflictDoUpdate({ target: schema.adminUsers.email, set: { passwordHash } });
    console.log(`admin user ready: ${email}`);
  } else {
    console.log("ADMIN_EMAIL / ADMIN_PASSWORD not set — skipped admin user");
  }

  await pool.end();
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
