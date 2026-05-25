/*
 * ContactSection — Formulário de contato
 * Design: Grid 3+2. Sem rounded corners. Inputs com borda inferior apenas.
 * Sem radial gradient. Sem sombra glow no botão.
 */
import { useState } from "react";
import { WHATSAPP_URL } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";
import { ArrowRight, Phone, MapPin, Clock } from "lucide-react";

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.6rem",
    fontWeight: 500,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: isDark ? "rgba(240,237,234,0.35)" : "rgba(15,15,15,0.4)",
    marginBottom: "0.5rem",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.15)",
    borderRadius: 0,
    padding: "0.6rem 0",
    fontFamily: "'Urbanist', sans-serif",
    fontWeight: 400,
    fontSize: "0.9rem",
    color: isDark ? "#F0EDEA" : "#0F0F0F",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    <section
      id="contato"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{
        backgroundColor: isDark ? "#0A0A0A" : "#F5F2EE",
        borderTop: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.07)",
      }}
      aria-label="Contato"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className={`mb-14 reveal ${isVisible ? "visible" : ""}`}>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-[1px] bg-[#D93E15] flex-shrink-0" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#D93E15" }}>
              Contato
            </span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.12, letterSpacing: "-0.02em", color: isDark ? "#F0EDEA" : "#0F0F0F", margin: 0 }}>
            Vamos conversar sobre o seu{" "}
            <span style={{ color: "#D93E15" }}>projeto</span>.
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-14 lg:gap-20">

          {/* Form */}
          <div className={`lg:col-span-3 reveal reveal-delay-2 ${isVisible ? "visible" : ""}`}>
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid sm:grid-cols-2 gap-7">
                <div>
                  <label htmlFor="name" style={labelStyle}>Nome *</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} style={inputStyle} placeholder="Seu nome completo"
                    onFocus={(e) => e.currentTarget.style.borderBottomColor = "#D93E15"}
                    onBlur={(e) => e.currentTarget.style.borderBottomColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)"}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>E-mail *</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} style={inputStyle} placeholder="seu@email.com"
                    onFocus={(e) => e.currentTarget.style.borderBottomColor = "#D93E15"}
                    onBlur={(e) => e.currentTarget.style.borderBottomColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)"}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-7">
                <div>
                  <label htmlFor="phone" style={labelStyle}>Telefone</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="(11) 99999-9999"
                    onFocus={(e) => e.currentTarget.style.borderBottomColor = "#D93E15"}
                    onBlur={(e) => e.currentTarget.style.borderBottomColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)"}
                  />
                </div>
                <div>
                  <label htmlFor="subject" style={labelStyle}>Assunto *</label>
                  <select id="subject" name="subject" required value={formData.subject} onChange={handleChange}
                    style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                    onFocus={(e) => e.currentTarget.style.borderBottomColor = "#D93E15"}
                    onBlur={(e) => e.currentTarget.style.borderBottomColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)"}
                  >
                    <option value="" style={{ background: isDark ? "#111" : "#fff" }}>Selecione...</option>
                    <option value="avcb" style={{ background: isDark ? "#111" : "#fff" }}>AVCB</option>
                    <option value="consultoria" style={{ background: isDark ? "#111" : "#fff" }}>Consultoria</option>
                    <option value="projetos" style={{ background: isDark ? "#111" : "#fff" }}>Projetos</option>
                    <option value="execucao" style={{ background: isDark ? "#111" : "#fff" }}>Execução e Manutenção</option>
                    <option value="outro" style={{ background: isDark ? "#111" : "#fff" }}>Outro</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" style={labelStyle}>Mensagem *</label>
                <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange}
                  style={{ ...inputStyle, resize: "none" }}
                  placeholder="Descreva brevemente sua necessidade..."
                  onFocus={(e) => e.currentTarget.style.borderBottomColor = "#D93E15"}
                  onBlur={(e) => e.currentTarget.style.borderBottomColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)"}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2.5 group"
                style={{
                  backgroundColor: "#D93E15",
                  color: "#FFFFFF",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                  fontSize: "0.65rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  padding: "0.9rem 2rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C03510")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D93E15")}
              >
                Enviar Mensagem
                <ArrowRight style={{ width: "0.8rem", height: "0.8rem" }} />
              </button>
            </form>
          </div>

          {/* Info */}
          <div className={`lg:col-span-2 space-y-8 reveal reveal-delay-3 ${isVisible ? "visible" : ""}`}>
            {/* WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              style={{
                padding: "1.5rem",
                backgroundColor: isDark ? "rgba(217,62,21,0.06)" : "rgba(217,62,21,0.05)",
                border: isDark ? "1px solid rgba(217,62,21,0.15)" : "1px solid rgba(217,62,21,0.2)",
                textDecoration: "none",
                transition: "background-color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = isDark ? "rgba(217,62,21,0.1)" : "rgba(217,62,21,0.08)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(217,62,21,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = isDark ? "rgba(217,62,21,0.06)" : "rgba(217,62,21,0.05)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = isDark ? "rgba(217,62,21,0.15)" : "rgba(217,62,21,0.2)";
              }}
            >
              <Phone style={{ width: "1.1rem", height: "1.1rem", color: "#D93E15", marginBottom: "0.75rem" }} />
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "1rem", color: isDark ? "#F0EDEA" : "#0F0F0F", marginBottom: "0.35rem" }}>
                WhatsApp
              </h3>
              <p style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: isDark ? "rgba(240,237,234,0.5)" : "rgba(15,15,15,0.5)", marginBottom: "0.75rem" }}>
                Atendimento rápido e direto com nossos especialistas.
              </p>
              <span className="inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-200" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#D93E15" }}>
                Falar Agora <ArrowRight style={{ width: "0.7rem", height: "0.7rem" }} />
              </span>
            </a>

            {/* Location */}
            <div style={{ padding: "1.5rem", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)" }}>
              <MapPin style={{ width: "1.1rem", height: "1.1rem", color: "#D93E15", marginBottom: "0.75rem" }} />
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "1rem", color: isDark ? "#F0EDEA" : "#0F0F0F", marginBottom: "0.35rem" }}>
                Localização
              </h3>
              <p style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: isDark ? "rgba(240,237,234,0.5)" : "rgba(15,15,15,0.5)", margin: "0 0 0.35rem 0" }}>
                São Paulo, SP — Brasil
              </p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.08em", color: isDark ? "rgba(240,237,234,0.3)" : "rgba(15,15,15,0.35)", margin: 0 }}>
                Atendemos todo o estado de São Paulo
              </p>
            </div>

            {/* Hours */}
            <div style={{ padding: "1.5rem", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)" }}>
              <Clock style={{ width: "1.1rem", height: "1.1rem", color: "#D93E15", marginBottom: "0.75rem" }} />
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "1rem", color: isDark ? "#F0EDEA" : "#0F0F0F", marginBottom: "0.35rem" }}>
                Horário de Atendimento
              </h3>
              <p style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: isDark ? "rgba(240,237,234,0.5)" : "rgba(15,15,15,0.5)", margin: "0 0 0.35rem 0" }}>
                Seg — Sex: 08h às 18h
              </p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#D93E15", margin: 0 }}>
                Emergências 24h
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
