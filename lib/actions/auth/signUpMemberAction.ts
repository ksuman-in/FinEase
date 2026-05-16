"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { GroupRole, Prisma } from "@prisma/client";

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

  if (allowed.expiresAt && new Date() > new Date(allowed.expiresAt)) {
    return {
      error: "This invitation link has expired. Please contact your admin.",
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: allowed.email.toLowerCase() },
        { phoneNumber: allowed.phoneNumber },
      ],
    },
  });

  if (existingUser) {
    if (existingUser.email === allowed.email.toLowerCase()) {
      return {
        error:
          "An account already exists with this email. Please login instead.",
      };
    }

    return {
      error:
        "This phone number is already registered. Please use the existing account or contact support.",
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
    let message =
      error instanceof Error
        ? error.message
        : "An error occurred during registration";

    const prismaError =
      error instanceof Prisma.PrismaClientKnownRequestError
        ? error
        : error && typeof error === "object" && "cause" in error
          ? ((error as { cause?: unknown }).cause as unknown)
          : undefined;

    if (
      prismaError instanceof Prisma.PrismaClientKnownRequestError &&
      prismaError.code === "P2002"
    ) {
      if (Array.isArray(prismaError.meta?.target)) {
        if (prismaError.meta.target.includes("phoneNumber")) {
          message =
            "This phone number is already registered. Please use a different phone number or contact support.";
        } else if (prismaError.meta.target.includes("email")) {
          message =
            "This email is already registered. Please login or use a different email.";
        } else {
          message =
            "A unique field conflict occurred during registration. Verify your email and phone number.";
        }
      }
    }

    return { error: message };
  }
}
