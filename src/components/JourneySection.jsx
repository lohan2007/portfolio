import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Milestone, Calendar, MapPin, CheckCircle, GraduationCap } from 'lucide-react';
import { journeyTimeline } from '../data/content';
import { sound } from '../utils/sound';

export default function JourneySection() {
  const containerRef = useRef(null);
  
  // Track scroll progress through this section to draw the SVG line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section 
      id="journey"
      ref={containerRef}
      className="relative w-full py-28 px-4 sm:px-8 md:px-16 lg:px-24 bg-studio-950 border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold">05.</span>
            <span className="text-white uppercase tracking-widest">TIMELINE / TRAJECTORY</span>
          </div>
          <span>ACADEMIC & CODE EVOLUTION</span>
        </div>

        <div className="mt-8 mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            Milestones & Progression
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 font-light">
            From the initial curiosity in computer science to diving deep into artificial intelligence at Thejus Engineering College.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-6 sm:pl-10 md:pl-12">
          
          {/* Background vertical line */}
          <div className="absolute left-[11px] sm:left-[19px] md:left-[23px] top-4 bottom-4 w-[2px] bg-zinc-800 rounded-full" />

          {/* Animated drawing vertical line */}
          <motion.div
            className="absolute left-[11px] sm:left-[19px] md:left-[23px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-accent via-white to-accent origin-top rounded-full shadow-[0_0_12px_rgba(255,233,107,0.6)]"
            style={{ scaleY }}
          />

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16">
            {journeyTimeline.map((item, index) => (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => sound.playTick(620)}
              >
                {/* Glowing Node Marker */}
                <div className="absolute -left-[30px] sm:-left-[43px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-zinc-950 border-2 border-zinc-700 group-hover:border-accent group-hover:scale-125 transition-all duration-300 flex items-center justify-center shadow-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-accent" />
                </div>

                {/* Milestone Content Box */}
                <div className="p-6 sm:p-7 rounded-3xl bg-zinc-900/40 border border-white/10 group-hover:border-white/25 transition-all duration-300">
                  
                  {/* Top metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 border border-white/10 text-accent font-semibold">
                      {item.year}
                    </span>
                    <span className="text-zinc-500 uppercase tracking-widest text-[10px]">
                      {item.period}
                    </span>
                  </div>

                  {/* Title & Institution */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mt-1 mb-4">
                    <GraduationCap size={14} className="text-zinc-500" />
                    <span>{item.institution}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-5 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-zinc-950 border border-white/5 font-mono text-[11px] text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

