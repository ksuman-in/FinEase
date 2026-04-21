import LoginForm from "./LoginForm";
import { ShieldCheck, PieChart, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-app-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Side: Brand Value */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tighter leading-[1.1]">
                Welcome <span className="text-blue-500 font-black">Back</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                {`Log in to manage your group's monthly ledger, approve loan
                requests, and check your growth metrics.`}
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: ShieldCheck, text: "Bank-grade secure sessions" },
                { icon: PieChart, text: "Automated interest distribution" },
                { icon: Users, text: "Shared transparency for all members" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <item.icon className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: The Login Card */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="w-full max-w-md p-[1px] bg-gradient-to-tr from-blue-500/30 via-slate-800 to-purple-500/30 rounded-[2.1rem]">
              <div className="bg-app-foreground/90 backdrop-blur-2xl p-10 rounded-[2rem] shadow-2xl">
                <LoginForm />

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-app-bg0 text-sm mb-4">New to the group?</p>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold transition-colors group"
                  >
                    Create a free account
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
