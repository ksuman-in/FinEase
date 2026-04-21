import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

/**
 * Get the current session on the server.
 * Wrapped in React 'cache' to prevent multiple DB calls if
 * used in both layout and page.
 */
export const getSession = cache(async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (error) {
    console.error("Session fetch failed:", error);
    return null;
  }
});

/**
 * Ensures the user is authenticated.
 * Redirects to login if no session exists.
 */
export const requireAuth = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
};

/**
 * Ensures the user has a specific role (e.g., 'admin').
 * Redirects to dashboard if they don't have permission.
 */
export const requireRole = async (role: "admin" | "user") => {
  const session = await requireAuth();

  if (session.user.role !== role) {
    redirect("/");
  }

  return session;
};

export const authGuard = cache(async (options?: { adminOnly?: boolean }) => {
  // 1. Fetch session from Better Auth
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. If no session, kick to login
  if (!session) {
    redirect("/login");
  }

  // 3. If admin area and user is a mere mortal, kick to dashboard
  if (options?.adminOnly && session.user.role !== "admin") {
    redirect("/dashboard");
  }

  // 4. Return the session for use in the component
  return session;
});
