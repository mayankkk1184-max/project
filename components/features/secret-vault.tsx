'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, KeyRound, Check } from 'lucide-react';
import { useApp } from '@/components/app-context';
import { SectionTitle } from '@/components/features/memory-gallery';
import { fireGoldConfetti } from '@/lib/confetti';

const ANNIVERSARY = '06052021'; // 06 May 2021

export default function SecretVault() {
  const { sfx } = useApp();
  const [code, setCode] = useState('');
  const [shaking, setShaking] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const submit = () => {
    if (code === ANNIVERSARY) {
      sfx('win');
      setUnlocked(true);
      fireGoldConfetti();
    } else {
      sfx('error');
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setCode('');
    }
  };

  const press = (d: string) => {
    sfx('click');
    if (code.length >= 8) return;
    setCode(code + d);
  };

  const back = () => {
    sfx('click');
    setCode(code.slice(0, -1));
  };

  return (
    <section id="vault" className="px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-xl">
        <SectionTitle eyebrow="Chapter Five" title="Secret Birthday Vault" sub="enter our date in DDMMYYYY" />
        <motion.div
          animate={shaking ? { x: [0, -10, 10, -8, 8, 0] } : {}}
          transition={{ duration: 0.5 }}
          className={`mt-14 glass rounded-3xl p-8 ${shaking ? 'animate-shake' : ''}`}
        >
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Lock className={`h-16 w-16 ${unlocked ? 'text-green-400' : 'text-pink-400'}`} />
              {unlocked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 -top-2"
                >
                  <Check className="h-6 w-6 text-green-400" />
                </motion.div>
              )}
            </div>
          </div>

          <div className="mb-6 flex justify-center gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`h-3 w-3 rounded-full ${
                  i < code.length ? 'bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.8)]' : 'bg-white/15'
                }`}
              />
            ))}
          </div>

          <div className="mx-auto grid max-w-xs grid-cols-3 gap-3">
            {['1','2','3','4','5','6','7','8','9'].map((d) => (
              <button
                key={d}
                onClick={() => press(d)}
                className="aspect-square rounded-xl border border-pink-500/20 bg-black/40 text-xl text-amber-100 transition hover:bg-pink-500/20"
              >
                {d}
              </button>
            ))}
            <button
              onClick={back}
              className="aspect-square rounded-xl border border-pink-500/20 bg-black/40 text-amber-100 transition hover:bg-pink-500/20"
            >
              ⌫
            </button>
            <button
              onClick={() => press('0')}
              className="aspect-square rounded-xl border border-pink-500/20 bg-black/40 text-xl text-amber-100 transition hover:bg-pink-500/20"
            >
              0
            </button>
            <button
              onClick={submit}
              className="aspect-square rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 text-white transition hover:scale-105"
            >
              <KeyRound className="mx-auto h-5 w-5" />
            </button>
          </div>
          {shaking && (
            <p className="mt-4 text-center text-sm text-red-400">Wrong code — try again, love.</p>
          )}
        </motion.div>

        <AnimatePresence>
          {unlocked && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 glass-gold rounded-3xl p-8 text-center"
            >
              <h3 className="display text-3xl gold-text glow-gold">The Vault Opens</h3>
              <p className="script mt-3 text-2xl text-amber-100">
                Happy Birthday Akshra 
I’ve rewritten this a lot of times, and nothing ever feels big enough... So I’ll just say it plainly... Before you, I didn’t realize how much of life I was just getting through... Now I look forward to things. Even the boring ones, like waiting for your skin care to be done every night just to talk for a little more,because you’re there...I love how you laugh at your own joke before even revealing them... I love that you always kept loving me even after so much complications... And I still think about the time our simple chat changed our whole life and me getting blessed by getting you, because that’s when I knew...You’ve made me softer, braver, and a better person than I was... On my worst days, you somehow make everything feel okay without even trying... I don’t have a perfect gift for someone who’s given me this much... But I made this place for you, so that whenever you need to remember how loved you are, it’s here...You are my favorite person, my best friend, and my home...
Happy birthday, my love. I’m so lucky it’s you... Once and forever...

Always yours,
Mayank — here&apos;s to all the chapters we have not yet written.
              </p>
              <p className="mt-2 text-amber-200/70">Forever, me.</p>
              <RosePetals />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function RosePetals() {
  const petals = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -40, x: `${Math.random() * 100}%`, rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', rotate: 360, opacity: 0 }}
          transition={{ duration: 5 + Math.random() * 4, delay: Math.random() * 3, repeat: Infinity }}
          className="absolute text-pink-400"
          style={{ left: `${Math.random() * 100}%` }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M10 0 C12 6 12 14 10 20 C8 14 8 6 10 0 Z" fill="currentColor" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}