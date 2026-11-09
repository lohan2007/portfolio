import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ExternalLink, Github, CheckCircle2, Cpu, 
  Terminal, Play, Check, Sparkles, Activity, Layers 
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'simulator'
  const [isInferencing, setIsInferencing] = useState(false);
  const [inferenceLogs, setInferenceLogs] = useState([]);
  const [hasRunInference, setHasRunInference] = useState(false);

  if (!project) return null;

  const handleRunSimulation = () => {
    sound.playPop();
    setIsInferencing(true);
    setInferenceLogs(['[INIT] Loading model weights into CUDA device:0...']);

    setTimeout(() => {
      setInferenceLogs((prev) => [
        ...prev, 
        '[TENSOR] Allocating FP16 TensorRT execution engine (0.42 GB)',
        '[STREAM] Ingesting test synthetic telemetry stream at 60 FPS...'
      ]);
      sound.playTick(500);
    }, 400);

    setTimeout(() => {
      setInferenceLogs((prev) => [
        ...prev, 
        `[DETECTION] Object detected: class="neural_processor" conf=0.984 bbox=[120, 84, 340, 290]`,
        `[DETECTION] Object detected: class="edge_sensor" conf=0.991 bbox=[420, 160, 580, 310]`,
        `[BENCHMARK] End-to-end latency: 12.8ms | Memory: 184MB | Status: OPTIMAL`
      ]);
      sound.playSuccess();
      setIsInferencing(false);
      setHasRunInference(true);
    }, 950);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playTick(400);
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto z-10 custom-scrollbar"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                {project.category || 'Artificial Intelligence'}
              </span>
            </div>

            {/* Navigation Tabs (Overview vs Live Simulator) */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono">
              <button
                onClick={() => {
                  sound.playTick(500);
                  setActiveTab('overview');
                }}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-white text-black font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Architecture
              </button>
              <button
                onClick={() => {
                  sound.playTick(550);
                  setActiveTab('simulator');
                }}
                className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'simulator'
                    ? 'bg-accent text-black font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Terminal size={12} />
                <span>AI Console</span>
              </button>
            </div>
            
            <button
              onClick={() => {
                sound.playTick(400);
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-zinc-900 border border-white/15 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/40 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* TAB 1: ARCHITECTURE OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Title & Tag */}
              <div className="mt-5">
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="font-mono text-xs text-accent mt-1">
                    {project.subtitle}
                  </p>
                )}
                <p className="mt-4 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Stats Grid if available */}
              {project.stats && (
                <div className="mt-5 grid grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-white/10 font-mono">
                  {Object.entries(project.stats).map(([k, v]) => (
                    <div key={k} className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{k}</span>
                      <span className="text-xs sm:text-sm font-bold text-white mt-0.5">{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Engineering Highlights */}
              {project.highlights && (
                <div className="mt-5 space-y-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                    Key Implementation Details
                  </span>
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Badges */}
              <div className="mt-5">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Stack & Tooling
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(project.tech || (project.badge ? project.badge.split(' • ') : ['PyTorch', 'Python', 'React'])).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: INTERACTIVE AI CONSOLE SIMULATOR */}
          {activeTab === 'simulator' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-5 space-y-4"
            >
              <div>
                <h4 className="font-display text-lg font-bold uppercase text-white">
                  Live Neural Telemetry Simulator
                </h4>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Interactive real-time model testbench for {project.title}
                </p>
              </div>

              {/* Terminal Window Box */}
              <div className="p-4 rounded-2xl bg-black border border-white/15 font-mono text-xs space-y-2 min-h-[180px] flex flex-col justify-between">
                <div className="space-y-1.5 overflow-y-auto max-h-48 text-zinc-400">
                  <div className="text-zinc-600">
                    $ thejus-ai-agent --model="{project.title.toLowerCase().replace(/\s+/g, '_')}" --device=cuda:0
                  </div>
                  {inferenceLogs.length === 0 ? (
                    <div className="text-zinc-500 italic">
                      [READY] Standby. Click "Trigger Neural Inference" to execute a live test run...
                    </div>
                  ) : (
                    inferenceLogs.map((log, idx) => (
                      <div 
                        key={idx} 
                        className={log.includes('[DETECTION]') ? 'text-accent' : log.includes('[BENCHMARK]') ? 'text-emerald-400 font-bold' : 'text-zinc-300'}
                      >
                        {log}
                      </div>
                    ))
                  )}
                </div>

                {/* Status Bar */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isInferencing ? 'bg-accent animate-ping' : hasRunInference ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                    <span>ENGINE STATUS: {isInferencing ? 'INFERENCING' : hasRunInference ? 'CONVERGED' : 'STANDBY'}</span>
                  </span>
                  <span>CUDA FP16 // 60 FPS</span>
                </div>
              </div>

              {/* Trigger Button */}
              <button
                onClick={handleRunSimulation}
                disabled={isInferencing}
                className="w-full py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-black font-mono font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {isInferencing ? (
                  <>
                    <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full" />
                    <span>Executing Inference Kernel...</span>
                  </>
                ) : (
                  <>
                    <Play size={13} className="fill-black" />
                    <span>Trigger Neural Inference Test</span>
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* Action Footer */}
          <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <a
              href={project.github || 'https://github.com/lohansabari'}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-white transition-colors"
            >
              <Github size={14} />
              <span>Source Code</span>
            </a>

            <a
              href={project.demo || project.previewUrl || 'https://github.com/lohansabari'}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-black font-semibold text-xs tracking-wide transition-colors shadow-lg"
            >
              <span>Visit Project</span>
              <ExternalLink size={13} />
            </a>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
