"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { authGuard } from "@/lib/auth-utils";

export async function approveLoanAction(loanId: string) {
  await authGuard({ adminOnly: true });
  const result = await prisma.memberLoan.updateMany({
    where: { id: loanId, status: "REQUEST" },
    data: { status: "ACTIVE", issuedAt: new Date() },
  });

  if (result.count === 0) {
    return { success: false, error: "Loan not found or not in REQUEST state" };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
