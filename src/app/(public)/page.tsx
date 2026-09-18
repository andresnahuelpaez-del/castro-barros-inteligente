import { HeroSection } from "@/components/hero/hero-section";
import { LogosCarousel } from "@/components/landing/logos-carousel";
import { DiputadoSection } from "@/components/landing/diputado-section";
import { WhySection } from "@/components/landing/why-section";
import { CoursesSection } from "@/components/landing/courses-section";
import { ToolsSection } from "@/components/landing/tools-section";
import { DocentesSection } from "@/components/landing/docentes-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { AudienceSection } from "@/components/landing/audience-section";
import { EmployabilitySection } from "@/components/landing/employability-section";
import { CvSection } from "@/components/landing/cv-section";
import { EntrevistasSection } from "@/components/landing/entrevistas-section";
import { CrearEmpresaSection } from "@/components/landing/crear-empresa-section";
import { CertificateSection } from "@/components/landing/certificate-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { SectionDivider } from "@/components/common/section-divider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogosCarousel />
      <DiputadoSection />
      <SectionDivider color="green" />
      <WhySection />
      <AudienceSection />
      <CoursesSection />
      <CrearEmpresaSection />
      <SectionDivider color="mixed" />
      <HowItWorksSection />
      <ToolsSection />
      <DocentesSection />
      <SectionDivider color="violet" />
      <CertificateSection />
      <EmployabilitySection />
      <CvSection />
      <EntrevistasSection />
      <SectionDivider color="cyan" />
      <FaqSection />
      <CtaSection />
    </>
  );
}
