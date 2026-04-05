import { auth } from "@clerk/nextjs/server";
import { prisma } from "../db";

export default async function globalSettings() {
  const user = await auth();

  if (!user.userId) {
    return null;
  }

  const globalSettings = await prisma.globalSettings.findFirst();

  return { globalSettings };
}
