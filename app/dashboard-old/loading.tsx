import { Loader2, Lock, ShieldCheck } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50/60 backdrop-blur-2xl animate-in fade-in duration-700">
      {/* 1. Visual Centerpiece: The Animated Vault Core */}
      <div className="relative flex items-center justify-center scale-110">
        {/* Triple-layer Ping: Creating depth through timing */}
        <div className="absolute w-32 h-32 border border-blue-500/20 rounded-[2.5rem] animate-[ping_3s_infinite]" />
        <div className="absolute w-28 h-28 border border-blue-400/10 rounded-[2.2rem] animate-[ping_2s_infinite]" />

        {/* Floating Glass Card */}
        <div className="relative w-24 h-24 bg-white/90 border border-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden animate-float">
          {/* Shimmer Sweep Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer" />

          <div className="relative">
            <ShieldCheck
              className="w-12 h-12 text-blue-600 drop-shadow-sm"
              strokeWidth={2.5}
            />
            {/* Spinning Sync Icon */}
            <Loader2 className="absolute -top-1 -right-1 w-4 h-4 text-blue-400 animate-spin" />
          </div>
        </div>
      </div>

      {/* 2. Brand Identity */}
      <div className="mt-14 text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
            Vault<span className="text-blue-600">Ease</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1">
              <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
              Synchronizing Ledger
            </p>
          </div>
        </div>

        {/* 3. Progress Track with Glass Effect */}
        <div className="relative w-56 h-1.5 bg-slate-200/40 rounded-full overflow-hidden border border-white/20 backdrop-blur-sm">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-full animate-[loading-slide_2s_infinite_ease-in-out]" />
        </div>

        {/* Security Meta Tags */}
        <div className="flex gap-4 justify-center items-center opacity-60">
          <div className="flex items-center gap-1.5">
            <Lock size={10} className="text-slate-400" />
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
              AES-256
            </span>
          </div>
          <div className="h-3 w-[1px] bg-slate-300" />
          <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
            Verifying Node
          </span>
        </div>
      </div>
    </div>
  );
}
