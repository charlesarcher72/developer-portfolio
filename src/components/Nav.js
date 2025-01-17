import React, { useContext } from 'react';
import { NavContext } from '../context/NavContext';

const NavLink = ({ navLinkId, scrollToId }) => {
  const { activeNavLinkId, setActiveNavLinkId } = useContext(NavContext);

  const handleClick = () => {
    setActiveNavLinkId(navLinkId);
    document.getElementById(scrollToId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <span
      id={navLinkId}
      className={activeNavLinkId === navLinkId ? 'activeClass' : ''}
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
  return (
    <nav>
      {navLinks.map(({ navLinkId, scrollToId }, idx) => (
        <NavLink key={idx} navLinkId={navLinkId} scrollToId={scrollToId} />
      ))}
    </nav>
  );
};

export default Nav;