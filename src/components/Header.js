import React, { Component } from "react";
import "../scss/Header.scss";

class Typewriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: '',
    };
    this.charIndex = 0;
    this.timeoutId = null;
  }

  componentDidMount() {
    this.typeNextChar();
  }

  componentWillUnmount() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  typeNextChar = () => {
    const { text, typingSpeed = 80 } = this.props;
    const fullText = text.toUpperCase();

    if (this.charIndex < fullText.length) {
      this.charIndex++;
      this.setState({ displayText: fullText.slice(0, this.charIndex) });
      this.timeoutId = setTimeout(this.typeNextChar, typingSpeed);
    }
  };

  render() {
    return (
      <span className={this.props.className}>
        {this.state.displayText}
        <span className="cursor">|</span>
      </span>
    );
  }
}

class Header extends Component {
  constructor() {
    super();
    this.state = {
      iconLoaded: false,
      currentTheme: 'light'
    };
  }

  componentDidMount() {
    this.updateTheme();
    this.themeObserver = new MutationObserver(() => {
      this.updateTheme();
    });

    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  componentWillUnmount() {
    if (this.themeObserver) {
      this.themeObserver.disconnect();
    }
  }

  updateTheme = () => {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    if (theme !== this.state.currentTheme) {
      this.setState({
        currentTheme: theme,
        iconLoaded: false
      });
    }
  };

  handleImageLoad = () => {
    this.setState({ iconLoaded: true });
  };

  generateBinaryString = (length) => {
    return Array.from({ length }, () => Math.random() > 0.5 ? '1' : '0').join('');
  };

  render() {
    const { info } = this.props.sharedData;
    const { iconLoaded, currentTheme } = this.state;

    if (info) {
      const name = info.name;

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
              {[...Array(10)].map((_, i) => (
                <div key={i} className="binary-col">
                  {[...Array(40)].map((_, j) => (
                    <React.Fragment key={j}>
                      {this.generateBinaryString(1)}<br/>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="header-content">
            <div className="header-logo-container">
              {!iconLoaded && (
                <div className="spinner"></div>
              )}
              <img
                className={`header-icon ${iconLoaded ? 'visible' : 'hidden'}`}
                alt="logo"
                src={logo}
                onLoad={this.handleImageLoad}
                key={logo}
              />
            </div>

            <div className="header-name">
              <p>{name}</p>
            </div>

            <div className="title-container">
              <Typewriter
                text={info.titles[0]}
                className="title-styles"
                typingSpeed={60}
              />
            </div>

            <div className="header-icon-links">
              {networks}
            </div>
          </div>
        </header>
      );
    }

    return null;
  }
}

export default Header;