import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CustomerFeedback } from './components/CustomerFeedback';
import { BeforeAfterSuite } from './components/BeforeAfterSuite';
import { CoverflowGallery } from './components/CoverflowGallery';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { AnimatedBackground } from './components/AnimatedBackground';
import { AnimeJsBackground } from './components/AnimeJsBackground';
import { ScrollProgress } from './components/ScrollProgress';
import { VeeraAssistant } from './components/VeeraAssistant';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUp } from 'lucide-react';
import './App.css';

export const App: React.FC = () => {
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    // Wait a tick for the section to exist in the DOM before jumping to it —
    // on a fresh page load the browser's native hash-scroll fires before
    // React has rendered anything, so it silently does nothing.
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreClick = () => {
    const el = document.getElementById('showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Ambient Aurora Background System */}
      <AnimatedBackground />
      <AnimeJsBackground />

      {/* Scroll Depth Indicator */}
      <ScrollProgress />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <HeroSection onExploreClick={handleExploreClick} />
        <BeforeAfterSuite />
        <CoverflowGallery />
        <PortfolioShowcase />
        <CustomerFeedback />
        <SkillsMatrix />
        <ExperienceTimeline />
        <ContactSection />
      </main>

      {/* Animated AI Portfolio Assistant (Gemini-powered) */}
      <VeeraAssistant />

      {/* Footer */}
      <footer className="footer">
        <div className="container-max footer-inner">

          <div className="footer-brand">
            <div className="footer-brand-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>VEERAMANI K</span>
              <Sparkles size={16} color="var(--accent-gold)" />
            </div>
            <p className="footer-brand-desc">
              Senior PowerPoint Presentation Designer & AI Video Creative Architect • Chennai, India
            </p>
          </div>

          <div className="footer-meta">
            <div>
              Built with high-end React & Vanilla CSS for maximum recruiter impact
            </div>
            <div style={{ fontWeight: 600, marginTop: '4px' }}>
              © {new Date().getFullYear()} Veeramani K. All Rights Reserved. Fully Editable Master Assets.
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="btn-secondary cursor-interactive"
            style={{ padding: '12px' }}
          >
            <ArrowUp size={18} />
          </motion.button>

        </div>
      </footer>
    </div>
  );
};

export default App;
