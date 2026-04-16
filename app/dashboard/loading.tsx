import { ShieldCheck } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 backdrop-blur-xl animate-in fade-in duration-500">
      {/* 1. Logo Container with Soft Depth */}
      <div className="relative flex items-center justify-center">
        {/* Animated Rings - Creating a 'Ping' effect */}
        <div className="absolute w-24 h-24 border border-blue-100 rounded-[2rem] animate-ping opacity-20" />
        <div className="absolute w-20 h-20 border-2 border-blue-500/20 rounded-[1.8rem] animate-pulse" />

        {/* The Main Icon Card */}
        <div className="relative flex items-center justify-center w-20 h-20 bg-white border border-slate-200 shadow-xl shadow-blue-500/5 rounded-[2rem] overflow-hidden">
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent" />

          <ShieldCheck className="relative w-10 h-10 text-blue-600 animate-in zoom-in-75 duration-1000 ease-out" />
        </div>
      </div>

      {/* 2. Text & Progress Wrapper */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-black tracking-tighter text-slate-900">
            FIN<span className="text-blue-600">EASE</span>
          </h2>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mt-1">
            Securing Ledger
          </p>
        </div>

        {/* 3. Refined Progress Bar */}
        <div className="relative w-40 h-[3px] bg-slate-100 rounded-full overflow-hidden">
          <div className="absolute h-full bg-blue-600 w-1/3 rounded-full animate-[loading-slide_1.5s_infinite_ease-in-out]" />
        </div>
      </div>
    </div>
  );
}
