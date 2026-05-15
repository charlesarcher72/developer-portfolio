import React, { Component } from "react";
import "../scss/Skills.scss";

class Skills extends Component {
  render() {
    const { skills, info } = this.props.sharedData || {};
    if (!skills || !info || !skills.categories) return null;

    const sectionName = info.section_name?.skills || "SKILLS";

    return (
      <section id="skills" className="section">
        <div className="container">
          <header className="section-header">
            <h2 className="section-title">{sectionName}</h2>
          </header>

          <div className="skills-categories">
            {skills.categories.map((category, idx) => (
              <article className="skill-category" key={idx}>
                <header className="skill-category-header">
                  <h3 className="skill-category-name">{category.name}</h3>
                  <span className="skill-category-count">
                    {category.items?.length ?? 0}
                  </span>
                </header>
                <ul className="skill-chips">
                  {category.items?.map((skill, i) => (
                    <li className="skill-chip" key={i}>
                      <i className={skill.class} aria-hidden="true" />
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Skills;
