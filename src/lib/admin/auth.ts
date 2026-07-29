import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { getDb, schema } from "@/db/client";

/**
 * Admin session auth: HS256 JWT in an httpOnly cookie (7 days).
 * Secret comes from ADMIN_SESSION_SECRET; middleware verifies the same
 * token at the edge before any /admin route renders.
 */
const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7;

const secret = () =>
  new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET || "dev-only-secret-change-me");

export interface AdminSession {
  id: number;
  email: string;
  name: string;
}

export async function createSession(user: AdminSession): Promise<void> {
  const token = await new SignJWT({ email: user.email, name: user.name })
    .setSubject(String(user.id))
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const token = (await cookies()).get(COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret());
    return {
      id: Number(payload.sub),
      email: String(payload.email ?? ""),
      name: String(payload.name ?? "Admin"),
    };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

/** Layout/action guard — bounces to the login page when unauthenticated. */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function verifyCredentials(
  email: string,
  password: string
): Promise<AdminSession | null> {
  const db = getDb();
  if (!db) return null;
  const [user] = await db
    .select()
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.email, email.toLowerCase().trim()));
  if (!user) {
    // constant-ish time: still burn a hash comparison
    await bcrypt.compare(password, "$2a$12$invalidinvalidinvalidinvalidinvalid1234567890123456");
    return null;
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  return ok ? { id: user.id, email: user.email, name: user.name } : null;
}
