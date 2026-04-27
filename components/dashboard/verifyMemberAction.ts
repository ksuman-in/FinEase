"use server";

import { prisma } from "@/lib/db";
import { authGuard } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function verifyMemberAction(userId: string, groupId: string) {
  try {
    const { membership } = await authGuard(groupId);

    if (membership?.role !== "OWNER") {
      throw new Error("Unauthorized: Only group owners can verify members.");
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
      error: error instanceof Error ? error.message : "Failed to verify member",
    };
  }
}
