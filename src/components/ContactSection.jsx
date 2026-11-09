import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, ArrowUpRight, Copy, Check, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalData } from '../data/content';
import { sound } from '../utils/sound';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopyEmail = () => {
    sound.playPop();
    navigator.clipboard.writeText(personalData.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playPop();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      sound.playSuccess();

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FFE96B', '#ffffff', '#a1a1aa'],
      });

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4500);
    }, 900);
  };

  return (
    <section 
      id="contact"
      className="relative w-full py-28 px-4 sm:px-8 md:px-16 lg:px-24 bg-studio-950 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold">06.</span>
            <span className="text-white uppercase tracking-widest">TRANSMISSION / CONTACT</span>
          </div>
          <span>INITIATE COLLABORATION</span>
        </div>

        {/* Huge Headline */}
        <div className="mt-12 mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 font-mono text-xs text-accent mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Open for AI Research & Projects</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-tight">
            Let's Build <br />
            <span className="text-zinc-500 hover:text-white transition-colors duration-500">The Future.</span>
          </h2>
        </div>

        {/* Two-Column Grid: Channels / Copy Email + Animated Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Social Handles */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              Whether you are looking to collaborate on machine learning research, develop a modern interactive web application, or discuss student initiatives at Thejus Engineering College, I'd love to connect.
            </p>

            {/* Quick Copy Email Box */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/15 space-y-2">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block">
                Direct Communication Channel
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs sm:text-sm text-white select-all truncate">
                  {personalData.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {isCopied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Social Links List */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
                Verified Social Profiles
              </span>
              <div className="flex flex-col gap-2 font-mono text-xs">
                {[
                  { name: 'GitHub', url: personalData.github, icon: <Github size={15} />, user: '@lohansabari' },
                  { name: 'LinkedIn', url: personalData.linkedin, icon: <Linkedin size={15} />, user: 'Lohan Sabari Krishna' },
                  { name: 'Instagram', url: personalData.instagram, icon: <Instagram size={15} />, user: '@lohan_sabari' },
                ].map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => sound.playTick(650)}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/40 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-400 group-hover:text-accent transition-colors">{s.icon}</span>
                      <span>{s.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-500 group-hover:text-zinc-300">
                      <span>{s.user}</span>
                      <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-900/50 border border-white/15">
            <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-6">
              Send a Message
            </h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-3 font-mono"
              >
                <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent">
                  <Check size={24} />
                </div>
                <h4 className="font-display text-lg font-bold text-white uppercase">Message Dispatched</h4>
                <p className="text-xs text-zinc-400 max-w-sm">
                  Thank you! Your message has been received. I will respond to your transmission promptly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-accent font-sans text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-accent font-sans text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Project / Message Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your project, ideas, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-accent font-sans text-sm transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  onMouseEnter={() => sound.playTick(580)}
                  className="w-full mt-4 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-black font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-accent/30 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

