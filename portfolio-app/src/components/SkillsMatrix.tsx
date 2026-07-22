import React, { useEffect, useRef, useState } from 'react';
import { Award, CheckCircle, Zap, Shield, Clock, Layers, Flame } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { SKILLS_DATA } from '../data/portfolioData';

// Counts up from 0 to the skill's level once the card scrolls into view —
// synced to the same duration/delay as the ring stroke animation.
const CountUpPct: React.FC<{ value: number; delay: number }> = ({ value, delay }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTimer = window.setTimeout(() => {
      const duration = 1100;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay * 1000);
    return () => window.clearTimeout(startTimer);
  }, [inView, value, delay]);

  return <span ref={ref}>{display}</span>;
};

export const SkillsMatrix: React.FC = () => {
  const whyChooseReasons = [
    {
      icon: <Zap size={22} />,
      title: 'Rapid 24-Hour Executive Turnaround',
      description: 'Strict adherence to global enterprise deadlines with real-time progress updates and immediate milestone delivery.'
    },
    {
      icon: <Shield size={22} />,
      title: 'Strict Enterprise NDA & Data Privacy',
      description: 'Accustomed to handling confidential Series-A financial models, M&A pitch decks, and internal board presentations.'
    },
    {
      icon: <Layers size={22} />,
      title: '100% Native Vector Shapes & Master Setup',
      description: 'Zero un-editable PNG/JPEG slide dumps. Every shape, infographic, and chart is fully editable inside native PowerPoint.'
    },
    {
      icon: <Clock size={22} />,
      title: '1,500+ Presentations Delivered at SlideEgg',
      description: 'Promoted from Intern to Presentation Specialist through proven volume handling and 99% first-attempt client sign-offs.'
    }
  ];

  const toolNames = SKILLS_DATA.filter((s) => s.category === 'tools').map((s) => s.name);

  return (
    <section id="skills" className="skills-section">
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
            <Award size={16} color="var(--accent-gold)" />
            <span>Core Technical Competencies</span>
          </div>
          <h2 className="section-head-title">
            Software Mastery & Why Clients Hire Me
          </h2>
          <p className="section-head-subtitle">
            Combining deep technical proficiency in industry-standard design tools with executive communication discipline to ensure high-impact results every time.
          </p>
        </motion.div>

        {/* 2-Column Matrix */}
        <div className="skills-grid">

          {/* Left Col: Skill Bars */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="skills-col-title">
              <CheckCircle size={20} color="var(--accent-gold)" />
              <span>Design & Storyboarding Mastery</span>
            </h3>

            {/* Shared gradient for every gauge stroke */}
            <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
              <defs>
                <linearGradient id="skillGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-gold)" />
                  <stop offset="100%" stopColor="var(--accent-violet)" />
                </linearGradient>
              </defs>
            </svg>

            <div className="skills-rings">
              {(() => {
                const coreSkills = SKILLS_DATA.filter((s) => s.category === 'core');
                const topLevel = Math.max(...coreSkills.map((s) => s.level));
                const R = 52;
                const C = 2 * Math.PI * R;
                return coreSkills.map((skill, idx) => {
                  const isTop = skill.level === topLevel;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      whileHover={{ y: -6 }}
                      className={isTop ? 'skill-ring-card is-top' : 'skill-ring-card'}
                    >
                      {isTop && (
                        <span className="skill-ring-badge">
                          <Flame size={11} />
                          Top Skill
                        </span>
                      )}
                      <div className="skill-ring-wrap">
                        <svg viewBox="0 0 120 120" className="skill-ring">
                          <circle className="skill-ring-track" cx="60" cy="60" r={R} />
                          <motion.circle
                            className="skill-ring-bar"
                            cx="60"
                            cy="60"
                            r={R}
                            strokeDasharray={C}
                            initial={{ strokeDashoffset: C }}
                            whileInView={{ strokeDashoffset: C - (C * skill.level) / 100 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, delay: idx * 0.08, ease: 'easeOut' }}
                          />
                        </svg>
                        <span className="skill-ring-pct">
                          <CountUpPct value={skill.level} delay={idx * 0.08} />
                          <small>%</small>
                        </span>
                      </div>
                      <span className="skill-ring-name">{skill.name}</span>
                    </motion.div>
                  );
                });
              })()}
            </div>
          </motion.div>

          {/* Right Col: Why Choose Reasons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="skills-col-title">
              <Award size={20} color="var(--accent-gold)" />
              <span>Executive Delivery Standards</span>
            </h3>

            <div className="why-choose-list">
              {whyChooseReasons.map((reason, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  key={idx}
                  className="why-choose-item"
                >
                  <div className="why-choose-icon-box">
                    {reason.icon}
                  </div>
                  <div className="why-choose-content">
                    <h4 className="why-choose-title">{reason.title}</h4>
                    <p className="why-choose-desc">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Tools & Software */}
        <div className="tools-row">
          {toolNames.map((name) => {
             let logoUrl = '';
             if (name.includes('PowerPoint')) logoUrl = '/assets/tools/powerpoint.png';
             else if (name.includes('Illustrator')) logoUrl = '/assets/tools/illustrator.png';
             else if (name.includes('Canva')) logoUrl = '/assets/tools/canva.png';
             else if (name.includes('Photoshop')) logoUrl = '/assets/tools/photoshop.png';
             else if (name.includes('Google Slides')) logoUrl = '/assets/tools/google-slides.png';
             else if (name.includes('Claude AI')) logoUrl = '/assets/tools/claude-ai.svg';

             return (
               <span key={name} className="tool-chip">
                 {logoUrl ? (
                   <img src={logoUrl} alt={`${name} logo`} style={{ width: 18, height: 18, objectFit: 'contain' }} />
                 ) : (
                   <CheckCircle size={16} color="var(--accent-gold)" />
                 )}
                 {name}
               </span>
             );
          })}
        </div>

      </div>
    </section>
  );
};
