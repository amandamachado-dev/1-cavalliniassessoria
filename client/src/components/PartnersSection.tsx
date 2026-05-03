/*
 * PartnersSection — Infinite marquee of partner logos
 * Design: Grayscale logos, hover color reveal, dual-track marquee
 */
import { PARTNER_LOGOS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function PartnersSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  // Duplicate logos for seamless infinite scroll
  const logos = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-20 overflow-hidden border-t border-white/5 bg-[#050505]"
      aria-label="Parceiros e Clientes"
    >
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 mb-10">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#d93e15]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#d93e15] font-bold">
              Prova Social
            </span>
            <span className="w-8 h-[1px] bg-[#d93e15]" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white">
            Quem confia na{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93e15] to-[#ff6b3d]">
              Cavallini
            </span>
          </h2>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-12 md:gap-16 py-6">
          {logos.map((logo, i) => (
            <img
              key={`${logo.name}-${i}`}
              src={logo.src}
              alt={logo.name}
              className="h-8 md:h-12 w-auto max-w-[120px] md:max-w-[160px] object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-500 shrink-0"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
