import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Contact from './Contact.jsx'
import Chatbot from './Chatbot.jsx'
import { services } from './content.js'
import './index.css'

const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About us' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'faqs', label: 'FAQs' },
]

const collage = [
  [
    { photo: 'dev', label: 'WEB DEVELOPMENT', text: 'Build for the web' },
    { photo: 'travel', label: 'UI/UX DESIGN', text: 'Make it intuitive' },
    { photo: 'studio', label: 'CANVA DESIGN', text: 'Make it yours', light: true },
  ],
  [
    { photo: 'architecture', label: 'DIGITAL SOLUTIONS', text: 'Ideas into action', light: true },
    { photo: 'retail', label: 'GRAPHIC DESIGN', text: 'Give ideas a look' },
    { photo: 'dev', label: 'MOBILE APPLICATIONS', text: 'Design for mobile' },
  ],
]

const portfolio = [
  {
    image: 'retail.jpg',
    alt: 'Clothing displayed in a retail store',
    category: 'Retail websites',
    title: 'Bring your products online.',
    description: 'Clear, inviting digital experiences for shops and growing brands.',
  },
  {
    image: 'architecture.jpg',
    alt: 'Contemporary home surrounded by trees',
    category: 'Business websites',
    title: 'Showcase what you do.',
    description: 'Professional websites that help businesses present their work and services.',
  },
  {
    image: 'travel.jpg',
    alt: 'Sunlight falling through a forest',
    category: 'Travel experiences',
    title: 'Make exploring easy.',
    description: 'Thoughtful layouts for destinations, experiences, and travel services.',
  },
]

const faqs = [
  {
    question: 'What services does ORAYEN provide?',
    answer: 'We offer Web Development, Mobile Application Development, UI/UX Design, Graphic Design, and Canva Design.',
  },
  {
    question: 'How do you estimate project costs?',
    answer: 'Project costs depend on the services, features, and scope you need. Share your estimated budget in the enquiry form, or choose “Not sure yet”, and we can discuss a quote tailored to your project.',
  },
  {
    question: 'How long does a project take?',
    answer: 'Timelines depend on the project scope and requirements. Once we learn more about your project, we can discuss an estimated schedule and next steps.',
  },
  {
    question: 'How do I get started?',
    answer: 'Complete the contact form with your project details and the service you are interested in. We will follow up using your preferred contact method.',
  },
  {
    question: 'Can I discuss my project online?',
    answer: 'Yes. Select Online Meeting as your preferred meeting option in the contact form.',
  },
]

function asset(name) {
  return `./assets/${name}`
}

function Logo({ width, height }) {
  return (
    <a className="inline-flex shrink-0 items-center" href="#home" aria-label="ORAYEN home">
      <img src={asset('orayen-wordmark.png')} alt="ORAYEN" width={width} height={height} />
    </a>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef(null)

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 720px)')
    const closeMenu = () => setMenuOpen(false)
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        closeMenu()
        menuButton.current?.focus()
      }
    }

    mobileQuery.addEventListener('change', closeMenu)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      mobileQuery.removeEventListener('change', closeMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  return (
    <header className="site-header">
      <Logo width={148} height={41} />
      <button
        ref={menuButton}
        className="menu-toggle"
        type="button"
        aria-controls="site-nav"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        Menu
      </button>
      <nav id="site-nav" aria-label="Main navigation">
        {navigation.map(({ id, label }) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a className="mobile-contact" href="#contact" onClick={() => setMenuOpen(false)}>Contact us</a>
      </nav>
      <a className="button button-white header-contact" href="#contact">
        Contact us <span aria-hidden="true">→</span>
      </a>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-heading">
      <div className="hero-art" aria-hidden="true">
        <div className="collage">
          {collage.map((column) => (
            <div className="collage-column" key={column[0].label}>
              {column.map(({ photo, label, text, light }) => (
                <div className={`mini-site photo-${photo}${light ? ' mini-light' : ''}`} key={label}>
                  <div className="mini-bar">{label}<span>ORAYEN</span></div>
                  <div className="mini-content">{text}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="wrap">
        <p className="eyebrow hero-kicker"><span className="signal" aria-hidden="true" /> Technology &amp; Digital Solutions</p>
        <h1 id="hero-heading">Build your next<br /> <em>digital experience.</em></h1>
        <p className="hero-summary">ORAYEN creates websites, mobile apps, and designs for businesses and individuals from our base in Sri Lanka.</p>
        <div className="actions">
          <a className="button button-white" href="#contact">Start a project <span className="circle-arrow" aria-hidden="true">→</span></a>
          <a className="hero-link" href="#services">Explore our services <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <a className="scroll-link" href="#about">About ORAYEN <span aria-hidden="true">↓</span></a>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="wrap about-grid">
        <div className="about-photo">
          <img src={asset('studio.jpg')} width="1100" height="734" alt="A bright collaborative workspace" loading="lazy" />
          <div className="photo-label"><span className="signal" aria-hidden="true" /> Based in Sri Lanka</div>
        </div>
        <div>
          <p className="eyebrow">About ORAYEN</p>
          <h2 id="about-heading">Technology &amp; Digital Solutions</h2>
          <p className="body-copy">ORAYEN is a Sri Lanka–based company delivering modern, creative, and reliable digital solutions for businesses and individuals.</p>
          <p className="body-copy">Our goal is to help businesses grow through innovative technology, professional design, and exceptional digital experiences.</p>
          <a className="text-link mt-5" href="#services">Explore our services <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  )
}

function Services({ onSelectService }) {
  return (
    <section id="services" className="section section-soft" aria-labelledby="services-heading">
      <div className="wrap">
        <div className="section-header">
          <div><p className="eyebrow">Our services</p><h2 id="services-heading">What we can build and design for you.</h2></div>
          <p className="body-copy">Choose a service to start your project enquiry.</p>
        </div>
        <div className="cards">
          {services.map(({ title, icon, description }) => (
            <article className="card" key={title}>
              <span className="service-icon" aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <a className="text-link" href="#contact" aria-label={`Enquire about ${title}`} onClick={() => onSelectService(title)}>
                Enquire about this service <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Portfolio() {
  return (
    <section id="portfolio" className="section section-soft" aria-labelledby="portfolio-heading">
      <div className="wrap">
        <div className="section-header">
          <div><p className="eyebrow">Portfolio</p><h2 id="portfolio-heading">A glimpse of what we can create.</h2></div>
          <p className="body-copy">Explore a few of the digital experiences we can shape around your goals.</p>
        </div>
        <div className="portfolio-grid">
          {portfolio.map(({ image, alt, category, title, description }) => (
            <article className="portfolio-card" key={category}>
              <img src={asset(image)} alt={alt} width="960" height="640" loading="lazy" />
              <div className="portfolio-copy">
                <p className="eyebrow">{category}</p><h3>{title}</h3><p className="body-copy">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQs() {
  return (
    <section id="faqs" className="section section-soft" aria-labelledby="faqs-heading">
      <div className="wrap">
        <div className="section-header">
          <div><p className="eyebrow">FAQs</p><h2 id="faqs-heading">Answers to common questions.</h2></div>
          <p className="body-copy">Learn what to expect when planning a project with ORAYEN.</p>
        </div>
        <div className="faq-list">
          {faqs.map(({ question, answer }) => (
            <details className="faq-item" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer({ onSelectService }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-cta">
          <div>
            <p className="footer-kicker">Your next chapter starts here</p>
            <h2>Let’s build your digital future.</h2>
          </div>
          <a className="button button-white footer-cta-button" href="#contact">
            Start a Conversation <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Logo width={160} height={44} />
            <p className="footer-description">
              ORAYEN is a Sri Lanka–based technology and digital solutions company delivering modern, creative, and reliable solutions for businesses and individuals. We help businesses grow through innovative technology, professional design, and exceptional digital experiences.
            </p>
            <p className="footer-location">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span>Sri Lanka</span>
            </p>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            <h3>Explore</h3>
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#services">Our Services</a>
            <a href="#faqs">FAQs</a>
            <a href="#contact">Contact Us</a>
          </nav>

          <div className="footer-links">
            <h3>Our Expertise</h3>
            {services.map(({ title }) => (
              <a key={title} href="#contact" onClick={() => onSelectService(title)}>{title}</a>
            ))}
          </div>

          <div className="footer-connect">
            <h3>Let’s Connect</h3>
            <a className="footer-contact-card" href="tel:+94703670956">
              <span className="footer-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M5 3h4l2 5-2.5 1.5a15 15 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" />
                </svg>
              </span>
              <span className="footer-contact-copy">
                <span className="footer-contact-label">Call our team</span>
                <span className="footer-contact-value">070 367 0956</span>
              </span>
            </a>
            <a className="footer-contact-card" href="https://wa.me/94703670956" target="_blank" rel="noopener noreferrer">
              <span className="footer-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M4 20 5.2 16.4A8 8 0 1 1 8 19.3L4 20Z" />
                  <path d="M9 8.5c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.2.2-.2.4-.1.6a7 7 0 0 0 2.7 2.6c.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5 0 .3-.2 1.1-.7 1.5s-1.1.7-1.8.6a8 8 0 0 1-3.4-1.3 9 9 0 0 1-2.8-2.7 7.7 7.7 0 0 1-1.1-2.5c-.1-.8.2-1.5.6-1.7Z" />
                </svg>
              </span>
              <span className="footer-contact-copy">
                <span className="footer-contact-label">Message us</span>
                <span className="footer-contact-value">Chat on WhatsApp <span aria-hidden="true">↗</span></span>
              </span>
            </a>
            <a className="footer-contact-card" href="mailto:orayen.tech@gmail.com">
              <span className="footer-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </span>
              <span className="footer-contact-copy">
                <span className="footer-contact-label">Email enquiries</span>
                <span className="footer-contact-value">orayen.tech@gmail.com</span>
              </span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ORAYEN. All Rights Reserved.</p>
          <p>Built with purpose by ORAYEN</p>
        </div>
      </div>
      <a className="footer-back-to-top" href="#home" aria-label="Back to top">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 14 6-6 6 6M12 8v11" />
        </svg>
      </a>
    </footer>
  )
}

function App() {
  const [selectedService, setSelectedService] = useState('')

  useEffect(() => {
    const stage = document.querySelector('.intro-stage')
    const logo = document.querySelector('.site-header img')
    if (!stage || !logo) return

    const alignIntroLogo = () => {
      const logoBounds = logo.getBoundingClientRect()
      stage.style.setProperty('--nav-logo-width', `${logoBounds.width}px`)
      stage.style.setProperty('--nav-logo-center-x', `${logoBounds.left + logoBounds.width / 2}px`)
      stage.style.setProperty('--nav-logo-center-y', `${logoBounds.top + logoBounds.height / 2}px`)
      stage.style.setProperty('--viewport-center-x', `${document.documentElement.clientWidth / 2}px`)
      stage.style.setProperty('--viewport-center-y', `${document.documentElement.clientHeight / 2}px`)
    }

    alignIntroLogo()
    window.addEventListener('resize', alignIntroLogo)
    return () => window.removeEventListener('resize', alignIntroLogo)
  }, [])

  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1))
    target?.scrollIntoView({ behavior: 'instant' })
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

    const elements = document.querySelectorAll(
      '.section-header, .about-grid > *, .cards > *, .portfolio-card, .faq-item, .contact-grid > *',
    )
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' })

    elements.forEach((element, index) => {
      element.classList.add('reveal-on-scroll')
      element.style.setProperty('--reveal-delay', `${index % 3 * 100}ms`)
      observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services onSelectService={setSelectedService} />
        <Portfolio />
        <Contact service={selectedService} onSelectService={setSelectedService} />
        <FAQs />
      </main>
      <Footer onSelectService={setSelectedService} />
      <Chatbot />
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
