// IMPORTS
import "./scss/App.scss";
import React, { Component, useEffect } from "react";
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

// APP
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      resumeData: $.ajax({
        url: 'portfolio_data.json',
        dataType: "json",
        cache: false,
        success: function (data) {
          this.setState({ sharedData: data });
        }.bind(this),
        error: function (xhr, status, err) {
          alert(err);
        },
      }),
      sharedData: {},
    };
  }

  preventPullToRefresh = (e) => {
    e.preventDefault();
  };

  componentDidMount() {
    document.addEventListener('touchmove', this.preventPullToRefresh, { passive: false });
  }

  componentWillUnmount() {
    document.removeEventListener('touchmove', this.preventPullToRefresh);
  }

  render() {
    return (
      // Components
      <NavProvider>
        <Nav />
        <Header sharedData={this.state.sharedData} />
        <About sharedData={this.state.sharedData} />
        <Experience sharedData={this.state.sharedData} />
        <Projects sharedData={this.state.sharedData} />
        <Skills sharedData={this.state.sharedData} />
        <Services sharedData={this.state.sharedData} />
        <Footer sharedData={this.state.sharedData} />
      </NavProvider>
    );
  }
}

export default App;