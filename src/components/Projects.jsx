import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  projectsContainer: {
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
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  showMoreStyle: {
    margin: 25,
    borderRadius: 6,
    fontWeight: '500',
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    transition: 'opacity 0.2s ease',
  },
};

const Projects = () => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const numberOfItems = showMore && data ? data.length : 6;

  return (
    <section id="projects" style={{ backgroundColor: theme.background, color: theme.color }}>
      <div style={styles.projectsContainer} className="projects-container">
        <h2 style={{ ...styles.titleStyle, color: theme.color }}>Featured Projects</h2>

        {data ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={styles.projectsGrid} className="projects-grid">
              {data.projects?.slice(0, numberOfItems).map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>

            {!showMore && (
              <div style={{ textAlign: 'center' }}>
                <Button
                  style={styles.showMoreStyle}
                  variant={theme.bsSecondaryVariant}
                  onClick={() => setShowMore(true)}
                  className="show-more-button"
                >
                  Show More Projects
                </Button>
              </div>
            )}
          </motion.div>
        ) : <FallbackSpinner />}
      </div>
    </section>
  );
};
export default Projects;
