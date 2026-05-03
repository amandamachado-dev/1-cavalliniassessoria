/*
 * ServicesSection — Service cards with cinematic imagery
 * Design: Numbered cards, hover reveals, asymmetric grid
 */
import { SERVICES, WHATSAPP_URL } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, CheckCircle } from "lucide-react";

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-lg border border-white/5 bg-[#0a0a0a] hover:border-[#d93e15]/20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

        {/* Number */}
        <span className="absolute top-4 right-4 text-6xl font-display font-bold text-white/5 group-hover:text-[#d93e15]/10 transition-colors duration-500">
          {service.number}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-mono text-[#d93e15] uppercase tracking-widest font-bold">
            {service.number}
          </span>
          <span className="w-6 h-[1px] bg-[#d93e15]/30" />
        </div>

        <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-1">
          {service.title}
        </h3>
        <p className="text-xs font-mono text-stone-500 uppercase tracking-wider mb-4">
          {service.subtitle}
        </p>
        <p className="text-stone-400 text-sm leading-relaxed mb-6 font-light">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-stone-300">
              <CheckCircle className="w-3.5 h-3.5 text-[#d93e15] shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#d93e15] hover:text-white transition-colors group/link"
        >
          Solicitar Orçamento
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="solucoes"
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden border-t border-white/5"
      aria-label="Nossos Serviços"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,62,21,0.03)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#d93e15]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#d93e15] font-bold">
              Soluções
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white leading-tight max-w-3xl">
            Soluções completas em{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93e15] to-[#ff6b3d]">
              segurança contra incêndio
            </span>
          </h2>
          <p className="text-stone-400 text-base md:text-lg mt-4 max-w-2xl font-light">
            Do diagnóstico à aprovação final. Cada etapa conduzida com rigor técnico
            e acompanhamento total.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
