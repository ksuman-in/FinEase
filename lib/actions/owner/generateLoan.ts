"use server";

import { prisma } from "@/lib/db";
import { authGuard } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import getTotalInHand from "../getTotalInHand";
import { GroupRole, LoanStatus } from "@prisma/client";

export async function generateLoanAction(
  prevState: unknown,
  formData: FormData,
) {
  const { user } = await authGuard();
  const groupId = formData.get("groupId") as string;

  try {
    const ownerMembership = await prisma.membership.findFirst({
      where: { userId: user.id, groupId, role: GroupRole.OWNER },
    });
    if (!ownerMembership)
      throw new Error("Unauthorized: Owner status required.");

    const email = formData.get("email") as string;
    const principal = parseFloat(formData.get("amount") as string);
    const roi = parseFloat(formData.get("roi") as string);
    const tenure = parseInt(formData.get("tenure") as string);

    const inhandCash = await getTotalInHand(groupId);
    if (inhandCash < principal) {
      throw new Error(
        `Insufficient Liquidity: Vault has ₹${inhandCash.toLocaleString()}, but ₹${principal.toLocaleString()} was requested.`,
      );
    }

    const targetMember = await prisma.membership.findFirst({
      where: { user: { email }, groupId },
    });
    const targetMemberId = targetMember?.id;
    if (!targetMemberId) {
      throw new Error("Target member not found in this vault.");
    }

    await prisma.$transaction(async (tx) => {
      const existingLoan = await tx.loan.findUnique({
        where: { membershipId: targetMemberId },
        include: { repayments: true },
      });

      if (existingLoan) {
        await tx.loanArchive.create({
          data: {
            membershipId: existingLoan.membershipId,
            principalAmount: existingLoan.principalAmount,
            interestRate: existingLoan.interestRate,
            tenureMonths: existingLoan.tenureMonths,
            startDate: existingLoan.startDate,
            totalInterestPaid: existingLoan.repayments.reduce(
              (s, r) => s + r.interestPaid,
              0,
            ),
            totalPrincipalPaid: existingLoan.repayments.reduce(
              (s, r) => s + r.principalPaid,
              0,
            ),
          },
        });

        await tx.loan.delete({
          where: { id: existingLoan.id },
        });
      }
      await tx.membership.update({
        where: { id: targetMemberId },
        data: { role: GroupRole.BORROWER, customRate: roi },
      });

      await tx.loan.create({
        data: {
          membershipId: targetMemberId,
          principalAmount: principal,
          remainingPrincipal: principal,
          interestRate: roi,
          tenureMonths: tenure,
          status: LoanStatus.ACTIVE,
        },
      });
    });

    revalidatePath(`/dashboard/${groupId}/owner`);
    return {
      success: true,
      message: "Loan protocol initialized and capital deployed.",
    };
  } catch (error) {
    const message =
      (error instanceof Error && error.message) || "Authorization failed.";
    return { success: false, message };
  }
}
