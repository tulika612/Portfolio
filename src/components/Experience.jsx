import React, { useEffect, useState, useContext } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  experienceContainer: {
    padding: '4rem 2rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  titleStyle: {
    fontSize: '2.5rem',
    fontWeight: '600',
    marginBottom: '3rem',
    textAlign: 'center',
  },
  currentRoleHighlight: {
    padding: '2rem',
    borderRadius: '16px',
    marginBottom: '3rem',
    border: '2px solid',
    textAlign: 'center',
  },
  currentRoleTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  currentRoleCompany: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '1rem',
    opacity: 0.8,
  },
  currentRoleDescription: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto',
  },
  ulStyle: {
    listStylePosition: 'outside',
    paddingLeft: 20,
  },
  subtitleContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  subtitleStyle: {
    display: 'inline-block',
  },
  inlineChild: {
    display: 'inline-block',
  },
  itemStyle: {
    marginBottom: 10,
  },
};

function Experience() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, []);

  const currentRole = data?.[0]; // Salesforce role

  return (
    <section id="experience" style={{ backgroundColor: theme.background, color: theme.color }}>
      <div style={styles.experienceContainer}>
        <h2 style={{ ...styles.titleStyle, color: theme.color }}>Experience</h2>
        {data && currentRole ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              ...styles.currentRoleHighlight,
              backgroundColor: theme.cardBackground,
              borderColor: theme.accentColor,
            }}
            >
              <h3 style={{ ...styles.currentRoleTitle, color: theme.accentColor }}>
                {currentRole.title}
              </h3>
              <h4 style={{ ...styles.currentRoleCompany, color: theme.color }}>
                {currentRole.subtitle}
              </h4>
              <p style={styles.currentRoleDescription}>
                {currentRole.workDescription[0]}
              </p>
            </div>

            <Container>
              <VerticalTimeline
                lineColor={theme.timelineLineColor || '#ddd'}
              >
                {data.map((item) => (
                  <motion.div
                    key={item.title + item.dateText}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <VerticalTimelineElement
                      date={item.dateText}
                      dateClassName="timeline-date"
                      iconStyle={{ background: theme.accentColor }}
                      contentStyle={{
                        background: theme.cardBackground,
                        color: theme.color,
                        border: `1px solid ${theme.cardBorderColor}`,
                      }}
                    >
                      <h2 className="item-title">
                        {item.title}
                      </h2>
                      <div style={styles.subtitleContainerStyle}>
                        <h4 style={{ ...styles.subtitleStyle, color: theme.accentColor }}>
                          {item.subtitle}
                        </h4>
                        {item.workType && (
                        <h5 style={styles.inlineChild}>
                    &nbsp;·
                          {' '}
                          {item.workType}
                        </h5>
                        )}
                      </div>
                      <ul style={styles.ulStyle}>
                        {item.workDescription.map((point) => (
                          <div key={point}>
                            <li>
                              <ReactMarkdown
                                children={point}
                                components={{
                                  p: 'span',
                                }}
                              />
                            </li>
                            <br />
                          </div>
                        ))}
                      </ul>
                    </VerticalTimelineElement>
                  </motion.div>
                ))}
              </VerticalTimeline>
            </Container>
          </motion.div>
        ) : <FallbackSpinner />}
      </div>
    </section>
  );
}
export default Experience;
