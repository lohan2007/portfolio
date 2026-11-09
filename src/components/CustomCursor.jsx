import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  // Mouse coordinate motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for follower ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show on devices with a mouse
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Inspect target to determine cursor context
      const target = e.target;
      if (!target) return;

      const projectCard = target.closest('[data-cursor="view"]');
      const dragArea = target.closest('[data-cursor="drag"]');
      const interactive = target.closest('a, button, input, textarea, [data-cursor="pointer"]');

      if (projectCard) {
        setCursorVariant('view');
        setCursorText('VIEW');
      } else if (dragArea) {
        setCursorVariant('drag');
        setCursorText('DRAG');
      } else if (interactive) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center dot (instant) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] w-2 h-2 rounded-full bg-white mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorVariant === 'default' ? 1 : 0,
          opacity: cursorVariant === 'default' ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Follower ring (spring smoothed) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99] flex items-center justify-center rounded-full font-mono text-[10px] tracking-widest font-bold select-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width:
            cursorVariant === 'view'
              ? 82
              : cursorVariant === 'drag'
              ? 74
              : cursorVariant === 'hover'
              ? 48
              : 32,
          height:
            cursorVariant === 'view'
              ? 82
              : cursorVariant === 'drag'
              ? 74
              : cursorVariant === 'hover'
              ? 48
              : 32,
          backgroundColor:
            cursorVariant === 'view'
              ? '#FFE96B'
              : cursorVariant === 'drag'
              ? 'rgba(255, 255, 255, 0.95)'
              : cursorVariant === 'hover'
              ? 'rgba(255, 255, 255, 0.15)'
              : 'transparent',
          borderColor:
            cursorVariant === 'default'
              ? 'rgba(255, 255, 255, 0.45)'
              : 'transparent',
          borderWidth: cursorVariant === 'default' ? 1 : 0,
          color: cursorVariant === 'view' || cursorVariant === 'drag' ? '#000000' : '#ffffff',
          boxShadow:
            cursorVariant === 'view'
              ? '0 0 30px rgba(255, 233, 107, 0.5)'
              : cursorVariant === 'drag'
              ? '0 0 25px rgba(255, 255, 255, 0.3)'
              : 'none',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="tracking-wider uppercase font-semibold"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}

