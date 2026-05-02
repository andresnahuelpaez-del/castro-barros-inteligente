import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "Castro Barros Inteligente | Capacitacion Digital Gratuita con IA",
    template: "%s | Castro Barros Inteligente",
  },
  description:
    "Capacitacion digital profesional, gratuita y certificada por el Departamento Castro Barros, La Rioja. Cursos intensivos con Inteligencia Artificial: Programacion, Marketing Digital, Diseno Web, E-commerce y mas.",
  keywords: [
    "Castro Barros",
    "capacitacion digital",
    "cursos gratuitos",
    "inteligencia artificial",
    "La Rioja",
    "Argentina",
    "certificacion oficial",
  ],
  authors: [{ name: "Departamento Castro Barros" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Castro Barros Inteligente",
    title: "Castro Barros Inteligente | Capacitacion Digital Gratuita con IA",
    description:
      "Capacitacion digital profesional, gratuita y certificada. Cursos intensivos con IA para construir tu futuro digital.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Castro Barros Inteligente",
    description:
      "Capacitacion digital profesional, gratuita y certificada con IA.",
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
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
