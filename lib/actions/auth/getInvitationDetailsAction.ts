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
      },
    });

    if (!allowed) {
      return { error: "This invitation link is invalid or has expired." };
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
