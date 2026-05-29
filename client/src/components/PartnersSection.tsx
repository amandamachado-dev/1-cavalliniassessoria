/*
 * PartnersSection — Logos de parceiros
 * Design: Dois níveis — destaque para F1, Coco Bambu e COP30 (linha principal),
 * demais parceiros em linha secundária compacta.
 * Fundo contraste com a página. Hover colorido. Elegante e sem exagero.
 */
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Logos em destaque — maiores, primeira linha
const FEATURED = [
  { name: "Fórmula 1 — GP Brasil", src: "/manus-storage/f1-logo_f600a2bc.png" },
  { name: "Coco Bambu", src: "/manus-storage/coco-bambu-clean_818d0f37.png" },
  { name: "COP30", src: "/manus-storage/cop30-logo_3e7fc7df.png" },
];

// Logos secundários — menores, segunda linha
const SECONDARY = [
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
  const textMuted = isDark ? "rgba(240,237,234,0.35)" : "rgba(15,15,15,0.4)";
  const dividerColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)";

  const logoFilter = isDark
    ? "grayscale(100%) brightness(0) invert(1)"
    : "grayscale(100%) brightness(0)";

  return (
    <section
      aria-label="Parceiros e Clientes"
      style={{
        backgroundColor: bg,
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        padding: "3.5rem 1.25rem 3rem",
      }}
    >
      <div ref={sectionRef} style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header compacto */}
        <div
          className={`reveal ${isVisible ? "visible" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ width: "1.25rem", height: "1px", backgroundColor: "#D93E15", flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.625rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#D93E15",
              }}
            >
              Parceiros
            </span>
          </div>
          <span
            style={{
              width: "1px",
              height: "1rem",
              backgroundColor: dividerColor,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
              letterSpacing: "-0.02em",
              color: textPrimary,
            }}
          >
            Quem confia na <span style={{ color: "#D93E15" }}>Cavallini</span>
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: textMuted,
              display: "none",
            }}
            className="md:block"
          >
            Todo o Brasil
          </span>
        </div>

        {/* Linha de destaque — F1, Coco Bambu, COP30 */}
        <div
          className={`reveal reveal-delay-2 ${isVisible ? "visible" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
            borderTop: `1px solid ${borderColor}`,
            borderLeft: `1px solid ${borderColor}`,
            marginBottom: "0",
          }}
        >
          {FEATURED.map((logo, i) => (
            <FeaturedLogo
              key={logo.name}
              name={logo.name}
              src={logo.src}
              isDark={isDark}
              borderColor={borderColor}
              logoFilter={logoFilter}
              delay={i}
            />
          ))}
        </div>

        {/* Divisor com label */}
        <div
          className={`reveal reveal-delay-3 ${isVisible ? "visible" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "0.75rem 0",
            borderLeft: `1px solid ${borderColor}`,
            borderRight: `1px solid ${borderColor}`,
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: textMuted,
              whiteSpace: "nowrap",
            }}
          >
            E também
          </span>
          <span style={{ flex: 1, height: "1px", backgroundColor: dividerColor }} />
        </div>

        {/* Linha secundária — demais logos */}
        <div
          className={`reveal reveal-delay-4 ${isVisible ? "visible" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            borderLeft: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          {SECONDARY.map((logo, i) => (
            <SecondaryLogo
              key={logo.name}
              name={logo.name}
              src={logo.src}
              isDark={isDark}
              borderColor={borderColor}
              logoFilter={logoFilter}
              delay={i}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── Logo em destaque (linha principal) ─── */
function FeaturedLogo({
  name, src, isDark, borderColor, logoFilter, delay,
}: {
  name: string; src: string; isDark: boolean; borderColor: string; logoFilter: string; delay: number;
}) {
  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img") as HTMLImageElement;
    if (img) { img.style.filter = "none"; img.style.opacity = "1"; }
    e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  };
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img") as HTMLImageElement;
    if (img) { img.style.filter = logoFilter; img.style.opacity = "0.7"; }
    e.currentTarget.style.backgroundColor = "transparent";
  };

  return (
    <div
      title={name}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        flex: "1 1 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 2.5rem",
        borderRight: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        minHeight: "90px",
        cursor: "default",
        backgroundColor: "transparent",
        transition: "background-color 0.25s ease",
      }}
    >
      <img
        src={src}
        alt={`Logo ${name}`}
        loading="eager"
        style={{
          width: "100%",
          maxWidth: "130px",
          height: "2.75rem",
          objectFit: "contain",
          filter: logoFilter,
          opacity: 0,
          transition: "filter 0.3s ease, opacity 0.5s ease",
          display: "block",
        }}
        onLoad={(e) => { e.currentTarget.style.opacity = "0.7"; }}
      />
    </div>
  );
}

/* ─── Logo secundário (linha de apoio) ─── */
function SecondaryLogo({
  name, src, isDark, borderColor, logoFilter,
}: {
  name: string; src: string; isDark: boolean; borderColor: string; logoFilter: string; delay: number;
}) {
  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img") as HTMLImageElement;
    if (img) { img.style.filter = "none"; img.style.opacity = "1"; }
    e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  };
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img") as HTMLImageElement;
    if (img) { img.style.filter = logoFilter; img.style.opacity = "0.5"; }
    e.currentTarget.style.backgroundColor = "transparent";
  };

  return (
    <div
      title={name}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        flex: "1 1 100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem 1.5rem",
        borderRight: `1px solid ${borderColor}`,
        borderTop: `1px solid ${borderColor}`,
        minHeight: "64px",
        cursor: "default",
        backgroundColor: "transparent",
        transition: "background-color 0.25s ease",
      }}
    >
      <img
        src={src}
        alt={`Logo ${name}`}
        loading="lazy"
        style={{
          width: "100%",
          maxWidth: "90px",
          height: "1.75rem",
          objectFit: "contain",
          filter: logoFilter,
          opacity: 0,
          transition: "filter 0.3s ease, opacity 0.5s ease",
          display: "block",
        }}
        onLoad={(e) => { e.currentTarget.style.opacity = "0.5"; }}
      />
    </div>
  );
}
