"use client";

import { useEffect, useState } from "react";
import { Download, Image as ImageIcon, Link2, Check, Share2 } from "lucide-react";

// Marca simple "in" para el botón de LinkedIn (ícono propio, no el logo oficial).
function InMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="#0b0b0c"
        fontFamily="system-ui, sans-serif"
      >
        in
      </text>
    </svg>
  );
}

interface CertificateActionsProps {
  studentName: string;
  courseTitle: string;
  competency: string;
  code: string;
}

export function CertificateActions({
  studentName,
  courseTitle,
  competency,
  code,
}: CertificateActionsProps) {
  const [verifyUrl, setVerifyUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // La URL pública de este certificado es la propia página de verificación.
  useEffect(() => {
    setVerifyUrl(window.location.href);
  }, []);

  // Sin download=1 => se abre inline: la pestaña MUESTRA el certificado y el
  // navegador ofrece guardarlo (no una pestaña en blanco con prompt de descarga).
  const params = new URLSearchParams({
    name: studentName,
    title: courseTitle,
    competency,
    code,
  });
  const pdfUrl = `/api/certificates/preview?${params.toString()}`;
  const imgUrl = `/api/certificates/preview?${params.toString()}&format=png`;

  const linkedInUrl =
    "https://www.linkedin.com/profile/add?" +
    new URLSearchParams({
      startTask: "CERTIFICATION_NAME",
      name: courseTitle,
      organizationName: "Castro Barros Inteligente",
      certUrl: verifyUrl,
      certId: code,
    }).toString();

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Verificá mi certificado de "${courseTitle}" - Castro Barros Inteligente: ${verifyUrl}`
  )}`;

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Certificado - ${courseTitle}`,
          text: `Certificado de ${studentName} - Castro Barros Inteligente`,
          url: verifyUrl,
        });
        return;
      } catch {
        // el usuario canceló; caemos a copiar
      }
    }
    handleCopy();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(verifyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignorar
    }
  }

  return (
    <div className="space-y-3 border-t border-border p-4 sm:p-5">
      {/* Descargas */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-neon-green px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-neon-green/90"
        >
          <Download className="h-4 w-4" />
          PDF
        </a>
        <a
          href={imgUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-neon-green/40 bg-neon-green/5 px-4 py-3 text-sm font-semibold text-neon-green transition-colors hover:bg-neon-green/10"
        >
          <ImageIcon className="h-4 w-4" />
          Imagen HD
        </a>
      </div>

      {/* Compartir */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-medium text-white transition-colors hover:bg-background-tertiary"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-neon-green" />
              Copiado
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              Compartir
            </>
          )}
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-medium text-white transition-colors hover:bg-background-tertiary"
        >
          <Link2 className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-[#0A66C2]/50 bg-[#0A66C2]/10 px-3 py-2.5 text-xs font-medium text-[#4aa3f0] transition-colors hover:bg-[#0A66C2]/20"
        >
          <InMark className="h-4 w-4" />
          LinkedIn
        </a>
      </div>
    </div>
  );
}
