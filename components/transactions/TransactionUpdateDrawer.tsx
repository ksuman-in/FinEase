"use client";

import { useForm } from "react-hook-form";
import { Drawer } from "vaul";
import { toast } from "sonner";
import { saveTransactionAction } from "@/lib/actions/transactions";
import { useState } from "react";
import { SaveTransactionFormTypes } from "@/utils/types";
import { X } from "lucide-react";

interface Users {
  id: string;
  name: string;
  role: string | null;
}

export default function TransactionUpdateDrawer({
  isPaymentPending,
  label,
  isAdmin,
  users,
  isActiveLoan,
}: {
  isPaymentPending: boolean;
  label: string;
  isAdmin: boolean;
  users: Users[];
  isActiveLoan: boolean;
}) {
  const isActiveOrAdmin = isActiveLoan || isAdmin;
  const [open, setOpen] = useState(isPaymentPending || false);
  const initialData = {
    type: "CONTRIB",
    amount: 0,
    description: "Monthly Savings - General",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      type: initialData.type,
      amount: initialData.amount,
      description: initialData.description,
      date: new Date().toISOString().split("T")[0],
      userId: "",
    },
  });

  const onSubmit = async (data: SaveTransactionFormTypes) => {
    try {
      await saveTransactionAction(data);
      toast.success("Transaction synced successfully");
    } catch (err) {
      console.log(err);
      toast.error("Update failed. Check your permissions.");
    } finally {
      reset();
      setOpen(false);
    }
  };
  return (
    <Drawer.Root open={open} direction="right" onOpenChange={setOpen}>
      <Drawer.Trigger className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer">
        {label}
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-md z-50" />
        <Drawer.Content className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-slate-200 z-50 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.05)]">
          {/* --- ACCESSIBILITY FIX WITH CSS --- */}
          <Drawer.Title className="sr-only">Navigation Menu</Drawer.Title>
          <Drawer.Description className="sr-only">
            Access your dashboard and financial records.
          </Drawer.Description>
          {/* ---------------------------------- */}
          <div className="p-10 space-y-10 overflow-y-auto">
            {/* Context Header */}
            <div>
              <button
                onClick={() => setOpen(false)}
                className="absolute right-6 top-6 p-2 rounded-full bg-slate-100 text-slate-500 active:bg-slate-200 transition-colors"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
                Update <span className="text-blue-600">Transaction</span>
              </h3>
            </div>

            <form
              onSubmit={handleSubmit((data) =>
                onSubmit(data as SaveTransactionFormTypes),
              )}
              className="space-y-8"
            >
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                  Transaction Date
                </label>
                <input
                  type="date"
                  {...register("date")}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all"
                />
              </div>

              {isAdmin && (
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                    Select User
                  </label>
                  <select
                    {...register("userId")}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-900 outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Select User</option>
                    {users.map((user: Users) => {
                      return (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                  Update Category
                </label>
                <select
                  {...register("type")}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-900 outline-none appearance-none cursor-pointer"
                  disabled={!isActiveLoan && !isAdmin}
                >
                  <option value="CONTRIB">Contribution</option>
                  {(isActiveLoan || isAdmin) && (
                    <>
                      <option value="BOTH">Interest + Contribution</option>
                      <option value="PRIN_REPAY">Principal Repayment</option>
                    </>
                  )}
                </select>
              </div>

              {/* Amount Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                  Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    {...register("amount")}
                    placeholder="0"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pl-10 text-xl font-mono font-black text-slate-900 outline-none focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                  Reference Note
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium text-slate-600 outline-none resize-none h-32"
                />
              </div>

              {/* Submit Logic */}
              <div className="pt-10">
                <button
                  type="submit"
                  disabled={!isDirty || isSubmitting}
                  className={`w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 transition-all transform active:scale-95 disabled:bg-slate-400`}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
                {!isDirty && (
                  <p className="text-center text-[9px] text-slate-600 mt-4 uppercase font-bold tracking-tighter">
                    No changes detected in fields
                  </p>
                )}
              </div>
            </form>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
