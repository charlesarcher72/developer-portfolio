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

    return (
      <section id="projects" style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div className="col-md-12 text-center">
          <h1 className="section-title">
            <span>{sectionName}</span>
          </h1>
          <div className="row project-grid">
            {projects?.map((project) => (
              <div
                className="col-sm-12 col-md-6 col-lg-5 project-item"
                key={project.title}
                onClick={() => this.showModal(project)}
              >
                <div className="project-card">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="project-overlay">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-date">{project.date}</p>
                  </div>
                </div>
              </div>
            ))}
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