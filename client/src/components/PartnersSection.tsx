/*
 * PartnersSection — Grade única de logos de parceiros
 * Design: Grid simples sem divisão — 3 colunas no mobile, 4 no desktop.
 * F1, Coco Bambu e COP30 primeiro. Logos grayscale com hover colorido.
 * Sem linhas divisórias entre featured e secundários.
 */
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
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  const bg = isDark ? "#0A0A0A" : "#F8F6F3";
  const borderColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const textPrimary = isDark ? "#F0EDEA" : "#0F0F0F";

  // Logos: grayscale com boa opacidade para serem bem visíveis
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
          className={`reveal reveal-delay-2 partners-grid ${isVisible ? "visible" : ""}`}
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
              total={ALL_LOGOS.length}
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

function LogoCell({
  name, src, isDark, borderColor, logoFilter, index, total,
}: {
  name: string;
  src: string;
  isDark: boolean;
  borderColor: string;
  logoFilter: string;
  index: number;
  total: number;
}) {
  const hoverBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img") as HTMLImageElement;
    if (img) {
      img.style.filter = "none";
      img.style.opacity = "1";
    }
    e.currentTarget.style.backgroundColor = hoverBg;
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img") as HTMLImageElement;
    if (img) {
      img.style.filter = logoFilter;
      img.style.opacity = isDark ? "0.85" : "0.75";
    }
    e.currentTarget.style.backgroundColor = "transparent";
  };

  return (
    <div
      title={name}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.75rem 1.5rem",
        borderRight: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        minHeight: "80px",
        cursor: "default",
        backgroundColor: "transparent",
        transition: "background-color 0.25s ease",
      }}
    >
      <img
        src={src}
        alt={`Logo ${name}`}
        loading={index < 6 ? "eager" : "lazy"}
        style={{
          width: "100%",
          maxWidth: "110px",
          height: "2.25rem",
          objectFit: "contain",
          filter: logoFilter,
          opacity: 0,
          transition: "filter 0.3s ease, opacity 0.5s ease",
          display: "block",
        }}
        onLoad={(e) => {
          e.currentTarget.style.opacity = isDark ? "0.85" : "0.75";
        }}
      />
    </div>
  );
}
