import React, { Component } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";

class Experience extends Component {
  render() {
    const { experience, info } = this.props.sharedData;

    if (experience && info) {
      const sectionName = info.section_name.experience;

      const workElements = experience.map((work, i) => {
        const technologies = work.technologies;
        const tech = technologies.map((technology, j) => (
          <Badge pill className="experience-badge mr-2" key={j}>
            {technology}
          </Badge>
        ));

        return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{
              background: "#e4e1d4",
              color: "#A63636",
              border: "2px solid #A63636",
              textAlign: "center",
            }}
            icon={<i className="fas fa-code experience-icon"></i>}
            key={i}
            contentStyle={{ background: '#A63636', color: '#F7F6F2' }}
            contentArrowStyle={{ borderRight: '7px solid  #A63636' }}
          >
            <h3 className="vertical-timeline-element-title" style={{ textAlign: "left" }}>
              {work.title}
            </h3>
            <h4 className="vertical-timeline-element-subtitle" style={{ textAlign: "left" }}>
              {work.company}
            </h4>
            <h5 className="vertical-timeline-element-subtitle" style={{ textAlign: "left" }}>
              {work.years}
            </h5>
            <p>{work.description}</p>
            <div style={{ textAlign: "left", marginTop: "5px" }}>{tech}</div>
          </VerticalTimelineElement>
        );
      });

      return (
        <section id="experience">
          <div className="col-md-12">
            <h1>
              <span>{sectionName}</span>
            </h1>
            <div className="row center mx-auto mb-5">
              <VerticalTimeline lineColor="#A63636">
                {workElements}
                <VerticalTimelineElement
                  icon={<i className="fas fa-clock mx-auto experience-icon"></i>}
                  iconStyle={{
                    background: "#e4e1d4",
                    color: "#A63636",
                    border: "2px solid #A63636",
                    textAlign: "center",
                  }}
                />
              </VerticalTimeline>
            </div>
          </div>
        </section>
      );
    }

    return null;
  }
}

export default Experience;