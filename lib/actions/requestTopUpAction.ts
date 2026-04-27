"use server";

import { prisma } from "@/lib/db";
import { LoanStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { authGuard } from "../auth-utils";
import getTotalInHand from "./getTotalInHand";
import { formatCurrency } from "../utils/date-logic";

export async function requestTopUpAction({
  amount,
  description,
  groupId,
}: {
  amount: number;
  description: string;
  groupId: string;
}) {
  const { user } = await authGuard(groupId);
  if (!user.id) throw new Error("Unauthorized");

  if (!Number.isFinite(amount) || amount <= 0) {
    return {
      success: false,
      error: "Top-up amount must be greater than zero.",
    };
  }

  const availableCash = await getTotalInHand(groupId);

  const activeLoan = await prisma.memberLoan.findFirst({
    where: {
      userId: user.id,
      status: LoanStatus.ACTIVE,
      groupId,
    },
  });

  if (!activeLoan) {
    throw new Error("No active loan found to top up.");
  }

  const existingPendingRequest = await prisma.memberLoan.findFirst({
    where: {
      userId: user.id,
      status: LoanStatus.REQUEST,
      groupId,
    },
    select: { id: true },
  });

  if (existingPendingRequest) {
    return {
      success: false,
      error: "A loan request is already pending approval.",
    };
  }

  if (amount > availableCash) {
    return {
      success: false,
      error: `Insufficient group funds. Current available cash is ${formatCurrency(availableCash)}.`,
      code: "INSUFFICIENT_FUNDS",
    };
  }

  await prisma.memberLoan.create({
    data: {
      userId: user.id,
      groupId: activeLoan?.groupId,
      amount: amount,
      description: `TOP-UP: ${description}`,
      status: LoanStatus.REQUEST,
      interestRate: activeLoan.interestRate,
    },
  });

  revalidatePath("/dashboard");
  return { success: true };
}
