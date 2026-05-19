/*
 * ServicesSection — Cards de serviços clicáveis
 * Design: Grid 2×2. Sem rounded corners. Imagem P&B → cor no hover.
 * Número grande como elemento decorativo. Linha laranja no hover.
 */
import { SERVICES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

function ServiceCard({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Link href={`/servicos/${service.slug}`}>
      <div
        className="group relative overflow-hidden cursor-pointer"
        style={{
          opacity: 1,
          backgroundColor: isDark ? "#111111" : "#FFFFFF",
          border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)",
          animationDelay: `${index * 80}ms`,
        }}
      >
        {/* Top accent line — reveals on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10 transition-transform duration-300 origin-left"
          style={{
            backgroundColor: "#D93E15",
            transform: "scaleX(0)",
          }}
          ref={(el) => {
            if (!el) return;
            const parent = el.closest(".group");
            if (!parent) return;
            parent.addEventListener("mouseenter", () => { el.style.transform = "scaleX(1)"; });
            parent.addEventListener("mouseleave", () => { el.style.transform = "scaleX(0)"; });
          }}
        />

        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: "clamp(140px, 28vw, 220px)" }}>
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04]"
            style={{ filter: "grayscale(100%)", transition: "filter 0.6s ease, transform 0.7s ease" }}
            loading="lazy"
            onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
            onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
          />
          {/* Number watermark */}
          <span
            className="absolute top-3 right-4 font-display font-bold select-none pointer-events-none"
            style={{
              fontSize: "5rem",
              lineHeight: 1,
              color: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            aria-hidden="true"
          >
            {service.number}
          </span>
        </div>

        {/* Content */}
        <div className="p-7">
          {/* Number + line */}
          <div className="flex items-center gap-3 mb-4">
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#D93E15",
              }}
            >
              {service.number}
            </span>
            <span
              style={{
                width: "1.5rem",
                height: "1px",
                backgroundColor: "rgba(217,62,21,0.3)",
                flexShrink: 0,
              }}
            />
          </div>

          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: "1.25rem",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              color: isDark ? "#F0EDEA" : "#0F0F0F",
              marginBottom: "0.25rem",
            }}
          >
            {service.title}
          </h3>

          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: isDark ? "rgba(240,237,234,0.3)" : "rgba(15,15,15,0.35)",
              marginBottom: "1rem",
            }}
          >
            {service.subtitle}
          </p>

          <p
            style={{
              fontFamily: "'Urbanist', sans-serif",
              fontWeight: 300,
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: isDark ? "rgba(240,237,234,0.5)" : "rgba(15,15,15,0.55)",
              marginBottom: "1.5rem",
            }}
          >
            {service.description}
          </p>

          {/* CTA */}
          <span
            className="inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-200"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#D93E15",
            }}
          >
            Saiba Mais
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="solucoes"
      className="relative py-24 md:py-32"
      style={{
        backgroundColor: isDark ? "#0A0A0A" : "#F5F2EE",
        borderTop: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.07)",
      }}
      aria-label="Nossos Serviços"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-[1px] bg-[#D93E15] flex-shrink-0" />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#D93E15",
              }}
            >
              Soluções
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: isDark ? "#F0EDEA" : "#0F0F0F",
              maxWidth: "36rem",
              margin: 0,
            }}
          >
            Soluções completas em{" "}
            <span style={{ color: "#D93E15" }}>segurança contra incêndio</span>.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
