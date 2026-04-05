import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

// Mock Data based on your screenshots
const members = [
  {
    id: 1,
    name: "Chhotelal Kumar",
    int: 200,
    repaid: 0,
    new: 0,
    balance: 20000,
  },
  {
    id: 2,
    name: "Bhupendra Kumar",
    int: 300,
    repaid: 0,
    new: 10000,
    balance: 30000,
  },
  {
    id: 3,
    name: "Shubhash Kumar",
    int: 1500,
    repaid: 0,
    new: 0,
    balance: 150000,
  },
  {
    id: 4,
    name: "Suman Kumar",
    int: 1100,
    repaid: 40000,
    new: 0,
    balance: 110000,
  },
];

export default async function MemberList() {
  return (
    <>
      {members.map((m) => (
        <tr key={m.id} className="hover:bg-white/3 transition-colors group">
          <td className="px-6 py-4 font-medium text-slate-200">{m.name}</td>

          <td className="px-6 py-4 text-cyan-400 font-mono">₹{m.int}</td>

          <td className="px-6 py-4">
            {m.repaid > 0 ? (
              <span className="flex items-center text-green-400 gap-1 text-sm bg-green-400/10 w-fit px-2 py-0.5 rounded-md">
                <ArrowUpRight size={14} /> ₹{m.repaid.toLocaleString()}
              </span>
            ) : (
              <Minus className="text-slate-600" size={16} />
            )}
          </td>

          <td className="px-6 py-4">
            {m.new > 0 ? (
              <span className="flex items-center text-rose-400 gap-1 text-sm bg-rose-400/10 w-fit px-2 py-0.5 rounded-md">
                <ArrowDownRight size={14} /> ₹{m.new.toLocaleString()}
              </span>
            ) : (
              <Minus className="text-slate-600" size={16} />
            )}
          </td>

          <td className="px-6 py-4 font-bold text-right">
            <span
              className={m.balance >= 100000 ? "text-rose-400" : "text-white"}
            >
              ₹{m.balance.toLocaleString()}
            </span>
          </td>
        </tr>
      ))}
    </>
  );
}
