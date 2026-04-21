import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";
import { APIError } from "better-auth/api";
import { UserType } from "@prisma/client";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    async beforeSignUp(data: {
      email: string;
      phoneNumber?: string;
      [key: string]: unknown;
    }) {
      const { email, phoneNumber } = data;

      if (!phoneNumber) {
        throw new APIError("BAD_REQUEST", {
          message: "Phone number is required.",
        });
      }

      const invited = await prisma.allowedUser.findFirst({
        where: {
          email: email.toLowerCase(),
          phoneNumber: phoneNumber,
        },
      });

      if (!invited) {
        throw new APIError("BAD_REQUEST", {
          message: "You are not on the official whitelist. Contact your Admin.",
        });
      }

      return {
        ...data,
        role: "MEMBER",
      };
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: UserType.MEMBER,
      },
      phoneNumber: {
        type: "string",
        required: true,
      },
      groupId: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
});
