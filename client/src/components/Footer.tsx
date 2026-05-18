/*
 * Footer — Watermark CAVALLINI + 3 colunas + bottom bar
 * Design: Fundo quase preto. Watermark gigante. Sem ornamentos.
 * Tipografia coerente com o resto do site.
 */
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bg = isDark ? "#050505" : "#EDEAE6";
  const textPrimary = isDark ? "#F0EDEA" : "#0F0F0F";
  const textSecondary = isDark ? "rgba(240,237,234,0.4)" : "rgba(15,15,15,0.45)";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(href.replace("#", ""));
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <footer
      id="footer"
      role="contentinfo"
      style={{
        position: "relative",
        backgroundColor: bg,
        borderTop: `1px solid ${borderColor}`,
        overflow: "hidden",
        paddingTop: "5rem",
        paddingBottom: "2rem",
      }}
    >
      {/* Watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-2%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          pointerEvents: "none",
          userSelect: "none",
          overflow: "hidden",
          height: "100%",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(14vw, 18vw, 22vw)",
            lineHeight: 0.78,
            letterSpacing: "-0.04em",
            whiteSpace: "nowrap",
            color: isDark ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.04)",
          }}
        >
          CAVALLINI
        </span>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 1.25rem 0",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem",
            marginBottom: "4rem",
          }}
        >
          {/* Col 1 — Institutional */}
          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: "1.05rem",
                letterSpacing: "-0.01em",
                color: textPrimary,
                marginBottom: "0.75rem",
              }}
            >
              Cavallini Assessoria
            </h3>
            <p
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontWeight: 300,
                fontSize: "0.85rem",
                lineHeight: 1.7,
                color: textSecondary,
                maxWidth: "22rem",
              }}
            >
              Especialistas em segurança contra incêndio — soluções completas
              para aprovação e conformidade junto ao Corpo de Bombeiros.
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: textSecondary,
                marginBottom: "1.5rem",
              }}
            >
              Navegação
            </h4>
            <nav aria-label="Links do rodapé">
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        style={{
                          fontFamily: "'Urbanist', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.875rem",
                          color: textSecondary,
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#D93E15")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = textSecondary)}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleAnchorClick(e, link.href)}
                        style={{
                          fontFamily: "'Urbanist', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.875rem",
                          color: textSecondary,
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#D93E15")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = textSecondary)}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: textSecondary,
                marginBottom: "1.5rem",
              }}
            >
              Contato Direto
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}
                  onMouseEnter={(e) => { const span = e.currentTarget.querySelector("span") as HTMLElement; if (span) span.style.color = textPrimary; }}
                  onMouseLeave={(e) => { const span = e.currentTarget.querySelector("span") as HTMLElement; if (span) span.style.color = textSecondary; }}
                >
                  <Phone style={{ width: "0.9rem", height: "0.9rem", color: "#D93E15", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: textSecondary, transition: "color 0.2s ease" }}>
                    (11) 95400-4989
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@cavalliniassessoria.com.br"
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}
                  onMouseEnter={(e) => { const span = e.currentTarget.querySelector("span") as HTMLElement; if (span) span.style.color = textPrimary; }}
                  onMouseLeave={(e) => { const span = e.currentTarget.querySelector("span") as HTMLElement; if (span) span.style.color = textSecondary; }}
                >
                  <Mail style={{ width: "0.9rem", height: "0.9rem", color: "#D93E15", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: textSecondary, transition: "color 0.2s ease" }}>
                    contato@cavallini.com.br
                  </span>
                </a>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <MapPin style={{ width: "0.9rem", height: "0.9rem", color: "#D93E15", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: textSecondary }}>
                    São Paulo, SP — Brasil
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: borderColor }} />

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: textSecondary,
              margin: 0,
            }}
          >
            &copy; {new Date().getFullYear()} Cavallini Assessoria. Todos os direitos reservados.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: textSecondary,
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 0.2s ease",
              padding: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#D93E15")}
            onMouseLeave={(e) => (e.currentTarget.style.color = textSecondary)}
          >
            Voltar ao topo
            <ArrowUp style={{ width: "0.75rem", height: "0.75rem" }} />
          </button>
        </div>
      </div>
    </footer>
  );
}
