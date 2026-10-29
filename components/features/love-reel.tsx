'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Sparkles } from 'lucide-react';
import { useApp } from '@/components/app-context';
import { SectionTitle } from '@/components/features/memory-gallery';

const COMPLIMENTS = [
  'Your laugh is my favorite sound',
  'You make ordinary days feel like adventures',
  'Your kindness could outshine the sun',
  'You turn my chaos into calm',
  'Your eyes hold whole galaxies',
  'You love in paragraphs, I love in chapters',
  'You are my soft place to land',
  'You make me braver than I am',
  'Your mind is the most beautiful room',
  'You are home in human form',
  'You dance through the hard days',
  'Your patience rewires my heart',
  'You turn silence into a comfort',
  'You are the plot twist I needed',
  'Your hugs could fix anything',
  'You make mornings worth waking for',
  'You are the reason I believe in luck',
  'Your smile reroutes my whole day',
  'You make me want to be more',
  'You are my favorite recurring thought',
  'Your voice is the safest frequency',
  'You are proof that soft is strong',
];

function Reel({ index }: { index: number }) {
  const { sfx } = useApp();
  const [display, setDisplay] = useState(COMPLIMENTS[index % COMPLIMENTS.length]);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return;
    sfx('spin');
    setSpinning(true);
    let ticks = 0;
    const total = 18 + Math.floor(Math.random() * 8);
    const interval = setInterval(() => {
      ticks++;
      setDisplay(COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)]);
      if (ticks >= total) {
        clearInterval(interval);
        setSpinning(false);
        sfx('slotStop');
        sfx('sparkle');
      }
    }, 70 + ticks * 6);
  };

  return (
    <div className="relative h-20 w-full overflow-hidden rounded-xl border border-amber-400/30 bg-black/60">
      <div
        className={`flex h-full items-center justify-center px-3 text-center text-sm sm:text-base ${
          spinning ? 'blur-[1px]' : ''
        }`}
      >
        <span className="script text-xl text-amber-100">{display}</span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/80 to-transparent" />
    </div>
  );
}

export default function LoveReel() {
  const { sfx } = useApp();
  const [reels, setReels] = useState([0, 1, 2]);
  const [round, setRound] = useState(0);

  const spinAll = () => {
    sfx('click');
    setReels((r) => r.map((v) => v + 3 + Math.floor(Math.random() * 6)));
    setRound((r) => r + 1);
  };

  return (
    <section id="love-reel" className="px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="Chapter Three" title="Why I Love You Reel" sub="spin the machine, let it decide" />
        <div className="mt-14 glass rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {reels.map((v, i) => (
              <Reel key={`${round}-${i}`} index={v} />
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={spinAll}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-pink-600 px-7 py-3 font-semibold text-white shadow-[0_0_25px_rgba(252,211,77,0.5)] transition hover:scale-105"
            >
              <RefreshCw className="h-4 w-4" /> Spin the Reels
            </button>
          </div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-amber-100/50">
            <Sparkles className="h-3 w-3" /> three truths at a time, refilled every spin
          </p>
        </div>
      </div>
    </section>
  );
}