"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root direction="left" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
          <Menu size={24} />
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60" />
        <Drawer.Content className="fixed left-0 top-0 bottom-0 w-70 bg-app-foreground border-r border-white/10 z-70 flex flex-col outline-none">
          {/* --- ACCESSIBILITY FIX WITH CSS --- */}
          <Drawer.Title className="sr-only">Navigation Menu</Drawer.Title>
          <Drawer.Description className="sr-only">
            Access your dashboard and financial records.
          </Drawer.Description>
          {/* ---------------------------------- */}

          <div className="p-6 flex justify-between items-center border-b border-white/5">
            <h2 className="text-xl font-black text-white">
              FIN<span className="text-blue-500">EASE</span>
            </h2>
            <Drawer.Close>
              <X size={20} className="text-app-bg0" />
            </Drawer.Close>
          </div>

          <div className="flex-1 overflow-y-auto pt-4">
            <Sidebar closeSidebar={() => setOpen(false)} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
