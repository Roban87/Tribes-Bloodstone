import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
};

function HeaderMain({ isLoggedIn }) {
  if (isLoggedIn !== false) {
    return (
      <Link className="headerMain" to="/kingdom" style={linkStyle}>
        My Kingdom
      </Link>
    );
  }
  return <h1 className="header-tribes">Tribes of Microtis</h1>;
}

HeaderMain.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default HeaderMain;
