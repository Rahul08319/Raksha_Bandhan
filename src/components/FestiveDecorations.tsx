import React from "react";

/* ── AuspiciousDiya ──────────────────────────────────────────────────────── */
export const AuspiciousDiya = ({ size = 56 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="animate-float-gentle drop-shadow-[0_0_12px_rgba(245,158,11,0.7)]"
  >
    {/* Outer glow halo */}
    <ellipse cx="40" cy="62" rx="24" ry="5" fill="rgba(245,158,11,0.22)" />
    {/* Diya body */}
    <path d="M14 46 Q20 62 40 63 Q60 62 66 46 Q54 52 40 52 Q26 52 14 46Z" fill="#D97706" />
    <path d="M14 46 Q20 56 40 57 Q60 56 66 46 Q54 50 40 50 Q26 50 14 46Z" fill="#EAB308" />
    {/* Diya rim */}
    <ellipse cx="40" cy="46" rx="26" ry="6" fill="#F59E0B" />
    <ellipse cx="40" cy="45" rx="22" ry="4.5" fill="#FBBF24" />
    {/* Oil pool */}
    <ellipse cx="40" cy="45" rx="14" ry="3" fill="#92400E" opacity="0.6" />
    {/* Wick */}
    <rect x="39" y="35" width="2" height="11" rx="1" fill="#78350F" />
    {/* Flame — animated via parent class */}
    <g className="animate-flame" style={{ transformOrigin: '40px 32px' }}>
      {/* Outer flame */}
      <ellipse cx="40" cy="26" rx="5.5" ry="11" fill="url(#outerFlame)" opacity="0.9" />
      {/* Core flame */}
      <ellipse cx="40" cy="28" rx="3" ry="7" fill="url(#coreFlame)" />
      {/* Inner glow */}
      <ellipse cx="40" cy="31" rx="1.8" ry="4" fill="#FEF3C7" opacity="0.95" />
      {/* Tip spark */}
      <circle cx="40" cy="17" r="1.5" fill="#FEF9C3" opacity="0.7" />
    </g>
    <defs>
      <radialGradient id="outerFlame" cx="50%" cy="80%" r="55%">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="60%" stopColor="#EF4444" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="coreFlame" cx="50%" cy="70%" r="55%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="50%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3" />
      </radialGradient>
    </defs>
  </svg>
);

/* ── SacredRakhiMotif ────────────────────────────────────────────────────── */
export const SacredRakhiMotif = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer decorative ring */}
    <circle cx="60" cy="60" r="56" stroke="url(#rakhiRingGrad)" strokeWidth="2.5" fill="none" strokeDasharray="8 4" />
    {/* Main circle */}
    <circle cx="60" cy="60" r="44" fill="url(#rakhiBodyGrad)" />
    {/* Silk thread weave pattern */}
    <circle cx="60" cy="60" r="42" stroke="url(#rakhiSilkGrad)" strokeWidth="3" fill="none" opacity="0.7" />
    {/* Lotus petal layer 1 */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <ellipse
        key={i}
        cx={60 + 26 * Math.cos((angle * Math.PI) / 180)}
        cy={60 + 26 * Math.sin((angle * Math.PI) / 180)}
        rx="9"
        ry="5"
        transform={`rotate(${angle} ${60 + 26 * Math.cos((angle * Math.PI) / 180)} ${60 + 26 * Math.sin((angle * Math.PI) / 180)})`}
        fill="url(#petalGrad)"
        opacity="0.85"
      />
    ))}
    {/* Inner lotus */}
    {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
      <ellipse
        key={i}
        cx={60 + 14 * Math.cos((angle * Math.PI) / 180)}
        cy={60 + 14 * Math.sin((angle * Math.PI) / 180)}
        rx="5.5"
        ry="3"
        transform={`rotate(${angle} ${60 + 14 * Math.cos((angle * Math.PI) / 180)} ${60 + 14 * Math.sin((angle * Math.PI) / 180)})`}
        fill="url(#innerPetalGrad)"
        opacity="0.9"
      />
    ))}
    {/* Center gem */}
    <circle cx="60" cy="60" r="10" fill="url(#gemGrad)" />
    <circle cx="60" cy="60" r="7" fill="url(#gemInnerGrad)" />
    <circle cx="57" cy="57" r="2.5" fill="white" opacity="0.7" />
    <defs>
      <radialGradient id="rakhiBodyGrad" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#92400E" />
      </radialGradient>
      <linearGradient id="rakhiRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#FDE047" />
      </linearGradient>
      <linearGradient id="rakhiSilkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
      <radialGradient id="petalGrad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>
      <radialGradient id="innerPetalGrad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FECACA" />
        <stop offset="100%" stopColor="#EC4899" />
      </radialGradient>
      <radialGradient id="gemGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#6D28D9" />
      </radialGradient>
      <radialGradient id="gemInnerGrad" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#DDD6FE" />
        <stop offset="100%" stopColor="#7C3AED" />
      </radialGradient>
    </defs>
  </svg>
);

/* ── AmbientMandala ──────────────────────────────────────────────────────── */
export const AmbientMandala = ({ className = "" }: { className?: string }) => (
  <div
    className={`pointer-events-none absolute select-none opacity-0 animate-[spring-in_1.2s_ease_forwards] ${className}`}
    aria-hidden="true"
    style={{ animationDelay: '0.3s' }}
  >
    <svg viewBox="0 0 300 300" fill="currentColor" className="w-full h-full animate-mandala">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
        <g key={i} transform={`rotate(${a} 150 150)`}>
          <ellipse cx="150" cy="70" rx="8" ry="18" opacity="0.7" />
          <circle cx="150" cy="44" r="5" opacity="0.5" />
          <ellipse cx="150" cy="96" rx="5" ry="11" opacity="0.45" />
        </g>
      ))}
      <circle cx="150" cy="150" r="60" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" strokeDasharray="6 5" />
      <circle cx="150" cy="150" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeDasharray="4 6" />
      <circle cx="150" cy="150" r="18" opacity="0.3" />
    </svg>
  </div>
);

/* ── FestiveToran ────────────────────────────────────────────────────────── */
export const FestiveToran = () => (
  <div
    className="pointer-events-none fixed top-0 left-0 right-0 z-50 flex justify-center px-4"
    aria-hidden="true"
  >
    <svg
      width="100%"
      viewBox="0 0 1200 80"
      preserveAspectRatio="xMidYMin meet"
      className="max-w-screen-xl opacity-90"
    >
      {/* Main garland rope */}
      <path d="M0,12 C100,12 100,50 200,50 C300,50 300,12 400,12 C500,12 500,50 600,50 C700,50 700,12 800,12 C900,12 900,50 1000,50 C1100,50 1100,12 1200,12" stroke="url(#toranRope)" strokeWidth="3.5" fill="none" />

      {/* Decorative drops */}
      {[100,200,300,400,500,600,700,800,900,1000,1100].map((x, i) => {
        const isSwag = i % 2 === 0;
        const y = isSwag ? 50 : 12;
        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            {/* Mango / leaf shape */}
            <ellipse cx="0" cy="12" rx="8" ry="13" fill={i % 3 === 0 ? '#EF4444' : i % 3 === 1 ? '#F97316' : '#22C55E'} opacity="0.92" />
            <ellipse cx="0" cy="10" rx="5" ry="9" fill="rgba(255,255,255,0.25)" />
            {/* Bell */}
            <ellipse cx="0" cy="26" rx="6" ry="5" fill="#F59E0B" opacity="0.9" />
            <ellipse cx="0" cy="30" rx="4" ry="3" fill="#EAB308" />
            <circle cx="0" cy="33" r="1.5" fill="#92400E" />
          </g>
        );
      })}

      {/* Central medallion */}
      <g transform="translate(600, 0)">
        <circle cx="0" cy="18" r="20" fill="url(#medalGrad)" opacity="0.95" />
        <circle cx="0" cy="18" r="15" fill="none" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" />
        <text x="0" y="23" textAnchor="middle" fontSize="14" fill="#92400E" fontWeight="900">🪔</text>
      </g>
      <defs>
        <linearGradient id="toranRope" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="25%" stopColor="#EAB308" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="75%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
        <radialGradient id="medalGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

/* ── CornerFiligree ───────────────────────────────────────────────────────── */
export const CornerFiligree = ({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) => {
  const posClass: Record<string, string> = {
    "top-left":     "top-0 left-0",
    "top-right":    "top-0 right-0 scale-x-[-1]",
    "bottom-left":  "bottom-0 left-0 scale-y-[-1]",
    "bottom-right": "bottom-0 right-0 scale-x-[-1] scale-y-[-1]",
  };
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      className={`pointer-events-none absolute ${posClass[position]} opacity-55`}
      aria-hidden="true"
    >
      <path d="M4,4 Q20,4 4,20" stroke="url(#filGrad)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M4,4 Q32,4 4,32" stroke="url(#filGrad)" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M4,4 Q10,20 24,14" stroke="url(#filGrad)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
      <circle cx="4" cy="4" r="3" fill="url(#filGrad)" opacity="0.9" />
      <circle cx="20" cy="4" r="2" fill="url(#filGrad)" opacity="0.6" />
      <circle cx="4" cy="20" r="2" fill="url(#filGrad)" opacity="0.6" />
      <circle cx="13" cy="10" r="1.5" fill="url(#filGrad)" opacity="0.5" />
      <circle cx="10" cy="13" r="1.5" fill="url(#filGrad)" opacity="0.5" />
      <defs>
        <linearGradient id="filGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
    </svg>
  );
};

/* ── GlowOrb ─────────────────────────────────────────────────────────────── */
export const GlowOrb = ({
  className = "",
  color = "orange",
  size = 400,
}: {
  className?: string;
  color?: string;
  size?: number;
}) => {
  const colorMap: Record<string, string> = {
    orange:   "radial-gradient(circle at 40% 35%, rgba(249,115,22,0.55), rgba(234,88,12,0.25) 45%, transparent 70%)",
    gold:     "radial-gradient(circle at 40% 35%, rgba(245,158,11,0.55), rgba(234,179,8,0.25) 45%, transparent 70%)",
    rose:     "radial-gradient(circle at 40% 35%, rgba(244,63,94,0.45), rgba(236,72,153,0.20) 45%, transparent 70%)",
    violet:   "radial-gradient(circle at 40% 35%, rgba(139,92,246,0.45), rgba(109,40,217,0.20) 45%, transparent 70%)",
    emerald:  "radial-gradient(circle at 40% 35%, rgba(16,185,129,0.45), rgba(5,150,105,0.20) 45%, transparent 70%)",
  };
  return (
    <div
      className={`pointer-events-none absolute rounded-full animate-orb ${className}`}
      style={{
        width: size,
        height: size,
        background: colorMap[color] ?? colorMap.orange,
        filter: "blur(48px)",
      }}
      aria-hidden="true"
    />
  );
};
