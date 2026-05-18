/*
 * HeroSection — Fullscreen centered hero
 * Design: Cinematic crossfade. Logo dominant. Minimal text. Clean.
 * No noise texture. No grafismo. No rounded buttons. Pure authority.
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

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-[#0A0A0A]"
      aria-label="Cavallini Assessoria — Engenharia de Combate a Incêndio"
    >
      {/* Background Carousel */}
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

      {/* Overlay — darkens for legibility */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.72) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-3xl mx-auto">

        {/* Logo */}
        <div
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: "0.15s",
          }}
        >
          <h1 className="sr-only">Cavallini Assessoria — Engenharia de Combate a Incêndio</h1>
          <img
            src={ASSETS.logoBrancoDark}
            alt="Cavallini Assessoria"
            className="w-auto mx-auto mb-7"
            style={{ height: "clamp(56px, 9vw, 108px)" }}
            loading="eager"
          />
        </div>

        {/* Subtitle */}
        <p
          className="text-white/75 font-light leading-relaxed"
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontSize: "clamp(0.875rem, 1.6vw, 1.05rem)",
            maxWidth: "38rem",
            marginBottom: "2.5rem",
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: "0.3s",
          }}
        >
          Assessoria completa em AVCB, projetos de engenharia e execução de sistemas de combate a incêndio.{" "}
          <span className="text-white/50">Do diagnóstico à aprovação final.</span>
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center gap-3"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: "0.45s",
          }}
        >
          <a
            href="#solucoes"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("solucoes")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2.5 bg-[#D93E15] text-white text-[11px] font-mono uppercase tracking-[0.14em] px-8 py-4 hover:bg-[#C03510] transition-colors duration-200"
          >
            Solicitar AVCB
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-white/70 text-[11px] font-mono uppercase tracking-[0.14em] px-8 py-4 border border-white/18 hover:border-white/40 hover:text-white transition-all duration-200"
          >
            Falar com Especialista
          </a>
        </div>
      </div>

      {/* Slide Indicators */}
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
