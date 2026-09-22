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

/* ── PeacockFeatherRakhi (Mayur Pankh Krishna) ────────────────────────────── */
export const PeacockFeatherRakhi = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer gold ring */}
    <circle cx="60" cy="60" r="56" stroke="url(#peacockGold)" strokeWidth="2.5" fill="none" strokeDasharray="6 3" />
    <circle cx="60" cy="60" r="48" fill="url(#peacockBgGrad)" />

    {/* Feather radiating barbs */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
      <line
        key={i}
        x1="60"
        y1="60"
        x2={60 + 46 * Math.cos((angle * Math.PI) / 180)}
        y2={60 + 46 * Math.sin((angle * Math.PI) / 180)}
        stroke="#059669"
        strokeWidth="1.5"
        opacity="0.6"
      />
    ))}

    {/* Concentric Peacock Eye Layers */}
    <ellipse cx="60" cy="58" rx="34" ry="28" fill="url(#peacockOuterGrad)" />
    <ellipse cx="60" cy="58" rx="26" ry="20" fill="url(#peacockTealGrad)" />
    <ellipse cx="60" cy="59" rx="18" ry="14" fill="url(#peacockBlueGrad)" />
    <ellipse cx="60" cy="60" rx="11" ry="9" fill="url(#peacockPurpleGrad)" />

    {/* Inner golden jewel */}
    <circle cx="60" cy="60" r="5" fill="#FDE047" />
    <circle cx="58" cy="58" r="1.8" fill="white" opacity="0.9" />

    {/* Mini pearl beads around rim */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <circle
        key={i}
        cx={60 + 42 * Math.cos((angle * Math.PI) / 180)}
        cy={60 + 42 * Math.sin((angle * Math.PI) / 180)}
        r="2.5"
        fill="#FEF08A"
        stroke="#CA8A04"
        strokeWidth="0.8"
      />
    ))}

    <defs>
      <linearGradient id="peacockGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <radialGradient id="peacockBgGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#064E3B" />
        <stop offset="100%" stopColor="#022C22" />
      </radialGradient>
      <radialGradient id="peacockOuterGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#D97706" />
        <stop offset="70%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </radialGradient>
      <radialGradient id="peacockTealGrad" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#22D3EE" />
        <stop offset="80%" stopColor="#0891B2" />
        <stop offset="100%" stopColor="#0E7490" />
      </radialGradient>
      <radialGradient id="peacockBlueGrad" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="75%" stopColor="#1D4ED8" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </radialGradient>
      <radialGradient id="peacockPurpleGrad" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="80%" stopColor="#6B21A8" />
        <stop offset="100%" stopColor="#3B0764" />
      </radialGradient>
    </defs>
  </svg>
);

/* ── RudrakshaGoldRakhi (Sacred Vedic Bead) ────────────────────────────────── */
export const RudrakshaGoldRakhi = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer gold radiance */}
    <circle cx="60" cy="60" r="55" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
    <circle cx="60" cy="60" r="46" fill="url(#rudraBgGrad)" />

    {/* Sacred Mauli cord ring */}
    <circle cx="60" cy="60" r="42" stroke="url(#mauliCordGrad)" strokeWidth="3.5" fill="none" />

    {/* Gold spacer beads (left & right) */}
    <circle cx="26" cy="60" r="7" fill="url(#rudraGoldCaps)" />
    <circle cx="94" cy="60" r="7" fill="url(#rudraGoldCaps)" />
    <circle cx="15" cy="60" r="4.5" fill="#EF4444" />
    <circle cx="105" cy="60" r="4.5" fill="#EF4444" />

    {/* Central Rudraksha Bead with organic texture */}
    <circle cx="60" cy="60" r="28" fill="url(#rudrakshaTextureGrad)" />
    {/* 5-Mukhi ridges */}
    <path d="M60 32 Q66 46 60 60 Q54 74 60 88" stroke="#451A03" strokeWidth="2.5" fill="none" opacity="0.8" />
    <path d="M42 42 Q52 50 60 60 Q68 70 78 78" stroke="#451A03" strokeWidth="2.5" fill="none" opacity="0.8" />
    <path d="M78 42 Q68 50 60 60 Q52 70 42 78" stroke="#451A03" strokeWidth="2.5" fill="none" opacity="0.8" />
    <path d="M34 60 Q46 63 60 60 Q74 57 86 60" stroke="#451A03" strokeWidth="2.2" fill="none" opacity="0.75" />

    {/* Gold filigree caps */}
    <path d="M50 34 Q60 38 70 34 Q60 30 50 34Z" fill="url(#rudraGoldCaps)" />
    <path d="M50 86 Q60 82 70 86 Q60 90 50 86Z" fill="url(#rudraGoldCaps)" />
    <circle cx="60" cy="33" r="3" fill="#FEF08A" />
    <circle cx="60" cy="87" r="3" fill="#FEF08A" />

    {/* Center golden bindu */}
    <circle cx="60" cy="60" r="4.5" fill="#FDE047" stroke="#92400E" strokeWidth="1" />

    <defs>
      <radialGradient id="rudraBgGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="80%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>
      <linearGradient id="mauliCordGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="25%" stopColor="#F59E0B" />
        <stop offset="50%" stopColor="#EF4444" />
        <stop offset="75%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
      <radialGradient id="rudrakshaTextureGrad" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#B45309" />
        <stop offset="50%" stopColor="#78350F" />
        <stop offset="85%" stopColor="#451A03" />
        <stop offset="100%" stopColor="#291102" />
      </radialGradient>
      <linearGradient id="rudraGoldCaps" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="50%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#A16207" />
      </linearGradient>
    </defs>
  </svg>
);

/* ── SwastikOmDivineRakhi (Auspicious Om & Swastik) ────────────────────────── */
export const SwastikOmDivineRakhi = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Sunburst rays */}
    {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle, i) => (
      <line
        key={i}
        x1="60"
        y1="60"
        x2={60 + 56 * Math.cos((angle * Math.PI) / 180)}
        y2={60 + 56 * Math.sin((angle * Math.PI) / 180)}
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.75"
      />
    ))}

    {/* Pearl bead ring */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
      <circle
        key={i}
        cx={60 + 46 * Math.cos((angle * Math.PI) / 180)}
        cy={60 + 46 * Math.sin((angle * Math.PI) / 180)}
        r="3.5"
        fill="#FFFBEB"
        stroke="#D97706"
        strokeWidth="1"
      />
    ))}

    {/* Central Gold Medallion */}
    <circle cx="60" cy="60" r="38" fill="url(#omMedalGrad)" stroke="#FDE047" strokeWidth="2" />
    <circle cx="60" cy="60" r="32" fill="url(#omRedCore)" />

    {/* Sacred Sanskrit ॐ (Om) Symbol */}
    <text
      x="60"
      y="71"
      textAnchor="middle"
      fontSize="30"
      fontWeight="bold"
      fill="url(#omGlyphGrad)"
      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
      className="font-serif-luxury select-none"
    >
      ॐ
    </text>

    <defs>
      <radialGradient id="omMedalGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="60%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#92400E" />
      </radialGradient>
      <radialGradient id="omRedCore" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#DC2626" />
        <stop offset="70%" stopColor="#991B1B" />
        <stop offset="100%" stopColor="#7F1D1D" />
      </radialGradient>
      <linearGradient id="omGlyphGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FEF9C3" />
        <stop offset="50%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
  </svg>
);

/* ── LumbaZariBhabhiRakhi (Traditional Rajasthani Lumba) ───────────────────── */
export const LumbaZariBhabhiRakhi = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 120 135"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Upper Zari Medallion */}
    <circle cx="60" cy="45" r="36" fill="url(#lumbaZariGrad)" stroke="#FDE047" strokeWidth="2.5" />
    <circle cx="60" cy="45" r="30" fill="url(#lumbaPinkGrad)" />
    <circle cx="60" cy="45" r="22" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />

    {/* Center flower petals */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <ellipse
        key={i}
        cx={60 + 12 * Math.cos((angle * Math.PI) / 180)}
        cy={45 + 12 * Math.sin((angle * Math.PI) / 180)}
        rx="6"
        ry="3.5"
        transform={`rotate(${angle} ${60 + 12 * Math.cos((angle * Math.PI) / 180)} ${45 + 12 * Math.sin((angle * Math.PI) / 180)})`}
        fill="#FDE047"
      />
    ))}
    <circle cx="60" cy="45" r="5" fill="#EF4444" />

    {/* Hanging Jhumka Bell Canopy */}
    <path d="M42 80 Q60 70 78 80 L74 92 Q60 96 46 92 Z" fill="url(#lumbaZariGrad)" stroke="#B45309" strokeWidth="1" />
    {/* Jhumka connecting chain */}
    <line x1="60" y1="75" x2="60" y2="79" stroke="#EAB308" strokeWidth="2" />

    {/* Hanging Tassels & Pearl drops (animated sway) */}
    <g className="animate-thread-sway" style={{ transformOrigin: "60px 80px" }}>
      {/* 3 hanging bell clappers */}
      <line x1="50" y1="92" x2="48" y2="114" stroke="#F59E0B" strokeWidth="1.5" />
      <circle cx="48" cy="115" r="3" fill="#EF4444" />
      <line x1="60" y1="94" x2="60" y2="122" stroke="#F59E0B" strokeWidth="2" />
      <circle cx="60" cy="124" r="4" fill="#FDE047" stroke="#B45309" strokeWidth="1" />
      <line x1="70" y1="92" x2="72" y2="114" stroke="#F59E0B" strokeWidth="1.5" />
      <circle cx="72" cy="115" r="3" fill="#EF4444" />

      {/* Silk thread fringe */}
      <path d="M46 112 L44 130" stroke="#EC4899" strokeWidth="1.2" opacity="0.85" />
      <path d="M52 114 L52 132" stroke="#EAB308" strokeWidth="1.2" opacity="0.85" />
      <path d="M60 124 L60 134" stroke="#EF4444" strokeWidth="1.8" opacity="0.9" />
      <path d="M68 114 L68 132" stroke="#EAB308" strokeWidth="1.2" opacity="0.85" />
      <path d="M74 112 L76 130" stroke="#EC4899" strokeWidth="1.2" opacity="0.85" />
    </g>

    <defs>
      <linearGradient id="lumbaZariGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
      <radialGradient id="lumbaPinkGrad" cx="45%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="70%" stopColor="#DB2777" />
        <stop offset="100%" stopColor="#831843" />
      </radialGradient>
    </defs>
  </svg>
);

/* ── SilverFiligreeRubyRakhi (Fine Silver & Ruby) ─────────────────────────── */
export const SilverFiligreeRubyRakhi = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Silver outer ring */}
    <circle cx="60" cy="60" r="56" stroke="url(#silverWireGrad)" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="60" cy="60" r="46" fill="url(#silverCoreBg)" />

    {/* Silver filigree 8-point star lace */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 60 60)`}>
        <path d="M60 16 Q54 36 60 46 Q66 36 60 16Z" fill="url(#silverWireGrad)" opacity="0.9" />
        <circle cx="60" cy="18" r="2.2" fill="#FFFFFF" />
      </g>
    ))}

    {/* Silver inner ring with granulation beads */}
    <circle cx="60" cy="60" r="28" fill="none" stroke="#E2E8F0" strokeWidth="2.5" />
    {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
      <circle
        key={i}
        cx={60 + 28 * Math.cos((angle * Math.PI) / 180)}
        cy={60 + 28 * Math.sin((angle * Math.PI) / 180)}
        r="2"
        fill="#FFFFFF"
      />
    ))}

    {/* Ruby setting bezel */}
    <polygon points="60,40 74,46 80,60 74,74 60,80 46,74 40,60 46,46" fill="url(#rubyFacetedGrad)" stroke="#CBD5E1" strokeWidth="1.5" />
    {/* Facet reflections */}
    <polygon points="60,45 69,49 74,60 69,71 60,75 51,71 46,60 51,49" fill="url(#rubyInnerGrad)" />
    {/* Sparkle glint */}
    <polygon points="60,48 64,56 72,60 64,64 60,72 56,64 48,60 56,56" fill="white" opacity="0.65" />
    <circle cx="56" cy="54" r="2" fill="#FFFFFF" opacity="0.95" />

    <defs>
      <linearGradient id="silverWireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>
      <radialGradient id="silverCoreBg" cx="45%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="70%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#475569" />
      </radialGradient>
      <radialGradient id="rubyFacetedGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FB7185" />
        <stop offset="55%" stopColor="#E11D48" />
        <stop offset="100%" stopColor="#881337" />
      </radialGradient>
      <radialGradient id="rubyInnerGrad" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FDA4AF" />
        <stop offset="50%" stopColor="#F43F5E" />
        <stop offset="100%" stopColor="#9F1239" />
      </radialGradient>
    </defs>
  </svg>
);

/* ── Universal Rakhi Motif Renderer (with horizontal silk threads) ────────── */
export const RakhiMotifRenderer = ({
  designId = "kundan",
  className = "w-28 h-28 sm:w-32 sm:h-32",
}: {
  designId?: string;
  className?: string;
}) => {
  const renderMotif = () => {
    switch (designId) {
      case "peacock":
        return <PeacockFeatherRakhi className="w-full h-full drop-shadow-[0_0_16px_rgba(16,185,129,0.55)]" />;
      case "rudraksha":
        return <RudrakshaGoldRakhi className="w-full h-full drop-shadow-[0_0_16px_rgba(245,158,11,0.55)]" />;
      case "om":
        return <SwastikOmDivineRakhi className="w-full h-full drop-shadow-[0_0_16px_rgba(234,88,12,0.6)]" />;
      case "lumba":
        return <LumbaZariBhabhiRakhi className="w-full h-full drop-shadow-[0_0_16px_rgba(236,72,153,0.55)]" />;
      case "ruby":
        return <SilverFiligreeRubyRakhi className="w-full h-full drop-shadow-[0_0_16px_rgba(225,29,72,0.55)]" />;
      case "kundan":
      default:
        return <SacredRakhiMotif className="w-full h-full drop-shadow-[0_0_16px_rgba(245,158,11,0.55)]" />;
    }
  };

  return (
    <div className="relative inline-flex items-center justify-center select-none">
      {/* Left Silk Thread Cord */}
      <div className="hidden sm:block absolute right-full top-1/2 -translate-y-1/2 w-16 md:w-24 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 100 20" fill="none" className="w-full h-5 animate-thread-sway">
          <path d="M0 10 Q25 4 50 10 T100 10" stroke="#EF4444" strokeWidth="2.5" />
          <path d="M0 10 Q25 16 50 10 T100 10" stroke="#F59E0B" strokeWidth="1.8" />
          <circle cx="85" cy="10" r="3.5" fill="#FDE047" />
          <circle cx="50" cy="10" r="2.5" fill="#EF4444" />
        </svg>
      </div>

      {/* Main Rakhi Motif Centerpiece */}
      <div className={className}>
        {renderMotif()}
      </div>

      {/* Right Silk Thread Cord */}
      <div className="hidden sm:block absolute left-full top-1/2 -translate-y-1/2 w-16 md:w-24 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 100 20" fill="none" className="w-full h-5 animate-thread-sway">
          <path d="M0 10 Q25 4 50 10 T100 10" stroke="#EF4444" strokeWidth="2.5" />
          <path d="M0 10 Q25 16 50 10 T100 10" stroke="#F59E0B" strokeWidth="1.8" />
          <circle cx="15" cy="10" r="3.5" fill="#FDE047" />
          <circle cx="50" cy="10" r="2.5" fill="#EF4444" />
        </svg>
      </div>
    </div>
  );
};

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
