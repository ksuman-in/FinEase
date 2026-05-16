// lib/actions/memberships.ts
"use server";

import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { GroupRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function processMemberApprovalAction(
  membershipId: string,
  groupId: string,
  action: "ACTIVATE" | "REJECT",
) {
  try {
    const session = await authGuard(groupId);

    const operator = await prisma.membership.findUnique({
      where: { userId_groupId: { userId: session.user.id, groupId } },
    });

    if (!operator || operator.role !== GroupRole.OWNER) {
      return {
        success: false,
        message: "Forbidden: Administrative access required.",
      };
    }
    // Fetch the membership to get the actual userId
    const membership = await prisma.membership.findUnique({
      where: { id: membershipId },
    });

    if (!membership) {
      return {
        success: false,
        message: "Membership not found.",
      };
    }

    if (action === "ACTIVATE") {
      await prisma.user.update({
        where: { id: membership.userId },
        data: { isVerified: true },
      });

      revalidatePath(`/dashboard/${groupId}`);
      revalidatePath(`/dashboard/${groupId}/owner/approve-members`);

      return {
        success: true,
        message:
          "Identity cleared. Member initialized into vault analytics successfully.",
      };
    } else {
      await prisma.user.update({
        where: { id: membership.userId },
        data: { isVerified: false },
      });

      revalidatePath(`/dashboard/${groupId}/owner/approve-members`);
      return {
        success: true,
        message:
          "Application flagged and restricted due to non-compliance status.",
      };
    }
  } catch (error) {
    console.error("Compliance Sync Defect:", error);
    return {
      success: false,
      message: "Server Protocol Error: Database sync anomaly.",
    };
  }
}
