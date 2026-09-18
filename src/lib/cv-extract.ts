// Extraccion de texto de CV desde PDF / DOCX / TXT (server-side).
// PDF: unpdf (sin dependencias nativas, corre en serverless).
// DOCX: mammoth. TXT: lectura directa.

export async function extractCvText(
  buffer: ArrayBuffer,
  fileName: string
): Promise<string> {
  const lower = fileName.toLowerCase();

  if (lower.endsWith(".pdf")) {
    const { extractText, getDocumentProxy } = await import("unpdf");
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text } = await extractText(pdf, { mergePages: true });
    return Array.isArray(text) ? text.join("\n") : text;
  }

  if (lower.endsWith(".docx")) {
    const mammoth = (await import("mammoth")).default;
    const { value } = await mammoth.extractRawText({
      buffer: Buffer.from(buffer),
    });
    return value;
  }

  // TXT y demas: texto plano.
  return new TextDecoder().decode(buffer);
}
