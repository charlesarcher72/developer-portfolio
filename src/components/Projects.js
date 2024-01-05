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
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.setState({ showModal: true, deps: data });
    document.body.classList.add("modal-open");
    document.body.style.top = `-${scrollTop}px`;
    document.body.style.position = 'fixed';
  };
  
  closeModal = () => {
    const scrollTop = parseInt(document.body.style.top, 10) || 0;
    this.setState({ showModal: false });
    document.body.classList.remove("modal-open");
    document.body.style.top = "";
    document.body.style.position = '';
    window.scrollTo(0, -scrollTop);
  };
  
  render() {
    const { projects, info } = this.props.sharedData;
    const sectionName = info?.section_name?.projects;

    const projectsRows = [];
    if (projects && info) {
      for (let i = 0; i < projects.length; i += 2) {
        const row = (
          <div className="row" key={i}>
            {projects.slice(i, i + 2).map((project) => (
              <div
                className="col-sm-12 col-md-6 col-lg-4 mx-auto"
                key={project.title}
                style={{
                  cursor: "pointer",
                  height: "100%",
                  overflow: "hidden",
                  marginBottom: "10px",
                }}
              >
                <span className="projects-item d-block">
                  <div className="pic" onClick={() => this.showModal(project)}>
                    <div>
                      <img
                        src={project.images[0]}
                        alt="projectImages"
                        style={{ marginBottom: 0, paddingBottom: 0, position: 'relative' }}
                      />
                      <p className="project-title-settings mt-3">{project.title}</p>
                      <span className="project-date mt-2"> {project.date}</span>
                    </div>
                  </div>
                </span>
              </div>
            ))}
          </div>
        );
        projectsRows.push(row);
      }
    }

    return (
      <section id="projects" style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div className="col-md-12 text-center">
          <h1 className="section-title">
            <span>{sectionName}</span>
          </h1>
          <div className="col-md-8 mx-auto">
            {projectsRows}
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