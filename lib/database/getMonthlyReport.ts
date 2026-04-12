import { auth } from "@clerk/nextjs/server";
import { prisma } from "../db";

export default async function getMonthlyReport() {
  const user = await auth();

  if (!user.userId) {
    return null;
  }

  const allReport = await prisma.monthlyReport.findMany();

  if (allReport?.length > 0) {
    return allReport;
  }

  return [];
}
