import { authGuard } from "@/lib/auth-utils"; // Your Better Auth guard

import TransactionsPageClient from "./TransactionsPageClient";
import getTransactions from "@/lib/actions/getTransactions";

export default async function TransactionsPage() {
  const session = await authGuard();
  const currentUser = session.user;

  const transactions = await getTransactions();

  const serializedData = JSON.parse(JSON.stringify(transactions));

  return (
    <TransactionsPageClient data={serializedData} currentUser={currentUser} />
  );
}
