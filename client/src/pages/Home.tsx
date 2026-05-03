/*
 * Home — Main landing page composing all sections
 * Theme-aware: bg adapts to light/dark mode
 */
import { useTheme } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VideoSection from "@/components/VideoSection";
import ServicesSection from "@/components/ServicesSection";
import PartnersSection from "@/components/PartnersSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: isDark ? "#000000" : "var(--surface-primary)",
      }}
    >
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <VideoSection />
        <ServicesSection />
        <PartnersSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
