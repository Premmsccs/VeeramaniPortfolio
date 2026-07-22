import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle } from 'lucide-react';

export const CustomerFeedback: React.FC = () => {
  // Use the images exactly as provided. 
  // Please place the screenshots in the public/assets/feedback folder with these names.
  const feedbackImages = [
    '/assets/feedback/image1.png',
    '/assets/feedback/image2.png',
    '/assets/feedback/image3.png',
    '/assets/feedback/image4.png',
    '/assets/feedback/image5.png',
  ];

  // Duplicate the array to create a seamless infinite loop
  const duplicatedImages = [...feedbackImages, ...feedbackImages];

  return (
    <section id="feedback" className="feedback-section">
      <div className="container-max">
        
        <div className="section-head">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-head-title">Global Client <span>Feedback</span></h2>
            <p className="section-head-subtitle">
              Verified reviews and 5-star ratings from professionals worldwide who have transformed their presentations.
            </p>
          </motion.div>
        </div>

        {/* Infinite Scrolling Marquee */}
        <div className="feedback-marquee-container">
          <motion.div 
            className="feedback-marquee-track"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 35,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {duplicatedImages.map((src, idx) => (
              <div key={idx} className="feedback-img-wrapper glass-card">
                {/* Fallback styling just in case image is missing while setting up */}
                <div className="feedback-placeholder-icon">
                  <MessageCircle size={24} color="var(--accent-gold)" />
                </div>
                <img 
                  src={src} 
                  alt={`Customer Feedback ${idx + 1}`} 
                  className="feedback-img" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '0';
                  }}
                  onLoad={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '1';
                  }}
                />
                <div className="feedback-glass-overlay">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
                    ))}
                  </div>
                  <span>Verified Review</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
