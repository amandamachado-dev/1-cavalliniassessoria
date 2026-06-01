/*
 * AboutSection — Quem Somos
 * Design: Split layout. Text left, image right. No rounded corners.
 * Animação: IntersectionObserver individual — texto da esquerda, imagem da direita.
 */
import { ASSETS } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";
import { useRef, useEffect, useState } from "react";

function useElementReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

export default function AboutSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const textReveal = useElementReveal<HTMLDivElement>();
  const imgReveal = useElementReveal<HTMLDivElement>();

  return (
    <section
      id="quem-somos"
      className="relative py-24 md:py-32"
      style={{
        backgroundColor: isDark ? "#0A0A0A" : "#F5F2EE",
        borderTop: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.07)",
      }}
      aria-label="Quem Somos"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Text */}
          <div
            ref={textReveal.ref}
            className="space-y-8"
            style={{
              opacity: textReveal.visible ? 1 : 0,
              transform: textReveal.visible ? "translateX(0px)" : "translateX(-80px)",
              transition: "opacity 0.95s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.95s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#D93E15] flex-shrink-0" />
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
                Quem Somos
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: isDark ? "#F0EDEA" : "#0F0F0F",
                margin: 0,
              }}
            >
              Engenharia de combate a incêndio com{" "}
              <span style={{ color: "#D93E15" }}>rigor técnico</span>{" "}
              e visão estratégica.
            </h2>

            {/* Body */}
            <div className="space-y-4">
              <p
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: isDark ? "rgba(240,237,234,0.65)" : "rgba(15,15,15,0.65)",
                  margin: 0,
                }}
              >
                A Cavallini Assessoria é especializada em soluções completas de segurança
                contra incêndio. Atuamos com foco em resultados — da consultoria inicial
                à execução e aprovação final junto ao Corpo de Bombeiros.
              </p>
              <p
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: isDark ? "rgba(240,237,234,0.5)" : "rgba(15,15,15,0.5)",
                  margin: 0,
                }}
              >
                Nossa equipe de engenheiros e técnicos qualificados garante que cada
                projeto seja conduzido com o mais alto padrão de qualidade, cumprindo
                rigorosamente todas as normas e regulamentações vigentes.
              </p>
            </div>

            {/* Quote */}
            <blockquote
              style={{
                borderLeft: "2px solid #D93E15",
                paddingLeft: "1.25rem",
                margin: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  color: isDark ? "rgba(240,237,234,0.8)" : "rgba(15,15,15,0.8)",
                  margin: 0,
                }}
              >
                "Segurança não se promete. Se comprova."
              </p>
              <cite
                style={{
                  display: "block",
                  marginTop: "0.5rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  fontStyle: "normal",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isDark ? "rgba(240,237,234,0.3)" : "rgba(15,15,15,0.35)",
                }}
              >
                — Cavallini Assessoria
              </cite>
            </blockquote>
          </div>

          {/* Right — Image */}
          <div
            ref={imgReveal.ref}
            style={{
              opacity: imgReveal.visible ? 1 : 0,
              transform: imgReveal.visible ? "translateX(0px)" : "translateX(80px)",
              transition: "opacity 0.95s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.95s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img
                src={ASSETS.tresImgPeb}
                alt="Equipe Cavallini em campo realizando vistoria técnica"
                className="w-full h-full object-cover"
                style={{
                  filter: "grayscale(100%)",
                  transition: "opacity 0.6s ease, filter 0.6s ease",
                  opacity: 0,
                }}
                loading="eager"
                onLoad={(e) => { e.currentTarget.style.opacity = "1"; }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
              />
              {/* Subtle overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: isDark
                    ? "linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.5) 100%)"
                    : "linear-gradient(to bottom, transparent 60%, rgba(245,242,238,0.4) 100%)",
                }}
              />
            </div>
            {/* Caption */}
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: isDark ? "rgba(240,237,234,0.25)" : "rgba(15,15,15,0.3)",
                marginTop: "0.75rem",
                paddingLeft: "0.25rem",
              }}
            >
              Equipe técnica em campo — vistoria e execução
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
