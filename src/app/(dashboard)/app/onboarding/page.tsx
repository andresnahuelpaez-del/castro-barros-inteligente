import type { Metadata } from "next";
import { OnboardingWizard } from "./onboarding-wizard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Completar perfil",
};

export default function OnboardingPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        <OnboardingWizard />
      </div>
    </div>
  );
}
