import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', projectType: 'SaaS Pitch Deck', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', projectType: 'SaaS Pitch Deck', message: '' });
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="contact-section">
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
            <MessageSquare size={16} color="var(--accent-gold)" />
            <span>Direct Executive Booking</span>
          </div>
          <h2 className="section-head-title">
            Let's Build Your Next High-Stakes Presentation
          </h2>
          <p className="section-head-subtitle">
            Available immediately for full-time corporate roles, contractual agency retainers, and high-priority Series-A / investor pitch deck transformations.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="contact-grid">

          {/* Left: Contact Info & Direct Links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="contact-details-card"
          >
            <h3 className="contact-details-title">Direct Contact Channel</h3>
            <p className="contact-details-lead">
              Reach out via email or phone for immediate pricing estimates, NDA execution, or to request custom sample slides tailored to your brand.
            </p>

            <div className="contact-links-list">

              <motion.a whileHover={{ x: 4 }} href={`mailto:${PERSONAL_INFO.email}`} className="contact-link-card cursor-interactive">
                <div className="contact-link-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-link-info">
                  <span className="contact-link-lbl">Primary Email (24/7 Response)</span>
                  <span className="contact-link-val">{PERSONAL_INFO.email}</span>
                </div>
              </motion.a>

              <motion.a whileHover={{ x: 4 }} href={`tel:${PERSONAL_INFO.phone}`} className="contact-link-card cursor-interactive">
                <div className="contact-link-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-link-info">
                  <span className="contact-link-lbl">Phone & WhatsApp Direct</span>
                  <span className="contact-link-val">{PERSONAL_INFO.phone}</span>
                </div>
              </motion.a>

              <div className="contact-link-card" style={{ cursor: 'default' }}>
                <div className="contact-link-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-link-info">
                  <span className="contact-link-lbl">Location & Work Setup</span>
                  <span className="contact-link-val">Chennai, Tamil Nadu, India • Remote & On-Site</span>
                </div>
              </div>

            </div>

            {/* Social Buttons */}
            <div className="contact-social-grid">
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="contact-social-btn cursor-interactive">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>LinkedIn Profile</span>
              </a>
              <a href={PERSONAL_INFO.behance} target="_blank" rel="noreferrer" className="contact-social-btn cursor-interactive">
                <Globe size={16} />
                <span>Behance Portfolio</span>
              </a>
            </div>
          </motion.div>

          {/* Right: Consultation Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="contact-form-card"
          >
            <div className="contact-form-header">
              <h3 className="contact-form-title">Consultation & Project Inquiry</h3>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-gold)' }}>⚡ Fast Turnaround</span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'rgba(52, 211, 153, 0.08)',
                  border: '1px solid var(--accent-emerald)',
                  borderRadius: '20px',
                  padding: '36px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                >
                  <CheckCircle size={48} color="#34d399" />
                </motion.div>
                <h4 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)' }}>Inquiry Received Successfully!</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Thank you for reaching out, <strong>{formData.name || 'Executive Client'}</strong>. Veeramani has received your project briefing and will get back to you within 2 hours with a preliminary timeline and deck structure.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Full Name / Executive Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins (VP Marketing)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Corporate Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="s.jenkins@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Presentation Requirement Category</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="form-select"
                  >
                    <option value="SaaS Pitch Deck">Series-A / IPO SaaS Pitch Deck</option>
                    <option value="Corporate Profile">Executive Board Overview / Annual Report</option>
                    <option value="Infographic Redesign">High-Density Infographic & Financial Model</option>
                    <option value="Full Time Hiring">Full-Time / Contractual Senior Designer Role</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">Project Briefing & Slide Count *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your deck objectives, slide count (e.g. 15 slides), and desired completion deadline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                >
                  <span>Submit Executive Briefing</span>
                  <Send size={16} color="#0a0a0a" />
                </MagneticButton>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
