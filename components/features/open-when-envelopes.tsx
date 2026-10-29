'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X } from 'lucide-react';
import { useApp } from '@/components/app-context';
import { SectionTitle } from '@/components/features/memory-gallery';

interface Envelope {
  title: string;
  message: string;
  action: string;
}

const ENVELOPES: Envelope[] = [
  { title: 'Open when you miss me', message: 'Close your eyes and remember the last time we laughed until we couldn\'t breathe. I am one text, one call, one thought away.', action: 'Call me' },
  { title: 'Open when you need a smile', message: 'Picture me doing my terrible dance at 7am in socks. Still smiling? Good. That is the whole point of you.', action: 'Send a goofy photo' },
  { title: 'Open when you feel small', message: 'More power to you love...You are the biggest thing in my world. The rest is just background for you.', action: 'Remind me' },
  { title: 'Open when you are stressed', message: 'Drop the shoulders. Unclench the jaw. Breathe in for four. The world can wait five minutes.', action: 'Take a 5-min breather' },
  { title: 'Open when you are proud', message: 'Tell me everything. I will celebrate twice as loud because I knew you could do it.', action: 'Share the win' },
  { title: 'Open when it is 3am and you cannot sleep', message: 'Count the reasons, not the sheep. I will be the first one, and the last one, and all the quiet ones in between.', action: 'Voice-note me' },
];

function EnvelopeCard({ env, onOpen }: { env: Envelope; onOpen: () => void }) {
  const [flipped, setFlipped] = useState(false);
  const { sfx } = useApp();

  const open = () => {
    sfx('crack');
    setFlipped(true);
    onOpen();
  };

  return (
    <button
      onClick={open}
      className="group perspective-1000 h-48 w-full text-left"
      aria-label={env.title}
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* front */}
        <div className="backface-hidden absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-600 to-violet-700 p-5 shadow-[0_0_25px_rgba(224,36,163,0.4)]">
          <div className="absolute inset-0 border border-amber-300/30 rounded-2xl" />
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Mail className="h-8 w-8 text-amber-200" />
            <p className="script mt-3 text-xl text-amber-100">{env.title}</p>
            <span className="mt-2 text-xs uppercase tracking-widest text-amber-200/60">tap to open</span>
          </div>
        </div>
        {/* back */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 overflow-hidden rounded-2xl glass p-5">
          <p className="script text-lg text-amber-100">{env.message}</p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full glass-gold px-3 py-1 text-xs text-amber-200">
            {env.action}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function OpenWhenEnvelopes() {
  const { sfx } = useApp();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="envelopes" className="px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionTitle eyebrow="Chapter Six" title="Open When Letters" sub="unseal a note made for the moment" />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ENVELOPES.map((env, i) => (
            <EnvelopeCard key={i} env={env} onOpen={() => setActive(i)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => { sfx('click'); setActive(null); }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-gold relative max-w-md rounded-3xl p-7 text-center"
            >
              <button
                onClick={() => { sfx('click'); setActive(null); }}
                className="absolute right-3 top-3 rounded-full bg-black/40 p-2 text-amber-200 hover:bg-pink-500/40"
              >
                <X className="h-4 w-4" />
              </button>
              <Mail className="mx-auto h-10 w-10 text-amber-300" />
              <h3 className="script mt-3 text-2xl text-amber-100">{ENVELOPES[active].title}</h3>
              <p className="mt-3 text-amber-100/80">{ENVELOPES[active].message}</p>
              <button className="mt-5 rounded-full bg-gradient-to-r from-amber-500 to-pink-600 px-5 py-2 text-sm font-medium text-white">
                {ENVELOPES[active].action}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}