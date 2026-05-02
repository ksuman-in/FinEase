"use server";

import { prisma } from "@/lib/db";
import { authGuard } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { LoanStatus, Prisma } from "@prisma/client";

export async function repayEMIAction(prevState: unknown, formData: FormData) {
  const { user } = await authGuard();
  const loanId = formData.get("loanId") as string;
  const groupId = formData.get("groupId") as string;

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  try {
    const result = await prisma.$transaction(async (tx) => {
      const loan = await tx.loan.findUnique({
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
      const isLastInstallment = loan._count.repayments + 1 >= loan.tenureMonths;

      await tx.repayment.create({
        data: {
          loanId: loan.id,
          amountPaid: emi,
          principalPaid: principalComponent,
          interestPaid: interestComponent,
          billingMonth: currentMonth,
          billingYear: currentYear,
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

      return { isLastInstallment };
    });

    revalidatePath(`/dashboard/${groupId}/borrower`);
    return {
      success: true,
      message: result.isLastInstallment
        ? "Loan Settled. Protocol Closed."
        : "EMI Protocol Executed.",
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Protocol Error: This cycle is already settled.",
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Transaction failed.",
    };
  }
}
