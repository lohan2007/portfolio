import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import JourneySection from './components/JourneySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import CommandPalette from './components/CommandPalette';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Section observer to update active navbar pill
  useEffect(() => {
    const sections = ['hero', 'works', 'about', 'skills', 'journey', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoaded]);

  return (
    <div className="relative min-h-screen bg-studio-950 text-white selection:bg-accent selection:text-black">
      {/* 1. Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* 2. Custom Cursor */}
      <CustomCursor />

      {/* 3. Film Grain Noise Overlay */}
      <GrainOverlay />

      {/* 4. Glassmorphism Floating Navbar */}
      <Navbar activeSection={activeSection} />

      {/* 5. Main Content */}
      <main className="relative z-10">
        <HeroSection onOpenProjectModal={(project) => setSelectedProject(project)} />
        <AboutSection />
        <ProjectsSection onOpenProjectModal={(project) => setSelectedProject(project)} />
        <SkillsSection />
        <JourneySection />
        <ContactSection />
      </main>

      {/* 6. Footer */}
      <Footer />

      {/* 7. Detailed Project Case-Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 8. Quick Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette />
    </div>
  );
}

