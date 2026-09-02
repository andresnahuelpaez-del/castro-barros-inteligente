import { ImageResponse } from "next/og";

export const alt =
  "Castro Barros Inteligente — Capacitación digital gratuita con Inteligencia Artificial";
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
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(1000px 600px at 15% -10%, rgba(168,85,247,0.22), transparent), radial-gradient(900px 600px at 100% 120%, rgba(57,255,20,0.18), transparent), #0A0A0A",
          color: "#FFFFFF",
        }}
      >
        {/* Top: brand */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: GREEN,
              marginRight: 16,
              boxShadow: `0 0 24px ${GREEN}`,
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              color: "#C9C9C9",
            }}
          >
            CASTRO BARROS INTELIGENTE®
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.05 }}>
            Capacitación digital
          </div>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.1 }}>
            <span style={{ color: GREEN }}>gratuita</span>
            <span>&nbsp;con&nbsp;</span>
            <span style={{ color: GREEN }}>IA</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 32,
              color: "#B4B4B4",
            }}
          >
            11 cursos profesionales · Certificación oficial · La Rioja
          </div>
        </div>

        {/* Bottom: badges */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {["100% gratuito", "Con Inteligencia Artificial", "Certificado válido"].map(
            (label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 20,
                  padding: "14px 26px",
                  fontSize: 26,
                  borderRadius: 999,
                  border: "1px solid rgba(57,255,20,0.35)",
                  background: "rgba(57,255,20,0.08)",
                  color: GREEN,
                }}
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    ),
    size
  );
}
