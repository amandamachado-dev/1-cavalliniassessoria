/*
 * Navbar — Glassmorphism header with theme toggle
 * Design: Transparent on top, blur on scroll. Theme-aware colors.
 * Hero always dark, so navbar is always light-text when at top.
 */
import { useState } from "react";
import { ASSETS, NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";
import { useNavbarScroll } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";
import { Menu, X, Phone, Sun, Moon } from "lucide-react";
import { useLocation } from "wouter";

export default function Navbar() {
  const scrolled = useNavbarScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location, setLocation] = useLocation();

  const isHome = location === "/";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document.body.style.overflow = "";

    if (!isHome) {
      // Navigate to home first, then scroll
      setLocation("/");
      setTimeout(() => {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
        }
      }, 300);
    } else {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      }
    }
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? "hidden" : "";
  };

  // Determine navbar style based on scroll and theme
  // At top of page (hero visible): always transparent with white text
  // Scrolled: glass effect adapts to theme
  const navBg = scrolled
    ? theme === "dark"
      ? "bg-black/75 backdrop-blur-xl border-b border-white/5"
      : "bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm"
    : "bg-transparent";

  const textColor = scrolled
    ? theme === "dark"
      ? "text-white"
      : "text-stone-800"
    : "text-white"; // Always white at top (hero is always dark)

  const hoverColor = "hover:text-[#d93e15]";

  const logoSrc = scrolled && theme === "light" ? ASSETS.logoPretoC : ASSETS.logoBrancoC;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 py-3 flex justify-between items-center">
          {/* Logo */}
          <a
            href={isHome ? "#hero" : "/"}
            onClick={(e) => {
              if (isHome) {
                handleNavClick(e, "#hero");
              } else {
                e.preventDefault();
                setLocation("/");
              }
            }}
            className="flex items-center transition-transform hover:scale-105"
            aria-label="Cavallini Assessoria - Voltar ao topo"
          >
            <img
              src={logoSrc}
              alt="Cavallini Assessoria"
              className="h-10 md:h-[50px] w-auto object-contain transition-all duration-300"
              width={160}
              height={50}
              loading="eager"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[13px] font-mono font-bold uppercase tracking-[0.15em] ${textColor} ${hoverColor} transition-colors relative group`}
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#d93e15] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#d93e15]" />
              </a>
            ))}

            {/* Theme Toggle */}
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg border transition-all duration-300 ${
                  scrolled
                    ? theme === "dark"
                      ? "border-white/10 text-white/60 hover:text-[#d93e15] hover:border-[#d93e15]/30"
                      : "border-black/10 text-stone-500 hover:text-[#d93e15] hover:border-[#d93e15]/30"
                    : "border-white/10 text-white/60 hover:text-[#d93e15] hover:border-[#d93e15]/30"
                }`}
                aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
          </nav>

          {/* Desktop CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden lg:flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#d93e15] border border-[#d93e15]/30 px-4 py-2 rounded-lg hover:bg-[#d93e15] hover:text-white transition-all duration-300`}
            aria-label="Falar com especialista via WhatsApp"
          >
            <Phone className="w-3.5 h-3.5" />
            S.O.S Incêndio
          </a>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  scrolled && theme === "light"
                    ? "text-stone-600 hover:text-[#d93e15]"
                    : "text-white/60 hover:text-[#d93e15]"
                }`}
                aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <button
              className={`p-2 transition-colors ${
                scrolled && theme === "light"
                  ? "text-stone-800 hover:text-[#d93e15]"
                  : "text-white hover:text-[#d93e15]"
              }`}
              onClick={toggleMobile}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col justify-start pt-24 items-center transition-all duration-500 ${
          theme === "dark"
            ? "bg-black/98 backdrop-blur-2xl"
            : "bg-white/98 backdrop-blur-2xl"
        } ${
          mobileOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <button
          className={`absolute top-6 right-6 text-3xl transition-colors ${
            theme === "dark" ? "text-white hover:text-[#d93e15]" : "text-stone-800 hover:text-[#d93e15]"
          }`}
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
              className={`text-xl font-display font-medium transition-all duration-300 ${
                theme === "dark" ? "text-white hover:text-[#d93e15]" : "text-stone-800 hover:text-[#d93e15]"
              }`}
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
          <p className={`font-mono text-[10px] uppercase tracking-widest text-center ${
            theme === "dark" ? "text-stone-500" : "text-stone-400"
          }`}>
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
