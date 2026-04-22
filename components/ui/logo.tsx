import { VaultLogoIcon } from "./logo-icon";

export default function Logo() {
  return (
    <div className="flex items-center gap-4 select-none group">
      <div className="relative transform transition-transform duration-700 group-hover:rotate-12">
        {/* The New Bigger Icon */}
        <VaultLogoIcon />

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-full pointer-events-none" />
      </div>

      <div className="flex flex-col -space-y-1">
        <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
          Vault<span className="text-blue-600">Ease</span>
        </span>
      </div>
    </div>
  );
}
