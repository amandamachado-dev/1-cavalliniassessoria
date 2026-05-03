/*
 * ServicePage — Individual service detail page with split-screen layout
 * Design: Left image panel + right content panel (like original site)
 * Always dark background to match the cinematic aesthetic
 */
import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { SERVICES, WHATSAPP_URL } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

export default function ServicePage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { theme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  const service = SERVICES.find((s) => s.slug === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [id]);

  if (!service) {
    setLocation("/404");
    return null;
  }

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-[var(--surface-primary)] text-stone-900"}`}>
      <Navbar />

      <main className="flex flex-col lg:flex-row min-h-screen w-full relative pt-[80px] lg:pt-0">
        {/* LEFT: Image Panel */}
        <div className="w-full lg:w-[45%] h-[50vh] lg:h-screen relative overflow-hidden z-10 shrink-0 lg:sticky lg:top-0">
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ${
              loaded ? "scale-100" : "scale-110"
            }`}
            style={{ backgroundImage: `url(${service.image})` }}
          />
          {/* Gradient overlay */}
          <div className={`absolute inset-0 z-10 pointer-events-none ${
            isDark
              ? "bg-gradient-to-r from-black/20 to-black/60"
              : "bg-gradient-to-r from-black/10 to-black/40"
          }`} />
          <div className={`absolute inset-0 z-10 pointer-events-none lg:hidden ${
            isDark
              ? "bg-gradient-to-b from-transparent to-black"
              : "bg-gradient-to-b from-transparent to-[var(--surface-primary)]"
          }`} />

          {/* Service Number Watermark */}
          <span className="absolute bottom-6 left-6 text-[120px] lg:text-[200px] font-display font-bold text-white/5 leading-none z-20 pointer-events-none">
            {service.number}
          </span>
        </div>

        {/* RIGHT: Content Panel */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-8 lg:px-16 xl:px-20 py-12 lg:py-24 z-20 overflow-y-auto">
          {/* Back Link */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setLocation("/");
            }}
            className={`text-xs font-mono uppercase tracking-widest transition-colors mb-10 flex items-center gap-2 group w-max ${
              isDark ? "text-stone-500 hover:text-[#d93e15]" : "text-stone-400 hover:text-[#d93e15]"
            }`}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar para página inicial
          </a>

          {/* Content */}
          <div
            className={`transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono text-[#d93e15] uppercase tracking-widest font-bold">
                {service.number}
              </span>
              <span className="w-6 h-[1px] bg-[#d93e15]/30" />
              <span className={`text-[10px] font-mono uppercase tracking-widest ${
                isDark ? "text-stone-500" : "text-stone-400"
              }`}>
                {service.subtitle}
              </span>
            </div>

            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-display font-medium leading-[1.1] tracking-tight mb-6 ${
              isDark ? "text-white" : "text-stone-900"
            }`}>
              {service.pageTitle}
            </h1>

            <p className={`font-light text-base md:text-lg leading-relaxed mb-4 max-w-xl ${
              isDark ? "text-stone-400" : "text-stone-600"
            }`}>
              {service.pageDescription}
            </p>

            <p className={`font-light text-base leading-relaxed mb-12 max-w-xl ${
              isDark ? "text-stone-500" : "text-stone-500"
            }`}>
              {service.pageDescription2}
            </p>

            {/* Deliverables */}
            <h3 className={`text-[10px] font-mono uppercase tracking-widest pb-4 mb-6 max-w-md border-b ${
              isDark ? "text-stone-500 border-white/10" : "text-stone-400 border-black/10"
            }`}>
              {service.deliverableTitle}
            </h3>

            <ul className="space-y-4 mb-12 max-w-md">
              {service.deliverables.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 group"
                  style={{
                    transitionDelay: `${i * 100 + 300}ms`,
                  }}
                >
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isDark
                      ? "border-white/10 bg-black/50 group-hover:border-[#d93e15]/50"
                      : "border-black/10 bg-white group-hover:border-[#d93e15]/50"
                  }`}>
                    <CheckCircle className="w-4 h-4 text-[#d93e15]" />
                  </div>
                  <span className={`font-light text-sm md:text-base ${
                    isDark ? "text-white" : "text-stone-800"
                  }`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#d93e15] text-white px-8 py-4 transition-transform duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(217,62,21,0.2)] hover:shadow-[0_0_30px_rgba(217,62,21,0.4)]"
            >
              <span className="font-mono text-xs md:text-sm uppercase tracking-widest font-bold relative z-10">
                Solicitar análise gratuita
              </span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              {/* Beam effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
