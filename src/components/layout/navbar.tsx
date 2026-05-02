"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { NeonButton } from "@/components/common/neon-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const publicLinks = [
  { href: "/cursos", label: "Cursos" },
  { href: "/preguntas", label: "Preguntas" },
  { href: "/contacto", label: "Contacto" },
];

const dashboardLinks = [
  { href: "/app", label: "Mi panel" },
  { href: "/app/cursos", label: "Mis cursos" },
  { href: "/app/empleabilidad", label: "Empleabilidad" },
  { href: "/cursos", label: "Explorar" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const isDashboard = pathname.startsWith("/app") || pathname.startsWith("/admin");

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();
  }, [supabase, pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  }

  const navLinks = isDashboard ? dashboardLinks : publicLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={user ? "/app" : "/"}
          className="flex items-center gap-1 text-base font-bold sm:text-lg"
        >
          <span className="text-white">CB</span>
          <span className="text-neon-green text-glow-green">
            Inteligente<sup className="text-[8px] sm:text-xs">&reg;</sup>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors hover:text-white",
                pathname === link.href
                  ? "text-white font-medium"
                  : "text-foreground-secondary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA / User menu */}
        <div className="hidden md:block">
          {loading ? (
            <div className="h-9 w-20" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<button className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background-tertiary transition-colors hover:border-neon-green" />}
              >
                <User className="h-4 w-4 text-foreground-secondary" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 border-border bg-card"
              >
                <div className="px-2 py-1.5">
                  <p className="text-xs text-foreground-muted truncate">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/app" className="cursor-pointer" />}>
                  Mi panel
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/app/perfil" className="cursor-pointer" />}>
                  Mi perfil
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/app/certificados" className="cursor-pointer" />}>
                  Certificados
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/registro">
              <NeonButton size="sm">Inscribite</NeonButton>
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[280px] transform bg-background-secondary border-l border-border transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-end px-4">
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="flex flex-col gap-1 px-4 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-4 py-3 text-base transition-colors",
                pathname === link.href
                  ? "bg-neon-green/10 text-neon-green font-medium"
                  : "text-foreground-secondary hover:bg-background-tertiary hover:text-white"
              )}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {!loading && (
            <div className="mt-4 border-t border-border pt-4 space-y-1">
              {user ? (
                <>
                  <Link
                    href="/app/perfil"
                    className="block rounded-lg px-4 py-3 text-base text-foreground-secondary hover:bg-background-tertiary hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    Mi perfil
                  </Link>
                  <Link
                    href="/app/certificados"
                    className="block rounded-lg px-4 py-3 text-base text-foreground-secondary hover:bg-background-tertiary hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    Certificados
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="w-full rounded-lg px-4 py-3 text-left text-base text-destructive hover:bg-destructive/10"
                  >
                    Cerrar sesion
                  </button>
                </>
              ) : (
                <Link href="/registro" onClick={() => setMobileOpen(false)}>
                  <NeonButton className="mt-2 w-full">Inscribite gratis</NeonButton>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
