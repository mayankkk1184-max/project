'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useApp } from '@/components/app-context';
import { fireGoldConfetti } from '@/lib/confetti';

export default function HeroOverlay() {
  const { started, beginExperience, sfx } = useApp();

  const handleBegin = () => {
    sfx('click');
    sfx('sparkle');
    beginExperience();
    setTimeout(() => fireGoldConfetti(), 200);
    setTimeout(
      () =>
        document
          .getElementById('prologue')
          ?.scrollIntoView({ behavior: 'smooth' }),
      600,
    );
  };

  return (
    <section
      className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center transition-opacity duration-700 ${
        started ? 'opacity-0 pointer-events-none absolute inset-0' : 'opacity-100'
      }`}
    >
      {/* golden particle bokeh overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              width: `${50 + (i % 5) * 28}px`,
              height: `${50 + (i % 5) * 28}px`,
              left: `${(i * 13) % 95}%`,
              top: `${(i * 17) % 90}%`,
              background: i % 2 === 0
                ? 'rgba(252,211,77,0.20)'
                : 'rgba(224,36,163,0.16)',
            }}
            animate={{
              y: [0, -24, 0],
              x: [0, i % 2 ? 16 : -16, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-amber-200">
          <Sparkles className="h-3.5 w-3.5" /> A Birthday Letter in Chapters
        </div>

        <h1 className="display text-5xl font-bold leading-tight sm:text-7xl md:text-8xl">
          <span className="text-amber-300 glow-gold">Happy Birthday,</span>
          <br />
          <span className="text-pink-400 glow-magenta">Ladduuu</span>{' '}
          <span className="text-amber-300">✨</span>
        </h1>

        <p className="mt-6 text-xl italic text-amber-100/90 sm:text-2xl md:text-3xl max-w-2xl mx-auto leading-relaxed">
          Here&apos;s to the rarest magic — the person who makes my every moment worth celebrating.
        </p>

        <div className="mt-12">
          <button
            onClick={handleBegin}
            className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 px-10 py-5 text-lg font-semibold text-white shadow-[0_0_40px_rgba(224,36,163,0.7)] transition-transform hover:scale-105 animate-pulse-glow"
          >
            <Heart className="h-5 w-5 fill-white" />
            Begin Experience
            <span className="absolute inset-0 -z-10 rounded-full bg-pink-500/40 blur-xl transition group-hover:bg-pink-500/60" />
          </button>
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-amber-200/60">
          Best with sound on
        </p>
      </div>
    </section>
  );
}