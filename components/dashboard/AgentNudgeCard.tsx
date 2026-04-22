import { ArrowUpRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function AgentNudgeCard() {
  return (
    <Link href="/dashboard/requests" className="block group">
      {/* High-contrast dark anchor card to ground the Milk Glass sidebar */}
      <div className="relative p-6 bg-slate-900 rounded-[2.5rem] scale-[1.02] text-white shadow-2xl hover:scale-[1.05] transition-all duration-300 overflow-hidden border border-white/10">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/20 blur-3xl group-hover:bg-blue-500/40 transition-all duration-500 pointer-events-none" />

        <div className="relative z-10 flex justify-between items-start mb-6">
          <div className="p-2.5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
            <ShieldCheck size={20} className="text-blue-400" />
          </div>
          <div className="p-2 rounded-full bg-white/5 border border-white/5">
            <ArrowUpRight
              size={18}
              className="text-white opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <h3 className="font-black text-lg tracking-tight">Agent Portal</h3>
          </div>
          <p className="text-slate-400 text-[11px] font-medium leading-relaxed">
            There are pending loan requests that require your administrative
            approval.
          </p>
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/[0.05] pointer-events-none" />
      </div>
    </Link>
  );
}
