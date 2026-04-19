"use server";

import { prisma } from "@/lib/db";
import { LoanStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { authGuard } from "../auth-utils";

export async function requestTopUpAction({
  amount,
  description,
}: {
  amount: number;
  description: string;
}) {
  const session = await authGuard();
  if (!session?.user) throw new Error("Unauthorized");

  const activeLoan = await prisma.memberLoan.findFirst({
    where: {
      userId: session.user.id,
      status: LoanStatus.ACTIVE,
    },
  });

  if (!activeLoan) {
    throw new Error("No active loan found to top up.");
  }

  await prisma.memberLoan.create({
    data: {
      userId: session.user.id,
      amount: amount,
      description: `TOP-UP: ${description}`,
      status: LoanStatus.REQUEST,
      interestRate: activeLoan.interestRate, // Keep original rate
    },
  });

  revalidatePath("/dashboard");
  return { success: true };
}
