import React, { useState, useRef } from 'react';
import { Sliders, ArrowRightLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BeforeAfterSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'slider' | 'sideBySide' | 'principles'>('slider');
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePos = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(100, Math.max(0, pos)));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePos(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePos(e.clientX);
  };

  const stopDragging = () => setIsDragging(false);

  const principles = [
    {
      title: 'Structured Visual Hierarchy & 3-Pillar Layout',
      before: 'Dense text blocks with bullet points causing high cognitive overload and visual clutter.',
      after: 'Clean 3-card architectural grid structure that guides the executive eye directly to core value pillars.',
      icon: '🏛️'
    },
    {
      title: 'High-Contrast Typography & Scannability',
      before: 'Flat monochrome color palette with no visual focal point or clear metrics callouts.',
      after: 'Stark black-and-gold accents and bold Outfit typography that make key percentages stand out instantly.',
      icon: '📊'
    },
    {
      title: '100% Editable Native PowerPoint Shapes',
      before: 'Flattened non-editable image assets that require external graphic designers for future updates.',
      after: 'Built using native PowerPoint vector shapes and master slides, allowing 100% seamless executive edits.',
      icon: '⚡'
    }
  ];

  return (
    <section id="redesign" className="redesign-section">
      <div className="container-max">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-head"
        >
          <div className="hero-role-pill">
            <Sliders size={16} color="var(--accent-gold)" />
            <span>Interactive Slide Redesign Suite</span>
          </div>
          <h2 className="section-head-title">
            See How Veeramani Transforms Ordinary Drafts
          </h2>
          <p className="section-head-subtitle">
            Experience the real-time difference between an unpolished slide draft and an award-winning executive presentation deck built by Veeramani K.
          </p>
        </motion.div>

        {/* View Mode Tabs */}
        <div className="tab-container">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveTab('slider')}
            className={activeTab === 'slider' ? 'tab-button tab-button-active' : 'tab-button'}
          >
            Interactive Drag Slider
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveTab('sideBySide')}
            className={activeTab === 'sideBySide' ? 'tab-button tab-button-active' : 'tab-button'}
          >
            Side-by-Side Comparison
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveTab('principles')}
            className={activeTab === 'principles' ? 'tab-button tab-button-active' : 'tab-button'}
          >
            Redesign Principles
          </motion.button>
        </div>

        {/* TAB CONTENTS WITH SMOOTH ANIMATE PRESENCE */}
        <AnimatePresence mode="wait">

          {/* TAB 1: INTERACTIVE DRAG SLIDER */}
          {activeTab === 'slider' && (
            <motion.div
              key="slider"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div
                ref={containerRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={stopDragging}
                onPointerCancel={stopDragging}
                className="slider-wrapper"
                style={{ touchAction: 'none', cursor: 'ew-resize' }}
              >
                {/* AFTER IMAGE (Background / Full Width) */}
                <img
                  src="/assets/portfolio/image25.png"
                  alt="After Redesign by Veeramani K"
                  className="slider-img"
                  draggable={false}
                />
                <div className="slider-overlay-label label-after">
                  AFTER: Executive SaaS Slide Deck (Veeramani K)
                </div>

                {/* BEFORE IMAGE LAYER (Full width, clipped by Slider Position) */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    overflow: 'hidden',
                    clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
                  }}
                >
                  <img
                    src="/assets/portfolio/image26.png"
                    alt="Before Unpolished Draft"
                    className="slider-img"
                    draggable={false}
                  />
                  <div className="slider-overlay-label label-before">
                    BEFORE: Unpolished Initial Draft
                  </div>
                </div>

                {/* DRAG DIVIDER LINE & HANDLE */}
                <div
                  className="slider-divider-line"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="slider-drag-handle">
                    <ArrowRightLeft size={16} color="var(--accent-gold)" />
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                ← Drag slider horizontally to inspect Before vs. After impact →
              </div>
            </motion.div>
          )}

          {/* TAB 2: SIDE BY SIDE VIEW */}
          {activeTab === 'sideBySide' && (
            <motion.div
              key="sideBySide"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="comparison-grid"
            >
              <div className="comparison-card">
                <div className="comparison-header">
                  <span className="comparison-badge badge-before">
                    Before: Original Draft
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>Cluttered & Dense</span>
                </div>
                <div className="comparison-img-box">
                  <img src="/assets/portfolio/image26.png" alt="Before Draft" />
                </div>
                <p className="comparison-desc">
                  Lacks visual hierarchy, contrast, and scannable metrics. Text blocks require high reading effort and fail to direct executive focus.
                </p>
              </div>

              <div className="comparison-card" style={{ borderColor: 'var(--border-gold)' }}>
                <div className="comparison-header">
                  <span className="comparison-badge badge-after">
                    After: Veeramani Redesign
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-gold)' }}>100% Editable Vector</span>
                </div>
                <div className="comparison-img-box">
                  <img src="/assets/portfolio/image25.png" alt="After Redesign" />
                </div>
                <p className="comparison-desc" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  Transformative 3-column architecture, high-trust titanium slate aesthetic, bespoke iconography, and instant executive data comprehension.
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 3: REDESIGN PRINCIPLES BREAKDOWN */}
          {activeTab === 'principles' && (
            <motion.div
              key="principles"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="principles-grid"
            >
              {principles.map((p, idx) => (
                <div key={idx} className="principle-card">
                  <div className="principle-icon-box">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="principle-title">{p.title}</h3>
                    <div className="principle-bullet-box" style={{ marginTop: '14px' }}>
                      <div className="principle-sub-card sub-card-before">
                        <strong>⚠️ Before:</strong> {p.before}
                      </div>
                      <div className="principle-sub-card sub-card-after">
                        <strong>✅ Veeramani Solution:</strong> {p.after}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
};
