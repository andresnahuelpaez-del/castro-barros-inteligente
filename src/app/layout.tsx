import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "Castro Barros Inteligente | Capacitación Digital Gratuita con IA",
    template: "%s | Castro Barros Inteligente",
  },
  description:
    "Capacitación digital profesional, gratuita y certificada por el Departamento Castro Barros, La Rioja. Cursos intensivos con Inteligencia Artificial: Programación, Marketing Digital, Diseño Web, E-commerce y más.",
  keywords: [
    "Castro Barros",
    "capacitación digital",
    "cursos gratuitos",
    "inteligencia artificial",
    "La Rioja",
    "Argentina",
    "certificación oficial",
  ],
  authors: [{ name: "Departamento Castro Barros" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Castro Barros Inteligente",
    title: "Castro Barros Inteligente | Capacitación Digital Gratuita con IA",
    description:
      "Capacitación digital profesional, gratuita y certificada. Cursos intensivos con IA para construir tu futuro digital.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Castro Barros Inteligente",
    description:
      "Capacitación digital profesional, gratuita y certificada con IA.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased" suppressHydrationWarning>
        <div className="relative w-full overflow-x-hidden">
          <TooltipProvider>{children}</TooltipProvider>
        </div>
      </body>
    </html>
  );
}
