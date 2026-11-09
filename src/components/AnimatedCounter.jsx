import React, { useEffect, useState, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

/**
 * Counts smoothly from 0 up to `target` when scrolled into view.
 */
export default function AnimatedCounter({ 
  target = 90, 
  duration = 1.6, 
  delay = 0, 
  suffix = '%',
  prefix = '',
  className = ''
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const controls = animate(0, target, {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // Smooth custom cubic bezier
        onUpdate: (latest) => {
          setCount(Math.round(latest));
        },
      });

      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, target, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

