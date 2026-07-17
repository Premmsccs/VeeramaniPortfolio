import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="pm-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="pm-panel"
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="pm-close" aria-label="Close" onClick={onClose}>
              <X size={20} />
            </button>

            <div className="pm-media">
              <img src={project.image} alt={project.title} />
              <span className="pm-media-tag">{project.category}</span>
            </div>

            <div className="pm-body">
              {project.client && <span className="pm-client">{project.client}</span>}
              <h3 className="pm-title">{project.title}</h3>

              {project.metrics && (
                <div className="pm-metric">
                  <Sparkles size={15} color="var(--accent-gold)" />
                  <span>{project.metrics}</span>
                </div>
              )}

              <p className="pm-desc">{project.description}</p>

              {project.highlights?.length > 0 && (
                <div className="pm-highlights">
                  <h4 className="pm-highlights-title">Key Highlights</h4>
                  <ul>
                    {project.highlights.map((h, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} color="var(--accent-gold)" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pm-tags">
                {project.tags.map((t) => (
                  <span key={t} className="pm-tag">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
