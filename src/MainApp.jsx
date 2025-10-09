import React, { useEffect } from 'react';
import NavBarWithRouter from './components/NavBar';

// Import all components for single page
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Research from './components/Research';
import Contact from './components/Contact';

function MainApp() {
  // Ensure page always starts from top and handle mobile scroll issues
  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);

    // Additional fix for mobile browsers
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    // Prevent any cached scroll position
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="MainApp">
      <NavBarWithRouter />
      <main className="main">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Research />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default MainApp;
