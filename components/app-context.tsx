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
  beginExperience: () => void;
  duckBgm: () => void;
  unduckBgm: () => void;
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
  const audio = useRef(getAudioEngine());

  const beginExperience = useCallback(() => {
    audio.current.init();
    audio.current.resume();
    audio.current.startBgm();
    setStarted(true);
  }, []);

  const duckBgm = useCallback(() => audio.current.duckBgm(), []);
  const unduckBgm = useCallback(() => audio.current.unduckBgm(), []);
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
      value={{ started, beginExperience, duckBgm, unduckBgm, sfx }}
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