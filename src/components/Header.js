import React, { Component } from "react";
import "../scss/Header.scss";

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 72;
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

class Header extends Component {
  constructor() {
    super();
    const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
    this.state = { currentTheme: initialTheme };
  }

  componentDidMount() {
    this.themeObserver = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute('data-theme') || 'light';
      if (theme !== this.state.currentTheme) {
        this.setState({ currentTheme: theme });
      }
    });

    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  componentWillUnmount() {
    if (this.themeObserver) this.themeObserver.disconnect();
  }

  render() {
    const { info } = this.props.sharedData;
    const { currentTheme } = this.state;

    const logoFilename = typeof info.logo === 'object'
      ? info.logo[currentTheme]
      : info.logo;
    const logo = `images/${logoFilename}`;

    const socials = info.social.map((network) => (
      <a
        key={network.name}
        href={network.url}
        target={network.url.startsWith('mailto:') ? undefined : "_blank"}
        rel="noopener noreferrer"
        aria-label={network.name}
        className="hero-social"
      >
        <i className={network.class}></i>
      </a>
    ));

    const title = info.titles[0];

    return (
      <section id="home" className="hero">
        <div className="hero-background" aria-hidden="true">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
        </div>

        <div className="container hero-inner">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-name">{info.name}</span>
              <span className="hero-tagline">
                <span className="hero-tagline-prefix">{title}</span>
              </span>
            </h1>

            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => scrollToId('projects')}
              >
                View Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <a
                className="btn btn-secondary"
                href="mailto:charlesarcher72@gmail.com"
              >
                Get in Touch
              </a>
            </div>

            <div className="hero-socials" aria-label="Social links">
              {socials}
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-logo-frame">
              <img className="hero-logo" alt="" src={logo} />
            </div>
          </div>
        </div>

        <button
          type="button"
          className="hero-scroll-cue"
          onClick={() => scrollToId('about')}
          aria-label="Scroll to About section"
        >
          <span className="hero-scroll-label">Scroll</span>
          <span className="hero-scroll-line" />
        </button>
      </section>
    );
  }
}

export default Header;
