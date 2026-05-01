"use server";

import { prisma } from "@/lib/db";
import { authGuard } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { LoanStatus } from "@prisma/client";

export async function repayEMIAction(prevState: unknown, formData: FormData) {
  const { user } = await authGuard();
  const loanId = formData.get("loanId") as string;
  const groupId = formData.get("groupId") as string;

  try {
    const loan = await prisma.loan.findUnique({
      where: { id: loanId },
      include: {
        membership: true,
        _count: { select: { repayments: true } },
      },
    });

    if (!loan || loan.membership.userId !== user.id) {
      throw new Error("Unauthorized: Protocol mismatch.");
    }

    const r = loan.interestRate / (12 * 100);
    const n = loan.tenureMonths;
    const emi = Math.round(
      (loan.principalAmount * r * Math.pow(1 + r, n)) /
        (Math.pow(1 + r, n) - 1),
    );

    const interestComponent = Math.round(loan.remainingPrincipal * r);
    const principalComponent = emi - interestComponent;

    const currentRepaymentNumber = loan._count.repayments + 1;
    const isLastInstallment = currentRepaymentNumber >= loan.tenureMonths;

    await prisma.$transaction(async (tx) => {
      await tx.repayment.create({
        data: {
          loanId: loan.id,
          amountPaid: emi,
          principalPaid: principalComponent,
          interestPaid: interestComponent,
          billingMonth: new Date().getMonth() + 1,
          billingYear: new Date().getFullYear(),
        },
      });

      if (isLastInstallment) {
        await tx.loan.update({
          where: { id: loan.id },
          data: {
            remainingPrincipal: 0,
            status: LoanStatus.CLOSED,
            endDate: new Date(),
          },
        });
      } else {
        await tx.loan.update({
          where: { id: loan.id },
          data: { remainingPrincipal: { decrement: principalComponent } },
        });
      }
    });

    revalidatePath(`/dashboard/${groupId}/borrower`);
    return {
      success: true,
      message: isLastInstallment
        ? "Loan Fully Settled. Protocol Closed."
        : "EMI Protocol Executed.",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Transaction failed.";
    return { success: false, message };
  }
}
