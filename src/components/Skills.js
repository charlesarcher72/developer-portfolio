import React, { Component } from "react";
import "../scss/Skills.scss";

class Skills extends Component {
  render() {
    const { skills, info } = this.props.sharedData || {};

    if (!skills || !info || !skills.categories) {
      return null;
    }

    const sectionName = info.section_name?.skills || "SKILLS";

    return (
      <section id="skills">
        <div className="skills-container">
          <h2 className="section-title">
            <span>{sectionName}</span>
          </h2>

          <div className="categories-wrapper">
            {skills.categories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="skill-category visible"
              >
                <h3 className="category-title">{category.name}</h3>
                <div className="skills-grid">
                  {category.items && category.items.map((skill, i) => (
                    <div
                      className="skill-item"
                      key={i}
                      style={{ '--delay': `${i * 0.05}s` }}
                    >
                      <div className="skills-tile">
                        <div className="skill-icon-wrapper">
                          <i className={skill.class}></i>
                        </div>
                        <p className="skill-name">{skill.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Skills;