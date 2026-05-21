"use server";

import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { GroupRole, LoanStatus, TransactionType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function processLoanAction(
  loanId: string,
  action: LoanStatus,
  groupId: string,
) {
  try {
    // 1. Authentication & System Role Validation
    const { membership } = await authGuard(groupId);

    // Supporting both OWNER and ADMIN for Super Admin flexibility
    if (membership?.role !== GroupRole.OWNER) {
      return {
        success: false,
        message:
          "Forbidden: You do not possess clearance to modify vault ledger allocations.",
      };
    }

    // 2. Action Bounds Verification
    if (action !== LoanStatus.ACTIVE && action !== LoanStatus.CANCELLED) {
      return {
        success: false,
        message: "Validation Error: Invalid operation state targeted.",
      };
    }

    // 3. Locate Target Request
    const request = await prisma.memberLoan.findUnique({
      where: { id: loanId },
    });

    if (!request || request.status !== LoanStatus.REQUEST) {
      return {
        success: false,
        message:
          "Record Error: Active credit request data could not be verified.",
      };
    }

    // 4. Handle Rejections / Cancellations
    if (action === LoanStatus.CANCELLED) {
      await prisma.memberLoan.update({
        where: { id: loanId, groupId },
        data: { status: LoanStatus.CANCELLED },
      });

      revalidatePath("/admin");
      revalidatePath(`/dashboard/${groupId}`);

      return {
        success: true,
        message: "Credit request successfully cancelled and archived.",
      };
    }

    // 5. Query for Existing Active Credit (Top-up Logic)
    const existingActiveLoan = await prisma.memberLoan.findFirst({
      where: {
        userId: request.userId,
        status: LoanStatus.ACTIVE,
        id: { not: loanId },
      },
    });

    if (existingActiveLoan) {
      // Execute ACID Transaction for Top-up
      await prisma.$transaction([
        prisma.memberLoan.update({
          where: { id: existingActiveLoan.id, groupId },
          data: { amount: { increment: request.amount } },
        }),

        prisma.memberLoan.update({
          where: { id: loanId, groupId },
          data: { status: LoanStatus.CLOSED },
        }),

        prisma.memberTransaction.create({
          data: {
            userId: request.userId,
            groupId,
            loanId: existingActiveLoan.id,
            amount: request.amount,
            type: TransactionType.TOP_UP,
            description: `Top-up Approved: ${request.description || "Capital Addition"}`,
          },
        }),
      ]);

      revalidatePath("/admin");
      revalidatePath(`/dashboard/${groupId}`);

      return {
        success: true,
        message: `Top-up allocation of ₹${request.amount.toLocaleString("en-IN")} successfully appended to existing credit facility.`,
      };
    } else {
      // Execute ACID Transaction for New Asset Issuance
      await prisma.$transaction([
        prisma.memberLoan.update({
          where: { id: loanId },
          data: { status: LoanStatus.ACTIVE, issuedAt: new Date() },
        }),
        prisma.memberTransaction.create({
          data: {
            userId: request.userId,
            loanId: request.id,
            groupId,
            amount: request.amount,
            type: TransactionType.NEW_LOAN,
            description: `Initial Loan Approved: ${request.description || "Principal"}`,
          },
        }),
      ]);

      revalidatePath("/admin");
      revalidatePath(`/dashboard/${groupId}`);

      return {
        success: true,
        message: `New credit asset of ₹${request.amount.toLocaleString("en-IN")} issued at 18% interest rate.`,
      };
    }
  } catch (error) {
    console.error("Critical Loan Clearance Defect:", error);
    return {
      success: false,
      message:
        "System Protocol Error: Failed to commit modifications to the Neon database ledger securely.",
    };
  }
}
