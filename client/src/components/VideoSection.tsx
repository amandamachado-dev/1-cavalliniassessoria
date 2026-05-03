/*
 * VideoSection — Cinematic video showcase with lazy play on visibility
 * Design: Full-width, dark overlay, film grain texture
 */
import { useEffect, useRef } from "react";
import { ASSETS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative py-0 overflow-hidden border-t border-white/5"
      aria-label="Vídeo institucional"
    >
      <div className="relative w-full aspect-video max-h-[70vh]">
        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={ASSETS.corredorSeguro}
        >
          <source src={ASSETS.fireExtinguisherVideo} type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#d93e15]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d93e15] font-bold">
                Excelência em Campo
              </span>
              <span className="w-8 h-[1px] bg-[#d93e15]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white drop-shadow-2xl">
              Cada detalhe importa quando o assunto é{" "}
              <span className="text-[#d93e15]">segurança</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
