/*
 * Footer — Premium footer with giant "CAVALLINI" watermark in background
 * Design: Faithful recreation of the original footer with 3-column layout,
 * giant brand name watermark, hover "/" prefix on nav links, and gradient divider
 */
import { ASSETS, NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowUp, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <footer
      className={`relative w-full pt-24 lg:pt-32 pb-8 overflow-hidden z-20 border-t ${
        isDark
          ? "border-white/5 bg-[#030303]"
          : "border-stone-200 bg-stone-100"
      }`}
      role="contentinfo"
      id="footer"
    >
      {/* ─── GIANT WATERMARK "CAVALLINI" ─── */}
      <div
        className="absolute bottom-[-2%] md:bottom-[-5%] left-0 w-full flex justify-center items-end pointer-events-none z-0 select-none overflow-hidden h-full"
        aria-hidden="true"
      >
        <span
          className={`font-display font-bold text-[22vw] md:text-[16vw] leading-[0.75] tracking-tighter whitespace-nowrap ${
            isDark ? "text-white opacity-[0.04]" : "text-black opacity-[0.04]"
          }`}
        >
          CAVALLINI
        </span>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-24">
          {/* Column 1: Institutional Description */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col items-start pr-0 md:pr-10 mt-2">
            <h3
              className={`font-display font-semibold text-xl md:text-2xl tracking-tight mb-4 ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              Cavallini Assessoria
            </h3>
            <p
              className={`font-light text-sm leading-relaxed ${
                isDark ? "text-stone-400" : "text-stone-500"
              }`}
            >
              Especialistas em segurança contra incêndio, oferecendo soluções
              completas para aprovação e conformidade rigorosa junto ao Corpo de
              Bombeiros.
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="md:col-span-6 lg:col-span-3 lg:pl-12">
            <h4
              className={`text-[10px] font-mono uppercase tracking-widest mb-8 font-semibold ${
                isDark ? "text-stone-600" : "text-stone-400"
              }`}
            >
              Navegação
            </h4>
            <nav aria-label="Links do rodapé">
              <ul className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`text-sm font-light transition-colors relative group w-max flex items-center ${
                        isDark
                          ? "text-stone-400 hover:text-white"
                          : "text-stone-500 hover:text-stone-900"
                      }`}
                    >
                      <span className="absolute -left-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#d93e15] text-xs font-mono">
                        /
                      </span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Direct Contact */}
          <div className="md:col-span-6 lg:col-span-5 lg:pl-12">
            <h4
              className={`text-[10px] font-mono uppercase tracking-widest mb-8 font-semibold ${
                isDark ? "text-stone-600" : "text-stone-400"
              }`}
            >
              Contato Direto
            </h4>
            <ul className="space-y-5">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 w-max"
                >
                  <Phone
                    className={`w-5 h-5 transition-colors ${
                      isDark
                        ? "text-stone-600 group-hover:text-[#d93e15]"
                        : "text-stone-400 group-hover:text-[#d93e15]"
                    }`}
                  />
                  <span
                    className={`text-sm font-light transition-colors border-b border-transparent group-hover:border-current pb-0.5 ${
                      isDark
                        ? "text-stone-400 group-hover:text-white"
                        : "text-stone-500 group-hover:text-stone-900"
                    }`}
                  >
                    (11) 99999-9999
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@cavalliniassessoria.com.br"
                  className="group flex items-center gap-4 w-max"
                >
                  <Mail
                    className={`w-5 h-5 transition-colors ${
                      isDark
                        ? "text-stone-600 group-hover:text-[#d93e15]"
                        : "text-stone-400 group-hover:text-[#d93e15]"
                    }`}
                  />
                  <span
                    className={`text-sm font-light transition-colors border-b border-transparent group-hover:border-current pb-0.5 ${
                      isDark
                        ? "text-stone-400 group-hover:text-white"
                        : "text-stone-500 group-hover:text-stone-900"
                    }`}
                  >
                    contato@cavallini.com.br
                  </span>
                </a>
              </li>
              <li>
                <div className="group flex items-center gap-4 w-max mt-2">
                  <MapPin
                    className={`w-5 h-5 transition-colors ${
                      isDark
                        ? "text-stone-600 group-hover:text-[#d93e15]"
                        : "text-stone-400 group-hover:text-[#d93e15]"
                    }`}
                  />
                  <span
                    className={`text-sm font-light ${
                      isDark ? "text-stone-400" : "text-stone-500"
                    }`}
                  >
                    São Paulo, SP - Brasil
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── PREMIUM GRADIENT DIVIDER ─── */}
        <div
          className={`h-px w-full bg-gradient-to-r from-transparent to-transparent ${
            isDark ? "via-white/10" : "via-black/10"
          }`}
        />

        {/* ─── BOTTOM BAR ─── */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 relative z-20 pb-4">
          <p
            className={`text-[10px] md:text-xs font-mono tracking-widest uppercase ${
              isDark ? "text-stone-500" : "text-stone-400"
            }`}
          >
            &copy; {new Date().getFullYear()} Cavallini Assessoria. Todos os
            direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            {/* Status indicator */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#d93e15] animate-pulse shadow-[0_0_10px_#d93e15]" />
              <span
                className={`text-xs font-mono uppercase tracking-widest font-bold ${
                  isDark ? "text-white" : "text-stone-800"
                }`}
              >
                v2.0
              </span>
            </div>
            {/* Back to top */}
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
      </div>
    </footer>
  );
}
