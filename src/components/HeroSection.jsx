import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, ExternalLink, Sparkles, 
  MoveHorizontal, Bookmark, Share2, Heart, Check, Cpu, Terminal 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import HeroCanvas3D from './HeroCanvas3D';
import { personalData, heroSlides } from '../data/content';
import { sound } from '../utils/sound';
import MagneticButton from './MagneticButton';

export default function HeroSection({ onOpenProjectModal }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [votesCount, setVotesCount] = useState(142);
  const [hasVoted, setHasVoted] = useState(false);

  const activeSlide = heroSlides[currentSlideIndex];

  const handleNext = () => {
    sound.playTick(660);
    setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    sound.playTick(500);
    setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleSelectSlide = (index) => {
    sound.playTick(580);
    setCurrentSlideIndex(index);
  };

  const handleVote = () => {
    sound.playPop();
    if (!hasVoted) {
      setVotesCount((prev) => prev + 1);
      setHasVoted(true);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.9, x: 0.5 },
        colors: ['#FFE96B', '#ffffff'],
      });
    }
  };

  const handleBookmark = () => {
    sound.playPop();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    sound.playTick(600);
    if (navigator.share) {
      navigator.share({
        title: 'Lohan Sabari Krishna — AI Portfolio 2026',
        text: 'Award-style personal portfolio of Lohan Sabari Krishna, B.Tech CSE (AI) @ Thejus Engineering College',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section 
      id="hero"
      className="relative w-full h-screen min-h-[700px] max-h-[1080px] p-3 sm:p-5 md:p-6 lg:p-8 flex items-center justify-center overflow-hidden select-none bg-studio-950"
    >
      {/* 3D WebGL Canvas (High-Definition Concrete Blocks + Interactive Centerpiece) */}
      <HeroCanvas3D activeSlideIndex={currentSlideIndex} />

      {/* Atmospheric Studio Radial Glow Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_45%,rgba(255,233,107,0.08),transparent_60%)] pointer-events-none" />

      {/* Thin White Rounded-Rectangle Inset Frame (with studio corner brackets) */}
      <div className="absolute inset-3 sm:inset-5 md:inset-6 lg:inset-8 studio-frame-inset pointer-events-none z-20">
        {/* Architectural Technical Brackets '+' at 4 corners */}
        <span className="absolute top-2.5 left-3.5 font-mono text-xs text-white/35 font-light">+</span>
        <span className="absolute top-2.5 right-3.5 font-mono text-xs text-white/35 font-light">+</span>
        <span className="absolute bottom-2.5 left-3.5 font-mono text-xs text-white/35 font-light">+</span>
        <span className="absolute bottom-2.5 right-3.5 font-mono text-xs text-white/35 font-light">+</span>
      </div>

      {/* Main Content Overlay (Floating inside the inset frame) */}
      <div className="relative z-30 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-14 pointer-events-none">
        
        {/* Top Spacer & Frame Actions */}
        <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-zinc-400">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-zinc-300 uppercase">{personalData.status}</span>
          </div>

          {/* Top Right: Bookmark + Share Icons */}
          <div className="ml-auto pointer-events-auto flex items-center gap-2">
            <button
              onClick={handleBookmark}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark Portfolio'}
              className="w-8 h-8 rounded-full bg-zinc-900/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
            >
              <Bookmark size={14} className={isBookmarked ? 'fill-accent text-accent' : ''} />
            </button>

            <button
              onClick={handleShare}
              title={isShared ? 'Link Copied!' : 'Share Portfolio'}
              className="w-8 h-8 rounded-full bg-zinc-900/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
            >
              {isShared ? <Check size={14} className="text-accent" /> : <Share2 size={14} />}
            </button>
          </div>
        </div>

        {/* Center Row: Headline (Left) & Meta Labels (Right) */}
        <div className="my-auto w-full flex items-center justify-between">
          
          {/* Left Column: Headline & Slide Info */}
          <div className="max-w-2xl pointer-events-auto">
            
            {/* Studio Owner Signature Bar */}
            <div className="flex items-center gap-2 mb-2 font-mono text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-900/90 border border-white/15 text-accent font-semibold tracking-wider flex items-center gap-1.5 shadow-sm">
                <Sparkles size={11} />
                <span>THEJUS AI LAB // 2026</span>
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400 text-[11px] uppercase tracking-wider">{personalData.shortTitle}</span>
            </div>

            {/* Huge bold geometric title in luminous studio yellow: LOHAN */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter bg-gradient-to-br from-[#FFE96B] via-[#FFF3A0] to-[#E8CF38] bg-clip-text text-transparent leading-none uppercase drop-shadow-[0_10px_30px_rgba(255,233,107,0.22)] select-none"
              >
                LOHAN
              </motion.h1>
            </div>

            {/* Full Name & Specialization Subtitle */}
            <div className="mt-2.5 flex items-center gap-2 font-mono text-xs sm:text-sm text-zinc-300">
              <span className="font-semibold text-white tracking-wider">LOHAN SABARI KRISHNA</span>
              <span className="text-zinc-600">•</span>
              <span className="text-accent font-medium">B.Tech CSE (AI)</span>
            </div>

            {/* Slide Description & Tech */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-${activeSlide.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-3.5 max-w-xl"
              >
                <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] text-zinc-400">
                  <span className="text-accent font-semibold">FEATURED SYSTEM //</span>
                  <span className="text-white font-medium uppercase tracking-wide">{activeSlide.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans font-light">
                  {activeSlide.description}
                </p>
                
                {/* Telemetry metrics strip */}
                <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-white/15 text-white font-medium flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span>{activeSlide.badge}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900/50 border border-white/10 text-zinc-400">
                    {activeSlide.category}
                  </span>
                  {activeSlide.stats && (
                    <span className="hidden sm:inline-flex px-2.5 py-1 rounded-lg bg-accent/10 border border-accent/30 text-accent font-semibold">
                      LATENCY: {activeSlide.stats.latency || activeSlide.stats.fps || '12ms'}
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: High-Tech Telemetry HUD */}
          <div className="hidden lg:flex flex-col items-end text-right font-mono text-xs space-y-2">
            <div className="px-3 py-1 rounded-xl bg-zinc-900/80 border border-white/15 text-white font-bold flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span>{personalData.portfolioYear} // PORTFOLIO</span>
            </div>
            <span className="text-zinc-200 font-medium">B.Tech CSE (Artificial Intelligence)</span>
            <span className="text-[11px] text-zinc-500 uppercase">Thejus Engineering College</span>
            
            <div className="pt-2 flex items-center gap-2 text-[10px] text-zinc-500">
              <span className="px-2 py-0.5 rounded bg-zinc-900/60 border border-white/5 text-zinc-400">60 FPS LOCKED</span>
              <span>•</span>
              <span className="text-accent">CUDA FP16</span>
            </div>
          </div>

        </div>

        {/* Bottom Hero Controls & Indicators (exact reference replica) */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          
          {/* Bottom Left: Numbered Indicators 01 / 02 / 03 with animated progress line */}
          <div className="pointer-events-auto flex flex-col gap-3">
            <div className="flex items-center gap-6">
              {heroSlides.map((slide, idx) => {
                const isActive = currentSlideIndex === idx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => handleSelectSlide(idx)}
                    className="group text-left transition-colors select-none"
                  >
                    <span
                      className={`font-mono text-base sm:text-lg font-bold transition-all duration-300 ${
                        isActive
                          ? 'text-white scale-105'
                          : 'text-zinc-600 hover:text-zinc-300'
                      }`}
                    >
                      {slide.id}.
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Horizontal progress bar line under active indicator */}
            <div className="relative w-48 sm:w-56 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 bottom-0 bg-white"
                animate={{
                  left: `${(currentSlideIndex / heroSlides.length) * 100}%`,
                  width: `${100 / heroSlides.length}%`,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            </div>

            {/* Drag to explore hint with animated horizontal arrows */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 tracking-wider">
              <MoveHorizontal size={14} className="animate-pulse text-accent" />
              <span>DRAG TO ROTATE 3D SENSOR</span>
            </div>
          </div>

          {/* Bottom Center / Floating Dock (Matching reference template: W. Info Votes Visit Site) */}
          <div className="pointer-events-auto self-center md:self-auto flex items-center p-1.5 rounded-2xl bg-zinc-900/90 backdrop-blur-2xl border border-white/20 shadow-2xl gap-1">
            {/* Monogram Badge */}
            <div className="w-9 h-9 rounded-xl bg-black border border-white/10 flex items-center justify-center font-display font-bold text-xs text-white">
              L.
            </div>

            {/* Info Pill */}
            <button
              onClick={() => onOpenProjectModal(activeSlide)}
              onMouseEnter={() => sound.playTick(600)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              Info
            </button>

            {/* Votes Pill (Interactive appreciation counter) */}
            <button
              onClick={handleVote}
              onMouseEnter={() => sound.playTick(600)}
              title="Appreciate this Portfolio"
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                hasVoted
                  ? 'text-accent bg-zinc-800/80 font-semibold'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Heart size={12} className={hasVoted ? 'fill-accent text-accent' : ''} />
              <span>Votes {votesCount}</span>
            </button>

            {/* Accent Primary CTA Button (Soft Yellow #FFE96B) */}
            <MagneticButton strength={0.35}>
              <button
                onClick={() => onOpenProjectModal(activeSlide)}
                onMouseEnter={() => sound.playPop()}
                className="px-5 py-2 rounded-xl bg-accent hover:bg-accent-hover text-black font-semibold text-xs tracking-wide transition-all duration-200 shadow-lg hover:shadow-accent/40 flex items-center gap-1.5 group"
              >
                <span>Visit Site</span>
                <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </MagneticButton>
          </div>

          {/* Bottom Right: Featured Project Label & Slide Controls */}
          <div className="pointer-events-auto hidden sm:flex flex-col items-end gap-2 text-right">
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              Featured Project
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                title="Previous Slide"
                className="w-9 h-9 rounded-full bg-zinc-900/70 border border-white/15 flex items-center justify-center text-zinc-300 hover:text-white hover:border-white/40 transition-colors"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={handleNext}
                title="Next Slide"
                className="w-9 h-9 rounded-full bg-zinc-900/70 border border-white/15 flex items-center justify-center text-zinc-300 hover:text-white hover:border-white/40 transition-colors"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
