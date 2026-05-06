import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", // Deep Slate for premium feel
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "140px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "320px",
            height: "320px",
            borderRadius: "160px",
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          }}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="none"
          width={380}
          height={380}
        >
          <path
            d="M256 64L96 128V256C96 360 164 456 256 496C348 456 416 360 416 256V128L256 64Z"
            fill="rgba(255, 255, 255, 0.95)"
            style={{ filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.3))" }}
          />

          <path
            d="M160 320L230 250L290 300L360 190"
            stroke="#2563EB"
            strokeWidth="36"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M300 190H360V250"
            stroke="#2563EB"
            strokeWidth="36"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M256 90L120 144V256C120 340 178 420 256 460C334 420 392 340 392 256V144L256 90Z"
            stroke="rgba(37, 99, 235, 0.1)"
            strokeWidth="4"
          />
        </svg>
      </div>
    </div>,
    { ...size },
  );
}
