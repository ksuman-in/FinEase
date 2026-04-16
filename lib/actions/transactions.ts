"use server";

import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { SaveTransactionFormTypes } from "@/utils/types";
import { TransactionType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function saveTransactionAction(data: SaveTransactionFormTypes) {
  const session = await authGuard();
  const userId = data.userId || session.user.id;

  const formattedDate = data.date ? new Date(data.date) : new Date();

  const cleanData = {
    type: data.type as TransactionType,
    amount: Number(data.amount),
    description: data.description,
    date: formattedDate,
  };

  if (userId) {
    await prisma.memberTransaction.create({
      data: {
        ...cleanData,
        userId: userId,
      },
    });
  }

  revalidatePath("/dashboard/transactions");
  return { success: true };
}
