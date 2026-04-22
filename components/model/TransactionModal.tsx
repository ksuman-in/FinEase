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
import Portal from "../ui/Portal";

type TransactionMode = "TOP_UP" | "CONTRIB" | "PRIN_REPAY" | "NEW_LOAN";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: TransactionMode;
  onSubmit: (data: { amount: number; description: string }) => Promise<
    | {
        success?: boolean;
        error?: string;
        message?: string;
        [key: string]: unknown;
      }
    | undefined
  >;
  maxAmount?: number;
  interestRate?: number;
  remainingPrincipal?: number;
}

const MODAL_CONFIG = {
  TOP_UP: {
    title: "Request Capital",
    subtitle: "Instant group-pool access",
    icon: <HandCoins size={24} />,
    badge: "bg-blue-50 text-blue-600",
    cta: "Confirm Topup",
    note: "Interest is charged on the 1st. Principal repayments are flexible.",
  },
  NEW_LOAN: {
    title: "Request Capital",
    subtitle: "Instant group-pool access",
    icon: <HandCoins size={24} />,
    badge: "bg-blue-50 text-blue-600",
    cta: "Confirm Loan",
    note: "Interest is charged on the 1st. Principal repayments are flexible.",
  },
  CONTRIB: {
    title: "Monthly Contribution",
    subtitle: "Grow the Power 10 pool",
    icon: <IndianRupee size={24} />,
    badge: "bg-emerald-50 text-emerald-600",
    cta: "Deposit Funds",
    note: "Your contribution directly increases your equity in the 1 Crore goal.",
  },
  PRIN_REPAY: {
    title: "Principal Repayment",
    subtitle: "Lower your monthly interest",
    icon: <CreditCard size={24} />,
    badge: "bg-indigo-50 text-indigo-600",
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

  minValue = +parseFloat(String(minValue)).toFixed(0);

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
      setServerError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
      );
    }
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] animate-in fade-in duration-300"
          onClick={handleClose}
        />

        <div className="relative w-full max-w-lg z-[110] bg-white/80 backdrop-blur-3xl border border-white rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] overflow-hidden animate-in fade-in zoom-in duration-500">
          <div className="absolute inset-0 rounded-[3rem] border-t border-l border-white/90 pointer-events-none z-10" />

          <button
            onClick={handleClose}
            className="absolute right-8 top-8 p-2.5 bg-white/80 border border-white rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm transition-all z-20"
          >
            <X size={20} strokeWidth={2.5} />
          </button>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="relative z-10"
          >
            {serverError && (
              <div className="mx-8 mt-8 p-4 bg-rose-50/80 backdrop-blur-md border border-rose-200 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 relative z-20">
                <div className="w-9 h-9 rounded-xl bg-rose-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-200">
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
              </div>
            )}

            <div className="p-8 pb-4 flex items-center gap-5 bg-white/20">
              <div
                className={`w-16 h-16 rounded-2xl ${config.badge} flex items-center justify-center border border-white shadow-sm`}
              >
                {config.icon}
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
                  {config.title}
                </h2>
                <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                  {config.subtitle}
                </p>
              </div>
            </div>

            <div className="p-8 pt-4 space-y-8 bg-white/10">
              <div className="space-y-3">
                <div className="flex justify-between items-end px-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Amount (₹)
                  </label>
                  {isContribution && (
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      Required: {formatCurrency(minValue)}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="number"
                    {...register("amount", {
                      required: "Amount is required",
                      min: {
                        value: minValue,
                        message: `Minimum is ${formatCurrency(minValue)}`,
                      },
                      max: {
                        value: maxAmount,
                        message: `Maximum is ${formatCurrency(maxAmount)}`,
                      },
                    })}
                    className={`w-full h-24 px-8 rounded-[2.5rem] text-4xl font-black outline-none transition-all border-2 ${
                      errors.amount
                        ? "bg-rose-50/30 border-rose-200 text-rose-900"
                        : "bg-slate-100/40 border-transparent focus:border-slate-900 text-slate-900"
                    }`}
                  />
                </div>
                {errors.amount && (
                  <div className="flex items-center gap-2 px-4 text-rose-600">
                    <AlertCircle size={14} strokeWidth={3} />
                    <p className="text-[11px] font-black uppercase">
                      {errors.amount.message as string}
                    </p>
                  </div>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">
                  Notes / Transaction Info
                </label>
                <textarea
                  {...register("description")}
                  rows={2}
                  className="w-full p-6 bg-slate-100/40 border-2 border-transparent focus:border-slate-900 rounded-[2rem] text-base font-bold text-slate-900 outline-none transition-all placeholder:text-slate-300 resize-none"
                  placeholder="Briefly describe this movement of funds..."
                />
              </div>

              {/* Contextual Calculation (Request/Repayment) */}
              {mode !== "CONTRIB" && (
                <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 flex justify-between items-center shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/[0.05] pointer-events-none" />
                  <div className="space-y-1 relative z-10">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                      Estimated Interest Impact
                    </p>
                    <p className="text-xs font-bold text-blue-400">
                      Power 10 Rate: {interestRate}%
                    </p>
                  </div>
                  <div className="text-right relative z-10">
                    <p className="text-3xl font-black tracking-tighter">
                      ₹{calculatedInterest.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {/* Adaptive Help Note */}
              <div className="flex gap-4 p-5 bg-white/50 border border-white rounded-[2rem] shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  <AlertCircle size={16} strokeWidth={2.5} />
                </div>
                <p className="text-[12px] text-slate-600 leading-relaxed font-medium">
                  {config.note}
                </p>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-8 pt-0 relative z-20">
              <button
                type="submit"
                disabled={amount <= 0 || isSubmitting}
                className="w-full h-18 bg-slate-900 hover:bg-blue-600 text-white font-black rounded-[2rem] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <span className="text-xs uppercase tracking-[0.2em]">
                      {config.cta}
                    </span>
                    <Check
                      size={20}
                      strokeWidth={3}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
}
