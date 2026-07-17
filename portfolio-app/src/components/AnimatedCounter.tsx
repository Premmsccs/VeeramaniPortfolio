import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const numericMatch = value.match(/[\d.]+/);
  const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const prefix = numericMatch ? value.slice(0, numericMatch.index) : '';
  const suffix = numericMatch ? value.slice((numericMatch.index ?? 0) + numericMatch[0].length) : value;
  const decimals = numericMatch && numericMatch[0].includes('.') ? numericMatch[0].split('.')[1].length : 0;

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, numericValue, motionValue]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix, decimals]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}0{suffix}
    </motion.span>
  );
};
