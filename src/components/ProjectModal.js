import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "../scss/Projects.scss";

const ProjectModal = ({ show, onHide, data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? data.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === data.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  React.useEffect(() => {
    if (show) {
      setCurrentImageIndex(0);
    }
  }, [show]);

  const handleClose = () => {
    onHide();
  };

  if (!data || !data.images) return null;

  const hasMultipleImages = data.images.length > 1;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      className="project-modal"
      backdrop="static"
      keyboard={true}
    >
      <div className="modal-wrapper">
        <button 
          onClick={handleClose} 
          className="modal-close"
          aria-label="Close modal"
        >
          <svg 
            className="close-icon" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path 
              d="M18 6L6 18M6 6L18 18" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="modal-content-wrapper">
          <div className="modal-gallery">
            <div className="gallery-main">
              <img
                src={data.images[currentImageIndex]}
                alt={`${data.title} - Image ${currentImageIndex + 1}`}
                className="gallery-image"
              />
              
              {hasMultipleImages && (
                <>
                  <button
                    className="gallery-nav gallery-nav-prev"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path 
                        d="M15 18L9 12L15 6" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  
                  <button
                    className="gallery-nav gallery-nav-next"
                    onClick={handleNextImage}
                    aria-label="Next image"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path 
                        d="M9 18L15 12L9 6" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <div className="gallery-counter">
                    {currentImageIndex + 1} / {data.images.length}
                  </div>
                </>
              )}
            </div>

            {hasMultipleImages && (
              <div className="gallery-thumbnails">
                {data.images.map((image, index) => (
                  <button
                    key={`thumb-${index}`}
                    className={`thumbnail${index === currentImageIndex ? ' thumbnail-active' : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                    aria-label={`View image ${index + 1}`}
                    type="button"
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="modal-details">
            <div className="modal-header">
              <h2 className="modal-title">{data.title}</h2>
              {data.date && (
                <span className="modal-date">{data.date}</span>
              )}
            </div>

            <p className="modal-description">{data.description}</p>

            {data.technologies && data.technologies.length > 0 && (
              <div className="modal-tech-section">
                <h3 className="tech-section-title">Technologies</h3>
                <div className="tech-grid">
                  {data.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.features && data.features.length > 0 && (
              <div className="modal-features-section">
                <h3 className="features-section-title">Key Features</h3>
                <ul className="features-list">
                  {data.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <svg className="feature-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path 
                          d="M16.6 5L7.5 14.1L3.4 10" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.url && (
              <div className="modal-actions">
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View Live Project
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path 
                      d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333M10 2H14M14 2V6M14 2L6.66667 9.33333" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    View on GitHub
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path 
                        fillRule="evenodd" 
                        clipRule="evenodd" 
                        d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" 
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectModal;