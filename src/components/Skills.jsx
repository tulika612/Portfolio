import React, { useEffect, useState, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  skillsContainer: {
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
  introTextContainer: {
    whiteSpace: 'pre-wrap',
    fontSize: '1.2rem',
    lineHeight: '1.6',
    marginBottom: '3rem',
    textAlign: 'center',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  skillCategory: {
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid',
    textAlign: 'center',
  },
  skillCategoryTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
  },
  skillItem: {
    display: 'inline-block',
    margin: '1rem',
    textAlign: 'center',
    transition: 'opacity 0.2s ease',
  },
  skillItemText: {
    marginTop: '0.5rem',
    fontWeight: '500',
    fontSize: '0.9rem',
  },
  iconStyle: {
    height: 60,
    width: 60,
    margin: 10,
    marginBottom: 0,
    borderRadius: 8,
    transition: 'opacity 0.2s ease',
  },
};

function Skills() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  const renderSkillsIntro = (intro) => (
    <h4 style={styles.introTextContainer}>
      <ReactMarkdown children={intro} />
    </h4>
  );

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <section id="skills" style={{ backgroundColor: theme.background, color: theme.color }}>
      <div style={styles.skillsContainer} className="skills-container">
        <h2 style={{ ...styles.titleStyle, color: theme.color }}>Skills & Technologies</h2>

        {data ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {renderSkillsIntro(data.intro)}
            <div style={styles.skillsGrid} className="skills-grid">
              {data.skills?.map((category) => (
                <div
                  key={category.title}
                  style={{
                    ...styles.skillCategory,
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.cardBorderColor,
                  }}
                  className="skill-category"
                >
                  <h3 style={{ ...styles.skillCategoryTitle, color: theme.color }}>
                    {category.title}
                  </h3>
                  {category.items.map((item) => (
                    <div key={item.title} style={styles.skillItem} className="skill-item">
                      <img
                        style={styles.iconStyle}
                        src={item.icon}
                        alt={item.title}
                      />
                      <p style={styles.skillItemText}>{item.title}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        ) : <FallbackSpinner />}
      </div>
    </section>
  );
}
export default Skills;
