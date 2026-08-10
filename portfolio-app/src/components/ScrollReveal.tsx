import React, { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ScrollReveal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Scale down and fade out as it enters/leaves the viewport, creating a cinematic parallax effect
  // Kept subtle to prevent sections from overlapping on mobile viewports
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.96, 1, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.2, 1, 1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [40, 0, 0, -40]);

  return (
    <motion.div 
      ref={ref} 
      style={{ scale, opacity, y, willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};
