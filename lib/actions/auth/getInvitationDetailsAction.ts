"use server";

import { prisma } from "@/lib/db";

export async function getInvitationDetailsAction(token: string) {
  try {
    if (!token) {
      return { error: "No invitation token provided." };
    }
    const allowed = await prisma.allowedUser.findUnique({
      where: { token: token },
      select: {
        email: true,
        phoneNumber: true,
        groupId: true,
        expiresAt: true,
      },
    });

    if (!allowed) {
      return {
        error: "This invitation link has already been used or never existed.",
      };
    }

    const isExpired = new Date() > new Date(allowed.expiresAt);

    if (isExpired) {
      return {
        error: "This invitation link has expired. Please request a new one.",
      };
    }

    return {
      email: allowed.email,
      phoneNumber: allowed.phoneNumber,
      groupId: allowed.groupId,
    };
  } catch (error) {
    console.error("GET_INVITATION_ERROR:", error);
    return { error: "An error occurred while verifying the invitation." };
  }
}
