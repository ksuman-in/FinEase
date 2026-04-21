import LoginForm from "./LoginForm";
import {
  ShieldCheck,
  PieChart,
  Users,
  TrendingUp,
  Landmark,
} from "lucide-react";

export default async function LoginPage() {
  return (
    <div className="min-h-screen bg-app-foreground relative overflow-hidden flex items-center justify-center">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Side: Brand Value & Social Proof */}
          <div className="space-y-10 order-2 lg:order-1">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                <ShieldCheck className="w-4 h-4" />
                Trusted by Financial Groups
              </div>

              <h2 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tighter leading-[1.1]">
                Smart <span className="text-blue-500">Finance</span> <br />
                for your <span className="text-slate-500 italic">Vault.</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                Empowering small communities with institutional-grade ledger
                management and transparent loan processing.
              </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Landmark,
                  title: "Capital Tracking",
                  desc: "Real-time group liquidity",
                },
                {
                  icon: TrendingUp,
                  title: "Growth Analytics",
                  desc: "Automated interest calculation",
                },
                {
                  icon: Users,
                  title: "Member Portal",
                  desc: "Transparent transaction history",
                },
                {
                  icon: PieChart,
                  title: "Fair Splits",
                  desc: "Equal profit distribution",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group p-4 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/40 transition-all"
                >
                  <item.icon className="w-8 h-8 text-blue-500 mb-3" />
                  <h4 className="text-white font-bold">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Micro-Stats (Social Proof) */}
            <div className="pt-8 border-t border-slate-800 flex gap-12">
              <div>
                <p className="text-2xl font-bold text-white">99.9%</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">
                  Uptime
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">256-bit</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">
                  Encryption
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Instant</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">
                  Reporting
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: The Login Card */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-md">
              {/* Outer Glow Effect */}
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl -z-10" />

              <div className="w-full p-[1px] bg-gradient-to-tr from-blue-500/40 via-slate-700 to-purple-500/40 rounded-[2.1rem]">
                <div className="bg-app-foreground/95 backdrop-blur-xl p-8 lg:p-10 rounded-[2rem] shadow-2xl">
                  <div className="mb-8 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-white">
                      Member Login
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      Enter your credentials to access the vault.
                    </p>
                  </div>

                  <LoginForm />

                  <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      This is a private financial system. <br />
                      Unauthorized access attempts are logged and monitored.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
