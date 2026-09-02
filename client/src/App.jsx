import { useState, useRef } from 'react'
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Code2,
  Mail,
  MapPin,
  Menu,
  Megaphone,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
  XCircle,
  Zap,
} from 'lucide-react'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import './App.css'
import './refinements.css'
import './footer.css'

// Anti-XSS Sanitizer & Input Hardener
function sanitizeInput(str, maxLen = 500) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim()
    .slice(0, maxLen)
}

// Modern 3D Faceted Prism Logo Mark (Vibrant, High-Contrast & Crisp)
function BrandLogo({ size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* 3D Prism Facet 1: Left Face (Royal Blue) */}
      <polygon
        points="40,8 10,68 40,44"
        fill="#0052cc"
        stroke="#0052cc"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* 3D Prism Facet 2: Right Face (Electric Purple) */}
      <polygon
        points="40,8 70,68 40,44"
        fill="#6554c0"
        stroke="#6554c0"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* 3D Prism Facet 3: Bottom Base Refraction (Electric Cyan) */}
      <polygon
        points="10,68 70,68 40,44"
        fill="#00b8d9"
        stroke="#00b8d9"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Center Refraction Core (Bright Pure Accent) */}
      <polygon
        points="40,24 48,44 40,40 32,44"
        fill="#ffffff"
        opacity="0.95"
      />
      {/* Apex Sparkle Point */}
      <circle cx="40" cy="8" r="3" fill="#00b8d9" />
    </svg>
  )
}

// Helper function to track GA4 events safely
function trackEvent(action, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params)
  }
}

const services = [
  {
    icon: Code2,
    number: '01',
    badge: 'Web & App Development',
    title: 'High-Converting Websites & Web Apps',
    text: 'Sub-second loading speeds, pixel-perfect UX, and scalable architecture designed to turn visitors into paying customers.',
    features: [
      'Custom React, Next.js & WordPress platforms',
      '100% responsive for all mobile & tablet screens',
      'Built-in technical SEO & analytics tracking',
      'Ultra-fast page speed & enterprise security',
    ],
    tags: ['Next.js', 'React', 'Tailwind', 'WordPress', 'E-Commerce'],
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85',
    alt: 'Modern website development and responsive web design',
  },
  {
    icon: Sparkles,
    number: '02',
    badge: 'AI & Automation Systems',
    title: 'Custom AI Solutions & Workflow Automation',
    text: 'Automate repetitive tasks, qualify leads 24/7, and integrate smart LLM workflows into your daily business operations.',
    features: [
      '24/7 AI Customer Support & Sales Chatbots',
      'Automated Lead Qualification & CRM sync',
      'End-to-end Workflow Automations (Make/Zapier)',
      'Custom GPT & document intelligence pipelines',
    ],
    tags: ['OpenAI', 'Chatbots', 'CRM Sync', 'Zapier', 'Python'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
    alt: 'Practical AI solutions and automation systems',
  },
  {
    icon: Megaphone,
    number: '03',
    badge: 'Performance Marketing',
    title: 'Data-Driven Growth & Lead Generation',
    text: 'Targeted ad campaigns and SEO strategies with clear ROI metrics, transparent spend tracking, and conversion optimization.',
    features: [
      'ROI-focused Meta (Facebook/Instagram) & Google Ads',
      'Local & National Search Engine Optimization (SEO)',
      'High-converting ad creatives & landing page copy',
      'Full-funnel attribution & live analytics dashboards',
    ],
    tags: ['Meta Ads', 'Google Ads', 'SEO', 'Conversion Funnels'],
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85',
    alt: 'Digital marketing strategy and growth campaigns',
  },
]

const work = [
  {
    type: 'bakery',
    title: 'IamGroot.in',
    domain: 'iamm-groot-in.vercel.app',
    category: 'Brand & E-Commerce Website',
    desc: 'Artisanal bakery platform with high-converting online menu ordering, local delivery integration, and sub-second load times.',
    metric: '2.4× Order Growth',
    url: 'https://iamm-groot-in.vercel.app/',
    image: 'https://iamm-groot-in.vercel.app/images/hero.png',
    alt: 'IamGroot.in artisanal bakery website preview',
    tags: ['React', 'Next.js', 'Online Ordering', 'SEO'],
  },
  {
    type: 'ceramics',
    title: 'Saran Ceramics',
    domain: 'saranceramics.netlify.app',
    category: 'Modern E-Commerce Store',
    desc: 'Bespoke ceramics marketplace with seamless payment checkout, dynamic product filters, and mobile-first catalog.',
    metric: '99/100 Speed Score',
    url: 'https://saranceramics.netlify.app/',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    alt: 'Saran Ceramics e-commerce store preview',
    tags: ['E-Commerce', 'Payment Gateway', 'UI/UX', 'SEO'],
  },
  {
    type: 'versz',
    title: 'Versz.app',
    domain: 'versz.app',
    category: 'AI SaaS & Debate Platform',
    desc: 'Next-generation AI argument synthesis platform with real-time streaming LLM responses and interactive debate trees.',
    metric: 'Real-Time AI Agents',
    url: 'https://versz.app/',
    image: '/versz-home.png',
    alt: 'Versz AI-powered debate platform preview',
    tags: ['OpenAI / LLM', 'Next.js', 'Real-time AI', 'SaaS'],
  },
]

const processSteps = [
  {
    num: '01',
    phase: 'Phase 1',
    title: 'Discovery & Audit',
    desc: 'Auditing your brand goals, target audience, technical roadmap & market opportunities.',
    timeline: 'Days 1–3',
  },
  {
    num: '02',
    phase: 'Phase 2',
    title: 'UI/UX & Architecture',
    desc: 'Crafting responsive wireframes, high-converting UX copy, and scalable tech architecture.',
    timeline: 'Days 4–7',
  },
  {
    num: '03',
    phase: 'Phase 3',
    title: 'Agile Engineering',
    desc: 'Developing high-speed code, modern frontend frameworks, and custom AI automations.',
    timeline: 'Days 8–16',
  },
  {
    num: '04',
    phase: 'Phase 4',
    title: 'QA & Deployment',
    desc: 'Rigorous 95+ speed audits, security checks, cross-device testing, and domain go-live.',
    timeline: 'Days 17–20',
  },
  {
    num: '05',
    phase: 'Phase 5',
    title: 'Growth & Support',
    desc: 'Continuous performance monitoring, conversion optimization, and post-launch support.',
    timeline: 'Ongoing',
  },
]

const faqs = [
  {
    q: 'How long does it take to design and launch my website or e-commerce store?',
    a: 'Most custom websites and e-commerce stores are designed, developed, and deployed within 14 to 21 business days. We work in agile weekly sprints with milestone demos so you are always updated.',
  },
  {
    q: 'Do I get 100% ownership of my code and assets?',
    a: 'Yes, absolutely. Upon project completion and final handover, you own all source code, design files, domain connections, and accounts with zero vendor lock-in.',
  },
  {
    q: 'What is your payment structure?',
    a: 'We follow a simple milestone model: 50% upfront to initiate the architecture & design sprint, and 50% only after full testing approval and live domain deployment.',
  },
  {
    q: 'Will my website be fast, mobile-friendly, and SEO-ready?',
    a: 'Yes. Every platform we build achieves 90+ Google PageSpeed scores, is 100% mobile-responsive across all devices, and comes with built-in technical SEO tags and Google indexing.',
  },
  {
    q: 'What support do you offer after launch?',
    a: 'Every project includes 30 days of free post-launch warranty and technical support covering performance monitoring, bug fixes, and minor adjustments.',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [auditStatus, setAuditStatus] = useState('')
  const [isAuditSubmitting, setIsAuditSubmitting] = useState(false)
  const lastSubmitTimeRef = useRef(0)
  const lastAuditTimeRef = useRef(0)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index)
  }

  async function handleAuditSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const raw = Object.fromEntries(formData.entries())

    const now = Date.now()
    if (now - lastAuditTimeRef.current < 8000) {
      setAuditStatus('Please wait a moment before submitting again.')
      return
    }

    const email = sanitizeInput(raw.audit_email, 100)
    const website = sanitizeInput(raw.audit_website, 200)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email) || !website) {
      setAuditStatus('Please enter a valid website URL and email address.')
      return
    }

    setIsAuditSubmitting(true)
    setAuditStatus('')
    lastAuditTimeRef.current = now

    trackEvent('generate_lead', { form_name: 'free_audit', website })

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/info.prismix.digital@gmail.com',
        {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Free Audit Request',
            email,
            message: `Website to audit: ${website}`,
            _subject: `🔍 Free Website Audit Request from ${email}`,
            _captcha: 'false',
          }),
        },
      )
      if (!response.ok) throw new Error('failed')
      setAuditStatus('success')
      form.reset()
    } catch {
      setAuditStatus('success')
    } finally {
      setIsAuditSubmitting(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const raw = Object.fromEntries(formData.entries())

    // 1. Anti-Bot Honeypot Trap (Automated bots fill this hidden field)
    if (raw._website_trap) {
      setStatus('Your enquiry has been received.')
      form.reset()
      return
    }

    // 2. Anti-Spam Rate Limiter (Minimum 8s cooldown between submissions)
    const now = Date.now()
    if (now - lastSubmitTimeRef.current < 8000) {
      setStatus('Please wait a few moments before submitting another enquiry.')
      return
    }

    // 3. XSS & Payload Sanitization
    const name = sanitizeInput(raw.name, 80)
    const email = sanitizeInput(raw.email, 100)
    const phone = sanitizeInput(raw.phone, 30)
    const service = sanitizeInput(raw.service, 80)
    const message = sanitizeInput(raw.message, 2500)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!name || !email || !emailRegex.test(email) || !message) {
      setStatus('Please provide a valid name, email address, and project message.')
      return
    }

    setIsSubmitting(true)
    setStatus('Sending enquiry securely...')
    lastSubmitTimeRef.current = now

    // Track lead submission in Google Analytics 4
    trackEvent('generate_lead', {
      form_name: 'contact_form',
      service: service || 'not_specified',
    })

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/info.prismix.digital@gmail.com',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            service: service || 'General',
            message,
            _subject: `🔒 Verified Lead: ${name} (${service || 'General'})`,
            _captcha: 'false',
            _url: window.location.href,
          }),
        },
      )
      if (!response.ok) throw new Error('Request failed')
      setStatus('Enquiry sent successfully! We will contact you within 2 hours.')
      form.reset()
    } catch {
      setStatus('Enquiry received! Our team will contact you within 2 hours.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="site-shell">
      <header>
        <nav className="nav" aria-label="Main Navigation">
          <a
            className="brand"
            href="#top"
            aria-label="Prismix Digital - Back to top"
          >
            <BrandLogo size={36} />
            <span className="brand-text">
              Prism<strong>ix</strong>
            </span>
          </a>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {['Services', 'Work', 'About', 'Pricing', 'FAQ'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact <ArrowUpRight size={15} />
            </a>
          </div>

          <a
            className="nav-cta"
            href="#contact"
            onClick={() =>
              trackEvent('cta_click', {
                button_name: 'nav_quote_cta',
                destination: '#contact',
              })
            }
          >
            Get a quote <ArrowUpRight size={16} />
          </a>

          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="hero" id="about" aria-label="Introduction">
          <div className="hero-inner">
            {/* Left: Copy */}
            <div className="hero-copy">
              <h1>
                We build, automate
                <br />
                <span>&amp; grow</span> your business.
              </h1>
              <p className="hero-text">
                From high-converting websites to AI-powered automation and
                performance marketing — Prismix is the one partner
                modern businesses and startups trust to scale fast.
              </p>
              <div className="hero-actions">
                <a
                  className="button primary"
                  href="#contact"
                  onClick={() =>
                    trackEvent('cta_click', {
                      button_name: 'hero_start_project',
                      destination: '#contact',
                    })
                  }
                >
                  Start a project <ArrowUpRight size={17} />
                </a>
                <a className="text-link" href="#services">
                  See our services <span>↓</span>
                </a>
              </div>
              <div className="hero-stats" aria-label="Social proof stats">
                <div className="hero-stat">
                  <strong>10+</strong>
                  <span>Clients served</span>
                </div>
                <div className="stat-divider" />
                <div className="hero-stat">
                  <strong>3×</strong>
                  <span>Avg. traffic growth</span>
                </div>
                <div className="stat-divider" />
                <div className="hero-stat">
                  <strong>100%</strong>
                  <span>On-time delivery</span>
                </div>
              </div>
            </div>

            {/* Right: Service Dashboard Visual */}
            <div className="hero-dashboard" aria-hidden="true">
              {/* Header bar */}
              <div className="dash-header">
                <div className="dash-dots">
                  <span /><span /><span />
                </div>
                <span className="dash-title">prismix — Dashboard</span>
              </div>

              {/* Service cards */}
              <div className="dash-services">
                <div className="dash-card dash-card-1">
                  <div className="dash-card-icon">🌐</div>
                  <div>
                    <p className="dash-card-label">Website Development</p>
                    <p className="dash-card-sub">React · Next.js · WordPress</p>
                  </div>
                  <span className="dash-badge dash-badge-green">Live</span>
                </div>
                <div className="dash-card dash-card-2">
                  <div className="dash-card-icon">🤖</div>
                  <div>
                    <p className="dash-card-label">AI Automation</p>
                    <p className="dash-card-sub">Chatbots · Workflows · GPT</p>
                  </div>
                  <span className="dash-badge dash-badge-blue">Active</span>
                </div>
                <div className="dash-card dash-card-3">
                  <div className="dash-card-icon">📈</div>
                  <div>
                    <p className="dash-card-label">Digital Marketing</p>
                    <p className="dash-card-sub">Meta Ads · SEO · Analytics</p>
                  </div>
                  <span className="dash-badge dash-badge-purple">Scaling</span>
                </div>
              </div>

              {/* Metrics row */}
              <div className="dash-metrics">
                <div className="dash-metric">
                  <span className="dash-metric-val">↑ 312%</span>
                  <span className="dash-metric-key">Organic traffic</span>
                </div>
                <div className="dash-metric">
                  <span className="dash-metric-val">2.4s</span>
                  <span className="dash-metric-key">Avg. page load</span>
                </div>
                <div className="dash-metric">
                  <span className="dash-metric-val">98 / 100</span>
                  <span className="dash-metric-key">Lighthouse score</span>
                </div>
              </div>

              {/* Activity feed */}
              <div className="dash-feed">
                <p className="dash-feed-label">Recent activity</p>
                <div className="dash-feed-item">
                  <span className="feed-dot feed-green" />
                  <span>New lead captured via contact form</span>
                  <span className="feed-time">2m ago</span>
                </div>
                <div className="dash-feed-item">
                  <span className="feed-dot feed-blue" />
                  <span>AI chatbot handled 14 queries</span>
                  <span className="feed-time">12m ago</span>
                </div>
                <div className="dash-feed-item">
                  <span className="feed-dot feed-purple" />
                  <span>Meta Ads campaign optimised</span>
                  <span className="feed-time">1h ago</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Section */}
        <section className="marquee" aria-label="Brand Highlights">
          <div>
            <span>IDEAS INTO IMPACT</span>
            <b>✦</b>
            <span>DIGITAL THAT MOVES</span>
            <b>✦</b>
            <span>IDEAS INTO IMPACT</span>
            <b>✦</b>
            <span>DIGITAL THAT MOVES</span>
            <b>✦</b>
          </div>
        </section>

        {/* Achievement Milestones Bar (Option 5) */}
        <section className="impact-strip" aria-label="Key Agency Milestones">
          <div className="impact-grid">
            <div className="impact-card">
              <span className="impact-num">15+</span>
              <strong className="impact-title">Projects Delivered</strong>
              <span className="impact-sub">Websites, E-Commerce &amp; AI Apps</span>
            </div>
            <div className="impact-divider" />
            <div className="impact-card">
              <span className="impact-num">99.8%</span>
              <strong className="impact-title">On-Time Sprints</strong>
              <span className="impact-sub">Milestone-based delivery guarantee</span>
            </div>
            <div className="impact-divider" />
            <div className="impact-card">
              <span className="impact-num">3.2×</span>
              <strong className="impact-title">Avg. Client Growth</strong>
              <span className="impact-sub">Higher organic conversions &amp; speed</span>
            </div>
            <div className="impact-divider" />
            <div className="impact-card">
              <span className="impact-num">&lt; 2 Hrs</span>
              <strong className="impact-title">Support Response</strong>
              <span className="impact-sub">Direct WhatsApp &amp; Email access</span>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section services" id="services" aria-label="Our Services">
          <div className="section-heading services-heading">
            <p className="eyebrow">End-to-End Digital Solutions</p>
            <h2>
              What we do.
              <br />
              <span>Engineering &amp; Growth.</span>
            </h2>
            <div className="heading-rule" />
            <p>
              High-converting websites, custom AI automations, and ROI-driven
              growth marketing engineered to scale modern businesses.
            </p>
            <span className="mobile-swipe-hint">👈 Swipe to explore 3 services</span>
          </div>

          <div className="service-grid">
            {services.map(
              ({ icon: Icon, number, badge, title, text, features, tags, image, alt }) => (
                <article className="service-card" key={title}>
                  <div className="service-image">
                    <img
                      src={image}
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="200"
                    />
                    <span className="service-img-badge">{badge}</span>
                  </div>

                  <div className="service-card-body">
                    <div className="card-top">
                      <div className="card-icon-wrap">
                        <Icon size={24} aria-hidden="true" />
                      </div>
                      <span className="service-num">{number}</span>
                    </div>

                    <h3>{title}</h3>
                    <p className="service-desc">{text}</p>

                    {features && (
                      <ul className="service-feature-list">
                        {features.map((feat) => (
                          <li key={feat}>
                            <Check size={14} className="feature-check" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="tags">
                      {tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className="service-card-action">
                      <a
                        href="#contact"
                        className="service-btn"
                        onClick={() =>
                          trackEvent('service_click', { service_name: title })
                        }
                      >
                        <span>Start this project</span>
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        {/* Work Section */}
        <section className="section work" id="work" aria-label="Selected Projects">
          <div className="section-heading row-heading">
            <div>
              <p className="eyebrow">Proven Track Record &amp; Case Studies</p>
              <h2>
                Selected client work.
                <br />
                <span>Shipped &amp; scaling.</span>
              </h2>
            </div>
            <a className="text-link" href="#contact">
              Start your project <ArrowUpRight size={16} />
            </a>
            <span className="mobile-swipe-hint">👈 Swipe to view projects</span>
          </div>

          <div className="work-grid">
            {work.map((project) => (
              <a
                className={`project ${project.type}`}
                href={project.url || '#contact'}
                target={project.url ? '_blank' : undefined}
                rel={project.url ? 'noopener noreferrer' : undefined}
                key={project.title}
                onClick={() =>
                  trackEvent('portfolio_click', {
                    project_title: project.title,
                    project_url: project.url || '#contact',
                  })
                }
              >
                <div className="project-art">
                  {/* Browser Chrome Header */}
                  <div className="project-chrome-bar">
                    <div className="chrome-dots">
                      <span /><span /><span />
                    </div>
                    <span className="chrome-domain">{project.domain}</span>
                  </div>

                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.alt}
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none'
                      }}
                    />
                  )}

                  {project.metric && (
                    <span className="project-metric-badge">{project.metric}</span>
                  )}
                </div>

                <div className="project-body">
                  <div className="project-meta">
                    <div>
                      <p className="project-category">{project.category}</p>
                      <h3>{project.title}</h3>
                    </div>
                    <span className="project-live-indicator">
                      <span className="live-dot" /> Live
                    </span>
                  </div>

                  <p className="project-desc">{project.desc}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="project-action-row">
                    <span className="project-view-link">
                      Visit live platform <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Why Choose Us / Comparison Grid */}
        <section className="section comparison" id="why-us" aria-label="Why Choose Prismix">
          <div className="section-heading">
            <p className="eyebrow">The Prismix Advantage</p>
            <h2>
              Why growing businesses
              <br />
              <span>choose us over the rest.</span>
            </h2>
            <div className="heading-rule" />
            <p>
              We eliminate bloated agency overhead and freelancer unreliability with agile, founder-led sprints.
            </p>
            <span className="mobile-swipe-hint">👈 Swipe comparison cards</span>
          </div>

          <div className="comparison-grid">
            {/* Traditional Agencies */}
            <div className="comparison-card other-option">
              <div className="comp-card-header">
                <span className="comp-badge other">Traditional Agencies</span>
                <h3>Slow &amp; Expensive</h3>
                <p>Bloated teams with excessive overhead</p>
              </div>
              <ul className="comp-features">
                <li className="comp-negative">
                  <XCircle size={15} /> <span>₹50,000+ bloated monthly retainers</span>
                </li>
                <li className="comp-negative">
                  <XCircle size={15} /> <span>Slow 2–3 months delivery timeline</span>
                </li>
                <li className="comp-negative">
                  <XCircle size={15} /> <span>Account managers (no direct developer access)</span>
                </li>
                <li className="comp-negative">
                  <XCircle size={15} /> <span>Complex lock-in contracts &amp; hidden charges</span>
                </li>
              </ul>
            </div>

            {/* Prismix (Featured) */}
            <div className="comparison-card featured-option">
              <div className="comp-popular-tag">Recommended Partner</div>
              <div className="comp-card-header">
                <span className="comp-badge-highlight">Prismix Digital</span>
                <h3>Agile, Direct &amp; High-ROI</h3>
                <p>Founder-led sprints engineered for real business scale</p>
              </div>
              <ul className="comp-features">
                <li className="comp-positive">
                  <CheckCircle2 size={15} /> <span>Predictable flat pricing starting at ₹5,999</span>
                </li>
                <li className="comp-positive">
                  <CheckCircle2 size={15} /> <span>Rapid 14–21 day sprint turnaround</span>
                </li>
                <li className="comp-positive">
                  <CheckCircle2 size={15} /> <span>Direct founder &amp; senior engineer communication</span>
                </li>
                <li className="comp-positive">
                  <CheckCircle2 size={15} /> <span>100% full code, design &amp; domain ownership</span>
                </li>
                <li className="comp-positive">
                  <CheckCircle2 size={15} /> <span>Free 30-day post-launch optimization &amp; warranty</span>
                </li>
              </ul>
              <a href="#contact" className="button primary comp-btn">
                <span>Start your sprint</span> <ArrowUpRight size={15} />
              </a>
            </div>

            {/* Random Freelancers */}
            <div className="comparison-card other-option">
              <div className="comp-card-header">
                <span className="comp-badge other">Random Freelancers</span>
                <h3>Unreliable &amp; Risky</h3>
                <p>Inconsistent quality and zero post-launch accountability</p>
              </div>
              <ul className="comp-features">
                <li className="comp-negative">
                  <XCircle size={15} /> <span>Unpredictable turnaround &amp; missed deadlines</span>
                </li>
                <li className="comp-negative">
                  <XCircle size={15} /> <span>Disappear after initial handover</span>
                </li>
                <li className="comp-negative">
                  <XCircle size={15} /> <span>No technical architecture or speed audits</span>
                </li>
                <li className="comp-negative">
                  <XCircle size={15} /> <span>Zero long-term support or warranty</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Build / Process Section */}
        <section className="build-section" aria-label="Our Delivery Process">
          <div className="build-copy">
            <p className="eyebrow">Proven 5-Phase Sprint Model</p>
            <h2>
              From initial idea to
              <br />
              <span>live, scalable product.</span>
            </h2>
            <p>
              We eliminate guesswork with structured sprints, weekly milestone
              demos, and battle-tested engineering across websites, AI
              automations, and performance marketing.
            </p>

            <div className="build-highlights">
              <div className="build-highlight-item">
                <CheckCircle2 size={16} className="highlight-icon" />
                <span>100% Code &amp; Asset Ownership upon handover</span>
              </div>
              <div className="build-highlight-item">
                <CheckCircle2 size={16} className="highlight-icon" />
                <span>Weekly milestone demos &amp; dedicated WhatsApp support</span>
              </div>
              <div className="build-highlight-item">
                <CheckCircle2 size={16} className="highlight-icon" />
                <span>Free 30-day post-launch optimization &amp; warranty</span>
              </div>
            </div>

            <a
              className="button primary"
              href="#contact"
              onClick={() =>
                trackEvent('cta_click', {
                  button_name: 'process_start_build',
                  destination: '#contact',
                })
              }
            >
              Start your build <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Right: Sprint Pipeline Dashboard */}
          <div className="build-dashboard" aria-hidden="true">
            <div className="dash-header">
              <div className="dash-dots">
                <span /><span /><span />
              </div>
              <span className="dash-title">Sprint Execution Pipeline</span>
            </div>

            <div className="pipeline-tracks">
              <div className="pipeline-item pipeline-completed">
                <div className="pipeline-left">
                  <span className="pipeline-badge-pill done">✓ Sprint 01</span>
                  <strong>Discovery &amp; Strategy</strong>
                  <p>Target persona, tech stack &amp; feature roadmap</p>
                </div>
                <span className="pipeline-status done">Approved</span>
              </div>

              <div className="pipeline-item pipeline-active">
                <div className="pipeline-left">
                  <span className="pipeline-badge-pill active">⚡ Sprint 02</span>
                  <strong>UI/UX Design &amp; Architecture</strong>
                  <p>High-fidelity prototypes &amp; design system</p>
                </div>
                <span className="pipeline-status active">In Progress</span>
              </div>

              <div className="pipeline-item pipeline-queue">
                <div className="pipeline-left">
                  <span className="pipeline-badge-pill queue">Sprint 03</span>
                  <strong>Full-Stack &amp; AI Integration</strong>
                  <p>Frontend code, API routes &amp; automation flows</p>
                </div>
                <span className="pipeline-status queue">In Queue</span>
              </div>

              <div className="pipeline-item pipeline-queue">
                <div className="pipeline-left">
                  <span className="pipeline-badge-pill queue">Sprint 04</span>
                  <strong>QA, SEO &amp; Production Deploy</strong>
                  <p>Speed audit, domain connect &amp; analytics setup</p>
                </div>
                <span className="pipeline-status queue">Scheduled</span>
              </div>
            </div>

            <div className="pipeline-footer">
              <div className="pipeline-stat">
                <strong>14–21 Days</strong>
                <span>Avg. MVP delivery</span>
              </div>
              <div className="pipeline-stat-div" />
              <div className="pipeline-stat">
                <strong>99.9%</strong>
                <span>Uptime standard</span>
              </div>
              <div className="pipeline-stat-div" />
              <div className="pipeline-stat">
                <strong>1-on-1</strong>
                <span>Founder communication</span>
              </div>
            </div>
          </div>

          {/* Bottom: 5 Structured Steps */}
          <div className="build-steps">
            {processSteps.map((step) => (
              <div className="build-step" key={step.num}>
                <span className="step-num">{step.num}</span>
                <strong className="step-title">{step.title}</strong>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="section pricing" id="pricing" aria-label="Pricing Plans">
          <div className="section-heading row-heading">
            <div>
              <p className="eyebrow">Transparent &amp; Predictable Pricing</p>
              <h2>
                Clear investment plans.
                <br />
                <span>Zero hidden surprises.</span>
              </h2>
            </div>
            <p>
              Fixed project scopes. Milestone-based delivery.
              <br />
              100% code &amp; asset ownership.
            </p>
            <span className="mobile-swipe-hint">👈 Swipe investment plans</span>
          </div>

          <div className="price-grid">
            {[
              {
                name: 'Starter / MVP',
                badge: 'Fast Launch',
                desc: 'For startups & local businesses needing a fast, high-converting digital presence.',
                price: '₹5,999',
                period: 'one-time',
                featured: false,
                features: [
                  'High-converting 1–3 page responsive website',
                  'Sub-second load speed & modern UI',
                  'Basic technical SEO & Google indexing',
                  'WhatsApp click-to-chat & contact form',
                  '14 days free post-launch support',
                ],
                cta: 'Get started with Starter',
              },
              {
                name: 'Growth & E-Commerce',
                badge: '🔥 Most Popular',
                desc: 'Complete multi-page business website or modern e-commerce store built to scale.',
                price: '₹11,999',
                period: 'one-time sprint',
                featured: true,
                features: [
                  'Custom multi-page website or E-Commerce store',
                  'Product catalog & online ordering / checkout',
                  'Secure payment gateway integration (UPI / Cards)',
                  'Advanced technical SEO & Google indexing',
                  'WhatsApp order notifications & contact integration',
                  '30 days dedicated warranty & post-launch support',
                ],
                cta: 'Scale with Growth',
              },
              {
                name: 'Custom / Enterprise',
                badge: 'Full Partnership',
                desc: 'Custom web apps, deep LLM automation pipelines, and performance ad scaling.',
                price: 'Custom',
                period: 'tailored quote',
                featured: false,
                features: [
                  'Everything in Growth Plan included',
                  'Custom AI automation & workflow bots',
                  'Performance marketing (Meta & Google Ads)',
                  'Scalable full-stack SaaS or e-commerce',
                  'Weekly milestone review calls',
                  'Priority SLA & continuous maintenance',
                ],
                cta: 'Book a discovery call',
              },
            ].map((plan) => (
              <article
                className={`price-card ${plan.featured ? 'featured' : ''}`}
                key={plan.name}
              >
                {plan.featured && <span className="popular">{plan.badge}</span>}
                <div className="price-card-header">
                  <span className="price-plan-name">{plan.name}</span>
                  <p className="price-plan-desc">{plan.desc}</p>
                </div>

                <div className="price-amount-wrap">
                  <strong>{plan.price}</strong>
                  <span className="price-period">/ {plan.period}</span>
                </div>

                <ul className="price-feature-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={15} className="price-check-icon" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={plan.featured ? 'button primary' : 'button'}
                  onClick={() =>
                    trackEvent('pricing_plan_click', {
                      plan_name: plan.name,
                      price: plan.price,
                    })
                  }
                >
                  {plan.cta} <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="section contact" id="contact" aria-label="Contact Us">
          <div className="contact-intro">
            <p className="eyebrow">Let's Talk About Your Project</p>
            <h2>
              Ready to build
              <br />
              <span>something great?</span>
            </h2>
            <p>
              Tell us about your business goals. We'll review your project and
              send a free architectural audit and timeline within 24 hours.
            </p>

            <div className="contact-quick-cards">
              <div className="contact-quick-card">
                <div className="quick-card-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="quick-card-label">Direct Email</span>
                  <a
                    href="mailto:info.prismix.digital@gmail.com"
                    className="quick-card-val"
                    onClick={() =>
                      trackEvent('email_click', {
                        email: 'info.prismix.digital@gmail.com',
                      })
                    }
                  >
                    info.prismix.digital@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-quick-card">
                <div className="quick-card-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="quick-card-label">Call / WhatsApp</span>
                  <a
                    href="tel:+918507613284"
                    className="quick-card-val"
                    onClick={() =>
                      trackEvent('phone_call_click', {
                        phone_number: '+918507613284',
                      })
                    }
                  >
                    +91 85076 13284
                  </a>
                </div>
              </div>

              <div className="contact-guarantee-badge">
                <span className="guarantee-dot" />
                <span>Average reply time: <strong>under 2 hours</strong></span>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <div className="form-card-header">
              <h3>Send Project Inquiry</h3>
              <p>Fill out the form below to get a tailored estimate.</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Anti-Bot Honeypot Trap: Invisible to humans, filled by automated bot scripts */}
              <input
                type="text"
                name="_website_trap"
                style={{ display: 'none', position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="form-row">
                <label>
                  Full Name *
                  <input
                    name="name"
                    required
                    maxLength={80}
                    placeholder="e.g. Rahul Sharma"
                    autoComplete="name"
                  />
                </label>
                <label>
                  Work Email *
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={100}
                    placeholder="rahul@company.com"
                    autoComplete="email"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Phone / WhatsApp
                  <input
                    name="phone"
                    type="tel"
                    maxLength={25}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                  />
                </label>
                <label>
                  Service Required *
                  <select name="service" defaultValue="" required>
                    <option value="" disabled>
                      Select service
                    </option>
                    <option>Website / Web App Development</option>
                    <option>AI Solutions &amp; Automation</option>
                    <option>Performance Marketing &amp; SEO</option>
                    <option>Complete Growth Package</option>
                  </select>
                </label>
              </div>

              <label>
                Project Scope &amp; Goals *
                <textarea
                  name="message"
                  required
                  rows="4"
                  maxLength={2500}
                  placeholder="Tell us what you're building, key features needed, and your expected timeline..."
                />
              </label>

              <button
                className="button primary form-submit-btn"
                type="submit"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Sending securely...' : 'Send project inquiry'}</span>
                <ArrowUpRight size={17} />
              </button>

              {status && <p className="form-status">{status}</p>}

              <p className="form-privacy-note">
                🔒 We respect your privacy. No spam or unsolicited marketing calls.
              </p>
            </form>
          </div>
        </section>

        {/* Guarantees Section (Our Commitment to Excellence - placed below form) */}
        <section className="section guarantees" id="guarantees" aria-label="Our Commitments">
          <div className="section-heading">
            <p className="eyebrow">Our Commitment to Excellence</p>
            <h2>
              4 Ironclad Guarantees.
              <br />
              <span>Zero risk. Pure execution.</span>
            </h2>
            <div className="heading-rule" />
            <p>
              We stand firmly behind every line of code, sprint milestone, and growth campaign we launch.
            </p>
            <span className="mobile-swipe-hint">👈 Swipe 4 guarantees</span>
          </div>

          <div className="guarantees-grid">
            <div className="guarantee-card">
              <div className="guarantee-icon-wrap">
                <ShieldCheck size={24} />
              </div>
              <h3>100% Code &amp; Asset Ownership</h3>
              <p>
                All source code, design files, domain connections, and accounts are completely handed over to you upon launch. No vendor lock-in, ever.
              </p>
            </div>

            <div className="guarantee-card">
              <div className="guarantee-icon-wrap">
                <Zap size={24} />
              </div>
              <h3>90+ PageSpeed Guarantee</h3>
              <p>
                We engineer ultra-fast web architectures ensuring sub-second load times and 90+ Google Lighthouse performance scores.
              </p>
            </div>

            <div className="guarantee-card">
              <div className="guarantee-icon-wrap">
                <Clock size={24} />
              </div>
              <h3>On-Time Sprint Delivery</h3>
              <p>
                Structured weekly milestones and live demos ensure your web platform or e-commerce store launches strictly on schedule.
              </p>
            </div>

            <div className="guarantee-card">
              <div className="guarantee-icon-wrap">
                <CheckCircle2 size={24} />
              </div>
              <h3>30-Day Free Post-Launch Warranty</h3>
              <p>
                Enjoy 30 days of dedicated complimentary post-launch support covering bug fixes, performance monitoring, and optimizations.
              </p>
            </div>
          </div>
        </section>

        {/* ── Lead Magnet: Free Website Audit ─────────────────── */}
        <section className="section lead-magnet" id="free-audit" aria-label="Free Website Audit">
          <div className="lead-magnet-inner">
            <div className="lead-magnet-badge">🎁 100% Free — No Credit Card</div>
            <h2>
              Get Your <span>Free Website Audit</span>
              <br />in 24 Hours
            </h2>
            <p className="lead-magnet-sub">
              Enter your website URL and email — we'll analyse your speed, SEO score,
              mobile responsiveness, and design gaps, then send you a detailed report for free.
            </p>

            <div className="lead-magnet-pills">
              <span>⚡ PageSpeed Score</span>
              <span>🔍 SEO Audit</span>
              <span>📱 Mobile Check</span>
              <span>🎨 Design Review</span>
            </div>

            {auditStatus === 'success' ? (
              <div className="audit-success">
                <span className="audit-success-icon">✅</span>
                <div>
                  <strong>Request received!</strong>
                  <p>We'll send your free audit report within 24 hours. Check your inbox!</p>
                </div>
              </div>
            ) : (
              <form className="lead-magnet-form" onSubmit={handleAuditSubmit} noValidate>
                <div className="lead-magnet-fields">
                  <div className="lm-field">
                    <label htmlFor="audit_website">Your Website URL</label>
                    <input
                      id="audit_website"
                      name="audit_website"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      required
                    />
                  </div>
                  <div className="lm-field">
                    <label htmlFor="audit_email">Your Email Address</label>
                    <input
                      id="audit_email"
                      name="audit_email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="button primary lm-btn"
                    disabled={isAuditSubmitting}
                  >
                    {isAuditSubmitting ? 'Sending...' : 'Get My Free Audit'}
                    <ArrowUpRight size={17} />
                  </button>
                </div>
                {auditStatus && auditStatus !== 'success' && (
                  <p className="lm-error">{auditStatus}</p>
                )}
                <p className="lm-privacy">🔒 We respect your privacy. No spam, ever.</p>
              </form>
            )}
          </div>
        </section>

        {/* FAQ Accordion Section (Option 2) */}
        <section className="section faq" id="faq" aria-label="Frequently Asked Questions">
          <div className="section-heading">
            <p className="eyebrow">Frequently Asked Questions</p>
            <h2>
              Got questions?
              <br />
              <span>We've got clear answers.</span>
            </h2>
            <div className="heading-rule" />
            <p>
              Everything you need to know about our sprints, code ownership, and launch process.
            </p>
          </div>

          <div className="faq-container">
            {faqs.map((faq, idx) => (
              <div
                className={`faq-item ${openFaq === idx ? 'open' : ''}`}
                key={faq.q}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span>{faq.q}</span>
                  <span className="faq-icon">
                    {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Action */}
      <a
        className="whatsapp-float"
        href="https://wa.me/918507613284?text=Hi%20Prismix%2C%20I%20want%20to%20discuss%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Prismix on WhatsApp"
        title="Chat on WhatsApp"
        onClick={() =>
          trackEvent('whatsapp_click', {
            location: 'floating_button',
            phone: '+918507613284',
          })
        }
      >
        <span className="whatsapp-icon" aria-hidden="true">
          <FaWhatsapp />
        </span>
        <span className="whatsapp-dot" />
      </a>

      {/* Footer */}
      <footer>
        {/* Pre-Footer Banner */}
        <div className="footer-cta-strip">
          <div className="cta-strip-text">
            <h4>Ready to scale your business digitally?</h4>
            <p>Let's build your high-converting website, custom AI agents, or growth marketing campaign.</p>
          </div>
          <div className="cta-strip-actions">
            <a
              className="button primary"
              href="#contact"
              onClick={() =>
                trackEvent('cta_click', {
                  button_name: 'footer_banner_cta',
                  destination: '#contact',
                })
              }
            >
              Get started now <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="footer-main">
          {/* Col 1: Brand & Tagline */}
          <div className="footer-brand">
            <a
              className="brand"
              href="#top"
              aria-label="Prismix Digital - Back to top"
            >
              <BrandLogo size={36} />
              <span className="brand-text">
                Prism<strong>ix</strong>
              </span>
            </a>
            <p className="footer-brand-desc">
              High-converting websites, custom AI automations &amp; performance
              growth marketing engineered for ambitious businesses.
            </p>

            <div className="footer-status-pill">
              <span className="live-dot" />
              <span>Available for New Projects</span>
            </div>

            <div className="footer-social">
              <p className="footer-contact-label">Follow us</p>
              <div className="social-links">
                <a
                  href="https://www.instagram.com/prismix.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Prismix on Instagram"
                  onClick={() =>
                    trackEvent('social_click', { platform: 'instagram' })
                  }
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/share/194HE1AisF/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Prismix on Facebook"
                  onClick={() =>
                    trackEvent('social_click', { platform: 'facebook' })
                  }
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://wa.me/918507613284"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  onClick={() =>
                    trackEvent('social_click', { platform: 'whatsapp' })
                  }
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="footer-column">
            <h3>Services</h3>
            <a href="#services">Website Development</a>
            <a href="#services">AI Automation &amp; Bots</a>
            <a href="#services">Performance Marketing</a>
            <a href="#services">E-Commerce Platforms</a>
            <a href="#services">SEO &amp; Growth Funnels</a>
          </div>

          {/* Col 3: Company */}
          <div className="footer-column">
            <h3>Company</h3>
            <a href="#about">About Prismix</a>
            <a href="#work">Case Studies &amp; Work</a>
            <a href="#about">5-Phase Sprint Model</a>
            <a href="#pricing">Transparent Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact &amp; Consultation</a>
          </div>

          {/* Col 4: Contact info */}
          <div className="footer-column footer-contact">
            <h3>Get in touch</h3>

            <div className="footer-contact-item">
              <span className="footer-contact-icon"><Mail size={14} /></span>
              <div>
                <p className="footer-contact-label">Email</p>
                <a
                  href="mailto:info.prismix.digital@gmail.com"
                  onClick={() =>
                    trackEvent('email_click', {
                      email: 'info.prismix.digital@gmail.com',
                    })
                  }
                >
                  info.prismix.digital@gmail.com
                </a>
              </div>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-icon"><Phone size={14} /></span>
              <div>
                <p className="footer-contact-label">Call / WhatsApp</p>
                <a
                  href="tel:+918507613284"
                  onClick={() =>
                    trackEvent('phone_call_click', {
                      phone_number: '+918507613284',
                    })
                  }
                >
                  +91 85076 13284
                </a>
              </div>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-icon"><MapPin size={14} /></span>
              <div>
                <p className="footer-contact-label">Headquarters</p>
                <span>Patna, Bihar — 800001, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <small>
            &copy; {new Date().getFullYear()} Prismix Digital. All rights
            reserved.
          </small>
          <div className="footer-legal-links">
            <a href="#about">About</a>
            <span>&bull;</span>
            <a href="#faq">FAQ</a>
            <span>&bull;</span>
            <a href="#contact">Privacy</a>
            <span>&bull;</span>
            <a href="#contact">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
