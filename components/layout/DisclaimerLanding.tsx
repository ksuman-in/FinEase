import {
  ArrowRight,
  Users,
  TrendingUp,
  HandCoins,
  Fingerprint,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/ui/logo";

export default function DisclaimerLanding() {
  return (
    <div className="bg-slate-950 min-h-screen selection:bg-blue-500/30 font-sans">
      <nav className="fixed top-0 w-full z-50 px-6 py-6 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              System Online
            </span>
          </div>
        </div>
      </nav>

      <section className="relative flex flex-col items-center justify-center pt-44 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-150 h-75 bg-blue-600/20 blur-[120px] rounded-full opacity-50" />

        <div className="max-w-4xl space-y-10 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">
              Target Milestone: <span className="text-white">₹1,00,00,000</span>
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.85]">
            Secure Wealth. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400">
              Shared Trust.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Welcome to the internal{" "}
            <span className="text-white font-bold">FinEase</span> gateway. A
            private financial ecosystem for the Power 10 members to synchronize
            ledgers and manage peer-loans.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/login"
              className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-2xl shadow-white/10"
            >
              Enter Portal
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Users className="text-blue-500" />}
          title="The Power 10"
          desc="Exclusive 10-member structure designed for high-trust group accountability."
        />
        <FeatureCard
          icon={<HandCoins className="text-emerald-500" />}
          title="Peer Lending"
          desc="Real-time loan management with automated interest and repayment tracking."
        />
        <FeatureCard
          icon={<Fingerprint className="text-purple-500" />}
          title="Vault Security"
          desc="Member-only access with AES-256 encryption and immutable transaction logs."
        />
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="relative p-10 bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />

          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-black text-white mb-4">
                Access Terms
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                By entering the{" "}
                <span className="text-blue-400 font-bold">FinEase</span> portal,
                you agree to keep all group financial data confidential and
                acknowledge that peer-loans are private agreements.
              </p>
            </div>

            <div className="md:w-1/2 grid grid-cols-1 gap-4">
              {[
                "Verified Member Only",
                "End-to-End Encryption",
                "Private Ledger Logs",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm font-bold text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 flex flex-col items-center gap-4">
        <div className="opacity-30 grayscale scale-75">
          <Logo showIcon={false} />
        </div>
        <p className="text-[10px] font-bold text-slate-600 uppercase ">
          &copy; 2026 FinEase Internal Internal Use Only
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:border-blue-500/30 transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h4 className="text-lg font-black text-white mb-2">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
