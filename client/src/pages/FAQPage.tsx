/*
 * FAQPage — Standalone FAQ page with full site chrome
 * Design: Dedicated page for FAQ with categories and accordion
 */
import { useState, useEffect } from "react";
import { FAQ_ITEMS, ASSETS, WHATSAPP_URL } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";
import { ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  isDark,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  isDark: boolean;
}) {
  return (
    <div
      className={`border-b last:border-0 ${
        isDark ? "border-white/5" : "border-black/5"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-base md:text-lg font-sans font-medium transition-colors ${
            isOpen
              ? "text-[#d93e15]"
              : isDark
                ? "text-white group-hover:text-stone-200"
                : "text-stone-800 group-hover:text-stone-600"
          }`}
        >
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 ml-4 transition-all duration-300 ${
            isOpen
              ? "rotate-180 text-[#d93e15]"
              : isDark
                ? "text-stone-500"
                : "text-stone-400"
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: isOpen ? "500px" : "0px" }}
      >
        <p
          className={`text-sm md:text-base leading-relaxed pb-5 font-light pr-8 ${
            isDark ? "text-stone-400" : "text-stone-600"
          }`}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: isDark ? "#000000" : "var(--surface-primary)",
      }}
    >
      <Navbar />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src={ASSETS.trabalhadores}
              alt=""
              className={`w-full h-full object-cover grayscale ${
                isDark ? "opacity-10" : "opacity-5"
              }`}
              loading="eager"
              aria-hidden="true"
            />
            <div
              className={`absolute inset-0 ${
                isDark
                  ? "bg-black/80"
                  : "bg-[var(--surface-primary)]/90"
              }`}
            />
          </div>

          <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 md:px-12 text-center">
            {/* Back link */}
            <a
              href="/"
              className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-8 transition-colors hover:text-[#d93e15] ${
                isDark ? "text-stone-500" : "text-stone-400"
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar ao início
            </a>

            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#d93e15]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#d93e15] font-bold">
                FAQ
              </span>
              <span className="w-8 h-[1px] bg-[#d93e15]" />
            </div>
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-display font-medium leading-tight mb-4 ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              Perguntas{" "}
              <span className="text-[#d93e15]">Frequentes</span>
            </h1>
            <p
              className={`text-base md:text-lg max-w-lg mx-auto font-light ${
                isDark ? "text-stone-400" : "text-stone-600"
              }`}
            >
              Tire suas dúvidas sobre AVCB, regularização e segurança contra
              incêndio.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="relative pb-24 md:pb-32">
          <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 md:px-12">
            {FAQ_ITEMS.map((category, catIndex) => (
              <div key={category.category} className="mb-12 last:mb-0">
                <h2
                  className={`text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-3 ${
                    isDark ? "text-stone-500" : "text-stone-400"
                  }`}
                >
                  <span className="text-[#d93e15]">
                    {String(catIndex + 1).padStart(2, "0")}
                  </span>
                  {category.category}
                </h2>

                <div
                  className={`rounded-lg border px-6 ${
                    isDark
                      ? "bg-white/[0.02] border-white/5"
                      : "bg-white/80 border-black/5 shadow-sm"
                  }`}
                >
                  {category.items.map((item, itemIndex) => {
                    const key = `${catIndex}-${itemIndex}`;
                    return (
                      <AccordionItem
                        key={key}
                        question={item.question}
                        answer={item.answer}
                        isOpen={!!openItems[key]}
                        onToggle={() => toggleItem(key)}
                        isDark={isDark}
                      />
                    );
                  })}
                </div>
              </div>
            ))}

            {/* CTA after FAQ */}
            <div
              className={`mt-16 p-8 rounded-lg border text-center ${
                isDark
                  ? "bg-white/[0.02] border-white/5"
                  : "bg-white/80 border-black/5 shadow-sm"
              }`}
            >
              <h3
                className={`text-xl md:text-2xl font-display font-medium mb-3 ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
              >
                Ainda tem dúvidas?
              </h3>
              <p
                className={`text-sm font-light mb-6 ${
                  isDark ? "text-stone-400" : "text-stone-600"
                }`}
              >
                Fale diretamente com um de nossos especialistas. Estamos prontos
                para ajudar.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#d93e15] text-white text-[13px] font-mono font-bold px-8 py-4 rounded-md uppercase tracking-wider shadow-[0_0_20px_rgba(217,62,21,0.3)] hover:shadow-[0_0_40px_rgba(217,62,21,0.5)] hover:bg-[#e8491f] transition-all duration-300"
              >
                Falar com Especialista
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
