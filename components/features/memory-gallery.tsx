'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Music2, Sparkles, Play, Pause } from 'lucide-react';
import { useApp } from '@/components/app-context';

interface Memory {
  url: string;
  alt: string;
  caption: string;
  song: string;
  audioUrl?: string;
}

const memoryList = [
  {
    url: '/project/pic1.jpeg',
    alt: 'Silhouetted couple at sunset',
    caption: 'That sunset we chased until the sky melted gold — my favorite place is next to you.',
    song: 'Golden Hour — our song',
    audioUrl: '/project/picmusic1.mp3',
  },
  {
    url: '/project/pic2.jpeg',
    alt: 'Romantic silhouette at sunset',
    caption: 'The evening you whispered forever, and the whole world went quiet to listen.',
    song: 'A Thousand Years',
    audioUrl: '/project/picmusic2.mp3',
  },
  {
    url: '/project/pic3.jpeg',
    alt: 'Couple dancing at sunset',
    caption: 'Two left feet between us and the most perfect dance I have ever had.',
    song: 'Perfect — Ed Sheeran',
    audioUrl: '/project/picmusic3.mp3',
  },
  {
    url: '/project/pic4.jpeg',
    alt: 'Couple on the beach at sunset',
    caption: 'Salt in our hair, sand in our shoes, and not a single care in the world.',
    song: 'Beyond the Sea',
    audioUrl: '/project/picmusic4.mp3',
  },
  {
    url: '/project/pic5.jpeg',
    alt: 'Couple embracing in sunlit field',
    caption: 'A field of tall grass and you in the middle of it — that was the whole world.',
    song: 'Yellow — Coldplay',
    audioUrl: '/project/picmusic5.mp3',
  },
  {
    url: '/project/pic6.jpeg',
    alt: 'Couple in a grassy field at sunset',
    caption: 'Even the simplest afternoon felt like a chapter worth re-reading forever.',
    song: 'Here Comes the Sun',
    audioUrl: '/project/picmusic6.mp3',
  },
];

function TiltCard({
  memory,
  onOpen,
}: {
  memory: Memory;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 14, ry: px * 14 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      onClick={onOpen}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl glass p-1 text-left transition-transform duration-200"
    >
      <img
        src={memory.url}
        alt={memory.alt}
        className="h-full w-full rounded-xl object-cover transition group-hover:scale-105"
      />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition group-hover:opacity-100">
        <p className="script text-lg text-amber-200">{memory.caption.slice(0, 28)}…</p>
      </div>
    </motion.button>
  );
}

export default function MemoryGallery() {
  const { sfx, duckBgm, unduckBgm } = useApp();
  const [active, setActive] = useState<number | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const open = (i: number) => {
    sfx('click');
    sfx('sparkle');
    duckBgm();
    setActive(i);

    // Play specific song if available
    if (memoryList[i].audioUrl) {
      if (currentAudio) currentAudio.pause();
      const audio = new Audio(memoryList[i].audioUrl);
      audio.volume = 0.5;
      audio.play().catch((err) => console.log('Audio autoplay blocked:', err));
      setCurrentAudio(audio);
    }
  };

  const close = () => {
    sfx('click');
    unduckBgm();
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
    setActive(null);
  };

  return (
    <section id="gallery" className="px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Chapter One" title="Our Memory Gallery" sub="tap a frame to step inside the moment" />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
          {memoryList.map((m, i) => (
            <TiltCard key={i} memory={m} onOpen={() => open(i)} />
          ))}
        </div>
      </div>

      {active !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass relative max-w-3xl overflow-hidden rounded-3xl"
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-amber-200 hover:bg-pink-500/40"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={memoryList[active].url}
              alt={memoryList[active].alt}
              className="max-h-[60vh] w-full object-cover"
            />
            <div className="p-6">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full glass-gold px-3 py-1 text-xs text-amber-200">
                <Music2 className="h-3 w-3" /> {memoryList[active].song}
              </div>
              <p className="script text-2xl text-amber-100">{memoryList[active].caption}</p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-amber-200">
        <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
      </div>
      <h2 className="display text-4xl font-bold gold-text glow-gold sm:text-5xl">{title}</h2>
      <p className="script mt-2 text-xl text-pink-300/80">{sub}</p>
    </div>
  );
}