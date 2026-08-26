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

const services = [
  {
    icon: Code2,
    number: '01',
    title: 'Website development',
    text: 'Digital homes that turn attention into action. Built fast, built to last.',
    tags: ['Landing pages', 'E-commerce', 'Web apps', 'SEO-ready'],
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85',
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'AI solutions',
    text: 'Useful intelligence for the work that matters. Automate the ordinary, amplify the ambitious.',
    tags: ['AI strategy', 'Automation', 'Chatbots', 'Data systems'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
  },
  {
    icon: Megaphone,
    number: '03',
    title: 'Digital marketing',
    text: 'Campaigns with a pulse. Reach the right people, then give them a reason to stay.',
    tags: ['Social media', 'Google Ads', 'SEO', 'Content'],
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85',
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
  },
  {
    type: 'ceramics',
    title: 'Saran Ceramics',
    category: 'Ceramics / E-commerce',
    accent: 'CRAFTED FOR EVERYDAY',
    url: 'https://saranceramics.netlify.app/',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    type: 'versz',
    title: 'Versz',
    category: 'AI / Debate platform',
    accent: 'THINK. DEBATE. EVOLVE.',
    url: 'https://versz.app/',
    image: '/versz-home.png',
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
            _subject: `New enquiry from ${payload.name}`,
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
      <nav className="nav">
        <a className="brand" href="#top">
          <img src="/vardhan-logo.svg" alt="Vardhan Ventures" />
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

        <a className="nav-cta" href="#contact">
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

      <main id="top">
        {/* Hero Section */}
        <section className="hero" id="about">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="pulse" /> What we provide
            </p>
            <h1>
              One partner.
              <br />
              <span>Every move.</span>
            </h1>
            <p className="hero-text">
              Vardhan Ventures gives your business the digital engine it needs
              to grow: high-converting websites, practical AI systems, and
              marketing with direction.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">
                Start a project <ArrowUpRight size={17} />
              </a>
              <a className="text-link" href="#services">
                See our services <span>↓</span>
              </a>
            </div>
          </div>

          <div className="hero-art">
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

          <div className="hero-foot">
            <span>Scroll to explore</span>
            <span className="line" />
            <span>01 / 05</span>
          </div>
        </section>

        {/* Marquee Section */}
        <section className="marquee">
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

        {/* Services Section */}
        <section className="section services" id="services">
          <div className="section-heading services-heading">
            <p className="eyebrow">What we do</p>
            <h2>
              Build.
              <br />
              <span>Launch. Grow.</span>
            </h2>
            <div className="heading-rule" />
            <p>
              Websites, AI systems, and marketing built around one goal: moving
              your business forward.
            </p>
          </div>

          <div className="service-grid">
            {services.map(
              ({ icon: Icon, number, title, text, tags, image }) => (
                <article className="service-card" key={title}>
                  <div className="service-image">
                    <img src={image} alt={`${title} visual`} />
                  </div>
                  <div className="card-top">
                    <Icon size={30} />
                    <span>{number}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="tags">
                    {tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a href="#contact" aria-label={`Learn about ${title}`}>
                    <ArrowUpRight />
                  </a>
                </article>
              ),
            )}
          </div>
        </section>

        {/* Work Section */}
        <section className="section work" id="work">
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
                rel={project.url ? 'noreferrer' : undefined}
                key={project.title}
              >
                <div className="project-art">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={`${project.title} homepage preview`}
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
        <section className="build-section">
          <div className="build-copy">
            <p className="eyebrow">Human ideas · machine speed</p>
            <h2>
              How we turn
              <br />
              <span>spark into signal.</span>
            </h2>
            <p>
              We combine sharp thinking, practical AI, and careful execution to
              move your idea from a loose thought to a digital product people
              want to use.
            </p>
            <a className="button" href="#contact">
              Start your build <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="build-visual">
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
        <section className="section pricing" id="pricing">
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
                      <Check size={15} /> {feature}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="button">
                  Get started <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="section contact" id="contact">
          <div className="contact-intro">
            <p className="eyebrow">Have a good one?</p>
            <h2>
              Let’s make
              <br />
              <span>something great.</span>
            </h2>
            <p>
              Tell us a little about what’s next. We’ll get back to you within
              two business days.
            </p>
            <a className="email" href="mailto:hello.vardhanventures@gmail.com">
              hello.vardhanventures@gmail.com <ArrowUpRight size={16} />
            </a>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                required
                placeholder="you@company.com"
              />
            </label>
            <label>
              Phone
              <input
                name="phone"
                type="tel"
                placeholder="+91 00000 00000"
              />
            </label>
            <label>
              What can we help with?
              <select name="service" defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                <option>Website development</option>
                <option>AI solutions</option>
                <option>Digital marketing</option>
                <option>Something else</option>
              </select>
            </label>
            <label>
              Tell us more
              <textarea
                name="message"
                required
                rows="3"
                placeholder="A few words about your project..."
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
        href="https://wa.me/919473295260?text=Hi%20Vardhan%20Ventures%2C%20I%20want%20to%20discuss%20a%20project."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Vardhan Ventures on WhatsApp"
        title="Chat on WhatsApp"
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
            <a className="brand" href="#top">
              <img src="/vardhan-logo.svg" alt="Vardhan Ventures" />
            </a>
            <p>
              Digital experiences that move
              <br />
              businesses forward.
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
            <a href="#services">Website Development</a>
            <a href="#services">AI Solutions</a>
            <a href="#services">Digital Marketing</a>
          </div>

          <div className="footer-column footer-contact">
            <h3>Contact</h3>
            <a href="mailto:hello.vardhanventures@gmail.com">
              hello.vardhanventures@gmail.com
            </a>
            <a href="tel:+919473295260">+91 94732 95260</a>
            <span>Patna, Bihar, India</span>
            <div className="social-links">
              <a
                href="https://www.instagram.com/vardhan.ventures?igsi=aW1oYnNjOTNycmQ2"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/share/1Hcgc61FQW/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <small>© 2026 Vardhan Ventures. All rights reserved.</small>
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
