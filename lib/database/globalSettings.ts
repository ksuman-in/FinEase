import { prisma } from "../db";

export default async function globalSettings() {
  const user = await { userId: null };

  if (!user.userId) {
    return null;
  }

  const globalSettings = await prisma.globalSettings.findFirst();

  return { globalSettings };
}
