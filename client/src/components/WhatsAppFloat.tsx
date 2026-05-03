/*
 * WhatsAppFloat — Floating WhatsApp CTA button
 * Design: Pulsing orange button, fixed bottom-right
 */
import { WHATSAPP_URL } from "@/lib/constants";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#d93e15] rounded-full shadow-[0_0_25px_rgba(217,62,21,0.4)] animate-pulse-btn hover:scale-110 transition-transform duration-300"
        aria-label="Falar com especialista via WhatsApp"
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-[#d93e15] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white relative z-10" />
      </a>
    </div>
  );
}
