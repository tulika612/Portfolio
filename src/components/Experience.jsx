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

  return (
    <section id="experience" style={{ backgroundColor: theme.background, color: theme.color }}>
      <div style={styles.experienceContainer}>
        <h2 style={{ ...styles.titleStyle, color: theme.color }}>Experience</h2>
        {data ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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
                      iconStyle={{
                        background: 'transparent',
                        border: `2px solid ${theme.accentColor}`,
                        width: '12px',
                        height: '12px',
                        marginLeft: '-6px',
                        marginTop: '8px',
                      }}
                      contentStyle={{
                        background: theme.cardBackground,
                        color: theme.color,
                        border: `1px solid ${theme.cardBorderColor}`,
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <h2 className="item-title" style={{ color: theme.color, fontWeight: '600' }}>
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
