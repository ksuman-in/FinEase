"use client";

import { useForm } from "react-hook-form";
import {
  Save,
  Percent,
  Calendar,
  Settings2,
  IndianRupee,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { getOrdinal } from "@/lib/utils/helper";
import { GroupConfig } from "@prisma/client";
// import { updateGroupConfigAction } from "@/lib/actions/admin/config";

export default function ConfigFormClient({
  initialData,
  groupId,
}: {
  initialData: GroupConfig;
  groupId: string;
}) {
  const [isSuccess, setIsSuccess] = useState(false);

  // Watch borrower rate for the dynamic summary calculation
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      memberInterestRate: initialData.memberInterestRate || 12,
      borrowerInterestRate: initialData.borrowerInterestRate || 18,
      monthlyContribution: initialData.monthlyContribution || 1000,
      interestStartDay: initialData.interestStartDay || 1,
      interestEndDay: initialData.interestEndDay || 5,
      principalStartDay: initialData.interestEndDay || 1,
      principalEndDay: initialData.interestEndDay || 10,
    },
  });

  const currentBorrowerRate = watch("borrowerInterestRate");

  const onSubmit = async (data: any) => {
    console.log("Updating Group:", groupId, data);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8"
    >
      <div className="lg:col-span-8 space-y-6">
        <div className="glass-morphism p-8 rounded-[2.5rem] border border-white shadow-xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Settings2 size={20} />
              </div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                Vault Parameters
              </h3>
            </div>
            {isSuccess && (
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                Configuration Synced
              </span>
            )}
          </div>

          {/* Interest Rates Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
                Saver Rate (12% Target)
              </label>
              <div className="relative">
                <input
                  {...register("memberInterestRate")}
                  type="number"
                  className="w-full h-16 bg-slate-50 border border-slate-100 px-6 rounded-2xl font-black text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-300">
                  %
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
                Borrower Rate (18% Target)
              </label>
              <div className="relative">
                <input
                  {...register("borrowerInterestRate")}
                  type="number"
                  className="w-full h-16 bg-slate-50 border border-slate-100 px-6 rounded-2xl font-black text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-300">
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Monthly SIP & Timing Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
                Monthly Contribution
              </label>
              <div className="relative">
                <input
                  {...register("monthlyContribution")}
                  type="number"
                  className="w-full h-16 bg-slate-50 border border-slate-100 px-6 rounded-2xl font-black text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
                <IndianRupee
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300"
                  size={18}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
                Interest Window
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  {...register("interestStartDay")}
                  className="h-16 bg-slate-50 border border-slate-100 px-4 rounded-2xl font-black text-slate-900 outline-none"
                >
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {getOrdinal(i + 1)}
                    </option>
                  ))}
                </select>
                <select
                  {...register("interestEndDay")}
                  className="h-16 bg-slate-50 border border-slate-100 px-4 rounded-2xl font-black text-slate-900 outline-none"
                >
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {getOrdinal(i + 1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
                Principal Payment Window
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  {...register("principalStartDay")}
                  className="h-16 bg-slate-50 border border-slate-100 px-4 rounded-2xl font-black text-slate-900 outline-none"
                >
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {getOrdinal(i + 1)}
                    </option>
                  ))}
                </select>
                <select
                  {...register("principalEndDay")}
                  className="h-16 bg-slate-50 border border-slate-100 px-4 rounded-2xl font-black text-slate-900 outline-none"
                >
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {getOrdinal(i + 1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98]"
          >
            <Save size={18} /> Update Vault Configuration
          </button>
        </div>
      </div>

      {/* Protocol Summary Card */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl space-y-6">
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
            <Clock size={14} /> Active Protocol Logic
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[8px] font-black text-slate-500 uppercase mb-1">
                Principal Reduction Effect
              </p>
              <p className="text-xs leading-relaxed text-slate-300">
                At{" "}
                <span className="text-white font-bold">
                  {currentBorrowerRate}%
                </span>
                , every ₹10,000 paid reduces monthly interest by
                <span className="text-white font-black ml-1">
                  ₹
                  {Math.round(
                    (10000 * (Number(currentBorrowerRate) / 100)) / 12,
                  )}
                </span>
                .
              </p>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[8px] font-black text-slate-500 uppercase mb-1">
                Strategy Focus
              </p>
              <p className="text-[10px] font-bold text-slate-300 leading-tight">
                This configuration targets a{" "}
                <span className="text-white">1 Crore</span> portfolio goal by
                early 2032.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
