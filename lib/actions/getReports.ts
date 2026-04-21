import { prisma } from "../db";

export default async function getMonthlyReport() {
  const allReport = await prisma.monthlyReport.findMany();

  return JSON.parse(JSON.stringify(allReport));
}
