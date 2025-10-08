import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import '../App.css';

function Header(props) {
  const theme = useContext(ThemeContext);
  const { title } = props;

  const headerStyle = {
    fontSize: '2.5rem',
    fontWeight: '600',
    marginBottom: '2rem',
    color: theme.color,
    textAlign: 'center',
    letterSpacing: '-0.01em',
  };

  return <div style={headerStyle}>{title}</div>;
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
