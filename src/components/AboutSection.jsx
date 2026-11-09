import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  GraduationCap, Cpu, Code2, Sparkles, MapPin, 
  CheckCircle, ArrowUpRight, Terminal, Eye, Layers, FileDown, Check 
} from 'lucide-react';
import { personalData, awardsAndHighlights } from '../data/content';
import { sound } from '../utils/sound';
import NeuralCore3D from './NeuralCore3D';
import AnimatedCounter from './AnimatedCounter';

export default function AboutSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [activePillar, setActivePillar] = useState(0);
  const [downloaded, setDownloaded] = useState(false);

  const pillars = [
    {
      icon: <Eye size={18} className="text-accent" />,
      title: "Vision & Edge Inference",
      tag: "PyTorch • OpenCV",
      desc: "Optimizing neural backbones for low-latency visual understanding, object tracking, and edge sensor pipelines."
    },
    {
      icon: <Cpu size={18} className="text-blue-400" />,
      title: "Machine Learning Models",
      tag: "TensorFlow • Scikit-learn",
      desc: "Training temporal forecasting networks, anomaly isolation systems, and exploring multimodal LLM integrations."
    },
    {
      icon: <Code2 size={18} className="text-emerald-400" />,
      title: "Creative Systems & Web",
      tag: "React • Three.js • C",
      desc: "Engineering high-performance tactile interfaces with fluid animations, WebGL 3D graphics, and strict memory discipline."
    }
  ];

  const handleDownloadCV = () => {
    sound.playPop();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
    // Open print-friendly resume profile or download
    const cvData = `
LOHAN SABARI KRISHNA
First-Year B.Tech Computer Science & Engineering (Artificial Intelligence)
Thejus Engineering College, Vellarakkad, Thrissur, Kerala
Email: ${personalData.email}
GitHub: ${personalData.github}
LinkedIn: ${personalData.linkedin}

CORE FOCUS:
- Deep Learning & Computer Vision (PyTorch, OpenCV)
- Full-Stack & Creative Engineering (React, Vite, Three.js, Tailwind CSS)
- Foundational Systems (C Programming, Python, Java, Data Structures)
`;
    const blob = new Blob([cvData.trim()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Lohan_Sabari_Krishna_AI_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative w-full py-24 px-4 sm:px-8 md:px-14 lg:px-20 bg-studio-950 border-t border-white/10 overflow-hidden"
    >
      {/* Subtle ambient lighting accent in backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-accent/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header: Minimal & Crisp */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold">02.</span>
            <span className="text-white uppercase tracking-widest">ABOUT // PROFILE & VISION</span>
          </div>
          <span className="hidden sm:inline text-zinc-500">THEJUS ENGINEERING COLLEGE • CSE (AI)</span>
        </div>

        {/* Refined Headline & Bio: Reduced Size, High Elegance */}
        <div className="mt-12 max-w-4xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 font-mono text-[11px] text-zinc-300 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-accent font-semibold">ACADEMIC TRAJECTORY</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">CLASS OF 2028</span>
          </div>

          {/* Reduced size, highly attractive formatted statement */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-zinc-300 font-sans tracking-normal"
          >
            I am a{' '}
            <span className="font-semibold text-white px-2 py-0.5 rounded-md bg-zinc-900 border border-white/15 inline-block mx-1">
              first-year undergraduate
            </span>{' '}
            studying{' '}
            <span className="font-semibold text-accent px-2.5 py-0.5 rounded-md bg-accent/10 border border-accent/40 inline-flex items-center gap-1.5 mx-1 shadow-sm">
              <Sparkles size={13} className="text-accent shrink-0" />
              <span>Computer Science & Engineering (Artificial Intelligence)</span>
            </span>{' '}
            at{' '}
            <span className="font-semibold text-white border-b border-white/30 pb-0.5">
              Thejus Engineering College
            </span>.
            <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
              I specialize in developing high-throughput neural vision systems, edge inference pipelines, and award-grade digital experiences that bridge algorithmic intelligence with fluid interaction.
            </p>
          </motion.div>
        </div>

        {/* Three Pillar Cards (Intelligent Systems, Machine Learning, Creative Systems) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              onMouseEnter={() => {
                setActivePillar(idx);
                sound.playTick(600 + idx * 50);
              }}
              className={`p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between ${
                activePillar === idx
                  ? 'bg-zinc-900/90 border border-accent/40 shadow-xl shadow-black/40 scale-[1.02]'
                  : 'bg-zinc-900/40 border border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-white/15 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-zinc-950/80 border border-white/10 text-zinc-400">
                    {pillar.tag}
                  </span>
                </div>
                <h4 className="font-display text-base font-bold text-white uppercase tracking-wide">
                  {pillar.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>PILLAR 0{idx + 1}</span>
                <span className="text-accent flex items-center gap-1">ACTIVE EXPLORATION</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Grid: Visual HUD Identity Card + Academic Statistics */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Portrait & Biometric Identity Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-zinc-900/50 border border-white/15 relative overflow-hidden group">
            
            {/* Top Status */}
            <div className="flex items-center justify-between z-10 font-mono text-xs">
              <span className="px-3 py-1 rounded-full bg-black/70 border border-white/10 text-accent flex items-center gap-1.5">
                <Sparkles size={11} />
                <span>VERIFIED UNDERGRAD</span>
              </span>
              <span className="text-zinc-500">ID: LSK-2024-AI</span>
            </div>

            {/* Interactive 3D WebGL Neural Core */}
            <div className="relative my-6 h-56 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-800/60 to-zinc-950 border border-white/10 flex items-center justify-center">
              <NeuralCore3D />

              {/* LSK Floating Badge in center of 3D space */}
              <div className="absolute pointer-events-none w-14 h-14 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center font-display text-xl font-extrabold text-white group-hover:text-accent group-hover:border-accent transition-all duration-300 shadow-xl">
                {personalData.monogram}
              </div>

              {/* Scanline Sweep Animation */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/15 to-transparent h-14 w-full -translate-y-full group-hover:translate-y-[260px] transition-transform duration-1000 ease-in-out pointer-events-none" />

              {/* Bottom Tag */}
              <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between font-mono text-[10px] text-zinc-300">
                <span className="flex items-center gap-1 text-accent">
                  <Cpu size={12} />
                  <span>Neural Architect</span>
                </span>
                <span className="text-zinc-500">2024 — 2028</span>
              </div>
            </div>

            {/* Bottom Details & Download CV Action */}
            <div className="space-y-3 z-10 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-zinc-400">Campus:</span>
                <span className="text-white font-medium">{personalData.institution}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-zinc-400">Location:</span>
                <span className="text-white flex items-center gap-1">
                  <MapPin size={12} className="text-accent" />
                  <span>{personalData.location}</span>
                </span>
              </div>

              {/* Download Resume / Profile Sheet Button */}
              <button
                onClick={handleDownloadCV}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/10 hover:border-white/30 text-white font-mono text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                {downloaded ? <Check size={14} className="text-accent" /> : <FileDown size={14} />}
                <span>{downloaded ? 'Profile Sheet Downloaded' : 'Download Academic Profile (TXT)'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Key Metrics + Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            
            {/* Stat Counters Grid: Compact & Sharp */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {personalData.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-4 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/25 transition-colors font-mono"
                >
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white flex items-baseline">
                    <AnimatedCounter
                      target={stat.value}
                      duration={1.5}
                      delay={0.1 + idx * 0.08}
                      suffix=""
                      className="font-display"
                    />
                    <span className="text-accent text-lg font-normal ml-0.5">{stat.suffix}</span>
                  </div>
                  <span className="text-[11px] text-zinc-400 mt-1 block font-sans">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Academic Philosophy & Core Highlights */}
            <div className="p-6 sm:p-7 rounded-3xl bg-zinc-900/35 border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="text-accent" size={19} />
                <h4 className="font-display text-base sm:text-lg font-bold uppercase tracking-wide text-white">
                  Engineering Philosophy & Thejus AI Curriculum
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                At Thejus Engineering College, my coursework in Artificial Intelligence emphasizes core mathematical mastery—multivariate calculus, probability theory, discrete algorithmic analysis—coupled with applied modern systems. I explore neural networks from first principles while building clean, user-facing production interfaces.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {awardsAndHighlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-zinc-950/60 border border-white/5">
                    <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-mono text-xs font-semibold text-white">{item.title}</h5>
                      <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
