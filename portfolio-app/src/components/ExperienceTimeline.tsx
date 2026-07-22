import React, { useState } from 'react';
import { Briefcase, Award, CheckCircle2, GraduationCap, BadgeCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCE_DATA, CERTIFICATIONS_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<{ pdfUrl: string, orientation?: string } | null>(null);

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

        {/* Certifications Section */}
        <div style={{ marginTop: '40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '24px' }}
          >
            <h3 className="credentials-title" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px' }}>
              <Award size={24} color="var(--accent-gold)" />
              <span>Verified Industry Certifications</span>
            </h3>
          </motion.div>

          <div className="certifications-grid">
            {CERTIFICATIONS_DATA.map((cert, idx) => (
              <motion.div
                key={idx}
                onClick={() => setSelectedCert(cert)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="credential-item"
                style={{ cursor: 'pointer' }}
                whileHover={{ scale: 1.02, translateY: -4 }}
              >
                <div className="credential-info">
                  <span className="credential-name">{cert.name}</span>
                  <span className="credential-meta">{cert.issuer} • {cert.date}</span>
                </div>
                <span className="credential-badge">
                  <BadgeCheck size={13} />
                  Verified
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Formal Education Section */}
        <div style={{ marginTop: '40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '24px' }}
          >
            <h3 className="credentials-title" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px' }}>
              <GraduationCap size={24} color="var(--accent-gold)" />
              <span>Academic Foundation</span>
            </h3>
          </motion.div>

          <div className="education-grid">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="credential-item"
                style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
                  <span className="credential-name" style={{ fontSize: '17px' }}>{edu.degree}</span>
                  <span className="credential-badge" style={{ background: 'var(--bg-surface-strong)', color: 'var(--text-primary)', marginTop: '2px' }}>{edu.period}</span>
                </div>
                <span className="credential-meta" style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>{edu.institution}</span>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '4px' }}>{edu.details}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cert-modal-overlay"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className={`cert-modal-content ${selectedCert.orientation === 'portrait' ? 'cert-portrait' : 'cert-landscape'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '12px', zIndex: 10 }}>
                <a 
                  href={selectedCert.pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cert-modal-action-btn"
                  title="Open in New Tab"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
                <button className="cert-modal-action-btn" onClick={() => setSelectedCert(null)} title="Close">
                  <X size={24} />
                </button>
              </div>
              {selectedCert.pdfUrl.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                <img 
                  src={selectedCert.pdfUrl} 
                  alt="Certificate Viewer" 
                  className="cert-modal-iframe" 
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <iframe 
                  src={`${selectedCert.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} 
                  title="Certificate Viewer" 
                  className="cert-modal-iframe" 
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
