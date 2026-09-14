import { ImageResponse } from "next/og";

// Ícono para accesos directos / pantalla de inicio: "CBI"
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0B",
          borderRadius: 40,
          fontFamily: "sans-serif",
          fontSize: 84,
          fontWeight: 800,
          letterSpacing: -4,
        }}
      >
        <span style={{ color: "#FFFFFF", textShadow: "0 0 16px rgba(255,255,255,0.35)" }}>
          CB
        </span>
        <span style={{ color: "#39FF14", textShadow: "0 0 22px rgba(57,255,20,0.7)" }}>
          I
        </span>
      </div>
    ),
    { ...size }
  );
}
