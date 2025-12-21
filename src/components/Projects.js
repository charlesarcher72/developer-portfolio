import React, { useState } from "react";
import ProjectModal from "./ProjectModal";
import "../scss/Projects.scss";

const Projects = ({ sharedData }) => {
  const [showModal, setShowModal] = useState(false);
  const [projectData, setProjectData] = useState({});

  const showModalHandler = (data) => {
    setProjectData(data);
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const { projects, info } = sharedData;
  const sectionName = info?.section_name?.projects;

  const renderProjectImage = (project) => {
    if (project.images && project.images.length > 0 && project.images[0]) {
      return (
        <img
          src={project.images[0]}
          alt={project.title}
          className="project-image"
          loading="lazy"
        />
      );
    }

    return (
      <div className="project-image-placeholder">
        <i className="fas fa-code placeholder-icon"></i>
      </div>
    );
  };

  return (
    <section id="projects">
      <div className="projects-container">
        <h2 className="section-title">
          <span>{sectionName}</span>
        </h2>
        
        <div className="project-grid">
          {projects?.map((project, index) => (
            <div
              className="project-item"
              key={project.title}
              style={{ '--item-index': index }}
              onClick={() => showModalHandler(project)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  showModalHandler(project);
                }
              }}
            >
              <div className="project-card">
                <div className="project-image-container">
                  {renderProjectImage(project)}
                  <div className="project-image-overlay"></div>
                </div>
                
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    {project.date && (
                      <span className="project-date">{project.date}</span>
                    )}
                  </div>
                  
                  {project.technologies && (
                    <div className="project-tech-stack">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="tech-badge-more">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="project-action">
                    <span className="view-more">
                      View Details
                      <i className="devicon-arrowforward-plain arrow-icon"></i>
                    </span>
                  </div>
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