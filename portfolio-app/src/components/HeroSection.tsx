import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Eye, CheckCircle, Award, Sparkles, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { motion, AnimatePresence, type Variants, useMotionValue, useSpring } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';
import { MagneticButton } from './MagneticButton';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    'Executive Presentation Architect',
    'Series-A / IPO Pitch Deck Master',
    'Infographic & Data Storyteller',
    'AI Video & Slide Specialist'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleRedesignClick = () => {
    const el = document.getElementById('redesign');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  /* --- 3D Tilt for Profile Card --- */
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 14);
    rotateX.set(py * -14);
  };

  const handleCardLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section id="about" className="hero-section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-max hero-grid"
      >

        {/* Left: Bio & Value Prop */}
        <div className="hero-info">

          <motion.div variants={itemVariants} className="hero-role-pill">
            <Award size={16} color="var(--accent-gold)" />
            <span>Top Presentation Designer • SlideEgg Promoted Specialist</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero-heading">
            Transforming Complex Data Into <span>Audience-Ready</span> Executive Slide Decks.
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-lead">
            I am <strong>VEERAMANI K</strong>, an award-winning Presentation Architect with <strong>1.7+ years of dedicated full-time experience</strong> building high-stakes corporate pitch decks, financial overviews, and strategic timelines for global enterprises. Master of <strong>100% Native PowerPoint Shapes, Adobe Illustrator, Canva Pro, and AI Storyboarding</strong>.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-bullet-list">
            <div className="hero-bullet">
              <CheckCircle size={16} />
              <span>100% Editable Native PPT Shapes</span>
            </div>
            <div className="hero-bullet">
              <ShieldCheck size={16} />
              <span>Strict NDA & 24hr Rapid Delivery</span>
            </div>
            <div className="hero-bullet">
              <FileSpreadsheet size={16} />
              <span>Dynamic Excel-Linked Charts</span>
            </div>
            <div className="hero-bullet">
              <Sparkles size={16} />
              <span>Anthropic Claude Certified Specialist</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-btn-group">
            <MagneticButton onClick={onExploreClick} className="btn-primary">
              <span>Explore Master Case Studies</span>
              <ArrowRight size={16} color="#0a0a0a" />
            </MagneticButton>

            <MagneticButton onClick={handleRedesignClick} className="btn-secondary">
              <Eye size={16} />
              <span>Before / After Redesign Suite</span>
            </MagneticButton>
          </motion.div>

          {/* Key Metrics Grid */}
          <motion.div variants={itemVariants} className="hero-stats">
            <motion.div whileHover={{ y: -4 }} className="hero-stat-card">
              <AnimatedCounter value="1500+" className="hero-stat-num" />
              <span className="hero-stat-lbl">Presentations Delivered</span>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} className="hero-stat-card">
              <AnimatedCounter value="100+" className="hero-stat-num" />
              <span className="hero-stat-lbl">Executive Redesigns</span>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} className="hero-stat-card">
              <AnimatedCounter value="99%" className="hero-stat-num" />
              <span className="hero-stat-lbl">Global Client Retention</span>
            </motion.div>
          </motion.div>

        </div>

        {/* Right: Profile Card & Photo */}
        <motion.div
          variants={itemVariants}
          className="hero-profile-area"
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleCardMove}
            onMouseLeave={handleCardLeave}
            style={{ rotateX: springRotateX, rotateY: springRotateY }}
            className="profile-card tilt-card"
          >

            {/* Real portrait photo extracted from PPTX assets */}
            <div className="profile-img-frame">
              <img
                src="/assets/profile.png"
                alt="Veeramani K - Executive PowerPoint Designer"
                className="profile-image"
              />
            </div>

            <div className="profile-name">Veeramani K</div>
            <div className="profile-title">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  style={{ display: 'inline-block' }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="profile-meta-grid">
              <div className="profile-meta-item">
                <span>📍 Chennai, India</span>
              </div>
              <div className="profile-meta-item">
                <span>⚡ Intern to Promoted Specialist</span>
              </div>
            </div>

            {/* Endorsement Card */}
            <div className="profile-quote-card">
              <div>
                <span className="profile-quote-stars">★★★★★</span>
                <p style={{ marginTop: '4px', fontStyle: 'italic', color: '#c9c9d2' }}>
                  "Flawless visual hierarchy, extreme precision, and unmatched turnaround speed."
                </p>
              </div>
            </div>

          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
};
