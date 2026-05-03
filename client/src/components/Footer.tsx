/*
 * Footer — Minimal footer with brand identity, theme-aware
 */
import { ASSETS, NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <footer
      className={`relative border-t ${
        isDark ? "border-white/5 bg-[#030303]" : "border-black/5"
      }`}
      style={{ backgroundColor: isDark ? undefined : "var(--surface-secondary)" }}
      role="contentinfo"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img
              src={isDark ? ASSETS.logoBrancoC : ASSETS.logoPretoC}
              alt="Cavallini Assessoria"
              className="h-10 w-auto mb-4"
              loading="lazy"
            />
            <p className={`text-sm font-light leading-relaxed max-w-xs ${
              isDark ? "text-stone-500" : "text-stone-500"
            }`}>
              Engenharia de combate a incêndio com rigor técnico e visão estratégica.
              Segurança não se promete. Se comprova.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className={`text-xs font-mono uppercase tracking-widest mb-4 ${
              isDark ? "text-stone-500" : "text-stone-400"
            }`}>
              Navegação
            </h4>
            <nav className="flex flex-col gap-3" aria-label="Links do rodapé">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-light transition-colors hover:text-[#d93e15] ${
                    isDark ? "text-stone-400" : "text-stone-500"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`text-xs font-mono uppercase tracking-widest mb-4 ${
              isDark ? "text-stone-500" : "text-stone-400"
            }`}>
              Contato
            </h4>
            <div className="space-y-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-sm font-light transition-colors hover:text-[#d93e15] ${
                  isDark ? "text-stone-400" : "text-stone-500"
                }`}
              >
                WhatsApp — Falar com Especialista
              </a>
              <p className={`text-sm font-light ${isDark ? "text-stone-500" : "text-stone-400"}`}>
                São Paulo, SP — Brasil
              </p>
              <p className="text-xs font-mono text-[#d93e15] uppercase tracking-wider">
                Atendimento 24h para emergências
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`flex flex-col sm:flex-row items-center justify-between pt-8 border-t gap-4 ${
          isDark ? "border-white/5" : "border-black/5"
        }`}>
          <p className={`text-xs font-mono text-center sm:text-left ${
            isDark ? "text-stone-600" : "text-stone-400"
          }`}>
            &copy; {new Date().getFullYear()} Cavallini Assessoria. Todos os direitos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-colors hover:text-[#d93e15] ${
              isDark ? "text-stone-500" : "text-stone-400"
            }`}
            aria-label="Voltar ao topo"
          >
            Voltar ao topo
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
