import React, { useEffect, useRef } from 'react';

/**
 * Procedural film grain overlay for award-style cinematic texture.
 */
export default function GrainOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = 180);
    let height = (canvas.height = 180);

    const generateNoise = () => {
      const imgData = ctx.createImageData(width, height);
      const buffer32 = new Uint32Array(imgData.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        // Random subtle monochromatic noise
        const noise = (Math.random() * 255) | 0;
        // Subtle opacity (alpha ~ 14 to 28)
        buffer32[i] = ((Math.random() * 22 + 6) << 24) | (noise << 16) | (noise << 8) | noise;
      }

      ctx.putImageData(imgData, 0, 0);
    };

    let count = 0;
    const render = () => {
      count++;
      // Re-generate every 3 frames for subtle jitter without excessive CPU usage
      if (count % 3 === 0) {
        generateNoise();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 select-none overflow-hidden opacity-[0.45] mix-blend-overlay"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-repeat"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}

