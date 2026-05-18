/*
 * WhatsAppFloat — Botão flutuante WhatsApp
 * Design: Quadrado, sem rounded-full. Sem pulse. Discreto e elegante.
 */
import { WHATSAPP_URL } from "@/lib/constants";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.75rem",
        right: "1.75rem",
        zIndex: 50,
      }}
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com especialista via WhatsApp"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "3rem",
          height: "3rem",
          backgroundColor: "#D93E15",
          color: "#FFFFFF",
          textDecoration: "none",
          transition: "background-color 0.2s ease, transform 0.2s ease",
          boxShadow: "0 4px 20px rgba(217,62,21,0.28)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C03510";
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#D93E15";
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
        }}
      >
        <MessageCircle style={{ width: "1.2rem", height: "1.2rem" }} />
      </a>
    </div>
  );
}
