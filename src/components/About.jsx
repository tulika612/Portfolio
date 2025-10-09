import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  aboutContainer: {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  titleStyle: {
    fontSize: '2.5rem',
    fontWeight: '600',
    marginBottom: '3rem',
    textAlign: 'center',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '3rem',
    alignItems: 'center',
  },
  textContent: {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    textAlign: 'left',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutImage: {
    borderRadius: '16px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    maxWidth: '100%',
    height: 'auto',
  },
  highlightBox: {
    padding: '1.5rem',
    borderRadius: '12px',
    marginTop: '2rem',
    border: '1px solid',
  },
  highlightTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
};

function About() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <section id="about" style={{ backgroundColor: theme.background, color: theme.color }}>
      <div style={styles.aboutContainer} className="about-container">
        <h2 style={{ ...styles.titleStyle, color: theme.color }}>About Me</h2>
        {data ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={styles.contentGrid} className="content-grid">
              <div style={styles.textContent} className="text-content">
                <p>
                  I&apos;m a passionate Machine Learning Engineer currently working at Salesforce,
                  where I develop cutting-edge AI solutions and optimize model performance
                  for enterprise applications.
                </p>
                <p>
                  With a Master&apos;s in Computer Science from UC Irvine and experience at
                  companies like VMware and Lamini AI, I specialize in building scalable
                  machine learning systems, developing mobile AI applications, and
                  implementing efficient model training pipelines.
                </p>
                <p>
                  My expertise spans across deep learning, mobile AI, model optimization,
                  and full-stack development. I&apos;m particularly interested in on-device AI,
                  multimodal systems, and creating AI solutions that make a real impact.
                </p>

                <div
                  style={{
                    ...styles.highlightBox,
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.accentColor,
                  }}
                  className="highlight-box"
                >
                  <h3 style={{ ...styles.highlightTitle, color: theme.accentColor }}>
                    Current Focus
                  </h3>
                  <p>
                    Exploring the next frontier of on-device and agentic AI, building
                    intelligent assistants that combine efficient edge inference with
                    open-source large-model research and benchmarking.
                  </p>
                </div>
              </div>

              <div style={styles.imageContainer} className="image-container">
                <img
                  src={data?.imageSource}
                  alt="Tulika Awalgaonkar"
                  style={styles.aboutImage}
                  className="about-image"
                />
              </div>
            </div>
          </motion.div>
        ) : <FallbackSpinner />}
      </div>
    </section>
  );
}

export default About;
