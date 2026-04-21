import { auth } from "@/lib/auth";
import { UserType } from "@prisma/client";
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
export const requireRole = async (role: "ADMIN" | "user") => {
  const session = await requireAuth();

  if (session.user.role !== role) {
    redirect("/");
  }

  return session;
};

export const authGuard = cache(async (options?: { adminOnly?: boolean }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (options?.adminOnly) {
    const isNotAdmin = session.user.role !== UserType.ADMIN;
    const hasNoGroup = !session.user.groupId;

    if (isNotAdmin) {
      console.log("DEBUG: Redirecting because role is:", session.user.role);
      redirect("/dashboard");
    }

    if (hasNoGroup) {
      console.log("DEBUG: Redirecting because groupId is missing");
      redirect("/dashboard");
    }
  }

  return session;
});
