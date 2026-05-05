/*
 * VideoSection — Fullwidth cinematic video section, theme-aware
 * Design: Video occupies full width for maximum visual impact
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
      className={`relative overflow-hidden border-t ${
        isDark ? "border-white/5" : "border-black/5"
      }`}
      aria-label="Vídeo Institucional"
    >
      {/* Section Header */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 pt-20 md:pt-28 pb-10 md:pb-14">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#d93e15]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#d93e15] font-bold">
              Institucional
            </span>
            <span className="w-8 h-[1px] bg-[#d93e15]" />
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-display font-medium leading-tight mb-4 ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            Excelência em cada{" "}
            <span className="text-[#d93e15]">detalhe</span>
          </h2>
          <p
            className={`text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto ${
              isDark ? "text-stone-400" : "text-stone-600"
            }`}
          >
            Conheça de perto como trabalhamos. Da análise técnica à execução
            final, cada etapa é conduzida com precisão e comprometimento.
          </p>
        </div>
      </div>

      {/* Fullwidth Video */}
      <div
        className={`relative w-full transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div
          className="relative w-full aspect-video group cursor-pointer"
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

          {/* Cinematic top/bottom gradient bars */}
          <div
            className={`absolute top-0 inset-x-0 h-24 pointer-events-none ${
              isDark
                ? "bg-gradient-to-b from-black/60 to-transparent"
                : "bg-gradient-to-b from-[var(--surface-primary)]/60 to-transparent"
            }`}
          />
          <div
            className={`absolute bottom-0 inset-x-0 h-24 pointer-events-none ${
              isDark
                ? "bg-gradient-to-t from-black/60 to-transparent"
                : "bg-gradient-to-t from-[var(--surface-primary)]/60 to-transparent"
            }`}
          />

          {/* Play/Pause Overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
          >
            <div
              className={`absolute inset-0 ${
                isDark ? "bg-black/30" : "bg-black/20"
              }`}
            />
            <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#d93e15] flex items-center justify-center shadow-[0_0_40px_rgba(217,62,21,0.4)] group-hover:scale-110 transition-transform">
              {isPlaying ? (
                <Pause className="w-8 h-8 md:w-10 md:h-10 text-white" />
              ) : (
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
