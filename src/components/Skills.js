import React, { Component } from "react";

class Skills extends Component {
  render() {
    const { skills, info } = this.props.sharedData;

    if (skills && info) {
      var sectionName = info.section_name.skills;
      var skillsList = skills.icons.map((skill, i) => (
        <li className="list-inline-item mx-4 my-5" key={i}>
          <span>
            <div className="text-center skills-tile">
              <i className={skill.class} style={{ fontSize: "220%" }}>
                <p className="text-center" style={{ fontSize: "40%", marginTop: "5px" }}>
                  {skill.name}
                </p>
              </i>
            </div>
          </span>
        </li>
      ));
    }

    return (
      <section id="skills">
        <div className="col-md-12">
          <div className="col-md-12">
            <h1><span>{sectionName}</span></h1>
          </div>
          <div className="col-md-12 text-center">
            <ul className="list-inline mx-auto skill-icon">{skillsList}</ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Skills;