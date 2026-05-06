import { HandCoins, Target, TrendingUp, Zap, ShieldCheck } from "lucide-react";
import RegisterForm from "./RegisterForm";
import Link from "next/link";
import { VaultLogoIcon } from "@/components/ui/logo-icon";
import { getInvitationDetailsAction } from "@/lib/actions/auth/getInvitationDetailsAction";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;
  const invitation = await getInvitationDetailsAction(token);
  return (
    <div className="min-h-screen dashboard-bg relative overflow-x-hidden text-slate-900 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-15%] right-[-5%] w-[60%] h-[60%] rounded-full bg-white opacity-80 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-slate-300/30 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <VaultLogoIcon /> {/* Using the bigger logo we designed */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass-morphism border border-white/80 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                Invite-Only Access
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                Your journey to <br />
                <span className="text-blue-600">Collective Wealth.</span>
              </h2>
              <p className="text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
                {`Join your group's private vault. Set up your profile to start contributing and tracking shared growth.`}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: HandCoins,
                  title: "Smart Ledger",
                  desc: "Digital group accounting",
                },
                {
                  icon: TrendingUp,
                  title: "High Yield",
                  desc: "Interest-based growth",
                },
                {
                  icon: Target,
                  title: "Fast Loans",
                  desc: "Peer-to-peer liquidity",
                },
                { icon: Zap, title: "Instant Sync", desc: "Real-time updates" },
              ].map((f, i) => (
                <div
                  key={i}
                  className="glass-morphism p-6 rounded-3xl border border-white/60 group transition-all hover:translate-y-[-4px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center mb-4 shadow-sm border border-white">
                    <f.icon className="w-5 h-5 text-slate-900" />
                  </div>
                  <h4 className="text-slate-900 font-bold text-base">
                    {f.title}
                  </h4>
                  <p className="text-slate-500 text-xs font-medium">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/5 blur-[120px] -z-10" />

            <div className="glass-morphism rounded-[3rem] p-2 border border-white shadow-2xl relative z-10">
              <div className="bg-white/40 rounded-[2.8rem] p-8 lg:p-12">
                <div className="mb-10">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                    Create Account
                  </h3>
                  <p className="text-slate-500 text-sm mt-1 font-medium">
                    Finalize your invitation to enter the vault.
                  </p>
                </div>

                <RegisterForm
                  token={token}
                  initialData={
                    invitation.error
                      ? null
                      : {
                          email: invitation.email!,
                          phoneNumber: invitation.phoneNumber!,
                          groupId: invitation.groupId!,
                        }
                  }
                  serverError={invitation.error || null}
                />
                <p className="mt-8 text-center text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                  Secured by Power 10 Protocol <br />
                  <Link
                    href="/login"
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    Already registered? Log in
                  </Link>
                </p>
                <p className="text-xs text-slate-500 mt-4 text-center font-medium">
                  By continuing, you agree to our{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
