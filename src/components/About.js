import React, { Component } from "react";

class About extends Component {
  render() {
    const { sharedData } = this.props;

    if (!sharedData.info) {
      return null;
    }

    var profilepic = "images/" + sharedData.info.image;
    var sectionName = sharedData.info.section_name.about;
    var about = sharedData.info.description;

    return (
      <section id="about">
        <div className="col-md-12">
          <h1>
            <span>{sectionName}</span>
          </h1>
          <div className="row center mx-auto mb-5">
            <div className="mb-3 center">
              <div className="profile_pic">
                <span style={{ cursor: "auto" }}>
                  <img height="200px" src={profilepic} alt="Me" />
                </span>
              </div>
            </div>
            <div className="center">
              <div className="center col-md-8">
                <div className="card center">{about} </div>
              </div>
            </div>
            <div className="res-button center">
              <a
                href="Charles_Archer_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                RESUME
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
