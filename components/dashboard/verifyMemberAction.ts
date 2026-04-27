"use server";

import { prisma } from "@/lib/db";
import { authGuard } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function verifyMemberAction(userId: string, groupId: string) {
  try {
    const { membership } = await authGuard(groupId);

    if (membership?.role !== "OWNER") {
      return {
        success: false,
        message: "Unauthorized: Only group owners can verify members.",
      };
    }

    const target = await prisma.membership.findUnique({
      where: { userId_groupId: { userId, groupId } },
    });
    if (!target) {
      return { success: false, message: "User is not a member of this group." };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });

    revalidatePath(`/(dashboard)/dashboard/${groupId}`);
    revalidatePath(`/(dashboard)/dashboard/${groupId}/approvals`);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to verify member",
    };
  }
}
