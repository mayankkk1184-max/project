'use client';

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { getAudioEngine } from '@/lib/audio';

interface AppState {
  started: boolean;
  muted: boolean;
  beginExperience: () => void;
  duckBgm: () => void;
  unduckBgm: () => void;
  setMuted: (muted: boolean) => void;
  toggleMute: () => void;
  sfx: (name: SfxName) => void;
}

type SfxName =
  | 'click'
  | 'sparkle'
  | 'spin'
  | 'slotStop'
  | 'crack'
  | 'flip'
  | 'candleBlow'
  | 'win'
  | 'error'
  | 'pop'
  | 'chime';

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [started, setStarted] = useState(false);
  const [muted, setMutedState] = useState(false);
  const audio = useRef(getAudioEngine());

  const beginExperience = useCallback(() => {
    audio.current.init();
    audio.current.resume();
    audio.current.startBgm();
    setStarted(true);
  }, []);

  const duckBgm = useCallback(() => audio.current.duckBgm(), []);
  const unduckBgm = useCallback(() => audio.current.unduckBgm(), []);

  // One shared mute switch: stops ALL background music completely
  const setMuted = useCallback((value: boolean) => {
    audio.current.setMuted(value);
    setMutedState(value);
  }, []);

  const toggleMute = useCallback(() => {
    const next = !audio.current.getMuted();
    audio.current.setMuted(next);
    setMutedState(next);
  }, []);

  const sfx = useCallback((name: SfxName) => {
    audio.current.init();
    audio.current.resume();
    switch (name) {
      case 'click': audio.current.click(); break;
      case 'sparkle': audio.current.sparkle(); break;
      case 'spin': audio.current.spin(); break;
      case 'slotStop': audio.current.slotStop(); break;
      case 'crack': audio.current.crack(); break;
      case 'flip': audio.current.flip(); break;
      case 'candleBlow': audio.current.candleBlow(); break;
      case 'win': audio.current.win(); break;
      case 'error': audio.current.error(); break;
      case 'pop': audio.current.pop(); break;
      case 'chime': audio.current.chime(); break;
    }
  }, []);

  return (
    <Ctx.Provider
      value={{
        started,
        muted,
        beginExperience,
        duckBgm,
        unduckBgm,
        setMuted,
        toggleMute,
        sfx,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}