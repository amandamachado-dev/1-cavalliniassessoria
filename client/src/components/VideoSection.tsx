/*
 * VideoSection — Lazy-loaded video with cinematic presentation, theme-aware
 */
import { useState, useRef } from "react";
import { ASSETS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";
import { Play, Pause } from "lucide-react";

export default function VideoSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      ref={ref}
      className={`relative py-20 md:py-28 overflow-hidden border-t ${
        isDark ? "border-white/5" : "border-black/5"
      }`}
      aria-label="Vídeo Institucional"
    >
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#d93e15]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#d93e15] font-bold">
                Institucional
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-medium leading-tight mb-6 ${
              isDark ? "text-white" : "text-stone-900"
            }`}>
              Excelência em cada{" "}
              <span className="text-[#d93e15]">
                detalhe
              </span>
            </h2>
            <p className={`text-base md:text-lg leading-relaxed font-light mb-4 ${
              isDark ? "text-stone-300" : "text-stone-700"
            }`}>
              Conheça de perto como trabalhamos. Da análise técnica à execução final,
              cada etapa é conduzida com precisão e comprometimento.
            </p>
            <p className={`text-base leading-relaxed font-light ${
              isDark ? "text-stone-400" : "text-stone-600"
            }`}>
              Nossos equipamentos e sistemas passam por rigorosos processos de
              qualidade para garantir a máxima eficiência em situações críticas.
            </p>
          </div>

          {/* Video Column */}
          <div
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className={`relative rounded-lg overflow-hidden aspect-[4/3] group cursor-pointer border ${
              isDark ? "border-white/5" : "border-black/5 shadow-lg"
            }`}
              onClick={toggleVideo}
            >
              <video
                ref={videoRef}
                src={ASSETS.fireExtinguisherVideo}
                className="w-full h-full object-cover"
                playsInline
                muted
                loop
                preload="none"
                poster={ASSETS.extintorSemLogo}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Play/Pause Overlay */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
              >
                <div className={`absolute inset-0 ${isDark ? "bg-black/40" : "bg-black/30"}`} />
                <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#d93e15] flex items-center justify-center shadow-[0_0_30px_rgba(217,62,21,0.4)] group-hover:scale-110 transition-transform">
                  {isPlaying ? (
                    <Pause className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  ) : (
                    <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
