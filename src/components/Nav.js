import React, { useContext, useState, useEffect, useCallback } from 'react';
import { NavContext } from '../context/NavContext';
import ThemeToggle from './ThemeToggle';
import '../scss/Nav.scss';

const NAV_LINKS = [
  { id: 'about',      label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
  { id: 'skills',     label: 'Skills' },
  { id: 'services',   label: 'Services' },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 72;
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

const NavLink = ({ id, label, onClick }) => {
  const { activeNavLinkId, setActiveNavLinkId } = useContext(NavContext);
  const active = activeNavLinkId === id;

  const handleClick = (e) => {
    e.preventDefault();
    setActiveNavLinkId(id);
    scrollToSection(id);
    onClick?.();
  };

  return (
    <a
      href={`#${id}`}
      className={`nav-link${active ? ' is-active' : ''}`}
      onClick={handleClick}
      aria-current={active ? 'page' : undefined}
    >
      {label}
    </a>
  );
};

const Nav = ({ wordmark = 'Charles Archer' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleHomeClick = useCallback((e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpen(false);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`site-nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-nav-inner">
        <a href="#home" className="nav-wordmark" onClick={handleHomeClick} aria-label="Home">
          <span className="nav-wordmark-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
              <rect x="1" y="1" width="30" height="30" rx="8" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 11L7 16L10 21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 11L25 16L22 21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 9L14 23" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="nav-wordmark-text">{wordmark}</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.id} id={l.id} label={l.label} />
          ))}
        </nav>

        <div className="nav-end">
          <ThemeToggle />
          <button
            type="button"
            className={`nav-mobile-toggle${open ? ' is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-drawer"
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        </div>
      </div>

      <div
        id="mobile-drawer"
        className={`mobile-drawer${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
      >
        <nav className="mobile-drawer-links" aria-label="Mobile">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.id} id={l.id} label={l.label} onClick={close} />
          ))}
        </nav>
      </div>

      <button
        type="button"
        className={`mobile-drawer-backdrop${open ? ' is-visible' : ''}`}
        onClick={close}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
      />
    </header>
  );
};

export default Nav;
