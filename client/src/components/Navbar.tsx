/*
 * Navbar — Glassmorphism header with smooth scroll navigation
 * Design: Transparent on top, blur+dark on scroll
 */
import { useState } from "react";
import { ASSETS, NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";
import { useNavbarScroll } from "@/hooks/useScrollReveal";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const scrolled = useNavbarScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document.body.style.overflow = "";
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const offset = el.offsetTop - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? "hidden" : "";
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/75 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 py-3 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center transition-transform hover:scale-105"
            aria-label="Cavallini Assessoria - Voltar ao topo"
          >
            <img
              src={ASSETS.logoBrancoC}
              alt="Cavallini Assessoria"
              className="h-10 md:h-[50px] w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              width={160}
              height={50}
              loading="eager"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[13px] font-mono font-bold uppercase tracking-[0.15em] text-white hover:text-[#d93e15] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#d93e15] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#d93e15]" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#d93e15] border border-[#d93e15]/30 px-4 py-2 rounded-lg hover:bg-[#d93e15] hover:text-white transition-all duration-300"
            aria-label="Falar com especialista via WhatsApp"
          >
            <Phone className="w-3.5 h-3.5" />
            S.O.S Incêndio
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 hover:text-[#d93e15] transition-colors"
            onClick={toggleMobile}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex flex-col justify-start pt-24 items-center transition-all duration-500 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <button
          className="absolute top-6 right-6 text-white hover:text-[#d93e15] text-3xl transition-colors"
          onClick={toggleMobile}
          aria-label="Fechar menu"
        >
          <X className="w-8 h-8" />
        </button>

        <nav className="flex flex-col items-center gap-8 text-center">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xl font-display font-medium text-white hover:text-[#d93e15] transition-all duration-300"
              style={{
                transitionDelay: mobileOpen ? `${i * 80}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div
          className="absolute bottom-12 flex flex-col items-center gap-6 w-full px-8 transition-all duration-500"
          style={{
            transitionDelay: mobileOpen ? "400ms" : "0ms",
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <p className="text-stone-500 font-mono text-[10px] uppercase tracking-widest text-center">
            Atendimento 24h
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-[#d93e15] text-white text-xs font-mono font-bold px-6 py-4 rounded-xl uppercase tracking-widest shadow-[0_0_20px_rgba(217,62,21,0.3)]"
          >
            <Phone className="w-5 h-5" />
            Falar com Especialista
          </a>
        </div>
      </div>
    </>
  );
}
