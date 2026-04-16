import { ShieldAlert, Lock, Info, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DisclaimerLanding() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
      <div className="max-w-3xl space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mx-auto">
          <ShieldAlert className="w-3.5 h-3.5" />
          Official Access Portal
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
          Secure Finance for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Trusted Groups.
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
          FinEase is a private ledger platform. To ensure the integrity of group
          contributions and loan data, access is restricted to verified members
          only.
        </p>

        {/* Disclaimer Card */}
        <div className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl text-left relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Info className="w-12 h-12 text-white" />
          </div>

          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-500" />
            Legal Disclaimer
          </h3>

          <ul className="space-y-3 text-sm text-app-bg0">
            <li>
              • This application is for group financial tracking purposes only.
            </li>
            <li>
              • Users are responsible for their own peer-to-peer loan
              agreements.
            </li>
            <li>
              • FinEase does not provide financial advice or legal mediation.
            </li>
            <li>
              • By logging in, you agree to our Internal Privacy & Data terms.
            </li>
          </ul>
        </div>

        {/* Primary Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group"
          >
            Enter Portal
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
          >
            Request Access
          </Link>
        </div>
      </div>
    </div>
  );
}
