/*
 * PortfolioPage — Página de portfólio /portfolio
 * Design: Hero editorial + lista de cases (split image|content no desktop, stack no mobile)
 * SEO: H1 semântico, meta description via useEffect, schema.org ItemList
 * Responsive: mobile-first, breakpoints sm(640) md(768) lg(1024)
 * Palette: #D93E15 (brand), #0A0A0A (dark), #F5F2EE (light)
 */
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Ruler } from "lucide-react";
import { PORTFOLIO_ITEMS, WHATSAPP_URL } from "@/lib/constants";
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
          className="relative overflow-hidden pt-32 sm:pt-36 pb-14 sm:pb-20"
          style={{ borderBottom: `1px solid ${border}` }}
        >
          {/* Background watermark — só desktop */}
          <span
            aria-hidden="true"
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none leading-none"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(6rem, 18vw, 18rem)",
              color: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.03)",
              letterSpacing: "-0.04em",
            }}
          >
            CASES
          </span>

          <div className="mx-auto px-5 sm:px-6 lg:px-8 relative z-10" style={{ maxWidth: "1320px" }}>
            {/* Back link */}
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); setLocation("/"); }}
              className="inline-flex items-center gap-2 mb-8 sm:mb-10 transition-colors duration-200 no-underline"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: textMuted,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D93E15")}
              onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar ao início
            </a>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-6 h-px flex-shrink-0" style={{ backgroundColor: "#D93E15" }} />
              <span
                className="uppercase"
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

            {/* H1 */}
            <h1
              className="m-0 mb-5"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: textPrimary,
                maxWidth: "42rem",
              }}
            >
              Cases de sucesso em{" "}
              <span style={{ color: "#D93E15" }}>segurança contra incêndio</span>.
            </h1>

            <p
              className="m-0"
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                lineHeight: 1.75,
                color: isDark ? "rgba(240,237,234,0.55)" : "rgba(15,15,15,0.55)",
                maxWidth: "36rem",
              }}
            >
              Projetos entregues com rigor técnico e aprovação total. Da consultoria inicial à emissão do AVCB, acompanhamos cada etapa para garantir conformidade e segurança.
            </p>

            {/* Stats rápidos */}
            <div
              className="flex flex-wrap gap-8 sm:gap-12 mt-8 sm:mt-10 pt-6 sm:pt-8"
              style={{ borderTop: `1px solid ${border}` }}
            >
              {[
                { value: "500+", label: "Projetos entregues" },
                { value: "100%", label: "Taxa de aprovação" },
                { value: "15+", label: "Anos de experiência" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="leading-none mb-1.5"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(1.5rem, 3vw, 1.75rem)",
                      color: "#D93E15",
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

        {/* ── Lista de cases ── */}
        <section
          aria-label="Lista de cases"
          itemScope
          itemType="https://schema.org/ItemList"
          className="py-12 sm:py-16"
          style={{ backgroundColor: bg }}
        >
          <div className="mx-auto px-5 sm:px-6 lg:px-8" style={{ maxWidth: "1320px" }}>
            <div
              className="flex flex-col"
              style={{ gap: "1px", backgroundColor: border }}
            >
              {PORTFOLIO_ITEMS.map((item, i) => (
                <Link key={item.id} href={`/portfolio/${item.slug}`}>
                  <article
                    itemScope
                    itemType="https://schema.org/CreativeWork"
                    itemProp="itemListElement"
                    className="cursor-pointer overflow-hidden group"
                    style={{ backgroundColor: surface }}
                  >
                    {/* Accent top line */}
                    <div
                      className="h-0.5 origin-left transition-transform duration-300"
                      style={{
                        backgroundColor: "#D93E15",
                        transform: "scaleX(0)",
                      }}
                      ref={(el) => {
                        if (!el) return;
                        const p = el.closest("article");
                        if (!p) return;
                        p.addEventListener("mouseenter", () => { el.style.transform = "scaleX(1)"; });
                        p.addEventListener("mouseleave", () => { el.style.transform = "scaleX(0)"; });
                      }}
                    />

                    {/* Layout: stack no mobile, split no md+ */}
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div
                        className="relative overflow-hidden flex-shrink-0 w-full md:w-64 lg:w-80 xl:w-96"
                        style={{ height: "clamp(200px, 45vw, 280px)" }}
                      >
                        <img
                          className="w-full h-full object-cover block transition-all duration-700"
                          src={item.image}
                          alt={`Case ${item.client} — ${item.service} em ${item.location} | Cavallini Assessoria`}
                          itemProp="image"
                          loading={i === 0 ? "eager" : "lazy"}
                          style={{ filter: "grayscale(100%)" }}
                          ref={(el) => {
                            if (!el) return;
                            const p = el.closest("article");
                            if (!p) return;
                            p.addEventListener("mouseenter", () => {
                              el.style.filter = "grayscale(0%)";
                              el.style.transform = "scale(1.03)";
                            });
                            p.addEventListener("mouseleave", () => {
                              el.style.filter = "grayscale(100%)";
                              el.style.transform = "scale(1)";
                            });
                          }}
                        />
                        {/* Number */}
                        <span
                          aria-hidden="true"
                          className="absolute bottom-3 left-4 pointer-events-none select-none leading-none"
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: "4.5rem",
                            color: "rgba(255,255,255,0.07)",
                          }}
                        >
                          {item.number}
                        </span>
                      </div>

                      {/* Content */}
                      <div
                        className="flex flex-col justify-between p-5 sm:p-6 lg:p-8 flex-1"
                        style={{ borderTop: `1px solid ${border}` }}
                      >
                        <div>
                          {/* Logo + segment */}
                          <div className="flex items-center gap-3 mb-4">
                            <img
                              src={item.logoSrc}
                              alt={`Logo ${item.client}`}
                              className="h-6 w-auto object-contain flex-shrink-0"
                              style={{
                                filter: isDark ? "invert(1) brightness(0.65)" : "brightness(0) opacity(0.45)",
                              }}
                            />
                            <span
                              className="flex-shrink-0"
                              style={{ width: "1px", height: "1.25rem", backgroundColor: border }}
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

                          <h2
                            itemProp="name"
                            className="m-0 mb-1"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontWeight: 500,
                              fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
                              letterSpacing: "-0.015em",
                              lineHeight: 1.2,
                              color: textPrimary,
                            }}
                          >
                            {item.client}
                          </h2>

                          <p
                            className="m-0 mb-3"
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "0.6rem",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "#D93E15",
                            }}
                          >
                            {item.service}
                          </p>

                          {/* Meta info */}
                          <div className="flex flex-wrap gap-4 sm:gap-6 mb-4">
                            {[
                              { Icon: MapPin, text: item.location },
                              { Icon: Calendar, text: item.year },
                              { Icon: Ruler, text: item.area },
                            ].map(({ Icon, text }) => (
                              <span
                                key={text}
                                className="inline-flex items-center gap-1.5"
                                style={{
                                  fontFamily: "'Urbanist', sans-serif",
                                  fontSize: "0.8rem",
                                  color: textMuted,
                                }}
                              >
                                <Icon className="w-3 h-3 flex-shrink-0" style={{ color: "#D93E15" }} />
                                {text}
                              </span>
                            ))}
                          </div>

                          <p
                            itemProp="description"
                            className="m-0 mb-4 hidden sm:block"
                            style={{
                              fontFamily: "'Urbanist', sans-serif",
                              fontWeight: 300,
                              fontSize: "0.875rem",
                              lineHeight: 1.7,
                              color: isDark ? "rgba(240,237,234,0.5)" : "rgba(15,15,15,0.55)",
                              maxWidth: "42rem",
                            }}
                          >
                            {item.challenge}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => (
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

                        {/* CTA */}
                        <div
                          className="mt-4 pt-4 sm:mt-5 sm:pt-5"
                          style={{ borderTop: `1px solid ${border}` }}
                        >
                          <span
                            className="inline-flex items-center gap-2"
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "0.65rem",
                              fontWeight: 500,
                              letterSpacing: "0.16em",
                              textTransform: "uppercase",
                              color: "#D93E15",
                            }}
                          >
                            Ver case completo
                            <ArrowRight className="w-3.5 h-3.5" />
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
          aria-label="Solicite sua avaliação"
          className="px-5 sm:px-6 lg:px-8 py-14 sm:py-16"
          style={{ backgroundColor: "#D93E15" }}
        >
          <div
            className="mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8"
            style={{ maxWidth: "1320px" }}
          >
            <div>
              <p
                className="m-0 mb-2"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Próximo case
              </p>
              <h2
                className="m-0"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.4rem, 3vw, 2.25rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                }}
              >
                Pode ser o seu projeto.
              </h2>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 no-underline transition-colors duration-200 flex-shrink-0"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#D93E15",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "0.875rem 1.75rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5F2EE")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            >
              Solicitar avaliação gratuita
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
