/*
 * FAQSection — Accordion FAQ with categories, theme-aware
 */
import { useState } from "react";
import { FAQ_ITEMS, ASSETS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";
import { ChevronDown } from "lucide-react";

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
    <div className={`border-b last:border-0 ${isDark ? "border-white/5" : "border-black/5"}`}>
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
            isOpen ? "rotate-180 text-[#d93e15]" : isDark ? "text-stone-500" : "text-stone-400"
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: isOpen ? "500px" : "0px" }}
      >
        <p className={`text-sm md:text-base leading-relaxed pb-5 font-light pr-8 ${
          isDark ? "text-stone-400" : "text-stone-600"
        }`}>
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section
      id="faq"
      ref={ref}
      className={`relative py-24 md:py-32 overflow-hidden border-t ${
        isDark ? "border-white/5" : "border-black/5"
      }`}
      aria-label="Perguntas Frequentes"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={ASSETS.trabalhadores}
          alt=""
          className={`w-full h-full object-cover grayscale ${isDark ? "opacity-10" : "opacity-5"}`}
          loading="lazy"
          aria-hidden="true"
        />
        <div className={`absolute inset-0 ${isDark ? "bg-black/80" : "bg-[var(--surface-primary)]/90"}`} />
        <div className={`absolute top-0 inset-x-0 h-48 ${
          isDark ? "bg-gradient-to-b from-black to-transparent" : "bg-gradient-to-b from-[var(--surface-primary)] to-transparent"
        }`} />
        <div className={`absolute bottom-0 inset-x-0 h-48 ${
          isDark ? "bg-gradient-to-t from-black to-transparent" : "bg-gradient-to-t from-[var(--surface-primary)] to-transparent"
        }`} />
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#d93e15]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#d93e15] font-bold">
              FAQ
            </span>
            <span className="w-8 h-[1px] bg-[#d93e15]" />
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-medium leading-tight ${
            isDark ? "text-white" : "text-stone-900"
          }`}>
            Perguntas{" "}
            <span className="text-[#d93e15]">
              Frequentes
            </span>
          </h2>
          <p className={`text-base mt-4 max-w-lg mx-auto font-light ${
            isDark ? "text-stone-400" : "text-stone-600"
          }`}>
            Tire suas dúvidas sobre AVCB, regularização e segurança contra incêndio.
          </p>
        </div>

        {/* FAQ Categories */}
        {FAQ_ITEMS.map((category, catIndex) => (
          <div
            key={category.category}
            className={`mb-12 last:mb-0 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${catIndex * 200}ms` }}
          >
            <h3 className={`text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-3 ${
              isDark ? "text-stone-500" : "text-stone-400"
            }`}>
              <span className="text-[#d93e15]">{String(catIndex + 1).padStart(2, "0")}</span>
              {category.category}
            </h3>

            <div className={`rounded-lg border px-6 ${
              isDark
                ? "bg-white/[0.02] border-white/5"
                : "bg-white/80 border-black/5 shadow-sm"
            }`}>
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
      </div>
    </section>
  );
}
