import React, { useEffect, useState, useContext } from 'react';
import { SocialIcon } from 'react-social-icons';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';

const styles = {
  iconStyle: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10,
    transition: 'opacity 0.2s ease',
  },
  socialContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  customIconStyle: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s ease',
    cursor: 'pointer',
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10,
  },
  scholarIcon: {
    width: '20px',
    height: '20px',
    fill: 'white',
  },
};

function Social() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.social, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="social">
      <div style={styles.socialContainer}>
        {data ? data.social.map((social) => {
          if (social.network === 'googlescholar') {
            return (
              <a
                key={social.network}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...styles.customIconStyle,
                  backgroundColor: theme.socialIconBgColor,
                }}
                className="social-icon"
                aria-label="Google Scholar Profile"
              >
                <svg style={styles.scholarIcon} viewBox="0 0 24 24">
                  <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                </svg>
              </a>
            );
          }
          return (
            <SocialIcon
              key={social.network}
              style={styles.iconStyle}
              url={social.href}
              network={social.network}
              bgColor={theme.socialIconBgColor}
              target="_blank"
              rel="noopener"
              className="social-icon"
            />
          );
        }) : null}
      </div>
    </div>
  );
}

export default Social;
