import React, { Component } from "react";

class Footer extends Component {
  render() {
    const { info } = this.props.sharedData;
    const networks = info ? (
      info.social.map((network) => (
        <span key={network.name} className="m-4">
          <a href={network.url} target="_blank" rel="noopener noreferrer">
            <i className={network.class}></i>
          </a>
        </span>
      ))
    ) : null;

    return (
      <footer>
        <div className="col-md-12">
          <div className="social-links">{networks}</div>
        </div>
      </footer>
    );
  }
}

export default Footer;