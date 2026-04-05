import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./db";

export default async function checkMember() {
  const user = await currentUser();

  if (!user?.id) {
    return null;
  }

  const loggedInUser = await prisma.member.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (loggedInUser) {
    return loggedInUser;
  }

  const {
    id,
    firstName,
    lastName,
    phoneNumbers,
    emailAddresses,
    createdAt,
    updatedAt,
  } = user;

  const parseDateValue = (value: Date | string | number) => {
    if (typeof value === "string") {
      const ms = Number(value);
      return Number.isFinite(ms) ? new Date(ms) : new Date(value);
    }

    return new Date(value);
  };

  const newUser = await prisma.member.create({
    data: {
      clerkId: id,
      memberId: id,
      name: `${firstName} ${lastName}`,
      phone: phoneNumbers?.at(0)?.phoneNumber,
      email: emailAddresses?.at(0)?.emailAddress,
      createdAt: parseDateValue(createdAt),
      updatedAt: parseDateValue(updatedAt),
    },
  });

  return newUser;
}
