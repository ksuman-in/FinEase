import { Target, Rocket, Info, Lock } from "lucide-react";

export default function NoLoanBorrower() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-[80vh] space-y-12">
      {/* 1. Status Hero - Borrower Context Only */}
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="relative">
          <div className="absolute -inset-4 bg-rose-500/5 blur-3xl rounded-full" />
          <div className="relative p-8 bg-white rounded-[3rem] border border-rose-100 shadow-2xl shadow-rose-500/10">
            <Lock size={56} className="text-rose-600" />
          </div>
        </div>

        <div className="space-y-4 max-w-2xl">
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
            Borrower <span className="text-slate-400">Standby</span>
          </h2>
          <p className="text-slate-500 font-bold leading-relaxed text-lg">
            Your borrower protocol is currently <strong>inactive</strong>. No
            debt is assigned to your account within this vault&lsquo;s digital
            ledger.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm space-y-4">
          <div className="p-3 bg-slate-50 rounded-2xl w-fit text-slate-600">
            <Target size={24} />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Assignment
          </p>
          <p className="text-sm font-bold text-slate-700 leading-snug">
            Loans are initialized exclusively by the Vault Owner. Once assigned,
            your repayment schedule will appear here.
          </p>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-xl space-y-4">
          <div className="p-3 bg-white/10 rounded-2xl w-fit text-rose-400">
            <Rocket size={24} />
          </div>
          <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em]">
            Current Status
          </p>
          <p className="text-sm font-bold leading-snug text-slate-300">
            You are currently in <strong>Growth Mode</strong>. Your monthly
            contributions continue to fuel the group&lsquo;s compounding engine
            toward 2032.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 px-8 py-4 bg-slate-50 rounded-full border border-slate-200">
        <Info size={16} className="text-slate-400" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Borrower Interface restricted to assigned Debt Protocols only.
        </p>
      </div>
    </div>
  );
}
