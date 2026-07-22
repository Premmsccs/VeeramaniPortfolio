export interface Project {
  id: string;
  title: string;
  category: 'presentation' | 'infographic' | 'redesign' | 'poster' | 'dashboard';
  image: string;
  beforeImage?: string;
  afterImage?: string;
  description: string;
  tags: string[];
  metrics?: string;
  client?: string;
  highlights: string[];
}

export type GalleryCategory = 'presentation' | 'infographic' | 'dashboard';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
}

export const GALLERY_CATEGORIES: { key: GalleryCategory; label: string }[] = [
  { key: 'presentation', label: 'Presentations' },
  { key: 'infographic', label: 'Infographics' },
  { key: 'dashboard', label: 'Dashboards' }
];

export const GALLERY_DATA: GalleryItem[] = [
  // --- Presentations ---
  { id: 'g1', title: 'Security — Protecting Data & Systems', category: 'presentation', image: '/assets/gallery/g1.jpeg' },
  { id: 'g2', title: 'Botany — Study of Plants', category: 'presentation', image: '/assets/gallery/g2.jpeg' },
  { id: 'g3', title: 'Life Science — Zoology', category: 'presentation', image: '/assets/gallery/g3.jpeg' },
  { id: 'g7', title: 'Branches of Zoology', category: 'presentation', image: '/assets/gallery/g7.jpeg' },
  { id: 'g10', title: 'Consumer Lawyer', category: 'presentation', image: '/assets/gallery/g10.jpeg' },
  { id: 'g14', title: 'Healthcare Business Plan', category: 'presentation', image: '/assets/gallery/g14.jpeg' },
  { id: 'g16', title: 'Biomedical Waste Management', category: 'presentation', image: '/assets/gallery/g16.jpeg' },
  { id: 'g17', title: 'What is a Raven?', category: 'presentation', image: '/assets/gallery/g17.jpeg' },
  { id: 'g18', title: 'National Raspberry Day', category: 'presentation', image: '/assets/gallery/g18.jpeg' },
  { id: 'g19', title: 'Real Estate', category: 'presentation', image: '/assets/gallery/g19.jpeg' },
  { id: 'g23', title: 'Cyberattack', category: 'presentation', image: '/assets/gallery/g23.jpeg' },
  { id: 'g24', title: 'Social Awareness', category: 'presentation', image: '/assets/gallery/g24.jpeg' },
  { id: 'g25', title: 'Digital Lending', category: 'presentation', image: '/assets/gallery/g25.jpeg' },
  { id: 'g26', title: 'Biology — Seaweed', category: 'presentation', image: '/assets/gallery/g26.jpeg' },
  { id: 'g27', title: 'Rosalind Franklin', category: 'presentation', image: '/assets/gallery/g27.jpeg' },
  { id: 'g28', title: "National Parents' Day", category: 'presentation', image: '/assets/gallery/g28.jpeg' },
  { id: 'g30', title: 'D2C E-commerce', category: 'presentation', image: '/assets/gallery/g30.jpeg' },

  // --- Infographics ---
  { id: 'g4', title: 'Software Consulting Process', category: 'infographic', image: '/assets/gallery/g4.jpeg' },
  { id: 'g5', title: 'Importance — Key Points', category: 'infographic', image: '/assets/gallery/g5.jpeg' },
  { id: 'g6', title: 'Consumer Court Online Complaint', category: 'infographic', image: '/assets/gallery/g6.jpeg' },
  { id: 'g8', title: 'Consumer Complaint — Hexagon Flow', category: 'infographic', image: '/assets/gallery/g8.jpeg' },
  { id: 'g9', title: 'Consumer Complaint — Cycle', category: 'infographic', image: '/assets/gallery/g9.jpeg' },
  { id: 'g11', title: 'Consumer Court — 7 Step Journey', category: 'infographic', image: '/assets/gallery/g11.jpeg' },
  { id: 'g29', title: 'Order to Delivery Process', category: 'infographic', image: '/assets/gallery/g29.jpeg' },
  { id: 'g31', title: "Propagation of Bird's Nest Cacti", category: 'infographic', image: '/assets/gallery/g31.jpeg' },
  { id: 'g32', title: 'Traditional vs Modern Farming', category: 'infographic', image: '/assets/gallery/g32.jpeg' },
  { id: 'g33', title: 'Vocational Training — Benefits', category: 'infographic', image: '/assets/gallery/g33.jpeg' },

  // --- Dashboards ---
  { id: 'g12', title: 'Social Media Dashboard', category: 'dashboard', image: '/assets/gallery/g12.jpeg' },
  { id: 'g13', title: 'Sales Dashboard', category: 'dashboard', image: '/assets/gallery/g13.jpeg' },
  { id: 'g15', title: 'Social Media Analytics Dashboard', category: 'dashboard', image: '/assets/gallery/g15.jpeg' },
  { id: 'g34', title: 'Social Media Engagement Dashboard', category: 'dashboard', image: '/assets/gallery/g34.jpeg' },
  { id: 'g35', title: 'Social Media Channel Dashboard', category: 'dashboard', image: '/assets/gallery/g35.jpeg' },
  { id: 'g36', title: 'Sales Performance Dashboard', category: 'dashboard', image: '/assets/gallery/g36.jpeg' },
  { id: 'g37', title: 'Marketing Campaign Dashboard', category: 'dashboard', image: '/assets/gallery/g37.jpeg' },
  { id: 'g38', title: 'Marketing Performance Dashboard', category: 'dashboard', image: '/assets/gallery/g38.jpeg' },
  { id: 'g39', title: 'Business Infographic Dashboard', category: 'dashboard', image: '/assets/gallery/g39.jpeg' }
];

export interface Skill {
  name: string;
  level: number; // 1 - 100
  category: 'core' | 'tools' | 'soft';
  iconName: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  location: string;
  achievements: string[];
  toolsUsed: string[];
}

export const PERSONAL_INFO = {
  name: 'VEERAMANI K',
  title: 'PowerPoint Presentation Designer | Creative AI Storyteller',
  email: 'veeramani2252001@gmail.com',
  phone: '+91 6382062964',
  location: 'Chennai, Tamil Nadu, India',
  linkedin: 'https://linkedin.com/in/veeramani-k',
  behance: 'https://www.behance.net/veeramanik2',
  resumeUrl: '/Veeramani_Resume.pdf',
  calendly: 'https://calendly.com/veeramani',
  availability: 'Immediate',
  stats: [
    { label: 'Presentations Delivered', value: '1,500+', icon: 'Briefcase' },
    { label: 'Slide Redesigns Completed', value: '100+', icon: 'Sparkles' },
    { label: 'Years Professional Exp.', value: '1.7+', icon: 'Calendar' },
    { label: 'Global Client Retention', value: '99%', icon: 'Award' }
  ],
  summary: `Results-driven PowerPoint Presentation Designer and AI Creative Specialist with 1.7+ years of professional experience creating visually compelling, brand-consistent presentations for global clients. Proven expertise in investor pitch decks, corporate profiles, marketing dashboards, and data visualization. Adept at transforming complex ideas into clear, audience-ready visual stories using Microsoft PowerPoint, Adobe Illustrator, Canva, and AI video/slide tools.`
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'redesign-core-1',
    title: 'Executive Slide Transformation: Outdated to High-Impact SaaS Deck',
    category: 'redesign',
    image: '/assets/portfolio/image25.png',
    beforeImage: '/assets/portfolio/image26.png',
    afterImage: '/assets/portfolio/image25.png',
    description: 'Complete visual overhaul of an outdated text-heavy slide into a clean, modern, high-engagement visual hierarchy tailored for C-suite investor meetings.',
    tags: ['Slide Redesign', 'Visual Hierarchy', 'Brand Alignment', 'Typography'],
    metrics: '3x Faster Comprehension Rate',
    client: 'Global Tech Enterprise',
    highlights: [
      'Replaced cluttered bullet points with structured 3-pillar visual containers',
      'Applied custom typography hierarchy (Outfit + Inter) with high-contrast color accents',
      'Integrated bespoke isometric icon badges for instant cognitive recognition',
      'Fully editable vector-based PowerPoint shapes with zero raster degradation'
    ]
  },
  {
    id: 'pitch-deck-1',
    title: 'Series-A Investor Pitch Deck: FinTech & Cloud Architecture',
    category: 'presentation',
    image: '/assets/portfolio/image27.png',
    description: 'Designed a high-stakes, 35-slide investor presentation deck communicating complex cloud architecture, market opportunity, and financial projections.',
    tags: ['Pitch Deck', 'Financial Charts', 'Data Storytelling', 'Investor Ready'],
    metrics: '$5M Funding Round Success',
    client: 'FinTech Startup',
    highlights: [
      'Crafted data charts showing compound annual growth rate (CAGR) with glowing callout flags',
      'Built interactive slide transitions and non-linear navigation hyperlinks',
      'Maintained strict corporate brand guidelines and custom color palettes across every slide'
    ]
  },
  {
    id: 'pitch-deck-2',
    title: 'Corporate Annual Overview & Strategic Roadmap 2026',
    category: 'presentation',
    image: '/assets/portfolio/image28.png',
    description: 'Comprehensive annual report presentation transforming dense tabular data into scannable executive summary slides with dynamic process flows.',
    tags: ['Corporate Profile', 'Annual Report', 'Process Flows', 'Strategic Roadmap'],
    metrics: 'Deployed to 500+ Stakeholders',
    client: 'Multinational Corporation',
    highlights: [
      'Designed 5-year strategic timeline slides with milestone checkpoints',
      'Created custom iconography system aligned with corporate visual identity',
      'Optimized layout spacing for dual screen share and physical print distribution'
    ]
  },
  {
    id: 'pitch-deck-3',
    title: 'AI & Machine Learning Enterprise Solutions Presentation',
    category: 'presentation',
    image: '/assets/portfolio/image29.png',
    description: 'Sleek, futuristic presentation design for an AI solutions provider featuring glowing cyber-lux aesthetics, glassmorphic cards, and infographic pipelines.',
    tags: ['AI Presentation', 'Glassmorphism', 'Dark Mode Deck', 'Futuristic UI'],
    metrics: 'Top 1% Downloaded Template on SlideEgg',
    client: 'SlideEgg Content Platform',
    highlights: [
      'Incorporated neon cyan and purple gradients tailored for high-contrast projectors and OLED screens',
      'Developed reusable slide master templates for internal sales teams',
      'Infused AI video generation storytelling principles into slide cadence'
    ]
  },
  {
    id: 'infographic-1',
    title: 'Multi-Stage Business Process & Venn Diagram Architecture',
    category: 'infographic',
    image: '/assets/portfolio/image33.png',
    description: 'Complex organizational and analytical data simplified into crystal-clear visual infographic modules with multi-layer interconnected diagrams.',
    tags: ['Infographics', 'Venn Diagrams', 'Data Visualization', 'Adobe Illustrator'],
    metrics: '10,000+ Platform Views',
    client: 'SlideEgg / Deckzi Solutions',
    highlights: [
      'Conducted competitive keyword gap analysis to pioneer top-ranking education & Venn templates',
      'Designed fully editable vector smart-objects inside PowerPoint master slides',
      'Used psychological color theory to distinguish overlapping logical domains cleanly'
    ]
  },
  {
    id: 'infographic-2',
    title: 'Executive Marketing & Sales KPI Dashboard Slide',
    category: 'dashboard',
    image: '/assets/portfolio/image34.png',
    description: 'Executive-level KPI dashboard slide featuring real-time metrics layout, conversion funnels, and revenue breakdown charts.',
    tags: ['Dashboard Design', 'KPI Tracking', 'Marketing Analytics', 'Chart Optimization'],
    metrics: 'Executive Decision Speed +40%',
    client: 'SaaS Marketing Agency',
    highlights: [
      'Organized data into distinct card enclosures with clear visual prominence',
      'Highlighted critical anomalies and quarterly targets using high-contrast indicators',
      'Delivered 100% native PowerPoint charts linked to Excel data feeds'
    ]
  },
  {
    id: 'infographic-3',
    title: 'Product Lifecycle & 6-Phase Development Infographic',
    category: 'infographic',
    image: '/assets/portfolio/image35.png',
    description: 'Iterative product design and engineering workflow visualized through an interconnected circular timeline with step-by-step annotation callouts.',
    tags: ['Workflow Infographic', 'Timeline Design', 'Visual Engineering', 'Step-by-Step'],
    metrics: 'Global Template Deployment',
    client: 'Deckzi Solutions',
    highlights: [
      'Engineered smooth visual flow directing viewer eyes effortlessly from Phase 1 to Phase 6',
      'Balanced whitespace and micro-icons for maximum visual breathing room'
    ]
  },
  {
    id: 'poster-1',
    title: 'High-Impact Brand Marketing & Digital Social Poster Campaign',
    category: 'poster',
    image: '/assets/portfolio/image39.jpeg',
    description: 'Eye-catching promotional graphics designed using Adobe Illustrator and Photoshop for brand awareness, events, and social media engagement.',
    tags: ['Poster Design', 'Social Media', 'Photoshop', 'Brand Marketing'],
    metrics: '250% Engagement Surge',
    client: 'Creative Brand Studio',
    highlights: [
      'Leveraged bold typography and cinematic color grading to command attention',
      'Optimized aspect ratios for Instagram, LinkedIn, and high-resolution print'
    ]
  },
  {
    id: 'poster-2',
    title: 'Tech Symposium & AI Video Creative Announcement Poster',
    category: 'poster',
    image: '/assets/portfolio/image42.jpeg',
    description: 'Futuristic event poster and video teaser thumbnail combining AI generated visual elements with precise typography.',
    tags: ['AI Video Art', 'Event Marketing', 'Digital Flyer', 'Illustrator'],
    metrics: 'Over 1,200 Event Registrations',
    client: 'Tech Event Organizers',
    highlights: [
      'Blended AI visual art with custom vector graphic overlays',
      'Delivered brand-consistent marketing collateral across digital & physical channels'
    ]
  },
  {
    id: 'portfolio-gallery-1',
    title: 'Comprehensive Slide Showcase: Education & Corporate Themes',
    category: 'presentation',
    image: '/assets/portfolio/image55.jpeg',
    description: 'Part of the 1500+ slide master library produced during tenure at SlideEgg, covering education modules, academic charts, and research summaries.',
    tags: ['Master Library', 'Education Decks', 'SEO Templates', 'PowerPoint Pro'],
    metrics: 'Global Template Catalog',
    client: 'SlideEgg Global Platform',
    highlights: [
      'Consistent design output deployed directly to SEO-driven organic landing pages',
      'High reusability rating among international corporate downloads'
    ]
  },
  {
    id: 'portfolio-gallery-2',
    title: 'Multi-Industry Strategy Deck & Roadmap Visualization',
    category: 'presentation',
    image: '/assets/portfolio/image58.jpeg',
    description: 'Strategic roadmap presentation slide set illustrating multi-quarter expansion plans across APAC and European markets.',
    tags: ['Roadmap', 'Global Strategy', 'Infographic Deck', 'Executive Presentation'],
    metrics: 'Adopted by 20+ Enterprise Teams',
    client: 'SlideEgg Corporate Clients',
    highlights: [
      'Clean modular grid layout ensuring zero visual clutter',
      'Hyper-structured slide geometry built strictly on 16:9 widescreen proportions'
    ]
  }
];

export const SKILLS_DATA: Skill[] = [
  // Core Competencies
  { name: 'Visual Storytelling & Pitch Decks', level: 98, category: 'core', iconName: 'Presentation' },
  { name: 'Typography & Layout Composition', level: 96, category: 'core', iconName: 'Type' },
  { name: 'Infographic & Data Visualization', level: 95, category: 'core', iconName: 'BarChart3' },
  { name: 'Brand Consistency & Design Systems', level: 97, category: 'core', iconName: 'Palette' },
  { name: 'Executive Dashboard & KPI Slides', level: 94, category: 'core', iconName: 'LayoutDashboard' },
  { name: 'Slide Redesign & Modernization', level: 99, category: 'core', iconName: 'Sparkles' },

  // Tools & Software
  { name: 'Microsoft PowerPoint (Advanced/Master)', level: 100, category: 'tools', iconName: 'Monitor' },
  { name: 'Adobe Illustrator & Vector Assets', level: 92, category: 'tools', iconName: 'PenTool' },
  { name: 'Canva Pro & Brand Hub', level: 95, category: 'tools', iconName: 'Image' },
  { name: 'Adobe Photoshop & Photo Editing', level: 88, category: 'tools', iconName: 'Layers' },
  { name: 'Google Slides Collaborative Decks', level: 94, category: 'tools', iconName: 'Share2' },
  { name: 'Claude AI / AI Video & Slide Generation', level: 93, category: 'tools', iconName: 'Cpu' },

  // Soft & Professional Skills
  { name: 'Global Client Collaboration & Communication', level: 98, category: 'soft', iconName: 'Users' },
  { name: 'Strict Deadline Adherence & Speed', level: 99, category: 'soft', iconName: 'Clock' },
  { name: 'SEO Content Gap Analysis & Strategy', level: 90, category: 'soft', iconName: 'TrendingUp' },
  { name: 'NDA-Friendly Secure Workflow', level: 100, category: 'soft', iconName: 'ShieldCheck' }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    role: 'PowerPoint Presentation Designer',
    company: 'SlideEgg (Deckzi Solutions Pvt. Ltd.)',
    period: 'Feb 2025 – Present',
    type: 'Full-Time Professional',
    location: 'Chennai, India',
    achievements: [
      'Designed professional presentation slides including business plans, corporate pitch decks, and infographic-rich data visualizations.',
      'Created clean, visually consistent layouts that dramatically improved audience engagement for global executive clients.',
      'Delivered fully editable, SEO-optimized presentation templates deployed on SlideEgg’s platform, driving traffic growth and downloads.',
      'Adhered strictly to brand guidelines across 1,500+ deliverables using PowerPoint, Illustrator, and Canva.',
      'Utilized competitive content analysis to pioneer high-ranking presentation templates across multiple business categories.'
    ],
    toolsUsed: ['Microsoft PowerPoint', 'Adobe Illustrator', 'Canva Pro', 'Google Slides', 'SEO Analytics', 'Vector Graphics']
  },
  {
    role: 'Presentation Design Intern',
    company: 'SlideEgg (Deckzi Solutions Pvt. Ltd.)',
    period: 'Aug 2024 – Jan 2025',
    type: 'Internship -> Promoted to Full-Time',
    location: 'Chennai, India',
    achievements: [
      'Gained intensive hands-on experience in professional presentation design, infographic creation, and visual storytelling.',
      'Successfully completed all assigned high-stakes projects on time, demonstrating a proactive approach to rapid skill mastery.',
      'Mastered the transition of raw text notes and complex Excel data into highly scannable, audience-ready presentation slide decks.',
      'Contributed to internal UI/UX discussions on presentation hierarchy and custom master slide mechanics.',
      'Collaborated closely with senior designers to refine typography, color theory, and advanced infographic vector layouts.'
    ],
    toolsUsed: ['Microsoft PowerPoint', 'Canva', 'Infographic Design', 'Color Theory', 'Typography']
  }
];

export const EDUCATION_DATA = [
  {
    degree: 'Bachelor of Business Administration (BBA) – Distance Education',
    institution: 'Bharathidasan University, Tiruchirappalli',
    score: 'Score: 70%',
    year: 'Graduated'
  },
  {
    degree: 'Diploma in Mechanical Engineering (DME)',
    institution: 'Vandayar Polytechnic College, Pulavarnatham',
    score: 'Score: 82%',
    year: 'Completed'
  },
  {
    degree: 'Higher Secondary Certificate (HSC) & SSLC',
    institution: 'State Board, U.A.A.T.Hr.Sec.School Ammapet',
    score: 'SSLC : 52% | HSC : 65%',
    year: 'Schooling'
  }
];

export const CERTIFICATIONS_DATA = [
  {
    name: 'Claude 101 – Certificate of Completion',
    issuer: 'Anthropic',
    date: 'May 2026',
    category: 'AI & Prompt Engineering',
    icon: 'Sparkles',
    pdfUrl: '/assets/certificates/claude-101.pdf',
    orientation: 'landscape'
  },
  {
    name: 'Presentation Skills Certification',
    issuer: 'TCS iON (Tata Consultancy Services)',
    date: 'May 2026',
    category: 'Professional Design Mastery',
    icon: 'Award',
    pdfUrl: '/assets/certificates/tcs-presentation.pdf',
    orientation: 'landscape'
  },
  {
    name: 'Communication Skills Certification',
    issuer: 'TCS iON (Tata Consultancy Services)',
    date: 'May 2026',
    category: 'Executive Communication',
    icon: 'MessageSquare',
    pdfUrl: '/assets/certificates/tcs-communication.pdf',
    orientation: 'landscape'
  },
  {
    name: 'Diploma in Computer Application (DCA)',
    issuer: 'PixelTechz Training & Development, Thanjavur',
    date: 'Mar – May 2024',
    category: 'Software Architecture',
    icon: 'Monitor',
    pdfUrl: '/assets/certificates/certificate-dca.png',
    orientation: 'portrait'
  },
  {
    name: 'Internship Completion Letter',
    issuer: 'SlideEgg (Deckzi Solutions Pvt. Ltd.)',
    date: 'Jan 2025',
    category: 'Professional Experience',
    icon: 'Briefcase',
    pdfUrl: '/assets/certificates/internship-letter.pdf',
    orientation: 'portrait'
  }
];

export const CLIENT_VALUE_POINTS = [
  {
    title: 'Professional Design Quality',
    desc: 'Award-grade typography, balanced visual hierarchy, and cohesive brand storytelling tailored for C-suite and investor impact.',
    icon: 'Sparkles',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    title: '100% Fully Editable Files',
    desc: 'Native PowerPoint shapes, vector graphics, and live charts. No flattened un-editable images—you retain total control.',
    icon: 'Sliders',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Fast & Reliable Delivery',
    desc: 'Strict adherence to aggressive timelines with proactive updates. Immediate immediate turnaround options for urgent pitch meetings.',
    icon: 'Zap',
    gradient: 'from-yellow-400 to-amber-600'
  },
  {
    title: 'NDA-Friendly Secure Workflow',
    desc: 'Complete confidentiality for sensitive investor decks, M&A presentations, and proprietary financial data.',
    icon: 'Shield',
    gradient: 'from-emerald-400 to-teal-600'
  }
];
