import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Cpu, Eye, Sparkles } from 'lucide-react';
import { projects } from '../data/content';
import { sound } from '../utils/sound';

function ProjectTiltCard({ project, index, onOpenModal }) {
  const cardRef = useRef(null);

  // 3D Motion values for tilt animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['9deg', '-9deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-9deg', '9deg']);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      data-cursor="view"
      onClick={() => {
        sound.playPop();
        onOpenModal(project);
      }}
      className="group relative flex flex-col justify-between rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-accent/40 overflow-hidden p-6 sm:p-8 cursor-pointer transition-colors duration-300 shadow-xl hover:shadow-2xl hover:shadow-accent/5"
    >
      {/* 3D Dynamic Glare Reflection Overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
        style={{
          background: `radial-gradient(circle 350px at ${glareX} ${glareY}, rgba(255, 233, 107, 0.08), transparent 70%)`,
        }}
      />

      {/* Visual Preview Container */}
      <div 
        style={{ transform: 'translateZ(25px)' }}
        className="relative w-full h-56 sm:h-64 rounded-2xl bg-zinc-950 overflow-hidden border border-white/10 flex items-center justify-center transition-transform duration-300 group/image shadow-inner"
      >
        {/* Project AI Image with High-Tech Dark Zoom Effect */}
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover filter contrast-[110%] brightness-[85%] group-hover/image:scale-110 group-hover/image:brightness-100 group-hover/image:contrast-125 transition-all duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 ease-out flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-32 h-32 rounded-2xl border border-dashed border-accent/40 rotate-12 group-hover:rotate-45 transition-transform duration-700 flex items-center justify-center">
                <Cpu size={36} className="text-zinc-500 group-hover:text-accent transition-colors duration-500" />
              </div>
            </div>
          </div>
        )}

        {/* Cinematic dark studio vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-black/40 pointer-events-none" />

        {/* Technical Corner Brackets */}
        <span className="absolute bottom-2.5 left-3 font-mono text-[10px] text-white/30 pointer-events-none">+</span>
        <span className="absolute bottom-2.5 right-3 font-mono text-[10px] text-white/30 pointer-events-none">+</span>

        {/* Top Bar inside preview */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 font-mono text-[11px]">
          <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-zinc-300 shadow-md">
            SYS // {project.index}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-accent font-semibold shadow-md">
            {project.year}
          </span>
        </div>

        {/* Center Hover Action Pill */}
        <div className="z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-black font-semibold text-xs tracking-wider uppercase shadow-2xl scale-95 group-hover:scale-100">
          <Eye size={14} />
          <span>Explore Architecture</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-950/90 to-transparent pointer-events-none" />
      </div>

      {/* Card Content */}
      <div 
        style={{ transform: 'translateZ(18px)' }}
        className="mt-6 flex-1 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between font-mono text-xs text-zinc-400 mb-2">
            <span className="text-accent flex items-center gap-1">
              <Sparkles size={11} />
              <span>{project.category}</span>
            </span>
            <span>{project.year}</span>
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-accent transition-colors flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowUpRight size={18} className="text-zinc-400 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </h3>

          <p className="mt-3 text-xs sm:text-sm text-zinc-300 font-light line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech stack badges */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-md bg-zinc-950 border border-white/10 font-mono text-[11px] text-zinc-400 group-hover:border-white/20 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection({ onOpenProjectModal }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const handleFilterClick = (cat) => {
    sound.playTick(550);
    setActiveFilter(cat);
  };

  return (
    <section 
      id="works"
      className="relative w-full py-24 px-4 sm:px-8 md:px-14 lg:px-20 bg-studio-950 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 mb-2">
              <span className="text-accent font-bold">03.</span>
              <span className="text-white uppercase tracking-widest">SELECTED WORKS / ENGINEERING</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Crafted with Code & Neural Weights
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            Curated showcase of real-world AI applications, microclimate predictive systems, and high-performance software built with 3D interaction.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 my-8">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilterClick(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Cards Grid with 3D Tilt Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 perspective-1000">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectTiltCard
                key={project.id}
                project={project}
                index={index}
                onOpenModal={onOpenProjectModal}
              />
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
