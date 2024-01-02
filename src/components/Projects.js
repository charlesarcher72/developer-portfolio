import React, { Component } from "react";
import ProjectModal from "./ProjectModal";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      showModal: false,
    };
  }

  showModal = (data) => {
    this.setState({ showModal: true, deps: data });
  };

  closeModal = () => this.setState({ showModal: false });

  render() {
    const { projects, info } = this.props.sharedData;

    if (projects && info) {
      var sectionName = info.section_name.projects;
      var projectsList = projects.map((project) => (
        <div
          className="col-sm-12 col-md-6 col-lg-4 mx-auto"
          key={project.title}
          style={{ cursor: "pointer", height: "100%", overflow: "hidden" }}
        >
          <span className="projects-item d-block">
            <div className="pic" onClick={() => this.showModal(project)}>
              <div>
                <img
                  src={project.images[0]}
                  alt="projectImages"
                  height="200"
                  style={{ marginBottom: 0, paddingBottom: 0, position: 'relative' }}
                />
                <p className="project-title-settings mt-3">{project.title}</p>
                <span className="project-date mt-2"> {project.date}</span>
              </div>
            </div>
          </span>
        </div>
      ));
    }

    return (
      <section id="projects">
        <div className="col-md-12">
          <h1 className="section-title">
            <span>{sectionName}</span>
          </h1>
          <div className="col-md-12 mx-auto">
            {projectsList}
          </div>
          <ProjectModal
            show={this.state.showModal}
            onHide={this.closeModal}
            data={this.state.deps}
          />
        </div>
      </section>
    );
  }
}

export default Projects;