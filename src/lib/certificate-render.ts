import puppeteer, { type Browser } from "puppeteer-core";
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";
import {
  buildCertificateHTML,
  CERT_WIDTH,
  CERT_HEIGHT,
} from "./certificate-html";

export interface CertificateData {
  studentName: string;
  courseTitle: string;
  competencyDescription: string;
  issuedDate: string;
  verificationHash: string;
  verificationUrl: string;
  certificateCode: string;
}

function localChromePath(): string {
  switch (process.platform) {
    case "win32":
      return "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    case "darwin":
      return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    default:
      return "/usr/bin/google-chrome";
  }
}

async function getBrowser(): Promise<Browser> {
  // En Vercel/Lambda (Linux serverless) usamos el chromium empaquetado.
  const useServerless =
    !process.env.CHROME_PATH &&
    (!!process.env.VERCEL ||
      !!process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.platform === "linux");

  if (useServerless) {
    const chromium = (await import("@sparticuz/chromium")).default;
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }

  // Desarrollo local: Chrome instalado en el sistema.
  return puppeteer.launch({
    executablePath: process.env.CHROME_PATH || localChromePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
}

/**
 * Genera el certificado en PDF renderizando el HTML/CSS definitivo con Chromium.
 * Es idéntico al diseño aprobado (degradados, glow, panel glass, etc.).
 */
export async function renderCertificatePDF(
  data: CertificateData
): Promise<Uint8Array> {
  const qrDataUrl = await QRCode.toDataURL(data.verificationUrl, {
    width: 300,
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#39FF14", light: "#00000000" },
  });

  const html = buildCertificateHTML({
    studentName: data.studentName,
    courseTitle: data.courseTitle,
    competency: data.competencyDescription,
    issuedDate: data.issuedDate,
    code: data.certificateCode,
    verificationUrl: data.verificationUrl.replace(/^https?:\/\//, ""),
    qrDataUrl,
  });

  const browser = await getBrowser();
  try {
    const page = await browser.newPage();
    // deviceScaleFactor 2 => captura a 2x para nitidez.
    await page.setViewport({
      width: CERT_WIDTH,
      height: CERT_HEIGHT,
      deviceScaleFactor: 2,
    });
    await page.setContent(html, { waitUntil: "load" });
    // Asegurar que la fuente embebida esté lista antes de capturar
    await page.evaluate(async () => {
      await (document as unknown as { fonts: { ready: Promise<unknown> } }).fonts
        .ready;
    });

    // Capturamos el diseño como imagen y armamos un PDF de una sola imagen.
    // Esto evita las fuentes Tipo 3 y las máscaras de transparencia que generaba
    // Chromium con page.pdf(), que los visores de PDF móviles renderizan mal
    // (el glow neón salía como bloques verdes). Un PDF de imagen abre bien en
    // cualquier dispositivo y conserva el diseño exacto.
    const png = (await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: CERT_WIDTH, height: CERT_HEIGHT },
    })) as Uint8Array;

    const pdfDoc = await PDFDocument.create();
    pdfDoc.setTitle(`Certificado ${data.certificateCode}`);
    pdfDoc.setProducer("Castro Barros Inteligente");
    const img = await pdfDoc.embedPng(png);
    const pdfPage = pdfDoc.addPage([CERT_WIDTH, CERT_HEIGHT]);
    pdfPage.drawImage(img, {
      x: 0,
      y: 0,
      width: CERT_WIDTH,
      height: CERT_HEIGHT,
    });
    return await pdfDoc.save();
  } finally {
    await browser.close();
  }
}
