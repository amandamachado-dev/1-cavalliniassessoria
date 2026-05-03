/*
 * ContactSection — Premium contact form with cinematic styling
 * Design: Split layout, form + info, dark glass cards
 */
import { useState } from "react";
import { WHATSAPP_URL, ASSETS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";
import { Send, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.", {
      duration: 5000,
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contato"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5"
      aria-label="Contato"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,62,21,0.05)_0%,transparent_60%)]" />
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
              Contato
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white leading-tight max-w-3xl">
            Vamos conversar sobre o seu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93e15] to-[#ff6b3d]">
              projeto
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-sans placeholder:text-stone-600 focus:border-[#d93e15]/50 focus:ring-1 focus:ring-[#d93e15]/20 focus:outline-none transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-sans placeholder:text-stone-600 focus:border-[#d93e15]/50 focus:ring-1 focus:ring-[#d93e15]/20 focus:outline-none transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-sans placeholder:text-stone-600 focus:border-[#d93e15]/50 focus:ring-1 focus:ring-[#d93e15]/20 focus:outline-none transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
                    Assunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-sans focus:border-[#d93e15]/50 focus:ring-1 focus:ring-[#d93e15]/20 focus:outline-none transition-all appearance-none"
                  >
                    <option value="" className="bg-black">Selecione...</option>
                    <option value="avcb" className="bg-black">AVCB</option>
                    <option value="consultoria" className="bg-black">Consultoria</option>
                    <option value="projetos" className="bg-black">Projetos</option>
                    <option value="execucao" className="bg-black">Execução e Manutenção</option>
                    <option value="outro" className="bg-black">Outro</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-sans placeholder:text-stone-600 focus:border-[#d93e15]/50 focus:ring-1 focus:ring-[#d93e15]/20 focus:outline-none transition-all resize-none"
                  placeholder="Descreva brevemente sua necessidade..."
                />
              </div>

              <button
                type="submit"
                className="group flex items-center gap-3 bg-[#d93e15] text-white text-sm font-mono font-bold px-8 py-4 rounded-lg uppercase tracking-widest shadow-[0_0_30px_rgba(217,62,21,0.2)] hover:shadow-[0_0_50px_rgba(217,62,21,0.4)] hover:bg-[#e8491f] transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <Send className="w-4 h-4" />
                Enviar Mensagem
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Info Cards */}
          <div
            className={`lg:col-span-2 space-y-6 transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* WhatsApp Card */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-[#d93e15]/5 border border-[#d93e15]/20 rounded-lg p-6 hover:bg-[#d93e15]/10 hover:border-[#d93e15]/40 transition-all duration-300"
            >
              <Phone className="w-6 h-6 text-[#d93e15] mb-3" />
              <h3 className="text-white font-display font-medium text-lg mb-1">
                WhatsApp
              </h3>
              <p className="text-stone-400 text-sm font-light mb-3">
                Atendimento rápido e direto com nossos especialistas.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#d93e15] group-hover:gap-3 transition-all">
                Falar Agora
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* Location Card */}
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-6">
              <MapPin className="w-6 h-6 text-[#d93e15] mb-3" />
              <h3 className="text-white font-display font-medium text-lg mb-1">
                Localização
              </h3>
              <p className="text-stone-400 text-sm font-light">
                São Paulo, SP — Brasil
              </p>
              <p className="text-stone-500 text-xs font-mono mt-2">
                Atendemos todo o estado de São Paulo
              </p>
            </div>

            {/* Hours Card */}
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-6">
              <Clock className="w-6 h-6 text-[#d93e15] mb-3" />
              <h3 className="text-white font-display font-medium text-lg mb-1">
                Horário
              </h3>
              <p className="text-stone-400 text-sm font-light">
                Seg — Sex: 08h às 18h
              </p>
              <p className="text-[#d93e15] text-xs font-mono font-bold mt-2 uppercase tracking-wider">
                Emergências 24h
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
