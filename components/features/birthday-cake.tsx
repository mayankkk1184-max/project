'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Cake, Mic, MicOff } from 'lucide-react';
import { useApp } from '@/components/app-context';
import { SectionTitle } from '@/components/features/memory-gallery';
import { fireGoldConfetti } from '@/lib/confetti';
import { getAudioEngine } from '@/lib/audio';

const CANDLE_COUNT = 5;

export default function BirthdayCake() {
  const { sfx } = useApp();
  const [lit, setLit] = useState(true);
  const [smoke, setSmoke] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0);
  const [blowProgress, setBlowProgress] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);
  const blowDetectedRef = useRef(false);
  const blowStartRef = useRef<number>(0);

  const extinguish = () => {
    if (!lit) return;
    sfx('candleBlow');
    setLit(false);
    setSmoke(true);
    setTimeout(() => sfx('win'), 400);
    fireGoldConfetti();
    setTimeout(() => setSmoke(false), 1500);
    setTimeout(() => setLit(true), 6000);
  };

  const startMic = async () => {
    if (micActive) {
      stopMic();
      return;
    }
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const engine = getAudioEngine();
      engine.init();
      const ctx = engine.context;
      const source = ctx!.createMediaStreamSource(stream);
      const analyser = ctx!.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.5;
      source.connect(analyser);
      analyserRef.current = analyser;
      audioCtxRef.current = ctx;
      setMicActive(true);
      blowDetectedRef.current = false;
      detectBlow();
    } catch {
      setMicError('Microphone access denied. Use the button to blow out candles.');
    }
  };

  const stopMic = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    analyserRef.current = null;
    setMicActive(false);
    setVolume(0);
  };

  const detectBlow = () => {
    const analyser = analyserRef.current;
    if (!analyser || !lit) {
      if (lit) rafRef.current = requestAnimationFrame(detectBlow);
      return;
    }
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    // peak amplitude across frequency bins
    const peak = Math.max(...Array.from(data));
    // variance across the spectrum — distinguishes wind noise from steady background
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance = data.reduce((a, b) => a + (b - mean) ** 2, 0) / data.length;
    const normalized = Math.min(1, peak / 255);
    setVolume(normalized);

    // require strong sustained blow: amplitude > 180 AND variance > 800 for >= 500ms
    const AMP_THRESHOLD = 180;
    const VARIANCE_THRESHOLD = 800;
    const HOLD_MS = 500;

    const isBlowing = peak > AMP_THRESHOLD && variance > VARIANCE_THRESHOLD;

    if (isBlowing && !blowDetectedRef.current) {
      if (blowStartRef.current === 0) {
        blowStartRef.current = performance.now();
      }
      const held = performance.now() - blowStartRef.current;
      setBlowProgress(Math.min(1, held / HOLD_MS));
      if (held >= HOLD_MS) {
        blowDetectedRef.current = true;
        setBlowProgress(0);
        extinguish();
        setTimeout(() => { blowDetectedRef.current = false; }, 7000);
      }
    } else if (!isBlowing) {
      blowStartRef.current = 0;
      setBlowProgress(0);
    }

    rafRef.current = requestAnimationFrame(detectBlow);
  };

  useEffect(() => {
    return () => stopMic();
  }, []);

  useEffect(() => {
    if (!micActive || !lit) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(detectBlow);
  }, [micActive, lit]);

  const volPct = Math.round(volume * 100);
  const holdPct = Math.round(blowProgress * 100);
  const THRESHOLD_PCT = 70; // 180/255 normalized

  return (
    <section id="cake" className="px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-2xl">
        <SectionTitle eyebrow="The Finale" title="Your Birthday Cake" sub="make a wish and blow out the candles" />
        <div className="mt-14 glass-gold rounded-3xl p-8 text-center">
          {/* Cake visual */}
          <div className="relative mx-auto mb-8 w-72">
            {/* candles */}
            <div className="flex justify-center gap-4 pb-2">
              {Array.from({ length: CANDLE_COUNT }).map((_, i) => (
                <div key={i} className="relative flex flex-col items-center">
                  {/* flame */}
                  {lit && (
                    <motion.div
                      animate={{ scaleY: [1, 1.15, 0.95, 1.08, 1], rotate: [-1, 2, -2, 1, -1] }}
                      transition={{ duration: 0.4, repeat: Infinity }}
                      className="relative -mb-1 h-7 w-3 rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_rgba(252,211,77,0.9)]"
                    >
                      <div className="absolute left-1/2 top-1 h-3 w-1.5 -translate-x-1/2 rounded-full bg-blue-300/80" />
                    </motion.div>
                  )}
                  {/* smoke */}
                  {smoke && (
                    <motion.div
                      initial={{ y: 0, opacity: 0.7, scale: 0.6 }}
                      animate={{ y: -60, opacity: 0, scale: 1.6 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="absolute -top-2 h-8 w-2 rounded-full bg-slate-400/50 blur-[2px]"
                    />
                  )}
                  {/* candle stick */}
                  <div className="h-12 w-2 rounded-sm bg-gradient-to-b from-amber-300 to-amber-500 shadow-md" />
                </div>
              ))}
            </div>

            {/* top tier */}
            <div className="relative mx-auto h-20 w-56 rounded-t-2xl rounded-b-md bg-gradient-to-b from-pink-400 to-pink-600 shadow-lg">
              <div className="absolute -top-1 left-2 right-2 h-4 rounded-full bg-cream/90" />
              {[8, 28, 50, 72, 90].map((l, i) => (
                <div
                  key={i}
                  className="absolute top-3 bg-cream/90 rounded-b-full"
                  style={{ left: `${l}%`, height: `${10 + (i % 3) * 4}px`, width: '12px' }}
                />
              ))}
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-1 w-3 rounded-full"
                  style={{
                    top: `${20 + (i * 13) % 50}%`,
                    left: `${(i * 27) % 90}%`,
                    backgroundColor: ['#FCD34D', '#A855F7', '#E024A3', '#FFFBEB'][i % 4],
                    transform: `rotate(${i * 40}deg)`,
                  }}
                />
              ))}
              <div className="absolute -top-2 left-12 h-4 w-4 rounded-full bg-red-500 shadow" />
              <div className="absolute -top-2 right-16 h-4 w-4 rounded-full bg-red-500 shadow" />
            </div>

            {/* middle tier */}
            <div className="relative mx-auto h-16 w-64 bg-gradient-to-b from-violet-500 to-violet-700 shadow-lg">
              <div className="absolute -top-1 left-2 right-2 h-4 rounded-full bg-cream/90" />
              {[12, 36, 58, 82].map((l, i) => (
                <div
                  key={i}
                  className="absolute top-3 bg-cream/90 rounded-b-full"
                  style={{ left: `${l}%`, height: `${8 + (i % 2) * 5}px`, width: '14px' }}
                />
              ))}
            </div>

            {/* bottom tier */}
            <div className="relative mx-auto h-20 w-72 rounded-b-2xl bg-gradient-to-b from-pink-500 to-rose-700 shadow-2xl">
              <div className="absolute -top-1 left-2 right-2 h-4 rounded-full bg-cream/90" />
              {[10, 32, 54, 76, 92].map((l, i) => (
                <div
                  key={i}
                  className="absolute top-3 bg-cream/90 rounded-b-full"
                  style={{ left: `${l}%`, height: `${10 + (i % 3) * 3}px`, width: '16px' }}
                />
              ))}
            </div>
            <div className="mx-auto h-3 w-80 rounded-full bg-slate-700/80 shadow-xl" />
          </div>

          {/* mic detection control */}
          <div className="mb-4">
            <button
              onClick={startMic}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                micActive
                  ? 'bg-green-500/20 border border-green-400/50 text-green-300'
                  : 'glass text-amber-200 hover:bg-pink-500/20'
              }`}
            >
              {micActive ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              {micActive ? 'Listening — blow to extinguish!' : 'Enable Mic Detection'}
            </button>
            {micActive && (
              <div className="mx-auto mt-3 max-w-sm">
                {/* threshold + volume bar */}
                <div className="relative h-3 overflow-hidden rounded-full bg-black/50">
                  {/* threshold marker */}
                  <div
                    className="absolute top-0 bottom-0 z-10 w-0.5 bg-white/70"
                    style={{ left: `${THRESHOLD_PCT}%` }}
                  />
                  <div
                    className={`h-full rounded-full transition-all ${
                      volPct >= 70
                        ? 'bg-gradient-to-r from-green-500 to-amber-400'
                        : 'bg-gradient-to-r from-amber-500 to-pink-500'
                    }`}
                    style={{ width: `${volPct}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-[10px] uppercase tracking-widest text-amber-100/50">
                  <span>quiet</span>
                  <span>{volPct}% — blow hard!</span>
                </div>
                {/* sustained-hold progress */}
                {blowProgress > 0 && (
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/40">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pink-500 to-amber-300 transition-all"
                      style={{ width: `${holdPct}%` }}
                    />
                  </div>
                )}
                <p className="mt-1.5 text-center text-[11px] text-amber-100/50">
                  blow hard and hold for half a second to extinguish
                </p>
              </div>
            )}
            {micError && <p className="mt-2 text-xs text-red-400">{micError}</p>}
          </div>

          {/* manual blow button */}
          <button
            onClick={extinguish}
            disabled={!lit}
            className={`inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-white shadow-lg transition ${
              lit
                ? 'bg-gradient-to-r from-amber-500 via-pink-600 to-violet-600 hover:scale-105 shadow-[0_0_30px_rgba(252,211,77,0.5)]'
                : 'cursor-not-allowed bg-slate-700/60 opacity-60'
            }`}
          >
            <Cake className="h-5 w-5" /> {lit ? 'Blow Out Candles 🎂' : 'Wish Made!'}
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-amber-100/50">
            <Mic className="h-3 w-3" /> enable mic and blow toward your screen, or tap the button above
          </p>
        </div>
      </div>
    </section>
  );
}