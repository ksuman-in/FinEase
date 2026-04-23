"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { GroupRole } from "@prisma/client";

export async function signUpMemberAction({
  email,
  password,
  phone,
}: {
  email: string;
  password: string;
  phone: string;
}) {
  const allowed = await prisma.allowedUser.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!allowed) {
    throw new Error("You must be invited by an agent to register.");
  }

  try {
    const res = await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        email: email.toLowerCase(),
        phoneNumber: allowed.phoneNumber || phone,
        name: email.split("@")[0],
        password: password,
      },
    });

    await prisma.membership.create({
      data: {
        userId: res.user.id,
        groupId: allowed.groupId,
        role: GroupRole.MEMBER,
      },
    });

    return { success: true };
  } catch (error) {
    return {
      error: (error instanceof Error && error.message) || "Login failed",
    };
  }
}
