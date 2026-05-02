import {
  CheckCircle2,
  Trophy,
  TrendingUp,
  Star,
  ShieldCheck,
} from "lucide-react";

export default function ProtocolSettled() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-[85vh] space-y-12">
      {/* 1. Gratitude Hero */}
      <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="relative">
          {/* Success Glow Effect */}
          <div className="absolute -inset-8 bg-emerald-500/10 blur-3xl rounded-full animate-pulse" />
          <div className="relative p-10 bg-white rounded-[3.5rem] border border-emerald-100 shadow-2xl shadow-emerald-500/10">
            <Trophy size={64} className="text-emerald-600" />
          </div>
          <div className="absolute -bottom-2 -right-2 p-3 bg-emerald-600 rounded-2xl text-white shadow-lg">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="space-y-4 max-w-2xl">
          <h2 className="text-6xl font-black text-slate-900 tracking-tighter">
            Protocol <span className="text-emerald-600">Complete</span>
          </h2>
          <p className="text-slate-500 font-bold leading-relaxed text-xl">
            Thank you for your commitment to the digital ledger. Your capital
            has been fully restored to the vault, directly fueling our
            collective roadmap toward 2032.
          </p>
        </div>
      </div>

      {/* 2. Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="p-10 rounded-[3rem] bg-emerald-50 border border-emerald-100 shadow-sm space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Star size={120} />
          </div>
          <div className="p-4 bg-emerald-100 rounded-2xl w-fit text-emerald-700">
            <TrendingUp size={28} />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">
              Yield Contribution
            </p>
            <p className="text-lg font-bold text-slate-800 leading-tight">
              Your interest yield has been successfully distributed to the
              group’s compounding pool.
            </p>
          </div>
        </div>

        <div className="p-10 rounded-[3rem] bg-slate-900 text-white shadow-2xl space-y-6">
          <div className="p-4 bg-white/10 rounded-2xl w-fit text-blue-400">
            <ShieldCheck size={28} />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">
              Current Status
            </p>
            <p className="text-lg font-bold leading-tight">
              Borrower role deactivated. You have returned to{" "}
              <strong>Growth Mode</strong> with zero debt liabilities.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Static Acknowledgment */}
      <div className="pt-8 border-t border-slate-100 w-full max-w-2xl text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Digital Ledger Verified • Milestone Roadmap 2032
        </p>
      </div>
    </div>
  );
}
