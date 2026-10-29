'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';
import { useApp } from '@/components/app-context';
import { SectionTitle } from '@/components/features/memory-gallery';
import { fireHeartConfetti } from '@/lib/confetti';

interface Milestone {
  date: string;
  title: string;
  blurb: string;
  photo: string;
  story: string;
}

const MILESTONES: Milestone[] = [
  {
    date: 'The First Hello',
    title: 'Strangers Becoming a Sentence',
    blurb: 'A conversation that refused to end.',
    photo: '/pic7.jpeg',
    story:
      'We started with a hello and somehow never stopped. By the end of that night I had a notebook full of things I wanted to tell you tomorrow.',
  },
  {
    date: 'The First Dance',
    title: 'Two Left Feet, One Heartbeat',
    blurb: 'A clumsy waltz we will never forget.',
    photo: '/pic8.jpeg',
    story:
      'Neither of us could lead, so we just held on and let the music steer. It was the most off-beat, on-key moment of my life.',
  },
  {
    date: 'The Long Road',
    title: 'Every Mile Was a Memory',
    blurb: 'Highways, playlists, and you in the passenger seat.',
    photo: '/pic9.jpeg',
    story:
      'We drove until the gas light came on and the sun went down. Somewhere between verses we realized the trip home felt like coming home.',
  },
  {
    date: 'The Promise',
    title: 'A Quiet Forever',
    blurb: 'The night every plan became an us.',
    photo: '/pic10.jpeg',
    story:
      'No audience, no audience needed. We promised ourselves to each other under a sky full of stars that did not know how to applaud quietly.',
  },
];

function TimelineItem({ m, i }: { m: Milestone; i: number }) {
  const { sfx } = useApp();
  const [open, setOpen] = useState(false);
  const [hearts, setHearts] = useState(0);

  const toggle = () => {
    sfx('flip');
    setOpen((o) => !o);
  };

  const heartClick = () => {
    sfx('pop');
    setHearts((h) => h + 1);
    fireHeartConfetti();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      className={`relative flex gap-6 ${i % 2 ? 'flex-row-reverse' : ''}`}
    >
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-pink-500/50 via-violet-500/40 to-transparent" />
      <div className="hidden sm:block w-1/2" />
      <div className="relative z-10 flex-1 sm:w-1/2 sm:px-6">
        <div className="absolute top-6 left-1/2 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-pink-500 shadow-[0_0_12px_rgba(224,36,163,0.8)] sm:block" />
        <div className="glass rounded-2xl p-5 tilt-hover">
          <div className="mb-1 text-xs uppercase tracking-widest text-amber-200/70">{m.date}</div>
          <h3 className="display text-2xl font-bold text-amber-100">{m.title}</h3>
          <p className="script text-lg text-pink-300">{m.blurb}</p>
          <img
            src={m.photo}
            alt={m.title}
            className="mt-4 h-44 w-full rounded-xl object-contain bg-black/20"
          />
          <button
            onClick={toggle}
            className="mt-3 flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm text-amber-100/80 transition hover:bg-pink-500/10"
          >
            <span>{open ? 'Hide story' : 'Read the full story'}</span>
            <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-2 text-sm leading-relaxed text-amber-100/70"
            >
              {m.story}
            </motion.p>
          )}
          <button
            onClick={heartClick}
            className="mt-3 inline-flex items-center gap-2 rounded-full glass-violet px-3 py-1.5 text-sm text-pink-200"
          >
            <Heart className="h-4 w-4 fill-pink-500" />
            <span>{hearts}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="Chapter Two" title="Our Timeline" sub="every milestone led me to you" />
        <div className="mt-16 space-y-12">
          {MILESTONES.map((m, i) => (
            <TimelineItem key={i} m={m} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}