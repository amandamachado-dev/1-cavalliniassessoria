/*
 * Home — Página principal Cavallini Assessoria
 * Fluxo: Hero → Stats → Serviços → Portfólio
 *        → CTA laranja → [Parallax: extintor]
 *        → Quem Somos → Parceiros → Vídeo → Contato → Footer
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import VideoSection from "@/components/VideoSection";
import ParallaxDivider from "@/components/ParallaxDivider";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useTheme } from "@/contexts/ThemeContext";

// URL da imagem parallax (webdev storage)
const PARALLAX_EXTINTOR = "/manus-storage/extintor-cavallini-logo_e6bafab7.png";

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

        {/* 3. Serviços — cards clicáveis */}
        <ServicesSection />

        {/* 5. Portfólio — cases de sucesso (SEO: prova social + palavras-chave de clientes) */}
        <PortfolioSection />

        {/* 5. CTA intermediário — fundo laranja, conversão */}
        <CTASection />

        {/* 6. Parallax Divider — Extintor com logo + frase de impacto */}
        <ParallaxDivider
          image={PARALLAX_EXTINTOR}
          height="400px"
          overlay={0.6}
          text="Segurança não se promete. Se entrega."
        />

        {/* 7. Quem Somos — movido para antes dos parceiros */}
        <AboutSection />

        {/* 8. Parceiros */}
        <PartnersSection />

        {/* 9. Vídeo institucional fullwidth — autoplay por scroll, acima do contato */}
        <VideoSection />

        {/* 10. Contato */}
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
