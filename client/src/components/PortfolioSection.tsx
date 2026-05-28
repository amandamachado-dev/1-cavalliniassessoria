/*
 * PortfolioSection — Showcase editorial na home (sem cards)
 * Design: Imagem grande em destaque à esquerda + lista de cases à direita
 *         Hover na lista troca a imagem em destaque com fade suave
 * SEO: H2 semântico, schema.org ItemList, links internos
 * Palette: #D93E15 (brand), #0A0A0A (dark), #F5F2EE (light)
 * Type: Space Grotesk + JetBrains Mono + Urbanist
 * Responsive: imagem oculta no mobile, lista full-width
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function PortfolioSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const { ref: showcaseRef, isVisible: showcaseVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  const bg = isDark ? "#0D0D0D" : "#FAFAF9";
  const textPrimary = isDark ? "#F0EDEA" : "#0F0F0F";
  const textMuted = isDark ? "rgba(240,237,234,0.38)" : "rgba(15,15,15,0.38)";
  const border = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const activeItem = PORTFOLIO_ITEMS[activeIndex];

  return (
    <section
      id="portfolio"
      aria-label="Portfólio de Projetos — Cases de Sucesso em Segurança Contra Incêndio"
      itemScope
      itemType="https://schema.org/ItemList"
      className="py-16 sm:py-20 lg:py-24"
      style={{
        backgroundColor: bg,
        borderTop: `1px solid ${border}`,
      }}
    >
      <div className="mx-auto px-5 sm:px-6 lg:px-8" style={{ maxWidth: "1320px" }}>

        {/* ── Header ── */}
        <div ref={headerRef} className="flex flex-wrap items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className={`flex items-center gap-3 mb-4 reveal-left ${headerVisible ? "visible" : ""}`}>
              <span className="block w-6 h-px flex-shrink-0" style={{ backgroundColor: "#D93E15" }} />
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
              className={`m-0 reveal reveal-delay-2 ${headerVisible ? "visible" : ""}`}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: textPrimary,
                maxWidth: "28rem",
              }}
            >
              Projetos que falam{" "}
              <span style={{ color: "#D93E15" }}>por si só</span>.
            </h2>
          </div>


        </div>

        {/* ── Showcase: imagem + lista ── */}
        <div ref={showcaseRef} className="flex flex-col lg:flex-row gap-0" style={{ minHeight: "420px" }}>

          {/* ── Imagem em destaque (só desktop/tablet lg+) ── */}
          <div
            className={`hidden lg:block relative overflow-hidden flex-shrink-0 reveal-left ${showcaseVisible ? "visible" : ""}`}
            style={{ width: "48%", minHeight: "460px" }}
          >
            {/* Imagem com fade ao trocar */}
            {PORTFOLIO_ITEMS.map((item, i) => (
              <div
                key={item.id}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: i === activeIndex ? 1 : 0 }}
              >
                <img
                  src={item.image}
                  alt={`Case ${item.client} — ${item.service} | Cavallini Assessoria`}
                  className="w-full h-full object-cover block"
                  loading="eager"
                  style={{
                    filter: "grayscale(20%) brightness(0.85)",
                    transform: i === activeIndex ? "scale(1.02)" : "scale(1)",
                    transition: "opacity 0.5s ease, transform 1.2s ease",
                    opacity: 0,
                  }}
                  onLoad={(e) => { e.currentTarget.style.opacity = "1"; }}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: isDark
                      ? "linear-gradient(to right, rgba(0,0,0,0) 60%, #0D0D0D 100%), linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)"
                      : "linear-gradient(to right, rgba(0,0,0,0) 60%, #FAFAF9 100%), linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)",
                  }}
                />
              </div>
            ))}

            {/* Número do case sobreposto */}
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-6 z-10 pointer-events-none select-none leading-none"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(5rem, 10vw, 9rem)",
                color: "rgba(255,255,255,0.06)",
                transition: "opacity 0.4s ease",
              }}
            >
              {activeItem.number}
            </span>

            {/* Logo do cliente sobreposta */}
            <div className="absolute bottom-6 right-6 z-10">
              <img
                src={activeItem.logoSrc}
                alt={`Logo ${activeItem.client}`}
                className="h-8 w-auto object-contain transition-opacity duration-500"
                style={{ filter: "invert(1) brightness(0.8)", opacity: 0.55 }}
              />
            </div>
          </div>

          {/* ── Lista de cases ── */}
          <div
            className="flex-1 flex flex-col"
            style={{ borderLeft: `1px solid ${border}` }}
          >
            {PORTFOLIO_ITEMS.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <Link key={item.id} href={`/portfolio/${item.slug}`}>
                  <article
                    itemScope
                    itemType="https://schema.org/CreativeWork"
                    itemProp="itemListElement"
                    className="relative cursor-pointer group transition-colors duration-300"
                    style={{
                      borderBottom: `1px solid ${border}`,
                      backgroundColor: isActive
                        ? isDark ? "rgba(217,62,21,0.05)" : "rgba(217,62,21,0.03)"
                        : "transparent",
                      padding: "1.75rem 2rem",
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                  >
                    {/* Accent left bar */}
                    <div
                      className="absolute left-0 top-0 bottom-0 transition-all duration-300"
                      style={{
                        width: "2px",
                        backgroundColor: "#D93E15",
                        transform: isActive ? "scaleY(1)" : "scaleY(0)",
                        transformOrigin: "top",
                      }}
                    />

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Number + segment */}
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "0.6rem",
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: isActive ? "#D93E15" : textMuted,
                              transition: "color 0.3s ease",
                            }}
                          >
                            {item.number}
                          </span>
                          <span
                            className="block flex-shrink-0"
                            style={{ width: "1px", height: "0.75rem", backgroundColor: border }}
                          />
                          <span
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

                        {/* Client name */}
                        <h3
                          itemProp="name"
                          className="m-0 mb-1.5 transition-colors duration-300"
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 500,
                            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                            letterSpacing: "-0.015em",
                            lineHeight: 1.2,
                            color: isActive ? textPrimary : isDark ? "rgba(240,237,234,0.7)" : "rgba(15,15,15,0.65)",
                          }}
                        >
                          {item.client}
                        </h3>

                        {/* Service */}
                        <p
                          className="m-0 mb-3"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.6rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: isActive ? "#D93E15" : textMuted,
                            transition: "color 0.3s ease",
                          }}
                        >
                          {item.service}
                        </p>

                        {/* Tags — só quando ativo */}
                        <div
                          className="flex flex-wrap gap-1.5 overflow-hidden transition-all duration-500"
                          style={{
                            maxHeight: isActive ? "3rem" : "0",
                            opacity: isActive ? 1 : 0,
                          }}
                        >
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
                      </div>

                      {/* Arrow */}
                      <div
                        className="flex-shrink-0 mt-1 transition-all duration-300"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateX(0)" : "translateX(-6px)",
                        }}
                      >
                        <ArrowRight
                          className="w-4 h-4"
                          style={{ color: "#D93E15" }}
                        />
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}

            {/* ── CTA final ── */}
            <div
              className="mt-auto p-6 sm:p-8 flex justify-center"
              style={{ borderTop: `1px solid ${border}` }}
            >
              <Link href="/portfolio">
                <span
                  className="inline-flex items-center gap-2.5 cursor-pointer flex-shrink-0 transition-colors duration-200"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    backgroundColor: "#D93E15",
                    padding: "0.75rem 2rem",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B83310")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D93E15")}
                >
                  Ver Portfólio
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>



      </div>
    </section>
  );
}
