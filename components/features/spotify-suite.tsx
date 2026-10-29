'use client';

import { motion } from 'framer-motion';
import { Music2 } from 'lucide-react';
import { useApp } from '@/components/app-context';
import { SectionTitle } from '@/components/features/memory-gallery';

const TRACKS = [
  { title: 'Golden Hour', artist: 'JVKE', duration: '3:18' },
  { title: 'Perfect', artist: 'Ed Sheeran', duration: '4:23' },
  { title: 'Yellow', artist: 'Coldplay', duration: '4:29' },
  { title: 'A Thousand Years', artist: 'Christina Perri', duration: '4:45' },
  { title: 'Here Comes the Sun', artist: 'The Beatles', duration: '3:05' },
  { title: 'Beyond the Sea', artist: 'Bobby Darin', duration: '2:52' },
];

export default function SpotifySuite() {
  const { sfx } = useApp();

  return (
    <section id="spotify" className="px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="Chapter Eleven" title="Our Playlist" sub="songs that sound like us" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* embed */}
          <div className="glass-violet rounded-2xl p-5 flex flex-col justify-center">
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/3qAiuaU0G0TJtJP80FjikO?utm_source=generator&si=fa8dbd63f0634636"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>

          {/* track list */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-3 text-xs uppercase tracking-widest text-amber-200/60">Track List</div>
            <ul className="space-y-2">
              {TRACKS.map((t, i) => (
                <li
                  key={t.title}
                  className="flex items-center justify-between rounded-lg px-3 py-2 transition hover:bg-pink-500/10"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs tabular-nums text-amber-200/50">{(i + 1).toString().padStart(2, '0')}</span>
                    <div>
                      <div className="text-sm text-amber-100">{t.title}</div>
                      <div className="text-xs text-amber-100/50">{t.artist}</div>
                    </div>
                  </div>
                  <span className="text-xs tabular-nums text-amber-200/50">{t.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}