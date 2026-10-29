'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, UtensilsCrossed, CloudRain, Heart } from 'lucide-react';
import { useApp } from '@/components/app-context';
import { SectionTitle } from '@/components/features/memory-gallery';
import { fireConfettiBurst } from '@/lib/confetti';

const MOODS = [
  { id: 'happy', label: 'Happy', icon: Smile, color: 'from-amber-400 to-pink-500' },
  { id: 'hungry', label: 'Hungry', icon: UtensilsCrossed, color: 'from-pink-500 to-violet-600' },
  { id: 'stressed', label: 'Stressed', icon: CloudRain, color: 'from-violet-500 to-indigo-600' },
  { id: 'missing', label: 'Missing You', icon: Heart, color: 'from-rose-500 to-pink-600' },
];

const COUPONS: Record<string, { title: string; subtitle: string; serial: string }[]> = {
  happy: [
    { title: 'A Spontaneous Sunset Picnic', subtitle: 'complete with cheese, bad jokes, and zero phones', serial: 'HAP-2026-01' },
    { title: 'One Surprise Adventure', subtitle: 'blindfolded route, my treat, no questions', serial: 'HAP-2026-02' },
  ],
  hungry: [
    { title: 'Food Delivery on Me', subtitle: 'choose the cuisine, I will handle the rest', serial: 'HUN-2026-01' },
    { title: 'A Midnight Fridge Raid', subtitle: 'I will guard the snacks and the doorway', serial: 'HUN-2026-02' },
  ],
  stressed: [
    { title: '30-Min Back Massage', subtitle: 'no timer, just until you sigh that sigh', serial: 'STR-2026-01' },
    { title: 'A Full Guilt-Free Nap', subtitle: 'I will handle everything. Go.', serial: 'STR-2026-02' },
  ],
  missing: [
    { title: 'One Emergency Voice Call', subtitle: 'answered on the first ring, always', serial: 'MIS-2026-01' },
    { title: 'A Personalized Memory Reel', subtitle: 'six photos, one song, one big smile', serial: 'MIS-2026-02' },
  ],
};

export default function CouponGenerator() {
  const { sfx } = useApp();
  const [mood, setMood] = useState<string | null>(null);

  const pick = (id: string) => {
    sfx('pop');
    sfx('sparkle');
    setMood(id);
    fireConfettiBurst();
  };

  return (
    <section id="coupons" className="px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="Chapter Nine" title="Mood Tracker Coupons" sub="tell me your mood, claim a surprise" />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {MOODS.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => pick(m.id)}
                className={`group glass rounded-2xl p-5 text-center transition hover:scale-105 ${mood === m.id ? 'ring-2 ring-amber-400' : ''}`}
              >
                <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${m.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="script text-lg text-amber-100">{m.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {mood && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {COUPONS[mood].map((c, i) => (
                <motion.div
                  key={c.serial}
                  initial={{ opacity: 0, y: 30, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, rotate: i === 0 ? -1.5 : 1.5 }}
                  className="relative overflow-hidden rounded-2xl border-2 border-dashed border-amber-400/60 bg-gradient-to-br from-amber-500/15 to-pink-500/10 p-5"
                >
                  <div className="absolute right-2 top-2 text-[10px] uppercase tracking-widest text-amber-300/60">
                    VIP
                  </div>
                  <div className="text-xs uppercase tracking-widest text-amber-200/70">Coupon</div>
                  <h3 className="display mt-1 text-2xl gold-text">{c.title}</h3>
                  <p className="mt-1 text-sm text-amber-100/70">{c.subtitle}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-amber-400/20 pt-2 text-[10px] uppercase tracking-widest text-amber-200/50">
                    <span>{c.serial}</span>
                    <span>no expiry</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}