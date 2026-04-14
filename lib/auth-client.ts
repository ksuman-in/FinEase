import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // If you plan to use admin features later,
  // you can add plugins here
  baseURL: process.env.NEXT_PUBLIC_APP_URL, // Optional: defaults to window.location.origin
});
