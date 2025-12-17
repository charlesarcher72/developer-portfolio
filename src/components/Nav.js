import React, { useContext, useState, useEffect } from 'react';
import { NavContext } from '../context/NavContext';
import ThemeToggle from './ThemeToggle';
import '../scss/Nav.scss';

const NavLink = ({ navLinkId, scrollToId, onClick }) => {
  const { activeNavLinkId, setActiveNavLinkId } = useContext(NavContext);

  const handleClick = () => {
    setActiveNavLinkId(navLinkId);
    const element = document.getElementById(scrollToId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
    if (onClick) onClick();
  };

  return (
    <span
      className={`nav-link ${activeNavLinkId === navLinkId ? 'active' : ''}`}
      onClick={handleClick}
    >
      {navLinkId}
    </span>
  );
};

const navLinks = [
  { navLinkId: 'HOME', scrollToId: 'home' },
  { navLinkId: 'ABOUT', scrollToId: 'about' },
  { navLinkId: 'EXPERIENCE', scrollToId: 'experience' },
  { navLinkId: 'PROJECTS', scrollToId: 'projects' },
  { navLinkId: 'SKILLS', scrollToId: 'skills' },
  { navLinkId: 'SERVICES', scrollToId: 'services' }
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <nav className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map(({ navLinkId, scrollToId }, idx) => (
            <NavLink 
              key={idx} 
              navLinkId={navLinkId} 
              scrollToId={scrollToId}
              onClick={closeMobileMenu}
            />
          ))}
        </nav>
        
        <div className="navbar-theme-toggle">
          <ThemeToggle />
        </div>
        
        <button 
          className={`navbar-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <i className={mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
      </div>
    </header>
  );
};

export default Nav;