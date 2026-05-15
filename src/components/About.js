import React, { Component } from "react";
import "../scss/About.scss";

const MONTHS = {
  'January': 0, 'February': 1, 'March': 2, 'April': 3,
  'May': 4, 'June': 5, 'July': 6, 'August': 7,
  'September': 8, 'October': 9, 'November': 10, 'December': 11
};

class About extends Component {
  calculateYearsExperience = (experience) => {
    if (!experience || experience.length === 0) return 0;

    const startDates = experience.map(exp => {
      const years = exp.years.split(' - ')[0];
      const match = years.match(/(\w+)\s+(\d{4})/);
      if (match) {
        const month = MONTHS[match[1]] ?? 0;
        const year = parseInt(match[2], 10);
        return new Date(year, month, 1);
      }
      return null;
    }).filter(Boolean);

    if (startDates.length === 0) return 0;

    const earliestStart = new Date(Math.min(...startDates));
    const now = new Date();
    const years = (now - earliestStart) / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(years);
  };

  countTechnologies = (skills) => {
    if (!skills || !skills.categories) return 0;
    return skills.categories.reduce(
      (total, category) => total + (category.items ? category.items.length : 0),
      0
    );
  };

  render() {
    const { sharedData } = this.props;
    if (!sharedData.info) return null;

    const profilepic = `images/${sharedData.info.image}`;
    const sectionName = sharedData.info.section_name.about;
    const about = sharedData.info.description;
    const education = sharedData.info.education || [];
    const yearsExp = this.calculateYearsExperience(sharedData.experience);
    const projectCount = sharedData.projects ? sharedData.projects.length : 0;
    const techCount = this.countTechnologies(sharedData.skills);

    return (
      <section id="about" className="section">
        <div className="container about">
          <header className="section-header">
            <h2 className="section-title">{sectionName}</h2>
          </header>

          <div className="about-grid">
            <div className="about-portrait">
              <div className="about-portrait-frame">
                <img src={profilepic} alt={sharedData.info.name} loading="lazy" />
              </div>
            </div>

            <div className="about-body">
              <p className="about-text">{about}</p>

              {education.length > 0 && (
                <div className="about-education">
                  <span className="about-education-label">Education</span>
                  {education.map((edu, i) => (
                    <div className="about-education-item" key={i}>
                      <div className="about-education-degree">{edu.degree}</div>
                      <div className="about-education-school">{edu.institution}</div>
                      <div className="about-education-meta">
                        {edu.graduation}{edu.honors ? ` · ${edu.honors}` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="about-cta">
                <a
                  className="btn btn-primary"
                  href="https://drive.google.com/file/d/1XaCkiQAn_rlJVb89y7zFBgkHsA0QUXzP/view"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-file" aria-hidden="true" />
                  <span>View Resume</span>
                </a>
              </div>
            </div>
          </div>

          <dl className="about-stats">
            <div className="about-stat">
              <dt>{yearsExp}+</dt>
              <dd>Years experience</dd>
            </div>
            <div className="about-stat">
              <dt>{projectCount}</dt>
              <dd>Projects shipped</dd>
            </div>
            <div className="about-stat">
              <dt>{techCount}</dt>
              <dd>Technologies</dd>
            </div>
          </dl>
        </div>
      </section>
    );
  }
}

export default About;
