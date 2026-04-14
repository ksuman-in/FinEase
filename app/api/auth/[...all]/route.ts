import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Force dynamic to ensure env vars are fresh on every request
export const dynamic = "force-dynamic";

export const { POST, GET } = toNextJsHandler(auth);
