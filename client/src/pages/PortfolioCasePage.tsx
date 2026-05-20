/*
 * PortfolioCasePage — Página de detalhe de case /portfolio/:slug
 * Design: Split-screen (imagem | conteúdo) — mesmo padrão da ServicePage
 * SEO: H1 semântico, schema.org CreativeWork, meta description dinâmica
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

  // Navegação entre cases
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

      <main className="flex flex-col lg:flex-row min-h-screen w-full relative pt-[80px] lg:pt-0">
        {/* ── LEFT: Image Panel ── */}
        <div className="w-full lg:w-[45%] h-[50vh] lg:h-screen relative overflow-hidden z-10 shrink-0 lg:sticky lg:top-0">
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "transform 1s ease",
              transform: loaded ? "scale(1)" : "scale(1.08)",
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isDark
                ? "linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.6))"
                : "linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.4))",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />
          {/* Mobile gradient bottom */}
          <div
            className="lg:hidden"
            style={{
              position: "absolute",
              inset: 0,
              background: isDark
                ? "linear-gradient(to bottom, transparent, #000000)"
                : "linear-gradient(to bottom, transparent, #F5F2EE)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          {/* Client logo overlay */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
              textAlign: "center",
            }}
          >
            <img
              src={item.logoSrc}
              alt={`Logo ${item.client}`}
              style={{
                height: "3rem",
                width: "auto",
                objectFit: "contain",
                filter: "invert(1) brightness(0.9)",
                opacity: 0.7,
              }}
            />
          </div>

          {/* Number watermark */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "1.5rem",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(6rem, 15vw, 12rem)",
              lineHeight: 1,
              color: "rgba(255,255,255,0.05)",
              zIndex: 20,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {item.number}
          </span>
        </div>

        {/* ── RIGHT: Content Panel ── */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "3rem 2rem 4rem",
            overflowY: "auto",
            backgroundColor: surface,
          }}
          className="lg:w-[55%] lg:px-16 xl:px-20 lg:py-24"
        >
          {/* Back link */}
          <Link href="/portfolio">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: textMuted,
                cursor: "pointer",
                marginBottom: "2.5rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D93E15")}
              onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
            >
              <ArrowLeft style={{ width: "0.875rem", height: "0.875rem" }} />
              Todos os cases
            </span>
          </Link>

          {/* Eyebrow */}
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
              {item.segment} · {item.year}
            </span>
          </div>

          {/* H1 */}
          <h1
            itemProp="name"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: textPrimary,
              margin: "0 0 0.5rem",
            }}
          >
            {item.client}
          </h1>

          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#D93E15",
              margin: "0 0 2rem",
            }}
          >
            {item.service}
          </p>

          {/* Meta info */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              paddingBottom: "2rem",
              marginBottom: "2rem",
              borderBottom: `1px solid ${border}`,
            }}
          >
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
                  fontSize: "0.875rem",
                  color: textMuted,
                }}
              >
                <Icon style={{ width: "0.875rem", height: "0.875rem", color: "#D93E15", flexShrink: 0 }} />
                {text}
              </span>
            ))}
          </div>

          {/* Desafio */}
          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#D93E15",
                marginBottom: "0.75rem",
              }}
            >
              O desafio
            </h2>
            <p
              itemProp="description"
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontWeight: 300,
                fontSize: "0.9375rem",
                lineHeight: 1.75,
                color: isDark ? "rgba(240,237,234,0.6)" : "rgba(15,15,15,0.6)",
                margin: 0,
              }}
            >
              {item.challenge}
            </p>
          </div>

          {/* Solução */}
          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#D93E15",
                marginBottom: "0.75rem",
              }}
            >
              A solução
            </h2>
            <p
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontWeight: 300,
                fontSize: "0.9375rem",
                lineHeight: 1.75,
                color: isDark ? "rgba(240,237,234,0.6)" : "rgba(15,15,15,0.6)",
                margin: 0,
              }}
            >
              {item.solution}
            </p>
          </div>

          {/* Resultado */}
          <div
            style={{
              backgroundColor: isDark ? "rgba(217,62,21,0.06)" : "rgba(217,62,21,0.04)",
              border: `1px solid rgba(217,62,21,0.15)`,
              padding: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <CheckCircle
                style={{ width: "1.125rem", height: "1.125rem", color: "#D93E15", flexShrink: 0, marginTop: "0.125rem" }}
              />
              <div>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#D93E15",
                    marginBottom: "0.5rem",
                  }}
                >
                  Resultado
                </p>
                <p
                  style={{
                    fontFamily: "'Urbanist', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                    color: textPrimary,
                    margin: 0,
                  }}
                >
                  {item.result}
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "2.5rem" }}>
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
                  padding: "0.25rem 0.625rem",
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
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              backgroundColor: "#D93E15",
              color: "#FFFFFF",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "1rem 2rem",
              textDecoration: "none",
              alignSelf: "flex-start",
              transition: "background-color 0.2s",
              marginBottom: "3rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B83310")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D93E15")}
          >
            Quero um projeto como este
            <ArrowRight style={{ width: "0.875rem", height: "0.875rem" }} />
          </a>

          {/* Navegação entre cases */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "2rem",
              borderTop: `1px solid ${border}`,
              gap: "1rem",
            }}
          >
            {prevItem ? (
              <Link href={`/portfolio/${prevItem.slug}`}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: textMuted,
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#D93E15")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
                >
                  <ArrowLeft style={{ width: "0.75rem", height: "0.75rem" }} />
                  {prevItem.client}
                </span>
              </Link>
            ) : <span />}

            {nextItem ? (
              <Link href={`/portfolio/${nextItem.slug}`}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: textMuted,
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#D93E15")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
                >
                  {nextItem.client}
                  <ArrowRight style={{ width: "0.75rem", height: "0.75rem" }} />
                </span>
              </Link>
            ) : <span />}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
