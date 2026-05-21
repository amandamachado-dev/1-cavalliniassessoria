/*
 * PortfolioCasePage — Página de detalhe de case /portfolio/:slug
 * Design: Split-screen desktop (imagem | conteúdo) → stack mobile
 * SEO: H1 semântico, schema.org CreativeWork, meta description dinâmica
 * Responsive: mobile-first, breakpoints lg(1024)
 * Palette: #D93E15 (brand), #0A0A0A (dark), #F5F2EE (light)
 */
import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "wouter";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Ruler, CheckCircle } from "lucide-react";
import { PORTFOLIO_ITEMS, WHATSAPP_URL } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function PortfolioCasePage() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const { theme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  const item = PORTFOLIO_ITEMS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    if (!item) return;
    document.title = `${item.client} — Case de Segurança Contra Incêndio | Cavallini Assessoria`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        `Case Cavallini Assessoria: ${item.service} para ${item.client} em ${item.location}. ${item.result}`
      );
    }
    return () => {
      document.title = "Cavallini Assessoria | Engenharia de Combate a Incêndio — AVCB, Projetos e Execução";
    };
  }, [item]);

  if (!item) {
    setLocation("/404");
    return null;
  }

  const isDark = theme === "dark";
  const bg = isDark ? "#000000" : "#F5F2EE";
  const surface = isDark ? "#0A0A0A" : "#FFFFFF";
  const textPrimary = isDark ? "#F0EDEA" : "#0F0F0F";
  const textMuted = isDark ? "rgba(240,237,234,0.4)" : "rgba(15,15,15,0.4)";
  const border = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";

  const currentIndex = PORTFOLIO_ITEMS.findIndex((p) => p.slug === slug);
  const prevItem = currentIndex > 0 ? PORTFOLIO_ITEMS[currentIndex - 1] : null;
  const nextItem = currentIndex < PORTFOLIO_ITEMS.length - 1 ? PORTFOLIO_ITEMS[currentIndex + 1] : null;

  return (
    <div
      itemScope
      itemType="https://schema.org/CreativeWork"
      style={{ minHeight: "100vh", backgroundColor: bg }}
    >
      <Navbar />

      <main>
        {/* ── Layout split: imagem topo no mobile, lateral no desktop ── */}
        <div className="flex flex-col lg:flex-row w-full pt-[72px] lg:pt-0" style={{ minHeight: "100vh" }}>

          {/* ── Image Panel ── */}
          <div
            className="case-img-panel w-full lg:w-[42%] relative overflow-hidden flex-shrink-0 lg:sticky lg:top-0 lg:self-start"
            style={{ height: "clamp(220px, 50vw, 420px)", minHeight: "220px" }}
          >
            {/* Desktop: full height via CSS */}
            <style>{`@media (min-width: 1024px) { .case-img-panel { height: 100vh !important; min-height: 100vh !important; } }`}</style>
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
              style={{
                backgroundImage: `url(${item.image})`,
                transform: loaded ? "scale(1)" : "scale(1.08)",
              }}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: isDark
                  ? "linear-gradient(to right, rgba(0,0,0,0.15), rgba(0,0,0,0.55))"
                  : "linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.4))",
              }}
            />
            {/* Mobile: gradient bottom */}
            <div
              className="absolute inset-0 z-10 pointer-events-none lg:hidden"
              style={{
                background: isDark
                  ? "linear-gradient(to bottom, transparent 40%, #000000)"
                  : "linear-gradient(to bottom, transparent 40%, #F5F2EE)",
              }}
            />

            {/* Client logo overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <img
                src={item.logoSrc}
                alt={`Logo ${item.client}`}
                className="h-10 sm:h-12 w-auto object-contain"
                style={{ filter: "invert(1) brightness(0.9)", opacity: 0.65 }}
              />
            </div>

            {/* Number watermark — só desktop */}
            <span
              aria-hidden="true"
              className="hidden lg:block absolute bottom-6 left-6 z-20 pointer-events-none select-none leading-none"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(6rem, 12vw, 10rem)",
                color: "rgba(255,255,255,0.05)",
              }}
            >
              {item.number}
            </span>
          </div>

          {/* ── Content Panel ── */}
          <div
            className="flex-1 flex flex-col justify-center px-5 sm:px-8 lg:px-14 xl:px-20 py-10 lg:py-20 overflow-y-auto"
            style={{ backgroundColor: surface }}
          >
            {/* Back link */}
            <Link href="/portfolio">
              <span
                className="inline-flex items-center gap-2 mb-8 cursor-pointer transition-colors duration-200"
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
                Todos os cases
              </span>
            </Link>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
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
                {item.segment} · {item.year}
              </span>
            </div>

            {/* H1 */}
            <h1
              itemProp="name"
              className="m-0 mb-2"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: textPrimary,
              }}
            >
              {item.client}
            </h1>

            <p
              className="m-0 mb-6"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#D93E15",
              }}
            >
              {item.service}
            </p>

            {/* Meta info */}
            <div
              className="flex flex-wrap gap-4 sm:gap-6 pb-6 mb-6"
              style={{ borderBottom: `1px solid ${border}` }}
            >
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
                    fontSize: "0.875rem",
                    color: textMuted,
                  }}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#D93E15" }} />
                  {text}
                </span>
              ))}
            </div>

            {/* Desafio */}
            <div className="mb-6">
              <h2
                className="m-0 mb-3"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#D93E15",
                }}
              >
                O desafio
              </h2>
              <p
                itemProp="description"
                className="m-0"
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(0.875rem, 1.2vw, 0.9375rem)",
                  lineHeight: 1.75,
                  color: isDark ? "rgba(240,237,234,0.6)" : "rgba(15,15,15,0.6)",
                }}
              >
                {item.challenge}
              </p>
            </div>

            {/* Solução */}
            <div className="mb-6">
              <h2
                className="m-0 mb-3"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#D93E15",
                }}
              >
                A solução
              </h2>
              <p
                className="m-0"
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(0.875rem, 1.2vw, 0.9375rem)",
                  lineHeight: 1.75,
                  color: isDark ? "rgba(240,237,234,0.6)" : "rgba(15,15,15,0.6)",
                }}
              >
                {item.solution}
              </p>
            </div>

            {/* Resultado */}
            <div
              className="flex gap-3 p-4 sm:p-5 mb-6"
              style={{
                backgroundColor: isDark ? "rgba(217,62,21,0.06)" : "rgba(217,62,21,0.04)",
                border: "1px solid rgba(217,62,21,0.15)",
              }}
            >
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#D93E15" }} />
              <div>
                <p
                  className="m-0 mb-2"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#D93E15",
                  }}
                >
                  Resultado
                </p>
                <p
                  className="m-0"
                  style={{
                    fontFamily: "'Urbanist', sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(0.85rem, 1.1vw, 0.9rem)",
                    lineHeight: 1.65,
                    color: textPrimary,
                  }}
                >
                  {item.result}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-8">
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
                    padding: "0.25rem 0.55rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 self-start no-underline transition-colors duration-200 mb-10"
              style={{
                backgroundColor: "#D93E15",
                color: "#FFFFFF",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "0.875rem 1.75rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B83310")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D93E15")}
            >
              Quero um projeto como este
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Navegação entre cases */}
            <div
              className="flex justify-between items-center pt-6 gap-4"
              style={{ borderTop: `1px solid ${border}` }}
            >
              {prevItem ? (
                <Link href={`/portfolio/${prevItem.slug}`}>
                  <span
                    className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: textMuted,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#D93E15")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
                  >
                    <ArrowLeft className="w-3 h-3 flex-shrink-0" />
                    <span className="hidden sm:inline">{prevItem.client}</span>
                    <span className="sm:hidden">Anterior</span>
                  </span>
                </Link>
              ) : <span />}

              {nextItem ? (
                <Link href={`/portfolio/${nextItem.slug}`}>
                  <span
                    className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: textMuted,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#D93E15")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
                  >
                    <span className="hidden sm:inline">{nextItem.client}</span>
                    <span className="sm:hidden">Próximo</span>
                    <ArrowRight className="w-3 h-3 flex-shrink-0" />
                  </span>
                </Link>
              ) : <span />}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
