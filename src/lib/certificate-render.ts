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
 * Captura el certificado como imagen PNG (2x, nítida) renderizando el HTML/CSS
 * definitivo con Chromium. Base para el PDF y para la descarga como imagen.
 */
export async function renderCertificatePNG(
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
    return (await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: CERT_WIDTH, height: CERT_HEIGHT },
    })) as Uint8Array;
  } finally {
    await browser.close();
  }
}

/**
 * Genera el certificado en PDF. Envuelve la imagen PNG en un PDF de una sola
 * página. Al ser un PDF de imagen (sin fuentes Tipo 3 ni máscaras de
 * transparencia) abre bien en cualquier dispositivo y conserva el diseño exacto.
 */
export async function renderCertificatePDF(
  data: CertificateData
): Promise<Uint8Array> {
  const png = await renderCertificatePNG(data);
  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle(`Certificado ${data.certificateCode}`);
  pdfDoc.setProducer("Castro Barros Inteligente");
  const img = await pdfDoc.embedPng(png);
  const pdfPage = pdfDoc.addPage([CERT_WIDTH, CERT_HEIGHT]);
  pdfPage.drawImage(img, { x: 0, y: 0, width: CERT_WIDTH, height: CERT_HEIGHT });
  return await pdfDoc.save();
}
