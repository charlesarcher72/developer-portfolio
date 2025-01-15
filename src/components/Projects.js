import React, { useState } from "react";
import ProjectModal from "./ProjectModal";

const Projects = ({ sharedData }) => {
  const [showModal, setShowModal] = useState(false);
  const [projectData, setProjectData] = useState({});

  const showModalHandler = (data) => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setProjectData(data);
    setShowModal(true);
    document.body.classList.add("modal-open");
    document.body.style.top = `-${scrollTop}px`;
    document.body.style.position = 'fixed';
  };

  const closeModalHandler = () => {
    const scrollTop = parseInt(document.body.style.top, 10) || 0;
    setShowModal(false);
    document.body.classList.remove("modal-open");
    document.body.style.top = "";
    document.body.style.position = '';
    window.scrollTo(0, -scrollTop);
  };

  const { projects, info } = sharedData;
  const sectionName = info?.section_name?.projects;

  return (
    <section id="projects">
      <div className="col-md-12">
        <h1 className="section-title">
          <span>{sectionName}</span>
        </h1>
        <div className="row project-grid">
          {projects?.map((project) => (
            <div
              className="col-sm-6 col-md-6 col-lg-5 project-item"
              key={project.title}
              onClick={() => showModalHandler(project)}
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
          show={showModal}
          onHide={closeModalHandler}
          data={projectData}
        />
      </div>
    </section>
  );
};

export default Projects;
