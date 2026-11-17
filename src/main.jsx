import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Contact from './Contact.jsx'
import { services, technologyStack } from './content.js'
import './index.css'

const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About us' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'pricing', label: 'Pricing' },
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

function Pricing() {
  return (
    <section id="pricing" className="section pricing-section" aria-labelledby="pricing-heading">
      <div className="wrap">
        <div className="pricing-panel">
          <div><p className="eyebrow">Pricing</p><h2 id="pricing-heading">A plan shaped around your project.</h2></div>
          <p>Every project is different, so pricing is based on the services, features, and scope you need. Tell us what you have in mind and we’ll discuss a quote with you.</p>
          <div className="pricing-details">
            <div><strong>Your goals</strong><span>What you want to achieve</span></div>
            <div><strong>Project scope</strong><span>The features and services you need</span></div>
            <div><strong>Next steps</strong><span>A quote tailored to your project</span></div>
          </div>
          <a className="button button-white" href="#contact">Request a quote <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <Logo width={128} height={35} />
        <p>Technology &amp; Digital Solutions<br />Sri Lanka</p>
        <nav aria-label="Footer navigation">
          <a href="#services">Services</a><a href="#portfolio">Portfolio</a><a href="#pricing">Pricing</a><a href="#contact">Contact</a>
        </nav>
        <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
      </div>
      <div className="wrap footer-technology">
        <p className="font-semibold text-white">Technology stack</p>
        <ul className="flex list-none flex-wrap gap-2">
          {technologyStack.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </div>
      <div className="wrap footer-bottom flex flex-wrap justify-between gap-2">
        <p>© 2026 ORAYEN. All Rights Reserved.</p><p>Website under development</p>
      </div>
    </footer>
  )
}

function App() {
  const [selectedService, setSelectedService] = useState('')

  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1))
    target?.scrollIntoView({ behavior: 'instant' })
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

    const elements = document.querySelectorAll(
      '.section-header, .about-grid > *, .cards > *, .portfolio-card, .pricing-panel, .contact-grid > *',
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
        <Pricing />
        <Contact service={selectedService} onSelectService={setSelectedService} />
      </main>
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
