import React, { useState } from "react";
import ProjectModal from "./ProjectModal";
import "../scss/Projects.scss";

const Projects = ({ sharedData }) => {
  const [showModal, setShowModal] = useState(false);
  const [projectData, setProjectData] = useState({});

  const open = (data) => {
    setProjectData(data);
    setShowModal(true);
  };

  const close = () => setShowModal(false);

  const { projects, info } = sharedData;
  const sectionName = info?.section_name?.projects;

  const renderThumb = (project) => {
    if (project.images && project.images.length > 0 && project.images[0]) {
      return (
        <img
          src={project.images[0]}
          alt=""
          className="project-thumb-image"
          loading="lazy"
          decoding="async"
        />
      );
    }
    return (
      <div className="project-thumb-placeholder" aria-hidden="true">
        <i className="fas fa-code" />
      </div>
    );
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">{sectionName}</h2>
        </header>

        <ul className="project-grid">
          {projects?.map((project) => (
            <li className="project-card" key={project.title}>
              <button
                type="button"
                className="project-card-trigger"
                onClick={() => open(project)}
                aria-label={`View details for ${project.title}`}
              >
                <span className="project-thumb">
                  {renderThumb(project)}
                </span>

                <span className="project-body">
                  <span className="project-header">
                    <span className="project-title">{project.title}</span>
                    {project.date && (
                      <span className="project-year">{project.date}</span>
                    )}
                  </span>

                  {project.description && (
                    <span className="project-excerpt">{project.description}</span>
                  )}

                  {project.technologies && project.technologies.length > 0 && (
                    <span className="project-tech">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="chip">{tech}</span>
                      ))}
                    </span>
                  )}

                  <span className="project-cta">
                    View details
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="7" y1="17" x2="17" y2="7"/>
                      <polyline points="7 7 17 7 17 17"/>
                    </svg>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <ProjectModal show={showModal} onHide={close} data={projectData} />
      </div>
    </section>
  );
};

export default Projects;
