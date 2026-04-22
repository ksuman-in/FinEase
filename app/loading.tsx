import { ShieldCheck, Lock } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-slate-50/40 backdrop-blur-2xl animate-in fade-in duration-700">
      {/* Background Ambient Glows - Matching your Dashboard Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. The Core Shield: Layered Glass & Motion */}
      <div className="relative group flex items-center justify-center">
        {/* Outer Pulsing Rim */}
        <div className="absolute w-32 h-32 border border-blue-500/10 rounded-[2.5rem] animate-[ping_3s_infinite]" />
        <div className="absolute w-28 h-28 border border-white rounded-[2.2rem] shadow-2xl opacity-50" />

        {/* Floating Icon Card */}
        <div className="relative w-24 h-24 bg-white/80 border border-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-md flex items-center justify-center overflow-hidden animate-[float_4s_infinite_ease-in-out]">
          {/* Subtle Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

          <div className="relative">
            <ShieldCheck
              className="w-12 h-12 text-blue-600 drop-shadow-sm"
              strokeWidth={2.5}
            />
            {/* Secondary Lock Icon for 'Securing' intent */}
            <div className="absolute -bottom-1 -right-1 p-1 bg-blue-600 rounded-lg shadow-lg animate-bounce">
              <Lock size={10} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Brand & Logic Identity */}
      <div className="mt-12 text-center space-y-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tighter text-slate-900 animate-pulse">
            Vault<span className="text-blue-600">Ease</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              Initializing Secure Protocol
            </p>
          </div>
        </div>

        {/* 3. High-Fidelity Progress Indicator */}
        <div className="relative w-48 h-1 bg-slate-200/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-blue-600 to-transparent -translate-x-full animate-[loading-slide_1.8s_infinite_ease-in-out]" />
        </div>

        {/* Status Quick-Tags */}
        <div className="flex gap-3 justify-center pt-2">
          <div className="px-3 py-1 bg-white/50 border border-white rounded-full text-[8px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
            Node: Active
          </div>
          <div className="px-3 py-1 bg-white/50 border border-white rounded-full text-[8px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
            256-Bit SSL
          </div>
        </div>
      </div>
    </div>
  );
}
