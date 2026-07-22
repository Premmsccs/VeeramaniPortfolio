import React, { useState } from 'react';
import { Eye, ArrowUpRight, Layers, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROJECTS_DATA, type Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

// Grouped by category — every "presentation" together, every "redesign" together, etc.
const CATEGORY_ORDER: Project['category'][] = ['presentation', 'redesign', 'infographic', 'dashboard', 'poster'];
const GROUPED_PROJECTS = [...PROJECTS_DATA].sort(
  (a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)
);

// Duplicated once so the CSS marquee can loop seamlessly at -50%.
const MARQUEE_ITEMS = [...GROUPED_PROJECTS, ...GROUPED_PROJECTS];

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

        {/* Continuous, order-wise auto-scrolling marquee */}
        <div className="cs-marquee">
          <div className="cs-marquee-track">
            {MARQUEE_ITEMS.map((project, i) => (
              <div
                className="cs-marquee-card project-card cursor-interactive"
                key={`${project.id}-${i}`}
                aria-hidden={i >= GROUPED_PROJECTS.length}
                onClick={() => setActiveModalProject(project)}
              >
                <div className="cs-mockup">
                  <div className="cs-mockup-bar">
                    <span className="cs-mockup-dots">
                      <span /><span /><span />
                    </span>
                    <Menu size={13} color="var(--text-muted)" />
                  </div>
                  <div className="project-image-box">
                    <img src={project.image} alt={project.title} draggable={false} />
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
              </div>
            ))}
          </div>
        </div>

        {/* Project Inspection Modal */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />

      </div>
    </section>
  );
};
