"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { GroupRole } from "@prisma/client";

export async function signUpMemberAction({
  token,
  password,
}: {
  token: string;
  password: string;
}) {
  const allowed = await prisma.allowedUser.findUnique({
    where: { token: token },
  });
  console.log({ allowed });
  if (!allowed) {
    return { error: "Invalid or expired invitation link." };
  }

  if (allowed.expiresAt && new Date() > new Date(allowed.expiresAt)) {
    return {
      error: "This invitation link has expired. Please contact your admin.",
    };
  }

  try {
    const res = await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        email: allowed.email.toLowerCase(),
        phoneNumber: allowed.phoneNumber,
        name: allowed.email.split("@")[0],
        role: allowed.role,
        password: password,
      },
    });

    if (!res?.user) {
      return { error: "Failed to create account profile." };
    }

    await prisma.$transaction(async (tx) => {
      await tx.membership.create({
        data: {
          userId: res.user.id,
          groupId: allowed.groupId,
          role: allowed.role || GroupRole.MEMBER,
        },
      });

      await tx.allowedUser.delete({
        where: { token: token },
      });
    });

    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "An error occurred during registration",
    };
  }
}
