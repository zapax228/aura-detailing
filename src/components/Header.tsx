import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navItems } from '../data/site';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav">
        <a className="brand" href="#home" aria-label="AURA Detailing home">
          <span className="brand-mark">A</span>
          <span className="brand-text">AURA</span>
        </a>

        <nav className="primary-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            type="button"
          >
            <Menu size={20} />
          </button>

          <a className="button button-primary nav-cta" href="#contact">
            Book a consultation
          </a>
        </div>
      </div>

      {mobileOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)}>
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
