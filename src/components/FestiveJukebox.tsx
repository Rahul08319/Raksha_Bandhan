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
  Check,
  Radio,
  Heart,
} from "lucide-react";
import { festiveAudio, FESTIVE_TRACKS, type FestiveTrack } from "@/lib/soundEffects";
import { toast } from "sonner";

export const FestiveJukebox: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<string | null>(festiveAudio.activeTrackId);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(festiveAudio.currentVolume);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrack(festiveAudio.activeTrackId);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const handlePlayPauseTrack = (track: FestiveTrack) => {
    if (activeTrack === track.id) {
      festiveAudio.stopMusic();
      setActiveTrack(null);
      toast.info("Music paused ⏸️");
    } else {
      festiveAudio.playTrack(track.id);
      setActiveTrack(track.id);
      toast.success(`Playing ${track.emoji} ${track.name} (Copyright-Free)! 🎶`);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    festiveAudio.setVolume(newVol);
  };

  const currentTrackObj = FESTIVE_TRACKS.find((t) => t.id === activeTrack);

  const categories = ["All", "Bollywood Melody", "Festive Beats", "Folk", "Temple Chimes", "Meditative"];

  const filteredTracks = selectedCategory === "All"
    ? FESTIVE_TRACKS
    : FESTIVE_TRACKS.filter((t) => t.category === selectedCategory);

  return (
    <div className="relative inline-block select-none">
      {/* Mini Apple Dynamic Capsule Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 press-effect ${
          activeTrack
            ? "glass-heavy border-amber-400/60 bg-amber-500/20 text-amber-600 dark:text-amber-300 shadow-glow"
            : "glass border-amber-500/25 text-foreground hover:border-amber-400/50"
        }`}
        title="Open Festive Bollywood Beats &amp; Songs Player"
        aria-label="Festive Bollywood Jukebox"
      >
        <Disc3 className={`h-4 w-4 ${activeTrack ? "animate-spin text-amber-500" : "text-primary"}`} />

        {activeTrack ? (
          <div className="flex items-center gap-2">
            <span className="max-w-[120px] sm:max-w-[170px] truncate font-semibold">
              {currentTrackObj?.emoji} {currentTrackObj?.name}
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
          <span className="flex items-center gap-1.5">
            <Music className="h-3.5 w-3.5 text-primary" />
            <span>Bollywood &amp; Flute ({FESTIVE_TRACKS.length})</span>
          </span>
        )}
      </button>

      {/* Expanded Apple Liquid Glass Jukebox Modal */}
      {isExpanded && (
        <div className="absolute right-0 top-12 z-50 w-84 sm:w-[410px] rounded-3xl glass-heavy glass-shine-top p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-amber-400/40">
          {/* Top specular reflection */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          {/* Jukebox Header */}
          <div className="flex items-center justify-between border-b border-amber-500/15 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-grad-gold shadow-glow-sm">
                <Music className="h-4 w-4 text-amber-950" />
              </div>
              <div>
                <h4 className="font-cinzel text-sm font-bold text-foreground flex items-center gap-1.5">
                  <span>Bollywood Jukebox</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-sans font-extrabold border border-amber-500/30">
                    Default Flute Active
                  </span>
                </h4>
                <p className="text-[10px] text-muted-foreground">
                  Special Flute Instrumental &amp; Royalty-Free Rakhi Anthems
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              className="h-7 w-7 rounded-full glass flex items-center justify-center text-xs text-muted-foreground hover:text-foreground press-effect"
              aria-label="Close Jukebox"
            >
              ✕
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none text-[11px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap font-bold transition-all press-effect ${
                  selectedCategory === cat
                    ? "bg-grad-gold text-amber-950 shadow-sm"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Track List */}
          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {filteredTracks.map((track) => {
              const isPlaying = activeTrack === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => handlePlayPauseTrack(track)}
                  className={`group flex items-center justify-between p-2.5 rounded-2xl border transition-all cursor-pointer press-effect ${
                    isPlaying
                      ? "border-amber-500 bg-amber-500/20 shadow-glow-sm"
                      : "border-border/50 glass hover:border-amber-400/40 hover:bg-card/70"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs transition ${
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

                  <div className="flex items-center gap-1.5 shrink-0">
                    {track.bpm && (
                      <span className="text-[9px] font-mono text-muted-foreground/80 hidden sm:inline">
                        {track.bpm} BPM
                      </span>
                    )}
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                        isPlaying
                          ? "bg-amber-500/25 text-amber-700 dark:text-amber-300 border-amber-500/40"
                          : "bg-background/60 text-muted-foreground border-border/60"
                      }`}
                    >
                      {track.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Volume Control & Copyright-Free Badge */}
          <div className="mt-4 pt-3 border-t border-amber-500/15 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 w-1/2">
              <button
                onClick={() => handleVolumeChange(volume === 0 ? 0.55 : 0)}
                className="text-muted-foreground hover:text-foreground press-effect"
                title={volume === 0 ? "Unmute" : "Mute"}
              >
                {volume === 0 ? (
                  <VolumeX className="h-3.5 w-3.5 text-muted-foreground" />
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
                aria-label="Volume Slider"
              />
            </div>

            <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <Sparkles className="h-2.5 w-2.5" />
              <span>100% Royalty Free</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
