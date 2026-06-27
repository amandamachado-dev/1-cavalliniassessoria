/*
 * CTASection — Bloco de conversão intermediário
 * Design: Fundo laranja sólido. Sem ornamentos. Layout horizontal limpo.
 * Animação: IntersectionObserver no container — texto da esquerda, botão da direita.
 */
import { ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const WHATSAPP = "https://wa.me/5511954004989?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20diagn%C3%B3stico%20gratuito%20para%20meu%20estabelecimento.";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Solicite sua avaliação gratuita"
      style={{
        backgroundColor: "#D93E15",
        padding: "4.5rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2.5rem",
        }}
      >
        {/* Text */}
        <div
          style={{
            flex: "1 1 380px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0px)" : "translateX(-80px)",
            transition: "opacity 0.95s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.95s cubic-bezier(0.16,1,0.3,1) 0s",
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "0.75rem",
            }}
          >
            Avaliação gratuita
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#FFFFFF",
              margin: "0 0 0.75rem 0",
            }}
          >
            Seu estabelecimento está regularizado?
          </h2>
          <p
            style={{
              fontFamily: "'Urbanist', sans-serif",
              fontWeight: 300,
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Evite multas, interdições e riscos. Fale com um especialista agora.
          </p>
        </div>

        {/* CTA Button */}
        <div
          style={{
            flexShrink: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0px)" : "translateX(80px)",
            transition: "opacity 0.95s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.95s cubic-bezier(0.16,1,0.3,1) 0.25s",
          }}
        >
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar avaliação gratuita via WhatsApp"
            className="inline-flex items-center gap-2.5 group"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#D93E15",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              padding: "1rem 2rem",
              textDecoration: "none",
              transition: "background-color 0.2s ease, color 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F5F2EE";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FFFFFF";
            }}
          >
            Solicitar avaliação
            <ArrowRight style={{ width: "0.875rem", height: "0.875rem" }} />
          </a>
        </div>
      </div>
    </section>
  );
}
