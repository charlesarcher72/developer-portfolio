import React, { Component } from "react";
import "../scss/About.scss";

class About extends Component {
  render() {
    const { sharedData } = this.props;

    if (!sharedData.info) {
      return null;
    }

    const profilepic = "images/" + sharedData.info.image;
    const sectionName = sharedData.info.section_name.about;
    const about = sharedData.info.description;

    return (
      <section id="about">
        <div className="about-container">
          <h2 className="section-title">
            <span>{sectionName}</span>
          </h2>
          
          <div className="about-content">
            <div className="profile-section">
              <div className="profile-pic-container">
                <div className="profile_pic">
                  <img src={profilepic} alt={sharedData.info.name} />
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
            
            <div className="about-text">
              <div className="about-description">
                {about}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;