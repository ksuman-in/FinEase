import {
  HandCoins,
  Target,
  TrendingUp,
  Zap,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-app-foreground relative overflow-hidden">
      {/* Background Orbs for Depth */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Value Proposition */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium animate-pulse">
                <ShieldCheck className="w-4 h-4" />
                Invite-Only Access
              </div>

              <h2 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tighter leading-[1.1]">
                Your journey to <br />
                <span className="text-blue-500">Collective Wealth</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                {`Join your group's private vault. Set up your profile to start
                contributing, requesting loans, and tracking shared growth.`}
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: HandCoins,
                  title: "Smart Ledger",
                  desc: "No more manual spreadsheets",
                },
                {
                  icon: TrendingUp,
                  title: "High Yield",
                  desc: "Interest grows your capital",
                },
                {
                  icon: Target,
                  title: "Fast Loans",
                  desc: "Approval in just a few clicks",
                },
                {
                  icon: Zap,
                  title: "Instant Sync",
                  desc: "Real-time balance updates",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="group p-5 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-blue-500/50 transition-all duration-300"
                >
                  <f.icon className="w-8 h-8 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold">{f.title}</h4>
                  <p className="text-slate-500 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Trust Footer */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-app-foreground bg-slate-800 flex items-center justify-center text-[10px] text-slate-400"
                  >
                    User
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-400">
                Join{" "}
                <span className="text-white font-bold text-base">500+</span>{" "}
                members managing their <br />
                finances with total transparency.
              </p>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="relative">
            {/* Form Glow */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[80px] -z-10" />

            <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-[2.5rem] p-1 shadow-2xl">
              <div className="bg-app-foreground/80 rounded-[2.4rem] p-8 lg:p-12">
                <div className="mb-10">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                    <UserPlus className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Create Account
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Complete your registration to enter the dashboard.
                  </p>
                </div>

                <RegisterForm />

                <p className="mt-8 text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-blue-500 hover:underline font-medium"
                  >
                    Log in here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
