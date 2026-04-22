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
    <header className="sticky top-0 z-20 mx-4 md:mx-8 glass-morphism rounded-[2rem] border border-white shadow-sm px-4 md:px-8 py-3 transition-all duration-300 pointer-events-auto">
      {/* 3D Rim Light decoration */}
      <div className="absolute inset-0 rounded-[2rem] border-t border-l border-white/60 pointer-events-none" />

      {/* 
          Z-INDEX REMOVED FROM INNER DIV: 
          By removing 'relative z-10' from this wrapper, we prevent 
          the header from creating a "hard" stacking context that 
          might fight the modal's backdrop.
      */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <MobileNav user={user} pendingCount={pendingCount} />
          </div>
          <div className="hidden md:block lg:hidden">
            <h1 className="text-xl font-black tracking-tighter text-slate-900">
              Vault<span className="text-blue-600">Ease</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">{action}</div>
          <div className="flex items-center gap-3 pl-4 border-l border-white/40">
            <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-xs font-black text-slate-900 leading-none">
                {user.name}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                {user.role?.replace("_", " ") || "Member"}
              </span>
            </div>
            <div className="w-10 h-10 flex justify-center items-center rounded-2xl bg-slate-900 text-white shadow-lg border border-white/10">
              <span className="text-sm font-black uppercase">
                {user.name.at(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
