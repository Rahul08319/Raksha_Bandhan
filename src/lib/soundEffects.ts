// ─────────────────────────────────────────────────────────────────────────────
//  Raksha Bandhan Festive Audio Engine
//  Dedicated Master Song: Raksha Bandhan Special Flute Instrumental (Kiran Vinkar)
//  Web Audio API: UI bells, sparkle chimes, celebration chords
// ─────────────────────────────────────────────────────────────────────────────

export interface FestiveTrack {
  id: string;
  name: string;
  subtitle: string;
  category: "Bollywood Melody";
  emoji: string;
  bpm?: number;
  duration?: string;
  audioUrl?: string;
}

export const FESTIVE_TRACKS: FestiveTrack[] = [
  {
    id: "flute_default",
    name: "Raksha Bandhan Special Flute",
    subtitle: "Kiran Vinkar • Devotional Flute Instrumental",
    category: "Bollywood Melody",
    emoji: "🪈",
    audioUrl: "/audio/raksha-bandhan-special-flute.mp3",
    bpm: 86,
    duration: "4:48",
  },
];

class FestiveSoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private currentPlayingTrack: string | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.55;
  private audioElement: HTMLAudioElement | null = null;

  // ── Audio context (lazy init for UI sound effects) ─────────────────────
  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx?.state === "suspended") this.ctx.resume();
    return this.ctx;
  }

  // ── UI sound effects ───────────────────────────────────────────────────
  playChime(frequency = 587.33, duration = 1.2) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.997, ctx.currentTime + duration);
      gain.gain.setValueAtTime(0.16 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch { /* blocked before user interaction */ }
  }

  playCelebrationChord() {
    if (!this.enabled) return;
    try {
      [440, 554.37, 659.25, 830.61, 880].forEach((freq, idx) => {
        setTimeout(() => this.playChime(freq, 1.3), idx * 80);
      });
    } catch { /* ignore */ }
  }

  playSparkle() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2800, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.07 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch { /* ignore */ }
  }

  // ── Public: play flute track ───────────────────────────────────────────
  public playTrack(trackId: string = "flute_default"): boolean {
    if (this.currentPlayingTrack) {
      this.stopMusic();
      return false;
    }

    const track = FESTIVE_TRACKS.find((t) => t.id === trackId) || FESTIVE_TRACKS[0];

    if (track && track.audioUrl) {
      this.currentPlayingTrack = track.id;
      try {
        if (!this.audioElement) {
          this.audioElement = new Audio(track.audioUrl);
        } else {
          this.audioElement.src = track.audioUrl;
        }
        this.audioElement.loop = true;
        this.audioElement.volume = this.volume;
        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Audio element playback failed/blocked:", err);
          });
        }
        return true;
      } catch (err) {
        console.warn("Failed to play audio element:", err);
      }
    }

    return false;
  }

  // ── Public: stop ──────────────────────────────────────────────────────
  public stopMusic() {
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      } catch { /* ignore */ }
    }
    this.currentPlayingTrack = null;
  }

  // ── Compat ─────────────────────────────────────────────────────────────
  public toggleAmbientMusic(): boolean {
    if (this.currentPlayingTrack) {
      this.stopMusic();
      return false;
    }
    return this.playTrack("flute_default");
  }

  public get activeTrackId(): string | null {
    return this.currentPlayingTrack;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public get currentVolume(): number {
    return this.volume;
  }
}

export const festiveAudio = new FestiveSoundManager();
