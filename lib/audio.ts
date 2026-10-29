// BGM using custom audio file from /public/bgm

class AudioEngine {
  private bgmAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.bgmAudio = new Audio('/bgm.mp3');
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = 0.3; // 30% volume default
    }
  }

  get ready() {
    return true;
  }

  // Required by app-context.tsx
  init() {}
  resume() {}

  startBgm() {
    if (this.bgmAudio && !this.isMuted) {
      this.bgmAudio.play().catch((err) => {
        console.log("Autoplay waiting for user interaction:", err);
      });
    }
  }

  setBgmVolume(v: number) {
    if (this.bgmAudio) {
      this.bgmAudio.volume = v;
    }
  }

  duckBgm() {
    if (this.bgmAudio) {
      this.bgmAudio.volume = 0.05;
    }
  }

  unduckBgm() {
    if (this.bgmAudio) {
      this.bgmAudio.volume = 0.3;
    }
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