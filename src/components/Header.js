import React, { Component } from "react";
import "../scss/Header.scss";

class Typewriter extends React.Component {
  constructor(props) {
    super(props);
    this.fullText = props.text.toUpperCase();
    this.state = {
      displayText: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render if displayText changes
    return nextState.displayText !== this.state.displayText;
  }

  componentDidMount() {
    this.type(0);
  }

  componentWillUnmount() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  type = (index) => {
    const { typingSpeed = 60 } = this.props;

    if (index < this.fullText.length) {
      this.setState({ displayText: this.fullText.slice(0, index + 1) });
      this.timeoutId = setTimeout(() => this.type(index + 1), typingSpeed);
    }
  };

  render() {
    return (
      <span className={this.props.className}>
        {this.state.displayText}
        <span className="typewriter-cursor">|</span>
      </span>
    );
  }
}

const BINARY_COLUMNS = [...Array(10)].map(() =>
  [...Array(40)].map(() => Math.random() > 0.5 ? '1' : '0').join('\n')
);

class Header extends Component {
  constructor() {
    super();
    // Get initial theme synchronously to avoid re-render
    const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
    this.state = {
      iconLoaded: false,
      currentTheme: initialTheme
    };
  }

  componentDidMount() {
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
              {BINARY_COLUMNS.map((col, i) => (
                <div key={i} className="binary-col" style={{ whiteSpace: 'pre-line' }}>
                  {col}
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