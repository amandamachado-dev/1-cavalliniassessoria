/*
 * VideoSection — Vídeo fullwidth, sem header de texto
 * Design: Vídeo ocupa toda a largura. Play button minimalista.
 * Sem gradientes laterais. Borda superior/inferior sutil.
 */
import { useState, useRef } from "react";
import { ASSETS } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";
import { Play, Pause } from "lucide-react";

export default function VideoSection() {
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
      aria-label="Vídeo Institucional"
      style={{
        position: "relative",
        width: "100%",
        borderTop: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.07)",
        borderBottom: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.07)",
      }}
    >
      {/* Video container */}
      <div
        style={{ position: "relative", width: "100%", aspectRatio: "16/9", cursor: "pointer" }}
        onClick={toggleVideo}
        role="button"
        aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleVideo(); }}
      >
        <video
          ref={videoRef}
          src={ASSETS.fireExtinguisherVideo}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          playsInline
          muted
          loop
          preload="none"
          poster={ASSETS.extintorSemLogo}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Overlay escuro sutil quando pausado */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.25)",
            opacity: isPlaying ? 0 : 1,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />

        {/* Play/Pause button */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: isPlaying ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
          className="group"
        >
          <div
            style={{
              width: "5rem",
              height: "5rem",
              backgroundColor: "#D93E15",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s ease, background-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {isPlaying
              ? <Pause style={{ width: "1.5rem", height: "1.5rem", color: "#FFFFFF" }} />
              : <Play style={{ width: "1.5rem", height: "1.5rem", color: "#FFFFFF", marginLeft: "3px" }} />
            }
          </div>
        </div>

        {/* Hover: mostrar pause quando tocando */}
        {isPlaying && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.2s ease",
            }}
            className="group-hover:opacity-100"
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
          >
            <div style={{ width: "4rem", height: "4rem", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Pause style={{ width: "1.25rem", height: "1.25rem", color: "#FFFFFF" }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
