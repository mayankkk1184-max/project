'use client';

import { AppProvider, useApp } from '@/components/app-context';
import SiteLock from '@/components/features/site-lock';
import StarlightCanvas from '@/components/starlight-canvas';
import HeroOverlay from '@/components/hero-overlay';
import { TopNav, BottomMusicBar } from '@/components/navigation';
import MemoryGallery from '@/components/features/memory-gallery';
import Timeline from '@/components/features/timeline';
import LoveReel from '@/components/features/love-reel';
import TriviaQuiz from '@/components/features/trivia-quiz';
import SecretVault from '@/components/features/secret-vault';
import OpenWhenEnvelopes from '@/components/features/open-when-envelopes';
import VinylPlayer from '@/components/features/vinyl-player';
import CountdownTimer from '@/components/features/countdown-timer';
import CouponGenerator from '@/components/features/coupon-generator';
import SpotifySuite from '@/components/features/spotify-suite';
import WishJar from '@/components/features/wish-jar';
import BirthdayCake from '@/components/features/birthday-cake';
import PrologueIntro from '@/components/prologue-intro';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

function ExperienceBody() {
  const { started } = useApp();
  if (!started) return null;

  return (
    <motion.div
      id="experience"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="pt-24 pb-20"
    >
      <PrologueIntro />
      <MemoryGallery />
      <Timeline />
      <LoveReel />
      <TriviaQuiz />
      <SecretVault />
      <OpenWhenEnvelopes />
      <VinylPlayer />
      <CountdownTimer />
      <CouponGenerator />
      <SpotifySuite />
      <WishJar />
      <BirthdayCake />
      <footer className="px-6 py-16 text-center">
        <Heart className="mx-auto h-8 w-8 fill-pink-500 text-pink-500" />
        <p className="script mt-3 text-2xl text-amber-100">made with every chapter of us</p>
        <p className="mt-1 text-xs uppercase tracking-widest text-amber-200/40">Happy Birthday, my love</p>
      </footer>
    </motion.div>
  );
}
export default function Home() {
  return (
    <AppProvider>
      <SiteLock password="301007">
        <main className="relative min-h-screen overflow-x-hidden">
          <StarlightCanvas />
          <TopNav />
          <HeroOverlay />
          <ExperienceBody />
          <BottomMusicBar />
        </main>
      </SiteLock>
    </AppProvider>
  );
}