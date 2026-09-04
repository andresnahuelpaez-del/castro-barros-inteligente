import { ImageResponse } from "next/og";

export const alt = "Castro Barros Inteligente";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GREEN = "#39FF14";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(900px 500px at 20% 0%, rgba(168,85,247,0.20), transparent 60%), radial-gradient(1000px 620px at 85% 110%, rgba(57,255,20,0.18), transparent 60%), #050505",
          border: "1px solid rgba(57,255,20,0.12)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 132,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1,
              color: "#FFFFFF",
              textShadow: "0 4px 40px rgba(255,255,255,0.15)",
            }}
          >
            Castro Barros
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginTop: 8,
              fontSize: 132,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1,
              color: GREEN,
              textShadow: `0 0 40px rgba(57,255,20,0.65), 0 0 90px rgba(57,255,20,0.35)`,
            }}
          >
            Inteligente
            <span style={{ fontSize: 40, marginTop: 12, marginLeft: 6 }}>®</span>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 220,
            height: 4,
            marginTop: 44,
            borderRadius: 999,
            background: GREEN,
            boxShadow: `0 0 24px ${GREEN}`,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            marginTop: 30,
            fontSize: 34,
            letterSpacing: 1,
            color: "#C9C9C9",
          }}
        >
          Capacitación digital gratuita con Inteligencia Artificial
        </div>
      </div>
    ),
    size
  );
}
