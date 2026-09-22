import React, { useState, useEffect } from "react";
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Disc3,
  Sliders,
} from "lucide-react";
import { festiveAudio, FESTIVE_TRACKS, type FestiveTrack } from "@/lib/soundEffects";
import { toast } from "sonner";

export const FestiveJukebox: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<string | null>(festiveAudio.activeTrackId);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    // Keep local state in sync
    const interval = setInterval(() => {
      setActiveTrack(festiveAudio.activeTrackId);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handlePlayPauseTrack = (track: FestiveTrack) => {
    if (activeTrack === track.id) {
      festiveAudio.stopMusic();
      setActiveTrack(null);
      toast.info("Music paused");
    } else {
      festiveAudio.playTrack(track.id);
      setActiveTrack(track.id);
      toast.success(`Playing ${track.emoji} ${track.name}!`);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    festiveAudio.setVolume(newVol);
  };

  const currentTrackObj = FESTIVE_TRACKS.find((t) => t.id === activeTrack);

  return (
    <div className="relative inline-block select-none">
      {/* Mini Top-Bar Player Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold backdrop-blur transition hover:scale-105 active:scale-95 shadow-sm ${
          activeTrack
            ? "border-amber-500 bg-amber-500/20 text-amber-600 dark:text-amber-400 shadow-glow"
            : "border-amber-500/30 bg-card/75 text-foreground hover:border-amber-500"
        }`}
        title="Open Festive Bollywood Beats &amp; Songs Player"
      >
        <Disc3 className={`h-4 w-4 ${activeTrack ? "animate-spin text-amber-500" : "text-muted-foreground"}`} />

        {activeTrack ? (
          <div className="flex items-center gap-2">
            <span className="max-w-[110px] sm:max-w-[150px] truncate">
              {currentTrackObj?.emoji} {currentTrackObj?.name}
            </span>
            {/* Animated Equalizer Waves */}
            <div className="flex items-end gap-[2px] h-3.5">
              <span className="w-[3px] bg-amber-500 rounded-full animate-bounce [animation-delay:0ms] h-2" />
              <span className="w-[3px] bg-amber-500 rounded-full animate-bounce [animation-delay:150ms] h-3.5" />
              <span className="w-[3px] bg-amber-500 rounded-full animate-bounce [animation-delay:300ms] h-1.5" />
              <span className="w-[3px] bg-amber-500 rounded-full animate-bounce [animation-delay:75ms] h-3" />
            </div>
          </div>
        ) : (
          <span className="flex items-center gap-1">
            <Music className="h-3.5 w-3.5 text-primary" />
            <span>Bollywood Beats</span>
          </span>
        )}
      </button>

      {/* Expanded Luxury Jukebox Modal / Dropdown Card */}
      {isExpanded && (
        <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-3xl border border-amber-500/40 bg-card/95 p-5 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
          {/* Jukebox Header */}
          <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-gold shadow-sm">
                <Music className="h-4 w-4 text-amber-950" />
              </div>
              <div>
                <h4 className="font-cinzel text-sm font-bold text-foreground">
                  Festive Bollywood Jukebox
                </h4>
                <p className="text-[10px] text-muted-foreground">
                  100% Royalty-Free Synthesized Tributes &amp; Beats
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-muted-foreground hover:text-foreground font-bold p-1"
            >
              ✕
            </button>
          </div>

          {/* Track List */}
          <div className="space-y-2">
            {FESTIVE_TRACKS.map((track) => {
              const isPlaying = activeTrack === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => handlePlayPauseTrack(track)}
                  className={`group flex items-center justify-between p-2.5 rounded-2xl border transition cursor-pointer ${
                    isPlaying
                      ? "border-amber-500 bg-amber-500/15 shadow-sm"
                      : "border-border/60 bg-background/50 hover:border-amber-500/40 hover:bg-background/80"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm transition ${
                        isPlaying
                          ? "bg-amber-500 text-amber-950 font-bold"
                          : "bg-muted text-foreground group-hover:scale-105"
                      }`}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-foreground truncate">
                          {track.emoji} {track.name}
                        </span>
                      </div>
                      <div className="text-[10px] text-muted-foreground truncate">
                        {track.subtitle}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                      isPlaying
                        ? "bg-amber-500/20 text-amber-600 border-amber-500/40"
                        : "bg-background/60 text-muted-foreground border-border"
                    }`}
                  >
                    {track.category}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Volume Control & Copyright-Free Badge */}
          <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 w-1/2">
              <button
                onClick={() => handleVolumeChange(volume === 0 ? 0.5 : 0)}
                className="text-muted-foreground hover:text-foreground"
              >
                {volume === 0 ? (
                  <VolumeX className="h-3.5 w-3.5" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5 text-amber-500" />
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
              />
            </div>

            <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <Sparkles className="h-2.5 w-2.5" />
              <span>100% Royalty Free</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
