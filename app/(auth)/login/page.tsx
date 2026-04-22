import LoginForm from "./LoginForm";
import {
  ShieldCheck,
  PieChart,
  Users,
  TrendingUp,
  Landmark,
} from "lucide-react";
import Logo from "@/components/ui/logo";

export default async function LoginPage() {
  return (
    <div className="min-h-screen dashboard-bg text-slate-900 relative overflow-hidden flex items-center justify-center font-sans">
      {/* Organic Sphere Backgrounds (Matching your reference image) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white opacity-80 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-slate-300/40 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Side: Brand Value */}
          <div className="space-y-10 order-2 lg:order-1">
            <div className="space-y-6">
              <Logo />
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass-morphism border border-white/80 text-slate-600 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Trusted Internal Protocol
              </div>

              <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                Secure <span className="text-blue-600">Assets.</span> <br />
                <span className="text-slate-400 font-medium italic underline decoration-blue-200">
                  Simplified.
                </span>
              </h2>
              <p className="text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
                Institutional-grade ledger management for the Power 10 financial
                ecosystem.
              </p>
            </div>

            {/* Feature List in Milk Glass */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Landmark, title: "Capital Tracking" },
                { icon: TrendingUp, title: "Growth Analytics" },
                { icon: Users, title: "Member Portal" },
                { icon: PieChart, title: "Fair Splits" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass-morphism p-4 rounded-2xl border border-white/60 flex items-center gap-4 transition-all hover:translate-x-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center shadow-sm">
                    <item.icon className="w-5 h-5 text-slate-900" />
                  </div>
                  <h4 className="text-slate-900 font-bold text-sm">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: The Login Card */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-md">
              {/* Soft Ambient Shadow */}
              <div className="absolute inset-0 bg-blue-500/5 blur-[100px] -z-10" />

              <div className="glass-morphism p-8 lg:p-10 rounded-[2.5rem] border border-white shadow-2xl">
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Member Login
                  </h3>
                  <p className="text-slate-500 text-sm mt-1 font-medium">
                    Enter credentials to access the vault.
                  </p>
                </div>

                <LoginForm />

                <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                    Private Financial System <br />
                    Encrypted // Logged // Monitored
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
