'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { useApp } from '@/components/app-context';
import { SectionTitle } from '@/components/features/memory-gallery';
import { fireFireworks } from '@/lib/confetti';

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

export default function CountdownTimer() {
  const { sfx } = useApp();
  const [target] = useState(() => {
    const d = new Date();
    d.setHours(23, 59, 59, 0);
    if (d.getTime() < Date.now()) d.setDate(d.getDate() + 1);
    return d;
  });
  const { days, hours, mins, secs } = useCountdown(target);

  const celebrate = () => {
    sfx('win');
    fireFireworks();
  };

  const blocks = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Mins', value: mins },
    { label: 'Secs', value: secs },
  ];

  return (
    <section id="countdown" className="px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="Chapter Eight" title="Countdown to Midnight" sub="the birthday bell is coming" />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {blocks.map((b) => (
            <motion.div
              key={b.label}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="display text-5xl font-bold tabular-nums gold-text glow-gold">
                {b.value.toString().padStart(2, '0')}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-amber-200/70">{b.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={celebrate}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-pink-600 to-violet-600 px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(252,211,77,0.5)] transition hover:scale-105"
          >
            <Zap className="h-5 w-5 fill-white" /> Celebrate Now!
          </button>
        </div>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-amber-100/50">
          <Sparkles className="h-3 w-3" /> because we are not waiting for midnight to celebrate you
        </p>
      </div>
    </section>
  );
}