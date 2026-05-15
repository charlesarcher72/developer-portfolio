import React, { Component } from "react";
import "../scss/Services.scss";

class Services extends Component {
  capitalizeWords = (text) =>
    text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

  render() {
    const { services, info } = this.props.sharedData;
    if (!services || !info) return null;

    const sectionName = info?.section_name?.services || "SERVICES";

    return (
      <section id="services" className="section">
        <div className="container">
          <header className="section-header">
            <h2 className="section-title">{sectionName}</h2>
          </header>

          <ul className="services-grid">
            {services?.icons?.map((service, i) => {
              const subject = `Requesting ${this.capitalizeWords(service.name)}`;
              const href = `mailto:charlesarcher72@gmail.com?subject=${encodeURIComponent(subject)}`;

              return (
                <li className="service-item" key={i}>
                  <a className="service-card" href={href} aria-label={`Request ${service.name}`}>
                    <span className="service-icon" aria-hidden="true">
                      <i className={service.class}></i>
                    </span>
                    <span className="service-name">{service.name}</span>
                    <span className="service-arrow" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"/>
                        <polyline points="7 7 17 7 17 17"/>
                      </svg>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
}

export default Services;
