"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { NeonButton } from "@/components/common/neon-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email o contrasena incorrectos. Intenta de nuevo.");
      setLoading(false);
      return;
    }

    router.push("/app");
    router.refresh();
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <h1 className="mb-2 text-2xl font-bold text-white">Iniciar sesion</h1>
      <p className="mb-6 text-sm text-foreground-secondary">
        Ingresa a tu cuenta para continuar aprendiendo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="password">Contrasena</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contrasena"
            required
            minLength={8}
            className="mt-1"
          />
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <NeonButton type="submit" className="w-full" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </NeonButton>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-foreground-muted">o</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <button
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background-tertiary px-4 py-3 text-sm font-medium text-white transition-colors hover:border-border-bright"
      >
        Continuar con Google
      </button>

      <div className="mt-6 flex flex-col gap-2 text-center text-sm">
        <Link
          href="/recuperar"
          className="text-foreground-secondary hover:text-white"
        >
          Olvidaste tu contrasena?
        </Link>
        <Link href="/registro" className="text-neon-green hover:text-neon-green-soft">
          No tenes cuenta? Registrate
        </Link>
      </div>
    </div>
  );
}
