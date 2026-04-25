import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";
import { APIError } from "better-auth/api";

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
      };
    },
  },
  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
        required: true,
      },
      isSuperAdmin: {
        type: "boolean",
        defaultValue: false,
      },
      isVerified: {
        type: "boolean",
        defaultValue: false,
      },
      role: {
        type: "string",
        defaultValue: "MEMBER",
      },
    },
  },
});
