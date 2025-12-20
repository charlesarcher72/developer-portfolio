import React, { Component } from "react";
import "../scss/About.scss";

class About extends Component {
  calculateYearsExperience = (experience) => {
    if (!experience || experience.length === 0) return 0;
    
    const startDates = experience.map(exp => {
      const years = exp.years.split(' - ')[0];
      const match = years.match(/(\w+)\s+(\d{4})/);
      if (match) {
        const month = match[1];
        const year = parseInt(match[2]);
        return new Date(year, this.getMonthNumber(month), 1);
      }
      return null;
    }).filter(date => date !== null);
    
    if (startDates.length === 0) return 0;
    
    const earliestStart = new Date(Math.min(...startDates));
    const now = new Date();
    const years = (now - earliestStart) / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(years);
  };
  
  getMonthNumber = (monthName) => {
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return months[monthName] || 0;
  };
  
  countTechnologies = (skills) => {
    if (!skills || !skills.categories) return 0;
    return skills.categories.reduce((total, category) => {
      return total + (category.items ? category.items.length : 0);
    }, 0);
  };

  render() {
    const { sharedData } = this.props;

    if (!sharedData.info) {
      return null;
    }

    const profilepic = "images/" + sharedData.info.image;
    const sectionName = sharedData.info.section_name.about;
    const about = sharedData.info.description;
    const education = sharedData.info.education;
    
    // Derive stats from other data
    const yearsExp = this.calculateYearsExperience(sharedData.experience);
    const projectCount = sharedData.projects ? sharedData.projects.length : 0;
    const techCount = this.countTechnologies(sharedData.skills);

    return (
      <section id="about">
        <div className="about-container">
          <h2 className="section-title">
            <span>{sectionName}</span>
          </h2>
          
          <div className="about-content">
            <div className="about-description">
              <div className="about-layout">
                <div className="profile-section">
                  <div className="profile-pic-container">
                    <div className="profile_pic">
                      <img src={profilepic} alt={sharedData.info.name} />
                    </div>
                  </div>
                  
                  {education && education.length > 0 && (
                    <div className="education-compact">
                      {education.map((edu, index) => (
                        <div key={index} className="education-compact-item">
                          <i className="fas fa-graduation-cap"></i>
                          <div className="edu-compact-content">
                            <div className="edu-line">{edu.degree}</div>
                            <div className="edu-line">{edu.institution}</div>
                            <div className="edu-line edu-details">
                              {edu.graduation} • {edu.honors}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="about-text">
                  <div className="about-main-text">
                    {about}
                  </div>

                  <div className="about-stats">
                    <div className="stat-item">
                      <span className="stat-value">{yearsExp}+</span>
                      <span className="stat-label">years</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{projectCount}</span>
                      <span className="stat-label">projects</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{techCount}</span>
                      <span className="stat-label">skills</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="res-button">
              <a
                href="https://drive.google.com/file/d/1XaCkiQAn_rlJVb89y7zFBgkHsA0QUXzP/view"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-file"></i>
                Resume
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;