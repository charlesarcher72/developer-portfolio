import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Slider from "react-awesome-slider";
import SliderStyle from "../scss/slider.scss";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";

class ProjectModal extends Component {
  render() {
    const { data, onHide } = this.props;

    let img = null;
    let title = null;
    let url = null;
    let description = null;

    if (data) {
      const { images, title: projectTitle, description: projectDescription, url: projectUrl } = data;

      if (images) {
        img = images.map((elem, i) => <div key={i} data-src={elem} />);
      }

      title = projectTitle;
      url = projectUrl;
      description = projectDescription;
    }

    return (
      <Modal
        {...this.props}
        size=""
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-inside"
      >
        <span onClick={onHide} className="modal-close">
          <i className="fas fa-times fa-3x close-icon"></i>
        </span>
        <div className="col-md-12">
          <div className="slider col-md-12 mx-auto" style={{ paddingBottom: "10px" }}>
            {img && img.length > 1 ? (
              <Slider
                cssModule={[SliderStyle]}
                animation="cubeAnimation"
                className="slider-image"
              >
                {img}
              </Slider>
            ) : (
              img && <img src={data.images[0]} alt={title} className="single-image" />
            )}
          </div>
          <div className="col-md-10 mx-auto">
            <h3 className="modal-title" style={{ padding: "5px 5px 0 5px" }}> {title}</h3>
            <p className="modal-description">{description}</p>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ProjectModal;
