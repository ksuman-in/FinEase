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
      const normalizedEmail = data.email.toLowerCase();
      const { phoneNumber } = data;

      if (!phoneNumber) {
        throw new APIError("BAD_REQUEST", {
          message: "Phone number is required.",
        });
      }

      const invited = await prisma.allowedUser.findFirst({
        where: {
          email: normalizedEmail,
          phoneNumber: phoneNumber,
        },
      });

      if (!invited) {
        throw new APIError("BAD_REQUEST", {
          message: "You are not on the official whitelist. Contact your Admin.",
        });
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email: normalizedEmail }, { phoneNumber }],
        },
      });

      if (existingUser) {
        if (existingUser.email === normalizedEmail) {
          throw new APIError("BAD_REQUEST", {
            message:
              "An account already exists with this email. Please login or use a different email.",
          });
        }

        throw new APIError("BAD_REQUEST", {
          message:
            "This phone number is already registered. Please use a different phone number or contact support.",
        });
      }

      return {
        ...data,
        email: normalizedEmail,
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
