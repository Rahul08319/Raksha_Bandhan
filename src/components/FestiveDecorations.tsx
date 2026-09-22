import React, { memo } from "react";

// Ornamental Sacred Rakhi SVG Motif
export const SacredRakhiMotif = memo(({ className = "w-20 h-20" }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="rakhiGold" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE047" />
        <stop offset="0.5" stopColor="#EAB308" />
        <stop offset="1" stopColor="#CA8A04" />
      </linearGradient>
      <linearGradient id="rakhiCrimson" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F43F5E" />
        <stop offset="0.6" stopColor="#BE123C" />
        <stop offset="1" stopColor="#881337" />
      </linearGradient>
      <linearGradient id="rakhiThread" x1="0" y1="100" x2="200" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EF4444" />
        <stop offset="0.5" stopColor="#F59E0B" />
        <stop offset="1" stopColor="#EF4444" />
      </linearGradient>
      <filter id="rakhiGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="glow" />
        <feComposite in="SourceGraphic" in2="glow" operator="over" />
      </filter>
    </defs>

    {/* Sacred Threads (Moulee / Kalawa) with Beads */}
    <path
      d="M -40 100 Q 30 115, 70 100"
      stroke="url(#rakhiThread)"
      strokeWidth="4"
      strokeDasharray="4 2"
    />
    <path
      d="M 130 100 Q 170 85, 240 100"
      stroke="url(#rakhiThread)"
      strokeWidth="4"
      strokeDasharray="4 2"
    />

    {/* Thread beads */}
    <circle cx="50" cy="103" r="5" fill="url(#rakhiGold)" />
    <circle cx="62" cy="101" r="3.5" fill="#EF4444" />
    <circle cx="138" cy="99" r="3.5" fill="#EF4444" />
    <circle cx="150" cy="97" r="5" fill="url(#rakhiGold)" />

    {/* Outer Petal Ring (8 Lotus Petals) */}
    <g filter="url(#rakhiGlow)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <path
          key={angle}
          d="M 100 100 C 90 60, 110 60, 100 45 C 90 60, 110 60, 100 100"
          fill="url(#rakhiCrimson)"
          stroke="url(#rakhiGold)"
          strokeWidth="1.5"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
    </g>

    {/* Gold Filigree Ring */}
    <circle
      cx="100"
      cy="100"
      r="32"
      stroke="url(#rakhiGold)"
      strokeWidth="3"
      fill="#FFFBEB"
      fillOpacity="0.15"
    />

    {/* Center Mandala Flower */}
    <circle cx="100" cy="100" r="22" fill="url(#rakhiCrimson)" />
    <circle cx="100" cy="100" r="14" fill="url(#rakhiGold)" />
    
    {/* Sparkling Center Gem */}
    <circle cx="100" cy="100" r="7" fill="#FFFFFF" opacity="0.9" />
    <path
      d="M 100 90 L 102 98 L 110 100 L 102 102 L 100 110 L 98 102 L 90 100 L 98 98 Z"
      fill="#FDE047"
    />
  </svg>
));
SacredRakhiMotif.displayName = "SacredRakhiMotif";

// Animated Auspicious Diya (Oil Lamp)
export const AuspiciousDiya = memo(({ size = 44 }: { size?: number }) => (
  <div className="relative inline-flex flex-col items-center select-none" style={{ width: size, height: size }}>
    {/* Dancing flame */}
    <div className="animate-flame -mb-1">
      <svg width={size * 0.45} height={size * 0.55} viewBox="0 0 24 32" fill="none">
        <defs>
          <radialGradient id="flameGrad" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FEF08A" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#DC2626" />
          </radialGradient>
        </defs>
        <path
          d="M12 0C12 0 4 10 4 20C4 26 7.5 30 12 30C16.5 30 20 26 20 20C20 10 12 0 12 0Z"
          fill="url(#flameGrad)"
        />
      </svg>
    </div>

    {/* Diya Clay Base */}
    <svg width={size} height={size * 0.45} viewBox="0 0 48 22" fill="none">
      <defs>
        <linearGradient id="clayGrad" x1="0" y1="0" x2="48" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B45309" />
          <stop offset="0.5" stopColor="#78350F" />
          <stop offset="1" stopColor="#451A03" />
        </linearGradient>
      </defs>
      {/* Diya bowl */}
      <path
        d="M2 4 C10 18, 38 18, 46 4 C38 8, 10 8, 2 4 Z"
        fill="url(#clayGrad)"
        stroke="#F59E0B"
        strokeWidth="1.2"
      />
      {/* Decorative rim dots */}
      <circle cx="16" cy="11" r="1" fill="#FDE047" />
      <circle cx="24" cy="13" r="1.2" fill="#FDE047" />
      <circle cx="32" cy="11" r="1" fill="#FDE047" />
    </svg>
  </div>
));
AuspiciousDiya.displayName = "AuspiciousDiya";

// Ambient Rotating Background Mandala
export const AmbientMandala = memo(({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none absolute select-none ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full opacity-15 dark:opacity-20 animate-mandala"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="200" cy="200" r="190" strokeWidth="1" strokeDasharray="6 4" />
      <circle cx="200" cy="200" r="160" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="120" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="200" cy="200" r="75" strokeWidth="2" />
      <circle cx="200" cy="200" r="30" strokeWidth="1" />

      {/* Radial petals */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 200 200)`}>
          <path d="M200 40 Q215 100 200 125 Q185 100 200 40" strokeWidth="1.2" />
          <path d="M200 80 Q225 140 200 160 Q175 140 200 80" strokeWidth="0.8" />
          <circle cx="200" cy="30" r="3" fill="currentColor" opacity="0.6" />
        </g>
      ))}
    </svg>
  </div>
));
AmbientMandala.displayName = "AmbientMandala";

// Decorative Festive Toran Header Drape
export const FestiveToran = memo(() => (
  <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-around overflow-hidden opacity-85 select-none" aria-hidden="true">
    {Array.from({ length: 9 }).map((_, i) => (
      <div key={i} className="flex flex-col items-center">
        {/* String curve */}
        <div className="w-14 sm:w-24 h-5 border-b-2 border-amber-500/40 rounded-b-full -mt-2" />
        {/* Marigold flower / Mango leaf motif */}
        <div className="flex items-center gap-1 -mt-1">
          <span className="text-xs sm:text-sm drop-shadow-sm">🌼</span>
          <span className="text-[10px] sm:text-xs">🍃</span>
          <span className="text-xs sm:text-sm drop-shadow-sm">🌸</span>
        </div>
      </div>
    ))}
  </div>
));
FestiveToran.displayName = "FestiveToran";

// Corner Filigree Ornament
export const CornerFiligree = memo(({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const rotation = {
    "top-left": "rotate-0 top-1 left-1",
    "top-right": "rotate-90 top-1 right-1",
    "bottom-right": "rotate-180 bottom-1 right-1",
    "bottom-left": "-rotate-90 bottom-1 left-1",
  }[position];

  return (
    <div className={`pointer-events-none absolute z-10 w-8 h-8 opacity-60 text-amber-500 ${rotation}`} aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor">
        <path d="M2 2 L38 2" strokeWidth="2" />
        <path d="M2 2 L2 38" strokeWidth="2" />
        <path d="M7 7 L28 7" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M7 7 L7 28" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <path d="M2 2 Q18 18 35 2" strokeWidth="1.2" />
        <path d="M2 2 Q18 18 2 35" strokeWidth="1.2" />
      </svg>
    </div>
  );
});
CornerFiligree.displayName = "CornerFiligree";
