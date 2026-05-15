import React, { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";

const ProjectModal = ({ show, onHide, data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    if (show) setCurrentImageIndex(0);
  }, [show, data]);

  const handlePrev = (e) => {
    e?.stopPropagation?.();
    e?.preventDefault?.();
    setCurrentImageIndex((prev) => (prev === 0 ? data.images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation?.();
    e?.preventDefault?.();
    setCurrentImageIndex((prev) => (prev === data.images.length - 1 ? 0 : prev + 1));
  };

  const handleThumb = (index) => setCurrentImageIndex(index);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > 50 && data.images && data.images.length > 1) {
      distance > 0 ? handleNext() : handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!data) return null;

  const hasImages = data.images && data.images.length > 0 && data.images[0];
  const hasMultiple = hasImages && data.images.length > 1;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      className="project-modal"
      backdrop="static"
      keyboard={true}
    >
      <div className="modal-wrapper">
        <div className="modal-handle" aria-hidden="true" />

        <button
          type="button"
          onClick={onHide}
          className="modal-close"
          aria-label="Close project details"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="modal-content-wrapper">
          <header className="modal-header">
            {data.date && <span className="modal-date">{data.date}</span>}
            <div className="modal-title-row">
              <h2 className="modal-title">{data.title}</h2>
              {data.url && (
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="title-link-icon"
                  aria-label="Visit live project"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              )}
            </div>
          </header>

          {hasImages && (
            <div className="modal-gallery">
              <div
                className="gallery-main"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={data.images[currentImageIndex]}
                  alt={`${data.title} screenshot ${currentImageIndex + 1}`}
                  className="gallery-image"
                />

                {hasMultiple && (
                  <>
                    <button type="button" className="gallery-nav gallery-nav-prev" onClick={handlePrev} aria-label="Previous image">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"/>
                      </svg>
                    </button>
                    <button type="button" className="gallery-nav gallery-nav-next" onClick={handleNext} aria-label="Next image">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </button>
                    <div className="gallery-counter">
                      {currentImageIndex + 1} / {data.images.length}
                    </div>
                  </>
                )}
              </div>

              {hasMultiple && (
                <div className="gallery-thumbnails" role="tablist" aria-label="Project screenshots">
                  {data.images.map((image, index) => (
                    <button
                      type="button"
                      key={`thumb-${index}`}
                      className={`thumbnail${index === currentImageIndex ? ' thumbnail-active' : ''}`}
                      onClick={() => handleThumb(index)}
                      aria-label={`View image ${index + 1}`}
                      aria-selected={index === currentImageIndex}
                      role="tab"
                    >
                      <img src={image} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="modal-content-column">
            {data.description && (
              <p className="modal-description">{data.description}</p>
            )}

            {data.technologies && data.technologies.length > 0 && (
              <div className="modal-tech-section">
                <h3 className="tech-section-title">Technologies</h3>
                <div className="tech-grid">
                  {data.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
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
                      <span className="feature-icon" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(data.github || data.appStore || data.playStore) && (
              <div className="modal-actions">
                {data.github && (
                  <a href={data.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <i className="devicon-github-original" aria-hidden="true" />
                    <span>View on GitHub</span>
                  </a>
                )}
                {data.appStore && (
                  <a href={data.appStore} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <span>Download on App Store</span>
                  </a>
                )}
                {data.playStore && (
                  <a href={data.playStore} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893 2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198 2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658 16.802 8.99l-2.302 2.303L5.864 2.658z"/>
                    </svg>
                    <span>Get it on Google Play</span>
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
