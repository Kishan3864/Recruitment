import {
  boolean,
  date,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * Postgres schema — mirrors the content-layer types in src/types/content.ts
 * (scalar fields as real columns, nested arrays/objects as jsonb) so DB rows
 * map 1:1 onto the shapes components already consume.
 */

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull().default("Admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  location: text("location").notNull(),
  workMode: text("work_mode").notNull(),
  employmentType: text("employment_type").notNull(),
  experienceMin: integer("experience_min").notNull().default(0),
  experienceMax: integer("experience_max").notNull().default(0),
  salaryMin: integer("salary_min").notNull().default(0),
  salaryMax: integer("salary_max").notNull().default(0),
  currency: text("currency").notNull().default("₹"),
  salaryPeriod: text("salary_period").notNull().default("LPA"),
  summary: text("summary").notNull(),
  description: jsonb("description").$type<string[]>().notNull().default([]),
  responsibilities: jsonb("responsibilities").$type<string[]>().notNull().default([]),
  requirements: jsonb("requirements").$type<string[]>().notNull().default([]),
  benefits: jsonb("benefits").$type<string[]>().notNull().default([]),
  skills: jsonb("skills").$type<string[]>().notNull().default([]),
  isFeatured: boolean("is_featured").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  postedAt: date("posted_at", { mode: "string" }).notNull(),
  closesAt: date("closes_at", { mode: "string" }).notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  icon: text("icon").notNull(),
  shortDesc: text("short_desc").notNull(),
  longDesc: jsonb("long_desc").$type<string[]>().notNull().default([]),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  outcomes: jsonb("outcomes").$type<{ value: string; label: string }[]>().notNull().default([]),
  sort: integer("sort").notNull().default(0),
  metaTitle: text("meta_title").notNull().default(""),
  metaDescription: text("meta_description").notNull().default(""),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  quote: text("quote").notNull(),
  author: text("author").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  rating: integer("rating").notNull().default(5),
  audience: text("audience").notNull().default("employer"),
  sort: integer("sort").notNull().default(0),
});

export const caseStudies = pgTable("case_studies", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  client: text("client").notNull(),
  industry: text("industry").notNull(),
  headline: text("headline").notNull(),
  summary: text("summary").notNull(),
  challenge: jsonb("challenge").$type<string[]>().notNull().default([]),
  solution: jsonb("solution").$type<string[]>().notNull().default([]),
  results: jsonb("results").$type<string[]>().notNull().default([]),
  metrics: jsonb("metrics").$type<{ value: string; label: string }[]>().notNull().default([]),
  metaTitle: text("meta_title").notNull().default(""),
  metaDescription: text("meta_description").notNull().default(""),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sort: integer("sort").notNull().default(0),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  authorRole: text("author_role").notNull().default(""),
  publishedAt: date("published_at", { mode: "string" }).notNull(),
  readMinutes: integer("read_minutes").notNull().default(4),
  body: jsonb("body")
    .$type<{ heading?: string; paragraphs: string[]; bullets?: string[] }[]>()
    .notNull()
    .default([]),
  metaTitle: text("meta_title").notNull().default(""),
  metaDescription: text("meta_description").notNull().default(""),
});

export const clientLogos = pgTable("client_logos", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  short: text("short").notNull(),
  sort: integer("sort").notNull().default(0),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  specialties: jsonb("specialties").$type<string[]>().notNull().default([]),
  sort: integer("sort").notNull().default(0),
});

/** Key-value store for singletons — site settings live under key "site". */
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  kind: text("kind").notNull(), // "contact" | "application"
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  jobSlug: text("job_slug"),
  payload: jsonb("payload").$type<Record<string, string>>().notNull().default({}),
  status: text("status").notNull().default("new"), // "new" | "handled"
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
