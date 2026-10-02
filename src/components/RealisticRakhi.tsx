import React, { useState, useRef } from "react";
import { Sparkles, Check, Heart, ShieldCheck, Disc3 } from "lucide-react";
import confetti from "canvas-confetti";
import { festiveAudio } from "@/lib/soundEffects";
import { toast } from "sonner";

export type RealisticRakhiStyle = "kundan" | "peacock" | "rudraksha" | "om";

export interface RealisticRakhiProps {
  style?: RealisticRakhiStyle;
  variant?: "hero" | "card" | "ceremony";
  interactive?: boolean;
  onTie?: () => void;
  className?: string;
  showSelector?: boolean;
}

export const REALISTIC_RAKHI_STYLES: {
  id: RealisticRakhiStyle;
  name: string;
  subtitle: string;
  emoji: string;
  tag: string;
}[] = [
  {
    id: "kundan",
    name: "Royal Kundan Ruby & Pearl",
    subtitle: "Rajputana 22K Gold • Hand-cut Gemstone • Real Moti Halo",
    emoji: "⚜️",
    tag: "Most Popular",
  },
  {
    id: "peacock",
    name: "Krishna Mayur Pankh",
    subtitle: "Iridescent Peacock Feather • Emerald & Sapphire Luster",
    emoji: "🦚",
    tag: "Divine Grace",
  },
  {
    id: "rudraksha",
    name: "Sacred 5-Mukhi Rudraksha",
    subtitle: "Natural Organic Wood • Antique Temple Gold Caps • Mauli",
    emoji: "🕉️",
    tag: "Vedic Protection",
  },
  {
    id: "om",
    name: "Auspicious 24K Gold Om",
    subtitle: "Embossed Sacred Sanskrit ॐ • Sunburst Filigree & Zircon",
    emoji: "🔱",
    tag: "Eternal Peace",
  },
];

export const RealisticRakhi: React.FC<RealisticRakhiProps> = ({
  style: initialStyle = "kundan",
  variant = "hero",
  interactive = true,
  onTie,
  className = "",
  showSelector = false,
}) => {
  const [activeStyle, setActiveStyle] = useState<RealisticRakhiStyle>(initialStyle);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isTied, setIsTied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Apple 3D depth tilt: max 8 degrees
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleTriggerAction = () => {
    festiveAudio.playCelebrationChord();
    festiveAudio.playSparkle();
    setIsTied(true);

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.55 },
      colors: ["#f59e0b", "#ef4444", "#fbbf24", "#ec4899", "#10b981"],
    });

    toast.success("✨ The sacred thread is tied with love & lifelong protection! 🪔💖", {
      duration: 5000,
    });

    if (onTie) onTie();
  };

  const isHero = variant === "hero";
  const isCard = variant === "card";

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* ── 3D Interactive Stage ── */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={handlePointerLeave}
        onClick={interactive ? handleTriggerAction : undefined}
        style={{ perspective: "1200px" }}
        className={`relative w-full flex items-center justify-center cursor-pointer transition-transform ${
          isHero ? "py-8 sm:py-12" : isCard ? "py-3" : "py-4"
        }`}
        title="Hover to rotate in 3D • Tap to tie sacred Rakhi"
        aria-label="Real look-like animated Rakhi"
      >
        {/* Dynamic 3D transform container */}
        <div
          className="relative flex items-center justify-center w-full max-w-2xl transition-transform duration-150 ease-out"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Ambient Golden Floor Shadow */}
          <div
            className="absolute bottom-[-15px] sm:bottom-[-25px] w-3/4 h-8 sm:h-12 bg-black/25 dark:bg-black/50 blur-xl rounded-full transition-all duration-300"
            style={{
              transform: `translateX(${-tilt.y * 3}px) translateY(${tilt.x * 2}px) scale(${isHovered ? 1.08 : 1})`,
            }}
            aria-hidden="true"
          />

          {/* ── Left Sacred Kalawa / Mauli Thread ── */}
          <div className="relative flex-1 flex items-center justify-end overflow-visible pr-1 pointer-events-none">
            <svg
              viewBox="0 0 280 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[140px] sm:max-w-[240px] h-12 sm:h-16 animate-thread-left"
              aria-hidden="true"
            >
              <defs>
                {/* Twisted silk thread gradients */}
                <linearGradient id="silkCrimsonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#991B1B" />
                  <stop offset="50%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
                <linearGradient id="silkSaffronGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#FBBF24" />
                </linearGradient>
                <linearGradient id="zariGoldWire" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="50%" stopColor="#EAB308" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <radialGradient id="spacerPearl" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#FEF3C7" />
                  <stop offset="100%" stopColor="#D97706" />
                </radialGradient>
                <radialGradient id="rudraSpacerGrad" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#92400E" />
                  <stop offset="60%" stopColor="#78350F" />
                  <stop offset="100%" stopColor="#451A03" />
                </radialGradient>
              </defs>

              {/* Twisted Red Strand */}
              <path
                d="M10 30 Q70 18 140 32 T270 30"
                stroke="url(#silkCrimsonGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
              />
              {/* Intertwined Saffron Strand */}
              <path
                d="M10 30 Q70 42 140 28 T270 30"
                stroke="url(#silkSaffronGrad)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Golden Zari Wire Twirl */}
              <path
                d="M10 30 Q70 24 140 30 T270 30"
                stroke="url(#zariGoldWire)"
                strokeWidth="1.8"
                strokeDasharray="5 3"
                opacity="0.9"
              />

              {/* Thread Spacer Beads & Knots */}
              {/* Outer Tassel knot */}
              <circle cx="35" cy="28" r="4.5" fill="url(#zariGoldWire)" stroke="#78350F" strokeWidth="0.8" />
              <circle cx="55" cy="31" r="5" fill="url(#spacerPearl)" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.4))" />
              <circle cx="100" cy="27" r="6" fill="url(#rudraSpacerGrad)" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.4))" />
              {/* Gold Spacer Ring near Dial */}
              <circle cx="215" cy="29" r="6.5" fill="url(#spacerPearl)" />
              <circle cx="245" cy="30" r="7.5" fill="url(#zariGoldWire)" stroke="#92400E" strokeWidth="1" />
              <circle cx="245" cy="30" r="4" fill="#DC2626" />
            </svg>

            {/* Left Hanging Latkan Tassels */}
            <div className="absolute left-2 sm:left-6 top-1/2 mt-1 sm:mt-2 animate-tassel origin-top">
              <svg viewBox="0 0 30 65" fill="none" className="w-5 sm:w-7 h-12 sm:h-16">
                <path d="M15 0 L15 28" stroke="#DC2626" strokeWidth="2.5" />
                <path d="M13 0 L13 28" stroke="#F59E0B" strokeWidth="1.5" />
                <circle cx="14" cy="28" r="4" fill="#FDE047" stroke="#B45309" strokeWidth="0.8" />
                {/* Silky Tassel Fringe */}
                <path d="M8 32 Q14 62 14 65 Q14 62 20 32 Z" fill="#DC2626" />
                <path d="M11 32 Q14 62 14 65 Q14 62 17 32 Z" fill="#F59E0B" />
              </svg>
            </div>
          </div>

          {/* ── Central Master 3D Medallion ── */}
          <div
            className="relative shrink-0 animate-rakhi-sway transition-transform duration-300"
            style={{
              transform: isHovered ? "scale(1.06) translateZ(30px)" : "scale(1) translateZ(10px)",
            }}
          >
            {/* Divine Golden Halo Aura */}
            <div
              className="absolute inset-[-20px] rounded-full bg-gradient-to-r from-amber-500/25 via-rose-500/20 to-amber-400/30 blur-2xl animate-halo-pulse pointer-events-none"
              aria-hidden="true"
            />

            {/* High-Precision Scalable SVG Master Dial */}
            <div
              className={`relative drop-shadow-[0_15px_30px_rgba(234,88,12,0.35)] ${
                isHero
                  ? "w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64"
                  : isCard
                  ? "w-28 h-28 sm:w-36 sm:h-36"
                  : "w-36 h-36 sm:w-44 sm:h-44"
              }`}
            >
              {renderRealisticDial(activeStyle)}

              {/* Dynamic Diagonal Glint Sweep Effect */}
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-full animate-glint"
                aria-hidden="true"
              >
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/70 to-transparent transform -skew-x-12" />
              </div>
            </div>

            {/* Interactive "Tied with Love" Badge */}
            {isTied && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1 animate-badge-pop">
                <Check className="h-3 w-3 stroke-[3]" />
                <span>Rakhi Tied!</span>
              </div>
            )}
          </div>

          {/* ── Right Sacred Kalawa / Mauli Thread ── */}
          <div className="relative flex-1 flex items-center justify-start overflow-visible pl-1 pointer-events-none">
            <svg
              viewBox="0 0 280 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[140px] sm:max-w-[240px] h-12 sm:h-16 animate-thread-right"
              aria-hidden="true"
            >
              {/* Twisted Red Strand */}
              <path
                d="M10 30 Q140 18 210 32 T270 30"
                stroke="url(#silkCrimsonGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
              />
              {/* Intertwined Saffron Strand */}
              <path
                d="M10 30 Q140 42 210 28 T270 30"
                stroke="url(#silkSaffronGrad)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Golden Zari Wire Twirl */}
              <path
                d="M10 30 Q140 24 210 30 T270 30"
                stroke="url(#zariGoldWire)"
                strokeWidth="1.8"
                strokeDasharray="5 3"
                opacity="0.9"
              />

              {/* Thread Spacer Beads near Dial */}
              <circle cx="35" cy="30" r="7.5" fill="url(#zariGoldWire)" stroke="#92400E" strokeWidth="1" />
              <circle cx="35" cy="30" r="4" fill="#DC2626" />
              <circle cx="65" cy="29" r="6.5" fill="url(#spacerPearl)" />

              {/* Outer Spacer Beads */}
              <circle cx="180" cy="27" r="6" fill="url(#rudraSpacerGrad)" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.4))" />
              <circle cx="225" cy="31" r="5" fill="url(#spacerPearl)" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.4))" />
              <circle cx="245" cy="28" r="4.5" fill="url(#zariGoldWire)" stroke="#78350F" strokeWidth="0.8" />
            </svg>

            {/* Right Hanging Latkan Tassels */}
            <div className="absolute right-2 sm:right-6 top-1/2 mt-1 sm:mt-2 animate-tassel origin-top [animation-delay:1.2s]">
              <svg viewBox="0 0 30 65" fill="none" className="w-5 sm:w-7 h-12 sm:h-16">
                <path d="M15 0 L15 28" stroke="#DC2626" strokeWidth="2.5" />
                <path d="M13 0 L13 28" stroke="#F59E0B" strokeWidth="1.5" />
                <circle cx="14" cy="28" r="4" fill="#FDE047" stroke="#B45309" strokeWidth="0.8" />
                {/* Silky Tassel Fringe */}
                <path d="M8 32 Q14 62 14 65 Q14 62 20 32 Z" fill="#DC2626" />
                <path d="M11 32 Q14 62 14 65 Q14 62 17 32 Z" fill="#F59E0B" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Optional Style Selector Carousel (Hero mode) ── */}
      {showSelector && (
        <div className="mt-6 w-full max-w-xl">
          <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="font-cinzel text-xs sm:text-sm font-extrabold text-foreground">
                Choose Real Rakhi Craftsmanship
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground font-semibold">
              4 Authentic Designs
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {REALISTIC_RAKHI_STYLES.map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  festiveAudio.playSparkle();
                  setActiveStyle(st.id);
                  toast.success(`Chosen: ${st.name} ✨`);
                }}
                className={`p-2.5 rounded-2xl text-left transition-all press-effect border flex flex-col justify-between ${
                  activeStyle === st.id
                    ? "glass-heavy border-amber-400 bg-amber-500/20 shadow-glow-sm"
                    : "glass border-amber-500/20 hover:border-amber-400/40"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">{st.emoji}</span>
                  {activeStyle === st.id && (
                    <span className="h-4 w-4 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  )}
                </div>
                <div className="font-cinzel text-xs font-bold text-foreground leading-tight truncate">
                  {st.name.split(" ")[0]} {st.name.split(" ")[1]}
                </div>
                <div className="text-[9px] text-muted-foreground mt-0.5 truncate">
                  {st.tag}
                </div>
              </button>
            ))}
          </div>

          {/* Quick Action Button */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={handleTriggerAction}
              className="px-6 py-2.5 rounded-2xl bg-grad-festive text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-glow press-effect transition-all flex items-center gap-2"
            >
              <Heart className="h-4 w-4 text-rose-200 fill-rose-200" />
              <span>Touch to Bless &amp; Tie Sacred Rakhi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   PHOTOREALISTIC DIAL RENDERERS (Vector 3D Jewelry Engine)
────────────────────────────────────────────────────────────────────────────── */
function renderRealisticDial(style: RealisticRakhiStyle) {
  switch (style) {
    case "peacock":
      return <RealisticPeacockDial />;
    case "rudraksha":
      return <RealisticRudrakshaDial />;
    case "om":
      return <RealisticOmDial />;
    case "kundan":
    default:
      return <RealisticKundanRubyDial />;
  }
}

/* ── 1. Royal Kundan Ruby & Pearl Medallion ── */
const RealisticKundanRubyDial = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      {/* 22K Metallic Gold Gradient with Inset Specular Depth */}
      <linearGradient id="gold22kMetal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF9E6" />
        <stop offset="20%" stopColor="#FDE047" />
        <stop offset="45%" stopColor="#EAB308" />
        <stop offset="70%" stopColor="#CA8A04" />
        <stop offset="90%" stopColor="#854D0E" />
        <stop offset="100%" stopColor="#543007" />
      </linearGradient>

      {/* Deep Faceted Ruby Crystal Gradient */}
      <radialGradient id="rubyGemCenter" cx="38%" cy="32%" r="68%">
        <stop offset="0%" stopColor="#FDA4AF" />
        <stop offset="25%" stopColor="#F43F5E" />
        <stop offset="60%" stopColor="#E11D48" />
        <stop offset="85%" stopColor="#9F1239" />
        <stop offset="100%" stopColor="#4C0519" />
      </radialGradient>

      {/* 3D Pearl Spherical Shading with Top Light Pin */}
      <radialGradient id="sphericalPearl" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#FFFBEB" />
        <stop offset="75%" stopColor="#FEF3C7" />
        <stop offset="92%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#D97706" />
      </radialGradient>

      {/* Kundan Gold Collet Enamel Inlay */}
      <radialGradient id="kundanEnamelRed" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="70%" stopColor="#B91C1C" />
        <stop offset="100%" stopColor="#7F1D1D" />
      </radialGradient>

      {/* Drop shadow filter for 3D pearl depth */}
      <filter id="pearlShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#78350F" floodOpacity="0.4" />
      </filter>
    </defs>

    {/* Base 22K Gold Backplate with Radiant Filigree Rays */}
    <circle cx="100" cy="100" r="94" fill="url(#gold22kMetal)" stroke="#FDE047" strokeWidth="2.5" />
    <circle cx="100" cy="100" r="88" stroke="#78350F" strokeWidth="1.5" strokeDasharray="3 2" fill="none" opacity="0.6" />

    {/* Radiant Filigree Sunburst Prongs */}
    {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((angle, idx) => (
      <line
        key={idx}
        x1="100"
        y1="100"
        x2={100 + 91 * Math.cos((angle * Math.PI) / 180)}
        y2={100 + 91 * Math.sin((angle * Math.PI) / 180)}
        stroke="#FFF8DC"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    ))}

    {/* ── Outer Halo of 24 Realistic 3D Pearls (Moti) ── */}
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      const x = 100 + 82 * Math.cos((angle * Math.PI) / 180);
      const y = 100 + 82 * Math.sin((angle * Math.PI) / 180);
      return (
        <g key={`pearl-${i}`} filter="url(#pearlShadow)">
          {/* Pearl sphere */}
          <circle cx={x} cy={y} r="6.2" fill="url(#sphericalPearl)" />
          {/* Specular White Highlight Pin */}
          <ellipse cx={x - 2} cy={y - 2.2} rx="1.8" ry="1.2" fill="#FFFFFF" opacity="0.95" />
        </g>
      );
    })}

    {/* Golden Inset Chaton Ring */}
    <circle cx="100" cy="100" r="72" fill="#92400E" stroke="url(#gold22kMetal)" strokeWidth="3" />

    {/* ── Kundan Teardrop Petals (12 Red Enamel & Gold Petals) ── */}
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 360) / 12;
      const x = 100 + 52 * Math.cos((angle * Math.PI) / 180);
      const y = 100 + 52 * Math.sin((angle * Math.PI) / 180);
      return (
        <g key={`kundan-${i}`} transform={`rotate(${angle} ${x} ${y})`}>
          {/* Gold Collet Border */}
          <path
            d={`M${x - 8} ${y} Q${x} ${y - 18} ${x + 8} ${y} Q${x} ${y + 12} ${x - 8} ${y}Z`}
            fill="url(#gold22kMetal)"
            stroke="#78350F"
            strokeWidth="0.8"
          />
          {/* Inner Ruby Glass Enamel */}
          <path
            d={`M${x - 5.5} ${y} Q${x} ${y - 14} ${x + 5.5} ${y} Q${x} ${y + 9} ${x - 5.5} ${y}Z`}
            fill="url(#kundanEnamelRed)"
          />
          {/* Facet Reflection */}
          <circle cx={x - 1.5} cy={y - 4} r="1.5" fill="#FDA4AF" opacity="0.8" />
        </g>
      );
    })}

    {/* Inner Micro-Crystal Diamond Border Ring */}
    <circle cx="100" cy="100" r="42" fill="url(#gold22kMetal)" stroke="#CA8A04" strokeWidth="2" />
    {Array.from({ length: 18 }).map((_, i) => {
      const angle = (i * 360) / 18;
      const cx = 100 + 39 * Math.cos((angle * Math.PI) / 180);
      const cy = 100 + 39 * Math.sin((angle * Math.PI) / 180);
      return (
        <circle key={`diamond-${i}`} cx={cx} cy={cy} r="2.2" fill="#FFFFFF" stroke="#D97706" strokeWidth="0.5" />
      );
    })}

    {/* ── Central Master Faceted Cushion-Cut Ruby Gemstone ── */}
    {/* Gem Collet Base */}
    <polygon
      points="80,72 120,72 128,100 120,128 80,128 72,100"
      fill="url(#gold22kMetal)"
      stroke="#78350F"
      strokeWidth="2"
    />
    {/* Main Faceted Ruby */}
    <polygon
      points="83,75 117,75 125,100 117,125 83,125 75,100"
      fill="url(#rubyGemCenter)"
    />
    {/* Ruby Table & Pavilion Facet Cuts */}
    <polygon points="90,83 110,83 115,100 110,117 90,117 85,100" fill="#E11D48" opacity="0.85" />
    <polygon points="94,88 106,88 110,100 106,112 94,112 90,100" fill="#F43F5E" opacity="0.9" />

    {/* Specular White Gleam Flares */}
    <polygon points="92,89 104,89 98,96" fill="#FFFFFF" opacity="0.9" />
    <circle cx="88" cy="94" r="2" fill="#FFFFFF" opacity="0.85" />
    <circle cx="114" cy="108" r="1.5" fill="#FDA4AF" opacity="0.7" />
  </svg>
);

/* ── 2. Krishna Mayur Pankh (Peacock Feather) Medallion ── */
const RealisticPeacockDial = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="peacockEyeOuter" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="60%" stopColor="#059669" />
        <stop offset="100%" stopColor="#064E3B" />
      </radialGradient>
      <radialGradient id="peacockTeal" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stopColor="#67E8F9" />
        <stop offset="50%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#0E7490" />
      </radialGradient>
      <radialGradient id="peacockSapphire" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="60%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </radialGradient>
      <radialGradient id="peacockPurple" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stopColor="#C084FC" />
        <stop offset="60%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#3B0764" />
      </radialGradient>
    </defs>

    {/* Gold Outer Medallion */}
    <circle cx="100" cy="100" r="92" fill="#022C22" stroke="#FDE047" strokeWidth="3" />
    <circle cx="100" cy="100" r="85" stroke="#10B981" strokeWidth="2" strokeDasharray="4 3" fill="none" />

    {/* Radiating Green & Gold Feather Barbs */}
    {Array.from({ length: 36 }).map((_, i) => {
      const angle = (i * 360) / 36;
      return (
        <line
          key={`barb-${i}`}
          x1="100"
          y1="100"
          x2={100 + 82 * Math.cos((angle * Math.PI) / 180)}
          y2={100 + 82 * Math.sin((angle * Math.PI) / 180)}
          stroke={i % 2 === 0 ? "#10B981" : "#F59E0B"}
          strokeWidth="1.5"
          opacity="0.75"
        />
      );
    })}

    {/* Mini Gold Pearls */}
    {Array.from({ length: 20 }).map((_, i) => {
      const angle = (i * 360) / 20;
      const x = 100 + 78 * Math.cos((angle * Math.PI) / 180);
      const y = 100 + 78 * Math.sin((angle * Math.PI) / 180);
      return <circle key={`gp-${i}`} cx={x} cy={y} r="4" fill="#FDE047" stroke="#92400E" strokeWidth="0.8" />;
    })}

    {/* Concentric Peacock Eye Layers */}
    <ellipse cx="100" cy="98" rx="60" ry="50" fill="url(#peacockEyeOuter)" stroke="#FDE047" strokeWidth="2" />
    <ellipse cx="100" cy="98" rx="46" ry="38" fill="url(#peacockTeal)" />
    <ellipse cx="100" cy="100" rx="34" ry="27" fill="url(#peacockSapphire)" />
    <ellipse cx="100" cy="102" rx="22" ry="17" fill="url(#peacockPurple)" />

    {/* Central 24K Gold Jewel Core */}
    <circle cx="100" cy="102" r="10" fill="#FDE047" stroke="#D97706" strokeWidth="1.5" />
    <circle cx="97" cy="99" r="3.5" fill="#FFFFFF" opacity="0.95" />
  </svg>
);

/* ── 3. Sacred 5-Mukhi Rudraksha Medallion ── */
const RealisticRudrakshaDial = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="woodTexture" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#B45309" />
        <stop offset="40%" stopColor="#78350F" />
        <stop offset="75%" stopColor="#451A03" />
        <stop offset="100%" stopColor="#1C0A00" />
      </radialGradient>
      <linearGradient id="antiqueGoldCap" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="50%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>
    </defs>

    {/* Outer Mauli Sunburst Ring */}
    <circle cx="100" cy="100" r="92" stroke="#EF4444" strokeWidth="5" fill="#FEF3C7" opacity="0.9" />
    <circle cx="100" cy="100" r="86" stroke="#F59E0B" strokeWidth="4" fill="none" strokeDasharray="6 4" />

    {/* Gold Filigree Spacer Beads */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <circle
        key={i}
        cx={100 + 75 * Math.cos((angle * Math.PI) / 180)}
        cy={100 + 75 * Math.sin((angle * Math.PI) / 180)}
        r="6"
        fill="url(#antiqueGoldCap)"
        stroke="#78350F"
        strokeWidth="1"
      />
    ))}

    {/* Central Natural 5-Mukhi Rudraksha Sphere */}
    <circle cx="100" cy="100" r="56" fill="url(#woodTexture)" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.5))" />

    {/* 5 Organic Natural Mukhi Ridges & Clefts */}
    <path d="M100 46 Q112 72 100 100 Q88 128 100 154" stroke="#291102" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M70 65 Q90 82 100 100 Q112 118 130 135" stroke="#291102" strokeWidth="4" strokeLinecap="round" />
    <path d="M130 65 Q110 82 100 100 Q90 118 70 135" stroke="#291102" strokeWidth="4" strokeLinecap="round" />
    <path d="M52 100 Q76 104 100 100 Q124 96 148 100" stroke="#291102" strokeWidth="4" strokeLinecap="round" />

    {/* Wood Specular Highlight & Organic Grain */}
    <ellipse cx="85" cy="78" rx="8" ry="4" transform="rotate(-25 85 78)" fill="#D97706" opacity="0.6" />
    <ellipse cx="82" cy="75" rx="3" ry="1.5" transform="rotate(-25 82 75)" fill="#FEF3C7" opacity="0.75" />

    {/* 22K Antique Gold Crown End Caps */}
    <path d="M78 50 Q100 62 122 50 Q100 42 78 50Z" fill="url(#antiqueGoldCap)" stroke="#78350F" strokeWidth="1" />
    <path d="M78 150 Q100 138 122 150 Q100 158 78 150Z" fill="url(#antiqueGoldCap)" stroke="#78350F" strokeWidth="1" />
    <circle cx="100" cy="48" r="5" fill="#FEF08A" />
    <circle cx="100" cy="152" r="5" fill="#FEF08A" />

    {/* Auspicious Center Bindu */}
    <circle cx="100" cy="100" r="7" fill="#FDE047" stroke="#78350F" strokeWidth="1.5" />
    <circle cx="98" cy="98" r="2" fill="#FFFFFF" />
  </svg>
);

/* ── 4. Auspicious 24K Gold Om Medallion ── */
const RealisticOmDial = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Outer Sunburst Radiance */}
    <circle cx="100" cy="100" r="92" fill="#991B1B" stroke="#FDE047" strokeWidth="3" />
    {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((angle, i) => (
      <line
        key={i}
        x1="100"
        y1="100"
        x2={100 + 88 * Math.cos((angle * Math.PI) / 180)}
        y2={100 + 88 * Math.sin((angle * Math.PI) / 180)}
        stroke="#F59E0B"
        strokeWidth="2"
        opacity="0.8"
      />
    ))}

    {/* Ring of 20 Lustrous Pearls */}
    {Array.from({ length: 20 }).map((_, i) => {
      const angle = (i * 360) / 20;
      const x = 100 + 78 * Math.cos((angle * Math.PI) / 180);
      const y = 100 + 78 * Math.sin((angle * Math.PI) / 180);
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="5.5"
          fill="#FFFBEB"
          stroke="#D97706"
          strokeWidth="1"
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
        />
      );
    })}

    {/* Gold Filigree Medallion Base */}
    <circle cx="100" cy="100" r="66" fill="#F59E0B" stroke="#FDE047" strokeWidth="3" />
    <circle cx="100" cy="100" r="58" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="2" />

    {/* 3D Beveled Sanskrit ॐ Symbol */}
    <text
      x="100"
      y="118"
      textAnchor="middle"
      fontSize="54"
      fontWeight="900"
      fill="#FEF08A"
      stroke="#78350F"
      strokeWidth="2"
      filter="drop-shadow(0 4px 8px rgba(0,0,0,0.6))"
      className="font-serif-luxury select-none"
    >
      ॐ
    </text>
  </svg>
);
