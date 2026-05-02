"use server";

import { prisma } from "@/lib/db";
import { requireSuperAdmin } from "../auth-utils";
import { GroupRole, Prisma } from "@prisma/client";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { revalidatePath } from "next/cache";

export async function inviteMemberAction(
  email: string,
  phone: string,
  groupId: string | undefined,
  role: GroupRole,
) {
  try {
    if (!groupId) {
      return { success: false, message: "Unauthorized: Missing Group ID." };
    }

    await requireSuperAdmin();
    const normalizedEmail = email.toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      const existingMembership = await prisma.membership.findUnique({
        where: {
          userId_groupId: {
            userId: existingUser.id,
            groupId: groupId,
          },
        },
      });

      if (existingMembership) {
        return {
          success: false,
          message: "Member is already active in this group.",
        };
      }

      await prisma.membership.create({
        data: {
          userId: existingUser.id,
          groupId: groupId,
          role: role,
        },
      });
      revalidatePath("/admin");
      return {
        success: true,
        message: `Success! ${normalizedEmail} has been added directly to the group.`,
      };
    }

    const EXPIRES_IN_DAYS = 7;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + EXPIRES_IN_DAYS);
    const newToken = crypto.randomUUID();

    const allowedUser = await prisma.allowedUser.upsert({
      where: {
        email_groupId: { email: normalizedEmail, groupId },
      },
      update: {
        token: newToken,
        expiresAt,
        phoneNumber: phone,
        role,
      },
      create: {
        email: normalizedEmail,
        phoneNumber: phone,
        groupId,
        token: newToken,
        role,
        expiresAt,
      },
    });

    const baseUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";
    const inviteLink = `${baseUrl}/register?token=${encodeURIComponent(allowedUser.token)}`;
    revalidatePath("/admin");
    return {
      success: true,
      inviteLink,
      message: "New user whitelisted. Please share the invite link.",
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("Invite Action Error:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "A conflict occurred with this group membership.",
      };
    }

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "A protocol error occurred.",
    };
  }
}
