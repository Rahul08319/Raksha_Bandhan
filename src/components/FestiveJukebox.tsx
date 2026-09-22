import React, { useState, useEffect } from "react";
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Disc3,
  Repeat,
} from "lucide-react";
import { festiveAudio, FESTIVE_TRACKS } from "@/lib/soundEffects";
import { toast } from "sonner";

export const FestiveJukebox: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<string | null>(festiveAudio.activeTrackId);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(festiveAudio.currentVolume);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrack(festiveAudio.activeTrackId);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const currentTrack = FESTIVE_TRACKS[0];

  const handleTogglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeTrack) {
      festiveAudio.stopMusic();
      setActiveTrack(null);
      toast.info("Flute music paused ⏸️");
    } else {
      festiveAudio.playTrack("flute_default");
      setActiveTrack("flute_default");
      toast.success("🪈 Playing Raksha Bandhan Special Flute! 🎶");
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    festiveAudio.setVolume(newVol);
  };

  return (
    <div className="relative inline-block select-none">
      {/* Mini Apple Dynamic Island Music Capsule */}
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
          activeTrack
            ? "glass-heavy border-amber-400/60 bg-amber-500/20 text-amber-600 dark:text-amber-300 shadow-glow"
            : "glass border-amber-500/25 text-foreground hover:border-amber-400/50"
        }`}
      >
        {/* Click to play/pause directly */}
        <button
          onClick={handleTogglePlay}
          className="flex items-center gap-2 press-effect focus:outline-none"
          title={activeTrack ? "Pause Flute Music" : "Play Flute Music"}
          aria-label={activeTrack ? "Pause Flute Music" : "Play Flute Music"}
        >
          <Disc3 className={`h-4 w-4 shrink-0 ${activeTrack ? "animate-spin text-amber-500" : "text-primary"}`} />

          {activeTrack ? (
            <div className="flex items-center gap-2">
              <span className="max-w-[130px] sm:max-w-[170px] truncate font-semibold">
                🪈 Raksha Bandhan Flute
              </span>
              {/* Animated Apple Equalizer Waves */}
              <div className="flex items-end gap-[2px] h-3.5" aria-hidden="true">
                <span className="w-[3px] bg-amber-500 rounded-full animate-bounce [animation-delay:0ms] h-2.5" />
                <span className="w-[3px] bg-amber-500 rounded-full animate-bounce [animation-delay:180ms] h-4" />
                <span className="w-[3px] bg-amber-500 rounded-full animate-bounce [animation-delay:360ms] h-1.5" />
                <span className="w-[3px] bg-amber-500 rounded-full animate-bounce [animation-delay:90ms] h-3.5" />
              </div>
            </div>
          ) : (
            <span className="flex items-center gap-1.5 font-semibold">
              <Music className="h-3.5 w-3.5 text-primary" />
              <span>Flute Music 🪈</span>
            </span>
          )}
        </button>

        {/* Mini popover trigger for volume & details */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-1 p-0.5 rounded-full hover:bg-amber-500/20 transition text-muted-foreground hover:text-foreground"
          title="Open Audio Controls"
          aria-label="Audio Controls"
        >
          {volume === 0 ? (
            <VolumeX className="h-3 w-3 text-muted-foreground" />
          ) : (
            <Volume2 className="h-3 w-3 text-amber-500" />
          )}
        </button>
      </div>

      {/* Expanded Apple Liquid Glass Player Card */}
      {isExpanded && (
        <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-3xl glass-heavy glass-shine-top p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-amber-400/40">
          {/* Top specular reflection */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-amber-500/15 pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-grad-gold shadow-glow-sm">
                <Music className="h-5 w-5 text-amber-950" />
              </div>
              <div>
                <h4 className="font-cinzel text-sm font-bold text-foreground flex items-center gap-1.5">
                  <span>Festive Soundscape</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-sans font-extrabold border border-amber-500/30">
                    Active
                  </span>
                </h4>
                <p className="text-[10px] text-muted-foreground">
                  Official Raksha Bandhan Flute Instrumental
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              className="h-7 w-7 rounded-full glass flex items-center justify-center text-xs text-muted-foreground hover:text-foreground press-effect"
              aria-label="Close Music Card"
            >
              ✕
            </button>
          </div>

          {/* Dedicated Flute Player Card */}
          <div className="rounded-2xl p-4 border border-amber-500/30 bg-amber-500/10 flex flex-col items-center text-center space-y-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-amber-950 shadow-glow animate-pulse-glow">
              <span className="text-2xl">🪈</span>
            </div>

            <div>
              <h5 className="font-cinzel font-bold text-foreground text-sm">
                {currentTrack.name}
              </h5>
              <p className="text-xs text-muted-foreground mt-0.5">
                {currentTrack.subtitle}
              </p>
            </div>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={() => handleTogglePlay()}
              className="flex items-center justify-center h-12 w-12 rounded-full bg-grad-festive text-white shadow-md hover:scale-105 active:scale-95 transition cursor-pointer press-effect"
              aria-label={activeTrack ? "Pause" : "Play"}
            >
              {activeTrack ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" />
              )}
            </button>

            <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-semibold">
              <span className="inline-flex items-center gap-1">
                <Repeat className="h-3 w-3 text-amber-500" /> Loop Enabled
              </span>
              <span>•</span>
              <span>Duration: 4:48</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="mt-4 pt-3 border-t border-amber-500/15 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-1">
              <button
                onClick={() => handleVolumeChange(volume === 0 ? 0.55 : 0)}
                className="text-muted-foreground hover:text-foreground press-effect"
                title={volume === 0 ? "Unmute" : "Mute"}
              >
                {volume === 0 ? (
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Volume2 className="h-4 w-4 text-amber-500" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-amber-500"
                aria-label="Volume Slider"
              />
            </div>

            <div className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 shrink-0">
              <Sparkles className="h-2.5 w-2.5 text-amber-500" />
              <span>Special Instrumental</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
