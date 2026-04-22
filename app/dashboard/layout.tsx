import Sidebar from "@/components/dashboard/Sidebar";
import TopNav from "@/components/dashboard/PageHeader";
import Logo from "@/components/ui/logo";
import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authGuard();
  const user = session.user;
  const pendingCount = await prisma.memberLoan.count({
    where: {
      status: "REQUEST",
    },
  });
  return (
    <div className="flex min-h-screen dashboard-bg text-slate-900 font-sans relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white opacity-60 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[50%] h-[50%] rounded-full bg-blue-100/30 blur-[120px]" />
      </div>

      {/* 1. Sidebar - Floating Milk Glass */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 z-30">
        <div className="p-8">
          <Logo />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-4">
          <Sidebar pendingCount={pendingCount} user={user} />
        </div>

        {/* Optional: User Profile Mini-Card at bottom of Sidebar */}
        <div className="p-6 border-t border-white/40">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/30">
            <div className="w-10 h-10 rounded-full bg-slate-200" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 leading-none">
                {user.name}
              </span>
              <span className="text-[10px] text-slate-500 font-medium uppercase mt-1">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <TopNav />

        <section className="p-6 lg:p-10 max-w-[1600px] w-full">
          {children}
        </section>
      </main>
    </div>
  );
}
