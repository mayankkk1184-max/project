'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock, KeyRound, Sparkles } from 'lucide-react';

interface SiteLockProps {
  children: ReactNode;
  password?: string;
}

export default function SiteLock({ children, password = 'love' }: SiteLockProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.toLowerCase().trim() === password.toLowerCase().trim()) {
      setIsUnlocked(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  // If unlocked, render the rest of the website
  if (isUnlocked) {
    return <>{children}</>;
  }

  // Otherwise, render the gorgeous standalone password screen
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass relative w-full max-w-md overflow-hidden rounded-3xl p-8 text-center shadow-2xl backdrop-blur-xl border border-pink-500/30"
      >
        {/* Top Heart Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.6)]">
          <Lock className="h-8 w-8 text-white" />
        </div>

        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-amber-200">
          <Sparkles className="h-3 w-3 text-amber-300" />
          <span>For Your Eyes Only</span>
        </div>

        <h2 className="text-3xl font-bold text-amber-100">Unlock My Heart</h2>
        <p className="mt-2 text-pink-300 text-sm">Enter our secret password to enter the experience</p>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <input
              type="password"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type our secret word..."
              className={`w-full rounded-2xl bg-black/40 px-5 py-3.5 pl-12 text-center text-amber-100 placeholder-pink-300/40 outline-none border transition duration-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-500/40 ${
                error ? 'border-red-500 bg-red-900/20' : 'border-pink-500/30'
              }`}
            />
            <KeyRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-400/70" />
          </div>

          {error && (
            <p className="text-xs text-rose-400 animate-pulse">
              Oops! That is not our secret word. Try again! ❤️
            </p>
          )}

          <button
            type="submit"
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 py-3.5 font-semibold text-white shadow-[0_0_25px_rgba(244,63,94,0.5)] transition duration-300 hover:scale-[1.02] active:scale-95"
          >
            <span>Unlock Experience</span>
            <Heart className="h-4 w-4 fill-white transition group-hover:scale-125" />
          </button>
        </form>
      </motion.div>
    </main>
  );
}