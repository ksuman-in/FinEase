"use server";

import { revalidatePath } from "next/cache";
import { authGuard } from "../auth-utils";
import { prisma } from "../db";

export default async function requestLoanAction(amount: number) {
  const session = await authGuard();
  const userId = session.user.id;

  if (!session?.user) throw new Error("Unauthorized");

  const activeLoan = await prisma.memberLoan.findFirst({
    where: { userId, status: "ACTIVE" },
  });
  const floatAmount = parseFloat(`${amount}`);
  try {
    if (activeLoan) {
      await prisma.$transaction([
        prisma.memberLoan.update({
          where: { id: activeLoan.id },
          data: { amount: { increment: floatAmount } },
        }),
        prisma.memberTransaction.create({
          data: {
            userId,
            loanId: activeLoan.id,
            amount: floatAmount,
            type: "TOP_UP",
            description: `Top-up of ₹${amount.toLocaleString("en-IN")}`,
          },
        }),
      ]);
    } else {
      await prisma.memberLoan.create({
        data: {
          userId,
          amount: floatAmount,
          interestRate: 1.0,
          status: "REQUEST",
        },
      });
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to process loan request" };
  }
}
