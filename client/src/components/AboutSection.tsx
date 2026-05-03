/*
 * AboutSection — "Quem Somos" with cinematic background and stats
 * Design: Split layout, P&B photography, orange accents
 */
import { ASSETS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, Target, Award, Users } from "lucide-react";

const STATS = [
  { icon: Shield, value: "500+", label: "Projetos Entregues" },
  { icon: Target, value: "100%", label: "Taxa de Aprovação" },
  { icon: Award, value: "10+", label: "Anos de Experiência" },
  { icon: Users, value: "24h", label: "Atendimento" },
];

export default function AboutSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="quem-somos"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5"
      aria-label="Quem Somos"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.aboutBg}
          alt=""
          className="w-full h-full object-cover opacity-20 grayscale"
          loading="lazy"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
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
              Quem Somos
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white leading-tight max-w-3xl">
            Engenharia de combate a incêndio com{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93e15] to-[#ff6b3d]">
              rigor técnico
            </span>{" "}
            e visão estratégica
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text Column */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-stone-300 text-base md:text-lg leading-relaxed font-light">
              A Cavallini Assessoria é especializada em soluções completas de segurança
              contra incêndio. Atuamos com foco em resultados, oferecendo desde a
              consultoria inicial até a execução e aprovação final junto ao Corpo de
              Bombeiros.
            </p>
            <p className="text-stone-400 text-base leading-relaxed font-light">
              Nossa equipe de engenheiros e técnicos qualificados garante que cada
              projeto seja conduzido com o mais alto padrão de qualidade, cumprindo
              rigorosamente todas as normas e regulamentações vigentes.
            </p>
            <p className="text-stone-400 text-base leading-relaxed font-light">
              Entendemos que segurança contra incêndio não é apenas uma obrigação legal
              — é um compromisso com a vida. Por isso, tratamos cada projeto com a
              seriedade e a dedicação que ele merece.
            </p>

            {/* Signature Quote */}
            <blockquote className="border-l-2 border-[#d93e15] pl-6 mt-8">
              <p className="text-white/80 text-lg font-display font-medium italic">
                "Segurança não se promete. Se comprova."
              </p>
              <cite className="text-stone-500 text-sm font-mono mt-2 block not-italic">
                — Cavallini Assessoria
              </cite>
            </blockquote>
          </div>

          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
              <img
                src={ASSETS.tresImgPeb}
                alt="Equipe Cavallini em campo realizando vistoria técnica"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-[#d93e15] text-white px-6 py-3 rounded-lg shadow-[0_0_30px_rgba(217,62,21,0.3)]">
              <span className="text-2xl font-display font-bold">10+</span>
              <span className="text-xs font-mono uppercase tracking-wider ml-2 opacity-80">
                Anos
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-16 border-t border-white/5 transition-all duration-1000 ${
            statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <stat.icon className="w-6 h-6 text-[#d93e15] mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-stone-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
