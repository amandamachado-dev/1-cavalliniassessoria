/*
 * Home — Main landing page composing all sections
 * Design: Cinematográfico Noir — Cavallini Assessoria
 */
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
  return (
    <div className="min-h-screen bg-black text-white">
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
