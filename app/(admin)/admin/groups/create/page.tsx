import { createGroupAction } from "@/lib/actions/agent/createGroupAction";
import { Landmark, ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateGroupPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Link
        href="/admin/groups"
        className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Directory
      </Link>

      <header className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
          Initialize Vault
        </h1>
        <p className="text-slate-500 font-medium text-sm">
          Deploy a new Power 10 financial group with protocol defaults.
        </p>
      </header>

      <form action={createGroupAction} className="space-y-6">
        {/* Core Identity */}
        <section className="glass-morphism p-8 rounded-[2.5rem] border border-white shadow-xl space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
              Vault Name
            </label>
            <input
              name="name"
              placeholder="e.g., Alpha Growth Vault"
              required
              className="w-full h-16 bg-white/60 border border-slate-100 p-6 rounded-2xl font-black text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-300 transition-all"
            />
          </div>
        </section>

        {/* Protocol Enforcement (ReadOnly for consistency) */}
        <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <ShieldAlert size={100} />
          </div>

          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 relative z-10">
            Protocol Enforcement
          </h3>

          <div className="grid grid-cols-2 gap-6 relative z-10">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[8px] font-black text-slate-500 uppercase mb-1">
                Saver Rate
              </p>
              <p className="text-xl font-black text-white">12.00%</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[8px] font-black text-slate-500 uppercase mb-1">
                Borrower Rate
              </p>
              <p className="text-xl font-black text-white">18.00%</p>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 relative z-10">
            <p className="text-[8px] font-black text-slate-500 uppercase mb-1">
              Payment Window
            </p>
            <p className="text-sm font-bold text-white">
              1st to 5th of every month
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
          >
            Deploy Protocol
          </button>
        </section>
      </form>
    </div>
  );
}
