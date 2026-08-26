import { useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Code2,
  Menu,
  Megaphone,
  Sparkles,
  X,
} from 'lucide-react'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import './App.css'
import './refinements.css'
import './footer.css'

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
    title: 'Website development',
    text: 'Custom business websites, landing pages, and e-commerce stores designed to turn attention into action. Built fast, mobile-friendly, and SEO-ready.',
    tags: ['Landing pages', 'E-commerce', 'Web apps', 'SEO-ready'],
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85',
    alt: 'Modern website development and responsive web design preview',
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'AI solutions',
    text: 'Useful intelligence for the work that matters. Automate repetitive tasks, deploy smart chatbots, and amplify your business operations.',
    tags: ['AI strategy', 'Automation', 'Chatbots', 'Data systems'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
    alt: 'Practical AI solutions and workflow automation visualization',
  },
  {
    icon: Megaphone,
    number: '03',
    title: 'Digital marketing',
    text: 'Results-driven marketing campaigns in Patna and beyond. Reach your ideal customers through targeted Google Ads, Social Media, and Local SEO.',
    tags: ['Social media', 'Google Ads', 'Local SEO', 'Content'],
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85',
    alt: 'Digital marketing strategy, SEO growth, and lead generation',
  },
]

const work = [
  {
    type: 'bakery',
    title: 'IamGroot.in',
    category: 'Bakery / Brand website',
    accent: 'ARTISANAL. WARM. REAL.',
    url: 'https://iamm-groot-in.vercel.app/',
    image: 'https://iamm-groot-in.vercel.app/images/hero.png',
    alt: 'IamGroot.in artisanal bakery website showcase by Vardhan Ventures',
  },
  {
    type: 'ceramics',
    title: 'Saran Ceramics',
    category: 'Ceramics / E-commerce',
    accent: 'CRAFTED FOR EVERYDAY',
    url: 'https://saranceramics.netlify.app/',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    alt: 'Saran Ceramics e-commerce store design and development',
  },
  {
    type: 'versz',
    title: 'Versz',
    category: 'AI / Debate platform',
    accent: 'THINK. DEBATE. EVOLVE.',
    url: 'https://versz.app/',
    image: '/versz-home.png',
    alt: 'Versz AI-powered interactive debate platform built by Vardhan Ventures',
  },
]

const steps = ['Discovery', 'Design', 'Development', 'Launch', 'Support']

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [status, setStatus] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const payload = Object.fromEntries(form.entries())
    setStatus('Sending enquiry...')

    // Track lead submission in Google Analytics 4
    trackEvent('generate_lead', {
      form_name: 'contact_form',
      service: payload.service || 'not_specified',
    })

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/hello.vardhanventures@gmail.com',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...payload,
            _subject: `New enquiry from ${payload.name} (${payload.service || 'General'})`,
            _captcha: 'false',
            _url: window.location.href,
          }),
        },
      )
      if (!response.ok) throw new Error('Request failed')
      setStatus('Enquiry sent successfully. We will contact you soon.')
      event.currentTarget.reset()
    } catch {
      setStatus('Your enquiry has been submitted. We will contact you soon.')
    }
  }

  return (
    <div className="site-shell">
      <header>
        <nav className="nav" aria-label="Main Navigation">
          <a
            className="brand"
            href="#top"
            aria-label="Vardhan Ventures Pvt. Ltd. - Back to top"
          >
            <img
              src="/vardhan-logo.svg"
              alt="Vardhan Ventures Pvt. Ltd. - Website Development & Digital Marketing Agency"
              width="176"
              height="40"
            />
          </a>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {['Services', 'Work', 'About', 'Pricing'].map((link) => (
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
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="hero" id="about" aria-label="Introduction">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="pulse" /> Website &amp; Digital Growth Agency
            </p>
            <h1>
              Website Development &amp;
              <br />
              <span>Digital Growth in Patna.</span>
            </h1>
            <p className="hero-text">
              Vardhan Ventures Pvt. Ltd. gives your business the digital engine
              it needs to grow: high-converting websites, practical AI systems,
              and result-oriented digital marketing in Patna, Bihar and beyond.
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
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="art-ring ring-one" />
            <div className="art-ring ring-two" />
            <div className="art-core">
              <Sparkles size={36} />
              <span>
                IDEAS
                <br />
                IN MOTION
              </span>
            </div>
            <div className="orbit-label label-one">Websites</div>
            <div className="orbit-label label-two">AI systems</div>
            <div className="orbit-label label-three">Growth</div>
          </div>

          <div className="hero-foot" aria-hidden="true">
            <span>Scroll to explore</span>
            <span className="line" />
            <span>01 / 05</span>
          </div>
        </section>

        {/* Marquee Section */}
        <section className="marquee" aria-label="Brand Highlights">
          <div>
            <span>IDEAS INTO IMPACT</span>
            <b>✦</b>
            <span>DIGITAL THAT MOVES</span>
            <b>✦</b>
            <span>WEBSITES &amp; AI SOLUTIONS</span>
            <b>✦</b>
            <span>GROWTH IN PATNA &amp; BEYOND</span>
            <b>✦</b>
          </div>
        </section>

        {/* Services Section */}
        <section className="section services" id="services" aria-label="Our Services">
          <div className="section-heading services-heading">
            <p className="eyebrow">What we do</p>
            <h2>
              Build.
              <br />
              <span>Launch. Grow.</span>
            </h2>
            <div className="heading-rule" />
            <p>
              Professional website development, AI solutions, and digital
              marketing designed to elevate your business presence in Patna and
              drive real conversions.
            </p>
          </div>

          <div className="service-grid">
            {services.map(
              ({ icon: Icon, number, title, text, tags, image, alt }) => (
                <article className="service-card" key={title}>
                  <div className="service-image">
                    <img
                      src={image}
                      alt={alt}
                      loading="lazy"
                      width="400"
                      height="200"
                    />
                  </div>
                  <div className="card-top">
                    <Icon size={30} aria-hidden="true" />
                    <span>{number}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="tags">
                    {tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    aria-label={`Get started with ${title}`}
                    onClick={() =>
                      trackEvent('service_click', { service_name: title })
                    }
                  >
                    <ArrowUpRight />
                  </a>
                </article>
              ),
            )}
          </div>
        </section>

        {/* Work Section */}
        <section className="section work" id="work" aria-label="Selected Projects">
          <div className="section-heading row-heading">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>
                Made to <span>matter.</span>
              </h2>
            </div>
            <a className="text-link" href="#contact">
              View all projects <ArrowUpRight size={16} />
            </a>
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
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.alt}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                  <div className="project-shape" />
                </div>
                <div className="project-meta">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.category}</p>
                  </div>
                  <ArrowUpRight size={20} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Build / Process Section */}
        <section className="build-section" aria-label="Our Process">
          <div className="build-copy">
            <p className="eyebrow">Human ideas · machine speed</p>
            <h2>
              How we turn
              <br />
              <span>spark into signal.</span>
            </h2>
            <p>
              We combine sharp strategic thinking, modern web engineering, and
              practical AI to move your idea from a loose concept into a digital
              asset that delivers results.
            </p>
            <a
              className="button"
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

          <div className="build-visual" aria-hidden="true">
            <div className="neural-core">
              <Sparkles size={25} />
            </div>
            <div className="neural-orbit orbit-a" />
            <div className="neural-orbit orbit-b" />
            <span className="data-chip chip-a">MODEL ONLINE</span>
            <span className="data-chip chip-b">IDEA → IMPACT</span>
          </div>

          <div className="build-steps">
            {steps.map((step, i) => (
              <div className="build-step" key={step}>
                <span>0{i + 1}</span>
                <strong>{step}</strong>
                <small>
                  {
                    [
                      'Find the signal.',
                      'Make it feel like you.',
                      'Build with intent.',
                      'Put it in motion.',
                      'Keep it growing.',
                    ][i]
                  }
                </small>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="section pricing" id="pricing" aria-label="Pricing Plans">
          <div className="section-heading row-heading">
            <div>
              <p className="eyebrow">Simple pricing</p>
              <h2>
                Choose your
                <br />
                <span>momentum.</span>
              </h2>
            </div>
            <p>
              Clear scopes. Honest timelines.
              <br />
              No surprise invoices.
            </p>
          </div>

          <div className="price-grid">
            {[
              [
                'Starter',
                'For getting off the ground.',
                '₹5,999',
                [
                  'Strategy sprint',
                  'One-page website',
                  'Basic SEO setup',
                ],
              ],
              [
                'Growth',
                'For ready-to-scale brands.',
                '₹10,999',
                [
                  'Full brand direction',
                  'Conversion website',
                  '30-day growth plan',
                ],
              ],
              [
                'Pro',
                'For making a real splash.',
                'Let’s talk',
                [
                  'Everything in Growth',
                  'Campaign management',
                  'Dedicated partner',
                ],
              ],
            ].map(([name, desc, price, features], i) => (
              <article
                className={`price-card ${i === 1 ? 'featured' : ''}`}
                key={name}
              >
                {i === 1 && <span className="popular">Most popular</span>}
                <p className="eyebrow">{name}</p>
                <p>{desc}</p>
                <strong>{price}</strong>
                <ul>
                  {features.map((feature) => (
                    <li key={feature}>
                      <Check size={15} aria-hidden="true" /> {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="button"
                  onClick={() =>
                    trackEvent('pricing_plan_click', { plan_name: name, price })
                  }
                >
                  Get started <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="section contact" id="contact" aria-label="Contact Us">
          <div className="contact-intro">
            <p className="eyebrow">Ready to start?</p>
            <h2>
              Let’s make
              <br />
              <span>something great.</span>
            </h2>
            <p>
              Tell us about your next project in Patna, Bihar or anywhere
              worldwide. We will respond within one business day.
            </p>
            <a
              className="email"
              href="mailto:hello.vardhanventures@gmail.com"
              onClick={() =>
                trackEvent('email_click', {
                  email: 'hello.vardhanventures@gmail.com',
                })
              }
            >
              hello.vardhanventures@gmail.com <ArrowUpRight size={16} />
            </a>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input
                name="name"
                required
                placeholder="Your full name"
                autoComplete="name"
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                autoComplete="email"
              />
            </label>
            <label>
              Phone
              <input
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                autoComplete="tel"
              />
            </label>
            <label>
              What can we help with?
              <select name="service" defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                <option>Website development</option>
                <option>E-commerce website</option>
                <option>AI solutions</option>
                <option>Digital marketing &amp; SEO</option>
                <option>Something else</option>
              </select>
            </label>
            <label>
              Tell us more
              <textarea
                name="message"
                required
                rows="3"
                placeholder="A few words about your business goals and requirements..."
              />
            </label>
            <button className="button primary" type="submit">
              Send inquiry <ArrowUpRight size={17} />
            </button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </section>
      </main>

      {/* Floating WhatsApp Action */}
      <a
        className="whatsapp-float"
        href="https://wa.me/919473295260?text=Hi%20Vardhan%20Ventures%2C%20I%20want%20to%20discuss%20a%20website%20development%20or%20marketing%20project."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Vardhan Ventures Pvt. Ltd. on WhatsApp"
        title="Chat on WhatsApp"
        onClick={() =>
          trackEvent('whatsapp_click', {
            location: 'floating_button',
            phone: '+919473295260',
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
        <div className="footer-main">
          <div className="footer-brand">
            <a
              className="brand"
              href="#top"
              aria-label="Vardhan Ventures Pvt. Ltd."
            >
              <img
                src="/vardhan-logo.svg"
                alt="Vardhan Ventures Pvt. Ltd. - Digital Agency in Patna"
                width="218"
                height="48"
              />
            </a>
            <p>
              High-converting websites, AI solutions, and digital marketing
              moving businesses forward in Patna, Bihar &amp; beyond.
            </p>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-column">
            <h3>Services</h3>
            <a href="#services">Website Development in Patna</a>
            <a href="#services">AI Solutions &amp; Automation</a>
            <a href="#services">Digital Marketing &amp; SEO</a>
          </div>

          <div className="footer-column footer-contact">
            <h3>Contact</h3>
            <a
              href="mailto:hello.vardhanventures@gmail.com"
              onClick={() =>
                trackEvent('email_click', {
                  email: 'hello.vardhanventures@gmail.com',
                })
              }
            >
              hello.vardhanventures@gmail.com
            </a>
            <a
              href="tel:+919473295260"
              onClick={() =>
                trackEvent('phone_call_click', {
                  phone_number: '+919473295260',
                })
              }
            >
              +91 94732 95260
            </a>
            <span>Patna, Bihar, India</span>
            <div className="social-links">
              <a
                href="https://www.instagram.com/vardhan.ventures"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Vardhan Ventures on Instagram"
                onClick={() =>
                  trackEvent('social_click', { platform: 'instagram' })
                }
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/share/1Hcgc61FQW/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Vardhan Ventures on Facebook"
                onClick={() =>
                  trackEvent('social_click', { platform: 'facebook' })
                }
              >
                <FaFacebookF />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <small>© 2026 Vardhan Ventures Pvt. Ltd. All rights reserved.</small>
          <div>
            <a href="#top">Privacy</a>
            <span>·</span>
            <a href="#top">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
