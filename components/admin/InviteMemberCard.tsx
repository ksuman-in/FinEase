"use client";

import { useState } from "react";
import { UserPlus, Loader2 } from "lucide-react";

export default function InviteMemberCard({ groupId }: { groupId: string }) {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleInvite = async () => {
    // if (!email) return;
    // setIsPending(true);
    // try {
    //   await inviteMemberAction(email, groupId);
    //   setEmail(""); // Clear input on success
    //   alert("Invite sent!");
    // } catch (err) {
    //   alert("Error sending invite");
    // } finally {
    //   setIsPending(false);
    // }
  };

  return (
    <section className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
          <UserPlus size={20} />
        </div>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
          Add New Member
        </h3>
      </div>

      <div className="flex gap-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="member@email.com"
          className="flex-1 h-14 px-6 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900"
        />
        <button
          onClick={handleInvite}
          disabled={isPending}
          className="px-8 h-14 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-95 text-xs uppercase tracking-widest flex items-center gap-2"
        >
          {isPending ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            "Send Invite"
          )}
        </button>
      </div>
    </section>
  );
}
