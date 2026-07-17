import React from 'react';
import { Briefcase, Award, CheckCircle2, GraduationCap, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { EXPERIENCE_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const certifications = [
    { name: 'Anthropic Claude AI Certified Presentation Specialist', issuer: 'Anthropic / Corporate Track', year: '2025', badge: 'Certified Specialist' },
    { name: 'TCS iON Career Edge - Young Professional', issuer: 'Tata Consultancy Services', year: '2024', badge: 'Distinction' },
    { name: 'Advanced PowerPoint & Slide Master Architecture', issuer: 'SlideEgg Internal Academy', year: '2024', badge: 'Level 3 Expert' },
    { name: 'Professional Graphic Design & Typography', issuer: 'Canva Design Institute', year: '2023', badge: 'Verified' }
  ];

  const education = [
    { degree: 'Bachelor of Business Administration (BBA)', institution: 'University of Madras / Equivalent Corporate Studies', period: '2021 – 2024', details: 'Specialized in Business Communication, Strategic Marketing, and Corporate Presentation Storyboarding.' },
    { degree: 'Diploma in Mechanical Engineering (DME)', institution: 'State Board of Technical Education', period: '2018 – 2021', details: 'Focused on Precision Engineering Drawing, CAD Vector Modeling, and Technical Infographics.' }
  ];

  return (
    <section id="experience" className="experience-section">
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
            <Briefcase size={16} color="var(--accent-gold)" />
            <span>Professional Career Path</span>
          </div>
          <h2 className="section-head-title">
            1.7+ Years of Dedicated Presentation Excellence
          </h2>
          <p className="section-head-subtitle">
            A proven track record of career progression at SlideEgg, backed by recognized corporate certifications and formal business administration education.
          </p>
        </motion.div>

        {/* Work Timeline */}
        <div className="experience-timeline">
          {EXPERIENCE_DATA.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ scale: 1.01 }}
              className="experience-card"
              style={{ position: 'relative' }}
            >
              <span className="experience-timeline-dot" />
              <div className="experience-card-header">
                <div className="experience-meta-row">
                  <h3 className="experience-role">{item.role}</h3>
                  <span className="experience-date">{item.period}</span>
                </div>
                <div className="experience-company-row">
                  <span className="experience-company">{item.company}</span>
                  <span className="experience-location">📍 Chennai, India</span>
                </div>
              </div>

              <p className="experience-desc">{item.achievements[0]}</p>

              <div className="experience-highlights-grid">
                {item.achievements.slice(1).map((ach, achIdx) => (
                  <div key={achIdx} className="experience-bullet">
                    <CheckCircle2 size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Credentials & Education 2-Column Grid */}
        <div className="credentials-wrapper">

          {/* Left: Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="credentials-col"
          >
            <h3 className="credentials-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={20} color="var(--accent-gold)" />
              <span>Verified Industry Certifications</span>
            </h3>

            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="credential-item"
              >
                <div className="credential-info">
                  <span className="credential-name">{cert.name}</span>
                  <span className="credential-meta">{cert.issuer} • {cert.year}</span>
                </div>
                <span className="credential-badge">
                  <BadgeCheck size={13} />
                  {cert.badge}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Formal Education */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="credentials-col"
          >
            <h3 className="credentials-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GraduationCap size={20} color="var(--accent-gold)" />
              <span>Academic Foundation</span>
            </h3>

            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="credential-item"
                style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <span className="credential-name">{edu.degree}</span>
                  <span className="credential-badge" style={{ background: 'var(--bg-surface-strong)', color: 'var(--text-primary)' }}>{edu.period}</span>
                </div>
                <span className="credential-meta" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{edu.institution}</span>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '2px' }}>{edu.details}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
