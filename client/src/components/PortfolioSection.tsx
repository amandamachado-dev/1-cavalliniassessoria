/*
 * PortfolioSection — Seção compacta de cases na home
 * Design: Grid 1col mobile → 3col desktop. Imagem P&B → cor no hover.
 * SEO: H2 semântico, schema-ready, links internos para /portfolio e /portfolio/:slug
 * Palette: #D93E15 (brand), #0A0A0A (dark), #F5F2EE (light)
 * Type: Space Grotesk (headlines) + JetBrains Mono (labels) + Urbanist (body)
 * Responsive: mobile-first, breakpoints sm(640) md(768) lg(1024)
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";

export default function PortfolioSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const cardBg = isDark ? "#0A0A0A" : "#FFFFFF";
  const textPrimary = isDark ? "#F0EDEA" : "#0F0F0F";
  const textMuted = isDark ? "rgba(240,237,234,0.35)" : "rgba(15,15,15,0.4)";
  const dividerColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";

  return (
    <section
      id="portfolio"
      aria-label="Portfólio de Projetos — Cases de Sucesso em Segurança Contra Incêndio"
      itemScope
      itemType="https://schema.org/ItemList"
      className="py-16 sm:py-20"
      style={{
        backgroundColor: isDark ? "#0D0D0D" : "#FAFAF9",
        borderTop: `1px solid ${dividerColor}`,
      }}
    >
      <div className="mx-auto px-5 sm:px-6 lg:px-8" style={{ maxWidth: "1320px" }}>

        {/* ── Header ── */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-6 h-px flex-shrink-0" style={{ backgroundColor: "#D93E15" }} />
              <span
                className="uppercase tracking-widest"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  color: "#D93E15",
                }}
              >
                Portfólio
              </span>
            </div>
            <h2
              itemProp="name"
              className="m-0"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.4rem, 3.5vw, 2.25rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: textPrimary,
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
              className="inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#D93E15",
              }}
            >
              Ver todos os cases
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* ── Grid de cases — 1 col mobile, 2 col sm, 3 col lg ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            gap: "1px",
            backgroundColor: dividerColor,
          }}
        >
          {PORTFOLIO_ITEMS.map((item, i) => (
            <Link key={item.id} href={`/portfolio/${item.slug}`}>
              <article
                itemScope
                itemType="https://schema.org/CreativeWork"
                itemProp="itemListElement"
                className="relative overflow-hidden cursor-pointer group"
                style={{ backgroundColor: cardBg }}
              >
                {/* Accent line top */}
                <div
                  className="absolute top-0 left-0 right-0 z-10 origin-left transition-transform duration-300"
                  style={{
                    height: "2px",
                    backgroundColor: "#D93E15",
                    transform: "scaleX(0)",
                  }}
                  ref={(el) => {
                    if (!el) return;
                    const parent = el.closest("article");
                    if (!parent) return;
                    parent.addEventListener("mouseenter", () => { el.style.transform = "scaleX(1)"; });
                    parent.addEventListener("mouseleave", () => { el.style.transform = "scaleX(0)"; });
                  }}
                />

                {/* Image — altura menor no mobile */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: "clamp(160px, 40vw, 200px)" }}
                >
                  <img
                    src={item.image}
                    alt={`Case ${item.client} — ${item.service} | Cavallini Assessoria`}
                    itemProp="image"
                    loading={i === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover block transition-all duration-700"
                    style={{ filter: "grayscale(100%)" }}
                    ref={(el) => {
                      if (!el) return;
                      const parent = el.closest("article");
                      if (!parent) return;
                      parent.addEventListener("mouseenter", () => {
                        el.style.filter = "grayscale(0%)";
                        el.style.transform = "scale(1.04)";
                      });
                      parent.addEventListener("mouseleave", () => {
                        el.style.filter = "grayscale(100%)";
                        el.style.transform = "scale(1)";
                      });
                    }}
                  />
                  {/* Number watermark */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2 right-3 pointer-events-none select-none leading-none"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "4rem",
                      color: "rgba(255,255,255,0.06)",
                    }}
                  >
                    {item.number}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Client logo + segment */}
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={item.logoSrc}
                      alt={`Logo ${item.client}`}
                      className="h-5 w-auto object-contain flex-shrink-0"
                      style={{
                        filter: isDark ? "invert(1) brightness(0.7)" : "brightness(0) opacity(0.5)",
                      }}
                    />
                    <span
                      className="flex-shrink-0"
                      style={{
                        width: "1px",
                        height: "1rem",
                        backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
                      }}
                    />
                    <span
                      className="truncate"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: textMuted,
                      }}
                    >
                      {item.segment}
                    </span>
                  </div>

                  <h3
                    itemProp="name"
                    className="m-0 mb-1"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 500,
                      fontSize: "1.05rem",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.25,
                      color: textPrimary,
                    }}
                  >
                    {item.client}
                  </h3>

                  <p
                    className="m-0 mb-3"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: isDark ? "rgba(240,237,234,0.3)" : "rgba(15,15,15,0.35)",
                    }}
                  >
                    {item.service} · {item.year}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.55rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: isDark ? "rgba(217,62,21,0.8)" : "#D93E15",
                          border: `1px solid ${isDark ? "rgba(217,62,21,0.2)" : "rgba(217,62,21,0.25)"}`,
                          padding: "0.2rem 0.45rem",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <span
                    className="inline-flex items-center gap-1.5"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#D93E15",
                    }}
                  >
                    Ver case completo
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA mobile — ver todos */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link href="/portfolio">
            <span
              className="inline-flex items-center gap-2 border px-5 py-3 cursor-pointer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#D93E15",
                borderColor: "rgba(217,62,21,0.3)",
              }}
            >
              Ver todos os cases
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
