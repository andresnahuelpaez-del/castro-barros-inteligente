import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";

interface CertificateData {
  studentName: string;
  courseTitle: string;
  competencyDescription: string;
  issuedDate: string;
  verificationHash: string;
  verificationUrl: string;
  certificateCode: string;
}

// Color palette matching the platform's dark neon aesthetic
const C = {
  bg: rgb(0.04, 0.04, 0.06),
  bgCard: rgb(0.08, 0.08, 0.1),
  green: rgb(0.224, 1, 0.078),
  greenSoft: rgb(0.18, 0.75, 0.06),
  greenDim: rgb(0.12, 0.45, 0.04),
  cyan: rgb(0.024, 0.714, 0.831),
  white: rgb(1, 1, 1),
  light: rgb(0.85, 0.85, 0.88),
  mid: rgb(0.55, 0.55, 0.6),
  dark: rgb(0.22, 0.22, 0.25),
  darker: rgb(0.12, 0.12, 0.14),
};

export async function generateCertificatePDF(
  data: CertificateData
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();

  // A4 landscape
  const W = 841.89;
  const H = 595.28;
  const page = doc.addPage([W, H]);
  const cx = W / 2;

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const italic = await doc.embedFont(StandardFonts.HelveticaOblique);

  // ── Background ──
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.bg });

  // ── Subtle radial glow effect (simulated with rectangles) ──
  page.drawRectangle({
    x: W * 0.2,
    y: H * 0.3,
    width: W * 0.6,
    height: H * 0.5,
    color: rgb(0.05, 0.12, 0.05),
    opacity: 0.3,
  });

  // ── Outer border (double line effect) ──
  drawRect(page, 20, 20, W - 40, H - 40, 2, C.green);
  drawRect(page, 28, 28, W - 56, H - 56, 0.5, C.dark);

  // ── Corner accents ──
  const cs = 24, co = 20;
  drawCorner(page, co, H - co, cs, "tl");
  drawCorner(page, W - co, H - co, cs, "tr");
  drawCorner(page, co, co, cs, "bl");
  drawCorner(page, W - co, co, cs, "br");

  // ── Diamond accents at edges ──
  drawDiamond(page, cx, H - 20, 5, C.green);
  drawDiamond(page, cx, 20, 5, C.green);
  drawDiamond(page, 20, H / 2, 5, C.green);
  drawDiamond(page, W - 20, H / 2, 5, C.green);

  // ── Subtle dot grid background ──
  for (let gx = 60; gx < W - 40; gx += 50) {
    for (let gy = 50; gy < H - 40; gy += 50) {
      page.drawCircle({ x: gx, y: gy, size: 0.4, color: C.darker });
    }
  }

  // ══════════════════════════════════════════════════════
  // LAYOUT — proportioned with clear visual hierarchy
  // ══════════════════════════════════════════════════════

  let y = H - 58;

  // ── HEADER: Logo ──
  const logoA = "CASTRO BARROS";
  const logoB = " INTELIGENTE";
  const logoSz = 11;
  const laW = bold.widthOfTextAtSize(logoA, logoSz);
  const lbW = bold.widthOfTextAtSize(logoB, logoSz);
  const logoTotalW = laW + lbW;
  const logoX = cx - logoTotalW / 2;
  page.drawText(logoA, { x: logoX, y, size: logoSz, font: bold, color: C.light });
  page.drawText(logoB, { x: logoX + laW, y, size: logoSz, font: bold, color: C.green });

  // Tagline
  y -= 16;
  drawCentered(page, "Programa de Capacitación Digital con IA", regular, 8, C.mid, cx, y);

  // ── Ornament separator ──
  y -= 20;
  drawOrnamentLine(page, cx, y, 100, C.dark, C.green);

  // ── TITLE: CERTIFICADO ──
  y -= 42;
  drawCentered(page, "CERTIFICADO", bold, 38, C.green, cx, y);

  y -= 20;
  drawCentered(page, "DE FORMACIÓN PROFESIONAL", regular, 12, C.mid, cx, y);

  // ── BODY ──
  y -= 42;
  drawCentered(page, "Se certifica que", italic, 11, C.mid, cx, y);

  // Student name — large and prominent
  y -= 46;
  const nameFontSize = Math.min(32, 32 * (420 / Math.max(bold.widthOfTextAtSize(data.studentName, 32), 420)));
  drawCentered(page, data.studentName, bold, nameFontSize, C.white, cx, y);

  // Green underline under the name
  y -= 14;
  const nameWidth = Math.max(bold.widthOfTextAtSize(data.studentName, nameFontSize) + 60, 280);
  page.drawLine({
    start: { x: cx - nameWidth / 2, y },
    end: { x: cx + nameWidth / 2, y },
    thickness: 2,
    color: C.green,
  });
  // End dots
  drawDiamond(page, cx - nameWidth / 2, y, 3, C.green);
  drawDiamond(page, cx + nameWidth / 2, y, 3, C.green);

  // Completion text
  y -= 30;
  drawCentered(
    page,
    "ha completado satisfactoriamente el programa de formación profesional",
    regular,
    10.5,
    C.light,
    cx,
    y
  );

  // Course title — prominent in green
  y -= 34;
  const courseFontSize = Math.min(22, 22 * (500 / Math.max(bold.widthOfTextAtSize(data.courseTitle, 22), 500)));
  drawCentered(page, `« ${data.courseTitle} »`, bold, courseFontSize, C.green, cx, y);

  // Competency description
  y -= 28;
  const descFull = "Demostrando competencias en " + data.competencyDescription + ".";
  const descLines = wrapText(descFull, regular, 9.5, W - 240);
  for (const line of descLines) {
    drawCentered(page, line, regular, 9.5, C.mid, cx, y);
    y -= 14;
  }

  // ── FOOTER SECTION ──
  const footerDividerY = 120;

  // Divider ornament
  drawOrnamentLine(page, cx, footerDividerY, 120, C.dark, C.green);

  // Three columns: Date | Signature | QR
  const fRow1 = footerDividerY - 22;
  const fRow2 = fRow1 - 16;
  const fRow3 = fRow2 - 14;

  // Left: Date & issuer
  page.drawText("Fecha de emisión", { x: 70, y: fRow1, size: 7, font: regular, color: C.mid });
  page.drawText(data.issuedDate, { x: 70, y: fRow2, size: 12, font: bold, color: C.white });
  page.drawText("Departamento Castro Barros · La Rioja, Argentina", {
    x: 70,
    y: fRow3,
    size: 7.5,
    font: regular,
    color: C.mid,
  });

  // Center: Signature line
  const sigY = fRow1;
  const sigW = 180;
  page.drawLine({
    start: { x: cx - sigW / 2, y: sigY },
    end: { x: cx + sigW / 2, y: sigY },
    thickness: 0.5,
    color: C.dark,
  });
  drawCentered(page, "Director/a del Programa", regular, 7.5, C.mid, cx, sigY - 14);
  drawCentered(page, "Castro Barros Inteligente", bold, 9, C.light, cx, sigY - 28);

  // Right: QR code
  const qrSz = 62;
  const qrX = W - 75 - qrSz;
  const qrY = fRow3 - 8;
  try {
    const qrDataUrl = await QRCode.toDataURL(data.verificationUrl, {
      width: 200,
      margin: 1,
      color: { dark: "#39FF14", light: "#0A0A0F" },
    });
    const qrBytes = Buffer.from(qrDataUrl.split(",")[1], "base64");
    const qrImg = await doc.embedPng(qrBytes);
    page.drawImage(qrImg, { x: qrX, y: qrY, width: qrSz, height: qrSz });
  } catch {
    drawRect(page, qrX, qrY, qrSz, qrSz, 1, C.green);
  }
  const qrLabel = "Verificar certificado";
  const qlW = regular.widthOfTextAtSize(qrLabel, 6.5);
  page.drawText(qrLabel, {
    x: qrX + (qrSz - qlW) / 2,
    y: qrY - 11,
    size: 6.5,
    font: regular,
    color: C.mid,
  });

  // ── Bottom verification bar ──
  const barY = 36;
  page.drawLine({
    start: { x: 50, y: barY + 8 },
    end: { x: W - 50, y: barY + 8 },
    thickness: 0.3,
    color: C.darker,
  });
  drawCentered(
    page,
    `${data.certificateCode}  ·  ${data.verificationUrl}`,
    regular,
    6.5,
    C.dark,
    cx,
    barY
  );

  return doc.save();
}

// ── Helpers ──

function drawCentered(
  page: PDFPage,
  text: string,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>,
  cx: number,
  y: number
) {
  page.drawText(text, {
    x: cx - font.widthOfTextAtSize(text, size) / 2,
    y,
    size,
    font,
    color,
  });
}

function drawRect(
  page: PDFPage,
  x: number,
  y: number,
  w: number,
  h: number,
  t: number,
  color: ReturnType<typeof rgb>
) {
  page.drawLine({ start: { x, y: y + h }, end: { x: x + w, y: y + h }, thickness: t, color });
  page.drawLine({ start: { x, y }, end: { x: x + w, y }, thickness: t, color });
  page.drawLine({ start: { x, y }, end: { x, y: y + h }, thickness: t, color });
  page.drawLine({ start: { x: x + w, y }, end: { x: x + w, y: y + h }, thickness: t, color });
}

function drawCorner(
  page: PDFPage,
  x: number,
  y: number,
  s: number,
  pos: "tl" | "tr" | "bl" | "br"
) {
  const t = 2;
  const c = C.green;
  const dx = pos === "tl" || pos === "bl" ? s : -s;
  const dy = pos === "tl" || pos === "tr" ? -s : s;
  page.drawLine({ start: { x, y }, end: { x: x + dx, y }, thickness: t, color: c });
  page.drawLine({ start: { x, y }, end: { x, y: y + dy }, thickness: t, color: c });
}

function drawDiamond(
  page: PDFPage,
  cx: number,
  cy: number,
  r: number,
  color: ReturnType<typeof rgb>
) {
  const t = 1.2;
  page.drawLine({ start: { x: cx, y: cy + r }, end: { x: cx + r, y: cy }, thickness: t, color });
  page.drawLine({ start: { x: cx + r, y: cy }, end: { x: cx, y: cy - r }, thickness: t, color });
  page.drawLine({ start: { x: cx, y: cy - r }, end: { x: cx - r, y: cy }, thickness: t, color });
  page.drawLine({ start: { x: cx - r, y: cy }, end: { x: cx, y: cy + r }, thickness: t, color });
}

function drawOrnamentLine(
  page: PDFPage,
  cx: number,
  y: number,
  halfW: number,
  lineColor: ReturnType<typeof rgb>,
  dotColor: ReturnType<typeof rgb>
) {
  page.drawLine({ start: { x: cx - halfW, y }, end: { x: cx + halfW, y }, thickness: 0.5, color: lineColor });
  drawDiamond(page, cx, y, 3.5, dotColor);
  drawDiamond(page, cx - halfW, y, 2, dotColor);
  drawDiamond(page, cx + halfW, y, 2, dotColor);
}

function wrapText(text: string, font: PDFFont, size: number, maxW: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (font.widthOfTextAtSize(test, size) > maxW && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}
