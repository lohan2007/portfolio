import React from 'react';
import { ArrowUp, Heart, Terminal } from 'lucide-react';
import { personalData } from '../data/content';
import { sound } from '../utils/sound';

export default function Footer() {
  const scrollToTop = () => {
    sound.playTick(500);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-12 px-4 sm:px-8 md:px-16 lg:px-24 bg-black border-t border-white/10 select-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-500">
        
        {/* Left: Branding & College */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/15 flex items-center justify-center font-display font-bold text-xs text-white">
            {personalData.monogram}
          </div>
          <div>
            <p className="text-zinc-300 font-medium font-sans">
              © {personalData.portfolioYear} {personalData.name}
            </p>
            <p className="text-[11px] text-zinc-500">
              {personalData.department} • {personalData.institution}
            </p>
          </div>
        </div>

        {/* Center: Tech summary */}
        <div className="hidden lg:flex items-center gap-2 text-zinc-500">
          <Terminal size={13} className="text-accent" />
          <span>React • Three.js • GSAP • Lenis • Tailwind</span>
        </div>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => sound.playTick(600)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
        >
          <span>Back to Top</span>
          <ArrowUp size={13} />
        </button>

      </div>
    </footer>
  );
}

