/*
 * HeroSection — Fullscreen centered hero similar to original site
 * Design: Centered logo + text, fullscreen image carousel, always dark
 * Hero stays dark in both light and dark modes (per original behavior)
 */
import { useEffect, useState, useCallback } from "react";
import { ASSETS, WHATSAPP_URL } from "@/lib/constants";
import { ChevronDown, ArrowRight } from "lucide-react";

const HERO_IMAGES = [ASSETS.heroBg1, ASSETS.heroBg2, ASSETS.heroBg3];
const INTERVAL = 7000;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

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

      {/* Centered Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12">
        {/* Logo */}
        <div
          className={`mb-8 transition-all duration-1000 delay-100 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <img
            src={ASSETS.logoBrancoDark}
            alt="Cavallini Assessoria"
            className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto mx-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            loading="eager"
          />
        </div>

        {/* Badge */}
        <div
          className={`mb-6 transition-all duration-700 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#d93e15] rounded-full animate-pulse shadow-[0_0_10px_#d93e15]" />
            <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] text-[#d93e15] font-bold border border-[#d93e15]/20 px-3 py-1 rounded-full bg-[#d93e15]/5 backdrop-blur-sm">
              Engenharia de Combate a Incêndio
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className={`text-[2.2rem] sm:text-5xl md:text-6xl lg:text-[5rem] font-display font-medium tracking-tight text-white leading-[1.05] mb-6 drop-shadow-2xl max-w-4xl transition-all duration-1000 delay-400 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Segurança não se promete.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93e15] to-[#ff6b3d]">
            Se comprova.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-base sm:text-lg md:text-xl font-sans text-stone-300 leading-relaxed max-w-2xl font-light mb-10 transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Assessoria completa em AVCB, projetos de engenharia e execução de
          sistemas de combate a incêndio. Do diagnóstico à aprovação final.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-[#d93e15] text-white text-sm font-mono font-bold px-8 py-4 rounded-lg uppercase tracking-widest shadow-[0_0_30px_rgba(217,62,21,0.3)] hover:shadow-[0_0_50px_rgba(217,62,21,0.5)] hover:bg-[#e8491f] transition-all duration-300"
          >
            Falar com Especialista
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#solucoes"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("solucoes");
              if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-widest text-white/70 hover:text-white border border-white/10 px-6 py-4 rounded-lg hover:border-white/30 transition-all duration-300"
          >
            Nossos Serviços
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Rolar para baixo"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
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
