/*
 * PartnersSection — Partner logos grid, theme-aware
 * Design: Static grid with uniform logo sizes, visible in both dark and light modes
 * Each logo is displayed in a card with consistent sizing
 */
import { PARTNER_LOGOS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";

export default function PartnersSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      ref={ref}
      className={`relative py-16 md:py-24 border-t ${
        isDark ? "border-white/5 bg-[#050505]" : "border-black/8 bg-stone-100"
      }`}
      aria-label="Parceiros e Clientes"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
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
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-display font-medium ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            Quem confia na{" "}
            <span className="text-[#d93e15]">Cavallini</span>
          </h2>
          <p className={`text-sm mt-3 font-light ${isDark ? "text-stone-500" : "text-stone-500"}`}>
            Empresas e organizações que confiam em nossa expertise
          </p>
        </div>

        {/* Logos Grid */}
        <div
          className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {PARTNER_LOGOS.map((logo, i) => (
            <PartnerLogoCard
              key={logo.name}
              name={logo.name}
              src={logo.src}
              isDark={isDark}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerLogoCard({
  name,
  src,
  isDark,
  index,
}: {
  name: string;
  src: string;
  isDark: boolean;
  index: number;
}) {
  // Determine filter based on theme
  // In dark mode: invert to white so logos are visible on dark bg
  // In light mode: darken logos so they're visible on light bg
  const filter = isDark
    ? "brightness(0) invert(1)"
    : "brightness(0) contrast(1)";

  return (
    <div
      className={`group flex items-center justify-center rounded-lg p-4 transition-all duration-300 cursor-default ${
        isDark
          ? "bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15"
          : "bg-white hover:bg-stone-50 border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
      title={name}
    >
      <img
        src={src}
        alt={`Logo ${name}`}
        className="w-full h-10 object-contain transition-all duration-500 group-hover:scale-105"
        style={{
          filter: filter,
          opacity: isDark ? 0.7 : 0.65,
          maxWidth: "120px",
        }}
        loading="lazy"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLImageElement).style.filter = "none";
          (e.currentTarget as HTMLImageElement).style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLImageElement).style.filter = filter;
          (e.currentTarget as HTMLImageElement).style.opacity = isDark ? "0.7" : "0.65";
        }}
      />
    </div>
  );
}
