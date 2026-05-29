/*
 * StatsSection — Ticker faixa compacta
 * Design: Faixa fina (40px) com dados em loop infinito para a esquerda.
 * Elegância e sutileza: fonte mono pequena, separadores em laranja, sem ruído visual.
 */
import { useTheme } from "@/contexts/ThemeContext";

const ITEMS = [
  { value: "10+",   label: "Anos de Experiência" },
  { value: "200+",  label: "Projetos Aprovados"  },
  { value: "100%",  label: "Foco em Aprovação"   },
  { value: "360°",  label: "Assessoria Completa" },
];

// Duplicamos 4× para garantir loop contínuo sem gap
const TICKER = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

export default function StatsSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bg    = isDark ? "#0D0D0D"              : "#EFECE8";
  const border = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const valCol = "#D93E15";
  const lblCol = isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)";
  const sepCol = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";

  return (
    <section
      aria-label="Números da Cavallini Assessoria"
      style={{
        backgroundColor: bg,
        borderTop:    `1px solid ${border}`,
        borderBottom: `1px solid ${border}`,
        overflow: "hidden",
        height: "40px",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Accent line no topo */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "1.5px", backgroundColor: valCol, opacity: 0.7,
      }} />

      {/* Gradiente fade nas bordas */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
        background: `linear-gradient(to right, ${bg}, transparent)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
        background: `linear-gradient(to left, ${bg}, transparent)`,
        pointerEvents: "none",
      }} />

      {/* Ticker */}
      <div
        className="ticker-track"
        style={{
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          willChange: "transform",
          animation: "ticker-scroll 28s linear infinite",
        }}
      >
        {TICKER.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              paddingRight: "2.8rem",
            }}
          >
            {/* Separador */}
            <span style={{
              display: "inline-block",
              width: "3px", height: "3px",
              borderRadius: "50%",
              backgroundColor: valCol,
              opacity: 0.6,
              flexShrink: 0,
            }} />

            {/* Valor */}
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.04em",
              color: valCol,
            }}>
              {item.value}
            </span>

            {/* Label */}
            <span style={{
              fontFamily: "'Urbanist', sans-serif",
              fontWeight: 500,
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: lblCol,
            }}>
              {item.label}
            </span>

            {/* Divisor vertical */}
            <span style={{
              display: "inline-block",
              width: "1px", height: "14px",
              backgroundColor: sepCol,
              marginLeft: "1.4rem",
              flexShrink: 0,
            }} />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
