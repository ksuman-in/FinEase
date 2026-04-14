import { ShieldCheck } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950">
      {/* Logo Wrapper */}
      <div className="relative">
        {/* Pulsing Outer Glow */}
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />

        {/* The Logo Icon */}
        <div className="relative flex items-center justify-center w-20 h-20 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl">
          <ShieldCheck className="w-10 h-10 text-blue-500 animate-in fade-in zoom-in duration-700" />
        </div>
      </div>

      {/* Brand Text */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <h2 className="text-xl font-black tracking-tighter text-white">
          Fin<span className="text-blue-500">Ease</span>
        </h2>

        {/* Minimal Progress Bar */}
        <div className="w-32 h-[2px] bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 w-full -translate-x-full animate-[loading-bar_1.5s_infinite_ease-in-out]" />
        </div>
      </div>
    </div>
  );
}
