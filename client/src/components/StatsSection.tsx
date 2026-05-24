/*
 * StatsSection — Métricas de impacto
 * Design: Faixa horizontal, 4 números grandes, dividers verticais sutis.
 * Sem borda dupla laranja. Linha única de acento no topo.
 */
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const STATS = [
  { value: 10, suffix: "+", label: "Anos de Experiência" },
  { value: 200, suffix: "+", label: "Projetos Aprovados" },
  { value: 100, suffix: "%", label: "Foco em Aprovação" },
  { value: 360, suffix: "°", label: "Assessoria Completa" },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const timer = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (frame >= totalFrames) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function StatItem({ value, suffix, label, active, isLast, delayClass }: {
  value: number; suffix: string; label: string; active: boolean; isLast: boolean; delayClass: string;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const count = useCountUp(value, 1600, active);

  return (
    <div
      className={`flex-1 flex flex-col items-center justify-center py-10 px-6 text-center min-w-[140px] reveal ${delayClass} ${active ? "visible" : ""}`}
      style={{
        borderRight: isLast
          ? "none"
          : isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.07)",
      }}
    >
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
          lineHeight: 1,
          letterSpacing: "-0.025em",
          color: "#D93E15",
          marginBottom: "0.5rem",
        }}
      >
        {count}
        <span style={{ fontSize: "0.55em", fontWeight: 600 }}>{suffix}</span>
      </div>
      <p
        style={{
          fontFamily: "'Urbanist', sans-serif",
          fontWeight: 500,
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
          margin: 0,
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Fallback: se já está visível na carga inicial, ativa imediatamente
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Números da Cavallini Assessoria"
      style={{
        backgroundColor: isDark ? "#0D0D0D" : "#EFECE8",
        borderTop: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.07)",
        borderBottom: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.07)",
      }}
    >
      {/* Accent line */}
      <div style={{ height: "2px", backgroundColor: "#D93E15" }} />

      <div className="max-w-[1320px] mx-auto flex flex-wrap">
        {STATS.map((s, i) => (
          <StatItem
            key={s.label}
            value={s.value}
            suffix={s.suffix}
            label={s.label}
            active={active}
            isLast={i === STATS.length - 1}
            delayClass={["reveal-delay-1","reveal-delay-2","reveal-delay-3","reveal-delay-4"][i]}
          />
        ))}
      </div>
    </section>
  );
}
