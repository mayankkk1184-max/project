'use client';

import { useEffect, useState } from 'react';
import { Heart, Music2, Volume2, VolumeX } from 'lucide-react';
import { useApp } from '@/components/app-context';

const SECTIONS = [
  { id: 'hero', label: 'Top' },
  { id: 'gallery', label: 'Memories' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'love-reel', label: 'Why I Love You' },
  { id: 'trivia', label: 'Quiz' },
  { id: 'vault', label: 'Vault' },
  { id: 'envelopes', label: 'Envelopes' },
  { id: 'vinyl', label: 'Voice Note' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'coupons', label: 'Coupons' },
  { id: 'polaroids', label: 'Polaroids' },
  { id: 'spotify', label: 'Playlist' },
  { id: 'wishjar', label: 'Wish Jar' },
  { id: 'cake', label: 'Cake' },
];

export function TopNav() {
  const { started, sfx } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!started) return null;

  return (
    <nav
      className={`fixed top-0 z-40 w-full transition-all duration-500 ${
        scrolled ? 'glass py-2' : 'py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <button
          onClick={() => {
            sfx('click');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-amber-200"
        >
          <Heart className="h-5 w-5 fill-pink-500 text-pink-500" />
          <span className="script text-xl">For You</span>
        </button>
        <div className="hidden lg:flex items-center gap-1 text-xs">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                sfx('click');
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-full px-3 py-1.5 text-amber-100/70 transition hover:bg-pink-500/20 hover:text-amber-100"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function BottomMusicBar() {
  // `muted` and `toggleMute` come from the shared app-context, so the real
  // background music is fully stopped when muted (not just made quieter)
  const { started, sfx, muted, toggleMute } = useApp();

  if (!started) return null;

  const toggle = () => {
    sfx('click');
    toggleMute();
  };

  return (
    <div className="fixed bottom-0 z-40 w-full">
      <div className="glass mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-t-2xl px-4 py-3">
        <div className="flex items-center gap-2 text-amber-200">
          <Music2 className={`h-4 w-4 ${muted ? '' : 'animate-pulse'}`} />
          <div className="text-xs">
            <div className="font-medium">Ambient Love</div>
            <div className="text-amber-100/50">{muted ? 'Muted' : 'Now Playing'}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {[3, 6, 9, 12, 9, 6, 10, 5, 8, 4].map((h, i) => (
            <span
              key={i}
              className={`w-1 rounded-full bg-gradient-to-t from-pink-500 to-amber-300 ${
                muted ? 'opacity-20' : 'animate-pulse'
              }`}
              style={{ height: `${h}px`, animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
        <button
          onClick={toggle}
          className="rounded-full p-2 text-amber-200 transition hover:bg-pink-500/20"
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}