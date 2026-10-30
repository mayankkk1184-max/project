'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2 } from 'lucide-react';
import { useApp } from '@/components/app-context';
import { SectionTitle } from '@/components/features/memory-gallery';
import { getAssetPath } from '@/lib/utils';

// ✏️ Must match the real file name inside your public folder (capital letters matter!)
const VOICE_NOTE_FILE = '/vn.mp3';

const TRANSCRIPT = [
  { t: '00:00', text: 'Hey you. If you are reading this, it is your birthday, and I am, as always, the luckiest.' },
  { t: '00:04', text: 'I recorded this in the quiet of the morning so you would have my voice whenever you needed it.' },
  { t: '00:09', text: 'Everything I love about you would not fit in one message, so I will just say this:' },
  { t: '00:13', text: 'You are the best decision I never had to make. Happy birthday, my love.' },
];

export default function VinylPlayer() {
  const { sfx, duckBgm, unduckBgm } = useApp();
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(17);
  const [loadFailed, setLoadFailed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Keep the latest unduckBgm in a ref so the audio is NOT recreated when it changes
  const unduckRef = useRef(unduckBgm);
  useEffect(() => {
    unduckRef.current = unduckBgm;
  }, [unduckBgm]);

  useEffect(() => {
    const audio = new Audio(VOICE_NOTE_FILE);
    audio.preload = 'auto';
    audioRef.current = audio;

    const onMeta = () => {
      if (audio.duration && isFinite(audio.duration)) setDuration(audio.duration);
    };
    const onTime = () => setTime(audio.currentTime);
    const onEnd = () => {
      setPlaying(false);
      unduckRef.current();
      setTime(0);
    };
    const onError = () => {
      console.log('Voice note failed to load:', audio.src);
      setLoadFailed(true);
      setPlaying(false);
    };

    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('error', onError);
      unduckRef.current();
    };
  }, []);

  const toggle = () => {
    sfx('click');
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      unduckBgm();
    } else {
      setPlaying(true);
      duckBgm();
      audio.play().catch((err) => {
        console.log('Could not play voice note:', err);
        setPlaying(false);
        unduckBgm();
      });
    }
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? Math.min((time / duration) * 100, 100) : 0;

  return (
    <section id="vinyl" className="px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="Chapter Seven" title="A Voice Note, Just for You" sub="press play and listen close" />
        <div className="mt-14 glass rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col items-center gap-8 sm:flex-row">
            {/* vinyl */}
            <div className="relative h-52 w-52 shrink-0">
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-br from-slate-800 via-black to-slate-900 shadow-2xl ${
                  playing ? 'animate-spin-slow' : ''
                }`}
                style={{
                  backgroundImage:
                    'repeating-radial-gradient(circle, #111 0 2px, #222 2px 4px), radial-gradient(circle, #444 0 30%, #111 31%)',
                }}
              >
                <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-400 to-pink-600" />
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
              </div>
              {/* tone arm */}
              <div
                className="absolute right-0 top-2 transition-transform duration-700"
                style={{
                  transformOrigin: 'top right',
                  transform: playing ? 'rotate(-24deg)' : 'rotate(0deg)',
                }}
              >
                <div className="h-2 w-24 rounded-full bg-amber-300" />
                <div className="ml-20 h-10 w-2 -translate-x-2 bg-amber-200" />
              </div>
            </div>

            {/* controls */}
            <div className="flex-1">
              <div className="mb-3 text-center sm:text-left">
                <div className="text-xs uppercase tracking-widest text-amber-200/70">Voice Note</div>
                <div className="script text-2xl text-amber-100">A Morning Letter</div>
              </div>
              <div className="mx-auto mb-3 flex items-center gap-3">
                <button
                  onClick={toggle}
                  aria-label={playing ? 'Pause voice note' : 'Play voice note'}
                  className="rounded-full bg-gradient-to-r from-pink-600 to-violet-600 p-4 text-white shadow-[0_0_20px_rgba(224,36,163,0.5)] transition hover:scale-105"
                >
                  {playing ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white" />}
                </button>
                <Volume2 className="h-4 w-4 text-amber-200/60" />
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/40">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-pink-500 to-amber-300"
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs tabular-nums text-amber-200/70">
                  {fmt(time)} / {fmt(duration)}
                </span>
              </div>

              {loadFailed && (
                <p className="mb-2 text-xs text-rose-300">
                  The voice note file could not be found. Check its name inside the public folder.
                </p>
              )}

              <div className="mt-4 max-h-32 space-y-2 overflow-y-auto scrollbar-hide text-sm">
                {TRANSCRIPT.map((line, i) => {
                  const active = time >= i * 4 && time < (i + 1) * 4;
                  return (
                    <p
                      key={i}
                      className={`transition ${active ? 'text-amber-100' : 'text-amber-100/40'}`}
                    >
                      <span className="text-amber-200/50">{line.t}</span> — {line.text}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}