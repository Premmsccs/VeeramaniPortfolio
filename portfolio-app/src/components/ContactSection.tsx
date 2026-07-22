import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';

/* Free at emailjs.com — connect your Gmail as a Service, build a Template, grab these three IDs */
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

const EMPTY_FORM = { name: '', email: '', projectType: 'Job Opportunity', message: '' };

type Status = 'idle' | 'sending' | 'success' | 'error';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    if (status === 'sending') return;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus('error');
      setErrorMsg('The contact form is not connected yet (missing EmailJS keys).');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          reason: formData.projectType,
          message: formData.message
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setStatus('success');
      setTimeout(() => {
        setFormData(EMPTY_FORM);
        setStatus('idle');
      }, 8000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong while sending.');
    }
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
            <span>Get In Touch</span>
          </div>
          <h2 className="section-head-title">
            Let's Connect
          </h2>
          <p className="section-head-subtitle">
            Open to full-time roles, freelance projects, and design collaborations. Send a message and I'll get back to you soon.
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
            <h3 className="contact-details-title">Contact Details</h3>
            <p className="contact-details-lead">
              Reach out via email or phone — happy to share my portfolio, resume, or discuss any opportunity.
            </p>

            <div className="contact-links-list">

              <motion.a whileHover={{ x: 4 }} href={`mailto:${PERSONAL_INFO.email}`} className="contact-link-card cursor-interactive">
                <div className="contact-link-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-link-info">
                  <span className="contact-link-lbl">Email</span>
                  <span className="contact-link-val">{PERSONAL_INFO.email}</span>
                </div>
              </motion.a>

              <motion.a whileHover={{ x: 4 }} href={`tel:${PERSONAL_INFO.phone}`} className="contact-link-card cursor-interactive">
                <div className="contact-link-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-link-info">
                  <span className="contact-link-lbl">Phone / WhatsApp</span>
                  <span className="contact-link-val">{PERSONAL_INFO.phone}</span>
                </div>
              </motion.a>

              <div className="contact-link-card" style={{ cursor: 'default' }}>
                <div className="contact-link-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-link-info">
                  <span className="contact-link-lbl">Location</span>
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
              <h3 className="contact-form-title">Send a Message</h3>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-gold)' }}>⚡ Quick Reply</span>
            </div>

            {status === 'success' ? (
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
                <h4 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)' }}>Message Sent!</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Thanks, <strong>{formData.name || 'there'}</strong>! Your message has landed in the inbox and you'll hear back at <strong>{formData.email}</strong> soon. For anything urgent, call{' '}
                  <a href={`tel:${PERSONAL_INFO.phone}`} style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{PERSONAL_INFO.phone}</a>.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Reason for Contact</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="form-select"
                  >
                    <option value="Job Opportunity">Job Opportunity</option>
                    <option value="Freelance Project">Freelance Project</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me a bit about the role, project, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      background: 'rgba(248, 113, 113, 0.08)',
                      border: '1px solid rgba(248, 113, 113, 0.4)',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      marginBottom: '4px'
                    }}
                  >
                    <AlertTriangle size={18} color="#f87171" style={{ flexShrink: 0, marginTop: '1px' }} />
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Couldn't send your message ({errorMsg}). Please call{' '}
                      <a href={`tel:${PERSONAL_INFO.phone}`} style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>
                        {PERSONAL_INFO.phone}
                      </a> instead.
                    </span>
                  </motion.div>
                )}

                <MagneticButton
                  type="submit"
                  className="btn-primary"
                  disabled={status === 'sending'}
                  style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                >
                  {status === 'sending' ? (
                    <>
                      <span>Sending…</span>
                      <Loader2 size={16} color="#0a0a0a" className="spin-loader" />
                    </>
                  ) : (
                    <>
                      <span>{status === 'error' ? 'Retry Sending' : 'Send Message'}</span>
                      <Send size={16} color="#0a0a0a" />
                    </>
                  )}
                </MagneticButton>

                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '12px', opacity: 0.75 }}>
                  Sends directly — usually a reply within 24 hours.
                </p>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
