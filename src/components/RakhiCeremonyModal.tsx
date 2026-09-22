import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Check, RotateCcw, X, Heart, Award } from "lucide-react";
import confetti from "canvas-confetti";
import { festiveAudio } from "@/lib/soundEffects";
import { RakhiMotifRenderer, AuspiciousDiya } from "@/components/FestiveDecorations";

interface RakhiCeremonyProps {
  siblingName: string;
  isOpen: boolean;
  onClose: () => void;
  rakhiDesignId?: string;
}

export const RakhiCeremonyModal: React.FC<RakhiCeremonyProps> = ({
  siblingName,
  isOpen,
  onClose,
  rakhiDesignId = "kundan",
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [aartiRotations, setAartiRotations] = useState(0);
  const [tilakApplied, setTilakApplied] = useState(false);
  const [rakhiTied, setRakhiTied] = useState(false);
  const [chosenSweet, setChosenSweet] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAartiRotate = () => {
    festiveAudio.playChime(659.25, 0.8);
    const next = aartiRotations + 1;
    setAartiRotations(next);
    if (next >= 3) {
      setTimeout(() => {
        festiveAudio.playSparkle();
        setStep(2);
      }, 500);
    }
  };

  const handleApplyTilak = () => {
    festiveAudio.playChime(784, 1.2);
    setTilakApplied(true);
    setTimeout(() => {
      festiveAudio.playSparkle();
      setStep(3);
    }, 600);
  };

  const handleTieRakhi = () => {
    festiveAudio.playCelebrationChord();
    setRakhiTied(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#f97316", "#eab308", "#ec4899", "#ffd700"],
    });
    setTimeout(() => {
      setStep(4);
    }, 700);
  };

  const handleFeedSweet = (sweet: string) => {
    festiveAudio.playCelebrationChord();
    setChosenSweet(sweet);
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0.5 },
      colors: ["#22c55e", "#f59e0b", "#ec4899", "#8b5cf6"],
    });
    setTimeout(() => {
      setStep(5);
    }, 800);
  };

  const resetCeremony = () => {
    setStep(1);
    setAartiRotations(0);
    setTilakApplied(false);
    setRakhiTied(false);
    setChosenSweet(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg rounded-3xl border border-amber-500/40 bg-card/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-center overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-background/80 transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Ribbon */}
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>VIRTUAL RAKHI CEREMONY</span>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[
            { num: 1, label: "Aarti" },
            { num: 2, label: "Tilak" },
            { num: 3, label: "Rakhi" },
            { num: 4, label: "Mithai" },
            { num: 5, label: "Blessings" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-1">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition ${
                  step === s.num
                    ? "bg-amber-500 text-amber-950 shadow-glow"
                    : step > s.num
                    ? "bg-emerald-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s.num ? <Check className="h-3 w-3" /> : s.num}
              </div>
              <span className="hidden sm:inline text-[11px] font-semibold text-muted-foreground">
                {s.label}
              </span>
              {s.num < 5 && <div className="w-2 sm:w-4 h-[2px] bg-border" />}
            </div>
          ))}
        </div>

        {/* Step 1: Aarti */}
        {step === 1 && (
          <div className="space-y-4 py-4">
            <h3 className="font-cinzel text-xl font-bold text-foreground sm:text-2xl">
              1. Perform Sacred Aarti
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Circle the divine diya lamp around {siblingName} to illuminate blessings and ward off negativity.
            </p>

            <div className="py-6 flex flex-col items-center justify-center">
              <button
                onClick={handleAartiRotate}
                className="group relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-dashed border-amber-500/50 bg-amber-500/10 transition hover:scale-105 active:scale-95 cursor-pointer shadow-glow"
              >
                <div
                  className="transition-transform duration-500"
                  style={{ transform: `rotate(${aartiRotations * 120}deg)` }}
                >
                  <AuspiciousDiya size={54} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition">
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-300 mt-20">
                    Tap to Circle
                  </span>
                </div>
              </button>

              <div className="mt-4 text-xs font-bold text-primary">
                Aarti circles: {aartiRotations} / 3
              </div>
            </div>

            <Button
              onClick={handleAartiRotate}
              className="rounded-2xl bg-gradient-gold text-amber-950 font-bold px-6"
            >
              Rotate Aarti Plate 🪔
            </Button>
          </div>
        )}

        {/* Step 2: Tilak */}
        {step === 2 && (
          <div className="space-y-4 py-4">
            <h3 className="font-cinzel text-xl font-bold text-foreground sm:text-2xl">
              2. Apply Auspicious Tilak
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Apply the sacred vermillion Kumkum and holy Akshat rice grains on {siblingName}&apos;s forehead.
            </p>

            <div className="py-6 flex flex-col items-center justify-center">
              <button
                onClick={handleApplyTilak}
                className="group relative flex h-36 w-36 items-center justify-center rounded-full border-2 border-rose-500/50 bg-rose-500/10 shadow-festive hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                {tilakApplied ? (
                  <div className="text-center">
                    <div className="text-4xl animate-bounce">🔴</div>
                    <div className="text-xs font-bold text-rose-600 mt-1">Tilak Applied!</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-3xl mb-1">✨</div>
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                      Tap to Apply Tilak
                    </span>
                  </div>
                )}
              </button>
            </div>

            <Button
              onClick={handleApplyTilak}
              className="rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold px-6"
            >
              Apply Shubh Tilak 🔴
            </Button>
          </div>
        )}

        {/* Step 3: Tie Rakhi */}
        {step === 3 && (
          <div className="space-y-4 py-4">
            <h3 className="font-cinzel text-xl font-bold text-foreground sm:text-2xl">
              3. Tie the Sacred Rakhi
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Tie the sacred golden thread of love and lifelong protection on {siblingName}&apos;s wrist.
            </p>

            <div className="py-6 flex flex-col items-center justify-center">
              <button
                onClick={handleTieRakhi}
                className="group relative flex h-40 w-40 items-center justify-center rounded-full border-2 border-amber-500/60 bg-amber-500/15 shadow-glow hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                {rakhiTied ? (
                  <div className="text-center">
                    <div className="text-4xl animate-wiggle">💖</div>
                    <div className="text-xs font-bold text-amber-600 mt-1">Rakhi Tied!</div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <RakhiMotifRenderer designId={rakhiDesignId} className="w-20 h-20 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-300 mt-1">
                      Tap to Tie Rakhi
                    </span>
                  </div>
                )}
              </button>
            </div>

            <Button
              onClick={handleTieRakhi}
              className="rounded-2xl bg-gradient-festive text-white font-bold px-6"
            >
              Tie Sacred Rakhi 🧵
            </Button>
          </div>
        )}

        {/* Step 4: Offer Sweets */}
        {step === 4 && (
          <div className="space-y-4 py-4">
            <h3 className="font-cinzel text-xl font-bold text-foreground sm:text-2xl">
              4. Offer Festive Mithai
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Select a traditional festive sweet to feed {siblingName} for lifelong sweetness.
            </p>

            <div className="grid grid-cols-3 gap-3 py-4">
              {[
                { id: "kaju", label: "Kaju Katli", emoji: "🍬", desc: "Silvery Sweet" },
                { id: "ladoo", label: "Motichoor Ladoo", emoji: "🟡", desc: "Golden Delicacy" },
                { id: "gulab", label: "Gulab Jamun", emoji: "🍩", desc: "Warm & Juicy" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleFeedSweet(m.label)}
                  className="rounded-2xl border-2 border-amber-500/30 bg-background/60 p-3 hover:border-amber-500 hover:bg-amber-500/15 hover:scale-105 transition flex flex-col items-center text-center"
                >
                  <span className="text-3xl mb-1">{m.emoji}</span>
                  <span className="text-xs font-bold text-foreground">{m.label}</span>
                  <span className="text-[10px] text-muted-foreground">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Ceremony Completed */}
        {step === 5 && (
          <div className="space-y-4 py-4 animate-in zoom-in-95 duration-400">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold shadow-glow">
              <Award className="h-10 w-10 text-amber-950" />
            </div>

            <h3 className="font-cinzel text-2xl font-black text-gradient-gold sm:text-3xl">
              Ceremony Completed! 🪔✨
            </h3>

            <p className="text-sm leading-relaxed text-foreground/90 max-w-sm mx-auto">
              The sacred Raksha Bandhan ritual for <strong>{siblingName}</strong> is complete with Aarti, Tilak, Rakhi, and delicious {chosenSweet ?? "Mithai"}!
            </p>

            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs font-semibold text-amber-700 dark:text-amber-300">
              💖 Tied with infinite love, sacred promises, and lifelong protection.
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-3 justify-center">
              <Button
                onClick={() => {
                  festiveAudio.playCelebrationChord();
                  confetti({ particleCount: 150, spread: 100 });
                }}
                className="rounded-2xl bg-gradient-festive text-white font-bold"
              >
                <Sparkles className="mr-1.5 h-4 w-4" />
                Celebrate Again 🎉
              </Button>
              <Button
                onClick={resetCeremony}
                variant="outline"
                className="rounded-2xl border-border"
              >
                <RotateCcw className="mr-1.5 h-4 w-4" />
                Replay Ceremony
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
