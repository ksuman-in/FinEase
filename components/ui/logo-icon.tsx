// Updated logo with increased scale and refined stroke weights
export const VaultLogoIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-sm"
  >
    <circle
      cx="24"
      cy="24"
      r="22"
      fill="url(#milk_gradient)"
      stroke="#E2E8F0"
      strokeWidth="0.5"
    />

    <path
      d="M24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34C29.5228 34 34 29.5228 34 24"
      stroke="#0F172A"
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    <path
      d="M24 14V24L30 28"
      stroke="#3B82F6"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <defs>
      <linearGradient
        id="milk_gradient"
        x1="6"
        y1="6"
        x2="42"
        y2="42"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#F1F5F9" />
      </linearGradient>
    </defs>
  </svg>
);
