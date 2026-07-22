import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Images, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GALLERY_DATA,
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryItem
} from '../data/portfolioData';

export const CoverflowGallery: React.FC = () => {
  const [activeCat, setActiveCat] = useState<GalleryCategory>('presentation');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  /* Show fewer receding cards (and space them wider) on small screens */
  const [sideCount, setSideCount] = useState(2);
  useEffect(() => {
    const update = () => setSideCount(window.innerWidth < 720 ? 1 : 2);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  const spread = sideCount === 1 ? 58 : 50;

  /* Only real hover-capable pointers (a mouse) should be able to pause
     auto-advance on hover. Touch/pen devices report `pointerType` unreliably
     across browsers (some fire a synthetic "enter" after a tap with no
     matching "leave"), which used to wedge the carousel paused forever. A
     one-time device-capability check sidesteps that entirely. */
  const [supportsHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  const items = GALLERY_DATA.filter((g) => g.category === activeCat);
  const count = items.length;

  /* Bumped by every manual navigation so the auto-advance timer restarts from
     zero instead of yanking the slide away mid-look. */
  const [navNonce, setNavNonce] = useState(0);

  const go = useCallback(
    (dir: number) => {
      if (count === 0) return;
      setIndex((i) => (i + dir + count) % count);
      setNavNonce((n) => n + 1);
    },
    [count]
  );

  const select = useCallback((i: number) => {
    setIndex(i);
    setNavNonce((n) => n + 1);
  }, []);

  // Reset to first slide whenever the category changes
  useEffect(() => {
    setIndex(0);
  }, [activeCat]);

  // Auto-advance carousel — keeps "running" continuously (pauses on hover / lightbox)
  useEffect(() => {
    if (paused || lightbox || count <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), 2200);
    return () => clearInterval(timer);
  }, [paused, lightbox, count, navNonce]);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox) {
        if (e.key === 'Escape') setLightbox(null);
        return;
      }
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, lightbox]);

  // Lock page scroll while the lightbox is open
  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  // Touch / drag swipe
  const dragStart = useRef<number | null>(null);
  const swiped = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    // Do not intercept clicks meant for the navigation arrows or dots
    if ((e.target as HTMLElement).closest('button')) return;
    
    dragStart.current = e.clientX;
    swiped.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const delta = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) > 60) {
      swiped.current = true;
      go(delta > 0 ? -1 : 1);
    }
  };
  const onPointerLeave = () => {
    dragStart.current = null;
  };

  const onStageEnter = () => {
    // Intentionally left blank: user requested auto-play to continue on hover
  };
  const onStageLeave = () => {
    if (supportsHover) setPaused(false);
  };

  /* A pointerdown+pointerup pair also emits a click. Without this, a swipe would
     land on a card whose handler then re-selects it, undoing the swipe. */
  const onClickCapture = (e: React.MouseEvent) => {
    if (!swiped.current) return;
    swiped.current = false;
    e.stopPropagation();
  };

  const active = items[index];

  return (
    <section id="showcase" className="portfolio-section">
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
            <Images size={16} color="var(--accent-gold)" />
            <span>Interactive Slide Gallery</span>
          </div>
          <h2 className="section-head-title">Featured Design Portfolio</h2>
          <p className="section-head-subtitle">
            A curated showcase of executive presentations, data infographics, and analytics
            dashboards — organised by category. Browse the carousel and click any slide to view it full-size.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="cf-tabs">
          {GALLERY_CATEGORIES.map((cat) => {
            const total = GALLERY_DATA.filter((g) => g.category === cat.key).length;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCat(cat.key)}
                className={activeCat === cat.key ? 'cf-tab cf-tab-active' : 'cf-tab'}
              >
                {cat.label}
                <span className="cf-tab-count">{total}</span>
              </button>
            );
          })}
        </div>

        {/* Coverflow Stage */}
        <div
          className="cf-stage"
          onPointerEnter={onStageEnter}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={() => {
            onPointerLeave();
            onStageLeave();
          }}
          onPointerCancel={() => {
            onPointerLeave();
            onStageLeave();
          }}
          onClickCapture={onClickCapture}
        >
          <div className="cf-glow" aria-hidden="true" />

          <div className="cf-track">
            {items.map((item, i) => {
              // shortest signed distance on the circular list
              let offset = i - index;
              if (offset > count / 2) offset -= count;
              if (offset < -count / 2) offset += count;

              const abs = Math.abs(offset);
              const hidden = abs > sideCount;

              // Park off-screen cards just outside the visible ring instead of letting
              // them fly hundreds of % away (which stretched the page sideways).
              const limit = sideCount + 1;
              const parked = Math.max(-limit, Math.min(limit, offset));

              const scale = offset === 0 ? 1 : 0.74 - (Math.min(abs, limit) - 1) * 0.12;
              const style: React.CSSProperties = {
                transform: `translate(-50%, -50%) translateX(${parked * spread}%) scale(${scale}) rotateY(${
                  offset === 0 ? 0 : offset > 0 ? -38 : 38
                }deg)`,
                opacity: hidden ? 0 : offset === 0 ? 1 : 0.34 - (abs - 1) * 0.14,
                // NOTE: no blur filter here on purpose — blurring an element while it is
                // being transformed forces a re-rasterise every frame (100ms frames).
                // Depth now comes from scale + rotateY + opacity + the scrim overlay.
                zIndex: 100 - abs,
                pointerEvents: hidden ? 'none' : 'auto',
                // parked cards are skipped by the compositor entirely
                visibility: hidden ? 'hidden' : 'visible',
                willChange: hidden ? 'auto' : 'transform, opacity'
              };

              return (
                <div
                  key={item.id}
                  className={offset === 0 ? 'cf-card cf-card-active' : 'cf-card cf-card-side'}
                  style={style}
                  onClick={() => (offset === 0 ? setLightbox(item) : select(i))}
                  aria-hidden={offset !== 0}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                  {offset !== 0 && <span className="cf-card-scrim" aria-hidden="true" />}
                  {offset === 0 && (
                    <span className="cf-card-zoom" aria-hidden="true">
                      <Maximize2 size={16} />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Arrows */}
          <button className="cf-arrow cf-arrow-left" onClick={() => go(-1)} aria-label="Previous slide">
            <ChevronLeft size={22} />
          </button>
          <button className="cf-arrow cf-arrow-right" onClick={() => go(1)} aria-label="Next slide">
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Caption + progress */}
        <div className="cf-caption">
          <AnimatePresence mode="wait">
            <motion.h3
              key={active?.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="cf-caption-title"
            >
              {active?.title}
            </motion.h3>
          </AnimatePresence>
          <span className="cf-caption-count">
            {String(index + 1).padStart(2, '0')} <span>/ {String(count).padStart(2, '0')}</span>
          </span>
        </div>

        {/* Dots */}
        <div
          className="cf-dots"
          onPointerEnter={onStageEnter}
          onPointerLeave={onStageLeave}
        >
          {items.map((item, i) => (
            <button
              key={item.id}
              className={i === index ? 'cf-dot cf-dot-active' : 'cf-dot'}
              onClick={() => select(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox — portalled to <body> so it sits above the fixed navbar */}
      {createPortal(
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="cf-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            >
              <button className="cf-lightbox-close" aria-label="Close" onClick={() => setLightbox(null)}>
                <X size={22} />
              </button>
              <motion.figure
                className="cf-lightbox-inner"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={lightbox.image} alt={lightbox.title} />
                <figcaption>{lightbox.title}</figcaption>
              </motion.figure>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
