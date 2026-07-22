import React, { useEffect, useRef, useState } from 'react';
import { animate, utils } from 'animejs';

export const AnimeJsBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);

  // Size of each grid block
  const BLOCK_SIZE = 80; 

  const handleResize = () => {
    if (!containerRef.current) return;
    const { innerWidth, innerHeight } = window;
    // Calculate how many columns/rows can fit
    const cols = Math.floor(innerWidth / BLOCK_SIZE) + 1;
    const rws = Math.floor(innerHeight / BLOCK_SIZE) + 1;
    setColumns(cols);
    setRows(rws);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBlockClick = (index: number) => {
    animate('.anime-grid-block', {
      scale: [
        { value: 0.1, easing: 'easeOutSine', duration: 400 },
        { value: 1, easing: 'easeInOutQuad', duration: 900 }
      ],
      opacity: [
        { value: 0.2, easing: 'easeOutSine', duration: 400 },
        { value: 1, easing: 'easeInOutQuad', duration: 900 }
      ],
      backgroundColor: [
        { value: '#d4af37', duration: 100 }, // Flash gold
        { value: 'rgba(255, 255, 255, 0.02)', duration: 1000 } // Fade back to default
      ],
      delay: utils.stagger(50, {
        grid: [columns, rows],
        from: index
      })
    });
  };

  return (
    <div 
      ref={containerRef}
      className="anime-bg-container"
    >
      <div 
        className="anime-grid-wrapper"
        style={{
          gridTemplateColumns: `repeat(${columns}, ${BLOCK_SIZE}px)`,
          gridTemplateRows: `repeat(${rows}, ${BLOCK_SIZE}px)`,
        }}
      >
        {Array.from({ length: columns * rows }).map((_, index) => (
          <div
            key={index}
            className="anime-grid-block"
            onClick={() => handleBlockClick(index)}
          />
        ))}
      </div>
    </div>
  );
};
