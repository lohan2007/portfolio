import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Terminal, Globe, Wrench, Sparkles } from 'lucide-react';
import { skillCategories, marqueeSkills } from '../data/content';
import { sound } from '../utils/sound';
import AnimatedCounter from './AnimatedCounter';

export default function SkillsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  const getCategoryIcon = (idx) => {
    switch (idx) {
      case 0: return <Cpu size={18} className="text-accent" />;
      case 1: return <Globe size={18} className="text-blue-400" />;
      case 2: return <Terminal size={18} className="text-purple-400" />;
      default: return <Wrench size={18} className="text-emerald-400" />;
    }
  };

  return (
    <section 
      id="skills"
      ref={containerRef}
      className="relative w-full py-24 bg-studio-950 border-t border-white/10 overflow-hidden"
    >
      {/* Dual Infinite Scrolling Marquee (Track 1: Forward) */}
      <div className="relative w-full py-3.5 bg-zinc-900/60 border-y border-white/10 overflow-hidden select-none">
        <div className="flex w-max animate-marquee space-x-8">
          {[...marqueeSkills, ...marqueeSkills, ...marqueeSkills].map((skill, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-3 text-xs sm:text-sm font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dual Infinite Scrolling Marquee (Track 2: Reverse) */}
      <div className="relative w-full py-2.5 bg-black/40 border-b border-white/5 overflow-hidden select-none">
        <div className="flex w-max animate-marquee-reverse space-x-8">
          {[...marqueeSkills.slice().reverse(), ...marqueeSkills.slice().reverse(), ...marqueeSkills.slice().reverse()].map((skill, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-3 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-accent transition-colors"
            >
              <span className="w-1 h-1 rounded-full bg-zinc-600" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-14 lg:px-20 mt-16">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold">04.</span>
            <span className="text-white uppercase tracking-widest">TECHNICAL ARSENAL</span>
          </div>
          <span className="hidden sm:inline">SKILLS MATRIX & CORE PROFICIENCIES</span>
        </div>

        <div className="mt-8 max-w-2xl">
          <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            Algorithms to Interfaces
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            Bridging foundational algorithmic programming with modern machine learning frameworks and high-performance interactive interfaces.
          </p>
        </div>

        {/* 4 Skill Category Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="p-6 sm:p-7 rounded-3xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between hover:shadow-xl"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    {getCategoryIcon(catIdx)}
                    <h3 className="font-display text-base sm:text-lg font-bold uppercase text-white tracking-wide">
                      {cat.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-zinc-950 border border-white/10 text-zinc-400">
                    {cat.badge}
                  </span>
                </div>

                {/* Skills list with animated progress bars */}
                <div className="mt-5 space-y-3.5">
                  {cat.skills.map((skill, sIdx) => (
                    <div 
                      key={sIdx}
                      onMouseEnter={() => sound.playTick(700 + sIdx * 40)}
                      className="group/item"
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-zinc-200 group-hover/item:text-accent font-medium transition-colors">
                          {skill.name}
                        </span>
                        <AnimatedCounter 
                          target={skill.level} 
                          duration={1.2} 
                          delay={0.15 + sIdx * 0.05} 
                          suffix="%" 
                          className="text-zinc-400 font-light font-mono"
                        />
                      </div>

                      {/* Progress bar */}
                      <div className="relative w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-zinc-500 to-accent rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 + sIdx * 0.06, ease: 'easeOut' }}
                        />
                      </div>

                      <span className="text-[10px] text-zinc-500 mt-0.5 block font-mono">
                        {skill.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>Thejus CSE (AI) Verified</span>
                <span className="text-accent">Hands-On Mastery</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
