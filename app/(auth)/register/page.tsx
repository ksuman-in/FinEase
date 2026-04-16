import RegisterForm from "@/components/auth/RegisterForm";
import { ArrowRight, HandCoins, Target, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-app-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Side: Description */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tighter leading-[1.1]">
                Grow your <span className="text-blue-500">wealth</span>,
                together.
              </h2>
              <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                The ultimate ledger for group finances. Automate your monthly
                contributions and track loans with total transparency.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: HandCoins,
                  title: "Ledger",
                  desc: "Automated tracking",
                },
                {
                  icon: TrendingUp,
                  title: "Yield",
                  desc: "Interest calculation",
                },
                { icon: Target, title: "Goals", desc: "Loan management" },
                { icon: Zap, title: "Speed", desc: "Real-time reports" },
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl"
                >
                  <f.icon className="w-6 h-6 text-blue-500" />
                  <div>
                    <h4 className="text-white font-bold">{f.title}</h4>
                    <p className="text-app-bg0 text-xs">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Centered Form */}
          <div className="flex justify-center">
            <div className="w-full max-w-md p-1 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-[2.1rem]">
              <div className="bg-app-foreground/90 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 shadow-2xl">
                <RegisterForm />
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-app-bg0 text-sm mb-4">Already a member?</p>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold transition-colors group"
                  >
                    Sign In Here
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
