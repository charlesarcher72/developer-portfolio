import "./scss/App.scss";
import React, { Component } from "react";
import $ from "jquery";
import NavProvider from './context/NavContext';
import Nav from './components/Nav';
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Footer from "./components/Footer";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      sharedData: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    $.ajax({
      url: 'portfolio_data.json',
      dataType: "json",
      cache: false,
      success: (data) => {
        this.setState({ sharedData: data }, () => {
          this.preloadAssets(data);
        });
      },
      error: (xhr, status, err) => {
        console.error(err);
        this.setState({ isLoading: false });
      },
    });
  }

  preloadImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve;
      img.src = src;
    });
  };

  preloadAssets = (data) => {
    const promises = [];

    if (document.fonts && document.fonts.ready) {
      promises.push(document.fonts.ready);
    }

    if (data.info && data.info.logo) {
      if (typeof data.info.logo === 'object') {
        promises.push(this.preloadImage(`images/${data.info.logo.light}`));
        promises.push(this.preloadImage(`images/${data.info.logo.dark}`));
      } else {
        promises.push(this.preloadImage(`images/${data.info.logo}`));
      }
    }

    if (data.info && data.info.image) {
      promises.push(this.preloadImage(`images/${data.info.image}`));
    }

    if (data.projects) {
      data.projects.forEach((project) => {
        if (project.images && project.images.length > 0) {
          promises.push(this.preloadImage(project.images[0]));
        }
      });
    }

    Promise.all(promises).then(() => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { sharedData, isLoading } = this.state;

    if (isLoading || !sharedData) {
      return (
        <div className="app-loading">
          <div className="loading-spinner"></div>
        </div>
      );
    }

    return (
      <div className="app-container">
        <NavProvider>
          <Nav />
          <Header sharedData={sharedData} />
          <About sharedData={sharedData} />
          <Experience sharedData={sharedData} />
          <Projects sharedData={sharedData} />
          <Skills sharedData={sharedData} />
          <Services sharedData={sharedData} />
          <Footer sharedData={sharedData} />
        </NavProvider>
      </div>
    );
  }
}

export default App;