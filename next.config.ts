import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.7", "192.168.1.5", "192.168.18.82"],
  // Chromium/puppeteer no deben ser empaquetados por el bundler: se cargan
  // como paquetes externos en el runtime de Node (generación de certificados).
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  // Asegurar que el binario de chromium (archivos .br) quede incluido en el
  // bundle de las funciones que generan certificados.
  outputFileTracingIncludes: {
    "/api/certificates/preview": ["./node_modules/@sparticuz/chromium/**"],
    "/api/certificates/generate": ["./node_modules/@sparticuz/chromium/**"],
  },
};

export default nextConfig;
