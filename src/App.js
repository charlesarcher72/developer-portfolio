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
      sharedData: {},
    };
  }

  componentDidMount() {
    $.ajax({
      url: 'portfolio_data.json',
      dataType: "json",
      cache: false,
      success: (data) => {
        this.setState({ sharedData: data });
      },
      error: (xhr, status, err) => {
        console.error(err);
      },
    });
  }

  render() {
    return (
      <div className="app-container">
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
      </div>
    );
  }
}

export default App;