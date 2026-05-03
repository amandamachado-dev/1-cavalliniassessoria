/*
 * HeroSection — Fullscreen centered hero with large logo + subtitle only
 * Design: Large CAVALLINI logo centered, subtitle below, fullscreen image carousel
 * Hero stays dark in both light and dark modes (per original behavior)
 */
import { useEffect, useState, useCallback } from "react";
import { ASSETS, WHATSAPP_URL } from "@/lib/constants";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const HERO_IMAGES = [ASSETS.heroBg1, ASSETS.heroBg2, ASSETS.heroBg3];
const INTERVAL = 7000;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const scrollToContent = () => {
    const el = document.getElementById("quem-somos");
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-black"
      aria-label="Seção principal"
    >
      {/* Background Carousel */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 z-0 transition-all duration-[2500ms] ease-in-out"
          style={{
            opacity: currentSlide === i ? 1 : 0,
            transform: currentSlide === i ? "scale(1)" : "scale(1.08)",
          }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
            aria-hidden="true"
          />
        </div>
      ))}

      {/* Cinematic Overlays — always dark */}
      <div className="absolute inset-0 z-[1] bg-black/60" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-transparent to-black/50" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Grafismo da Marca */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] opacity-[0.04] pointer-events-none translate-x-[15%] translate-y-[20%] z-[2]"
        style={{
          backgroundColor: "#d93e15",
          maskImage: `url(${ASSETS.grafismo})`,
          WebkitMaskImage: `url(${ASSETS.grafismo})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "right bottom",
          WebkitMaskPosition: "right bottom",
        }}
        aria-hidden="true"
      />

      {/* Centered Content — Logo + Subtitle only */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6 md:px-12">
        {/* Large Logo — primary visual element */}
        <h1
          className={`mb-8 md:mb-10 transition-all duration-1000 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="sr-only">Cavallini Engenharia e Assessoria de AVCB</span>
          <img
            src={theme === "dark" ? ASSETS.logoBrancoDark : ASSETS.logoBrancoDark}
            alt="Cavallini Assessoria"
            className="w-auto h-auto max-w-[72vw] md:max-w-[480px] lg:max-w-[550px] max-h-[28vh] lg:max-h-[35vh] object-contain drop-shadow-[0_0_24px_rgba(255,255,255,0.12)] mx-auto"
            loading="eager"
          />
        </h1>

        {/* Subtitle — the current h2 text */}
        <p
          className={`text-base md:text-lg lg:text-xl font-sans text-stone-300 leading-relaxed font-light mx-auto max-w-[72vw] md:max-w-[520px] lg:max-w-[600px] mb-10 transition-all duration-1000 delay-400 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Assessoria, projeto, execução e regularização{" "}
          <strong className="font-semibold text-white">completa</strong> junto ao
          Corpo de Bombeiros.
          <br className="hidden md:block" /> Segurança de ponta a ponta com rigor
          técnico para empresas que não podem parar.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-600 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Primary CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-[72vw] sm:w-auto flex items-center justify-center gap-3 bg-[#d93e15] text-white text-[13px] font-mono font-bold px-8 py-4 rounded-md uppercase tracking-wider shadow-[0_0_20px_rgba(217,62,21,0.3)] hover:shadow-[0_0_40px_rgba(217,62,21,0.5)] hover:bg-[#e8491f] transition-all duration-300"
          >
            <span>Solicitar AVCB</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Secondary CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[72vw] sm:w-auto flex items-center justify-center gap-3 border border-white/20 bg-white/5 text-white text-[13px] font-semibold px-8 py-4 rounded-md uppercase tracking-wider backdrop-blur-sm hover:border-white/50 hover:bg-white/10 transition-all duration-300"
          >
            Falar com Especialista
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors opacity-50 pointer-events-auto"
        aria-label="Rolar para baixo"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#d93e15] to-transparent overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce" />
        </div>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:flex items-center gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-[2px] transition-all duration-500 ${
              currentSlide === i
                ? "w-8 bg-[#d93e15]"
                : "w-4 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
