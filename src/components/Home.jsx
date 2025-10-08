import React, { useState, useEffect, useContext } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  nameStyle: {
    fontSize: '3rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#333333',
    letterSpacing: '-0.01em',
  },
  inlineChild: {
    display: 'inline-block',
    fontSize: '1.5rem',
    fontWeight: '400',
    marginBottom: '2rem',
    opacity: 0.8,
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  typewriterContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '2rem',
  },
};

function Home() {
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

  return data ? (
    <Fade>
      <div style={styles.mainContainer}>
        <h1 style={{ ...styles.nameStyle, color: theme.color }}>{data?.name}</h1>
        <div style={styles.typewriterContainer}>
          <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles,
            }}
          />
        </div>
        <Social />
      </div>
    </Fade>
  ) : <FallbackSpinner />;
}

export default Home;
