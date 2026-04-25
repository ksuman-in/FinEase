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

  if (!allowed) {
    return { error: "Invalid or expired invitation link." };
  }

  try {
    const res = await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        email: allowed.email.toLowerCase(),
        phoneNumber: allowed.phoneNumber,
        name: allowed.email.split("@")[0],
        password: password,
      },
    });

    if (!res?.user) {
      return { error: "Failed to create account profile." };
    }

    await prisma.membership.create({
      data: {
        userId: res.user.id,
        groupId: allowed.groupId,
        role: GroupRole.MEMBER,
      },
    });

    await prisma.allowedUser.delete({
      where: { token: token },
    });

    return { success: true };
  } catch (error) {
    return {
      error:
        (error instanceof Error && error.message) ||
        "An error occurred during registration",
    };
  }
}
