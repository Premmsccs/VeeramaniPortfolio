import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, RotateCcw } from 'lucide-react';
import {
  PERSONAL_INFO,
  SKILLS_DATA,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
  GALLERY_DATA
} from '../data/portfolioData';

type Role = 'user' | 'model';
interface Msg { role: Role; text: string; }

const API_KEY = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
const MODEL = 'llama-3.3-70b-versatile';
const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

/* Build a compact knowledge base from the portfolio data so the bot stays on-message */
const KNOWLEDGE = `
You are "Veera AI" — the friendly, professional virtual assistant on the portfolio website of ${PERSONAL_INFO.name}.
Speak warmly and concisely (2-4 sentences unless asked for detail). Encourage recruiters to reach out or download the resume.
Only answer using the facts below; if you don't know, say so and point them to the contact section. Never invent contact details.

UNDERSTANDING THE VISITOR (very important):
- Recruiters and visitors may type with heavy spelling mistakes, broken English, missing letters, wrong grammar, or mixed Tamil + English (Tanglish), e.g. "wat skil he hav", "veeramani experiance how much", "he availble ah?", "ppt design pannuvaara".
- ALWAYS interpret their intent charitably and answer accurately from the facts. Silently correct typos in your head.
- NEVER reply that you can't understand, and never ask them to fix their spelling. If truly ambiguous, make your best guess and answer, then offer a gentle clarification.
- Match a friendly professional tone in clear English regardless of how the question was typed.

ABOUT: ${PERSONAL_INFO.summary}
ROLE: ${PERSONAL_INFO.title}
LOCATION: ${PERSONAL_INFO.location} | AVAILABILITY: ${PERSONAL_INFO.availability}
CONTACT: email ${PERSONAL_INFO.email}, phone ${PERSONAL_INFO.phone}, LinkedIn ${PERSONAL_INFO.linkedin}, Behance ${PERSONAL_INFO.behance}.

KEY STATS: ${PERSONAL_INFO.stats.map((s) => `${s.value} ${s.label}`).join('; ')}.

TOP SKILLS: ${SKILLS_DATA.filter((s) => s.category === 'core').map((s) => `${s.name} (${s.level}%)`).join(', ')}.
TOOLS: ${SKILLS_DATA.filter((s) => s.category === 'tools').map((s) => s.name).join(', ')}.

EXPERIENCE: ${EXPERIENCE_DATA.map((e) => `${e.role} at ${e.company} (${e.period})`).join(' | ')}.
EDUCATION: ${EDUCATION_DATA.map((e) => `${e.degree}, ${e.institution}`).join(' | ')}.
CERTIFICATIONS: ${CERTIFICATIONS_DATA.map((c) => `${c.name} (${c.issuer})`).join(' | ')}.

PORTFOLIO: ${GALLERY_DATA.length} sample slides across Presentations, Infographics and Dashboards, plus featured case studies.

=== FULL RESUME (authoritative source — prefer these exact details) ===
VEERAMANI K — PowerPoint Presentation Designer | Creative Designer
Contact: veeramani2252001@gmail.com | +91 6382062964 | Chennai, India | linkedin.com/in/veeramani-k-8736a4308 | Portfolio: behance.net/veeramanik2

PROFESSIONAL SUMMARY:
Results-driven PowerPoint Presentation Designer with 1+ year of professional experience creating visually compelling, brand-consistent presentations for global clients. Proven expertise in pitch decks, business plans, dashboards, and data visualization. Adept at transforming complex ideas into clear, audience-ready visual stories using Microsoft PowerPoint, Adobe Illustrator, and Canva. Strong foundation in visual storytelling, typography, and infographic design. Actively pursuing continuous learning, including certifications in Presentation Skills (TCS iON) and Claude AI (Anthropic).

CORE COMPETENCIES:
- Presentation Design: Pitch Decks, Business Plan Presentations, Corporate Profiles, Dashboards, Infographics
- Design Principles: Visual Storytelling, Typography, Brand Consistency, Color Theory, Layout Composition
- Tools & Software: Microsoft PowerPoint, Adobe Photoshop, Adobe Illustrator, Canva, Google Slides
- Soft Skills: Communication, Self-Motivation, Meeting Deadlines, Client Collaboration

PROFESSIONAL EXPERIENCE:
1) PowerPoint Presentation Designer — SlideEgg (Deckzi Solutions Pvt. Ltd.) | Feb 2025–Present
   - Designed professional presentation slides including business plans, corporate pitch decks, marketing dashboards, and infographic-rich data visualization slides.
   - Created clean, visually consistent layouts that improved audience engagement and communication clarity for global clients.
   - Delivered fully editable, high-quality presentation templates deployed on SlideEgg's content platform, contributing to SEO-driven traffic growth.
   - Collaborated on competitive content analysis to identify keyword and design gaps, guiding new template creation in education, Venn diagrams, and business categories.
   - Adhered to brand guidelines and modern design principles for professional, consistent output across all deliverables.
   - Used Microsoft PowerPoint, Adobe Illustrator, Canva, and Google Slides to produce presentation assets aligned with client brand standards.
2) Presentation Design Intern — SlideEgg (Deckzi Solutions Pvt. Ltd.) | Aug 2024–Jan 2025
   - Gained hands-on experience in professional presentation design, infographic creation, and visual storytelling across business and corporate domains.
   - Completed all assigned projects on time, demonstrating self-motivation and a proactive approach to skill development.

KEY PROJECTS & DELIVERABLES:
- IT Business Plan Presentations — end-to-end slide decks with financial summaries and market analysis visuals.
- Corporate Pitch Decks — investor-ready decks with data charts, brand-consistent themes, and structured narratives.
- Marketing & Sales Dashboards — KPI-rich slides using data visualization best practices for executive audiences.
- Infographic & Data Visualization Slides — complex data simplified into clear visual formats for diverse industries.
- Calendar & Timeline Presentations — project roadmap and planning slides for operational and strategic use cases.

EDUCATION:
- Bachelor of Business Administration (BBA), Distance Education — Bharathidasan University, Tiruchirappalli | Score: 70%
- Diploma in Mechanical Engineering (DME) — Vandayar Polytechnic College, Pulavarnatham | Score: 82%
- Higher Secondary Certificate (HSC) — State Board, U.A.A.T.Hr.Sec.School Ammapet | SSLC: 52%, HSC: 65%

CERTIFICATIONS & TRAINING:
- Claude 101 — Certificate of Completion, Anthropic (May 2026)
- Presentation Skills — TCS iON, Tata Consultancy Services (May 2026)
- Communication Skills — TCS iON, Tata Consultancy Services (May 2026)
- Diploma in Computer Application (DCA) — PixelTechz Training & Development, Thanjavur (Mar–May 2024)

ADDITIONAL INFORMATION:
- Languages: Tamil (Native), English (Proficient)
- Location: Chennai, Tamil Nadu, India
- LinkedIn: linkedin.com/in/veeramani-k-8736a4308 | Portfolio: behance.net/veeramanik2
- Availability: Immediate
`.trim();

const GREETING =
  "Hi! I'm Veera AI ✨ — Veeramani's portfolio assistant. Ask me about his skills, experience, availability, or the kind of decks he designs.";

const SUGGESTIONS = [
  'What does Veeramani specialise in?',
  'Is he available to hire?',
  'What tools does he use?',
  'How do I contact him?'
];

export const VeeraAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: 'model', text: GREETING }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const clearChat = useCallback(() => {
    setMessages([{ role: 'model', text: GREETING }]);
    setInput('');
    setLoading(false);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, open]);

  const send = useCallback(
    async (text: string) => {
      const clean = text.trim();
      if (!clean || loading) return;

      const history = [...messages, { role: 'user' as Role, text: clean }];
      setMessages(history);
      setInput('');
      setLoading(true);

      if (!API_KEY) {
        setMessages([
          ...history,
          {
            role: 'model',
            text:
              "I'm not connected right now (missing API key). Meanwhile, reach Veeramani at " +
              `${PERSONAL_INFO.email}.`
          }
        ]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            model: MODEL,
            temperature: 0.6,
            max_tokens: 512,
            messages: [
              { role: 'system', content: KNOWLEDGE },
              ...history.map((m) => ({
                role: m.role === 'model' ? 'assistant' : 'user',
                content: m.text
              }))
            ]
          })
        });
        const data = await res.json();
        const reply: string | undefined = data?.choices?.[0]?.message?.content;

        setMessages([
          ...history,
          {
            role: 'model',
            text:
              reply?.trim() ||
              `Sorry, I couldn't reach my brain just now. You can email Veeramani at ${PERSONAL_INFO.email}.`
          }
        ]);
      } catch {
        setMessages([
          ...history,
          {
            role: 'model',
            text: `Hmm, connection hiccup. Please try again, or email ${PERSONAL_INFO.email}.`
          }
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  return (
    <>
      {/* Compact circular launcher (corner of screen) */}
      <div className="va-fab-wrap">
        <motion.button
          className="va-fab"
          aria-label={open ? 'Close Veera AI assistant' : 'Open Veera AI assistant'}
          onClick={() => setOpen((o) => !o)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 18 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
        >
          <span className="va-fab-avatar" aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: 'flex' }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.img
                  key="bot"
                  className="va-bot-img"
                  src="/assets/veera-bot.svg"
                  alt=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                />
              )}
            </AnimatePresence>
          </span>
          {!open && <span className="va-fab-online" />}
          {!open && <span className="va-fab-tip">Ask Veera AI</span>}
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="va-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="va-header">
              <div className="va-avatar" aria-hidden="true">
                <img className="va-bot-img" src="/assets/veera-bot.svg" alt="" />
              </div>
              <div className="va-header-info">
                <span className="va-header-name">
                  Veera AI <Sparkles size={13} />
                </span>
                <span className="va-header-status">
                  <span className="va-dot" /> Online • Assistant
                </span>
              </div>
              <button
                className="va-clear-btn"
                aria-label="Clear conversation"
                title="Clear chat"
                onClick={clearChat}
                disabled={messages.length <= 1 && !loading}
              >
                <RotateCcw size={14} />
                <span>Clear</span>
              </button>
              <button className="va-header-btn" aria-label="Close" onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="va-messages" ref={scrollRef}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`va-msg ${m.role === 'user' ? 'va-msg-user' : 'va-msg-bot'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {m.text}
                </motion.div>
              ))}

              {loading && (
                <div className="va-msg va-msg-bot va-typing" aria-label="Assistant is typing">
                  <span /><span /><span />
                </div>
              )}

              {messages.length <= 1 && !loading && (
                <div className="va-suggestions">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} className="va-chip" onClick={() => send(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              className="va-input-bar"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                className="va-input"
                placeholder="Ask about Veeramani…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <button className="va-send" type="submit" aria-label="Send" disabled={loading || !input.trim()}>
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
