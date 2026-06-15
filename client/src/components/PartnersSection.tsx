/*
 * PartnersSection — Grade única de logos de parceiros
 * Design: Grid simples — 3 colunas mobile / 4 desktop.
 * Cada célula tem seu próprio IntersectionObserver: anima individualmente
 * ao entrar no viewport, com delay sequencial (index × 80ms).
 */
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Ordem: destaques primeiro, depois os demais
const ALL_LOGOS = [
  { name: "Fórmula 1 — GP Brasil", src: "/manus-storage/f1-logo_f600a2bc.png" },
  { name: "Coco Bambu", src: "/manus-storage/coco-bambu-clean_818d0f37.png" },
  { name: "COP30", src: "/manus-storage/cop30-logo_3e7fc7df.png" },
  { name: "GL Events", src: "/manus-storage/gl-events-logo_c85a7e17.png" },
  { name: "MD", src: "/manus-storage/md-logo_e81ff46d.png" },
  { name: "Goya Perfumaria", src: "/manus-storage/goya-logo_70567333.png" },
  { name: "Pontuall", src: "/manus-storage/pontuall-clean_c6e2a96b.png" },
  { name: "Parceiro 1", src: "/manus-storage/parceiro-1_f08161cb.png" },
  { name: "Parceiro 2", src: "/manus-storage/parceiro-2_c4923d46.png" },
  { name: "Parceiro 3", src: "/manus-storage/parceiro-3_757615aa.png" },
  { name: "Parceiro 4", src: "/manus-storage/parceiro-4_5401ae06.png" },
];

export default function PartnersSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

  const bg = isDark ? "#0A0A0A" : "#F8F6F3";
  const borderColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const textPrimary = isDark ? "#F0EDEA" : "#0F0F0F";

  const logoFilter = isDark
    ? "grayscale(100%) brightness(0) invert(1)"
    : "grayscale(100%) brightness(0.15)";

  return (
    <section
      aria-label="Parceiros e Clientes"
      style={{
        backgroundColor: bg,
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        padding: "3rem 1.25rem 2.75rem",
      }}
    >
      <div ref={sectionRef} style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header compacto */}
        <div
          className={`reveal ${isVisible ? "visible" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2.25rem",
          }}
        >
          <span style={{
            width: "1.25rem",
            height: "1px",
            backgroundColor: "#D93E15",
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.625rem",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "#D93E15",
          }}>
            Parceiros
          </span>
          <span style={{
            width: "1px",
            height: "1rem",
            backgroundColor: borderColor,
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(0.9rem, 1.6vw, 1.15rem)",
            letterSpacing: "-0.02em",
            color: textPrimary,
          }}>
            Quem confia na <span style={{ color: "#D93E15" }}>Cavallini</span>
          </span>
        </div>

        {/* Grade única — 3 colunas mobile / 4 colunas desktop */}
        <div
          className="partners-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
            border: `1px solid ${borderColor}`,
          }}
        >
          {ALL_LOGOS.map((logo, i) => (
            <LogoCell
              key={logo.name}
              name={logo.name}
              src={logo.src}
              isDark={isDark}
              borderColor={borderColor}
              logoFilter={logoFilter}
              index={i}
            />
          ))}
        </div>

        {/* CSS responsivo para 4 colunas no desktop */}
        <style>{`
          @media (min-width: 768px) {
            .partners-grid {
              grid-template-columns: repeat(4, 1fr) !important;
            }
          }
        `}</style>

      </div>
    </section>
  );
}

/* ─── Célula individual com IntersectionObserver próprio ─── */
function LogoCell({
  name, src, isDark, borderColor, logoFilter, index,
}: {
  name: string;
  src: string;
  isDark: boolean;
  borderColor: string;
  logoFilter: string;
  index: number;
}) {
  const cellRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const hoverBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";

  // Observer individual — dispara quando a célula entra no viewport
  useEffect(() => {
    const el = cellRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay por posição na linha: desktop 4 cols, mobile 3 cols
          const cols = window.innerWidth >= 768 ? 4 : 3;
          const posInRow = index % cols;
          const timer = setTimeout(() => setVisible(true), posInRow * 80);
          observer.disconnect();
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img") as HTMLImageElement;
    if (img) { img.style.filter = "none"; img.style.opacity = "1"; }
    e.currentTarget.style.backgroundColor = hoverBg;
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img") as HTMLImageElement;
    if (img) { img.style.filter = logoFilter; img.style.opacity = isDark ? "0.85" : "0.75"; }
    e.currentTarget.style.backgroundColor = "transparent";
  };

  // Estado da célula: invisível → desliza para cima e aparece
  const cellStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.75rem 1.5rem",
    borderRight: `1px solid ${borderColor}`,
    borderBottom: `1px solid ${borderColor}`,
    minHeight: "80px",
    cursor: "default",
    backgroundColor: "transparent",
    transition: "background-color 0.25s ease, opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
  };

  return (
    <div
      ref={cellRef}
      title={name}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={cellStyle}
    >
      <img
        src={src}
        alt={`Logo ${name}`}
        loading={index < 6 ? "eager" : "lazy"}
        style={{
          width: "100px",
          height: "40px",
          objectFit: "contain",
          filter: logoFilter,
          opacity: imgLoaded ? (isDark ? 0.85 : 0.75) : 0,
          transition: "filter 0.3s ease, opacity 0.4s ease",
          display: "block",
        }}
        onLoad={() => setImgLoaded(true)}
      />
    </div>
  );
}
