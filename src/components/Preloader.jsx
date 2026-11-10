import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_STEPS = [
  'Initializing Neural Engine...',
  'Loading Three.js WebGL Context...',
  'Compiling GLSL Shaders...',
  'Mounting Portfolio Modules...',
  'Calibrating Studio Lighting...',
  'System Ready.',
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    let current = 0;
    const timer = setInterval(() => {
      // Realistic non-linear loading simulation
      const remaining = 100 - current;
      const speed = remaining > 60 ? 7 : remaining > 30 ? 4 : remaining > 10 ? 2 : 1;
      const increment = Math.floor(Math.random() * speed) + 1;
      current = Math.min(current + increment, 100);
      setProgress(current);

      // Update loading step label
      const stepAt = Math.floor((current / 100) * (LOADING_STEPS.length - 1));
      setStepIndex(stepAt);

      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 900);
        }, 300);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Split name into letters for stagger animation
  const name = 'Lohan Sabari Krishna';
  const letters = name.split('');

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ clipPath: 'inset(0 0 100% 0)', y: '-2%' }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          style={{ clipPath: 'inset(0 0 0% 0)' }}
          className="fixed inset-0 z-[120] flex flex-col justify-between bg-black px-6 py-8 md:px-16 md:py-12 select-none overflow-hidden"
        >
          {/* Noise grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px',
            }}
          />

          {/* Accent gradient glow — top-right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.08, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-[140px] pointer-events-none"
          />

          {/* Top Meta Bar */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 tracking-wider relative z-10">
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
                className="inline-block w-2 h-2 rounded-full bg-accent"
              />
              <span className="uppercase tracking-widest">Neural Portfolio</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-zinc-600">CSE (AI) • 2026</span>
              <span className="font-mono text-zinc-700">v2.0.0</span>
            </div>
          </div>

          {/* Center — Staggered Letter Animation */}
          <div className="max-w-5xl relative z-10">
            {/* Tagline above */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2.5 mb-5 font-mono text-[11px] text-zinc-500 uppercase tracking-widest"
            >
              <span className="w-6 h-px bg-accent/60" />
              <span>Thejus Engineering College • B.Tech CSE (AI)</span>
            </motion.div>

            {/* Main name: ONLY LOHAN with 'H' in Red */}
            <div className="overflow-hidden">
              <motion.div 
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-baseline font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-none"
              >
                <span className="text-accent drop-shadow-[0_4px_20px_rgba(255,233,107,0.3)]">
                  LO
                </span>
                <span className="text-[#FF3B30] drop-shadow-[0_4px_20px_rgba(255,59,48,0.5)]">
                  H
                </span>
                <span className="text-accent drop-shadow-[0_4px_20px_rgba(255,233,107,0.3)]">
                  AN
                </span>
              </motion.div>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-4 text-sm sm:text-base font-mono text-zinc-500"
            >
              AI Student · Builder · Creator · Portfolio 2026
            </motion.p>
          </div>

          {/* Bottom Progress Section */}
          <div className="w-full relative z-10 space-y-3">
            {/* Step label */}
            <div className="flex items-center justify-between font-mono text-xs">
              <AnimatePresence mode="wait">
                <motion.span
                  key={stepIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-zinc-500 tracking-wide uppercase"
                >
                  {LOADING_STEPS[stepIndex]}
                </motion.span>
              </AnimatePresence>

              {/* Large counter */}
              <motion.span
                className="text-5xl md:text-7xl font-light text-white font-mono tabular-nums leading-none"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {String(progress).padStart(2, '0')}
                <span className="text-2xl md:text-4xl text-zinc-500">%</span>
              </motion.span>
            </div>

            {/* Progress track */}
            <div className="relative w-full h-px bg-zinc-800">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-white"
                style={{ width: `${progress}%` }}
              />
              {/* Moving accent glow dot */}
              <motion.div
                className="absolute -top-1 w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_3px_rgba(255,233,107,0.6)]"
                style={{ left: `calc(${progress}% - 4px)` }}
              />
            </div>

            {/* Footer line */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-700 pt-1">
              <span>PORTFOLIO SYSTEM</span>
              <span>THEJUS AI LAB • KERALA, INDIA</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
