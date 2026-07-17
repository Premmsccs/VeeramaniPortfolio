import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <div className="aurora-blob aurora-blob-gold" />
      <div className="aurora-blob aurora-blob-violet" />
      <div className="aurora-vignette" />
    </div>
  );
};
