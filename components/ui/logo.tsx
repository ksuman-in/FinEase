// components/ui/logo.tsx
import LogoIcon from "./logo-icon";

export default function Logo({ showIcon = true }: { showIcon?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      {showIcon && <LogoIcon size={12} />}

      {/* 3. The Integrated Wordmark */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-black text-slate-50 tracking-[-0.07em] flex items-end">
          {/* The Foundation (Slate) */}
          <span className="relative">
            FIN
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600  rounded-full animate-pulse" />
          </span>

          {/* The Growth/Security (Blue) */}
          <span className="relative text-blue-600 ml-0.5">
            EASE
            {/* The dot over the 'i' is implicit in the ASR spacing */}
            <span className="absolute -top-1 right-0 w-1.5 h-1.5 bg-blue-100 rounded-full animate-pulse" />
          </span>
        </h1>
      </div>
    </div>
  );
}
