/*
 * Navbar — Minimal editorial header
 * Design: Transparent → solid on scroll. No rounded corners. No glow.
 * Clean authority: logo left, nav center, CTA right.
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NAV_LINKS, ASSETS, WHATSAPP_URL } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location, setLocation] = useLocation();
  const isDark = theme === "dark";
  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/")) {
      setMobileOpen(false);
      return;
    }
    e.preventDefault();
    setMobileOpen(false);
    if (!isHome) {
      setLocation("/");
      setTimeout(() => {
        const el = document.getElementById(href.replace("#", ""));
        if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(href.replace("#", ""));
      if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
    }
  };

  // Usa logo/ícones escuros quando: light mode E (scrolled OU página interna)
  const needsDarkStyle = !isDark && (scrolled || !isHome);
  const logoSrc = needsDarkStyle ? ASSETS.logoPretoC : ASSETS.logoBrancoC;

  // Em páginas internas no light mode, a navbar precisa de fundo sólido mesmo sem scroll
  const navBg = scrolled
    ? isDark
      ? "bg-[#0A0A0A]/95 border-b border-white/[0.06]"
      : "bg-white/95 border-b border-black/[0.08] shadow-[0_1px_0_rgba(0,0,0,0.04)]"
    : (!isHome && !isDark)
      ? "bg-white/98 border-b border-black/[0.08] shadow-[0_1px_0_rgba(0,0,0,0.04)]"
      : "bg-transparent border-b border-transparent";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
        style={{ backdropFilter: scrolled ? "blur(20px)" : "none" }}
        role="banner"
      >
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-[68px]">

          {/* Logo */}
          <a
            href={isHome ? "#hero" : "/"}
            onClick={(e) => isHome ? handleNavClick(e, "#hero") : undefined}
            aria-label="Cavallini Assessoria"
            className="flex-shrink-0"
          >
            <img
              src={logoSrc}
              alt="Cavallini Assessoria"
              className="h-8 lg:h-9 w-auto object-contain transition-all duration-300"
              loading="eager"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => {
              const isFaqLink = link.href === "/faq";
              const isActive = isFaqLink && location === "/faq";
              const textStyle = isActive
                ? "text-[#D93E15]"
                : needsDarkStyle
                  ? scrolled
                    ? "text-stone-500 hover:text-stone-900"
                    : "text-stone-600 hover:text-stone-900"
                  : scrolled
                    ? isDark ? "text-white/55 hover:text-white" : "text-stone-500 hover:text-stone-900"
                    : "text-white/60 hover:text-white";

              return isFaqLink ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[10.5px] font-mono uppercase tracking-[0.16em] transition-colors duration-200 ${textStyle}`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[10.5px] font-mono uppercase tracking-[0.16em] transition-colors duration-200 ${textStyle}`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                className={`p-2 transition-colors duration-200 ${
                  needsDarkStyle
                    ? "text-stone-400 hover:text-stone-700"
                    : "text-white/40 hover:text-white/80"
                }`}
                aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
              >
                {isDark ? <Sun className="w-[15px] h-[15px]" /> : <Moon className="w-[15px] h-[15px]" />}
              </button>
            )}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-[#D93E15] border border-[#D93E15]/35 px-4 py-2.5 hover:bg-[#D93E15] hover:text-white transition-all duration-200"
            >
              S.O.S Incêndio
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-1">
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                className={`p-2.5 transition-colors ${
                  needsDarkStyle ? "text-stone-500" : "text-white/55"
                }`}
                aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className={`p-2.5 transition-colors ${
                needsDarkStyle ? "text-stone-800" : "text-white"
              }`}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col transition-opacity duration-300 ${
          isDark ? "bg-[#0A0A0A]" : "bg-[#F5F2EE]"
        } ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile Header */}
        <div className={`flex items-center justify-between px-5 h-[68px] border-b ${isDark ? "border-white/[0.06]" : "border-black/[0.07]"}`}>
          <img src={isDark ? ASSETS.logoBrancoC : ASSETS.logoPretoC} alt="Cavallini" className="h-8 w-auto" />
          <button
            onClick={() => setMobileOpen(false)}
            className={`p-2 ${isDark ? "text-white/50" : "text-stone-500"}`}
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Links */}
        <nav className="flex flex-col px-5 pt-8 gap-0" role="navigation">
          {NAV_LINKS.map((link, i) => {
            const isFaqLink = link.href === "/faq";
            return isFaqLink ? (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-[1.6rem] font-display font-medium py-4 border-b transition-colors ${
                  isDark ? "text-white/75 border-white/[0.05] hover:text-[#D93E15]" : "text-stone-800 border-black/[0.06] hover:text-[#D93E15]"
                }`}
                style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms" }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[1.6rem] font-display font-medium py-4 border-b transition-colors ${
                  isDark ? "text-white/75 border-white/[0.05] hover:text-[#D93E15]" : "text-stone-800 border-black/[0.06] hover:text-[#D93E15]"
                }`}
                style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms" }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile Footer */}
        <div className="mt-auto px-5 pb-10 space-y-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-[#D93E15] text-white text-[11px] font-mono uppercase tracking-[0.14em] py-4"
          >
            Falar com Especialista
          </a>
          <p className={`text-center text-[9px] font-mono uppercase tracking-widest ${isDark ? "text-white/20" : "text-stone-300"}`}>
            Atendimento 24h
          </p>
        </div>
      </div>
    </>
  );
}
