import { authGuard } from "@/lib/auth-utils";
import MobileNav from "./MobileNav";
import { prisma } from "@/lib/db";

export default async function PageHeader({ action = "" }: { action?: string }) {
  const session = await authGuard();
  const user = session.user;
  const pendingCount = await prisma.memberLoan.count({
    where: {
      status: "REQUEST",
    },
  });
  return (
    <header className="sticky top-0 z-40 bg-app-foreground/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileNav user={user} pendingCount={pendingCount} />

          <div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              FIN<span className="text-blue-500">EASE</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {action}
          <div className="w-8 h-8 rounded-full bg-blue-600 md:w-10 md:h-10" />
        </div>
      </div>
    </header>
  );
}
