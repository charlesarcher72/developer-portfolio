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
          if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
              this.setState({ isLoading: false });
            });
          } else {
            window.addEventListener('load', () => {
              this.setState({ isLoading: false });
            });
            if (document.readyState === 'complete') {
              this.setState({ isLoading: false });
            }
          }
        });
      },
      error: (xhr, status, err) => {
        console.error(err);
        this.setState({ isLoading: false });
      },
    });
  }

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