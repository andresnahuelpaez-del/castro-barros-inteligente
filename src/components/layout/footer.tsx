import Link from "next/link";

const platformLinks = [
  { href: "/cursos", label: "Cursos" },
  { href: "/preguntas", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
  { href: "/sobre", label: "Sobre nosotros" },
];

const legalLinks = [
  { href: "/terminos", label: "Terminos y condiciones" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/accesibilidad", label: "Accesibilidad" },
];

const institucionalLinks = [
  { href: "#", label: "Gobierno de La Rioja" },
  { href: "#", label: "Ministerio de Educacion" },
  { href: "#", label: "Dip. Marcelo Daniel Del Moral" },
  { href: "#", label: "LINE" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="text-base font-bold sm:text-lg">
              <span className="text-white">Castro Barros</span>{" "}
              <span className="text-neon-green">
                Inteligente<sup className="text-[8px] sm:text-xs">&reg;</sup>
              </span>
            </div>
            <p className="mt-3 text-xs text-foreground-secondary sm:text-sm">
              Capacitacion digital profesional, gratuita y certificada por el
              Departamento Castro Barros.
            </p>
            <p className="mt-3 text-xs text-foreground-muted">
              Departamento Castro Barros
              <br />
              Provincia de La Rioja, Argentina
            </p>
          </div>

          {/* Plataforma */}
          <div>
            <h3 className="mb-3 text-xs font-semibold text-white sm:mb-4 sm:text-sm">Plataforma</h3>
            <ul className="space-y-2">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-foreground-secondary transition-colors hover:text-white sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-xs font-semibold text-white sm:mb-4 sm:text-sm">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-foreground-secondary transition-colors hover:text-white sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="mb-3 text-xs font-semibold text-white sm:mb-4 sm:text-sm">Institucional</h3>
            <ul className="space-y-2">
              {institucionalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-foreground-secondary transition-colors hover:text-white sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-border pt-6 sm:mt-12">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-[10px] text-foreground-muted sm:text-xs">
              &copy; 2026 Castro Barros Inteligente. Todos los derechos
              reservados.
            </p>
            <p className="text-[10px] text-foreground-muted sm:text-xs">
              Hecho con dedicacion en Castro Barros, La Rioja
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
