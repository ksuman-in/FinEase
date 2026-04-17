"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function approveLoanAction(loanId: string) {
  await prisma.memberLoan.update({
    where: { id: loanId },
    data: {
      status: "ACTIVE",
      issuedAt: new Date(),
    },
  });

  revalidatePath("/dashboard");
}
