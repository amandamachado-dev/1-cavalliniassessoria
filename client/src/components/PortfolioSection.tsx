/*
 * PortfolioSection — Seção compacta de cases na home
 * Design: Grid 3 colunas. Imagem P&B → cor no hover. Fundo alternado.
 * SEO: H2 semântico, schema-ready, links internos para /portfolio e /portfolio/:slug
 * Palette: #D93E15 (brand), #0A0A0A (dark), #F5F2EE (light)
 * Type: Space Grotesk (headlines) + JetBrains Mono (labels) + Urbanist (body)
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";

export default function PortfolioSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="portfolio"
      aria-label="Portfólio de Projetos — Cases de Sucesso em Segurança Contra Incêndio"
      itemScope
      itemType="https://schema.org/ItemList"
      style={{
        backgroundColor: isDark ? "#0D0D0D" : "#FAFAF9",
        borderTop: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.07)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 1.25rem" }}>

        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span style={{ width: "1.5rem", height: "1px", backgroundColor: "#D93E15", flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#D93E15",
                }}
              >
                Portfólio
              </span>
            </div>
            <h2
              itemProp="name"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: isDark ? "#F0EDEA" : "#0F0F0F",
                margin: 0,
                maxWidth: "32rem",
              }}
            >
              Projetos realizados em{" "}
              <span style={{ color: "#D93E15" }}>empresas líderes</span>.
            </h2>
          </div>

          {/* CTA → página completa */}
          <Link href="/portfolio">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#D93E15",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Ver todos os cases
              <ArrowRight style={{ width: "0.875rem", height: "0.875rem" }} />
            </span>
          </Link>
        </div>

        {/* ── Grid de cases ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
          }}
        >
          {PORTFOLIO_ITEMS.map((item, i) => (
            <Link key={item.id} href={`/portfolio/${item.slug}`}>
              <article
                itemScope
                itemType="https://schema.org/CreativeWork"
                itemProp="itemListElement"
                style={{
                  position: "relative",
                  backgroundColor: isDark ? "#0A0A0A" : "#FFFFFF",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
                  if (img) img.style.filter = "grayscale(0%) scale(1.04)";
                  const img2 = e.currentTarget.querySelector("img") as HTMLImageElement | null;
                  if (img2) img2.style.transform = "scale(1.04)";
                  const accent = e.currentTarget.querySelector(".accent-line") as HTMLElement | null;
                  if (accent) accent.style.transform = "scaleX(1)";
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
                  if (img) img.style.filter = "grayscale(100%)";
                  if (img) img.style.transform = "scale(1)";
                  const accent = e.currentTarget.querySelector(".accent-line") as HTMLElement | null;
                  if (accent) accent.style.transform = "scaleX(0)";
                }}
              >
                {/* Accent line top */}
                <div
                  className="accent-line"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    backgroundColor: "#D93E15",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.3s ease",
                    zIndex: 10,
                  }}
                />

                {/* Image */}
                <div style={{ position: "relative", height: "clamp(140px, 20vw, 200px)", overflow: "hidden" }}>
                  <img
                    src={item.image}
                    alt={`Case ${item.client} — ${item.service} | Cavallini Assessoria`}
                    itemProp="image"
                    loading={i === 0 ? "eager" : "lazy"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      filter: "grayscale(100%)",
                      transition: "filter 0.6s ease, transform 0.7s ease",
                    }}
                  />
                  {/* Number watermark */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      bottom: "0.5rem",
                      right: "1rem",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "4.5rem",
                      lineHeight: 1,
                      color: "rgba(255,255,255,0.06)",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    {item.number}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: "1.5rem 1.75rem" }}>
                  {/* Client logo + segment */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                    <img
                      src={item.logoSrc}
                      alt={`Logo ${item.client}`}
                      style={{
                        height: "1.5rem",
                        width: "auto",
                        objectFit: "contain",
                        filter: isDark ? "invert(1) brightness(0.7)" : "brightness(0) opacity(0.5)",
                      }}
                    />
                    <span
                      style={{
                        width: "1px",
                        height: "1rem",
                        backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: isDark ? "rgba(240,237,234,0.35)" : "rgba(15,15,15,0.4)",
                      }}
                    >
                      {item.segment}
                    </span>
                  </div>

                  <h3
                    itemProp="name"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 500,
                      fontSize: "1.05rem",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.25,
                      color: isDark ? "#F0EDEA" : "#0F0F0F",
                      margin: "0 0 0.25rem",
                    }}
                  >
                    {item.client}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: isDark ? "rgba(240,237,234,0.3)" : "rgba(15,15,15,0.35)",
                      margin: "0 0 0.875rem",
                    }}
                  >
                    {item.service} · {item.year}
                  </p>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1.25rem" }}>
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.575rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: isDark ? "rgba(217,62,21,0.8)" : "#D93E15",
                          border: `1px solid ${isDark ? "rgba(217,62,21,0.2)" : "rgba(217,62,21,0.25)"}`,
                          padding: "0.2rem 0.5rem",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#D93E15",
                    }}
                  >
                    Ver case completo
                    <ArrowRight style={{ width: "0.75rem", height: "0.75rem" }} />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
