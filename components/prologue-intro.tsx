'use client';

import { motion } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';

export default function PrologueIntro() {
  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="prologue"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden"
    >
      {/* starlight bokeh particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              width: `${40 + (i % 5) * 26}px`,
              height: `${40 + (i % 5) * 26}px`,
              left: `${(i * 11) % 95}%`,
              top: `${(i * 19) % 92}%`,
              background: i % 3 === 0
                ? 'rgba(252,211,77,0.18)'
                : i % 3 === 1
                ? 'rgba(224,36,163,0.14)'
                : 'rgba(168,85,247,0.14)',
            }}
            animate={{
              y: [0, -28, 0],
              x: [0, i % 2 ? 18 : -18, 0],
              opacity: [0.25, 0.65, 0.25],
            }}
            transition={{
              duration: 7 + (i % 4),
              repeat: Infinity,
              delay: i * 0.35,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-2xl"
      >
        {/* glowing heart icon badge */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full glass-gold animate-pulse-glow"
        >
          <Heart className="h-9 w-9 fill-pink-500 text-pink-500" />
        </motion.div>

        {/* uppercase tracking tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-5 text-sm uppercase tracking-[0.4em] text-amber-200/80"
        >
          Happy Birthday
        </motion.div>

        {/* large serif heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="display text-4xl font-bold leading-tight sm:text-6xl md:text-7xl"
        >
          <span className="text-amber-100 glow-gold">To My Rapunzel,</span>
          <br />
          <span className="text-pink-400 glow-magenta">my whole heart</span>
        </motion.h2>

        {/* romantic subtitle paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 text-lg leading-relaxed text-amber-100/75 sm:text-xl max-w-xl mx-auto"
        >
          I made a little universe of everything I adore about you. Scroll slowly, tap everything, and let yourself be celebrated.
        </motion.p>
      </motion.div>

      {/* bouncing down-arrow indicator */}
      <motion.button
        onClick={scrollToGallery}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-amber-200/70 hover:text-amber-200 transition"
        aria-label="Scroll to Chapter One"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <ChevronDown className="h-7 w-7" />
          <span className="text-[10px] uppercase tracking-[0.3em]">Begin the chapters</span>
        </motion.div>
      </motion.button>
    </section>
  );
}