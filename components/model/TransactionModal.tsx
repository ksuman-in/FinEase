"use client";

import { useEffect, useState } from "react";
import {
  HandCoins,
  IndianRupee,
  CreditCard,
  Check,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { TransactionType } from "@prisma/client";
import { formatCurrency } from "@/lib/utils/date-logic";
import { generatInformations, transactionType } from "@/utils/constant";

type TransactionMode = "NEW_LOAN" | "CONTRIB" | "PRIN_REPAY";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: TransactionMode;
  onSubmit: (data: { amount: number; description: string }) => Promise<
    | {
        success?: boolean;
        error?: string;
        message?: string; // Add message since your actions use it
        [key: string]: unknown;
      }
    | undefined // This is the crucial part to fix the error
  >;
  maxAmount?: number;
  interestRate?: number;
  remainingPrincipal?: number;
}

const MODAL_CONFIG = {
  NEW_LOAN: {
    title: "Request Capital",
    subtitle: "Instant group-pool access",
    icon: <HandCoins size={24} />,
    color: "blue",
    cta: "Confirm Loan",
    note: "Interest is charged on the 1st. Principal repayments are flexible.",
  },
  CONTRIB: {
    title: "Monthly Contribution",
    subtitle: "Grow the Power 10 pool",
    icon: <IndianRupee size={24} />,
    color: "emerald",
    cta: "Deposit Funds",
    note: "Your contribution directly increases your equity in the 1 Crore goal.",
  },
  PRIN_REPAY: {
    title: "Principal Repayment",
    subtitle: "Lower your monthly interest",
    icon: <CreditCard size={24} />,
    color: "indigo",
    cta: "Pay Principal",
    note: "Reducing balance enabled. Every rupee paid reduces next month's interest.",
  },
};

export default function TransactionModal({
  isOpen,
  onClose,
  mode,
  onSubmit,
  maxAmount = 100000,
  interestRate = 1.0,
  remainingPrincipal,
}: ModalProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const { monthlyContribution, minPrincipalPayment } = generatInformations;
  const config = MODAL_CONFIG[mode];
  const isContribution = mode === transactionType.CONTRIB;
  const percentageInterestRate = interestRate / 100;
  const interestFloor =
    remainingPrincipal && remainingPrincipal > 0
      ? remainingPrincipal * percentageInterestRate
      : 0;

  let minValue = minPrincipalPayment;

  if (isContribution) {
    minValue = remainingPrincipal
      ? interestFloor + monthlyContribution
      : monthlyContribution;
  } else if (
    remainingPrincipal &&
    remainingPrincipal > 0 &&
    remainingPrincipal < minPrincipalPayment
  ) {
    minValue = remainingPrincipal;
  }

  const {
    handleSubmit,
    reset,
    register,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      amount: minValue,
      description: "",
    },
  });
  const amount = Number(watch("amount") || 0);

  const calculatedInterest = amount * percentageInterestRate;
  const handleClose = () => {
    reset({ amount: minValue });
    onClose();
  };
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setServerError(null);
      reset({
        amount: isContribution ? minValue : 10000,
        description: "",
      });
    }
  }, [isOpen, minValue, isContribution, reset]);

  const handleFormSubmit = async (values: {
    amount: number;
    description: string;
  }) => {
    setServerError(null);
    try {
      // Ensure we are passing a number to the parent action
      const response = await onSubmit({
        amount: Number(values.amount),
        description: values.description,
      });
      if (response && response.error) {
        setServerError(response.error);
        return;
      }
      onClose();
      reset();
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("An unexpected error occurred.");
      }
      console.error("Transaction failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glass Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* White Glassmorphism Card */}
      <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-2xl border border-white rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button
          onClick={handleClose}
          className="absolute right-8 top-8 p-2 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X size={20} />
        </button>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {serverError && (
            <div className="mx-8 mt-6 p-4 bg-rose-50/80 backdrop-blur-md border border-rose-200 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="w-8 h-8 rounded-xl bg-rose-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-200">
                <AlertCircle size={18} strokeWidth={3} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">
                  Action Failed
                </p>
                <p className="text-sm font-bold text-rose-900 leading-tight">
                  {String(serverError)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setServerError(null)}
                className="p-2 text-rose-300 hover:text-rose-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}
          {/* Dynamic Header */}
          <div className="p-8 pb-4 flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl bg-${config.color}-50 text-${config.color}-600 flex items-center justify-center`}
            >
              {config.icon}
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {config.title}
              </h2>
              <p className="text-sm font-medium text-slate-500">
                {config.subtitle}
              </p>
            </div>
          </div>

          <div className="p-8 pt-4 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-end ml-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Amount (₹)
                </label>
                {isContribution && (
                  <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">
                    Min: {formatCurrency(minValue)}
                  </span>
                )}
              </div>

              <input
                type="number"
                {...register("amount", {
                  required: "Amount is required",
                  min: {
                    value: minValue,
                    message: `Minimum required is ${formatCurrency(minValue)}`,
                  },
                  max: {
                    value: maxAmount,
                    message: `Maximum allowed is ${formatCurrency(maxAmount)}`,
                  },
                })}
                className={`w-full h-20 px-8 rounded-[2rem] text-3xl font-black outline-none transition-all border-2 ${errors.amount ? "bg-rose-50/50 border-rose-200 text-rose-900 focus:border-rose-500" : "bg-slate-50/50 border-transparent focus:border-slate-900 text-slate-900"}`}
              />
              {/* Error Message Display */}
              {errors.amount && (
                <div className="flex items-center gap-2 ml-4 text-rose-600 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle size={12} strokeWidth={3} />
                  <p className="text-[11px] font-black uppercase tracking-tight">
                    {errors.amount.message as string}
                  </p>
                </div>
              )}
            </div>
            {/* Description Field */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                Notes / Description
              </label>
              <div className="relative group">
                <textarea
                  {...register("description")}
                  rows={2}
                  className="w-full p-6 bg-slate-50/50 border-2 border-transparent focus:border-slate-900 rounded-[2rem] text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-300 resize-none"
                  placeholder={
                    mode === TransactionType.PRIN_REPAY
                      ? "What is this capital for?"
                      : mode === TransactionType.CONTRIB
                        ? "Monthly contribution notes..."
                        : "Repayment details..."
                  }
                />
                {/* Subtle icon decoration */}
                <div className="absolute right-6 bottom-6 opacity-20 group-focus-within:opacity-100 transition-opacity">
                  <div className={`w-1 h-1 rounded-full bg-slate-900 mb-1`} />
                  <div className={`w-1 h-1 rounded-full bg-slate-900`} />
                </div>
              </div>
            </div>

            {/* Contextual Calculation (Only for Request/Repayment) */}
            {mode !== "CONTRIB" && (
              <div className="bg-slate-900 text-white rounded-[2rem] p-6 flex justify-between items-center shadow-xl shadow-slate-900/10">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Estimated Interest Impact
                  </p>
                  <p className="text-xs font-medium text-slate-300">
                    Based on {interestRate}% rate
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black">
                    ₹{calculatedInterest.toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {/* Adaptive Note */}
            <div className="flex gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <AlertCircle className="w-5 h-5 text-slate-400 shrink-0" />
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium italic">
                {config.note}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-8 pt-0 flex gap-4">
            <button
              type="submit"
              disabled={amount <= 0 || isSubmitting}
              className={`flex-1 h-16 bg-slate-900 hover:bg-black text-white font-black rounded-[1.5rem] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer`}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  {config.cta} <Check size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
