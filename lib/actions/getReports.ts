import { prisma } from "../db";

export default async function getMonthlyReport() {
  const allReport = await prisma.monthlyReport.findMany();

  // Serialize dates to strings before they leave the server
  return JSON.parse(JSON.stringify(allReport));
}
