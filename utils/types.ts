import { TransactionType } from "@prisma/client";

export type SaveTransactionFormTypes = {
  type: TransactionType;
  amount: string | number;
  description: string;
  date: string | Date;
  userId?: string;
};
