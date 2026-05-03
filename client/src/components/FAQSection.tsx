/*
 * FAQSection — Accordion FAQ with categories
 * Design: Cinematic background, clean accordion, orange accents
 */
import { useState } from "react";
import { FAQ_ITEMS, ASSETS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown } from "lucide-react";

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-base md:text-lg font-sans font-medium transition-colors ${
            isOpen ? "text-[#d93e15]" : "text-white group-hover:text-stone-200"
          }`}
        >
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 ml-4 transition-all duration-300 ${
            isOpen ? "rotate-180 text-[#d93e15]" : "text-stone-500"
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: isOpen ? "500px" : "0px" }}
      >
        <p className="text-stone-400 text-sm md:text-base leading-relaxed pb-5 font-light pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section
      id="faq"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5"
      aria-label="Perguntas Frequentes"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={ASSETS.trabalhadores}
          alt=""
          className="w-full h-full object-cover opacity-10 grayscale"
          loading="lazy"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black to-transparent" />
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white leading-tight">
            Perguntas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93e15] to-[#ff6b3d]">
              Frequentes
            </span>
          </h2>
          <p className="text-stone-400 text-base mt-4 max-w-lg mx-auto font-light">
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
            <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-4 flex items-center gap-3">
              <span className="text-[#d93e15]">{String(catIndex + 1).padStart(2, "0")}</span>
              {category.category}
            </h3>

            <div className="bg-white/[0.02] rounded-lg border border-white/5 px-6">
              {category.items.map((item, itemIndex) => {
                const key = `${catIndex}-${itemIndex}`;
                return (
                  <AccordionItem
                    key={key}
                    question={item.question}
                    answer={item.answer}
                    isOpen={!!openItems[key]}
                    onToggle={() => toggleItem(key)}
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
