"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

interface MobileNavProps {
  membership?: { role: string; groupId: string } | null;
  pendingCount?: number;
  isSuperAdmin: boolean;
}

export default function MobileNav({
  membership,
  pendingCount,
  isSuperAdmin,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const closeSidebar = () => {
    setOpen(false);
  };

  return (
    <Drawer.Root direction="left" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button className="lg:hidden p-2.5 rounded-xl bg-white/50 border border-white shadow-sm text-slate-600 hover:text-slate-900 transition-all active:scale-95">
          <Menu size={20} strokeWidth={2.5} />
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-60" />

        <Drawer.Content className="fixed left-0 top-0 bottom-0 w-[280px] glass-morphism border-r border-white/40 z-70 flex flex-col outline-none shadow-2xl">
          <Drawer.Title className="sr-only">Navigation Menu</Drawer.Title>
          <Drawer.Description className="sr-only">
            Access your dashboard and financial records.
          </Drawer.Description>

          <div className="p-6 flex justify-between items-center border-b border-white/20">
            <h2 className="text-xl font-black text-slate-900 tracking-tighter">
              Vault<span className="text-blue-600">Ease</span>
            </h2>
            <Drawer.Close asChild>
              <button className="p-2 rounded-xl hover:bg-white/50 text-slate-400 hover:text-slate-900 transition-all">
                <X size={20} strokeWidth={2.5} />
              </button>
            </Drawer.Close>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <Sidebar
              pendingCount={pendingCount}
              membership={membership}
              isSuperAdmin={isSuperAdmin}
              closeSidebar={closeSidebar}
            />
          </div>

          <div className="p-6 border-t border-white/20 bg-white/10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
              Power 10 Protocol Active
            </p>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
