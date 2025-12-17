import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";
import "../scss/Experience.scss";

class Experience extends Component {
  render() {
    const { experience, info } = this.props.sharedData;

    if (experience && info) {
      const sectionName = info.section_name.experience;

      const workElements = experience.map((work, i) => {
        const technologies = work.technologies;
        const tech = technologies.map((technology, j) => (
          <Badge pill className="experience-badge" key={j}>
            {technology}
          </Badge>
        ));

        return (
          <div className="experience-card" key={i}>
            <div className="experience-card-header">
              <div className="experience-icon">
                <i className="fas fa-code"></i>
              </div>
              <div className="experience-meta">
                <span className="experience-years">{work.years}</span>
              </div>
            </div>
            
            <div className="experience-card-body">
              <h3 className="experience-title">{work.title}</h3>
              <h4 className="experience-company">{work.company}</h4>
              <p className="experience-description">{work.description}</p>
            </div>
            
            <div className="experience-card-footer">
              {tech}
            </div>
          </div>
        );
      });

      return (
        <section id="experience">
          <div className="experience-container">
            <h2 className="section-title">
              <span>{sectionName}</span>
            </h2>
            
            <div className="experience-grid">
              {workElements}
            </div>
          </div>
        </section>
      );
    }

    return null;
  }
}

export default Experience;