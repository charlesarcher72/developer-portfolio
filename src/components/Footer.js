import React, { Component } from "react";
import "../scss/Footer.scss";

class Footer extends Component {
  render() {
    const { sharedData } = this.props;

    if (!sharedData.info) {
      return null;
    }

    const networks = sharedData.info.social.map((network) => (
      <a
        key={network.name}
        href={network.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={network.name}
        className="footer-social-link"
      >
        <i className={network.class}></i>
      </a>
    ));

    const currentYear = new Date().getFullYear();
    const name = sharedData.info.name;

    return (
      <footer id="footer">
        <div className="footer-container">
          <div className="footer-social-links">
            {networks}
          </div>
          
          <p className="footer-copyright">
            © {currentYear} {name}. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;