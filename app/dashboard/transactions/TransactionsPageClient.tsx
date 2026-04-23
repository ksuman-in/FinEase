"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  CellContext,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Calendar, Search } from "lucide-react";
import { GroupRole, MemberTransaction, TransactionType } from "@prisma/client";
import { MONTHS } from "@/utils/constant";

export default function TransactionsPageClient({
  data,
  membership,
}: {
  data: MemberTransaction[];
  membership: { group: { name: string }; role: string; groupId: string } | null;
}) {
  console.log({ membership });
  const [activeMonth, setActiveMonth] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState(
    new Date().getFullYear().toString(),
  );
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

  const columns = useMemo(() => {
    const cols: ColumnDef<MemberTransaction>[] = [
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
          <span className="font-semibold text-slate-500 text-xs">
            {new Date(row.original.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
            })}
          </span>
        ),
      },
    ];

    if (membership?.role === GroupRole.OWNER) {
      cols.push({ accessorKey: "user.name", header: "Member" });
    }

    return [
      ...cols,
      { accessorKey: "description", header: "Description" },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({
          getValue,
        }: CellContext<MemberTransaction, TransactionType>) => (
          <span className="px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[9px] font-bold text-blue-600 uppercase tracking-widest">
            {(getValue() as string).replace("_", " ")}
          </span>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({
          getValue,
        }: CellContext<MemberTransaction, TransactionType>) => (
          <span className="font-black text-slate-900">
            ₹{getValue().toLocaleString()}
          </span>
        ),
      },
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
    <main className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-[-10%] right-[-5%] w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-xl shadow-slate-200/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100/50">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            {/* Left Side: Brand & Page Title */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)] animate-pulse" />
                <span className="text-[10px] font-black text-blue-600/70 uppercase tracking-[0.3em]">
                  {membership?.group?.name || "Vault"} • System Ledger
                </span>
              </div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                Transaction History
              </h1>
              <p className="text-slate-500 text-xs font-medium">
                Detailed audit log of all group capital movements.
              </p>
            </div>

            <div className="group relative overflow-hidden bg-white/60 border border-white px-6 py-3 rounded-2xl shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md">
              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] pointer-events-none" />

              <div className="flex flex-col items-center relative z-10">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Active Agent
                </span>
                <div className="flex items-center gap-2 flex-col">
                  <span className="text-sm font-black text-slate-900">
                    {membership?.role === "OWNER" ? "Group Owner" : "Member"}
                  </span>
                  <div className="p-1 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    {membership?.groupId}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Year Select with Hover */}
            <div className="md:col-span-3 flex items-center gap-3 px-5 py-3 bg-white/60 border border-white rounded-2xl shadow-sm transition-all hover:border-blue-300 hover:bg-white/80 group">
              <Calendar
                size={16}
                className="text-slate-400 group-hover:text-blue-500 transition-colors"
              />
              <select className="bg-transparent text-xs font-bold text-slate-700 outline-none w-full cursor-pointer">
                <option value="2026">FY 2026</option>
                <option value="2025">FY 2025</option>
              </select>
            </div>

            {/* Search Input with Focus/Hover Glow */}
            <div className="md:col-span-9 bg-white/60 border border-white rounded-2xl px-5 flex items-center shadow-sm transition-all hover:border-blue-300 hover:bg-white/80 focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-blue-400">
              <Search size={16} className="text-slate-400 mr-3" />
              <input
                placeholder="Search transactions..."
                className="bg-transparent w-full py-3 text-xs text-slate-800 outline-none placeholder:text-slate-400 font-medium"
                onChange={(e) =>
                  table.getColumn("description")?.setFilterValue(e.target.value)
                }
              />
            </div>
          </div>

          {/* Month Tabs with Scale Effect */}
          <div className="flex gap-2 overflow-x-auto mt-6 pb-2 no-scrollbar">
            {MONTHS.map((month) => (
              <button
                key={month}
                onClick={() =>
                  setActiveMonth(month === activeMonth ? null : month)
                }
                className={`px-5 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95
                  ${
                    activeMonth === month
                      ? "bg-slate-900 border-slate-900 text-white shadow-lg -translate-y-1"
                      : "bg-white/50 border-white text-slate-500 hover:bg-white hover:border-blue-200 hover:text-blue-600 hover:-translate-y-0.5 shadow-sm"
                  }
                `}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        {/* --- MILK GLASS TABLE --- */}
        <div className="bg-white/30 backdrop-blur-lg border border-white/50 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50">
          <table className="w-full text-left">
            <thead className="bg-white/50 border-b border-white/60 sticky top-0 z-20 backdrop-blur-md">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 first:rounded-tl-[2.8rem] last:rounded-tr-[2.8rem]"
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {/* Optional: Add a small indicator for sortable columns */}
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-white/40">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="group transition-all duration-300 ease-out cursor-default/* Milk Glass Hover Effect */hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:z-10 relative"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="p-6 text-sm text-slate-600 font-medium transition-colors duration-300  group-hover:text-slate-900"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="p-24 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <Search size={32} className="text-slate-400" />
                      <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                        No records found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* --- PAGINATION --- */}
          <div className="p-8 border-t border-white/60 flex items-center justify-between bg-white/20">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Displaying
              </span>
              <span className="text-xs font-bold text-slate-700">
                {/* Show actual row count vs total */}
                {table.getRowModel().rows.length} of {filteredData.length}{" "}
                Transactions
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="p-3 bg-white/60 rounded-xl border border-white disabled:opacity-20 hover:bg-white hover:scale-110 hover:shadow-md transition-all active:scale-90 shadow-sm group"
              >
                <ChevronLeft
                  size={16}
                  className="text-slate-600 group-hover:text-blue-600"
                />
              </button>

              <button
                onClick={() => table.nextPage()}
                disabled={
                  !table.getCanNextPage() || filteredData.length <= pageSize
                }
                className="p-3 bg-white/60 rounded-xl border border-white disabled:opacity-20 hover:bg-white hover:scale-110 hover:shadow-md transition-all active:scale-90 shadow-sm group"
              >
                <ChevronRight
                  size={16}
                  className="text-slate-600 group-hover:text-blue-600"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
