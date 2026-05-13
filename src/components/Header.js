import React, { Component } from "react";
import "../scss/Header.scss";

const BINARY_COLUMNS = [...Array(10)].map(() =>
  [...Array(40)].map(() => Math.random() > 0.5 ? '1' : '0').join('\n')
);

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

    const networks = info.social.map((network) => (
      <a
        key={network.name}
        href={network.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={network.name}
      >
        <i className={network.class}></i>
      </a>
    ));

    return (
      <header id="home">
        <div className="header-background">
          <div className="code-glow glow-1"></div>
          <div className="code-glow glow-2"></div>

          <div className="binary-rain">
            {BINARY_COLUMNS.map((col, i) => (
              <div key={i} className="binary-col" style={{ whiteSpace: 'pre-line' }}>
                {col}
              </div>
            ))}
          </div>
        </div>

        <div className="header-content">
          <div className="header-logo-container">
            <img className="header-icon" alt="logo" src={logo} />
          </div>

          <div className="header-name">
            <p>{info.name}</p>
          </div>

          <div className="title-container">
            <span className="title-styles">{info.titles[0].toUpperCase()}</span>
          </div>

          <div className="header-icon-links">
            {networks}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
