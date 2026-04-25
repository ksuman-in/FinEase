"use server";

import { revalidatePath } from "next/cache";
import { authGuard } from "../auth-utils";
import { prisma } from "../db";
import { LoanStatus } from "@prisma/client";
import { formatCurrency, formatTime } from "../utils/date-logic";
import getTotalInHand from "./getTotalInHand";

export default async function requestLoanAction({
  amount,
  description,
  groupId,
}: {
  amount: number;
  description: string;
  groupId: string | null | undefined;
}) {
  if (!groupId) throw new Error("Unauthorized");

  const { user } = await authGuard(groupId);
  const userId = user.id;

  if (!userId) throw new Error("Unauthorized");

  const availableCash = await getTotalInHand();

  const floatAmount = parseFloat(`${amount}`);
  if (!Number.isFinite(floatAmount) || floatAmount <= 0) {
    return { success: false, error: "Invalid loan amount" };
  }

  const existingActiveLoan = await prisma.memberLoan.findFirst({
    where: {
      userId: userId,
      groupId,
      status: LoanStatus.REQUEST,
    },
  });
  if (existingActiveLoan) {
    const { amount, issuedAt } = existingActiveLoan;
    return {
      success: false,
      error: `You have already requested loan for amount: ${formatCurrency(amount)} on ${formatTime({ time: issuedAt, format: "DD-MMM,YYYY" })}`,
    };
  }

  if (amount > availableCash) {
    return {
      success: false,
      error: `Insufficient group funds. Current available cash is ${formatCurrency(availableCash)}.`,
      code: "INSUFFICIENT_FUNDS",
    };
  }

  const settings = await prisma.globalSettings.findFirst();

  const interestRate = parseFloat(
    String(settings?.memberInterestRate ? settings.memberInterestRate / 12 : 1),
  );

  try {
    await prisma.memberLoan.create({
      data: {
        userId,
        groupId,
        amount: floatAmount,
        interestRate: interestRate,
        status: LoanStatus.REQUEST,
        description: `New Request at (${formatTime({})}) ${description}`,
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to process loan request";
    return { success: false, error: errorMessage };
  }
}
