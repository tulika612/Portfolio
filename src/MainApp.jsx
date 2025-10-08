import React from 'react';
import NavBarWithRouter from './components/NavBar';

// Import all components for single page
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function MainApp() {
  return (
    <div className="MainApp">
      <NavBarWithRouter />
      <main className="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default MainApp;
