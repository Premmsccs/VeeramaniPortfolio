import React, { useState } from 'react';
import { Eye, ArrowUpRight, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA, type Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const PortfolioShowcase: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  return (
    <section id="case-studies" className="portfolio-section">
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
            <Layers size={16} color="var(--accent-gold)" />
            <span>Selected Case Studies</span>
          </div>
          <h2 className="section-head-title">
            Featured Executive Case Studies
          </h2>
          <p className="section-head-subtitle">
            A closer look at high-stakes projects — the brief, the approach, and the measurable
            impact. Click any card to inspect the full case study.
          </p>
        </motion.div>

        {/* Projects Grid with AnimatePresence */}
        <motion.div
          layout
          className="portfolio-grid"
        >
          <AnimatePresence>
            {PROJECTS_DATA.map((project: Project, idx: number) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, delay: (idx % 6) * 0.06, ease: 'easeOut' }}
                whileHover={{ y: -8 }}
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                className="project-card cursor-interactive"
              >
                <div className="project-image-box">
                  <img
                    src={project.image}
                    alt={project.title}
                  />
                  <div className="project-image-overlay">
                    <span className="overlay-btn">
                      <Eye size={16} color="#0a0a0a" />
                      <span>Inspect Slide Deck</span>
                    </span>
                  </div>
                  <div className="project-image-tag">
                    {project.category}
                  </div>
                </div>

                <div className="project-info-box">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="project-client">{project.client}</span>
                    <ArrowUpRight size={16} color="var(--accent-gold)" />
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{project.description}</p>

                  <div className="project-footer">
                    <span className="project-tag-box">
                      Tags: <span>{project.tags.slice(0, 2).join(', ')}</span>
                    </span>
                    <span className="project-impact-badge">
                      {project.metrics || 'Top Impact'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Inspection Modal */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />

      </div>
    </section>
  );
};
