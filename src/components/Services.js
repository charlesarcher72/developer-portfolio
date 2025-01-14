import React, { Component } from "react";

class Services extends Component {
  capitalizeWords = (text) => {
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  render() {
    const { services, info } = this.props.sharedData;

    // Check if data exists
    const sectionName = info?.section_name?.services || "Services";
    const servicesList = services?.icons?.map((service, i) => {
      const subject = `Requesting ${this.capitalizeWords(service.name)}`;
      return (
        <li className="list-inline-item mx-2 my-4" key={i}>
          <button
            className="services-tile text-center"
            onClick={() =>
              (window.location.href = `mailto:?subject=${encodeURIComponent(subject)}`)
            }
          >
            <i className={service.class} style={{ fontSize: "3rem" }}></i>
            <p className="service-name mt-3">{service.name}</p>
          </button>
        </li>
      );
    });

    return (
      <section id="services">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="section-title">{sectionName}</h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <ul className="list-inline service-icon">{servicesList}</ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Services;