"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function signUpMemberAction(
  values: { password: string },
  email: string,
  phone: string,
) {
  // 1. Fetch the invitation
  const invited = await prisma.allowedUser.findFirst({
    where: {
      email: email.toLowerCase(),
      phoneNumber: phone,
    },
  });

  if (!invited || !invited.groupId) {
    return { success: false, error: "Invitation record not found." };
  }

  try {
    const res = await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        email: email.toLowerCase(),
        password: values.password,
        name: email.split("@")[0],
        phoneNumber: phone,
        groupId: invited.groupId,
        role: "MEMBER",
      },
    });

    // Better-Auth returns the user object on success, or throws/returns error object
    // We normalize it here for the client
    return { data: res, error: null };
  } catch (err) {
    return {
      data: null,
      error: (err instanceof Error && err.message) || "Registration failed",
    };
  }
}
