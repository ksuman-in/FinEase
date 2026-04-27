"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Search,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { GroupRole, TransactionType } from "@prisma/client";
import { MONTHS } from "@/utils/constant";
import { formatCurrency } from "@/lib/utils/date-logic";

interface SerializedTransaction {
  id: string;
  userId: string;
  groupId: string;
  amount: number;
  type: TransactionType;
  date: string;
  description: string | null;
  user: {
    name: string | null;
  };
}

export default function TransactionsPageClient({
  data,
  membership,
}: {
  data: SerializedTransaction[];
  membership: {
    group: { name: string };
    role: string;
    groupId: string;
  } | null;
}) {
  const [activeMonth, setActiveMonth] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState("2026");
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 12,
  });

  const filteredData = useMemo(() => {
    return data.filter((tx) => {
      const date = new Date(tx.date);
      const monthMatch =
        !activeMonth || MONTHS[date.getMonth()] === activeMonth;
      const yearMatch = date.getFullYear().toString() === activeYear;
      return monthMatch && yearMatch;
    });
  }, [data, activeMonth, activeYear]);

  const stats = useMemo(() => {
    return filteredData.reduce(
      (
        acc: { in: number; out: number; principal: number; topup: number },
        curr: SerializedTransaction,
      ) => {
        if (curr.type === TransactionType.CONTRIB) acc.in += curr.amount;
        if (curr.type === TransactionType.NEW_LOAN) acc.out += curr.amount;
        if (curr.type === TransactionType.PRIN_REPAY)
          acc.principal += curr.amount;
        if (curr.type === TransactionType.TOP_UP) acc.topup += curr.amount;
        return acc;
      },
      { in: 0, out: 0, principal: 0, topup: 0 },
    );
  }, [filteredData]);

  const columns = useMemo(() => {
    const cols: ColumnDef<SerializedTransaction>[] = [
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-bold text-slate-700 text-xs">
              {new Date(row.original.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              })}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {new Date(row.original.date).getFullYear()}
            </span>
          </div>
        ),
      },
    ];

    if (membership?.role === GroupRole.OWNER) {
      cols.push({
        accessorKey: "user.name",
        header: "Member",
        cell: ({ row }) => (
          <span className="font-bold text-slate-600">
            {row.original?.user?.name}
          </span>
        ),
      });
    }

    return [
      ...cols,
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ getValue }) => {
          const type = getValue() as TransactionType;
          const isIn =
            type === TransactionType.CONTRIB ||
            type === TransactionType.INT_PAID;
          return (
            <span
              className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                isIn
                  ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                  : "bg-rose-50 border-rose-100 text-rose-600"
              }`}
            >
              {type.replace("_", " ")}
            </span>
          );
        },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ getValue, row }) => (
          <span
            className={`font-black ${row.original.type === TransactionType.CONTRIB ? "text-emerald-600" : "text-slate-900"}`}
          >
            ₹{Number(getValue()).toLocaleString()}
          </span>
        ),
      },
      { accessorKey: "description", header: "Description" },
    ];
  }, [membership?.role]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row justify-between gap-6 items-start">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Financial Ledger
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              {membership?.group?.name}
            </p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:w-40 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                Total In
              </p>
              <div className="flex items-center gap-2 text-emerald-600">
                <TrendingUp size={14} />
                <span className="font-black text-sm">
                  {formatCurrency(stats.in)}
                </span>
              </div>
            </div>
            <div className="flex-1 md:w-40 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                Total Out
              </p>
              <div className="flex items-center gap-2 text-rose-600">
                <TrendingDown size={14} />
                <span className="font-black text-sm">
                  {formatCurrency(stats.out + stats.topup - stats.principal)}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Filters Panel */}
        <section className="glass-morphism p-6 rounded-[2rem] border border-white shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 bg-white/60 border border-white rounded-xl px-4 py-2 flex items-center gap-3">
              <Calendar size={16} className="text-slate-400" />
              <select
                value={activeYear}
                onChange={(e) => setActiveYear(e.target.value)}
                className="bg-transparent text-xs font-bold outline-none w-full cursor-pointer"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <div className="md:col-span-9 bg-white/60 border border-white rounded-xl px-4 py-2 flex items-center">
              <Search size={16} className="text-slate-400 mr-3" />
              <input
                placeholder="Search description..."
                className="bg-transparent w-full text-xs font-medium outline-none"
                onChange={(e) => table.setGlobalFilter(e.target.value)}
              />
            </div>
          </div>

          {/* Month Scroll */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {MONTHS.map((month) => (
              <button
                key={month}
                onClick={() =>
                  setActiveMonth(month === activeMonth ? null : month)
                }
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all whitespace-nowrap
                  ${activeMonth === month ? "bg-slate-900 text-white" : "bg-white/50 text-slate-500 hover:bg-white"}
                `}
              >
                {month}
              </button>
            ))}
          </div>
        </section>

        {/* Table Section */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-slate-50">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-6 text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <footer className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Page {pageIndex + 1} of {table.getPageCount()}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="p-2 bg-white rounded-lg border border-slate-200 disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="p-2 bg-white rounded-lg border border-slate-200 disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
