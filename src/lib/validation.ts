import { z } from "zod";

/**
 * Shared form schemas — used by client forms (react-hook-form resolver) and
 * re-validated on the server inside Server Actions (never trust the client).
 */

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;
export const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const applicationSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^[+\d][\d\s-]+$/),
  location: z.string().trim().min(2).max(120),
  experienceYears: z
    .string()
    .trim()
    .min(1)
    .max(4)
    .regex(/^\d+(\.\d)?$/),
  currentRole: z.string().trim().min(2).max(160),
  expectedSalary: z.string().trim().min(1).max(40),
  noticePeriod: z.string().trim().min(1).max(40),
  linkedin: z.string().trim().max(300).optional().or(z.literal("")),
  coverNote: z.string().trim().max(2000).optional().or(z.literal("")),
  jobSlug: z.string().trim().max(200).optional().or(z.literal("")),
});

export const leadSchema = z.object({
  company: z.string().trim().min(2).max(160),
  fullName: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^[+\d][\d\s-]+$/),
  hiringFor: z.string().trim().min(2).max(400),
  headcount: z.string().trim().min(1).max(20),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const contactSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  subject: z.string().trim().min(2).max(200),
  message: z.string().trim().min(5).max(3000),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
