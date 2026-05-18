/*
 * Home — Página principal Cavallini Assessoria
 * Fluxo: Hero → Stats → Quem Somos → Vídeo
 *        → [Parallax: trabalhador] → Serviços
 *        → CTA laranja → [Parallax: extintor]
 *        → Parceiros → Contato → Footer
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import VideoSection from "@/components/VideoSection";
import ParallaxDivider from "@/components/ParallaxDivider";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useTheme } from "@/contexts/ThemeContext";

// URLs das imagens parallax (webdev storage)
const PARALLAX_WORKER = "/manus-storage/trabalhador-costas-com-logo_49fa1b29.webp";
const PARALLAX_EXTINTOR = "/manus-storage/extintor_bb1e88f3.webp";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: isDark ? "#000000" : "var(--surface-primary)",
      }}
    >
      <Navbar />
      <main>
        {/* 1. Hero — logo grande centralizada + carousel */}
        <HeroSection />

        {/* 2. Stats — 4 métricas de impacto com contador animado */}
        <StatsSection />

        {/* 3. Quem Somos */}
        <AboutSection />

        {/* 4. Vídeo institucional fullwidth */}
        <VideoSection />

        {/* 5. Parallax Divider 1 — Trabalhador com logo (foto real da empresa) */}
        <ParallaxDivider
          image={PARALLAX_WORKER}
          height="460px"
          overlay={0.55}
        />

        {/* 6. Serviços — cards clicáveis */}
        <ServicesSection />

        {/* 7. CTA intermediário — fundo laranja, conversão */}
        <CTASection />

        {/* 8. Parallax Divider 2 — Extintor com logo + frase de impacto */}
        <ParallaxDivider
          image={PARALLAX_EXTINTOR}
          height="400px"
          overlay={0.6}
          text="Segurança não se promete. Se entrega."
        />

        {/* 9. Parceiros */}
        <PartnersSection />

        {/* 10. Contato */}
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
