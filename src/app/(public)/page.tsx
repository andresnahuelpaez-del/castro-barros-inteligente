import { HeroSection } from "@/components/hero/hero-section";
import { LogosCarousel } from "@/components/landing/logos-carousel";
import { DiputadoSection } from "@/components/landing/diputado-section";
import { WhySection } from "@/components/landing/why-section";
import { CoursesSection } from "@/components/landing/courses-section";
import { ToolsSection } from "@/components/landing/tools-section";
import { DocentesSection } from "@/components/landing/docentes-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { AudienceSection } from "@/components/landing/audience-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CertificateSection } from "@/components/landing/certificate-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogosCarousel />
      <DiputadoSection />
      <WhySection />
      <CoursesSection />
      <ToolsSection />
      <DocentesSection />
      <HowItWorksSection />
      <MetricsSection />
      <AudienceSection />
      <TestimonialsSection />
      <CertificateSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
