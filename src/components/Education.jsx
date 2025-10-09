import React, { useState, useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { motion } from 'framer-motion';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  educationContainer: {
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
};

function Education() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.education, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(() => {
        // Handle error silently
      });
  }, []);

  return (
    <section id="education" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
      <div style={styles.educationContainer} className="education-container">
        <h2 style={{ ...styles.titleStyle, color: '#ffffff' }}>Education</h2>
        {data ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VerticalTimeline
              lineColor="#404040"
            >
              {data.education?.map((item, index) => (
                <motion.div
                  key={item.cardTitle + item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <VerticalTimelineElement
                    date={item.title}
                    dateClassName="timeline-date"
                    iconStyle={{
                      background: 'transparent',
                      border: '2px solid #4a9eff',
                      width: '12px',
                      height: '12px',
                      marginLeft: '-6px',
                      marginTop: '8px',
                    }}
                    contentStyle={{
                      background: '#2a2a2a',
                      color: '#ffffff',
                      border: '1px solid #404040',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <h3 style={{
                      color: '#ffffff',
                      fontWeight: '600',
                      fontSize: '1.3rem',
                      marginBottom: '0.5rem',
                    }}
                    >
                      {item.cardTitle}
                    </h3>
                    <h4 style={{
                      color: '#4a9eff',
                      fontWeight: '500',
                      fontSize: '1.1rem',
                      marginBottom: '0.5rem',
                    }}
                    >
                      {item.cardSubtitle}
                    </h4>
                    <p style={{
                      color: '#ffffff',
                      opacity: 0.8,
                      fontSize: '1rem',
                      marginBottom: '0rem',
                    }}
                    >
                      {item.cardDetailedText}
                    </p>
                  </VerticalTimelineElement>
                </motion.div>
              ))}
            </VerticalTimeline>
          </motion.div>
        ) : <FallbackSpinner />}
      </div>
    </section>
  );
}

export default Education;
