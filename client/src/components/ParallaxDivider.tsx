/*
 * ParallaxDivider — Fullwidth background-attachment: fixed
 * Design: Foto P&B com overlay. Sem ornamentos. Texto opcional centrado.
 * Fallback: scroll no iOS/Safari via CSS @supports.
 */

interface ParallaxDividerProps {
  image: string;
  height?: string;
  overlay?: number;
  text?: string;
  subtext?: string;
}

export default function ParallaxDivider({
  image,
  height = "440px",
  overlay = 0.58,
  text,
  subtext,
}: ParallaxDividerProps) {
  return (
    <section
      aria-hidden={!text}
      aria-label={text || undefined}
      className="parallax-section relative w-full flex items-center justify-center"
      style={{
        minHeight: height,
        backgroundImage: `url(${image})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center 15%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${overlay})` }}
        aria-hidden="true"
      />

      {/* Accent line — top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ backgroundColor: "#D93E15", opacity: 0.8 }}
        aria-hidden="true"
      />

      {/* Optional text */}
      {(text || subtext) && (
        <div
          className="relative z-10 text-center px-6"
          style={{ maxWidth: "720px" }}
        >
          {text && (
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(1.4rem, 3vw, 2.25rem)",
                color: "#FFFFFF",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                marginBottom: subtext ? "0.75rem" : 0,
              }}
            >
              {text}
            </p>
          )}
          {subtext && (
            <p
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.875rem, 1.4vw, 1rem)",
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.02em",
                margin: 0,
              }}
            >
              {subtext}
            </p>
          )}
        </div>
      )}

      {/* Accent line — bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ backgroundColor: "rgba(217,62,21,0.3)" }}
        aria-hidden="true"
      />
    </section>
  );
}
