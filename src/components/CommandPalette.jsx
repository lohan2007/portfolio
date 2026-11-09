import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Terminal, ExternalLink, FileDown, 
  Volume2, VolumeX, ArrowRight, CornerDownLeft, Sparkles, X 
} from 'lucide-react';
import { personalData, projects } from '../data/content';
import { sound } from '../utils/sound';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    { id: 'hero', name: 'Go to Hero / Index', section: 'Navigation', icon: <Sparkles size={14} />, action: () => scrollTo('hero') },
    { id: 'works', name: 'Explore Selected Works', section: 'Navigation', icon: <Terminal size={14} />, action: () => scrollTo('works') },
    { id: 'about', name: 'View Profile & 3D Neural Core', section: 'Navigation', icon: <Sparkles size={14} />, action: () => scrollTo('about') },
    { id: 'skills', name: 'Review Technical Arsenal', section: 'Navigation', icon: <Terminal size={14} />, action: () => scrollTo('skills') },
    { id: 'journey', name: 'View Academic Timeline', section: 'Navigation', icon: <ArrowRight size={14} />, action: () => scrollTo('journey') },
    { id: 'contact', name: 'Transmit Message / Contact', section: 'Navigation', icon: <CornerDownLeft size={14} />, action: () => scrollTo('contact') },
    { id: 'copy-email', name: `Copy Email (${personalData.email})`, section: 'Actions', icon: <Terminal size={14} />, action: () => copyEmail() },
    { id: 'github', name: 'Open GitHub Profile', section: 'External', icon: <ExternalLink size={14} />, action: () => window.open(personalData.github, '_blank') },
    { id: 'linkedin', name: 'Open LinkedIn Profile', section: 'External', icon: <ExternalLink size={14} />, action: () => window.open(personalData.linkedin, '_blank') },
  ];

  const scrollTo = (id) => {
    sound.playTick(500);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    sound.playPop();
    navigator.clipboard.writeText(personalData.email);
    setIsOpen(false);
  };

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.playTick(550);
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const filteredActions = actions.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Floating Shortcut Pill in bottom-right corner */}
      <button
        onClick={() => {
          sound.playTick(550);
          setIsOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 backdrop-blur-md border border-white/15 text-zinc-300 hover:text-white hover:border-accent font-mono text-xs shadow-2xl transition-all select-none group"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span>Command Menu</span>
        <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] text-zinc-400 group-hover:text-accent font-sans">
          Ctrl K
        </kbd>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Command Palette Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-zinc-950 border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-10 font-mono"
            >
              {/* Search Bar Input */}
              <div className="flex items-center px-4 py-3.5 border-b border-white/10">
                <Search size={16} className="text-zinc-500 mr-3" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type a command or jump to section..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 rounded-md bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Action List */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filteredActions.length === 0 ? (
                  <div className="py-8 text-center text-xs text-zinc-500">
                    No matching commands found.
                  </div>
                ) : (
                  filteredActions.map((action, idx) => (
                    <button
                      key={action.id}
                      onClick={() => action.action()}
                      onMouseEnter={() => sound.playTick(650)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs transition-colors hover:bg-zinc-900 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-500 group-hover:text-accent transition-colors">
                          {action.icon}
                        </span>
                        <span className="text-zinc-300 group-hover:text-white font-medium">
                          {action.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-600 uppercase tracking-wider">
                        {action.section}
                      </span>
                    </button>
                  ))
                )}
              </div>

              {/* Footer info */}
              <div className="px-4 py-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500 bg-zinc-900/40">
                <span>Thejus Engineering College • AI Portfolio</span>
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-black border border-white/10 text-[10px]">ESC</kbd>
                  <span>to close</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

