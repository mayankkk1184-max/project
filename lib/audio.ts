// BGM using custom audio file from /public/bgm

class AudioEngine {
  private bgmAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isDucked: boolean = false;
  private baseVolume: number = 0.3; // 30% volume default
  private readonly duckedVolume: number = 0.05;

  constructor() {
    if (typeof window !== 'undefined') {
      this.bgmAudio = new Audio('/project/bgm.mp3');
      this.bgmAudio.loop = true;
      this.applyVolume();
    }
  }

  get ready() {
    return true;
  }

  // Required by app-context.tsx
  init() {}
  resume() {}

  // Single place that decides what the music does, so mute is ALWAYS respected
  private applyVolume() {
    const audio = this.bgmAudio;
    if (!audio) return;

    const silent = this.isMuted || this.baseVolume <= 0;

    if (silent) {
      audio.muted = true;
      audio.volume = 0;
      audio.pause(); // stopped completely, no sound at all
    } else {
      audio.muted = false;
      audio.volume = this.isDucked
        ? Math.min(this.duckedVolume, this.baseVolume)
        : this.baseVolume;
    }
  }

  private isSilent() {
    return this.isMuted || this.baseVolume <= 0;
  }

  startBgm() {
    if (this.bgmAudio && !this.isSilent()) {
      this.bgmAudio.play().catch((err) => {
        console.log('Autoplay waiting for user interaction:', err);
      });
    }
  }

  // ----- Mute controls (use whichever name your app-context calls) -----
  setMuted(muted: boolean) {
    this.isMuted = muted;
    this.applyVolume();
    if (!this.isSilent() && this.bgmAudio && this.bgmAudio.paused) {
      this.bgmAudio.play().catch(() => {});
    }
  }

  mute() {
    this.setMuted(true);
  }

  unmute() {
    this.setMuted(false);
  }

  toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  // ----- Volume controls -----
  setBgmVolume(v: number) {
    // A volume of 0 counts as muted, and raising it again un-mutes
    this.baseVolume = Math.max(0, Math.min(1, v));
    if (this.baseVolume <= 0) {
      this.isMuted = true;
    } else if (this.isMuted && v > 0) {
      this.isMuted = false;
    }
    this.applyVolume();
    if (!this.isSilent() && this.bgmAudio && this.bgmAudio.paused) {
      this.bgmAudio.play().catch(() => {});
    }
  }

  duckBgm() {
    this.isDucked = true;
    this.applyVolume(); // stays stopped if muted
  }

  unduckBgm() {
    this.isDucked = false;
    this.applyVolume(); // stays stopped if muted
  }

  // UI sound effect fallbacks
  click() {}
  sparkle() {}
  spin() {}
  slotStop() {}
  crack() {}
  flip() {}
  candleBlow() {}
  win() {}
  error() {}
  pop() {}
  chime() {}
}

let engine: AudioEngine | null = null;

export function getAudioEngine(): AudioEngine {
  if (!engine) engine = new AudioEngine();
  return engine;
}

export type AudioEngineT = AudioEngine;