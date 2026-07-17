import React, { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = PERSONAL_INFO.resumeUrl;
    link.download = 'Veeramani_K_Presentation_Designer_Resume.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Slide Redesign', href: '#redesign' },
    { name: 'Portfolio Gallery', href: '#showcase' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Skills & Tools', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={scrolled ? 'navbar navbar-scrolled' : 'navbar'}
    >
      <div className="container-max navbar-inner">

        {/* Brand */}
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="logo-box cursor-interactive">
          <div className="brand-info">
            <div className="brand-text">
              VEERAMANI <span>K</span>
            </div>
            <div className="brand-subtitle">
              Presentation Architect
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="nav-menu">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link cursor-interactive">
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions & Resume Button */}
        <div className="navbar-actions">
          <div className="availability-badge">
            <span className="pulse-dot" />
            <span>Immediate Hire Availability</span>
          </div>

          <MagneticButton onClick={handleResumeDownload} className="btn-primary">
            <Download size={16} color="#0a0a0a" />
            <span>Resume</span>
          </MagneticButton>

          <ThemeToggle />

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="menu-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mobile-dropdown"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-dropdown-link"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
};
