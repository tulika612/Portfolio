import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from 'styled-components';
import Social from './Social';

const styles = {
  contactContainer: {
    padding: '4rem 2rem',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  titleStyle: {
    fontSize: '2.5rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  subtitleStyle: {
    fontSize: '1.2rem',
    marginBottom: '3rem',
    opacity: 0.8,
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  contactCard: {
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  contactCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
  contactIcon: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  contactTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  contactText: {
    fontSize: '1rem',
    opacity: 0.8,
  },
  resumeSection: {
    padding: '2rem',
    borderRadius: '12px',
    border: '2px dashed',
    marginBottom: '2rem',
  },
  resumeTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  resumeDescription: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    opacity: 0.8,
  },
  downloadButton: {
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'inline-block',
  },
};

function Contact() {
  const theme = useContext(ThemeContext);

  const handleResumeDownload = () => {
    // Open Google Drive link for resume download
    window.open('https://drive.google.com/file/d/1FRYHxlxcO-NUA6At0lx2lfDVTL1xq7bC/view?usp=sharing', '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:tawalgao@uci.edu';
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/tulika-awalgaonkar/', '_blank');
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/tulika612', '_blank');
  };

  const handleScholarClick = () => {
    window.open('https://scholar.google.com/citations?user=9C_VGIUAAAAJ&hl=en', '_blank');
  };

  return (
    <section id="contact" style={{ backgroundColor: theme.background, color: theme.color }}>
      <div style={styles.contactContainer} className="contact-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ ...styles.titleStyle, color: theme.color }}>
            Let&apos;s Connect
          </h2>
          <p style={styles.subtitleStyle}>
            I&apos;m always interested in discussing new opportunities,
            collaborations, or just having a chat about technology and AI.
          </p>

          <div style={styles.contactGrid} className="contact-grid">
            <div
              style={{
                ...styles.contactCard,
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorderColor,
              }}
              onClick={handleEmailClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleEmailClick();
                }
              }}
              role="button"
              tabIndex={0}
              className="contact-card"
            >
              <div style={styles.contactIcon}>📧</div>
              <h3 style={styles.contactTitle}>Email</h3>
              <p style={styles.contactText}>tawalgao@uci.edu</p>
            </div>

            <div
              style={{
                ...styles.contactCard,
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorderColor,
              }}
              onClick={handleLinkedInClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleLinkedInClick();
                }
              }}
              role="button"
              tabIndex={0}
              className="contact-card"
            >
              <div style={styles.contactIcon}>💼</div>
              <h3 style={styles.contactTitle}>LinkedIn</h3>
              <p style={styles.contactText}>Professional Network</p>
            </div>

            <div
              style={{
                ...styles.contactCard,
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorderColor,
              }}
              onClick={handleGitHubClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleGitHubClick();
                }
              }}
              role="button"
              tabIndex={0}
              className="contact-card"
            >
              <div style={styles.contactIcon}>💻</div>
              <h3 style={styles.contactTitle}>GitHub</h3>
              <p style={styles.contactText}>Code & Projects</p>
            </div>

            <div
              style={{
                ...styles.contactCard,
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorderColor,
              }}
              onClick={handleScholarClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleScholarClick();
                }
              }}
              role="button"
              tabIndex={0}
              className="contact-card"
            >
              <div style={styles.contactIcon}>🎓</div>
              <h3 style={styles.contactTitle}>Google Scholar</h3>
              <p style={styles.contactText}>Research & Publications</p>
            </div>
          </div>

          <div
            style={{
              ...styles.resumeSection,
              backgroundColor: theme.cardBackground,
              borderColor: theme.accentColor,
            }}
            className="resume-section"
          >
            <h3 style={{ ...styles.resumeTitle, color: theme.accentColor }}>
              Download My Resume
            </h3>
            <p style={styles.resumeDescription}>
              Get a detailed overview of my experience, skills, and achievements.
            </p>
            <button
              type="button"
              style={{
                ...styles.downloadButton,
                backgroundColor: theme.accentColor,
                color: 'white',
              }}
              onClick={handleResumeDownload}
            >
              📄 Download Resume
            </button>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <Social />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
