import { ArrowRight, ChevronDown, MapPin, Sparkles, Star, Phone, Instagram, Mail, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { ServiceCard } from './components/ServiceCard';
import { navItems, services, works, processSteps, testimonials, stats } from './data/site';

type ContactForm = {
  name: string;
  phone: string;
  service: string;
  message: string;
};

const categories = ['All', ...new Set(works.map((work) => work.category))];
const initialFormState: ContactForm = {
  name: '',
  phone: '',
  service: '',
  message: '',
};

function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [formData, setFormData] = useState<ContactForm>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitState, setSubmitState] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const filteredWorks =
    activeFilter === 'All' ? works : works.filter((work) => work.category === activeFilter);

  const handleFieldChange = (field: keyof ContactForm, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));

    if (submitState.type !== 'idle') {
      setSubmitState({ type: 'idle', message: '' });
    }
  };

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof ContactForm, string>> = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      nextErrors.name = 'Name must contain at least 2 characters.';
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = 'Please enter your phone number.';
    } else if (formData.phone.replace(/\D/g, '').length < 7) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.service.trim()) {
      nextErrors.service = 'Please select a service.';
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Please tell us a bit more about your project.';
    } else if (formData.message.trim().length < 12) {
      nextErrors.message = 'Message should be at least 12 characters long.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      setSubmitState({
        type: 'error',
        message: 'Please complete all required fields before sending your request.',
      });
      return;
    }

    setSubmitState({
      type: 'success',
      message: 'Your request has been drafted successfully. We will contact you shortly.',
    });
    setFormData(initialFormState);
    setErrors({});
  };

  return (
    <div className="page-shell">
      <Header />

      <main id="home">
        <section className="hero" data-reveal>
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="container hero-content">
            <div className="eyebrow-group">
              <span className="eyebrow">Luxury automotive care</span>
              <span className="status-dot" aria-hidden="true" />
            </div>

            <h1>Precision. Protection. Presence.</h1>
            <p className="lead">
              Bespoke detailing and paint protection for enthusiasts who expect every surface, finish and detail to be uncompromising.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Book a consultation
                <ArrowRight size={18} />
              </a>
              <a className="button button-secondary" href="#works">
                View portfolio
              </a>
            </div>

            <div className="hero-stats" aria-label="Studio statistics">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-indicator" aria-label="Scroll indicator">
            <span>Scroll</span>
            <ChevronDown size={16} />
          </div>
        </section>

        <section className="services section" id="services" data-reveal>
          <div className="container">
            <div className="section-header" data-reveal>
              <div>
                <p className="kicker">Our services</p>
                <h2>Crafted protection for every detail.</h2>
              </div>
              <p className="section-copy">
                Each treatment is designed around the car’s finish, usage, and owner expectations — never a one-size-fits-all approach.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section className="works section" id="works" data-reveal>
          <div className="container">
            <div className="section-header">
              <div>
                <p className="kicker">Featured works</p>
                <h2>Signature builds. Fine-tuned finishes.</h2>
              </div>
            </div>

            <div className="filter-row" aria-label="Project filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-button ${activeFilter === category ? 'active' : ''}`}
                  type="button"
                  aria-pressed={activeFilter === category}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="works-grid">
              {filteredWorks.map((work) => (
                <ProjectCard key={work.title} project={work} />
              ))}
            </div>
          </div>
        </section>

        <section className="about section" id="about" data-reveal>
          <div className="container about-layout">
            <div className="about-visual">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury car detail work in progress"
              />
              <div className="about-badge">
                <Sparkles size={18} />
                <div>
                  <strong>Hand-finished</strong>
                  <span>surface perfection</span>
                </div>
              </div>
            </div>

            <div className="about-copy">
              <p className="kicker">About AURA</p>
              <h2>We turn performance into presence.</h2>
              <p>
                AURA began with a simple principle: luxury vehicles deserve more than routine care. We combine precision tools,
                premium products, and meticulous handwork to preserve every line, finish and interior detail.
              </p>
              <p>
                From paint correction to material restoration, our process is built around craftsmanship, consistency, and a
                deeply personal understanding of how a car should feel to its owner.
              </p>

              <div className="feature-list">
                <div>
                  <CheckCircle2 size={18} />
                  <span>Detail-first workflow</span>
                </div>
                <div>
                  <CheckCircle2 size={18} />
                  <span>Premium protective products</span>
                </div>
                <div>
                  <CheckCircle2 size={18} />
                  <span>Tailored treatment plans</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="process section" id="process" data-reveal>
          <div className="container">
            <div className="section-header narrow" data-reveal>
              <p className="kicker">The process</p>
              <h2>Measured, meticulous, unmistakably premium.</h2>
            </div>

            <div className="process-grid" aria-label="Studio process steps">
              {processSteps.map((step, index) => (
                <div key={step} className="process-item">
                  <span className="process-number">0{index + 1}</span>
                  <h3>{step}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonials section" id="testimonials" data-reveal>
          <div className="container">
            <div className="section-header" data-reveal>
              <div>
                <p className="kicker">Client feedback</p>
                <h2>Trusted by drivers who care deeply.</h2>
              </div>
            </div>

            <div className="testimonial-grid">
              {testimonials.map((item) => (
                <article key={item.name} className="testimonial-card">
                  <div className="stars" aria-label="Five star review">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p>“{item.quote}”</p>
                  <div className="testimonial-author">
                    <strong>{item.name}</strong>
                    <span>{item.vehicle}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section" id="contact" data-reveal>
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="kicker">Start your project</p>
              <h2>Your car deserves more than ordinary care.</h2>
              <p>
                Share a few details and we’ll recommend the ideal treatment plan based on your vehicle, finish, and goals.
              </p>

              <div className="contact-points">
                <div>
                  <Phone size={18} />
                  <span>Response within 1 business day</span>
                </div>
                <div>
                  <CheckCircle2 size={18} />
                  <span>Tailored recommendations</span>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="field-row split">
                  <label className="form-field">
                    <span>Name</span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(event) => handleFieldChange('name', event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      placeholder="Your name"
                    />
                    {errors.name && <small className="field-error" role="alert">{errors.name}</small>}
                  </label>

                  <label className="form-field">
                    <span>Phone</span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(event) => handleFieldChange('phone', event.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                      placeholder="+1 (555) 0198"
                    />
                    {errors.phone && <small className="field-error" role="alert">{errors.phone}</small>}
                  </label>
                </div>

                <label className="form-field">
                  <span>Service</span>
                  <select
                    value={formData.service}
                    onChange={(event) => handleFieldChange('service', event.target.value)}
                    aria-invalid={Boolean(errors.service)}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.title} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                  {errors.service && <small className="field-error" role="alert">{errors.service}</small>}
                </label>

                <label className="form-field">
                  <span>Message</span>
                  <textarea
                    value={formData.message}
                    onChange={(event) => handleFieldChange('message', event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    placeholder="Tell us about your vehicle and the finish you want to achieve."
                    rows={5}
                  />
                  {errors.message && <small className="field-error" role="alert">{errors.message}</small>}
                </label>

                <button className="button button-primary" type="submit">
                  Send request
                  <ArrowRight size={18} />
                </button>

                {submitState.message && (
                  <p className={`status-message ${submitState.type}`} role="status">
                    {submitState.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#home" aria-label="AURA Detailing home">
              <span className="brand-mark">A</span>
              <span className="brand-text">AURA</span>
            </a>
          </div>

          <div className="footer-column">
            <h3>Navigation</h3>
            <ul>
              {navItems.map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3>Contact</h3>
            <ul>
              <li><a href="tel:+15550198">+1 (555) 0198</a></li>
              <li><a href="mailto:hello@auradetailing.com">hello@auradetailing.com</a></li>
              <li>87 Mercer Avenue, Miami</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Hours</h3>
            <ul>
              <li>Mon – Fri: 9:00 – 18:00</li>
              <li>Sat: 10:00 – 16:00</li>
              <li>Sun: By appointment</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Social</h3>
            <div className="social-links">
              <a href="https://instagram.com" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://www.google.com" aria-label="Location"><MapPin size={18} /></a>
              <a href="mailto:hello@auradetailing.com" aria-label="Email"><Mail size={18} /></a>
              <a href="tel:+15550198" aria-label="Phone"><Phone size={18} /></a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 AURA Detailing</span>
          <span>Luxury automotive studio</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
