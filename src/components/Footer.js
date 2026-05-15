import React, { Component } from "react";
import "../scss/Footer.scss";

class Footer extends Component {
  render() {
    const { sharedData } = this.props;
    if (!sharedData.info) return null;

    const networks = sharedData.info.social.map((network) => (
      <a
        key={network.name}
        href={network.url}
        target={network.url.startsWith('mailto:') ? undefined : "_blank"}
        rel="noopener noreferrer"
        aria-label={network.name}
        className="footer-social"
      >
        <i className={network.class}></i>
      </a>
    ));

    const currentYear = new Date().getFullYear();
    const name = sharedData.info.name;

    return (
      <footer id="footer" className="site-footer">
        <div className="container site-footer-inner">
          <div className="site-footer-cta">
            <span className="site-footer-eyebrow">Let's build something</span>
            <a className="site-footer-mail" href="mailto:charlesarcher72@gmail.com">
              charlesarcher72@gmail.com
            </a>
          </div>

          <div className="site-footer-meta">
            <div className="footer-socials" aria-label="Social links">
              {networks}
            </div>
            <p className="footer-copyright">
              © {currentYear} {name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
