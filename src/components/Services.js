import React, { Component } from "react";

class Services extends Component {
  render() {
    const { services, info } = this.props.sharedData;

    if (services && info) {
      var sectionName = info.section_name.services;
      var servicesList = services.icons.map((service, i) => (
        <li className="list-inline-item mx-4 my-5" key={i}>
          <span>
            <div className="text-center services-tile">
              <i className={service.class} style={{ fontSize: "220%" }}>
                <p className="text-center" style={{ fontSize: "40%", marginTop: "5px" }}>
                  {service.name}
                </p>
              </i>
            </div>
          </span>
        </li>
      ));
    }

    return (
      <section id="services">
        <div className="col-md-12">
          <div className="col-md-12">
            <h1><span>{sectionName}</span></h1>
          </div>
          <div className="col-md-12 text-center">
            <ul className="list-inline mx-auto skill-icon">{servicesList}</ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Services;