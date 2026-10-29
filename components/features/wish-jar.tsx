'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { useApp } from '@/components/app-context';
import { SectionTitle } from '@/components/features/memory-gallery';
import { fireGoldConfetti } from '@/lib/confetti';

interface ReleasedLantern {
  id: number;
  text: string;
  startX: number;
  drift: number;
  scale: number;
}

const STORAGE_KEY = 'sky-lantern-wishes';

export default function WishJar() {
  const { sfx } = useApp();
  const [wish, setWish] = useState('');
  const [lanterns, setLanterns] = useState<ReleasedLantern[]>([]);
  const [savedWishes, setSavedWishes] = useState<string[]>([]);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setSavedWishes(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const release = () => {
    const text = wish.trim();
    if (!text) return;
    sfx('chime');
    fireGoldConfetti();
    const id = Date.now();
    const newLantern: ReleasedLantern = {
      id,
      text,
      startX: Math.random() * 40 + 30,
      drift: (Math.random() - 0.5) * 80,
      scale: 0.85 + Math.random() * 0.3,
    };
    setLanterns((l) => [...l, newLantern]);
    setLaunched(true);
    setSavedWishes((prev) => {
      const updated = [...prev, text];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        /* ignore */
      }
      return updated;
    });
    setWish('');
    setTimeout(() => setLaunched(false), 5000);
    setTimeout(() => {
      setLanterns((l) => l.filter((x) => x.id !== id));
    }, 9000);
  };

  return (
    <section id="wishjar" className="px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-2xl">
        <SectionTitle eyebrow="Chapter Twelve" title="Your Virtual Wish" sub="write a wish, release it to the stars" />
        <div className="mt-14 relative overflow-hidden rounded-3xl glass p-6 sm:p-8">
          {/* starry night sky background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D071E] via-[#150B2D] to-[#0D071E]">
            {Array.from({ length: 50 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-amber-200"
                style={{
                  width: `${1 + (i % 3)}px`,
                  height: `${1 + (i % 3)}px`,
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 53) % 95}%`,
                  opacity: 0.3 + (i % 5) * 0.14,
                  animation: `twinkle ${2 + (i % 4)}s ease-in-out ${i * 0.1}s infinite`,
                }}
              />
            ))}
          </div>

          {/* lantern sky area */}
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {lanterns.map((l) => (
                <motion.div
                  key={l.id}
                  initial={{ y: 300, x: `${l.startX}%`, opacity: 0, scale: l.scale * 0.4 }}
                  animate={{
                    y: -60,
                    x: `calc(${l.startX}% + ${l.drift}px)`,
                    opacity: [0, 1, 1, 0.8],
                    scale: l.scale,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 9, ease: 'easeOut' }}
                  className="absolute left-0"
                >
                  <SkyLantern text={l.text} />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* idle resting lantern before any launch */}
            {!launched && lanterns.length === 0 && (
              <motion.div
                className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-85"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <SkyLantern text="" idle />
              </motion.div>
            )}
          </div>

          {/* input + release button */}
          <div className="relative z-10 mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && release()}
              placeholder="Write your wish…"
              className="flex-1 rounded-full border border-amber-400/40 bg-black/50 px-5 py-3 text-amber-100 placeholder:text-amber-200/40 focus:border-amber-400 focus:outline-none"
            />
            <button
              onClick={release}
              disabled={!wish.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-pink-600 px-6 py-3 font-medium text-white transition hover:scale-105 shadow-[0_0_20px_rgba(252,211,77,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" /> Release the wish 🕯️
            </button>
          </div>

          {savedWishes.length > 0 && (
            <div className="relative z-10 mt-4">
              <p className="text-center text-xs uppercase tracking-widest text-amber-200/50">
                {savedWishes.length} wish{savedWishes.length > 1 ? 'es' : ''} carried into the sky
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SkyLantern({ text, idle = false }: { text: string; idle?: boolean }) {
  return (
    <div className="relative">
      {/* glow halo */}
      <motion.div
        className="absolute -inset-5 rounded-full bg-amber-400/30 blur-2xl"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {/* lantern body — 3D-styled paper lantern */}
      <div className="relative w-32 rounded-t-3xl rounded-b-lg border border-amber-400/50 bg-gradient-to-b from-amber-200/90 via-amber-400/80 to-orange-600/70 p-3 shadow-[0_0_30px_rgba(252,211,77,0.7)]">
        {/* top cap with hanging loop */}
        <div className="absolute -top-3 left-1/2 h-4 w-24 -translate-x-1/2 rounded-t-full bg-amber-500/80" />
        <div className="absolute -top-5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-amber-500/60 bg-transparent" />
        {/* inner candle flame */}
        <div className="mx-auto mb-1.5 h-5 w-2 rounded-full bg-gradient-to-t from-orange-500 to-yellow-200 shadow-[0_0_10px_rgba(252,211,77,0.9)] animate-flame-flicker" />
        {/* wish text inside the glowing lantern */}
        <p className="script min-h-[2.5rem] max-w-[7rem] text-center text-xs leading-tight text-amber-950/80">
          {text || (idle ? 'write your wish…' : '')}
        </p>
        {/* bottom frame opening */}
        <div className="absolute -bottom-2 left-1/2 h-3 w-28 -translate-x-1/2 rounded-b-md border border-amber-700/60 bg-amber-800/40" />
      </div>
    </div>
  );
}