import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "../scss/Projects.scss";

const ProjectModal = ({ show, onHide, data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalWrapperRef = React.useRef(null);
  const touchStartX = React.useRef(null);
  const touchEndX = React.useRef(null);

  React.useEffect(() => {
    if (show) {
      setCurrentImageIndex(0);
    }
  }, [show, data]);

  
  const handlePrevImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => 
      prev === 0 ? data.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => 
      prev === data.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && data.images && data.images.length > 1) {
      handleNextImage({ stopPropagation: () => {}, preventDefault: () => {} });
    }
    if (isRightSwipe && data.images && data.images.length > 1) {
      handlePrevImage({ stopPropagation: () => {}, preventDefault: () => {} });
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleClose = () => {
    onHide();
  };

  if (!data) return null;

  const hasImages = data.images && data.images.length > 0 && data.images[0];
  const hasMultipleImages = hasImages && data.images.length > 1;

  const renderGalleryImage = () => {
    if (hasImages) {
      return (
        <img
          src={data.images[currentImageIndex]}
          alt={`${data.title} - Image ${currentImageIndex + 1}`}
          className="gallery-image"
        />
      );
    }
    return null;
  };

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
      <div className="modal-wrapper" ref={modalWrapperRef}>
        <div className="modal-content-wrapper">
          <div className="modal-header">
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
            
            <div className="modal-title-row">
              <h2 className="modal-title">{data.title}</h2>
              {data.url && (
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="title-link-icon"
                  aria-label="View live project"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              )}
            </div>
            {data.date && (
              <span className="modal-date">{data.date}</span>
            )}
          </div>

          {hasImages && (
            <div className="modal-gallery">
              <div 
                className="gallery-main"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {renderGalleryImage()}
                
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
          )}

          <div className="modal-content-column">
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
                      <i className="devicon-checkmark-plain feature-icon"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.github && (
              <div className="modal-actions">
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  View on GitHub
                  <i className="devicon-github-original"></i>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectModal;