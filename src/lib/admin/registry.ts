import { asc, desc, eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

import * as schema from "@/db/schema";
import type { Tint } from "@/lib/tints";

/**
 * Admin collection registry — one config drives list/create/edit/delete for
 * every content type. Field definitions render the forms; the typed lambdas
 * keep drizzle's per-table types contained here.
 */
type Db = NodePgDatabase<typeof schema>;
export type Row = Record<string, unknown> & { id: number };

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "date"
  | "select"
  | "lines" // textarea → string[] (one item per line)
  | "json"; // textarea → JSON.parse

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  help?: string;
  /** render at half width */
  half?: boolean;
}

export interface CollectionDef {
  key: string;
  label: string;
  singular: string;
  tint: Tint;
  /** ContentIcon name */
  icon: string;
  fields: FieldDef[];
  listColumns: { name: string; label: string }[];
  list: (db: Db) => Promise<Row[]>;
  get: (db: Db, id: number) => Promise<Row | undefined>;
  create: (db: Db, data: Record<string, unknown>) => Promise<void>;
  update: (db: Db, id: number, data: Record<string, unknown>) => Promise<void>;
  remove: (db: Db, id: number) => Promise<void>;
}

const lines = (name: string, label: string, help?: string): FieldDef => ({
  name,
  label,
  type: "lines",
  help: help ?? "One item per line",
});
const text = (name: string, label: string, required = false, half = false): FieldDef => ({
  name,
  label,
  type: "text",
  required,
  half,
});
const num = (name: string, label: string): FieldDef => ({
  name,
  label,
  type: "number",
  half: true,
});

/* Builds the typed CRUD lambdas for a table with an `id` serial column. */
function crud<
  T extends
    | typeof schema.jobs
    | typeof schema.services
    | typeof schema.testimonials
    | typeof schema.caseStudies
    | typeof schema.faqs
    | typeof schema.posts
    | typeof schema.clientLogos
    | typeof schema.teamMembers,
>(table: T, orderBy: "sort" | "slug" | "publishedAt" | "postedAt" | "id") {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const t = table as any;
  return {
    list: async (db: Db): Promise<Row[]> => {
      const col = t[orderBy] ?? t.id;
      const order = orderBy === "publishedAt" || orderBy === "postedAt" ? desc(col) : asc(col);
      return (await db.select().from(t).orderBy(order)) as Row[];
    },
    get: async (db: Db, id: number): Promise<Row | undefined> => {
      const rows = (await db.select().from(t).where(eq(t.id, id))) as Row[];
      return rows[0];
    },
    create: async (db: Db, data: Record<string, unknown>): Promise<void> => {
      await db.insert(t).values(data as any);
    },
    update: async (db: Db, id: number, data: Record<string, unknown>): Promise<void> => {
      await db
        .update(t)
        .set(data as any)
        .where(eq(t.id, id));
    },
    remove: async (db: Db, id: number): Promise<void> => {
      await db.delete(t).where(eq(t.id, id));
    },
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export const COLLECTIONS: CollectionDef[] = [
  {
    key: "jobs",
    label: "Jobs",
    singular: "Job",
    tint: "sage",
    icon: "briefcase",
    listColumns: [
      { name: "title", label: "Title" },
      { name: "department", label: "Department" },
      { name: "location", label: "Location" },
      { name: "isFeatured", label: "Featured" },
      { name: "isActive", label: "Active" },
      { name: "postedAt", label: "Posted" },
    ],
    fields: [
      text("title", "Title", true),
      text("slug", "Slug", true, true),
      text("department", "Department", true, true),
      text("location", "Location", true, true),
      {
        name: "workMode",
        label: "Work mode",
        type: "select",
        options: ["On-site", "Hybrid", "Remote"],
        half: true,
      },
      {
        name: "employmentType",
        label: "Employment type",
        type: "select",
        options: ["Full-time", "Part-time", "Contract", "Internship"],
        half: true,
      },
      num("experienceMin", "Experience min (yrs)"),
      num("experienceMax", "Experience max (yrs)"),
      num("salaryMin", "Salary min"),
      num("salaryMax", "Salary max"),
      text("currency", "Currency symbol", false, true),
      text("salaryPeriod", "Salary period", false, true),
      { name: "summary", label: "Summary", type: "textarea", required: true },
      lines("description", "Description paragraphs"),
      lines("responsibilities", "Responsibilities"),
      lines("requirements", "Requirements"),
      lines("benefits", "Benefits"),
      lines("skills", "Skills"),
      { name: "postedAt", label: "Posted on", type: "date", half: true, required: true },
      { name: "closesAt", label: "Closes on", type: "date", half: true, required: true },
      { name: "isFeatured", label: "Featured on homepage", type: "boolean" },
      { name: "isActive", label: "Active (visible on site)", type: "boolean" },
    ],
    ...crud(schema.jobs, "postedAt"),
  },
  {
    key: "services",
    label: "Services",
    singular: "Service",
    tint: "lavender",
    icon: "layers",
    listColumns: [
      { name: "title", label: "Title" },
      { name: "slug", label: "Slug" },
      { name: "sort", label: "Order" },
    ],
    fields: [
      text("title", "Title", true),
      text("slug", "Slug", true, true),
      text("icon", "Icon name", true, true),
      { name: "shortDesc", label: "Short description", type: "textarea", required: true },
      lines("longDesc", "Long description paragraphs"),
      lines("features", "Features"),
      {
        name: "outcomes",
        label: "Outcomes",
        type: "json",
        help: 'JSON: [{"value":"96%","label":"..."}]',
      },
      { name: "sort", label: "Order", type: "number", half: true },
      text("metaTitle", "Meta title"),
      { name: "metaDescription", label: "Meta description", type: "textarea" },
    ],
    ...crud(schema.services, "sort"),
  },
  {
    key: "testimonials",
    label: "Testimonials",
    singular: "Testimonial",
    tint: "blush",
    icon: "message-square",
    listColumns: [
      { name: "author", label: "Author" },
      { name: "company", label: "Company" },
      { name: "rating", label: "Rating" },
      { name: "audience", label: "Audience" },
    ],
    fields: [
      { name: "quote", label: "Quote", type: "textarea", required: true },
      text("author", "Author", true, true),
      text("role", "Role", true, true),
      text("company", "Company", true, true),
      { name: "rating", label: "Rating (1-5)", type: "number", half: true },
      {
        name: "audience",
        label: "Audience",
        type: "select",
        options: ["employer", "candidate"],
        half: true,
      },
      { name: "sort", label: "Order", type: "number", half: true },
    ],
    ...crud(schema.testimonials, "sort"),
  },
  {
    key: "case-studies",
    label: "Case studies",
    singular: "Case study",
    tint: "peach",
    icon: "trending-up",
    listColumns: [
      { name: "client", label: "Client" },
      { name: "industry", label: "Industry" },
      { name: "slug", label: "Slug" },
    ],
    fields: [
      text("client", "Client", true, true),
      text("industry", "Industry", true, true),
      text("slug", "Slug", true, true),
      text("headline", "Headline", true),
      { name: "summary", label: "Summary", type: "textarea", required: true },
      lines("challenge", "Challenge paragraphs"),
      lines("solution", "Solution paragraphs"),
      lines("results", "Results"),
      {
        name: "metrics",
        label: "Metrics",
        type: "json",
        help: 'JSON: [{"value":"5 days","label":"..."}]',
      },
      text("metaTitle", "Meta title"),
      { name: "metaDescription", label: "Meta description", type: "textarea" },
    ],
    ...crud(schema.caseStudies, "slug"),
  },
  {
    key: "posts",
    label: "Blog posts",
    singular: "Post",
    tint: "mint",
    icon: "file-text",
    listColumns: [
      { name: "title", label: "Title" },
      { name: "category", label: "Category" },
      { name: "publishedAt", label: "Published" },
    ],
    fields: [
      text("title", "Title", true),
      text("slug", "Slug", true, true),
      text("category", "Category", true, true),
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
      text("author", "Author", true, true),
      text("authorRole", "Author role", false, true),
      { name: "publishedAt", label: "Published on", type: "date", half: true, required: true },
      { name: "readMinutes", label: "Read minutes", type: "number", half: true },
      {
        name: "body",
        label: "Body sections",
        type: "json",
        help: 'JSON: [{"heading":"...","paragraphs":["..."],"bullets":["..."]}]',
      },
      text("metaTitle", "Meta title"),
      { name: "metaDescription", label: "Meta description", type: "textarea" },
    ],
    ...crud(schema.posts, "publishedAt"),
  },
  {
    key: "faqs",
    label: "FAQs",
    singular: "FAQ",
    tint: "cream",
    icon: "clipboard-list",
    listColumns: [
      { name: "question", label: "Question" },
      { name: "category", label: "Category" },
      { name: "sort", label: "Order" },
    ],
    fields: [
      text("category", "Category", true, true),
      { name: "sort", label: "Order", type: "number", half: true },
      text("question", "Question", true),
      { name: "answer", label: "Answer", type: "textarea", required: true },
    ],
    ...crud(schema.faqs, "sort"),
  },
  {
    key: "logos",
    label: "Client logos",
    singular: "Logo",
    tint: "sage",
    icon: "handshake",
    listColumns: [
      { name: "name", label: "Name" },
      { name: "short", label: "Short mark" },
      { name: "sort", label: "Order" },
    ],
    fields: [
      text("name", "Company name", true, true),
      text("short", "Short mark", true, true),
      { name: "sort", label: "Order", type: "number", half: true },
    ],
    ...crud(schema.clientLogos, "sort"),
  },
  {
    key: "team",
    label: "Team",
    singular: "Team member",
    tint: "lavender",
    icon: "users",
    listColumns: [
      { name: "name", label: "Name" },
      { name: "role", label: "Role" },
      { name: "sort", label: "Order" },
    ],
    fields: [
      text("name", "Name", true, true),
      text("role", "Role", true, true),
      { name: "bio", label: "Bio", type: "textarea", required: true },
      lines("specialties", "Specialties"),
      { name: "sort", label: "Order", type: "number", half: true },
    ],
    ...crud(schema.teamMembers, "sort"),
  },
];

export function getCollection(key: string): CollectionDef | undefined {
  return COLLECTIONS.find((c) => c.key === key);
}

/** FormData → typed record, per the collection's field definitions. */
export function parseFields(
  fields: FieldDef[],
  formData: FormData
): { data: Record<string, unknown>; error?: string } {
  const data: Record<string, unknown> = {};
  for (const field of fields) {
    const raw = formData.get(field.name);
    const value = typeof raw === "string" ? raw : "";
    switch (field.type) {
      case "number":
        data[field.name] = Number(value) || 0;
        break;
      case "boolean":
        data[field.name] = value === "on";
        break;
      case "lines":
        data[field.name] = value
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
        break;
      case "json":
        try {
          data[field.name] = value.trim() ? JSON.parse(value) : [];
        } catch {
          return { data, error: `"${field.label}" is not valid JSON.` };
        }
        break;
      default:
        if (field.required && !value.trim()) {
          return { data, error: `"${field.label}" is required.` };
        }
        data[field.name] = value.trim();
    }
  }
  return { data };
}
