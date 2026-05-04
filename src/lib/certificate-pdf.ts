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

const C = {
  bg: rgb(0.067, 0.067, 0.067),
  green: rgb(0.224, 1, 0.078),
  greenDim: rgb(0.14, 0.6, 0.05),
  white: rgb(1, 1, 1),
  light: rgb(0.78, 0.78, 0.78),
  mid: rgb(0.55, 0.55, 0.55),
  dark: rgb(0.25, 0.25, 0.25),
  darker: rgb(0.16, 0.16, 0.16),
  subtle: rgb(0.1, 0.1, 0.1),
};

export async function generateCertificatePDF(
  data: CertificateData
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();

  const W = 841.89;
  const H = 595.28;
  const page = doc.addPage([W, H]);
  const cx = W / 2;

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const italic = await doc.embedFont(StandardFonts.HelveticaOblique);

  // ── Background ──
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.bg });

  // ── Outer border (green) ──
  drawRect(page, 16, 16, W - 32, H - 32, 1.5, C.green);

  // ── Inner border (subtle) ──
  drawRect(page, 26, 26, W - 52, H - 52, 0.5, C.dark);

  // ── Corner accents (larger, more prominent) ──
  const cs = 18, co = 20;
  drawCorner(page, co, H - co, cs, "tl");
  drawCorner(page, W - co, H - co, cs, "tr");
  drawCorner(page, co, co, cs, "bl");
  drawCorner(page, W - co, co, cs, "br");

  // ── Decorative diamond accents at mid-edges ──
  drawDiamond(page, cx, H - 18, 4, C.green);
  drawDiamond(page, cx, 18, 4, C.green);
  drawDiamond(page, 18, H / 2, 4, C.green);
  drawDiamond(page, W - 18, H / 2, 4, C.green);

  // ── Subtle background grid pattern ──
  for (let gx = 60; gx < W - 40; gx += 40) {
    page.drawLine({
      start: { x: gx, y: 40 },
      end: { x: gx, y: H - 40 },
      thickness: 0.15,
      color: C.subtle,
    });
  }
  for (let gy = 40; gy < H - 20; gy += 40) {
    page.drawLine({
      start: { x: 40, y: gy },
      end: { x: W - 40, y: gy },
      thickness: 0.15,
      color: C.subtle,
    });
  }

  // ── Layout: use fixed anchor points to fill the page evenly ──
  const TOP = H - 60;
  const BOTTOM = 52;
  const FOOTER_H = 75;
  const footerTop = BOTTOM + FOOTER_H;

  // ── HEADER ZONE (top) ──
  let y = TOP;

  // Logo
  const logoA = "CASTRO BARROS ";
  const logoB = "INTELIGENTE";
  const logoSz = 12;
  const laW = bold.widthOfTextAtSize(logoA, logoSz);
  const lbW = bold.widthOfTextAtSize(logoB, logoSz);
  const logoW = laW + lbW;
  const logoX = cx - logoW / 2;
  page.drawText(logoA, { x: logoX, y, size: logoSz, font: bold, color: C.light });
  page.drawText(logoB, { x: logoX + laW, y, size: logoSz, font: bold, color: C.green });
  page.drawText("\u00AE", { x: logoX + logoW + 2, y: y + 5, size: 6, font: regular, color: C.green });

  // Separator ornament
  y -= 18;
  drawOrnamentLine(page, cx, y, 60, C.dark, C.green);

  // ── CERTIFICADO ──
  y -= 32;
  drawCentered(page, "CERTIFICADO", bold, 32, C.green, cx, y);

  // Subtitle
  y -= 22;
  drawCentered(page, "DE FORMACION PROFESIONAL", regular, 11, C.mid, cx, y);

  // ── BODY ZONE (centered between header and footer) ──
  const bodyTop = y - 20;
  const bodyBottom = footerTop + 20;
  const bodyMid = (bodyTop + bodyBottom) / 2;

  // Pre-calculate description
  const descFull = "Demostrando competencias en " + data.competencyDescription + ".";
  const descLines = wrapText(descFull, regular, 9.5, W - 200);
  const descBlockH = descLines.length * 15;

  // Total body content height
  const bodyContentH = 12 + 20 + 30 + 12 + 22 + 12 + 22 + 18 + 8 + descBlockH;
  //                    certifica + gap + name + underline + gap + completion + gap + course + gap + desc

  const bodyStartY = bodyMid + bodyContentH / 2;

  // Decorative line
  y = bodyStartY + 8;
  page.drawLine({ start: { x: cx - 100, y }, end: { x: cx + 100, y }, thickness: 0.5, color: C.dark });

  // "Se certifica que"
  y = bodyStartY;
  drawCentered(page, "Se certifica que", italic, 12, C.mid, cx, y);

  // Student name
  y -= 38;
  drawCentered(page, data.studentName, bold, 30, C.white, cx, y);

  // Green underline with end dots
  y -= 12;
  const nameW = Math.max(bold.widthOfTextAtSize(data.studentName, 30) + 40, 220);
  page.drawLine({
    start: { x: cx - nameW / 2, y },
    end: { x: cx + nameW / 2, y },
    thickness: 1.5,
    color: C.green,
  });
  drawDiamond(page, cx - nameW / 2, y, 2.5, C.green);
  drawDiamond(page, cx + nameW / 2, y, 2.5, C.green);

  // Completion text
  y -= 26;
  drawCentered(page, "ha completado satisfactoriamente el programa de formacion profesional", regular, 10.5, C.light, cx, y);

  // Course title
  y -= 28;
  drawCentered(page, data.courseTitle, bold, 19, C.green, cx, y);

  // Competency description
  y -= 22;
  for (const line of descLines) {
    drawCentered(page, line, regular, 9.5, C.mid, cx, y);
    y -= 15;
  }

  // ── FOOTER ZONE (anchored to bottom) ──
  // Top divider with ornament
  drawOrnamentLine(page, cx, footerTop, 80, C.dark, C.green);

  // Three-column footer
  const fRow1 = footerTop - 18;
  const fRow2 = fRow1 - 14;
  const fRow3 = fRow2 - 14;
  const fRow4 = fRow3 - 12;

  // Left column: date & issuer
  page.drawText("Fecha de emision", { x: 70, y: fRow1, size: 7.5, font: regular, color: C.mid });
  page.drawText(data.issuedDate, { x: 70, y: fRow2, size: 11, font: bold, color: C.white });
  page.drawText("Departamento Castro Barros", { x: 70, y: fRow3, size: 7.5, font: regular, color: C.mid });
  page.drawText("La Rioja, Argentina", { x: 70, y: fRow4, size: 7.5, font: regular, color: C.mid });

  // Center column: signature
  const sigLineY = fRow1 - 2;
  const sigW = 180;
  page.drawLine({
    start: { x: cx - sigW / 2, y: sigLineY },
    end: { x: cx + sigW / 2, y: sigLineY },
    thickness: 0.5,
    color: C.dark,
  });
  drawCentered(page, "Director/a del Programa", regular, 8, C.mid, cx, sigLineY - 14);
  drawCentered(page, "Castro Barros Inteligente", bold, 9, C.light, cx, sigLineY - 26);

  // Right column: QR code
  const qrSz = 60;
  const qrX = W - 70 - qrSz;
  const qrY = fRow4 - 4;
  try {
    const qrDataUrl = await QRCode.toDataURL(data.verificationUrl, {
      width: 200,
      margin: 1,
      color: { dark: "#39FF14", light: "#111111" },
    });
    const qrBytes = Buffer.from(qrDataUrl.split(",")[1], "base64");
    const qrImg = await doc.embedPng(qrBytes);
    page.drawImage(qrImg, { x: qrX, y: qrY, width: qrSz, height: qrSz });
  } catch {
    drawRect(page, qrX, qrY, qrSz, qrSz, 1, C.green);
  }
  const qrLabel = "Escanea para verificar";
  const qlW = regular.widthOfTextAtSize(qrLabel, 6.5);
  page.drawText(qrLabel, {
    x: qrX + (qrSz - qlW) / 2,
    y: qrY - 10,
    size: 6.5,
    font: regular,
    color: C.mid,
  });

  // ── Bottom bar: verification code ──
  const barY = BOTTOM - 14;
  page.drawLine({
    start: { x: 50, y: barY + 10 },
    end: { x: W - 50, y: barY + 10 },
    thickness: 0.3,
    color: C.darker,
  });
  drawCentered(
    page,
    `${data.certificateCode}  |  ${data.verificationUrl}`,
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
  const t = 1.5;
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
  const t = 1;
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
  drawDiamond(page, cx, y, 3, dotColor);
  drawDiamond(page, cx - halfW, y, 1.5, dotColor);
  drawDiamond(page, cx + halfW, y, 1.5, dotColor);
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
