import React, { Component } from "react";
import Typical from "react-typical";

class Header extends Component {
  titles = [];

  constructor() {
    super();
    this.state = { 
      checked: false,
      iconLoaded: false
    };
  }

  handleImageLoad = () => {
    this.setState({ iconLoaded: true });
  };

  render() {
    const { info } = this.props.sharedData;
    const { iconLoaded } = this.state;

    if (info) {
      const name = info.name;
      const logo = `images/${info.logo}`;
      this.titles = info.titles.map((x) => [x.toUpperCase(), 1500]).flat();

      const networks = info.social.map((network) => (
        <span key={network.name} className="m-4">
          <a href={network.url} target="_blank" rel="noopener noreferrer">
            <i className={network.class}></i>
          </a>
        </span>
      ));

      const HeaderTitleTypeAnimation = React.memo(() => (
        <Typical className="title-styles" steps={this.titles} loop={50} />
      ));

      return (
        <header id="home" style={{ display: "block" }}>
          <div className="row aligner" style={{ height: '75%' }}>
            <div className="col-md-10">
              <div>
                {!iconLoaded && (
                  <div className="spinner"></div>
                )}
                <img
                  className="iconify header-icon"
                  alt="logo"
                  src={logo}
                  onLoad={this.handleImageLoad}
                />
                <br />
                <h1 className="mb-10">
                  <Typical steps={[name]} wrapper="p" />
                </h1>
                <div className="title-container">
                  <HeaderTitleTypeAnimation />
                </div>
                <div className="header-icon-links">{networks}</div>
              </div>
            </div>
          </div>
        </header>
      );
    }

    return null;
  }
}

export default Header;
