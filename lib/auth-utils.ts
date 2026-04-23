import { auth } from "@/lib/auth";
import { GroupRole } from "@prisma/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { prisma } from "./db";

/**
 * Get current session.
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
 * GATEKEEPER: Ensures user is authenticated AND verified.
 * If authenticated but NOT verified, redirects to a pending page.
 */
export const requireVerifiedAuth = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // Fetch latest user status from DB (session might be stale)
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isVerified: true, isSuperAdmin: true },
  });

  if (!user?.isVerified && !user?.isSuperAdmin) {
    redirect("/verification-pending");
  }

  return { session, user };
};

/**
 * SUPER ADMIN GUARD: Only allows the Architect/Global Admin.
 */
export const requireSuperAdmin = async () => {
  const { session, user } = await requireVerifiedAuth();

  if (!user.isSuperAdmin) {
    redirect("/dashboard");
  }

  return { session, user };
};

/**
 * GROUP OWNER GUARD: Ensures user is the OWNER of a specific group.
 * Used for loan approvals and group settings.
 */
export const requireGroupOwner = async (groupId: string) => {
  const { session } = await requireVerifiedAuth();

  const membership = await prisma.membership.findUnique({
    where: {
      userId_groupId: {
        userId: session.user.id,
        groupId: groupId,
      },
    },
  });

  if (membership?.role !== GroupRole.OWNER) {
    redirect("/dashboard");
  }

  return { session, membership };
};

/**
 * REFINED AUTH GUARD:
 * Main utility for layouts and pages.
 */
export const authGuard = cache(
  async (options?: { superAdminOnly?: boolean; verifiedOnly?: boolean }) => {
    const session = await getSession();

    if (!session) {
      redirect("/login");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    const membership = await prisma.membership.findFirst({
      where: {
        userId: session.user.id,
      },
      select: {
        groupId: true,
        role: true,
      },
    });

    if (!user) redirect("/login");

    if (
      options?.verifiedOnly !== false &&
      !user.isVerified &&
      !user.isSuperAdmin
    ) {
      redirect("/verification-pending");
    }

    if (options?.superAdminOnly && !user.isSuperAdmin) {
      redirect("/dashboard");
    }

    return { session, user, membership };
  },
);
