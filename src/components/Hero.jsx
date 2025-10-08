import React, { useState, useEffect, useContext } from 'react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  heroContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  nameStyle: {
    fontSize: '3.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
  },
  titleStyle: {
    fontSize: '1.5rem',
    fontWeight: '500',
    marginBottom: '1.5rem',
    opacity: 0.9,
  },
  currentRoleStyle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '2rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '25px',
    border: '2px solid',
    display: 'inline-block',
  },
  descriptionStyle: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    maxWidth: '600px',
    marginBottom: '3rem',
    opacity: 0.8,
  },
  ctaContainer: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '3rem',
  },
  ctaButton: {
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  primaryButton: {
    backgroundColor: '#0066cc',
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: 'inherit',
    border: '2px solid',
  },
};

function Hero() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const handleResumeDownload = () => {
    // Add your resume download logic here
    window.open('/resume.pdf', '_blank');
  };

  const handleContactClick = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return data ? (
    <section id="home" style={{ backgroundColor: theme.background, color: theme.color }}>
      <div style={styles.heroContainer}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ ...styles.nameStyle, color: theme.color }}>
            {data?.name}
          </h1>

          <div style={styles.titleStyle}>
            <span>I&apos;m </span>
            <Typewriter
              options={{
                loop: true,
                autoStart: true,
                strings: data?.roles,
              }}
            />
          </div>

          <div style={{
            ...styles.currentRoleStyle,
            backgroundColor: theme.accentColor,
            color: 'white',
            borderColor: theme.accentColor,
          }}
          >
            Currently: Machine Learning Engineer at Salesforce
          </div>

          <p style={styles.descriptionStyle}>
            Passionate about building intelligent systems and solving complex problems
            through machine learning. I specialize in developing scalable AI solutions,
            optimizing model performance, and creating innovative applications that
            make a real impact.
          </p>

          <div style={styles.ctaContainer}>
            <button
              type="button"
              style={{
                ...styles.ctaButton,
                ...styles.primaryButton,
              }}
              onClick={handleResumeDownload}
            >
              Download Resume
            </button>
            <button
              type="button"
              style={{
                ...styles.ctaButton,
                ...styles.secondaryButton,
                borderColor: theme.accentColor,
                color: theme.accentColor,
              }}
              onClick={handleContactClick}
            >
              Get In Touch
            </button>
          </div>

          <Social />
        </motion.div>
      </div>
    </section>
  ) : <FallbackSpinner />;
}

export default Hero;
