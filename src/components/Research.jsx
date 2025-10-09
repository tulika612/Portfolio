import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  researchContainer: {
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
  researchGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  researchCard: {
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    minHeight: '500px',
    position: 'relative',
  },
  researchTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '1rem',
    lineHeight: '1.4',
  },
  researchAuthors: {
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
    opacity: 0.8,
  },
  researchVenue: {
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '1rem',
    color: '#4a9eff',
  },
  researchYear: {
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '0rem',
    opacity: 0.7,
  },
  researchDescription: {
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '0rem',
    opacity: 0.9,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  researchLinks: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '0rem',
    position: 'absolute',
    bottom: '2rem',
    left: '2rem',
    right: '2rem',
  },
  linkButton: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    minWidth: '80px',
    textAlign: 'center',
  },
};

function Research() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.research || '/profile/research.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(() => {
        // Handle error silently
      });
  }, []);

  const formatAuthors = (authorsString) => {
    const authors = authorsString.split(', ');
    return authors.map((author, index) => {
      const isCurrentUser = author.toLowerCase().includes('tulika');
      return (
        <span key={author}>
          {isCurrentUser ? <strong>{author}</strong> : author}
          {index < authors.length - 1 && ', '}
        </span>
      );
    });
  };

  const handleLinkClick = (href) => {
    window.open(href, '_blank');
  };

  return (
    <section id="research" style={{ backgroundColor: theme.background, color: theme.color }}>
      <div style={styles.researchContainer} className="research-container">
        <h2 style={{ ...styles.titleStyle, color: theme.color }}>Research Publications</h2>

        {data ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={styles.researchGrid} className="research-grid">
              {data.research?.map((paper, index) => (
                <motion.div
                  key={paper.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    ...styles.researchCard,
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.cardBorderColor,
                  }}
                  className="research-card"
                >
                  <h3 style={{ ...styles.researchTitle, color: theme.color }} className="research-title">
                    {paper.title}
                  </h3>

                  <p style={{ ...styles.researchAuthors, color: theme.color }}>
                    {formatAuthors(paper.authors)}
                  </p>

                  <p style={{ ...styles.researchVenue, color: theme.accentColor }}>
                    {paper.venue}
                  </p>

                  <div style={{ color: theme.color, marginBottom: '0rem', lineHeight: '1.2' }}>
                    <span style={{ fontWeight: '600', opacity: 0.7 }}>{paper.year}</span>
                    <span style={{ marginLeft: '1rem', opacity: 0.9 }}>{paper.description}</span>
                  </div>

                  <div style={styles.researchLinks} className="research-links">
                    {paper.links?.map((link) => (
                      <button
                        key={link.text}
                        type="button"
                        style={{
                          ...styles.linkButton,
                          backgroundColor: theme.accentColor,
                          color: 'white',
                        }}
                        onClick={() => handleLinkClick(link.href)}
                      >
                        {link.text}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : <FallbackSpinner />}
      </div>
    </section>
  );
}

export default Research;
