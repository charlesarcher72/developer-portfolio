import React, { Component } from "react";
import "../scss/Header.scss";

class Typewriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: '',
    };
    this.timeoutId = null;
    this.isDeleting = false;
    this.currentTitleIndex = 0;
  }

  componentDidMount() {
    this.type();
  }

  componentWillUnmount() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  type = () => {
    const { titles, typingSpeed = 80, deletingSpeed = 40, pauseTime = 1500 } = this.props;
    const currentTitle = titles[this.currentTitleIndex].toUpperCase();
    const currentText = this.state.displayText;

    if (!this.isDeleting) {
      if (currentText.length < currentTitle.length) {
        this.timeoutId = setTimeout(() => {
          this.setState({ displayText: currentTitle.slice(0, currentText.length + 1) }, this.type);
        }, typingSpeed);
      } else {
        this.timeoutId = setTimeout(() => {
          this.isDeleting = true;
          this.type();
        }, pauseTime);
      }
    } else {
      if (currentText.length > 0) {
        this.timeoutId = setTimeout(() => {
          this.setState({ displayText: currentText.slice(0, -1) }, this.type);
        }, deletingSpeed);
      } else {
        this.isDeleting = false;
        this.currentTitleIndex = (this.currentTitleIndex + 1) % titles.length;
        this.timeoutId = setTimeout(this.type, 300);
      }
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
                titles={info.titles}
                className="title-styles"
                typingSpeed={80}
                deletingSpeed={40}
                pauseTime={1500}
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