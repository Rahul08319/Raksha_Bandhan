// Pure Web Audio API synthesized festive sound effects and ambient drone
// Zero external asset downloads, zero CORS issues, instant response

class FestiveSoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;
  private ambientOscillators: OscillatorNode[] = [];

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Soft Indian temple bell / chime note
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

      gain.gain.setValueAtTime(0.16, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext might be blocked before first user click
    }
  }

  // Festive celebration chord (auspicious ascending pentatonic chime)
  playCelebrationChord() {
    if (!this.enabled) return;
    try {
      const notes = [440, 554.37, 659.25, 830.61, 880];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playChime(freq, 1.3);
        }, idx * 85);
      });
    } catch {
      // Ignore
    }
  }

  // Soft sparkle tick on button click or sticker select
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

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Ignore
    }
  }

  // Gentle meditative ambient tanpura / sitar drone harmony
  toggleAmbientMusic(): boolean {
    const ctx = this.getContext();
    if (!ctx) return false;

    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient(ctx);
      return true;
    }
  }

  private startAmbient(ctx: AudioContext) {
    try {
      this.stopAmbient();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 2); // very soft
      masterGain.connect(ctx.destination);
      this.ambientGain = masterGain;

      // Meditative Sa - Pa tanpura frequencies (C#3 / G#3 harmonics)
      const freqs = [138.59, 207.65, 277.18, 415.30];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 800;

        osc.type = i % 2 === 0 ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.value = 0.25;

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        this.ambientOscillators.push(osc);
      });

      this.isAmbientPlaying = true;
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  public stopAmbient() {
    if (this.ambientOscillators.length > 0) {
      this.ambientOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Ignore
        }
      });
      this.ambientOscillators = [];
    }
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.disconnect();
      } catch {
        // Ignore
      }
      this.ambientGain = null;
    }
    this.isAmbientPlaying = false;
  }

  public get ambientActive() {
    return this.isAmbientPlaying;
  }
}

export const festiveAudio = new FestiveSoundManager();
