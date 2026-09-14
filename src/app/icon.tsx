import { ImageResponse } from "next/og";

// Favicon generado por código: "CBI" — CB en blanco neón, I en verde neón
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 14,
          fontFamily: "sans-serif",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: -1.5,
        }}
      >
        <span style={{ color: "#FFFFFF", textShadow: "0 0 6px rgba(255,255,255,0.35)" }}>
          CB
        </span>
        <span style={{ color: "#39FF14", textShadow: "0 0 8px rgba(57,255,20,0.7)" }}>
          I
        </span>
      </div>
    ),
    { ...size }
  );
}
