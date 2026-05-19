/*
 * VideoSection — Vídeo fullwidth com autoplay por scroll
 * Design: Vídeo ocupa toda a largura. Sem capa/poster.
 * Comportamento: play quando visível, pause quando sair da tela.
 * Retoma ao retornar ao viewport.
 */
import { useEffect, useRef } from "react";
import { ASSETS } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";

export default function VideoSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay bloqueado pelo browser — silencia o erro
            });
          } else {
            video.pause();
          }
        });
      },
      {
        // Dispara quando pelo menos 30% do vídeo está visível
        threshold: 0.3,
      }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  return (
    <section
      aria-label="Vídeo Institucional"
      style={{
        position: "relative",
        width: "100%",
        borderTop: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.07)",
        borderBottom: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.07)",
      }}
    >
      {/* Video container */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
        <video
          ref={videoRef}
          src={ASSETS.fireExtinguisherVideo}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          playsInline
          muted
          loop
          preload="auto"
        />
      </div>
    </section>
  );
}
