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
  { navLinkId: 'Home', scrollToId: 'home' },
  { navLinkId: 'About', scrollToId: 'about' },
  { navLinkId: 'Experience', scrollToId: 'experience' },
  { navLinkId: 'Projects', scrollToId: 'projects' },
  { navLinkId: 'Skills', scrollToId: 'skills' },
  { navLinkId: 'Services', scrollToId: 'services' }
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