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
import { MemberTransaction, TransactionType, User } from "@prisma/client";
import { MONTHS } from "@/utils/constant";

export default function TransactionsPage({
  data,
  currentUser,
}: {
  data: MemberTransaction[];
  currentUser: { role: string | null };
}) {
  const [activeMonth, setActiveMonth] = useState<string | null>(null);

  const [activeYear, setActiveYear] = useState(
    new Date().getFullYear().toString(),
  );

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 12,
  });

  const filteredData = useMemo(() => {
    return data.filter((tx: MemberTransaction) => {
      const date = new Date(tx.date);
      const monthMatch =
        !activeMonth || MONTHS[date.getMonth()] === activeMonth;
      const yearMatch = date.getFullYear().toString() === activeYear;
      return monthMatch && yearMatch;
    });
  }, [data, activeMonth, activeYear]);

  const columns = useMemo(() => {
    const cols: ColumnDef<MemberTransaction>[] = [];
    if (currentUser.role === "admin") {
      cols.push({
        accessorKey: "user.name",
        header: "Member",
      });
    }

    const column = [
      {
        accessorKey: "date",
        header: "Date",
        cell: ({
          getValue,
        }: CellContext<MemberTransaction, TransactionType>) => {
          const rawValue = getValue();

          if (!rawValue)
            return <span className="text-slate-600 italic">No Date</span>;

          const date = new Date(rawValue);

          if (isNaN(date.getTime())) {
            return <span className="text-rose-500 font-bold">Error</span>;
          }
          return (
            <span className="font-mono text-xs text-slate-400">
              {date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          );
        },
      },
      ...cols,
      { accessorKey: "description", header: "Description" },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({
          getValue,
        }: CellContext<MemberTransaction, TransactionType>) => (
          <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[9px] font-bold uppercase tracking-tighter">
            {getValue().replace("_", " ")}
          </span>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({
          getValue,
        }: CellContext<MemberTransaction, TransactionType>) => (
          <span className="font-black text-white">
            ₹{getValue().toLocaleString()}
          </span>
        ),
      },
    ];
    return column;
  }, [currentUser.role]);

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
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* --- FILTER BAR --- */}
      <div className="flex flex-col gap-6 bg-white/5 p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Calendar size={18} className="text-blue-500" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">
              Select Month
            </h3>
          </div>
          <div className="flex items-center gap-4">
            {activeMonth && (
              <button
                onClick={() => setActiveMonth(null)}
                className="text-[10px] font-black text-rose-500 hover:underline uppercase"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl">
            <Calendar size={16} className="text-blue-500" />
            <select
              value={activeYear}
              onChange={(e) => setActiveYear(e.target.value)}
              className="bg-transparent text-xs font-black text-white outline-none cursor-pointer uppercase tracking-widest"
            >
              <option value="2026" className="bg-app-foreground">
                2026
              </option>
              <option value="2025" className="bg-app-foreground">
                2025
              </option>
            </select>
          </div>

          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 flex items-center">
            <Search size={16} className="text-app-bg0 mr-3" />
            <input
              placeholder="Search description..."
              className="bg-transparent w-full py-3 text-xs text-white outline-none placeholder:text-slate-600 font-medium"
              onChange={(e) =>
                table.getColumn("description")?.setFilterValue(e.target.value)
              }
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {MONTHS.map((month) => (
            <button
              key={month}
              onClick={() =>
                setActiveMonth(month === activeMonth ? null : month)
              }
              className={`px-5 py-2.5 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                ${
                  activeMonth === month
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20 scale-105"
                    : "bg-white/5 border-white/10 text-app-bg0 hover:border-white/20 hover:text-slate-300"
                }
              `}
            >
              {month}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-6 text-[10px] font-black uppercase tracking-widest text-app-bg0"
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
          <tbody className="divide-y divide-white/5">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-white/2 transition-colors group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-6 text-sm text-slate-300">
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
                <td colSpan={4} className="p-20 text-center">
                  <p className="text-app-bg0 font-medium italic">
                    No transactions found for {activeMonth}.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* --- PAGINATION --- */}
        <div className="p-6 border-t border-white/5 flex items-center justify-between bg-white/1">
          <div className="text-[10px] font-bold text-app-bg0 uppercase tracking-widest">
            Page {table.getState().pagination.pageIndex + 1}{" "}
            <span className="mx-1 text-slate-700">/</span>{" "}
            {table.getPageCount() || 1}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-3 bg-white/5 rounded-xl border border-white/10 disabled:opacity-20 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={16} className="text-white" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-3 bg-white/5 rounded-xl border border-white/10 disabled:opacity-20 hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
