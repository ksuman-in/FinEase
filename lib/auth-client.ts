import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL, // Ensure this is set
  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
      },
    },
  },
});
