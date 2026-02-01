import React, { Component } from "react";
import "../scss/Header.scss";

class Typewriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: '',
      currentIndex: 0,
      isDeleting: false,
      currentTitleIndex: 0,
    };
    this.rafId = null;
    this.timeoutId = null;
  }

  componentDidMount() {
    this.scheduleNextFrame();
  }

  componentWillUnmount() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  scheduleNextFrame = () => {
    const { titles, typingSpeed = 80, deletingSpeed = 50, pauseTime = 1500 } = this.props;
    const { displayText, isDeleting, currentTitleIndex } = this.state;
    const currentTitle = titles[currentTitleIndex].toUpperCase();

    if (!isDeleting && displayText === currentTitle) {
      this.timeoutId = setTimeout(() => {
        this.setState({ isDeleting: true });
        this.scheduleNextFrame();
      }, pauseTime);
      return;
    }

    if (isDeleting && displayText === '') {
      const nextIndex = (currentTitleIndex + 1) % titles.length;
      this.setState({ isDeleting: false, currentTitleIndex: nextIndex });
      this.timeoutId = setTimeout(() => this.scheduleNextFrame(), 300);
      return;
    }

    const delay = isDeleting ? deletingSpeed : typingSpeed;

    this.timeoutId = setTimeout(() => {
      this.rafId = requestAnimationFrame(() => {
        if (isDeleting) {
          this.setState({ displayText: displayText.slice(0, -1) });
        } else {
          this.setState({ displayText: currentTitle.slice(0, displayText.length + 1) });
        }
        this.scheduleNextFrame();
      });
    }, delay);
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