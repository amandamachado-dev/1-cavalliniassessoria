/*
 * HeroSection — Fullscreen centered hero
 * Design: Cinematic crossfade. Logo dominant. Minimal text. Clean.
 * Mobile: logo maior, botões full-width empilhados com mesmo tamanho.
 * Desktop (≥480px): botões inline lado a lado, mesma altura, mesmo padding.
 */
import { useEffect, useState, useCallback } from "react";
import { ASSETS, WHATSAPP_URL } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

const HERO_IMAGES = [
  { src: ASSETS.heroExtintor, alt: "Extintor de incêndio Cavallini" },
  { src: ASSETS.heroBg1, alt: "Engenharia de combate a incêndio" },
  { src: ASSETS.heroBg2, alt: "Segurança contra incêndio" },
  { src: ASSETS.heroBg3, alt: "Projetos e execução Cavallini" },
];

const INTERVAL = 6000;

// Estilos compartilhados para garantir botões idênticos em altura/padding
const BTN_BASE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.625rem",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.6875rem",
  fontWeight: 600,
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
  padding: "1.0625rem 2rem",   // altura idêntica nos dois botões
  lineHeight: 1,
  whiteSpace: "nowrap" as const,
  transition: "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
};

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  const advance = useCallback(() => {
    setCurrent(c => (c + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(advance, INTERVAL);
    return () => clearInterval(t);
  }, [advance]);

  const fadeIn = (delay: string): React.CSSProperties => ({
    opacity: entered ? 1 : 0,
    transform: entered ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
    transitionDelay: delay,
  });

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-[#0A0A0A]"
      aria-label="Cavallini Assessoria — Engenharia de Combate a Incêndio"
    >
      {/* ── Background Carousel ── */}
      {HERO_IMAGES.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: current === i ? 1 : 0 }}
          aria-hidden="true"
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* ── Overlay ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.48) 75%, rgba(0,0,0,0.75) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div
        className="relative z-10 flex flex-col items-center text-center w-full"
        style={{ padding: "0 clamp(1.25rem, 6vw, 3rem)", maxWidth: "760px", margin: "0 auto" }}
      >

        {/* Logo — maior no mobile */}
        <div style={fadeIn("0.15s")} className="w-full flex justify-center mb-6 sm:mb-8">
          <h1 className="sr-only">Cavallini Assessoria — Engenharia de Combate a Incêndio</h1>
          <img
            src={ASSETS.logoBrancoDark}
            alt="Cavallini Assessoria"
            loading="eager"
            style={{
              /* mobile: ~80px | tablet: ~110px | desktop: ~136px */
              height: "clamp(80px, 16vw, 136px)",
              width: "auto",
              maxWidth: "min(75vw, 440px)",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Subtitle */}
        <p
          className="text-white/75 font-light leading-relaxed"
          style={{
            ...fadeIn("0.3s"),
            fontFamily: "'Urbanist', sans-serif",
            fontSize: "clamp(0.875rem, 1.8vw, 1.05rem)",
            maxWidth: "36rem",
            marginBottom: "clamp(2rem, 4vw, 2.75rem)",
          }}
        >
          Assessoria completa em AVCB, projetos de engenharia e execução de sistemas de combate a incêndio.{" "}
          <span className="text-white/50">Da avaliação à aprovação final.</span>
        </p>

        {/* ── CTAs ──
            Mobile (<480px): coluna, cada botão ocupa 100% da largura
            Desktop (≥480px): linha, cada botão ocupa 50% (flex: 1)
        */}
        <div
          className="flex flex-col min-[480px]:flex-row gap-3 w-full"
          style={fadeIn("0.45s")}
        >
          {/* Primário — laranja sólido */}
          <a
            href="#solucoes"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("solucoes")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex-1"
            style={{
              ...BTN_BASE,
              backgroundColor: "#D93E15",
              color: "#FFFFFF",
              border: "1px solid #D93E15",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C03510";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#C03510";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#D93E15";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#D93E15";
            }}
          >
            Solicitar AVCB
            <ArrowRight style={{ width: "0.875rem", height: "0.875rem", flexShrink: 0 }} />
          </a>

          {/* Secundário — contorno branco, mesmo padding/altura */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
            style={{
              ...BTN_BASE,
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.80)",
              border: "1px solid rgba(255,255,255,0.28)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.60)";
              el.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.28)";
              el.style.color = "rgba(255,255,255,0.80)";
            }}
          >
            Falar com Especialista
          </a>
        </div>
      </div>

      {/* ── Slide Indicators ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10"
        aria-hidden="true"
      >
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? "2rem" : "0.375rem",
              height: "2px",
              backgroundColor: i === current ? "#D93E15" : "rgba(255,255,255,0.25)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 0.4s ease, background-color 0.4s ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}
