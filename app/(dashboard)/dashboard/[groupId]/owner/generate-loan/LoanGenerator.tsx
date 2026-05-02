"use client";

import { useForm } from "react-hook-form";
import {
  useActionState,
  useMemo,
  startTransition,
  useEffect,
  useState,
} from "react";
import { generateLoanAction } from "@/lib/actions/owner/generateLoan";
import { formatCurrency } from "@/lib/utils/date-logic";
import {
  Loader2,
  UserPlus,
  IndianRupee,
  Percent,
  Calendar,
  Zap,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

type LoanFormData = {
  email: string;
  amount: number;
  roi: number;
  tenure: number;
};

export default function LoanGenerator({ groupId }: { groupId: string }) {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoanFormData>({
    defaultValues: { amount: 50000, roi: 18, tenure: 24 },
  });

  const [state, formAction, isPending] = useActionState(generateLoanAction, {
    success: false,
    message: "",
  });

  const [displayMessage, setDisplayMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (state?.message) {
      setDisplayMessage({ success: state.success, message: state.message });
      const timer = setTimeout(() => setDisplayMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const { amount, roi, tenure } = watch();
  const emi = useMemo(() => {
    if (amount > 0 && roi > 0 && tenure > 0) {
      const r = roi / (12 * 100);
      const calc =
        (amount * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1);
      return Math.round(calc);
    }
    return 0;
  }, [amount, roi, tenure]);

  const totalInterest = emi * tenure - amount;

  const onSubmit = (data: LoanFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) =>
      formData.append(key, val.toString()),
    );
    formData.append("groupId", groupId);

    startTransition(() => {
      formAction(formData);
      reset({ amount: 50000, roi: 18, tenure: 24 });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 xl:grid-cols-12 gap-10"
    >
      <div className="xl:col-span-8 space-y-8">
        {(displayMessage || errors.email) && (
          <div
            className={`flex items-center gap-4 p-6 rounded-[2rem] border animate-in fade-in slide-in-from-top-4 duration-300 ${
              displayMessage?.success
                ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                : "bg-rose-50 border-rose-100 text-rose-800"
            }`}
          >
            {displayMessage?.success ? (
              <CheckCircle2 size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest leading-none">
                {displayMessage?.success
                  ? "Protocol Success"
                  : "Validation Error"}
              </p>
              <p className="text-sm font-bold tracking-tight">
                {errors.email?.message || displayMessage?.message}
              </p>
            </div>
          </div>
        )}

        <div className="glass-morphism p-10 rounded-[3rem] border border-white bg-white/60 space-y-8 shadow-2xl">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
              Borrower Email
            </label>
            <div className="relative">
              <UserPlus
                className="absolute left-6 top-5 text-slate-400"
                size={20}
              />
              <input
                {...register("email", {
                  required: "Valid email is required for the digital ledger.",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Incorrect email format.",
                  },
                })}
                className="w-full h-16 bg-white border border-slate-100 pl-14 p-6 rounded-2xl font-black outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                Principal (₹)
              </label>
              <div className="relative">
                <IndianRupee
                  className="absolute left-6 top-5 text-slate-400"
                  size={20}
                />
                <input
                  type="number"
                  {...register("amount", { valueAsNumber: true, min: 1 })}
                  className="w-full h-16 bg-white border border-slate-100 pl-14 p-6 rounded-2xl font-black outline-none transition-all"
                />
              </div>
            </div>

            {/* ROI Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                Custom ROI (%)
              </label>
              <div className="relative">
                <Percent
                  className="absolute left-6 top-5 text-slate-400"
                  size={20}
                />
                <input
                  type="number"
                  step="0.1"
                  {...register("roi", { valueAsNumber: true, min: 5, max: 40 })}
                  className="w-full h-16 bg-white border border-slate-100 pl-14 p-6 rounded-2xl font-black outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Tenure Input (RESTORED) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Tenure Protocol
              </label>
              <span className="text-xs font-black text-slate-900">
                {tenure} Months
              </span>
            </div>
            <div className="relative flex items-center px-2 py-4">
              <Calendar className="text-slate-400 mr-4" size={20} />
              <input
                type="range"
                min="6"
                max="60"
                step="6"
                {...register("tenure", { valueAsNumber: true })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Projection Sidebar */}
      <div className="xl:col-span-4 space-y-6">
        <div className="p-8 rounded-[3rem] bg-slate-900 text-white shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-10">
            <Zap size={200} />
          </div>
          <div>
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
              Monthly EMI
            </p>
            <h3 className="text-5xl font-black tracking-tighter text-blue-400">
              {formatCurrency(emi)}
            </h3>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex justify-between text-[12px] font-black uppercase">
              <span className="text-slate-500">Interest Yield</span>
              <span className="text-rose-400">
                {formatCurrency(totalInterest)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-6 bg-blue-600 disabled:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              "Initialize Loan"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
