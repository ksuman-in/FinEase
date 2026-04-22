import {
  ArrowRight,
  Users,
  TrendingUp,
  HandCoins,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/ui/logo";

export default function DisclaimerLanding() {
  return (
    <div className="min-h-screen selection:bg-blue-500/10 font-sans dashboard-bg text-slate-900 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Large White Organic Sphere - Top Left */}
        <div className="absolute top-[-15%] left-[-10%] w-[70%] h-[70%] rounded-full bg-white opacity-80 blur-[80px]" />

        {/* Medium Soft Sphere - Bottom Right */}
        <div className="absolute bottom-[5%] right-[-5%] w-[50%] h-[50%] rounded-full bg-slate-300/40 blur-[100px]" />

        {/* Subtle Accent Glow */}
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-100/30 blur-[80px]" />
      </div>

      <nav className="fixed top-0 w-full z-50 px-4 py-3 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex gap-4">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              Vault Protocol Active
            </span>
          </div>
        </div>
      </nav>

      <section className="relative z-10 flex flex-col items-center justify-center pt-48 pb-20 px-6 text-center">
        <div className="max-w-4xl space-y-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl glass-morphism border border-white/80">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
              Target: <span className="text-slate-900">₹1,00,00,000</span>
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.85]">
            VaultEase. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-900 to-slate-700">
              Modern Trust.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            The internal gateway for the{" "}
            <span className="text-slate-900 font-bold">Power 10</span>. A
            professional financial ecosystem for shared wealth management.
          </p>

          <div className="pt-6">
            <Link
              href="/login"
              className="px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl mx-auto w-fit"
            >
              Enter Vault
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Users className="text-slate-900" />}
          title="The Power 10"
          desc="Exclusive 10-member structure designed for high-trust group accountability."
        />
        <FeatureCard
          icon={<HandCoins className="text-slate-900" />}
          title="Peer Lending"
          desc="Integrated loan management with automated repayment tracking."
        />
        <FeatureCard
          icon={<ShieldCheck className="text-slate-900" />}
          title="Security First"
          desc="Secure transaction records and protected member data."
        />
      </section>

      <footer className="relative z-10 py-12 flex flex-col items-center gap-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          &copy; 2026 VaultEase // Internal Use Only
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
    <div className="glass-morphism rounded-[2.5rem] p-10 relative group border border-white/60 transition-all hover:translate-y-[-5px]">
      <div className="w-14 h-14 rounded-2xl bg-white/40 border border-white/80 flex items-center justify-center mb-8 shadow-sm">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
        {title}
      </h4>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  );
}
