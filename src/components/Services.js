import React, { Component } from "react";

class Services extends Component {
  capitalizeWords = (text) => {
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  render() {
    const { services, info } = this.props.sharedData;

    const sectionName = info?.section_name?.services || "Services";
    const servicesList = services?.icons?.map((service, i) => {
      const subject = `Requesting ${this.capitalizeWords(service.name)}`;
      return (
        <li className="service-item" key={i}>
          <button
            className="services-tile text-center"
            onClick={() =>
              (window.location.href = `mailto:?subject=${encodeURIComponent(subject)}`)
            }
          >
            <i className={service.class}></i>
            <p className="service-name">{service.name}</p>
          </button>
        </li>
      );
    });

    return (
      <section id="services">
        <div className="container">
          <h1 className="section-title">{sectionName}</h1>
          <ul className="services-list">{servicesList}</ul>
        </div>
      </section>
    );
  }
}

export default Services;