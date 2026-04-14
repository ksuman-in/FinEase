import { prisma } from "../db";

export default async function getAllMembers() {
  const members = await prisma.user.findMany();

  return members;
}
