import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        // Dynamic increments simulating loading assets & WebGL shaders
        const increment = Math.floor(Math.random() * 8) + 3;
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 800);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[120] flex flex-col justify-between bg-black px-6 py-8 md:px-16 md:py-12 select-none"
        >
          {/* Top meta */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 tracking-wider">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>INITIALIZING SYSTEM</span>
            </div>
            <span>THEJUS CSE (AI)</span>
          </div>

          {/* Center Title */}
          <div className="max-w-4xl">
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white"
              >
                Lohan Sabari Krishna
              </motion.h1>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-3 text-sm sm:text-base font-mono text-zinc-400"
            >
              First-Year B.Tech CSE (Artificial Intelligence) • Portfolio 2026
            </motion.p>
          </div>

          {/* Bottom Progress Bar & Percentage */}
          <div className="w-full">
            <div className="flex items-end justify-between font-mono mb-3">
              <span className="text-xs text-zinc-500 tracking-widest uppercase">
                Loading Shaders & Neural Models
              </span>
              <span className="text-4xl md:text-6xl font-light text-white font-mono">
                {String(progress).padStart(2, '0')}%
              </span>
            </div>
            
            {/* Minimal Progress Track */}
            <div className="relative w-full h-[2px] bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-accent"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

