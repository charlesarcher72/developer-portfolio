import React, { Component } from "react";
import "../scss/Experience.scss";

class Experience extends Component {
  render() {
    const { experience, info } = this.props.sharedData;

    if (!experience || !info) return null;

    const sectionName = info.section_name.experience;

    return (
      <section id="experience" className="section">
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">{sectionName}</span>
            <h2 className="section-title">Where I've worked.</h2>
            <p className="section-subtitle">
              From individual contributor to product owner, leading mission-critical software at scale.
            </p>
          </header>

          <ol className="timeline">
            {experience.map((work, i) => (
              <li className="timeline-item" key={i}>
                <div className="timeline-marker" aria-hidden="true">
                  <span className="timeline-dot" />
                </div>

                <div className="timeline-content">
                  <div className="timeline-meta">{work.years}</div>
                  <h3 className="timeline-role">{work.title}</h3>
                  <div className="timeline-company">{work.company}</div>
                  <p className="timeline-description">{work.description}</p>
                  {work.technologies && work.technologies.length > 0 && (
                    <ul className="timeline-tags" aria-label="Technologies">
                      {work.technologies.map((tech, j) => (
                        <li className="chip" key={j}>{tech}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }
}

export default Experience;
