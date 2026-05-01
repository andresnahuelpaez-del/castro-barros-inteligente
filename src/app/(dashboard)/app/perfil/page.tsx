import type { Metadata } from "next";
import { ProfileForm } from "./profile-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mi perfil",
};

export default function PerfilPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">Mi perfil</h1>
      <p className="mt-2 text-foreground-secondary">
        Edita tus datos personales. Esta informacion aparece en tu certificado.
      </p>
      <div className="mt-8">
        <ProfileForm />
      </div>
    </div>
  );
}
