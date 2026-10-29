'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Trophy, RotateCcw, Gift } from 'lucide-react';
import { useApp } from '@/components/app-context';
import { SectionTitle } from '@/components/features/memory-gallery';
import { fireGoldConfetti } from '@/lib/confetti';

interface Question {
  q: string;
  options: string[];
  answer: number;
}

const QUESTIONS: Question[] = [
  {
    q: 'Where did our very first conversation happen?',
    options: ['A noisy cafe', 'A quiet park bench', 'On the stairs', 'At a party'],
    answer: 2,
  },
  {
    q: 'What did I called you during school time?',
    options: ['Frooti', 'Akshra', 'Istuti', 'Scooty'],
    answer: 3,
  },
  {
    q: 'Which song brings you to me?',
    options: ['Tasweer', 'Perfect', 'Deewaniyat', 'Tera ban jaunga'],
    answer: 0,
  },
  {
    q: 'My favorite tiny thing you do is…',
    options: ['Make me coffee', 'Tuck my hair back', 'Steal my fries', 'All of the above, forever'],
    answer: 3,
  },
  {
    q: 'If we had one free evening, I would choose…',
    options: ['Bookstore Date', 'A crowded club', 'A root canal', 'A mystery train'],
    answer: 0,
  },
];

export default function TriviaQuiz() {
  const { sfx, duckBgm, unduckBgm } = useApp();
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [won, setWon] = useState(false);

  const answer = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === QUESTIONS[idx].answer) {
      sfx('sparkle');
      setScore((s) => s + 1);
    } else {
      sfx('error');
    }
    setTimeout(() => {
      if (idx + 1 < QUESTIONS.length) {
        setIdx(idx + 1);
        setPicked(null);
      } else {
        const finalScore = score + (i === QUESTIONS[idx].answer ? 1 : 0);
        setDone(true);
        if (finalScore === QUESTIONS.length) {
          setWon(true);
          sfx('win');
          fireGoldConfetti();
          duckBgm();
        } else {
          unduckBgm();
        }
      }
    }, 1100);
  };

  const reset = () => {
    sfx('click');
    unduckBgm();
    setIdx(0);
    setScore(0);
    setPicked(null);
    setDone(false);
    setWon(false);
  };

  const progress = ((idx + (picked !== null ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <section id="trivia" className="px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-2xl">
        <SectionTitle eyebrow="Chapter Four" title="Romantic Trivia Quiz" sub="how well do you know us?" />
        <div className="mt-14 glass rounded-3xl p-6 sm:p-8">
          {!done && (
            <>
              <div className="mb-2 flex items-center justify-between text-xs text-amber-100/70">
                <span>Question {idx + 1} of {QUESTIONS.length}</span>
                <span>Score: {score}</span>
              </div>
              <div className="mb-6 h-2 overflow-hidden rounded-full bg-black/40">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-pink-500 to-amber-400"
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <h3 className="display mb-5 text-2xl text-amber-100">{QUESTIONS[idx].q}</h3>
              <div className="grid gap-3">
                {QUESTIONS[idx].options.map((opt, i) => {
                  const isAnswer = i === QUESTIONS[idx].answer;
                  const isPicked = i === picked;
                  const showState = picked !== null;
                  return (
                    <button
                      key={i}
                      onClick={() => answer(i)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                        showState && isAnswer
                          ? 'border-green-400/60 bg-green-500/20'
                          : showState && isPicked
                          ? 'border-red-400/60 bg-red-500/20'
                          : 'border-pink-500/20 bg-black/30 hover:border-pink-400/50'
                      }`}
                    >
                      <span className="text-amber-100">{opt}</span>
                      {showState && isAnswer && <Check className="h-4 w-4 text-green-400" />}
                      {showState && isPicked && !isAnswer && <X className="h-4 w-4 text-red-400" />}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {done && (
            <div className="text-center">
              <Trophy className={`mx-auto h-14 w-14 ${won ? 'text-amber-300 glow-gold' : 'text-amber-200/60'}`} />
              <h3 className="display mt-4 text-3xl text-amber-100">
                {won ? 'Perfect Score!' : `${score} / ${QUESTIONS.length}`}
              </h3>
              <p className="script mt-2 text-2xl text-pink-300">
                {won ? 'You know us by heart. Claim your reward.' : 'A love worth re-reading. Try again?'}
              </p>

              <AnimatePresence>
                {won && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="mt-6 glass-gold rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-center gap-2 text-amber-300">
                      <Gift className="h-5 w-5" />
                      <span className="text-sm uppercase tracking-widest">VIP Reward Voucher</span>
                    </div>
                    <p className="mt-3 script text-2xl text-amber-100">One Entire Evening of Your Choosing</p>
                    <p className="mt-1 text-sm text-amber-100/70">
                      Redeemable for one fancy dinner, one slow dance, and one sunset spent together. No expiry. No fine print.
                    </p>
                    <div className="mt-4 rounded-lg border-2 border-dashed border-amber-400/40 p-3 text-xs uppercase tracking-[0.2em] text-amber-200/70">
                      Code: PERFECTLOVE
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={reset}
                className="mt-6 inline-flex items-center gap-2 rounded-full glass px-6 py-2.5 text-amber-100 transition hover:bg-pink-500/20"
              >
                <RotateCcw className="h-4 w-4" /> Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}