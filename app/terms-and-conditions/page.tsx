import { GroupRole } from "@prisma/client";
import {
  Landmark,
  ShieldCheck,
  Users,
  Lock,
  AlertTriangle,
} from "lucide-react";
import TermsContent from "./TermsContent";
import FinalizationSteps from "./FinalizationSteps";

export default function GeneralTermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 text-white rounded-2xl mb-4 shadow-lg">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter sm:text-5xl">
            Legal Framework & Protocols
          </h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-4">
            Standard Operating Procedures for Private Financial Vaults
          </p>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto leading-relaxed text-sm">
            Welcome to Easy Finance. By participating in our private financial
            vaults, you agree to adhere to the strict operational guidelines
            outlined below. These protocols are designed to ensure transparency,
            security, and mutual trust among all group members.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] p-10 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Users size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                Member Protocol
              </h2>
            </div>
            <TermsContent role={GroupRole.MEMBER} />
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] p-10 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
                <Landmark size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                Borrower Protocol
              </h2>
            </div>
            <TermsContent role={GroupRole.BORROWER} />
          </div>
        </div>

        <section className="mb-16">
          <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] p-10 shadow-xl">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8 flex items-center gap-3">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                <Lock size={24} />
              </div>
              Data Privacy & Platform Security
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-700 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900 mb-2">
                  1. End-to-End Encryption
                </h4>
                <p>
                  All sensitive personal data (Aadhaar, PAN, Bank Details) is
                  encrypted at rest and in transit. We employ bank-grade
                  security standards to ensure your financial identity is
                  protected against unauthorized access.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">
                  2. Zero Data Sharing
                </h4>
                <p>
                  Your data is strictly used for vault whitelisting and
                  regulatory compliance. We do not sell, rent, or share your
                  personal information with third-party marketers or external
                  credit agencies without explicit consent.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">
                  3. Dispute Resolution
                </h4>
                <p>
                  In the event of a disagreement or default, the platform will
                  act as an impartial mediator. We rely on the digitally signed
                  agreements and group consensus mechanisms to resolve conflicts
                  amicably.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">
                  4. Platform Liabilities
                </h4>
                <p>
                  Easy Finance provides the technological infrastructure for
                  peer-to-peer vaults. While we enforce strict whitelisting, the
                  platform is not directly liable for borrower defaults, though
                  we initiate automated recovery protocols.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-10 shadow-lg">
            <h2 className="text-2xl font-black text-rose-900 uppercase tracking-tight mb-4 flex items-center gap-3">
              <div className="p-3 bg-rose-200 text-rose-700 rounded-xl">
                <AlertTriangle size={24} />
              </div>
              Zero Tolerance for Misconduct & Financial Loss
            </h2>
            <p className="text-sm text-rose-800 leading-relaxed max-w-4xl">
              Our community operates on mutual trust and strict financial
              protocols. Any member attempting to leave the community with bad
              behavior, engaging in fraudulent activities, or intentionally
              causing a financial loss to the group will be subject to immediate
              legal action. Easy Finance will utilize all physical and digital
              agreements to enforce recovery, report the individual to credit
              rating agencies, and pursue full compensation for damages.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-black uppercase tracking-tight text-center mb-10">
            Submission Roadmap
          </h2>
          <FinalizationSteps />
        </section>
        <footer className="mt-12 bg-slate-900 text-white rounded-[2rem] p-10 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4">
              Verification Requirements
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              To maintain the integrity of our high-conviction portfolios, all
              participants must complete physical verification. This involves
              submitting self-attested copies of **Aadhaar** and **PAN** cards
              to our office.
            </p>
            <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest">
              <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20">
                Digital Signature Required
              </span>
              <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20">
                Physical Document Sync
              </span>
              <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20">
                Bengaluru Office Registry
              </span>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600 blur-[100px] opacity-20" />
        </footer>
      </div>
    </div>
  );
}
