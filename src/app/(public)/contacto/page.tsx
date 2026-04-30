import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NeonButton } from "@/components/common/neon-button";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta al equipo de Castro Barros Inteligente.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Contacto</h1>
        <p className="mt-4 text-lg text-foreground-secondary">
          Tenes alguna consulta? Escribinos y te respondemos a la brevedad.
        </p>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        {/* Form */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <form className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" placeholder="Tu nombre" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="subject">Asunto</Label>
              <Input
                id="subject"
                placeholder="Sobre que queres consultar?"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                placeholder="Escribi tu mensaje..."
                rows={5}
                className="mt-1"
              />
            </div>
            <NeonButton type="submit" className="w-full">
              Enviar mensaje
            </NeonButton>
          </form>
        </div>

        {/* Contact info */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-green/10">
              <MapPin className="h-6 w-6 text-neon-green" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Direccion</h3>
              <p className="mt-1 text-sm text-foreground-secondary">
                Departamento Castro Barros
                <br />
                Provincia de La Rioja, Argentina
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-green/10">
              <Mail className="h-6 w-6 text-neon-green" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Email</h3>
              <p className="mt-1 text-sm text-foreground-secondary">
                contacto@castrobarrosinteligente.gob.ar
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-green/10">
              <Phone className="h-6 w-6 text-neon-green" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Telefono</h3>
              <p className="mt-1 text-sm text-foreground-secondary">
                A definir
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
