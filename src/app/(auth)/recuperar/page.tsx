"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { NeonButton } from "@/components/common/neon-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <h1 className="mb-4 text-2xl font-bold text-white">Revisa tu email</h1>
        <p className="text-foreground-secondary">
          Te enviamos un enlace para restablecer tu contrasena a{" "}
          <span className="text-white">{email}</span>.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block text-sm text-neon-green hover:text-neon-green-soft"
        >
          Volver al inicio de sesion
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <h1 className="mb-2 text-2xl font-bold text-white">Recuperar contrasena</h1>
      <p className="mb-6 text-sm text-foreground-secondary">
        Ingresa tu email y te enviaremos un enlace para restablecer tu
        contrasena.
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
        {error && <p className="text-sm text-destructive">{error}</p>}
        <NeonButton type="submit" className="w-full" disabled={loading}>
          {loading ? "Enviando..." : "Enviar enlace"}
        </NeonButton>
      </form>
      <p className="mt-6 text-center text-sm text-foreground-secondary">
        <Link href="/login" className="text-neon-green hover:text-neon-green-soft">
          Volver al inicio de sesion
        </Link>
      </p>
    </div>
  );
}
