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
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />
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
                      <svg 
                        className="arrow-icon" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none"
                      >
                        <path 
                          d="M3 8H13M13 8L9 4M13 8L9 12" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
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