import React, { Component } from "react";
import "../scss/Services.scss";

class Services extends Component {
  capitalizeWords = (text) => {
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  render() {
    const { services, info } = this.props.sharedData;

    if (!services || !info) {
      return null;
    }

    const sectionName = info?.section_name?.services || "SERVICES";
    const servicesList = services?.icons?.map((service, i) => {
      const subject = `Requesting ${this.capitalizeWords(service.name)}`;
      return (
        <div className="service-item" key={i}>
          <button
            className="services-tile"
            onClick={() =>
              (window.location.href = `mailto:charlesarcher72@gmail.com?subject=${encodeURIComponent(subject)}`)
            }
            aria-label={`Request ${service.name}`}
          >
            <i className={service.class}></i>
            <span className="service-name">{service.name}</span>
          </button>
        </div>
      );
    });

    return (
      <section id="services">
        <div className="services-container">
          <h2 className="section-title">
            <span>{sectionName}</span>
          </h2>
          <div className="services-grid">{servicesList}</div>
        </div>
      </section>
    );
  }
}

export default Services;