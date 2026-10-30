// BGM using custom audio file from /public

class AudioEngine {
  private bgmAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isDucked: boolean = false;
  private baseVolume: number = 0.3; // 30% volume default
  private readonly duckedVolume: number = 0.05;

  // If the first path fails to load, the next one is tried automatically
  private readonly sources: string[] = ['/project/bgm.mp3', '/bgm.mp3'];
  private sourceIndex: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      const audio = new Audio(this.sources[0]);
      audio.loop = true;
      audio.preload = 'auto';
      audio.addEventListener('error', () => this.tryNextSource());
      this.bgmAudio = audio;
      this.applyVolume();
    }
  }

  get ready() {
    return true;
  }

  // Required by app-context.tsx
  init() {}
  resume() {}

  private isSilent() {
    return this.isMuted || this.baseVolume <= 0;
  }

  private tryNextSource() {
    const audio = this.bgmAudio;
    if (!audio) return;
    console.log('Background music failed to load:', audio.src);
    if (this.sourceIndex < this.sources.length - 1) {
      this.sourceIndex += 1;
      audio.src = this.sources[this.sourceIndex];
      audio.load();
      this.playSafely();
    }
  }

  private playSafely() {
    const audio = this.bgmAudio;
    if (!audio || this.isSilent()) return;
    audio.play().catch((err) => {
      console.log('Background music could not play:', err);
    });
  }

  // Single place that decides what the music does, so mute is ALWAYS respected
  private applyVolume() {
    const audio = this.bgmAudio;
    if (!audio) return;

    if (this.isSilent()) {
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

  startBgm() {
    this.playSafely();
  }

  // ----- Mute controls -----
  setMuted(muted: boolean) {
    this.isMuted = muted;
    this.applyVolume();
    if (!muted) {
      const audio = this.bgmAudio;
      // If the file is in a failed state, reload it before playing
      if (audio && audio.error) audio.load();
      this.playSafely();
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
    } else if (this.isMuted) {
      this.isMuted = false;
    }
    this.applyVolume();
    this.playSafely();
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