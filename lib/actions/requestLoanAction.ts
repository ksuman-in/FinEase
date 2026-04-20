"use server";

import { revalidatePath } from "next/cache";
import { authGuard } from "../auth-utils";
import { prisma } from "../db";
import { LoanStatus } from "@prisma/client";

export default async function requestLoanAction({
  amount,
  description,
}: {
  amount: number;
  description: string;
}) {
  const session = await authGuard();
  const userId = session.user.id;

  if (!userId) throw new Error("Unauthorized");
  const floatAmount = parseFloat(`${amount}`);
  if (!Number.isFinite(floatAmount) || floatAmount <= 0) {
    return { success: false, error: "Invalid loan amount" };
  }

  const settings = await prisma.globalSettings.findFirst();

  const interestRate = parseFloat(
    String(settings?.memberInterestRate ? settings.memberInterestRate / 12 : 1),
  );

  try {
    await prisma.memberLoan.create({
      data: {
        userId,
        amount: floatAmount,
        interestRate: interestRate,
        status: LoanStatus.REQUEST,
        description: `New Request at (${new Date().toLocaleString("default", { month: "long", year: "2-digit" })}) ${description}`,
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
