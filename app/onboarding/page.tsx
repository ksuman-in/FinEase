import { authGuard } from "@/lib/auth-utils";
import PendingPage from "./PendingPage";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await authGuard(undefined, { verifiedOnly: false });

  if (user.isVerified) {
    redirect("/dashboard");
  }

  return <PendingPage user={user} />;
}
