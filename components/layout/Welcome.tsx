import React from "react";
import { ShieldCheck, ArrowRight, Target, Users, Zap } from "lucide-react";

const WelcomeScreen = () => {
  return (
    <div className="relative min-h-screen w-full overflow-y-auto bg-slate-950 flex flex-col items-center p-6 pb-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-cyan-500/5 blur-[120px]" />

      {/* 1. Hero Section */}
      <div className="z-10 mt-16 w-full max-w-md text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase">
          <Zap size={14} /> Live Ledger Active
        </div>

        <h1 className="text-5xl font-extrabold tracking-tighter text-white leading-tight">
          Wealth Building <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            Reimagined.
          </span>
        </h1>

        <p className="text-slate-400 text-lg leading-relaxed">
          The official financial command center for the{" "}
          <span className="text-white font-medium">Power 10</span> investment
          group.
        </p>
      </div>

      {/* 2. The Numbers (Glass Card) */}
      <div className="z-10 mt-10 w-full max-w-md group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Group Net Worth
          </p>
          <h2 className="text-5xl font-mono font-bold text-white tracking-tighter">
            ₹7,01,930
          </h2>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] uppercase text-slate-500 font-bold">
              Monthly ROI
            </p>
            <p className="text-emerald-400 font-bold">1.0% Fixed</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-slate-500 font-bold">
              2032 Target
            </p>
            <p className="text-cyan-400 font-bold">₹1,00,00,000</p>
          </div>
        </div>
      </div>

      {/* 3. Feature Highlights (Content Section) */}
      <div className="z-10 mt-12 w-full max-w-md grid grid-cols-1 gap-4">
        <FeatureItem
          icon={<Target className="text-rose-400" />}
          title="Goal Tracking"
          desc="Real-time progress toward our 1 Crore milestone."
        />
        <FeatureItem
          icon={<Users className="text-purple-400" />}
          title="Member Equity"
          desc="Individual savings and interest share calculated instantly."
        />
        <FeatureItem
          icon={<ShieldCheck className="text-cyan-400" />}
          title="Clerk Secured"
          desc="Enterprise-grade security for our group's private data."
        />
      </div>

      {/* 4. Primary Action */}
      <div className="z-10 mt-12 w-full max-w-md">
        <button className="w-full bg-white text-slate-950 h-16 rounded-2xl font-bold text-lg hover:bg-cyan-50 transition-all flex items-center justify-center gap-2 group">
          Enter Dashboard
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const FeatureItem = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors">
    <div className="mt-1">{icon}</div>
    <div>
      <h4 className="text-white font-semibold">{title}</h4>
      <p className="text-slate-500 text-sm leading-snug">{desc}</p>
    </div>
  </div>
);

export default WelcomeScreen;
