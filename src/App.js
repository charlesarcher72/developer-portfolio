import "./scss/App.scss";
import React from "react";
import NavProvider from './context/NavContext';
import Nav from './components/Nav';
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Footer from "./components/Footer";
import sharedData from "./portfolio_data.json";

const App = () => (
  <div className="app-container">
    <NavProvider>
      <Nav />
      <main id="main">
        <Header sharedData={sharedData} />
        <About sharedData={sharedData} />
        <Experience sharedData={sharedData} />
        <Projects sharedData={sharedData} />
        <Skills sharedData={sharedData} />
        <Services sharedData={sharedData} />
      </main>
      <Footer sharedData={sharedData} />
    </NavProvider>
  </div>
);

export default App;
