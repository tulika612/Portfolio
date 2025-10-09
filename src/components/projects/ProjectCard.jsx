import React, { useContext } from 'react';
import {
  Button, Card, Badge,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    margin: 3,
    fontSize: '0.8rem',
    fontWeight: '400',
  },
  cardStyle: {
    borderRadius: 8,
    border: '1px solid #e0e0e0',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.2s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardTitleStyle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    lineHeight: '1.3',
  },
  cardTextStyle: {
    textAlign: 'left',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    color: 'inherit',
    flexGrow: 1,
  },
  buttonStyle: {
    margin: 3,
    borderRadius: 4,
    fontWeight: '400',
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    transition: 'opacity 0.2s ease',
  },
  cardImageStyle: {
    borderRadius: '8px 8px 0 0',
    height: '180px',
    objectFit: 'cover',
  },
  cardFooterStyle: {
    borderTop: '1px solid #e0e0e0',
    borderRadius: '0 0 8px 8px',
    padding: '0.75rem',
  },
};

const ProjectCard = (props) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  const { project } = props;

  return (
    <Card
      style={{
        ...styles.cardStyle,
        backgroundColor: theme.cardBackground,
        borderColor: theme.cardBorderColor,
      }}
      text={theme.bsSecondaryVariant}
      className="project-card"
    >
      <Card.Img
        variant="top"
        src={project?.image}
        style={styles.cardImageStyle}
        className="project-image"
      />
      <Card.Body style={{ padding: '1.5rem', flexGrow: 1 }}>
        <Card.Title style={styles.cardTitleStyle} className="project-title">{project.title}</Card.Title>
        <Card.Text style={styles.cardTextStyle} className="project-description">
          {parseBodyText(project.bodyText)}
        </Card.Text>
      </Card.Body>

      <Card.Body style={{ padding: '0 1.5rem 1rem 1.5rem' }} className="project-buttons">
        {project?.links?.map((link) => (
          <Button
            key={link.href}
            style={styles.buttonStyle}
            variant={'outline-' + theme.bsSecondaryVariant}
            onClick={() => window.open(link.href, '_blank')}
            className="project-button"
          >
            {link.text}
          </Button>
        ))}
      </Card.Body>
      {project.tags && (
        <Card.Footer
          style={{
            ...styles.cardFooterStyle,
            backgroundColor: theme.cardFooterBackground,
            borderTopColor: theme.cardBorderColor,
          }}
          className="project-tags"
        >
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              pill
              bg={theme.bsSecondaryVariant}
              text={theme.bsPrimaryVariant}
              style={styles.badgeStyle}
              className="project-tag"
            >
              {tag}
            </Badge>
          ))}
        </Card.Footer>
      )}
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
