import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { personalData } from '../data/content';
import { sound } from '../utils/sound';
import MagneticButton from './MagneticButton';

export default function Navbar({ activeSection = 'hero' }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isMuted, setIsMuted] = useState(sound.isMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Index', id: 'hero' },
    { label: 'Works', id: 'works' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Journey', id: 'journey' },
    { label: 'Contact', id: 'contact' },
  ];

  // Auto-hide navbar on scroll down, reveal on scroll up + Track scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.round((currentScrollY / docHeight) * 100)) : 0;
      setScrollPercent(pct);

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          setIsVisible(false); // scrolling down
        } else if (lastScrollY - currentScrollY > 10) {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id) => {
    sound.playTick(520);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-40 px-4 md:px-10 py-5 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Top Left Monogram / Logo Mark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            className="group flex items-center gap-3 select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/20 flex items-center justify-center font-display font-bold text-xs tracking-wider text-white group-hover:border-accent group-hover:text-accent transition-colors shadow-lg">
              {personalData.monogram}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-display font-bold text-xs tracking-wide text-zinc-100 group-hover:text-white">
                {personalData.name}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                Thejus CSE (AI)
              </span>
            </div>
          </a>

          {/* Top Center Floating Pill Navbar (Matching reference template) */}
          <nav className="hidden md:flex items-center p-1.5 rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={() => sound.playTick(600)}
                  className={`relative px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 rounded-full select-none ${
                    isActive
                      ? 'text-black font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-white rounded-full shadow-md -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Top Right Actions: Live Scroll % + Sound Toggle + Outlined Pill "Get Started / Hire Me" */}
          <div className="flex items-center gap-2.5">
            {/* Live Scroll Percentage Indicator */}
            <div className="hidden lg:flex items-center px-2.5 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 font-mono text-[11px] text-zinc-400 select-none shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse mr-1.5" />
              <span>SCROLL</span>
              <span className="ml-1.5 font-bold text-white">{scrollPercent}%</span>
            </div>

            {/* Audio Toggle */}
            <MagneticButton strength={0.4}>
              <button
                onClick={toggleSound}
                title={isMuted ? 'Unmute Interface Sound' : 'Mute Interface Sound'}
                className="w-9 h-9 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-zinc-300 hover:text-accent hover:border-accent/50 transition-colors"
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </MagneticButton>

            {/* Outlined Pill CTA */}
            <MagneticButton strength={0.3}>
              <button
                onClick={() => scrollTo('contact')}
                onMouseEnter={() => sound.playTick(580)}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/25 hover:border-accent bg-zinc-900/40 backdrop-blur-md text-xs font-semibold tracking-wider text-zinc-100 hover:text-black hover:bg-accent transition-all duration-300 shadow-sm group"
              >
                <span>Get Started</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </MagneticButton>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 p-5 rounded-2xl bg-zinc-950/95 backdrop-blur-2xl border border-white/15 md:hidden shadow-2xl flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-white text-black font-semibold'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">Audio Feedback</span>
              <button
                onClick={toggleSound}
                className="px-3 py-1 text-xs rounded-full border border-white/20 text-zinc-300 flex items-center gap-1.5"
              >
                {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                {isMuted ? 'Muted' : 'Active'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

