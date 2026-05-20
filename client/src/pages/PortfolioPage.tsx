/*
 * PortfolioPage — Página de portfólio /portfolio
 * Design: Hero editorial + grid de cases + CTA final
 * SEO: H1 semântico, meta description via useEffect, schema.org ItemList
 * Palette: #D93E15 (brand), #0A0A0A (dark), #F5F2EE (light)
 * Type: Space Grotesk (headlines) + JetBrains Mono (labels) + Urbanist (body)
 */
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Ruler } from "lucide-react";
import { PORTFOLIO_ITEMS, WHATSAPP_URL, ASSETS } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function PortfolioPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // SEO: atualizar title e meta description
    document.title = "Portfólio | Cases de Segurança Contra Incêndio — Cavallini Assessoria";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Conheça os cases de sucesso da Cavallini Assessoria em segurança contra incêndio: AVCB, projetos de engenharia e execução para empresas como Coco Bambu, Fórmula 1 e COP30."
      );
    }
    return () => {
      document.title = "Cavallini Assessoria | Engenharia de Combate a Incêndio — AVCB, Projetos e Execução";
    };
  }, []);

  const bg = isDark ? "#000000" : "#F5F2EE";
  const surface = isDark ? "#0A0A0A" : "#FFFFFF";
  const textPrimary = isDark ? "#F0EDEA" : "#0F0F0F";
  const textMuted = isDark ? "rgba(240,237,234,0.4)" : "rgba(15,15,15,0.4)";
  const border = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: bg }}>
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section
          aria-label="Portfólio de Cases em Segurança Contra Incêndio"
          style={{
            position: "relative",
            paddingTop: "8rem",
            paddingBottom: "5rem",
            borderBottom: `1px solid ${border}`,
            overflow: "hidden",
          }}
        >
          {/* Background watermark */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "-2rem",
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(6rem, 18vw, 18rem)",
              lineHeight: 1,
              color: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.03)",
              pointerEvents: "none",
              userSelect: "none",
              letterSpacing: "-0.04em",
            }}
          >
            CASES
          </span>

          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 1.25rem", position: "relative", zIndex: 1 }}>
            {/* Back link */}
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); setLocation("/"); }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: textMuted,
                textDecoration: "none",
                marginBottom: "2.5rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D93E15")}
              onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
            >
              <ArrowLeft style={{ width: "0.875rem", height: "0.875rem" }} />
              Voltar ao início
            </a>

            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
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

            {/* H1 — principal para SEO */}
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: textPrimary,
                maxWidth: "42rem",
                margin: "0 0 1.5rem",
              }}
            >
              Cases de sucesso em{" "}
              <span style={{ color: "#D93E15" }}>segurança contra incêndio</span>.
            </h1>

            <p
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                lineHeight: 1.75,
                color: isDark ? "rgba(240,237,234,0.55)" : "rgba(15,15,15,0.55)",
                maxWidth: "36rem",
                margin: 0,
              }}
            >
              Projetos entregues com rigor técnico e aprovação total. Da consultoria inicial à emissão do AVCB, acompanhamos cada etapa para garantir conformidade e segurança.
            </p>

            {/* Stats rápidos */}
            <div
              style={{
                display: "flex",
                gap: "3rem",
                marginTop: "3rem",
                paddingTop: "2rem",
                borderTop: `1px solid ${border}`,
                flexWrap: "wrap",
              }}
            >
              {[
                { value: "500+", label: "Projetos entregues" },
                { value: "100%", label: "Taxa de aprovação" },
                { value: "15+", label: "Anos de experiência" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: "1.75rem",
                      color: "#D93E15",
                      lineHeight: 1,
                      marginBottom: "0.375rem",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: textMuted,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Grid de cases ── */}
        <section
          aria-label="Lista de cases"
          itemScope
          itemType="https://schema.org/ItemList"
          style={{
            backgroundColor: bg,
            padding: "5rem 0",
          }}
        >
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 1.25rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", backgroundColor: border }}>
              {PORTFOLIO_ITEMS.map((item, i) => (
                <Link key={item.id} href={`/portfolio/${item.slug}`}>
                  <article
                    itemScope
                    itemType="https://schema.org/CreativeWork"
                    itemProp="itemListElement"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      backgroundColor: surface,
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                    className="portfolio-row"
                    onMouseEnter={(e) => {
                      const img = e.currentTarget.querySelector(".case-img") as HTMLImageElement | null;
                      if (img) img.style.filter = "grayscale(0%)";
                      if (img) img.style.transform = "scale(1.03)";
                      const accent = e.currentTarget.querySelector(".row-accent") as HTMLElement | null;
                      if (accent) accent.style.transform = "scaleX(1)";
                    }}
                    onMouseLeave={(e) => {
                      const img = e.currentTarget.querySelector(".case-img") as HTMLImageElement | null;
                      if (img) img.style.filter = "grayscale(100%)";
                      if (img) img.style.transform = "scale(1)";
                      const accent = e.currentTarget.querySelector(".row-accent") as HTMLElement | null;
                      if (accent) accent.style.transform = "scaleX(0)";
                    }}
                  >
                    {/* Accent line */}
                    <div
                      className="row-accent"
                      style={{
                        height: "2px",
                        backgroundColor: "#D93E15",
                        transform: "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 0.3s ease",
                      }}
                    />

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "clamp(200px, 28%, 340px) 1fr",
                        gap: 0,
                      }}
                      className="case-grid"
                    >
                      {/* Image */}
                      <div style={{ position: "relative", overflow: "hidden", height: "clamp(180px, 22vw, 280px)" }}>
                        <img
                          className="case-img"
                          src={item.image}
                          alt={`Case ${item.client} — ${item.service} em ${item.location} | Cavallini Assessoria`}
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
                        {/* Number */}
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            bottom: "0.75rem",
                            left: "1rem",
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: "5rem",
                            lineHeight: 1,
                            color: "rgba(255,255,255,0.07)",
                            pointerEvents: "none",
                            userSelect: "none",
                          }}
                        >
                          {item.number}
                        </span>
                      </div>

                      {/* Content */}
                      <div
                        style={{
                          padding: "2rem 2.5rem",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          borderLeft: `1px solid ${border}`,
                        }}
                      >
                        <div>
                          {/* Logo + segment */}
                          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.25rem" }}>
                            <img
                              src={item.logoSrc}
                              alt={`Logo ${item.client}`}
                              style={{
                                height: "1.75rem",
                                width: "auto",
                                objectFit: "contain",
                                filter: isDark ? "invert(1) brightness(0.65)" : "brightness(0) opacity(0.45)",
                              }}
                            />
                            <span style={{ width: "1px", height: "1.25rem", backgroundColor: border, flexShrink: 0 }} />
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

                          <h2
                            itemProp="name"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontWeight: 500,
                              fontSize: "clamp(1.25rem, 2vw, 1.625rem)",
                              letterSpacing: "-0.015em",
                              lineHeight: 1.2,
                              color: textPrimary,
                              margin: "0 0 0.5rem",
                            }}
                          >
                            {item.client}
                          </h2>

                          <p
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "0.6rem",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "#D93E15",
                              margin: "0 0 1rem",
                            }}
                          >
                            {item.service}
                          </p>

                          {/* Meta info */}
                          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                            {[
                              { Icon: MapPin, text: item.location },
                              { Icon: Calendar, text: item.year },
                              { Icon: Ruler, text: item.area },
                            ].map(({ Icon, text }) => (
                              <span
                                key={text}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "0.375rem",
                                  fontFamily: "'Urbanist', sans-serif",
                                  fontSize: "0.8rem",
                                  color: textMuted,
                                }}
                              >
                                <Icon style={{ width: "0.75rem", height: "0.75rem", color: "#D93E15", flexShrink: 0 }} />
                                {text}
                              </span>
                            ))}
                          </div>

                          <p
                            itemProp="description"
                            style={{
                              fontFamily: "'Urbanist', sans-serif",
                              fontWeight: 300,
                              fontSize: "0.875rem",
                              lineHeight: 1.7,
                              color: isDark ? "rgba(240,237,234,0.5)" : "rgba(15,15,15,0.55)",
                              margin: "0 0 1.25rem",
                              maxWidth: "42rem",
                            }}
                          >
                            {item.challenge}
                          </p>

                          {/* Tags */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                            {item.tags.map((tag) => (
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
                        </div>

                        {/* CTA */}
                        <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: `1px solid ${border}` }}>
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
                            }}
                          >
                            Ver case completo
                            <ArrowRight style={{ width: "0.875rem", height: "0.875rem" }} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Final ── */}
        <section
          aria-label="Solicite seu diagnóstico"
          style={{
            backgroundColor: "#D93E15",
            padding: "4rem 1.25rem",
          }}
        >
          <div
            style={{
              maxWidth: "1320px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "0.5rem",
                }}
              >
                Próximo case
              </p>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                Pode ser o seu projeto.
              </h2>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                backgroundColor: "#FFFFFF",
                color: "#D93E15",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "1rem 2rem",
                textDecoration: "none",
                transition: "background-color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5F2EE")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            >
              Solicitar diagnóstico gratuito
              <ArrowRight style={{ width: "0.875rem", height: "0.875rem" }} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
