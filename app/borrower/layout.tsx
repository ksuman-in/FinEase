import { logoutAction } from "@/lib/actions/auth";
import { authGuard } from "@/lib/auth-utils";
import { ShieldCheck, Lock, LogOut } from "lucide-react";

export default async function BorrowerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await authGuard();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Protocol Utility Bar */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          {/* Left: Session Identity */}
          <div className="flex items-center gap-4">
            <div className="p-2 bg-slate-900 rounded-xl text-white shadow-lg">
              <Lock size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] leading-none mb-1">
                Secure Session
              </p>
              <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">
                Borrower <span className="text-slate-400">Interface</span>
              </h2>
            </div>
          </div>

          {/* Right: User Info & Logout */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex flex-col text-right border-r border-slate-200 pr-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Authenticated User
              </p>
              <p className="text-xs font-bold text-slate-700 flex items-center gap-2 justify-end">
                {user.email}
                {user.isVerified && (
                  <ShieldCheck size={14} className="text-blue-500" />
                )}
              </p>
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all group"
              >
                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">
                  Terminate Session
                </span>
                <LogOut
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full overflow-y-auto">{children}</main>

      <footer className="w-full py-8 border-t border-slate-200 bg-white/40">
        <div className="max-w-[1200px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">
            Power 10 Digital Ledger • Milestone 2032
          </p>
          <div className="flex gap-6">
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
              Standard 18% ROI Protocol
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
