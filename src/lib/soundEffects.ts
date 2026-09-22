// Pure Web Audio API Festive Sound Engine & Royalty-Free Bollywood Rakhi Beats
// 100% legal, synthesized in real-time, zero external copyrighted audio files

export interface FestiveTrack {
  id: string;
  name: string;
  subtitle: string;
  category: "Bollywood Melody" | "Festive Beats" | "Temple Chimes" | "Meditative";
  emoji: string;
}

export const FESTIVE_TRACKS: FestiveTrack[] = [
  {
    id: "phoolon",
    name: "Phoolon Ka Taaron Ka",
    subtitle: "Acoustic Sitar Tribute • Sibling Anthem",
    category: "Bollywood Melody",
    emoji: "🌸",
  },
  {
    id: "dholak",
    name: "Festive Bollywood Dholak & Tabla",
    subtitle: "Celebratory Keherwa Rhythm (108 BPM)",
    category: "Festive Beats",
    emoji: "🥁",
  },
  {
    id: "bhaiya",
    name: "Bhaiya Mere Rakhi Ke",
    subtitle: "Sacred Sister's Blessing Melody",
    category: "Bollywood Melody",
    emoji: "🪔",
  },
  {
    id: "tanpura",
    name: "Temple Sitar & Morning Tanpura",
    subtitle: "Divine Vedic Spiritual Ambiance",
    category: "Meditative",
    emoji: "🕉️",
  },
];

// Note frequencies (Hz)
const N = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
  REST: 0,
};

// "Phoolon Ka Taaron Ka, Sabka Kehna Hai" musical phrase (freq, duration in seconds)
const PHOOLON_NOTES: [number, number][] = [
  // Phoo-lon ka taa-ron ka
  [N.G4, 0.35], [N.G4, 0.35], [N.A4, 0.35], [N.B4, 0.55], [N.G4, 0.55],
  // Sab-ka keh-na hai
  [N.E4, 0.35], [N.F4, 0.35], [N.G4, 0.75], [N.REST, 0.25],
  // Ek ha-zaa-ron mein
  [N.A4, 0.35], [N.B4, 0.35], [N.C5, 0.55], [N.B4, 0.35], [N.A4, 0.35],
  // Me-ri beh-na hai
  [N.G4, 0.35], [N.F4, 0.35], [N.E4, 0.35], [N.D4, 0.35], [N.E4, 0.9], [N.REST, 0.4],
  // Saa-ri u-mar hu-mein
  [N.G4, 0.35], [N.G4, 0.35], [N.A4, 0.35], [N.B4, 0.55], [N.G4, 0.55],
  // Sang reh-na hai
  [N.E4, 0.35], [N.F4, 0.35], [N.G4, 0.75], [N.REST, 0.25],
  // Ek ha-zaa-ron mein
  [N.A4, 0.35], [N.B4, 0.35], [N.C5, 0.55], [N.B4, 0.35], [N.A4, 0.35],
  // Me-ri beh-na hai
  [N.G4, 0.35], [N.F4, 0.35], [N.E4, 0.35], [N.D4, 0.35], [N.C4, 1.1], [N.REST, 0.8],
];

// "Bhaiya Mere Rakhi Ke Bandhan Ko Nibhana" musical phrase
const BHAIYA_NOTES: [number, number][] = [
  // Bhai-ya me-re
  [N.E4, 0.4], [N.G4, 0.4], [N.A4, 0.7], [N.REST, 0.2],
  // Ra-khi ke ban-dhan ko
  [N.A4, 0.35], [N.B4, 0.35], [N.C5, 0.5], [N.B4, 0.35], [N.A4, 0.5],
  // Ni-bha-na
  [N.G4, 0.4], [N.A4, 0.4], [N.F4, 0.8], [N.REST, 0.3],
  // Bhai-ya me-re
  [N.D4, 0.4], [N.F4, 0.4], [N.G4, 0.7], [N.REST, 0.2],
  // Chho-te na ye bhaan-ja
  [N.G4, 0.35], [N.A4, 0.35], [N.B4, 0.4], [N.A4, 0.35], [N.G4, 0.5],
  // Saa-th na chhu-taa-na
  [N.F4, 0.35], [N.E4, 0.35], [N.D4, 0.4], [N.E4, 1.0], [N.REST, 0.8],
];

class FestiveSoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private currentPlayingTrack: string | null = null;
  private musicTimeout: NodeJS.Timeout | null = null;
  private activeOscillators: (OscillatorNode | AudioNode)[] = [];
  private masterGain: GainNode | null = null;
  private volume: number = 0.5;

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // --- SHORT UI SOUND EFFECTS ---

  playChime(frequency = 587.33, duration = 1.2) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        frequency * 0.997,
        ctx.currentTime + duration
      );

      gain.gain.setValueAtTime(0.18 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext may be blocked before interaction
    }
  }

  playCelebrationChord() {
    if (!this.enabled) return;
    try {
      const notes = [440, 554.37, 659.25, 830.61, 880];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playChime(freq, 1.3);
        }, idx * 80);
      });
    } catch {
      // Ignore
    }
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

      gain.gain.setValueAtTime(0.08 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Ignore
    }
  }

  // --- BOLLYWOOD RAKHI JUKEBOX & BEATS SYNTHESIZER ---

  // Plucks an acoustic sitar-like note
  private playPluckedNote(
    ctx: AudioContext,
    destination: AudioNode,
    freq: number,
    time: number,
    duration: number
  ) {
    if (freq === 0) return;

    // Harmonic 1: Fundamental
    const osc1 = ctx.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(freq, time);

    // Harmonic 2: Overtone (sitar resonance)
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 2, time);

    // Filter to simulate warm acoustic wooden chamber
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1800, time);
    filter.frequency.exponentialRampToValueAtTime(300, time + duration);

    // Pluck envelope: sharp attack, gentle decay
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.linearRampToValueAtTime(0.24, time + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(destination);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration);
    osc2.stop(time + duration);

    this.activeOscillators.push(osc1, osc2);
  }

  // Plays a Dholak / Tabla percussion hit
  private playDrumHit(
    ctx: AudioContext,
    destination: AudioNode,
    type: "bass" | "slap" | "bell",
    time: number
  ) {
    if (type === "bass") {
      // Dholak deep resonant thump (Dha/Ghe)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.frequency.setValueAtTime(120, time);
      osc.frequency.exponentialRampToValueAtTime(45, time + 0.18);

      gain.gain.setValueAtTime(0.35, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

      osc.connect(gain);
      gain.connect(destination);

      osc.start(time);
      osc.stop(time + 0.2);
      this.activeOscillators.push(osc);
    } else if (type === "slap") {
      // Tabla crisp slap (Ta/Tin)
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1800;
      filter.Q.value = 3;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(destination);

      noise.start(time);
      noise.stop(time + 0.08);
      this.activeOscillators.push(noise);
    } else {
      // Ghungroo / Chime bell
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(2400, time);
      osc.frequency.exponentialRampToValueAtTime(3200, time + 0.06);

      gain.gain.setValueAtTime(0.06, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

      osc.connect(gain);
      gain.connect(destination);

      osc.start(time);
      osc.stop(time + 0.06);
      this.activeOscillators.push(osc);
    }
  }

  // Starts looping a melody track
  private startMelodySequence(
    ctx: AudioContext,
    notes: [number, number][],
    withBeats = true
  ) {
    let cursor = ctx.currentTime + 0.1;

    notes.forEach(([freq, dur], idx) => {
      this.playPluckedNote(ctx, this.masterGain!, freq, cursor, dur);

      // Add gentle percussion groove underneath melody
      if (withBeats && idx % 2 === 0) {
        this.playDrumHit(ctx, this.masterGain!, "bass", cursor);
      } else if (withBeats && idx % 2 === 1) {
        this.playDrumHit(ctx, this.masterGain!, "slap", cursor);
      }

      cursor += dur;
    });

    const totalDurationMs = (cursor - ctx.currentTime) * 1000;
    this.musicTimeout = setTimeout(() => {
      if (this.currentPlayingTrack) {
        this.startMelodySequence(ctx, notes, withBeats);
      }
    }, totalDurationMs);
  }

  // Starts looping Bollywood Dholak & Tabla celebratory rhythm
  private startDholakGroove(ctx: AudioContext) {
    // 8-beat Bollywood Keherwa cycle (Dha Ge Na Tin | Na Ke Dhin Na)
    const bpm = 110;
    const beatDuration = 60 / bpm / 2; // eighth note
    const pattern: ("bass" | "slap" | "bell" | null)[] = [
      "bass", "bell", "slap", "bell",
      "bass", "bass", "slap", "bell",
    ];

    let cursor = ctx.currentTime + 0.1;
    pattern.forEach((type) => {
      if (type) {
        this.playDrumHit(ctx, this.masterGain!, type, cursor);
      }
      cursor += beatDuration;
    });

    const totalDurationMs = (cursor - ctx.currentTime) * 1000;
    this.musicTimeout = setTimeout(() => {
      if (this.currentPlayingTrack === "dholak") {
        this.startDholakGroove(ctx);
      }
    }, totalDurationMs);
  }

  // Starts looping meditative tanpura drone
  private startTanpuraDrone(ctx: AudioContext) {
    const freqs = [138.59, 207.65, 277.18, 415.3]; // Sa-Pa C#3 harmonics
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 650;

      osc.type = i % 2 === 0 ? "sawtooth" : "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.18;

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.masterGain!);

      osc.start();
      this.activeOscillators.push(osc);
    });
  }

  // Plays any selected track
  public playTrack(trackId: string): boolean {
    const ctx = this.getContext();
    if (!ctx) return false;

    // If same track is playing, toggle off
    if (this.currentPlayingTrack === trackId) {
      this.stopMusic();
      return false;
    }

    this.stopMusic();
    this.currentPlayingTrack = trackId;

    // Setup master gain
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(
      this.volume,
      ctx.currentTime + 0.5
    );
    this.masterGain.connect(ctx.destination);

    if (trackId === "phoolon") {
      this.startMelodySequence(ctx, PHOOLON_NOTES, true);
    } else if (trackId === "dholak") {
      this.startDholakGroove(ctx);
    } else if (trackId === "bhaiya") {
      this.startMelodySequence(ctx, BHAIYA_NOTES, true);
    } else if (trackId === "tanpura") {
      this.startTanpuraDrone(ctx);
    }

    return true;
  }

  public stopMusic() {
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }

    this.activeOscillators.forEach((node) => {
      try {
        if ("stop" in node && typeof node.stop === "function") {
          node.stop();
        }
        node.disconnect();
      } catch {
        // Ignore
      }
    });
    this.activeOscillators = [];

    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.disconnect();
      } catch {
        // Ignore
      }
      this.masterGain = null;
    }

    this.currentPlayingTrack = null;
  }

  // Backward compatibility alias
  public toggleAmbientMusic(): boolean {
    if (this.currentPlayingTrack) {
      this.stopMusic();
      return false;
    } else {
      return this.playTrack("phoolon");
    }
  }

  public get activeTrackId(): string | null {
    return this.currentPlayingTrack;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public get currentVolume(): number {
    return this.volume;
  }
}

export const festiveAudio = new FestiveSoundManager();
