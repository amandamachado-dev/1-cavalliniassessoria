/*
 * PartnersSection — Logos de parceiros
 * Design: Fundo branco puro (light) / preto profundo (dark) — contraste máximo com a página.
 * Grid editorial com células separadas por bordas sutis.
 * Logos sempre visíveis, sem dependência de IntersectionObserver.
 */
import { PARTNER_LOGOS } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function PartnersSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

  // Contraste deliberado com o fundo da página
  const bg = isDark ? "#000000" : "#FFFFFF";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";
  const textPrimary = isDark ? "#F0EDEA" : "#0F0F0F";
  const textMuted = isDark ? "rgba(240,237,234,0.35)" : "rgba(15,15,15,0.4)";

  return (
    <section
      aria-label="Parceiros e Clientes"
      style={{
        backgroundColor: bg,
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        padding: "5rem 1.25rem 4.5rem",
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "3.5rem",
          }}
        >
          <div>
            <div className={`reveal-left ${headerVisible ? "visible" : ""}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
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
                Parceiros
              </span>
            </div>
            <h2
              className={`reveal reveal-delay-2 ${headerVisible ? "visible" : ""}`}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: textPrimary,
                margin: 0,
              }}
            >
              Quem confia na{" "}
              <span style={{ color: "#D93E15" }}>Cavallini</span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: textMuted,
              margin: 0,
            }}
          >
            Clientes em diversas regiões do Brasil
          </p>
        </div>

        {/* Logos Grid */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            borderTop: `1px solid ${borderColor}`,
            borderLeft: `1px solid ${borderColor}`,
          }}
        >
          {PARTNER_LOGOS.map((logo, i) => (
            <div
              key={logo.name}
              className={`reveal ${["reveal-delay-1","reveal-delay-2","reveal-delay-3","reveal-delay-4","reveal-delay-5","reveal-delay-6","reveal-delay-7","reveal-delay-8"][i % 8]} ${gridVisible ? "visible" : ""}`}
            >
              <LogoCell
                name={logo.name}
                src={logo.src}
                isDark={isDark}
                borderColor={borderColor}
                bg={bg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoCell({
  name,
  src,
  isDark,
  borderColor,
  bg,
}: {
  name: string;
  src: string;
  isDark: boolean;
  borderColor: string;
  bg: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const cellRef = useRef<HTMLDivElement>(null);

  // No dark mode: logos em branco (invert). No light mode: logos em preto (brightness 0).
  // Ambos com boa opacidade para serem claramente visíveis.
  const defaultFilter = isDark
    ? "grayscale(100%) brightness(0) invert(1)"
    : "grayscale(100%) brightness(0)";
  const defaultOpacity = "0.65";

  const handleEnter = () => {
    if (imgRef.current) {
      imgRef.current.style.filter = "none";
      imgRef.current.style.opacity = "1";
    }
    if (cellRef.current) {
      cellRef.current.style.backgroundColor = isDark
        ? "rgba(255,255,255,0.04)"
        : "rgba(0,0,0,0.03)";
    }
  };

  const handleLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.filter = defaultFilter;
      imgRef.current.style.opacity = defaultOpacity;
    }
    if (cellRef.current) {
      cellRef.current.style.backgroundColor = "transparent";
    }
  };

  return (
    <div
      ref={cellRef}
      title={name}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2.5rem 1.75rem",
        borderRight: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        cursor: "default",
        backgroundColor: "transparent",
        transition: "background-color 0.2s ease",
        minHeight: "100px",
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={`Logo ${name}`}
        loading="lazy"
        style={{
          width: "100%",
          height: "2.5rem",
          objectFit: "contain",
          filter: defaultFilter,
          opacity: defaultOpacity,
          transition: "filter 0.3s ease, opacity 0.3s ease",
          maxWidth: "120px",
          display: "block",
        }}
      />
    </div>
  );
}
